<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Page;
use App\Models\ContentBlock;
use App\Models\TeamMember;
use App\Models\Article;
use App\Models\Achievement;

class InitialWebsiteSeeder extends Seeder
{
    public function run(): void
    {
        // Hero Page
        $hero = Page::create(['slug' => 'hero', 'title_ar' => 'الرئيسية', 'title_en' => 'Home']);
        ContentBlock::insert([
            [
                'page_id' => $hero->id,
                'key' => 'hero_title',
                'type' => 'text',
                'value' => json_encode(['ar' => 'أفوكات: شريك قانوني يجمع بين الخبرة والابتكار منذ 2013',
                                        'en' => 'Avocat: Your Trusted Legal Partner blending Expertise and Innovation since 2013']),
            ],
            [
                'page_id' => $hero->id,
                'key' => 'hero_subtitle',
                'type' => 'text',
                'value' => json_encode(['ar' => 'حلول قانونية متكاملة بأعلى معايير الشفافية والاحترافية.',
                                        'en' => 'Comprehensive Legal Solutions with Transparency and Professionalism.']),
            ]
        ]);

        // About Page
        $about = Page::create(['slug' => 'about', 'title_ar' => 'من نحن', 'title_en' => 'About']);
        ContentBlock::insert([
            [
                'page_id' => $about->id,
                'key' => 'mission',
                'type' => 'text',
                'value' => json_encode(['ar' => 'تأسس المكتب عام 2013 بهدف الدمج بين الخبرة القانونية والتكنولوجيا الحديثة.',
                                        'en' => 'Avocat was founded in 2013 to combine traditional legal expertise with modern technology.']),
            ],
            [
                'page_id' => $about->id,
                'key' => 'vision',
                'type' => 'text',
                'value' => json_encode(['ar' => 'أن نكون الوجهة الأولى للعملاء في العالم القانوني الذكي.',
                                        'en' => 'To be the leading destination for clients in the smart legal world.']),
            ]
        ]);

        // Services Page
        $services = Page::create(['slug' => 'services', 'title_ar' => 'خدماتنا', 'title_en' => 'Services']);
        $servicesList = [
            ['ar' => 'التقاضي وحل النزاعات أمام جميع درجات المحاكم.', 'en' => 'Litigation and dispute resolution before all courts.'],
            ['ar' => 'صياغة العقود والاتفاقيات وفق المعايير الدولية.', 'en' => 'Drafting contracts and agreements according to international standards.'],
            ['ar' => 'استشارات قانونية متخصصة للشركات والأفراد.', 'en' => 'Specialized legal consultancy for companies and individuals.'],
            ['ar' => 'خدمات تأسيس الشركات وإدارة الامتثال القانوني.', 'en' => 'Company formation and compliance management.'],
            ['ar' => 'حماية الملكية الفكرية.', 'en' => 'Intellectual property protection.'],
            ['ar' => 'التحكيم التجاري وتسوية النزاعات الدولية.', 'en' => 'Commercial arbitration and international dispute resolution.'],
        ];
        foreach ($servicesList as $i => $srv) {
            ContentBlock::create([
                'page_id' => $services->id,
                'key' => 'service_'.($i+1),
                'type' => 'text',
                'value' => json_encode($srv),
            ]);
        }

        // Team
        TeamMember::insert([
            [
                'name_ar' => 'الأستاذ محمد سامي',
                'name_en' => 'Mr. Mohamed Sami',
                'position_ar' => 'محامٍ متخصص في القضايا التجارية والتحكيم الدولي',
                'position_en' => 'Lawyer specialized in commercial cases and international arbitration',
                'bio_ar' => 'خبرة واسعة في إدارة النزاعات التجارية والعقود العقارية.',
                'bio_en' => 'Extensive experience in managing commercial disputes and real estate contracts.',
                'image' => 'team/mohamed_sami.jpg',
            ],
            [
                'name_ar' => 'الأستاذ محمد عبد الحميد',
                'name_en' => 'Mr. Mohamed Abdelhamid',
                'position_ar' => 'محامٍ متخصص في النزاعات المدنية والأمن السيبراني',
                'position_en' => 'Lawyer specialized in civil disputes and cyber security',
                'bio_ar' => 'خبرة عميقة في القضايا المدنية والجرائم الإلكترونية.',
                'bio_en' => 'Deep expertise in civil cases and cybercrime.',
                'image' => 'team/mohamed_abdelhamid.jpg',
            ],
        ]);

        // Achievements
        Achievement::insert([
            ['title_ar' => 'قضايا ناجحة', 'title_en' => 'Successful Cases', 'number' => 250],
            ['title_ar' => 'أحكام براءة', 'title_en' => 'Acquittals', 'number' => 75],
            ['title_ar' => 'عقود وصيغ قانونية', 'title_en' => 'Contracts & Legal Drafts', 'number' => 500],
        ]);

        // Article
        Article::create([
            'title_ar' => 'الطلاق في القانون المصري: حقوق وواجبات',
            'title_en' => 'Divorce under Egyptian Law: Rights and Obligations',
            'body_ar' => 'مقال يشرح إجراءات الطلاق والحقوق المرتبطة به في القانون المصري...',
            'body_en' => 'An article explaining divorce procedures and associated rights under Egyptian law...',
            'slug' => 'divorce-egyptian-law',
            'cover_image' => 'articles/divorce.png'
        ]);
    }
}
