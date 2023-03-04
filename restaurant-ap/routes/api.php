<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\FoodController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\Order_itemController;
use App\Http\Controllers\Api\WishlistController;
use App\Http\Controllers\OrderHistoryController;
use App\Http\Controllers\AddressController;





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
Route::get('/food/{id}',[FoodController::class,'index']);


Route::middleware(['auth:api'])->group(function(){
    Route::post('/logout',[UserController::class,'logout']);
    Route::get('/user',[UserController::class,'getUser']); 

   Route::post('/food',[FoodController::class,'createFood']);

   Route::post('/cart',[CartController::class,'store']);
   Route::delete('cart/{id}', [CartController::class, 'destroy']);
    Route::get('/cartitems',[CartController::class,'show']);

    // Route::post('/checkout',[Order_itemController::class,'checkout']);
    
Route::post('/wishlist',[WishlistController::class,'wishlist']);
Route::get('/wishlistitems',[WishlistController::class,'index']);
Route::delete('wishlist/{id}', [WishlistController::class, 'destroy']);


Route::post('/order/{id}',[OrderHistoryController::class,'store']);


Route::post('/address',[AddressController::class,'store']);
Route::delete('/addressdelete/{id}',[AddressController::class,'destroy']);
Route::post('/addressupdate/{id}',[AddressController::class,'update']);
Route::get('/address',[AddressController::class,'show']);


});

