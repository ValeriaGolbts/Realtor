<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TypeRealty extends Model
{
    use HasFactory;

    public function realty()
    {
        return $this->hasMany(Realty::class, 'type_realty_id');
    }
}
