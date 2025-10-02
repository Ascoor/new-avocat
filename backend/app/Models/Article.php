<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_ar',
        'title_en',
        'tag_ar',
        'tag_en',
        'summary_ar',
        'summary_en',
        'body_ar',
        'body_en',
        'slug',
        'cover_image',
    ];
}
