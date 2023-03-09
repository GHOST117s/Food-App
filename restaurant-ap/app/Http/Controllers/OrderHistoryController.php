<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;


use App\Models\User;
use App\Models\Food;
use App\Models\Carts;
use App\Models\OrderHistory;
use App\Models\Address;


class OrderHistoryController extends Controller
{
    public function store(Request $request){

        $user = auth()->user();

        //check if cart is empty
        $carts = Carts::where('user_id', Auth::id())->get();
        if($carts->isEmpty()){
            return response()->json([
                'message' => 'Cart is empty',
                'status' => 404
            ]);
        }
      
    
        // Check if the given address ID exists
        $address = Address::where('user_id', $user->id)->find($request->address_id);
    
        if(!$address){
            return response()->json([
                'message' => 'Address not found. Please add your address first',
                'status' => 404
            ]);
        }
    
        $total = 0;
        foreach ($carts as $cart) {
            $total += $cart->food->price * $cart->quantity;
        }
        foreach($carts as $cart){
             OrderHistory::create([
                'user_id' => $user->id,
                'food_id' => $cart->food_id,
                'quantity' => $cart->quantity,
                'price' => $cart->food->price * $cart->quantity,
                'address_id' => $address->id,
                'order_date' => Carbon::now(),
            ]);
        }
        $carts->each->delete();
    
        return response()->json([
            'message' => 'Order placed successfully',
            'status' => 200,
            
            'address' => $address,
            // 'cartItems' => $foods,
            'total' => $total,
            // 'user' => $user                            
        ]);
    }


    public function show(){
        $user = auth()->user();
        $orderHistory = OrderHistory::where('user_id', $user->id)->get();
        return response()->json([
            'orderHistory' => $orderHistory,
            'status' => 200
        ]);
    }
}
    