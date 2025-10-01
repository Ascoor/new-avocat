<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use App\Http\Resources\TeamMemberResource;
use App\Models\TeamMember;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function index()
    {
        return TeamMemberResource::collection(TeamMember::all());
    }

    public function store(Request $request): TeamMemberResource
    {
        $teamMember = TeamMember::create($this->validateRequest($request));

        return new TeamMemberResource($teamMember);
    }

    public function show(TeamMember $team): TeamMemberResource
    {
        return new TeamMemberResource($team);
    }

    public function update(Request $request, TeamMember $team): TeamMemberResource
    {
        $team->update($this->validateRequest($request, true));

        return new TeamMemberResource($team);
    }

    public function destroy(TeamMember $team)
    {
        $team->delete();

        return response()->noContent();
    }

    private function validateRequest(Request $request, bool $isUpdate = false): array
    {
        $required = $isUpdate ? 'sometimes' : 'required';
        $optional = $isUpdate ? 'sometimes' : 'nullable';

        $rules = [
            'name_ar' => [$required, 'string', 'max:255'],
            'name_en' => [$required, 'string', 'max:255'],
            'position_ar' => [$required, 'string', 'max:255'],
            'position_en' => [$required, 'string', 'max:255'],
            'bio_ar' => [$optional, 'nullable', 'string'],
            'bio_en' => [$optional, 'nullable', 'string'],
            'image' => [$optional, 'nullable', 'string', 'max:2048'],
        ];

        return $request->validate($rules);
    }
}
