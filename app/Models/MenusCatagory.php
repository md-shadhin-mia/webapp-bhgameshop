<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenusCatagory extends Model
{
    use HasFactory;
    protected $fillable = [
        "catagory"
    ];
    public function catagoryable()
    {
        return $this->morphTo();
    }
}
