<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PublishingQueueResource extends JsonResource
{
    public function toArray($request): array
    {
        $title = $this->title_en ?: ($this->title_ar ?: $this->slug);

        return [
            'slug' => $this->slug,
            'title' => $title,
            'state' => $this->workflow_state ?? 'draft',
            'draft_id' => null,
            'scheduled_for' => $this->scheduled_for?->toISOString(),
            'last_updated' => $this->updated_at?->toISOString(),
            'submitted_by' => $this->lastEditor?->name,
            'approved_by' => null,
            'progress' => null,
        ];
    }
}
