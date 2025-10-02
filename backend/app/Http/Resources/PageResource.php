<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => [
                'ar' => $this->title_ar,
                'en' => $this->title_en,
            ],
            'content_blocks' => ContentBlockResource::collection(
                $this->whenLoaded('contentBlocks')
            ),
            'content' => ContentBlockResource::collection(
                $this->whenLoaded('contentBlocks')
            ),
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
