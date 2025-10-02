<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name_ar',
        'name_en',
        'position_ar',
        'position_en',
        'bio_ar',
        'bio_en',
        'highlights_ar',
        'highlights_en',
        'image',
    ];

    protected $casts = [
        'highlights_ar' => 'array',
        'highlights_en' => 'array',
    ];
}
