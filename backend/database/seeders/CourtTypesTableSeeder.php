<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
 
use Illuminate\Support\Facades\Schema;  
class CourtTypesTableSeeder extends Seeder
{



       public function run(): void
    {
    Schema::disableForeignKeyConstraints();

        // 🧹 تنظيف الجداول المرتبطة قبل إعادة التخزين
        DB::table('court_types')->truncate();
        
        Schema::enableForeignKeyConstraints();

        
 
       DB::table('court_types')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'مدنية',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'أسرة',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'جنائية',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'إدارية',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'إقتصادية',
                'created_at' => NULL,
                'updated_at' => NULL,
            ),
        ));
        
        
    }
}