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
    /**
     * Affiche les project d'un utilisateur en particulier
     * @var int $id
     */
    public function showProject($id)
    {
        if (empty($id)) $id = Auth::id();
        $projects_user = Project::findOrFail($id);
        return $projects_user;
    }

    /**
     * Ajoute un projet aux projets de l'utilisateur
     * @var object $request
     */
    public function add(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:204',
            'description' => 'required|string',
            'language' => 'string',
            'voice' => 'string',
        ]);


        //str_replace(' ','-', $title)
        $title = $request->input('title');
        $description = $request->input('description');
        $introduction = 'rien';
        $category_id = $request->input('category');
        $voice = $request->input('voice');
        $language = $request->input('language');


        $project = new Project;

        $project->title = $title;
        $project->description = $description;
        $project->introduction = $introduction;
        $project->category_id = 1;
        $project->default_voice = $voice;
        $project->language = $language;

        $project->user_id = Auth::id();


        try {
            $project->save();
        } catch (\Throwable $th) {
            return $th;
        }
        return response()->json('Success');

        /*
        if () {
            return response()->json('Success');
        } else {
            return response()->json('error');
        } */
    }

    /**
     * Renomme un projet
     * @var object $request
     */
    public function edit(Request $request)
    {
        $validated = $request->validate([
            'title_project' => 'required|string',
        ]);
        $id_auth = Auth::id();
        $name_project = $request->input('title_project');
        $project_id = $request->input('id');

        $project = Project::where('id', $project_id)->where('user_id', $id_auth);

        if ($project->update(['title' => $name_project])) {
            return to_route('project');
        }
        return to_route('project');
    }

    /**
     * Supprime un projet
     * @var object $request
     */
    public function delete(Request $request)
    {
        $id_project = $request->input('id_project');
        $id_auth = Auth::id();
        $project = Project::where('id', $id_project)->where('user_id', $id_auth);
        if ($project->delete()) {
            return to_route('project')->withViewData(['success' => 'Project successfully withdrawn']);
        }
        return to_route('project')->withViewData(['error' => 'Failed to delete project']);
        //--rediriger vers  project avec un message de succes envoye au composant react via inertia


    }

     /**
     * Sauvegarder le paramètre de voix du projet
     * @var object $request
     */
    public function UpdateConfigVoiceParameter(Request $request)
    {
        $stability = $request->input('stability');
        $similarity_boost = $request->input('similarity_boost');
        $style = $request->input('style');
        $use_speaker_boost = $request->input('use_speaker_boost');
        $project_id = $request->id;
        $id_auth = Auth::id();


        //--- Uploader maintenant
        return response()->json('success');
    }

    /**
     * Ajoute un Chapitre aux projet
     * @var object $request
     */
    public function addChapter(Request $request)
    {
        //--Validation du formulaire
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

        //--Uploader l'introduction
        $introduction = $validated['introduction'];
        $project->update([
            'introduction' => $introduction,
        ]);

        //--recuperer le nombre de chapitre du projet
        $chapterCount = ChapterProject::where('project_id', $project_id)->count();

        //--Uploader les chapitres
        foreach ($validated['chapters'] as $index => $chapterData) {
            $chapterCount_loop = $chapterCount + $index + 1;
            $project->chapters()->create([
                'slug'  => 'g',
                'chapter_number' => $chapterCount_loop,
                'chapter_title' => $chapterData['title'],
                'chapter_text' => $chapterData['text'],
            ]);
        }

        return to_route('testVoice')->withViewData(['success' => 'Chapters successfully added']);
    }

    /**
     * Generer l'audio du chapitre par l'api
     * @var object $request
     */
    public function generateChapter(Request $request)
    {

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

        if (empty($voice)) $voice = $project->default_voice;

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
            if (empty($chapter->slug)) $chapter->slug = $chapter->chapter_title;
            $audioFileName = Auth::user()->name . '-' . str_replace(' ', '-', $chapter->slug) . '.mp3';
            //creeer un chapter_slug pour ne pas que losqure le user modifie son nom de chapitre, on ait affaire à un autre fichier audio
            $audioFilePath = 'public/audios/' . Auth::user()->name . '/projects/' . $project->id . '/chapter_' . $chapter->chapter_number . '/' . $audioFileName;
            $options_aws = [
                'visibility' => 'public',
            ];

            Storage::disk('s3')->put($audioFilePath, base64_decode($base64Audio),  $options_aws);

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

    /**
     * Editer le titre, la categorie
     * @var object $request
     */
    public function editChapter(Request $request)
    {

        $chapter = ChapterProject::findOrFail($request->chapter_id);

        $response = $chapter->update([
            'chapter_title' => $request->chapter_title,
        ]);
        /* $chapter->category = $request->category; */


        return response()->json('succes');
    }

    /**
     * Supprimer le chapitre et ordonner le nombre de chaptitre
     * Si on supprime le quatrième chapitre, le cinquième devient le quatrième
     * @var object $request
     */
    public function deleteChapter(Request $request)
    {
        $chapter = ChapterProject::find($request->chapter_id);
        $project = Project::find($chapter->project_id);
        $chapter_number = $chapter->chapter_number;
        $chapters = ChapterProject::where('project_id', $project->id)->where('chapter_number', '>', $chapter_number)->get();

        foreach ($chapters as $chapter) {
            $chapter->chapter_number = $chapter->chapter_number - 1;
            $chapter->save();
        }

        if ($chapter->delete()) {

            return response()->json(['message' => 'Chapitre supprimé avec succès']);
        } else {
            return response()->json(['message' => 'Erreur lors de la suppression du chapitre']);
        }
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
