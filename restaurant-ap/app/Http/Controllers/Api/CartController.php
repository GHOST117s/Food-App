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
    public function store(Request $request,)
    {
        $validateData = $request->validate([
            'food_id' => 'required',
            'quantity' => ['required', 'integer', 'min:1']
        ]);

        $cart = Carts::create([
            'user_id' => Auth::id(),
            'food_id' => $validateData['food_id'],
            'quantity' => $validateData['quantity']
        ]);

       
       

      

        return response()->json([
            'cart' => $cart,
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
        return response()->json([
            'carts' => $carts
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
        $cart = Cart::where([
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
