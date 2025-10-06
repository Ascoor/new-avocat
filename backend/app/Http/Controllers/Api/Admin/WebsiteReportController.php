<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Carbon;

class WebsiteReportController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $pages = Page::query()
            ->withCount('revisions')
            ->get();

        $totalPages = $pages->count();
        $publishedPages = $pages->where('status', 'published')->count();
        $pendingDrafts = $pages->where('status', '!=', 'published')->count();
        $completionRate = $totalPages > 0
            ? round(($publishedPages / $totalPages) * 100, 2)
            : 0;

        $sections = $pages->map(function (Page $page): array {
            return [
                'slug' => $page->slug,
                'title' => $page->title_en ?? $page->title_ar ?? ucfirst($page->slug),
                'status' => $page->status ?? 'draft',
                'completion' => $this->calculateCompletion($page),
                'updated_at' => $page->updated_at?->toIso8601String(),
                'edit_frequency' => $page->revisions_count,
                'pending_approvals' => $page->workflow_state === 'pendingReview' ? 1 : 0,
            ];
        });

        $pendingApprovals = $sections->sum(static fn (array $section) => $section['pending_approvals'] ?? 0);

        $lastEditedTimestamp = $pages
            ->map(fn (Page $page) => $page->updated_at?->getTimestamp())
            ->filter()
            ->max();

        $lastEditedAt = $lastEditedTimestamp
            ? Carbon::createFromTimestamp($lastEditedTimestamp)->toIso8601String()
            : null;

        $report = [
            'completionRate' => $completionRate,
            'completedPages' => $publishedPages,
            'totalPages' => $totalPages,
            'pendingDrafts' => $pendingDrafts,
            'lastEditedAt' => $lastEditedAt,
            'apiHealthy' => true,
            'sections' => $sections->values(),
            'editFrequencyPerPage' => $pages->map(fn (Page $page) => [
                'slug' => $page->slug,
                'edits' => (int) $page->revisions_count,
            ])->values(),
            'timeSinceLastPublish' => $pages
                ->filter(fn (Page $page) => $page->published_at !== null)
                ->map(fn (Page $page) => [
                    'slug' => $page->slug,
                    'minutes' => $page->published_at?->diffInMinutes(Carbon::now()) ?? 0,
                ])->values(),
            'pendingApprovals' => $pendingApprovals,
            'mediaStorageUsage' => null,
        ];

        return new JsonResponse($report);
    }

    private function calculateCompletion(Page $page): float
    {
        return match ($page->status) {
            'published' => 100.0,
            'pendingReview', 'pending' => 75.0,
            'preview', 'scheduled' => 60.0,
            default => 35.0,
        };
    }
}

