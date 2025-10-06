<?php

namespace App\Http\Resources;

use App\Models\ContentBlock;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

/**
 * @mixin ContentBlock
 */
class TestimonialResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        $value = is_array($this->value) ? $this->value : [];

        return [
            'id' => $this->extractIdentifier($this->key),
            'name' => [
                'ar' => Arr::get($value, 'ar.name'),
                'en' => Arr::get($value, 'en.name'),
            ],
            'quote' => [
                'ar' => Arr::get($value, 'ar.quote'),
                'en' => Arr::get($value, 'en.quote'),
            ],
            'position' => [
                'ar' => Arr::get($value, 'ar.position'),
                'en' => Arr::get($value, 'en.position'),
            ],
            'avatar' => Arr::get($value, 'en.avatar') ?? Arr::get($value, 'ar.avatar'),
        ];
    }

    private function extractIdentifier(?string $key): ?int
    {
        if (! $key) {
            return null;
        }

        if (preg_match('/(\d+)/', $key, $matches) === 1) {
            return (int) $matches[1];
        }

        return null;
    }
}
