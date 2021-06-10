<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminDashboardMenu extends Model
{
    use HasFactory;
    protected $fillable = [
        "label",
        "slug",
        "catagory",
    ];
    public function getCatagoryAttribute(){
        return $this->catagory->catagory;
    }
    public function catagory(){
        return $this->morphOne(MenusCatagory::class, "catagoryable");
    }
}
