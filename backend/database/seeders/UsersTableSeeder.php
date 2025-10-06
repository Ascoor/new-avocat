<?php

namespace Database\Seeders;

use App\Http\Middleware\EnsureUserHasRole;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // 🧹 مسح كل المستخدمين قبل الإنشاء
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('users')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $users = [
            [
                'name' => 'عبدالحميد عسكر',
                'email' => 'a@a.com',
                'password' => 'Ask@123456',
                'role' => EnsureUserHasRole::databaseRoleValue('admin'),
            ],
            [
                'name' => 'User 2',
                'email' => 'user2@example.com',
                'password' => 'password',
                'role' => EnsureUserHasRole::databaseRoleValue('viewer'),
            ],
        ];

        foreach ($users as $userData) {
            DB::beginTransaction();
            try {
                $user = User::create([
                    'name' => $userData['name'],
                    'email' => $userData['email'],
                    'password' => Hash::make($userData['password']),
                    'role' => $userData['role'],
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
