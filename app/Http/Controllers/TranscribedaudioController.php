<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Transcribedaudio;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TranscribedaudioController extends Controller
{

    /**
     * Afficher tous les audios de l'utilisateur
     */
    public function showAudios($id)
    {
        if (empty($id)) {
            $id = Auth::id();
        }
        $histories = Transcribedaudio::where('id_user', $id)->get();

        foreach ($histories as $key => $value) {
            $value->url_audio = Storage::url($value->url_audio);
        }
        return $histories;
    }
    /**
     * Fonction pour générer un audio, que ce qoit en text-to-speech ou speech-to-speech
     * @var object $request
     *  */
    public function generateTextAudio(Request $request)
    {

        // Récupération des informations envoyé depuis le formulaire
        $voice = $request->input('voice');
        $stability = $request->input('stability');
        $similarity_boost = $request->input('similarity_boost');
         $style = $request->input('style');
        $use_speaker_boost = $request->input('use_speaker_boost');
        $category = $request->input('category');
        $message = $request->input('text');



        if ($use_speaker_boost = 1) {
            $use_speaker_boost_value = true;
        } else {
            $use_speaker_boost_value = false;
        }

        // Vérification des valeur de text et message
        if (empty($message) || empty($voice)) {
            return response()->json(['message' => 'Please provide a message and a valid voice.']);
        }

        $key = env('ELEVENLABS_API_KEY'); // à mettre dans le fichier .env

        $client = new Client();

        $response = $client->request('POST', 'https://api.elevenlabs.io/v1/text-to-speech' . '/' . $voice, [
            'headers' => [
                'Accept' => 'audio/mpeg',
                'Content-Type' => 'application/json',
                'xi-api-key' =>  $key,
            ],
            'json' => [
                'text' => $message,
                "model_id" => "eleven_multilingual_v2",
                "voice_settings" => [
                    "stability" => $stability ,
                    "similarity_boost" => $similarity_boost,
                    "style" => $style,
                    "use_speaker_boost" => $use_speaker_boost,

                ]
            ],
            'responseType' => 'arraybuffer',
        ]);
        if ($response->getStatusCode() == 200) {
            $audioContent = $response->getBody()->getContents();
            // Convertir le flux de données en une chaîne de caractères
            $base64Audio = base64_encode($audioContent);

        // réponse JSON
        $responseData = [
            'message' => 'le message a bien été envoyé',
            'audio' => $base64Audio
        ];
        /// Retourner la réponse JSON
         return response()->json($responseData);
            // Vous pouvez ensuite sauvegarder le contenu audio dans un fichier ou le traiter comme nécessaire
        } else {
            // Gérer l'erreur
            $errorCode = $response->getStatusCode();
            $errorMessage = $response->getBody();
            return response()->json(['Code' => $errorCode, 'ERROR' => $errorMessage ]);
        }



        /* $audioContent->store('public/ckc'); */
        // Stocker le contenu du fichier audio dans le dossier 'app/public/audio' dans le stockage
        // Storage::put('audio/audio.mp3', $audioContent);

        /* $audioFileName = Auth::user()->name . '-' . Carbon::now()->format('Y-m-d-H-i-s') . '.mp3';
        $audioFilePath = 'public/audios/' . Auth::user()->name . '/output/' . $audioFileName;
        $options_aws = [
            'visibility' => 'public',
        ];
        if ($category == 'speech-to-speech') {
            $audioFilePathSpeech = 'public/audios/' . Auth::user()->name . '/input/' . $audioFileName;
            Storage::disk('s3')->put($audioFilePathSpeech, base64_decode($base64AudioSpeech),  $options_aws);
        }

        Storage::disk('s3')->put($audioFilePath, base64_decode($base64Audio),  $options_aws);


        $this->uploadDbAudio($message, $voice, $audioFilePath, $category, $stability, $similarity_boost, $style, $use_speaker_boost_value, Auth::id());
 */


        //return redirect(route('accueil'));
    }
    public function generateSpeechAudio(Request $request)
    {

        // Récupération des informations envoyé depuis le formulaire
        $voice = $request->input('voice');
        $stability = $request->input('stability');
        $similarity_boost = $request->input('similarity_boost');
        $style = $request->input('style');
        $use_speaker_boost = $request->input('use_speaker_boost');
        $category = $request->input('category');
        $audio = $request->file('audio');
        $request->validate([
            'audio' => 'required|file|mimes:mp3,wav',
        ]);
        $audioPath = $request->file('audio')->getPathname();

        /*Verification */
        if ($use_speaker_boost = 1) {
            $use_speaker_boost_value = true;
        } else {
            $use_speaker_boost_value = false;
        }
        // Vérification des valeur de text et message
        if (empty($audioPath) || empty($voice)) {
            return response()->json([
                'message' => 'Please provide a message and a valid voice.',
                'audio' => $audioPath,
                'voice' => $voice,
            ]);
        }
        /*   $audioFileName = Auth::user()->name . '-' . Carbon::now()->format('Y-m-d-H-i-s') . '.mp3';
        $audioFilePath = 'public/audios/' . Auth::user()->name . '/input/' . $audioFileName;
        $options_aws = [
            'visibility' => 'public',
        ];
         $base64AudioInput = base64_encode($audio); */
        /* Storage::disk('s3')->put($audioFilePath, $audio,  $options_aws); */


        $key = env('ELEVENLABS_API_KEY'); // à mettre dans le fichier .env

        $client = new Client();

        $response = $client->request('POST', 'https://api.elevenlabs.io/v1/speech-to-speech/' . $voice, [
            'headers' => [
                'Accept' => 'application/json',
                'xi-api-key' => $key,
            ],
            'multipart' => [
                [
                    'name'     => 'audio',
                    'contents' => fopen($audioPath, 'r'),
                ],
                [
                    'name'     => 'model_id',
                    'contents' => 'eleven_english_sts_v2',
                ],
                [
                    'name'     => 'voice_settings',
                    'contents' => json_encode([
                        'stability' => $stability/100  ,
                        'similarity_boost' => $similarity_boost/100,
                        'style' => $style/100 ,
                        'use_speaker_boost' => $use_speaker_boost/100,
                    ]),
                ],
            ],
            'responseType' => 'arraybuffer',
        ]);

        $audioContent = $response->getBody()->getContents();

        // Convertir le contenu du fichier audio en base64 »»» Convertir le flux de données en une chaîne de caractères
        $base64Audio = base64_encode($audioContent);

        // réponse JSON
        $responseData = [
            'message' => 'le message a bien été envoyé',
            'audio' => $base64Audio
        ];

        //$this->uploadAwsAmazon($base64Audio, "speech-to-speech");

        //$this->uploadDbAudio($audio, $voice, $audioFilePath, $category, $stability, $similarity_boost, $style, $use_speaker_boost_value, Auth::id());

        // Retourner la réponse JSON
        return response()->json($responseData);
        // Pour sauvegarder le fichier audio reçu dans une réponse

        /* return response()->json(['message' => 'le message à bien été envoyé']); */
        //return redirect(route('accueil'));
    }

    private function uploadDbAudio($message, $voice, $lien, $category, $stability, $similarity_boost, $style, $use_speaker_boost, $user_id)
    {

        $audio = new Transcribedaudio;

        $audio->text = $message;
        $audio->voice = $voice;
        $audio->url_transcribed_audio = $lien;
        $audio->category = $category;
        $audio->category = $category;

        $audio->stability = $stability ?? 0.5;
        $audio->similarity_boost = $similarity_boost ?? 0.5;
        $audio->style = $style;
        $audio->similarity_boost = $use_speaker_boost;

        $audio->similarity_boost = $use_speaker_boost;

        $audio->id_user = $user_id;

        $audio->save();
    }
    private function uploadAwsAmazon($base64Audio, $category)
    {
        $audioFileName = Auth::user()->name . '-' . Carbon::now()->format('Y-m-d-H-i-s') . '.mp3';
        $options_aws = [
            'visibility' => 'public',
        ];
        if ($category === 'speech-to-speech') {
            $audioFilePathSpeech = 'public/audios/' . Auth::user()->name . '/output/' . $audioFileName;
            Storage::disk('s3')->put($audioFilePathSpeech, base64_decode($base64Audio),  $options_aws);
        } else {
            $audioFilePath = 'public/audios/' . Auth::user()->name . '/' . $audioFileName;
            Storage::disk('s3')->put($audioFilePath, base64_decode($base64Audio),  $options_aws);
        }
    }
    public function editAudio(Request $request)
    {
    }
    /**
     *  Supprimer l'audio
     * @var int $id
     * */
    public function deleteAudio(Request $request)
    {
        $id = $request->input('id');
        $audio = Transcribedaudio::findOrFail($id);
        // Supprimer le fichier audio de AWS S3
        $audioFileName = $audio->url_transcribed_audio;
        Storage::disk('s3')->delete($audioFileName);

        // Supprimer l'enregistrement de la base de données
        $audio->delete();

        return redirect()->route('welcome');
    }
    public function downloadAudio(Request $request)
    {
        $id = $request->input('id');

        $audio = Transcribedaudio::findOrFail($id);
        $audioFileName = $audio->url_transcribed_audio;
        $audioContent = Storage::disk('s3')->get($audioFileName);

        return response($audioContent, 200)
            ->header('Content-Type', 'audio/mpeg')
            ->header('Content-Disposition', 'attachment; filename="' . basename($audioFileName) . '"');
    }
}
// faudra penser au type de fichier uploader pour nous faciliter la tâche avec la récupération des fichiers
