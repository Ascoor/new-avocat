<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArticleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'title' => [
                'ar' => $this->title_ar,
                'en' => $this->title_en,
            ],
            'tag' => [
                'ar' => $this->tag_ar,
                'en' => $this->tag_en,
            ],
            'summary' => [
                'ar' => $this->summary_ar,
                'en' => $this->summary_en,
            ],
            'body' => [
                'ar' => $this->body_ar,
                'en' => $this->body_en,
            ],
            'slug' => $this->slug,
            'cover_image' => $this->cover_image,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
