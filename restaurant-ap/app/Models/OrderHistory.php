<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderHistory extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'food_id',
        'quantity',
        'price',
    ];
    public function user()
    {
        return $this->hasMany(User::class);
    }

}
