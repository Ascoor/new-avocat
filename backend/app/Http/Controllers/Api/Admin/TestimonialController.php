<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\TestimonialResource;
use App\Models\ContentBlock;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;

class TestimonialController extends Controller
{
    private const PAGE_SLUG = 'testimonials';
    private const BLOCK_PREFIX = 'testimonial_';

    public function index(): AnonymousResourceCollection
    {
        return TestimonialResource::collection($this->testimonialBlocks());
    }

    public function store(Request $request): TestimonialResource
    {
        $data = $this->validatePayload($request);

        $page = $this->resolvePage();
        $nextId = $this->nextIdentifier($this->testimonialBlocks($page));

        $block = $page->contentBlocks()->create([
            'key' => self::BLOCK_PREFIX.$nextId,
            'type' => 'json',
            'value' => $this->buildValuePayload($data),
        ]);

        return new TestimonialResource($block);
    }

    public function show(int $testimonial): TestimonialResource
    {
        return new TestimonialResource($this->findTestimonialBlock($testimonial));
    }

    public function update(Request $request, int $testimonial): TestimonialResource
    {
        $data = $this->validatePayload($request, true);
        $block = $this->findTestimonialBlock($testimonial);

        $value = $block->value ?? [];

        $block->value = $this->mergeValuePayload($value, $data);
        $block->save();

        return new TestimonialResource($block);
    }

    public function destroy(int $testimonial): Response
    {
        $block = $this->findTestimonialBlock($testimonial);
        $block->delete();

        return response()->noContent();
    }

    private function testimonialBlocks(?Page $page = null): Collection
    {
        $page ??= $this->resolvePage();

        return $page->contentBlocks()
            ->where('key', 'like', self::BLOCK_PREFIX.'%')
            ->get()
            ->sortBy(fn (ContentBlock $block) => $this->extractIdentifier($block->key))
            ->values();
    }

    private function resolvePage(): Page
    {
        return Page::firstOrCreate(
            ['slug' => self::PAGE_SLUG],
            [
                'title_en' => 'Testimonials',
                'title_ar' => 'الشهادات',
            ]
        );
    }

    private function findTestimonialBlock(int $id): ContentBlock
    {
        $page = $this->resolvePage();

        return $page->contentBlocks()
            ->where('key', self::BLOCK_PREFIX.$id)
            ->firstOrFail();
    }

    private function nextIdentifier(Collection $blocks): int
    {
        $max = $blocks
            ->map(fn (ContentBlock $block) => $this->extractIdentifier($block->key))
            ->max();

        return ($max ?? 0) + 1;
    }

    private function extractIdentifier(string $key): int
    {
        if (preg_match('/(\d+)/', $key, $matches) === 1) {
            return (int) $matches[1];
        }

        return 0;
    }

    private function validatePayload(Request $request, bool $isUpdate = false): array
    {
        $required = $isUpdate ? 'sometimes' : 'required';
        $optional = $isUpdate ? 'sometimes' : 'nullable';

        return $request->validate([
            'name_en' => [$required, 'string', 'max:255'],
            'name_ar' => [$required, 'string', 'max:255'],
            'quote_en' => [$required, 'string'],
            'quote_ar' => [$required, 'string'],
            'position_en' => [$optional, 'nullable', 'string', 'max:255'],
            'position_ar' => [$optional, 'nullable', 'string', 'max:255'],
            'avatar' => [$optional, 'nullable', 'string', 'max:2048'],
        ]);
    }

    private function buildValuePayload(array $data): array
    {
        $en = [
            'name' => $data['name_en'],
            'quote' => $data['quote_en'],
            'position' => $data['position_en'] ?? null,
        ];
        $ar = [
            'name' => $data['name_ar'],
            'quote' => $data['quote_ar'],
            'position' => $data['position_ar'] ?? null,
        ];

        if (array_key_exists('avatar', $data)) {
            $en['avatar'] = $data['avatar'];
            $ar['avatar'] = $data['avatar'];
        }

        return [
            'en' => $en,
            'ar' => $ar,
        ];
    }

    private function mergeValuePayload(array $existing, array $data): array
    {
        $currentEn = Arr::get($existing, 'en', []);
        $currentAr = Arr::get($existing, 'ar', []);

        $en = array_merge($currentEn, array_filter([
            'name' => $data['name_en'] ?? null,
            'quote' => $data['quote_en'] ?? null,
            'position' => $data['position_en'] ?? null,
        ], fn ($value) => $value !== null));

        $ar = array_merge($currentAr, array_filter([
            'name' => $data['name_ar'] ?? null,
            'quote' => $data['quote_ar'] ?? null,
            'position' => $data['position_ar'] ?? null,
        ], fn ($value) => $value !== null));

        if (array_key_exists('avatar', $data)) {
            $en['avatar'] = $data['avatar'];
            $ar['avatar'] = $data['avatar'];
        }

        return [
            'en' => $en,
            'ar' => $ar,
        ];
    }
}
