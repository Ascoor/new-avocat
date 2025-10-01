<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContentBlock extends Model
{
    use HasFactory;

    protected $fillable = [
        'page_id',
        'key',
        'value',
        'type',
    ];

    protected $casts = [
        'value' => 'array',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
