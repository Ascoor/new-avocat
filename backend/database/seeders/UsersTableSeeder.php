<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'عبدالحميد عسكر',
                'email' => 'a@a.com',
                'password' => 'Ask@123456',
            ],
            [
                'name' => 'User 2',
                'email' => 'user2@example.com',
                'password' => 'password',
            ],
        ];

        foreach ($users as $userData) {
            DB::beginTransaction();
            try {
                $user = User::create([
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'password' => Hash::make($userData['password']),
                ]);

                // إنشاء التوكن الشخصي للمستخدم
                $token = $user->createToken('My Personal Token')->accessToken;

                // يمكنك حفظ التوكن في جدول tokens إذا رغبت أو عرضه في اللوحة
                echo "User: {$user->email} => Token: {$token}\n";

                DB::commit();
            } catch (\Exception $e) {
                DB::rollBack();
                throw $e;
            }
        }
    }
}
