<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\User;
use App\Models\Food;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        $user = Auth::user();
        $food = Food::where('id', $id)->get();

        return response()->json([
            'food' => $food,
            'status' => 200
        ]);
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function createFood(Request $request){
        $user = Auth::user();

        $validateData = $request->validate([
            'food_name' =>'required|min:3',
            'food_description' =>'required|min:8',
            'price' =>['required', 'integer'],            
             'picture' =>['file','mimes:jpeg,jpg,png,gif','max:4072'],
        ]);
        $path =null;
            
        if($request->hasFile('picture')){
            $path = $request->file('picture')->storePublicly('pictures');
           
        }

        $food = $user->food()->create([
            'food_name' => $validateData['food_name'],
            'food_description' => $validateData['food_description'],
            'price' => $validateData['price'],
            'picture' => $path,
        ]);

       
   
        return response()->json([
           
            'food' => $food,
            'status'=> 200
        ]);


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
    public function getFood()
    {
     //just all the food
        $food = Food::all();
        return response()->json([
            'food' => $food,
            'status' => 200
        ]);
      
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function addToCart( $id)
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
