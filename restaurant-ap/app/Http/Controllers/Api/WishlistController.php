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
use App\Models\Wishlist;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $wishlist = Wishlist::with('food')
            ->where('user_id', Auth::id())
            ->distinct('food_id')
            ->get();
            
            //to get the total number of items in the wishlist
            $count = $wishlist->count();

    
         

        return response()->json([
            'wishlist' => $wishlist,
            'count' => $count,
           
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
    public function wishlist(Request $request)
{
    $user = Auth::user();

    $validateData = $request->validate([
        'food_id' => 'required',
    ]);
$wishlist = Wishlist::where('user_id', Auth::id())
                    ->where('food_id', $validateData['food_id'])
                    ->first();


    if ($wishlist) {
        return response()->json([
            'message' => 'Already in wishlist',
            'status' => 300
        ]);
    }
    else {
        $wishlist = Wishlist::create([
            'user_id' => Auth::id(),
            'food_id' => $validateData['food_id'],
        ]);
    }
    

   
  

   return response()->json([
        'message' => 'Added to wishlist',
        'status' => 200
    ]);



  
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
        //remove from wishlist
        $wishlist = Wishlist::find($id);
        if(!$wishlist) {
            return response()->json([
                'message' => 'Wishlist item not found',
                'status' => 404
            ]);
        }
        $wishlist->delete();


        return response()->json([
            'message' => 'Removed from wishlist',
            'status' => 200
        ]);
    }
}
