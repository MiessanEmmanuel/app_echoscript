<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use PhpParser\Node\Stmt\Catch_;

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

    public function edit()
    {
    }
    public function delete()
    {
    }
    public function addChapter()
    {
    }

    public function editChapter()
    {
    }
    public function deleteChapter()
    {
    }
}
