<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\Order_itemController;
use App\Http\Controllers\Api\WishlistController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);
Route::get('/allfood',[FoodController::class,'getFood']);


Route::middleware(['auth:api'])->group(function(){
    Route::post('/logout',[UserController::class,'logout']);
    Route::get('/user',[UserController::class,'getUser']); 

   Route::post('/food',[FoodController::class,'createFood']);

   Route::post('/cart',[CartController::class,'store']);
   Route::delete('cart/{id}', [CartController::class, 'destroy']);
    Route::get('/cartitems',[CartController::class,'show']);
    Route::post('/checkout',[Order_itemController::class,'checkout']);
Route::post('/wishlist',[WishlistController::class,'wishlist']);

Route::get('/wishlist',[WishlistController::class,'index']);
});

