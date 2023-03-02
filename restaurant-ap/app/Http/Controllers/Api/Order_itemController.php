<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Food;
use App\Models\Carts;
use App\Models\Order_item;

class Order_itemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function checkout(Request $request)
    {
        // $user_id = $request->user()->id; // Get the user id from the authenticated request
        $user_id = Auth::id();
   //get all the cart items
        $cartItems = Carts::where('user_id', $user_id)->get();

        //loop through the cart items and add the price
        $totalPrice = 0;
        foreach ($cartItems as $cartItem) {
            $totalPrice += $cartItem->food->price * $cartItem->quantity;
        }

        //create the order
        // $order = Order_item::create([
        //     'user_id' => $user_id,
            
        //     'total_price' => $totalPrice,
        //     'status' => 'confirmed'
        // ]);
       

        //remove the cart items
        Carts::where('user_id', $user_id)->delete();

        return response()->json([
            'cartItems' => $cartItems,
            'totalPrice' => $totalPrice,
            'status' => 200
        ]);

       
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //     

}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
