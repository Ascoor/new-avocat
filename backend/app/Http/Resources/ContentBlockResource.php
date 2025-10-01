<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContentBlockResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        $value = $this->value ?? [];

        return [
            'id' => $this->id,
            'key' => $this->key,
            'value' => [
                'ar' => $value['ar'] ?? null,
                'en' => $value['en'] ?? null,
            ],
            'type' => $this->type,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
