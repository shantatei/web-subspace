<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComUsers extends Model
{

    protected $fillable = [
        'user_id',
        'community_id',
    ];


    public function roles()
    {
        return $this->belongsToMany(ComRoles::class);
    }


    use HasFactory;
}
