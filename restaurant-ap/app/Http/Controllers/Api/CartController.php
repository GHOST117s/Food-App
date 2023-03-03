<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Food;
use App\Models\Carts;



class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $carts = Cart::with('food')->where('user_id', Auth::id())->get();
        // return response()->json([
        //     'carts' => $carts
        // ]);
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
        $validatedData = $request->validate([
            'food_id' => 'required',
            'quantity' => ['required', 'integer', 'min:1']
        ]);
    
        // Check if food_id already exists in user's cart
        $cartItem = Carts::where('user_id', Auth::id())
                          ->where('food_id', $validatedData['food_id'])
                          ->first();
    
        if ($cartItem) {
            // If food_id exists, update the quantity
            $cartItem->quantity += $validatedData['quantity'];
            $cartItem->save();
        } else {
            // If food_id does not exist, create a new cart item
            $cartItem = Carts::create([
                'user_id' => Auth::id(),
                'food_id' => $validatedData['food_id'],
                'quantity' => $validatedData['quantity']
            ]);
        }
    
        return response()->json([
            'cart' => $cartItem,
            'status' => 200
        ]);
    }
    

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        //get all the cart items
        $carts = Carts::with('food')->where('user_id', Auth::id())->get();
        

        //if the same food is already in the cart
        //then update the quantity
        // foreach ($carts as $cart) {
        //     if ($cart->food_id == $request->food_id) {
        //         $cart->quantity += $request->quantity;
        //         $cart->save();

        //         return response()->json([
        //             'cart' => $cart,
        //             'status' => 200
        //         ]);
        //     }
        // }

        // sum up all the cart items price
        $total = 0;
        foreach ($carts as $cart) {
            $total += $cart->food->price * $cart->quantity;
        }

        return response()->json([
            'carts' => $carts,
            'total' => $total
        ]);

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
        $cart = Carts::where([
            ['user_id', '=', Auth::id()],
            ['id', '=', $id]
        ])->first();

        if ($cart) {
            $cart->delete();
        }

        return response()->json([
            'message' => 'Cart item deleted successfully.'
        ]);
    
    }

}
