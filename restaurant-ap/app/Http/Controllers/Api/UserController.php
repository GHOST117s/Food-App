<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use App\Models\User;


class UserController extends Controller
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
    public function register(Request $request){
       
        $validateData = $request->validate([
            'name' => 'required',
            'email' => ['required','email','unique:users'],
            'password' => ['min:8','confirmed'],   
            'picture' =>['file','mimes:jpeg,png,gif','max:3072'],    
        ], [
            'email.unique' => 'That email address is already taken.',
            'password.min' => 'Your password must be at least 8 characters long.',
            'password.confirmed' => 'Your passwords do not match.',
        ]);
        
            //store the picture
            $path =null;
            
            if($request->hasFile('picture')){
                $path = $request->file('picture')->storePublicly('pictures' );
            }
            
            
        $validateData['password'] = bcrypt($request->password);    
        // $user = User::create($validateData); 
            
        $user = User::create([
            'name' => $validateData['name'],
            'email' => $validateData['email'],
            'password' => $validateData['password'],
            'picture' => $path,
        ]);       
        $token = $user->createToken('auth_token')->accessToken;    
            
        return response()->json(
            [
                'token' => $token,
                'user' => $user,
                'message' =>"User created successfully",
                'status' => 1
                
            ]
            );
          
           
    }

    /**
     * Store a newly created resource in storage.
     */
    public function login(Request $request)
    {
        $validateData = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);
        
        $user = User::where('email', $validateData['email'])->first();
        
        if (!$user) {
            return response()->json(['message' => 'Email not found', 'status' => 0]);
        }
        
        if (!Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid password', 'status' => 0]);
        }
        
        $token = $user->createToken('auth_token')->accessToken;
        return response()->json([
            'token' => $token,
            'user' => $user,        
            'message' => "Login successful  ",
            'status' => 1
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function logout(Request $request)
    {
        $user = Auth::user();
        $accessToken = $user->token();
        $accessToken->delete();
        
        return response()->json([
            'message' => 'Successfully logged out',
            'status' => 1
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
    public function getUser() {
        $user = auth()->user();
    
    
        if (is_null($user)) {
            return response()->json([
                'user' => null,
                'message' => "User not found",
                'status' => 0
            ]);
        } else {
            return response()->json([
                'user' => $user,               
                'message' => "User found",
                'status' => 1
            ]);
        }
    }



}
