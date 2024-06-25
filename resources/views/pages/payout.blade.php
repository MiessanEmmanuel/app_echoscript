@extends('layouts.base')
@section('title')
    Pricing
@endsection
@section('content')
    @include('layouts.navigation')
    <div class="lg:pl-[4em] pl-0 flex flex-col justify-between lg:h-auto">
        <div class="header-payout my-4  ">
            <div
                class="w-[80%] backdrop-blur-xl border-drop bg-white/60 px-6 py-4 text-xl font-bold mx-auto text-center rounded-lg border-ui-1">
                <h3>Payer avec Stripe</h3>

            </div>
        </div>

        <div class="py-6 px-4">
            <div class="grid  grid-cols-4 {{-- grid-cols-3 --}}  space-y-5  space-x-6">
                @foreach ($pricing as $onepricing)
                    <div class="rounded-lg shadow-sm 0relative p-4 border-ui-1 backdrop-blur-xl  bg-white/30 relative">
                        <div class="h-60 flex flex-col justify-between">
                            <span class="font-medium text-gray-900 text-base inter block"><span
                                    class="font-medium inter text-base text-gray-900 text-capitalize">{{ $onepricing->name }}</span></span>
                            <div>
                                <span class="block inter">
                                    <span
                                        class="font-light text-4xl max-sm:text-2xl inter  text-gray-900">+{{ $onepricing->char }}</span>
                                    <span class="text-md font-medium ">Char</span>
                                </span>
                                <span
                                    class="font-normal mt-3 text-gray-600 block inter text-xs ">{{ $onepricing->description }}</span>
                                <form action="{{ route('payment', ['id' => $onepricing->id]) }}" method="get">
                                    @csrf

                                    <button
                                        class="  block w-full text-center mt-6 text-white-blue px-6 py-4 border-drop ">
                                        <span class="block w-full  text-center">Buy {{ $onepricing->amount }}$</span>
                                    </button>
                                </form>

                            </div>

                        </div>


                    </div>
                @endforeach

            </div>
        </div>

    </div>
    @endsection
