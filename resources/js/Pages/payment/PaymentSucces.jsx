import ApplicationLogo from '@/Components/ApplicationLogo';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useEffect, useState } from 'react';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51P5uL9LoB6eLe3rSTsSqXEbkQiznG1iV49bscNJTc2EOftpX8go8ndYqPR4GFS0gY7lsLffdRraia6x0qZG7cRzu009ijXafJU');

export default function PaymentSucces() {
    const [clientSecret, setClientSecret] = useState('');
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    useEffect(() => {
        fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: 1000 }), // Par exemple, 10 USD en centimes
        })
            .then((response) => response.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const options = {
        clientSecret: clientSecret,
    };



    return (
        <Elements stripe={stripePromise} options={options} >
            <CheckoutForm />
        </Elements>
    );
};
