<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Http\Resources\PageRevisionResource;
use App\Http\Resources\PublishingQueueResource;
use App\Models\ContentBlock;
use App\Models\Page;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Schema;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class PageController extends Controller
{
    public function index(string $slug): PageResource
    {
        return new PageResource($this->resolvePage($slug));
    }

    public function update(Request $request, string $slug): PageResource
    {
        return $this->adminUpdate($request, $slug);
    }

    public function adminIndex(): AnonymousResourceCollection
    {
        $pages = $this->pageQuery()
            ->with($this->pageRelations())
            ->orderBy('slug')
            ->get();

        return PageResource::collection($pages);
    }

    public function adminShow(string $slug): PageResource
    {
        return new PageResource($this->resolvePage($slug));
    }

    public function adminUpdate(Request $request, string $slug): PageResource
    {
        $page = $this->persistPage($request, $slug);

        return new PageResource($page->load($this->pageRelations()));
    }

    public function preview(Request $request, string $slug): PageResource
    {
        $page = $this->resolvePage($slug);
        $payload = $this->validatePagePayload($request);

        $preview = $this->makePreviewPage($page, $payload);

        return new PageResource($preview);
    }

    public function publish(Request $request, string $slug): PageResource
    {
        $page = $this->resolvePage($slug);

        $page->status = 'published';
        $page->workflow_state = 'published';
        $page->published_at = Carbon::now();
        $page->scheduled_for = null;
        $page->last_editor_id = $request->user()?->id;
        $page->save();

        $this->logRevision($page, 'workflow.published', null, $request->user()?->id);

        return new PageResource($page->load($this->pageRelations()));
    }

    public function publishAll(Request $request): Response
    {
        $this->pageQuery()->each(function (Page $page) use ($request) {
            $page->status = 'published';
            $page->workflow_state = 'published';
            $page->published_at = Carbon::now();
            $page->scheduled_for = null;
            $page->last_editor_id = $request->user()?->id;
            $page->save();

            $this->logRevision($page, 'workflow.published', null, $request->user()?->id);
        });

        return response()->noContent();
    }

    public function requestApproval(Request $request, string $slug): PageResource
    {
        $page = $this->resolvePage($slug);
        $data = $request->validate([
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $page->workflow_state = 'pendingReview';
        $page->last_editor_id = $request->user()?->id;
        $page->save();

        $this->logRevision($page, 'workflow.submitted', $data['notes'] ?? null, $request->user()?->id);

        return new PageResource($page->load($this->pageRelations()));
    }

    public function approve(Request $request, string $slug): PageResource
    {
        $page = $this->resolvePage($slug);
        $data = $request->validate([
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $page->status = 'published';
        $page->workflow_state = 'published';
        $page->published_at = Carbon::now();
        $page->scheduled_for = null;
        $page->last_editor_id = $request->user()?->id;
        $page->save();

        $this->logRevision($page, 'workflow.approved', $data['notes'] ?? null, $request->user()?->id);

        return new PageResource($page->load($this->pageRelations()));
    }

    public function schedule(Request $request, string $slug): PageResource
    {
        $page = $this->resolvePage($slug);
        $data = $request->validate([
            'scheduled_for' => ['required', 'date', 'after:now'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ]);

        $page->workflow_state = 'scheduled';
        $page->scheduled_for = Carbon::parse($data['scheduled_for']);
        $page->last_editor_id = $request->user()?->id;
        $page->save();

        $this->logRevision($page, 'workflow.scheduled', $data['notes'] ?? null, $request->user()?->id);

        return new PageResource($page->load($this->pageRelations()));
    }

    public function cancelSchedule(Request $request, string $slug): PageResource
    {
        $page = $this->resolvePage($slug);

        $page->scheduled_for = null;
        if ($page->status !== 'published') {
            $page->workflow_state = 'draft';
        }
        $page->last_editor_id = $request->user()?->id;
        $page->save();

        $this->logRevision($page, 'workflow.schedule_cancelled', null, $request->user()?->id);

        return new PageResource($page->load($this->pageRelations()));
    }

    public function history(string $slug): AnonymousResourceCollection
    {
        $page = $this->resolvePage($slug);

        $revisions = $page->revisions()
            ->with('editor')
            ->orderByDesc('version')
            ->get();

        return PageRevisionResource::collection($revisions);
    }

    public function publishingQueue(): AnonymousResourceCollection
    {
        $queue = $this->pageQuery()
            ->whereNotNull('scheduled_for')
            ->with('lastEditor')
            ->orderBy('scheduled_for')
            ->get();

        return PublishingQueueResource::collection($queue);
    }

    public function settings(): PageResource
    {
        return $this->adminShow('settings');
    }

    public function updateSettings(Request $request): PageResource
    {
        return $this->adminUpdate($request, 'settings');
    }

    private function persistPage(Request $request, string $slug): Page
    {
        $validated = $this->validatePagePayload($request);
        $notes = Arr::pull($validated, 'notes');
        $editorId = $request->user()?->id;

        $page = $this->pageQuery()->firstOrCreate(['slug' => $slug]);

        $page->fill([
            'title_ar' => $validated['title_ar'] ?? $page->title_ar,
            'title_en' => $validated['title_en'] ?? $page->title_en,
        ]);

        if (array_key_exists('status', $validated)) {
            $page->status = $validated['status'] ?? $page->status;
        }

        if (array_key_exists('workflow_state', $validated)) {
            $page->workflow_state = $validated['workflow_state'] ?? $page->workflow_state;
        }

        if (array_key_exists('scheduled_for', $validated)) {
            $page->scheduled_for = $validated['scheduled_for'] ? Carbon::parse($validated['scheduled_for']) : null;
        }

        $page->last_editor_id = $editorId;
        $page->save();

        if (array_key_exists('content_blocks', $validated)) {
            $this->syncContentBlocks($page, $validated['content_blocks']);
        }

        $page->load($this->pageRelations());

        $this->logRevision($page, 'content.updated', $notes, $editorId);

        return $page;
    }

    private function validatePagePayload(Request $request): array
    {
        $statusRule = [
            'nullable',
            'string',
            Rule::in(['draft', 'preview', 'published', 'unlinked']),
        ];

        $workflowRule = [
            'nullable',
            'string',
            Rule::in(['draft', 'pendingReview', 'scheduled', 'published']),
        ];

        $rules = [
            'title_ar' => ['nullable', 'string', 'max:255'],
            'title_en' => ['nullable', 'string', 'max:255'],
            'content_blocks' => ['sometimes', 'array'],
            'content_blocks.*.key' => ['required', 'string', 'max:255'],
            'content_blocks.*.type' => [
                'nullable',
                Rule::in('text', 'image', 'link', 'html', 'list', 'json'),
            ],
            'content_blocks.*.value' => ['required', 'array'],
            'content_blocks.*.value.ar' => ['nullable'],
            'content_blocks.*.value.en' => ['nullable'],
            'status' => $statusRule,
            'workflow_state' => $workflowRule,
            'scheduled_for' => ['nullable', 'date'],
            'notes' => ['nullable', 'string', 'max:2000'],
        ];

        return $request->validate($rules);
    }

    private function syncContentBlocks(Page $page, array $blocks): void
    {
        $keys = [];

        foreach ($blocks as $block) {
            $normalized = $this->normalizeBlockPayload($block);

            $page->contentBlocks()->updateOrCreate(
                ['key' => $normalized['key']],
                [
                    'type' => $normalized['type'],
                    'value' => $normalized['value'],
                ]
            );

            $keys[] = $normalized['key'];
        }

        $this->purgeMissingBlocks($page, $keys);
    }

    private function normalizeBlockPayload(array $block): array
    {
        return [
            'key' => $block['key'],
            'type' => $block['type'] ?? 'text',
            'value' => [
                'ar' => Arr::get($block, 'value.ar'),
                'en' => Arr::get($block, 'value.en'),
            ],
        ];
    }

    private function makePreviewPage(Page $page, array $payload): Page
    {
        $preview = clone $page;

        $preview->title_ar = $payload['title_ar'] ?? $page->title_ar;
        $preview->title_en = $payload['title_en'] ?? $page->title_en;
        $preview->status = $payload['status'] ?? $page->status;
        $preview->workflow_state = $payload['workflow_state'] ?? $page->workflow_state;
        $preview->scheduled_for = isset($payload['scheduled_for'])
            ? ($payload['scheduled_for'] ? Carbon::parse($payload['scheduled_for']) : null)
            : $page->scheduled_for;

        if (array_key_exists('content_blocks', $payload)) {
            $collection = collect($payload['content_blocks'])
                ->map(fn (array $block) => new ContentBlock($this->normalizeBlockPayload($block)));
        } else {
            $collection = $page->contentBlocks;
        }

        $preview->setRelation('contentBlocks', $collection);

        return $preview;
    }

    private function logRevision(Page $page, string $event, ?string $notes = null, ?int $editorId = null): void
    {
        $page->loadMissing($this->pageRelations());

        $payload = [
            'title' => [
                'ar' => $page->title_ar,
                'en' => $page->title_en,
            ],
            'content_blocks' => $page->contentBlocks
                ->map(fn (ContentBlock $block) => [
                    'key' => $block->key,
                    'type' => $block->type,
                    'value' => [
                        'ar' => Arr::get($block->value, 'ar'),
                        'en' => Arr::get($block->value, 'en'),
                    ],
                ])
                ->values(),
        ];

        $version = ($page->revisions()->max('version') ?? 0) + 1;

        $page->revisions()->create([
            'version' => $version,
            'status' => $page->status ?? 'draft',
            'workflow_state' => $page->workflow_state ?? 'draft',
            'payload' => $payload,
            'event' => $event,
            'notes' => $notes,
            'editor_id' => $editorId,
        ]);
    }

    private function resolvePage(string $slug): Page
    {
        return $this->pageQuery()
            ->with($this->pageRelations())
            ->where('slug', $slug)
            ->firstOrFail();
    }

    private function pageQuery(): Builder
    {
        $this->assertPagesTableExists();

        return Page::query();
    }

    private function assertPagesTableExists(): void
    {
        if (Schema::hasTable('pages')) {
            return;
        }

        abort(HttpResponse::HTTP_SERVICE_UNAVAILABLE, 'Pages storage is not initialized yet.');
    }

    private function pageRelations(): array
    {
        return [
            'contentBlocks' => fn ($query) => $query->orderBy('id'),
            'lastEditor',
        ];
    }

    private function purgeMissingBlocks(Page $page, array $keys): void
    {
        if (empty($keys)) {
            $page->contentBlocks()->delete();

            return;
        }

        $page->contentBlocks()
            ->whereNotIn('key', $keys)
            ->delete();
    }
}
