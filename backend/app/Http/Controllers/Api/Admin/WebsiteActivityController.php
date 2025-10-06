<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PageRevision;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class WebsiteActivityController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $limit = (int) $request->integer('limit', 50);
        $limit = max(1, min($limit, 200));

        $revisions = PageRevision::query()
            ->with(['page', 'editor'])
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();

        $activity = $revisions->map(function (PageRevision $revision): array {
            $timestamp = $revision->created_at?->toIso8601String();
            $page = $revision->page;

            return [
                'id' => (string) $revision->id,
                'timestamp' => $timestamp,
                'user' => $revision->editor?->name ?? 'System',
                'action' => $revision->event ?? $revision->status ?? 'update',
                'section' => $page?->slug,
                'diffSummary' => $revision->notes,
                'metadata' => array_filter([
                    'page_id' => $revision->page_id,
                    'page_slug' => $page?->slug,
                    'version' => $revision->version,
                    'status' => $revision->status,
                    'workflow_state' => $revision->workflow_state,
                ], static fn ($value) => $value !== null),
            ];
        });

        return new JsonResponse($activity);
    }
}

