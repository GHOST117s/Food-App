<?php
namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

use Carbon\Carbon;

use App\Models\User;
use App\Models\Food;
use App\Models\Carts;
use App\Models\Order_item;
use App\Models\OrderHistory;
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
    public function checkout()
    {
        $user = Auth::user();
        $carts = Carts::with('food')->where('user_id', Auth::id())->get();
        $total = 0;
        foreach ($carts as $cart) {
            $total += $cart->food->price * $cart->quantity;
        }
// dd(Auth::id());
        $order = Order_item::create([
            'user_id' => $user->id,
            'quantity' => $carts->sum('quantity'),
            'total_price' => $total,
            
        ]);
        //save it to history table
        foreach ($carts as $cart) {
            $OrderHistory = new OrderHistory([
                'user_id' => $user->id,
                'food_id' => $cart->food_id,
                'quantity' => $cart->quantity,
                'price' => $cart->food->price * $cart->quantity,
                'order_date' => Carbon::now(),
            ]);
            $OrderHistory->save();
        }
       //delete cart items after checkout
        $carts->each->delete();
        // dd($order);
        return response()->json([
            'carts' => $carts,
            'total' => $total,
            'user' => $user                            
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
