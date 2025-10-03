<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Validation\Rule;

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
        $pages = Page::query()
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

        return new PageResource($page->load($this->contentBlockRelation()));
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
        $validated = $request->validate([
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
        ]);

        $page = Page::firstOrCreate(['slug' => $slug]);

        $page->fill([
            'title_ar' => $validated['title_ar'] ?? $page->title_ar,
            'title_en' => $validated['title_en'] ?? $page->title_en,
        ]);
        $page->save();

        if (array_key_exists('content_blocks', $validated)) {
            $keys = [];

            foreach ($validated['content_blocks'] as $block) {
                $page->contentBlocks()->updateOrCreate(
                    ['key' => $block['key']],
                    [
                        'type' => $block['type'] ?? 'text',
                        'value' => [
                            'ar' => $block['value']['ar'] ?? null,
                            'en' => $block['value']['en'] ?? null,
                        ],
                    ]
                );

                $keys[] = $block['key'];
            }

            $this->purgeMissingBlocks($page, $keys);
        }

        return $page;
    }

    private function resolvePage(string $slug): Page
    {
        return Page::query()
            ->with($this->contentBlockRelation())
            ->where('slug', $slug)
            ->firstOrFail();
    }

    private function contentBlockRelation(): array
    {
        return [
            'contentBlocks' => fn ($query) => $query->orderBy('id'),
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
