<?php

namespace App\Http\Controllers;

use GuzzleHttp\Client;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ChapterProject;
use PhpParser\Node\Stmt\Catch_;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use League\Flysystem\AwsS3V3\PortableVisibilityConverter;


class ProjectController extends Controller
{
    public function showProject($id)
    {
        if (empty($id)) $id = Auth::id();
        $projects_user = Project::findOrFail($id);
        return $projects_user;
    }
    public function add(Request $request)
    {

        $title = $request->input('name');
        $description = $request->input('description');
        $introduction = 'rien';
        $category_id = $request->input('category');
        $voice = $request->input('voice');
        $language = $request->input('language');

        /* return response()->json([
           'voice' => $title,
           'introduction' => $category_id,

    ]);
 */
        $project = new Project;

        $project->title = $title;
        $project->description = $description;
        $project->introduction = $introduction;
        $project->category_id = $category_id;
        $project->default_voice = $voice;
        $project->language = $language;

        $project->user_id = Auth::id();
        $project->save();
        return response()->json('Sucess');

        /* try {
            $project->save();
        } catch (\Throwable $th) {
            return $th;
        } */

        /*
        if () {
            return response()->json('Success');
        } else {
            return response()->json('error');
        } */
    }

    public function edit(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string',
        ]);
        $id_auth = Auth::id();
        $name_project = $request->input('title_project');
        $project_id = $request->input('title_project');

        $project = Project::where('id', $project_id)->where('user_id', $id_auth);
        $project->update(['title' => $name_project]);

        return response()->json('succes');
    }
    public function delete()
    {
    }
    public function addChapter(Request $request)
    {
        //validation du formulaire
        $validated = $request->validate([
            'project_id' => 'required|exists:projects,id',
            'introduction' => 'required|string',
            'chapters' => 'required|array',
            'chapters.*.title' => 'required|string',
            'chapters.*.text' => 'required|string',
        ]);

        $project_id = $validated['project_id'];
        $project = Project::find($project_id);
        if (!$project) {
            return response()->json(['error' => 'Project not found'], 404);
        }

        //Uploader l'introduction
        $introduction = $validated['introduction'];
        $project->update([
            'introduction' => $introduction,
        ]);

        //recuperer le nombre de chapitre du projet
        $chapterCount = ChapterProject::where('project_id', $project_id)->count();

        //Uploader les chapitres
        foreach ($validated['chapters'] as $index => $chapterData) {
            $chapterCount_loop = $chapterCount + $index + 1;
            $project->chapters()->create([
                'chapter_number' => $chapterCount_loop,
                'chapter_title' => $chapterData['title'],
                'chapter_text' => $chapterData['text'],
            ]);
        }
        return response()->json('success');
    }

    public function generateChapter(Request $request)
    {
        /*
    project_id
chapter_id
chapter_text
langue
voice
stability
similarity
style
speakerBoost
        */
        $validated = $request->validate([
            'project_id' => 'required|integer',
            'chapter_id' => 'required|integer',
            'chapter_text' => 'required|string',
            'langue' => 'required|string',
            'voice' => 'required|string',
            'stability' => 'required|numeric',
            'similarity' => 'required|numeric',
            'style' => 'required|numeric',
            'speakerBoost' => 'required|boolean',
        ]);

        $project_id = $validated['project_id'];
        $chapter_id = $validated['chapter_id'];
        $chapter_text = $validated['chapter_text'];
        $langue = $validated['langue'];
        $voice = $validated['voice'];
        $stability = $validated['stability'];
        $similarity = $validated['similarity'];
        $style = $validated['style'];
        $speakerBoost = $validated['speakerBoost'];

        //Récupérer le projet
        $project = Project::find($project_id);
        if (!$project) {
            return response()->json('Project not found', 404);
        }
        //Récupérer le chapitre
        $chapter = ChapterProject::find($chapter_id);
        if (!$chapter) {
            return response()->json('Chapter not found', 404);
        }

        //Générer le fichier audio
        $key = env('ELEVENLABS_API_KEY'); // à mettre dans le fichier .env

        $client = new Client();

        $response = $client->request('POST', 'https://api.elevenlabs.io/v1/text-to-speech/' . $voice, [
            'headers' => [
                'Accept' => 'audio/mpeg',
                'Content-Type' => 'application/json',
                'xi-api-key' =>  $key,
            ],
            'json' => [
                'text' => $chapter_text,
                "model_id" => "eleven_multilingual_v2",
                "voice_settings" => [
                    "stability" => $stability / 100,
                    "similarity_boost" => $similarity / 100,
                    "style" => $style / 100,
                    "use_speaker_boost" => $speakerBoost,

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

            //Stoker l'audio dans Le S3 et dans la base donnée

            //upload le fichier audio sur S3
            if(empty($chapter->slug)) $chapter->slug = $chapter->chapter_title;
            $audioFileName = Auth::user()->name . '-' .str_replace(' ', '-', $chapter->slug) . '.mp3';
            //creeer un chapter_slug pour ne pas que losqure le user modifie son nom de chapitre, on ait affaire à un autre fichier audio
            $audioFilePath = 'public/audios/' . Auth::user()->name . '/projects/' .$project->id .'/chapter_'. $chapter->chapter_number .'/'. $audioFileName;
            $options_aws = [
                'visibility' => 'public',
            ];

            Storage::disk('s3')->put($audioFilePath, base64_decode($base64Audio) ,  $options_aws);

            //stocker l'audio dans la base de données
            $chapter->chapter_text = $chapter_text;
            $chapter->chapter_audio = $audioFilePath;
            $chapter->save();


            /// Retourner la réponse JSON
            return response()->json($responseData);
            // Vous pouvez ensuite sauvegarder le contenu audio dans un fichier ou le traiter comme nécessaire
        } else {
            // Gérer l'erreur
            $errorCode = $response->getStatusCode();
            $errorMessage = $response->getBody();
            return response()->json(['Code' => $errorCode, 'ERROR' => $errorMessage]);
        }
    }

    public function editChapter()
    {
    }
    public function deleteChapter()
    {
    }
    /* private function uploadDbAudio($message, $voice, $lien, $category, $stability, $similarity_boost, $style, $use_speaker_boost, $user_id)
    {

        $audio = new ;

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
    } */
}
