<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'community_id',
        'title',
        'text',
        'post_image_url',
        'post_image_filename',
    ];

    public function category()
    {
        return $this->belongsToMany(Category::class);
    }
}
