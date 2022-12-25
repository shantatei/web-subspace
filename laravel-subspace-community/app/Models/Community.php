<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Community extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'about',
        'community_image_url',
        'community_image_filename',
        'community_banner_url',
        'community_banner_filename'
    ];


}
