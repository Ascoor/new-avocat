<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AttorneyTypesTableSeeder extends Seeder
{
       public function run(): void
    {
        $types = [
            [
                'name' => 'التفويض العام',
            ],
            [
                'name' => 'التفويض الخاص',
            ],
            [
                'name' => 'التفويض للإجراءات القضائية',
            ],
            // add more data here
        ];

        DB::table('attorney_types')->insert($types);
    }
}
