<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

function actingAsRole(string $role): User
{
    $user = User::factory()->create([
        'role' => $role,
    ]);

    Sanctum::actingAs($user);

    return $user;
}

test('admin can manage team members via admin website routes', function () {
    actingAsRole('1');

    $payload = [
        'name_en' => 'Sarah Johnson',
        'name_ar' => 'سارة جونسون',
        'position_en' => 'Managing Partner',
        'position_ar' => 'الشريك الإداري',
        'bio_en' => 'Oversees complex litigation matters.',
        'bio_ar' => 'تشرف على قضايا التقاضي المعقدة.',
        'highlights_en' => ['Litigation lead'],
        'highlights_ar' => ['قيادة التقاضي'],
        'image' => 'https://example.com/sarah.jpg',
    ];

    $createResponse = $this->postJson('/api/admin/website/team', $payload);

    $createResponse
        ->assertCreated()
        ->assertJsonPath('data.name.en', 'Sarah Johnson');

    $teamId = $createResponse->json('data.id');

    expect($teamId)->not->toBeNull();

    $this->assertDatabaseHas('team_members', [
        'id' => $teamId,
        'name_en' => 'Sarah Johnson',
    ]);

    $this->putJson("/api/admin/website/team/{$teamId}", [
        'position_en' => 'Senior Partner',
        'position_ar' => 'شريك أول',
    ])->assertOk()->assertJsonPath('data.position.en', 'Senior Partner');

    $this->deleteJson("/api/admin/website/team/{$teamId}")->assertNoContent();

    $this->assertDatabaseMissing('team_members', [
        'id' => $teamId,
    ]);
});

test('admin can manage achievements via admin website routes', function () {
    actingAsRole('1');

    $createResponse = $this->postJson('/api/admin/website/achievements', [
        'title_en' => 'Cases Won',
        'title_ar' => 'قضايا فزنا بها',
        'number' => 120,
    ]);

    $createResponse
        ->assertCreated()
        ->assertJsonPath('data.title.en', 'Cases Won');

    $achievementId = $createResponse->json('data.id');

    expect($achievementId)->not->toBeNull();

    $this->assertDatabaseHas('achievements', [
        'id' => $achievementId,
        'title_en' => 'Cases Won',
    ]);

    $this->putJson("/api/admin/website/achievements/{$achievementId}", [
        'number' => 125,
    ])->assertOk()->assertJsonPath('data.number', 125);

    $this->deleteJson("/api/admin/website/achievements/{$achievementId}")->assertNoContent();

    $this->assertDatabaseMissing('achievements', [
        'id' => $achievementId,
    ]);
});

test('non admin users cannot access admin website management routes', function () {
    actingAsRole('3');

    $this->postJson('/api/admin/website/team', [
        'name_en' => 'Blocked',
        'name_ar' => 'محظور',
        'position_en' => 'Viewer',
        'position_ar' => 'مشاهد',
        'bio_en' => 'Should not be created.',
        'bio_ar' => 'يجب ألا يتم إنشاؤه.',
    ])->assertForbidden();
});

test('unauthenticated requests to admin website routes are rejected', function () {
    app('auth')->forgetGuards();

    $this->getJson('/api/admin/website/team')->assertUnauthorized();
});

