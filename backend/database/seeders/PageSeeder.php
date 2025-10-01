<?php

namespace Database\Seeders;

use App\Models\ContentBlock;
use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            'hero' => [
                'title_ar' => 'الصفحة الرئيسية',
                'title_en' => 'Landing Page',
                'blocks' => [
                    [
                        'key' => 'hero_title',
                        'type' => 'text',
                        'value' => [
                            'ar' => 'مرحبا بكم في مكتب أفوكات',
                            'en' => 'Welcome to Avocat Law Firm',
                        ],
                    ],
                    [
                        'key' => 'hero_subtitle',
                        'type' => 'text',
                        'value' => [
                            'ar' => 'نقدم خدمات قانونية متكاملة',
                            'en' => 'We provide comprehensive legal services',
                        ],
                    ],
                ],
            ],
            'about' => [
                'title_ar' => 'من نحن',
                'title_en' => 'About Us',
                'blocks' => [
                    [
                        'key' => 'about_description',
                        'type' => 'html',
                        'value' => [
                            'ar' => 'خبرة قانونية عميقة وشاملة.',
                            'en' => 'Extensive and in-depth legal expertise.',
                        ],
                    ],
                ],
            ],
            'services' => [
                'title_ar' => 'خدماتنا',
                'title_en' => 'Our Services',
                'blocks' => [
                    [
                        'key' => 'services_intro',
                        'type' => 'text',
                        'value' => [
                            'ar' => 'خدمات قانونية مصممة خصيصًا لعملائنا.',
                            'en' => 'Legal services tailored for our clients.',
                        ],
                    ],
                ],
            ],
        ];

        foreach ($pages as $slug => $data) {
            $page = Page::updateOrCreate(
                ['slug' => $slug],
                [
                    'title_ar' => $data['title_ar'],
                    'title_en' => $data['title_en'],
                ]
            );

            foreach ($data['blocks'] as $block) {
                ContentBlock::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'key' => $block['key'],
                    ],
                    [
                        'type' => $block['type'],
                        'value' => $block['value'],
                    ]
                );
            }
        }
    }
}
