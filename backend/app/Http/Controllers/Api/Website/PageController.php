<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use App\Http\Resources\PageResource;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PageController extends Controller
{
    public function index(string $slug): PageResource
    {
        $page = Page::with('contentBlocks')->where('slug', $slug)->firstOrFail();

        return new PageResource($page);
    }

    public function update(Request $request, string $slug): PageResource
    {
        $validated = $request->validate([
            'title_ar' => ['nullable', 'string', 'max:255'],
            'title_en' => ['nullable', 'string', 'max:255'],
            'content_blocks' => ['sometimes', 'array'],
            'content_blocks.*.key' => ['required', 'string', 'max:255'],
            'content_blocks.*.type' => ['nullable', Rule::in('text', 'image', 'link', 'html')],
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

            if ($keys) {
                $page->contentBlocks()
                    ->whereNotIn('key', $keys)
                    ->delete();
            } else {
                $page->contentBlocks()->delete();
            }
        }

        $page->load('contentBlocks');

        return new PageResource($page);
    }
}
