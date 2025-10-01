<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'file' => ['required_without:image', 'nullable', 'image', 'max:5120'],
            'image' => ['required_without:file', 'nullable', 'image', 'max:5120'],
        ]);

        $uploadedFile = $request->file('file') ?? $request->file('image');

        if (!$uploadedFile) {
            abort(422, __('validation.required', ['attribute' => 'file']));
        }

        $path = $uploadedFile->store('website', 'public');

        return response()->json([
            'path' => $path,
            'url' => Storage::disk('public')->url($path),
        ]);
    }
}
