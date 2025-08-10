<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use App\Models\LegalAdType;
use Illuminate\Database\Seeder;

class LegalAdTypeSeeder extends Seeder
{
       public function run(): void
    {
        $types = [
            'انذار على يد محضر',
            'اعلان بالدعوى الفرعية',
            'اعادة اعلان',
            'اعلان في مواجهة النيابة',
            'اعلان بالتدخل هجومي',
            'اعلان بالتدخل إنضمامى',
            'إنذار بالطرد',
            // يمكنك إضافة المزيد من الأمثلة هنا
        ];

        foreach ($types as $type) {
            LegalAdType::create([
                'name' => $type,
            ]);
        }
    }
}
