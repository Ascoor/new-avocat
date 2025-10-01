<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use App\Http\Resources\AchievementResource;
use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends Controller
{
    public function index()
    {
        return AchievementResource::collection(Achievement::orderByDesc('number')->get());
    }

    public function store(Request $request): AchievementResource
    {
        $achievement = Achievement::create($this->validateRequest($request));

        return new AchievementResource($achievement);
    }

    public function show(Achievement $achievement): AchievementResource
    {
        return new AchievementResource($achievement);
    }

    public function update(Request $request, Achievement $achievement): AchievementResource
    {
        $achievement->update($this->validateRequest($request, true));

        return new AchievementResource($achievement);
    }

    public function destroy(Achievement $achievement)
    {
        $achievement->delete();

        return response()->noContent();
    }

    private function validateRequest(Request $request, bool $isUpdate = false): array
    {
        $required = $isUpdate ? 'sometimes' : 'required';
        $optional = $isUpdate ? 'sometimes' : 'nullable';

        return $request->validate([
            'title_ar' => [$required, 'string', 'max:255'],
            'title_en' => [$required, 'string', 'max:255'],
            'number' => [$optional, 'nullable', 'integer', 'min:0'],
        ]);
    }
}
