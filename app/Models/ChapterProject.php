<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChapterProject extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'project_id',
        'chapter_number',
        'chapter_title',
        'category',
        'chapter_text',
        'chapter_audio',
    ];
}
