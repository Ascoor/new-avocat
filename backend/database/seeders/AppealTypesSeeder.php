<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AppealTypesSeeder extends Seeder
{
       public function run(): void
    {
        DB::table('appeal_types')->insert([
            ['appeal_type' => 'المبادئ المدنية'],
            ['appeal_type' => 'المبادئ الجنائية']
        ]);
    }
}
