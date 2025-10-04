<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PageRevisionResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'version' => $this->version,
            'status' => $this->status,
            'workflow_state' => $this->workflow_state,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
            'editor' => $this->editor?->name,
            'notes' => $this->notes,
            'event' => $this->event,
        ];
    }
}
