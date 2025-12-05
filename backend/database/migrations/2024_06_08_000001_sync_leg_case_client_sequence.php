<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $maxId = DB::table('leg_case_client')->max('id');
        $driver = DB::getDriverName();

        if ($driver === 'pgsql') {
            $sequenceValue = $maxId ?? 1;
            $isCalled = $maxId !== null;

            DB::statement(
                "SELECT setval(pg_get_serial_sequence('leg_case_client', 'id'), ?, ?)",
                [$sequenceValue, $isCalled]
            );
        } elseif (in_array($driver, ['mysql', 'mysqli'])) {
            DB::statement('ALTER TABLE leg_case_client AUTO_INCREMENT = ' . (($maxId ?? 0) + 1));
        }
    }

    public function down(): void
    {
        // No-op: sequence alignment is idempotent and safe to leave as-is.
    }
};
