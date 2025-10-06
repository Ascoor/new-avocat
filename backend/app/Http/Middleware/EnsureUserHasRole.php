<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserHasRole
{
    /**
     * Aliases that can be used to match a stored user role to a friendly name.
     */
    private const ROLE_ALIASES = [
        'admin' => 'admin',
        'administrator' => 'admin',
        '1' => 'admin',

        'editor' => 'editor',
        '2' => 'editor',

        'viewer' => 'viewer',
        'client' => 'viewer',
        '3' => 'viewer',
    ];

    /**
     * Resolve the canonical role name for the provided value.
     */
    public static function normalizeRole(string|int|null $role): ?string
    {
        if ($role === null) {
            return null;
        }

        $key = strtolower((string) $role);

        return self::ROLE_ALIASES[$key] ?? null;
    }

    /**
     * Determine if the given user owns one of the provided roles.
     */
    public static function userHasRole(object|null $user, array $roles): bool
    {
        if ($user === null) {
            return false;
        }

        $normalizedUserRole = self::normalizeRole($user->role ?? null);

        if ($normalizedUserRole === null) {
            return false;
        }

        $targets = array_map(function ($role) {
            return self::normalizeRole($role) ?? strtolower((string) $role);
        }, $roles);

        return in_array($normalizedUserRole, $targets, true);
    }

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        $user = $request->user();

        if ($user === null) {
            return new JsonResponse(['message' => 'Unauthenticated.'], Response::HTTP_UNAUTHORIZED);
        }

        if ($roles === [] || self::userHasRole($user, $roles)) {
            return $next($request);
        }

        return new JsonResponse(['message' => 'Forbidden.'], Response::HTTP_FORBIDDEN);
    }
}

