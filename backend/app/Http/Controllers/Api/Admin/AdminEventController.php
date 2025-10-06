<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Middleware\EnsureUserHasRole;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AdminEventController extends Controller
{
    public function subscribe(Request $request): StreamedResponse
    {
        $tokenValue = $request->query('token') ?? $request->bearerToken();

        if (! is_string($tokenValue) || $tokenValue === '') {
            abort(401, 'Unauthenticated.');
        }

        $accessToken = PersonalAccessToken::findToken($tokenValue);

        if ($accessToken === null || $accessToken->tokenable === null) {
            abort(401, 'Unauthenticated.');
        }

        $user = $accessToken->tokenable;

        if (! EnsureUserHasRole::userHasRole($user, ['admin'])) {
            abort(403, 'Forbidden.');
        }

        $accessToken->forceFill(['last_used_at' => Carbon::now()])->save();

        return response()->stream(function () use ($user): void {
            $this->sendEvent('connected', [
                'message' => 'Connected to admin event stream.',
                'timestamp' => Carbon::now()->toIso8601String(),
                'user' => $user->name ?? 'Administrator',
            ]);

            while (! connection_aborted()) {
                $this->sendEvent('heartbeat', [
                    'message' => 'heartbeat',
                    'timestamp' => Carbon::now()->toIso8601String(),
                ]);

                sleep(15);
            }
        }, 200, [
            'Content-Type' => 'text/event-stream',
            'Cache-Control' => 'no-cache, no-store, must-revalidate',
            'X-Accel-Buffering' => 'no',
        ]);
    }

    private function sendEvent(string $event, array $payload): void
    {
        try {
            echo 'event: ' . $event . "\n";
            echo 'data: ' . json_encode($payload, JSON_THROW_ON_ERROR) . "\n\n";
            @ob_flush();
            flush();
        } catch (\Throwable $exception) {
            Log::warning('Unable to dispatch admin SSE event.', [
                'event' => $event,
                'exception' => $exception->getMessage(),
            ]);
        }
    }
}

