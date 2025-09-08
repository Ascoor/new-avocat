<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'a@a.com'],
            ['name' => 'عبدالحميد عسكر', 'password' => Hash::make('Ask@123456')]
        );
    }
}
