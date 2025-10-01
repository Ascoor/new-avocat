<?php

namespace App\Http\Controllers\Api\Website;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArticleResource;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ArticleController extends Controller
{
    public function index()
    {
        return ArticleResource::collection(Article::latest()->get());
    }

    public function store(Request $request): ArticleResource
    {
        $article = Article::create($this->validateRequest($request));

        return new ArticleResource($article);
    }

    public function show(Article $article): ArticleResource
    {
        return new ArticleResource($article);
    }

    public function update(Request $request, Article $article): ArticleResource
    {
        $article->update($this->validateRequest($request, $article));

        return new ArticleResource($article);
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return response()->noContent();
    }

    private function validateRequest(Request $request, ?Article $article = null): array
    {
        $required = $article ? 'sometimes' : 'required';
        $optional = $article ? 'sometimes' : 'nullable';

        return $request->validate([
            'title_ar' => [$required, 'string', 'max:255'],
            'title_en' => [$required, 'string', 'max:255'],
            'body_ar' => [$required, 'string'],
            'body_en' => [$required, 'string'],
            'slug' => [$required, 'string', 'max:255', Rule::unique('articles', 'slug')->ignore($article?->id)],
            'cover_image' => [$optional, 'nullable', 'string', 'max:2048'],
        ]);
    }
}
