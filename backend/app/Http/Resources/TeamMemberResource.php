<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TeamMemberResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => [
                'ar' => $this->name_ar,
                'en' => $this->name_en,
            ],
            'position' => [
                'ar' => $this->position_ar,
                'en' => $this->position_en,
            ],
            'bio' => [
                'ar' => $this->bio_ar,
                'en' => $this->bio_en,
            ],
            'highlights' => [
                'ar' => $this->highlights_ar ?? [],
                'en' => $this->highlights_en ?? [],
            ],
            'image' => $this->image,
            'created_at' => $this->created_at?->toISOString(),
            'updated_at' => $this->updated_at?->toISOString(),
        ];
    }
}
