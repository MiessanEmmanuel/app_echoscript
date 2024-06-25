<!DOCTYPE html>
<html lang="fr">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Echoscript - @yield('title')</title>


    <!-- Scripts pour Talwind -->
    @vite(['resources/css/app.css', 'resources/js/tailwind.js'])

    {{-- CSS --}}
    {{-- <link rel="stylesheet" href="{{ asset('css/style.css') }}"> --}}

    {{-- <script>
        document.addEventListener("DOMContentLoaded", function() {
      // Afficher la page de chargement
      var loadingPage = document.createElement("div");
      loadingPage.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #fff; z-index: 9999;">
          <iframe src="{{asset('components/load.html')}}" style="border: none; width: 100%; height: 100%;"></iframe>
        </div>
      `;
      document.body.appendChild(loadingPage);

      // Cacher la page de chargement lorsque la page est complètement chargée
      window.addEventListener("load", function() {
        document.body.removeChild(loadingPage);
      });
    });
    </script> --}}

    @yield('style')


</head>

<body class="bg-white-blue text-blackblue   @yield('classes_body')">

    @yield('content')


    @yield('scripts')
</body>

</html>
