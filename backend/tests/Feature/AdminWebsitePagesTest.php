<?php

use App\Models\Page;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

function actingAsAdmin(): User
{
    $admin = User::factory()->create([
        'role' => '1',
    ]);

    Sanctum::actingAs($admin);

    return $admin;
}

test('admin can update landing page content blocks via API', function () {
    actingAsAdmin();

    $page = Page::create([
        'slug' => 'landing',
        'title_en' => 'Landing',
        'title_ar' => 'الرئيسية',
    ]);

    $page->contentBlocks()->create([
        'key' => 'legacy_block',
        'type' => 'text',
        'value' => [
            'en' => 'Legacy',
            'ar' => 'قديم',
        ],
    ]);

    $payload = [
        'title_en' => 'Landing',
        'title_ar' => 'الصفحة الرئيسية',
        'content_blocks' => [
            [
                'key' => 'hero_title',
                'type' => 'text',
                'value' => [
                    'en' => 'Digital Excellence',
                    'ar' => 'التميز الرقمي',
                ],
            ],
            [
                'key' => 'hero_points',
                'type' => 'list',
                'value' => [
                    'en' => ['Point A', 'Point B'],
                    'ar' => ['النقطة أ', 'النقطة ب'],
                ],
            ],
        ],
    ];

    $response = $this->putJson('/api/admin/website/pages/landing', $payload);

    $response
        ->assertOk()
        ->assertJsonPath('data.slug', 'landing')
        ->assertJsonPath('data.content_blocks.0.key', 'hero_title');

    $this->assertDatabaseHas('content_blocks', [
        'page_id' => $page->id,
        'key' => 'hero_title',
        'type' => 'text',
    ]);

    $this->assertDatabaseHas('content_blocks', [
        'page_id' => $page->id,
        'key' => 'hero_points',
        'type' => 'list',
    ]);

    $this->assertDatabaseMissing('content_blocks', [
        'page_id' => $page->id,
        'key' => 'legacy_block',
    ]);

    $publicResponse = $this->getJson('/api/website/pages/landing');
    $publicResponse->assertOk();

    $blocks = collect($publicResponse->json('data.content'));
    $heroPoints = $blocks->firstWhere('key', 'hero_points');

    expect($heroPoints)->not->toBeNull();
    expect($heroPoints['value']['en'][0])->toBe('Point A');
    expect($heroPoints['value']['ar'][0])->toBe('النقطة أ');
});
