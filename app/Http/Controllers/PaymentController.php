<?php

namespace App\Http\Controllers;

use Stripe\Stripe;
use Inertia\Inertia;
use App\Models\Pricing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{


    /* public function show(Request $request, $id)
    {

        $request->session()->put('idPrice', $id);
        $pricing = Pricing::findOrFail($id);
        return Inertia::render('payment/Payment', [
            'pricing' => $pricing
        ]);
    } */

    /**
     * Affichage de pr
     *  $request->session()->put('idPrice', $id);
     */

    public function buyCharacter(Request $request)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

        $pricing_id = $request->id_pricing;
        $pricing = Pricing::findOrFail($pricing_id);
        //Variable de session pour set l'ID Price
        $request->session()->put('idPrice', $pricing_id);

        $amount = $pricing->amount * 100;

        $checkout_session = $stripe->checkout->sessions->create([
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $pricing->name . '-' . $pricing->char . '-Char',
                        ],
                        'unit_amount' => $amount,
                    ],
                    'quantity' => 1,
                ],
            ],
            'mode' => 'payment',
            'success_url' => route('chargeSuccess', [], true),
            'cancel_url' => route('chargeFailed',  [], true),
        ]);

        // Stocker l'identifiant de la session de paiement dans la session utilisateur
        $request->session()->put('checkout_session_id', $checkout_session->id);

        //return redirect($checkout_session->url);
        return response()->json(['url' => $checkout_session->url]);
    }

    //CREER une fonction pour que l'utisateur recoivent des caractère en focntion du pricing choisit, tout ça si le payment stripe chechkout est un succes
    public function chargeSuccess(Request $request)
    {
        // Récupérer l'identifiant de la session de paiement depuis la session utilisateur
        $session_id = $request->session()->get('checkout_session_id');
        if (!$session_id || trim($session_id) === '') {
            return redirect()->route('chargeFailed')->with('error', 'Invalid checkout session ID.');
        }

        // Récupérer les informations de la session de paiement
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        try {
            $checkout_session = $stripe->checkout->sessions->retrieve($session_id, []);
        } catch (\Exception $e) {
            return redirect()->route('chargeFailed')->with('error', $e->getMessage());
        }

        // Vérifier le statut du paiement
        if ($checkout_session->payment_status == 'paid') {
            // Récupérer l'identifiant du pricing depuis la session utilisateur
            $pricing_id = $request->session()->get('idPrice');
            $pricing = Pricing::findOrFail($pricing_id);

            // Attribuer les caractères à l'utilisateur en fonction du pricing choisi
            $nombre_char = $pricing->char;
            $user = $request->user();
            $user->number_char += $nombre_char;
            $user->save();

            // Envoyer un email de confirmation de paiement (optionnel)
            // Mail::to($user->email)->send(new PaymentConfirmation($user, $pricing));

            // Redirection vers la page de confirmation de paiement
            return view('pages.paymentsuccess', [
                'pricing' => $pricing
            ]);
        } else {
            // Redirection vers la page d'erreur de paiement
            return redirect()->route('chargeFailed');
        }
    }
    public function chargeFailed(Request $request)
    {
        $pricing_id = $request->session()->get('idPrice');
        return view('pages.paymentfailed', ["pricing_id" => $pricing_id]);
    }

    public function store(Request $request)
    {
        $authed_user = $request->user();
        $stripeCustomer = $authed_user->createOrGetStripeCustomer();

        // Recupérer le nombre de caractère et le prix rataché au prix envoyé dans la view show
        $pricing_id = $request->session()->get('idPrice');
        $pricing = Pricing::findOrFail($pricing_id);
        $amount = $pricing->amount * 100;

        dd($request->paymentMethodId);
        $charge = $authed_user->charge(
            $amount, // Montant en centimes
            $request->paymentMethodId, // Identifiant de la méthode de paiement par défaut
            [
                'customer' => $authed_user->stripe_id, // ID du client Stripe
                'return_url' => route('chargeSuccess'), // URL de redirection en cas de succès
            ]
        );

        if ($charge->status === 'succeeded') {

            $nombre_char = $pricing->char;
            // Augmenter le nombre de caractère du client
            $request->user()->number_char += $nombre_char;
            $request->user()->save();
            session(['payment_succes' => true]);
        } else {
            session(['failed_payment' => true]);
            return redirect()->route('chargeFailed');
        }

        return redirect()->route('chargeSuccess');
    }
}
