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
        $contentBlocks = $this->whenLoaded('contentBlocks');

        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'title' => [
                'ar' => $this->title_ar,
                'en' => $this->title_en,
            ],
            'content_blocks' => ContentBlockResource::collection($contentBlocks),
            'content' => ContentBlockResource::collection($contentBlocks),
            'status' => $this->status ?? 'draft',
            'draft_updated_at' => $this->updated_at?->toISOString(),
            'published_at' => $this->published_at?->toISOString(),
            'preview_url' => null,
            'last_edited_by' => $this->lastEditor?->name,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
            'workflow' => [
                'state' => $this->workflow_state ?? 'draft',
                'scheduled_for' => $this->scheduled_for?->toISOString(),
                'draft_id' => null,
                'events' => [],
            ],
        ];
    }
}
