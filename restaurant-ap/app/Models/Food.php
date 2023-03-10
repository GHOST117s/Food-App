<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'food_name',
        'food_description',
        'price',
        'picture'
    ];
    public function user(){
        return $this->belongsTo(User::class);
        
    }
}
