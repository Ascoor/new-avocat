<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;

class PassportClientSeeder extends Seeder
{
    public function run(): void
    {
        // 1) Find any active personal‐access token
        $exists = DB::table('oauth_access_tokens')
            ->whereIn('client_id', function ($q) {
                $q->select('id')
                  ->from('oauth_clients')
                  // JSON_SEARCH (MySQL) to find "personal_access" in the grant_types column
                  ->whereRaw("JSON_CONTAINS(grant_types, '\"personal_access\"') = 1");
            })
            ->where('revoked', false)
            ->exists();

        if ($exists) {
            $this->command->info('⚠️ Active personal-access token already exists; skipping.');
            return;
        }

        // 2) Create a new personal-access client
        Artisan::call('passport:client', [
            '--personal'       => true,
            '--name'           => 'Personal Access Client',
            '--no-interaction' => true,
        ]);
        $this->command->info('✅ Personal-access client created.');
    }
}
