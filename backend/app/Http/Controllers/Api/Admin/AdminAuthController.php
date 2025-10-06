<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Middleware\EnsureUserHasRole;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAuthController extends Controller
{
    private const ROLE_LABELS = [
        'admin' => 'Admin',
        'editor' => 'Editor',
        'viewer' => 'Viewer',
    ];

    private const ROLE_PERMISSIONS = [
        'admin' => [
            'pages:view',
            'pages:edit',
            'pages:publish',
            'pages:approve',
            'pages:schedule',
            'pages:bulk-publish',
            'media:upload',
            'analytics:view',
        ],
        'editor' => [
            'pages:view',
            'pages:edit',
            'pages:schedule',
            'media:upload',
        ],
        'viewer' => [
            'pages:view',
            'analytics:view',
        ],
    ];

    public function __invoke(Request $request): JsonResponse
    {
        /** @var User|null $user */
        $user = $request->user();

        if ($user === null) {
            return new JsonResponse(['message' => 'Unauthenticated.'], 401);
        }

        $roleKey = EnsureUserHasRole::normalizeRole($user->role ?? null) ?? 'viewer';
        $roles = [$this->resolveRoleLabel($roleKey)];

        $token = $user->tokens()
            ->orderByDesc('last_used_at')
            ->orderByDesc('created_at')
            ->first();

        $lastLoginAt = $token?->last_used_at ?? $token?->created_at;

        return new JsonResponse([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar ?? null,
            'roles' => $roles,
            'permissions' => $this->resolvePermissions($roleKey),
            'last_login_at' => $lastLoginAt?->toIso8601String(),
        ]);
    }

    private function resolveRoleLabel(string $roleKey): string
    {
        return self::ROLE_LABELS[$roleKey] ?? self::ROLE_LABELS['viewer'];
    }

    private function resolvePermissions(string $roleKey): array
    {
        $permissions = self::ROLE_PERMISSIONS[$roleKey] ?? self::ROLE_PERMISSIONS['viewer'];

        return array_values(array_unique($permissions));
    }
}

