<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Carts;
use App\Models\Food;
use App\Models\Address;
use App\Models\OrderHistory;


class AddressController extends Controller
{
    //to store the auth user address
    public function store(Request $request)
    {
        $user = Auth::user();
        $validateData = $request->validate([
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'country' => 'required',
            'zip_code' => 'required|numeric|digits:6',
            'phone' => 'required|numeric|digits:10',
        ]);

        Address::create($validateData + ['user_id' => $user->id]);

        //  Address::create([
        //     'user_id' => $user->id,
        //     'address' => $validateData['address'],
        //     'city' => $validateData['city'],
        //     'state' => $validateData['state'],
        //     'country' => $validateData['country'],
        //     'zip_code' => $validateData['zip_code'],
        //     'phone' => $validateData['phone'],
            
        // ]);


        return response()->json([
           
            'message' => 'Address added successfully',
            'status' => 200
        ]);
    }

    //to show the auth user address

    public function show()
    {
        $user = Auth::user();
        $address = Address::where('user_id', $user->id)->get();
        return response()->json([
            'address' => $address,
            'status' => 200
        ]);
    }


    //to update the auth user address
    public function update(Request $request,$id){
        $user = Auth::user();

        $address = Address::where('user_id',$user->id)->where('id',$id)->first();

        $validateData = $request->validate([
            'address' => 'required',
            'city' => 'required',
            'state' => 'required',
            'country' => 'required',
            'zip_code' => 'required|numeric|digits:6',
            'phone' => 'required|numeric|digits:10',
        ]); 


$address->update($validateData);

        // $address->update([
        //     'address' => $validateData['address'],
        //     'city' => $validateData['city'],
        //     'state' => $validateData['state'],
        //     'country' => $validateData['country'],
        //     'zip_code' => $validateData['zip_code'],
        //     'phone' => $validateData['phone'],
        // ]);

        return response()->json([
            'message' => 'Address updated successfully',
            'status' => 200
        ]);
    }
   //delete the auth user address
   public function destroy($id)
  {
      $user = Auth::user();
      $address = Address::where('user_id', $user->id)->where('id', $id)->first();
      $address->delete();
      return response()->json([
          'message' => 'Address deleted successfully',
          'status' => 200
      ]);
  }
}


