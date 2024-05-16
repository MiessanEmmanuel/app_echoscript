<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProjectController extends Controller
{
    public function showProject($id)
    {
        if(empty($id)) $id = Auth::id();
        $projects_user = Project::findOrFail($id);
        return $projects_user;
    }
    public function add(Request $request)
    {
        $title = $request->input('title');
        $description = $request->input('description');
        $introduction = $request->input('introduction');
        $category_id = $request->input('category_id');

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
