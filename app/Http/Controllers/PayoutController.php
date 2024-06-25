<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pricing;
use Illuminate\Http\Request;

class PayoutController extends Controller
{
    public function show(){
        $pricing = Pricing::all();
        return Inertia::render('payment/Payout', [
            'pricing' => $pricing
        ]);
    }
}
