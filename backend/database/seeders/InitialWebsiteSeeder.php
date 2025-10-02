<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\Article;
use App\Models\ContentBlock;
use App\Models\Page;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class InitialWebsiteSeeder extends Seeder
{
    public function run(): void
    {
        $this->seedHeroPage();
        $this->seedAboutPage();
        $this->seedServicesPage();
        $this->seedTeam();
        $this->seedAchievements();
        $this->seedArticles();
        $this->seedBranding();
    }

    private function seedHeroPage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'hero'],
            ['title_ar' => 'الرئيسية', 'title_en' => 'Home']
        );

        $page->contentBlocks()->delete();

        $slides = [
            [
                'badge' => [
                    'ar' => 'وحدة التقاضي الرئيسية',
                    'en' => 'Flagship Litigation Unit',
                ],
                'title' => [
                    'ar' => 'محامون نخبة للقضايا المصيرية',
                    'en' => 'Elite trial counsel for high-stakes mandates',
                ],
                'subtitle' => [
                    'ar' => 'محامون مخضرمون وسير عمل رقمية تحمي مصالحك عبر محاكم المنطقة.',
                    'en' => 'Seasoned advocates and digital workflows protect your interests across MENA courts.',
                ],
                'bullets' => [
                    'ar' => [
                        'إدارة استراتيجية للنزاعات التجارية والإدارية والجنائية.',
                        'غرف أدلة مؤمنة وإيداعات منظمة بدقة عالية.',
                        'مكتب طوارئ ثنائي اللغة على مدار الساعة للأوامر العاجلة والتنفيذ.',
                    ],
                    'en' => [
                        'Strategic command of commercial, administrative, and criminal disputes.',
                        'Secure evidence rooms and filings orchestrated with military precision.',
                        '24/7 bilingual crisis desk for urgent injunctions and enforcement.',
                    ],
                ],
            ],
            [
                'badge' => [
                    'ar' => 'التحول الرقمي',
                    'en' => 'Digital Transformation',
                ],
                'title' => [
                    'ar' => 'شغّل مكتبك على بنية رقمية موحدة',
                    'en' => 'Operate your firm on a unified digital backbone',
                ],
                'subtitle' => [
                    'ar' => 'إدارة القضايا بالذكاء الاصطناعي تمنحك الوضوح والامتثال والربحية.',
                    'en' => 'AI-enabled matter management delivers clarity, compliance, and profitability.',
                ],
                'bullets' => [
                    'ar' => [
                        'تحليلات تنبؤية تقيم المخاطر والقيمة والزمن قبل التقديم.',
                        'لوحات عملاء تعرض التقدم والرسوم والمؤشرات لحظة بلحظة.',
                        'تجميع عقود آلي ينفذ مستندات متوافقة فوراً.',
                    ],
                    'en' => [
                        'Predictive analytics score risk, value, and timelines before filing.',
                        'Client dashboards report progress, fees, and key metrics in real time.',
                        'Automated document assembly executes compliant contracts instantly.',
                    ],
                ],
            ],
            [
                'badge' => [
                    'ar' => 'شريك عبر الحدود',
                    'en' => 'Trusted Cross-Border Partner',
                ],
                'title' => [
                    'ar' => 'شراكات تتمدد عبر الولايات القضائية',
                    'en' => 'Partnerships that scale across jurisdictions',
                ],
                'subtitle' => [
                    'ar' => 'نماذج تعاونية تنسق فرقك مع الجهات التنظيمية والمستثمرين والعملاء.',
                    'en' => 'Collaborative models align your teams with regulators, investors, and clients.',
                ],
                'bullets' => [
                    'ar' => [
                        'شبكة مستشارين في الخليج وأوروبا لتنفيذ عابر للحدود بلا انقطاع.',
                        'غرف تعاون مؤمنة تحافظ على تزامن الجهات الرقابية وأصحاب المصلحة.',
                        'دليل تشغيلي مصمم ينسق الحوكمة والامتثال واستراتيجيات النزاع.',
                    ],
                    'en' => [
                        'Integrated GCC and EU counsel network for seamless cross-border execution.',
                        'Cybersecure collaboration rooms keep regulators and stakeholders in sync.',
                        'Tailored playbooks align governance, compliance, and dispute strategies.',
                    ],
                ],
            ],
            [
                'badge' => [
                    'ar' => 'فريق الخبراء',
                    'en' => 'Elite Advisory Collective',
                ],
                'title' => [
                    'ar' => 'آمن. قابل للتوسع. استثنائي ببساطة.',
                    'en' => 'Secure. Scalable. Simply Extraordinary.',
                ],
                'subtitle' => [
                    'ar' => 'فرق خبراء متخصصة تجمع التميز القانوني مع أمان بمستوى البنوك لأهم قضاياك الاستراتيجية.',
                    'en' => 'Dedicated expert pods blend legal mastery with bank-grade security for your most strategic matters.',
                ],
                'bullets' => [
                    'ar' => [
                        'فرق عمل متخصصة توحد المحامين والاستشاريين والخبراء التقنيين لكل تفويض قانوني.',
                        'مراكز تعاون لحظية تبقي العملاء والجهات التنظيمية والشركاء في انسجام تام.',
                        'أدلة تحول مجربة تسرّع الاعتماد عبر العمليات الإقليمية والعالمية.',
                    ],
                    'en' => [
                        'Specialized task forces align litigators, consultants, and technologists for every mandate.',
                        'Real-time collaboration hubs keep clients, regulators, and partners perfectly synchronized.',
                        'Proven transformation playbooks accelerate adoption across regional and global operations.',
                    ],
                ],
            ],
        ];

        foreach ($slides as $index => $slide) {
            $position = $index + 1;

            $page->contentBlocks()->createMany([
                [
                    'key' => "hero_slide_{$position}_badge",
                    'type' => 'text',
                    'value' => $slide['badge'],
                ],
                [
                    'key' => "hero_slide_{$position}_title",
                    'type' => 'text',
                    'value' => $slide['title'],
                ],
                [
                    'key' => "hero_slide_{$position}_subtitle",
                    'type' => 'text',
                    'value' => $slide['subtitle'],
                ],
                [
                    'key' => "hero_slide_{$position}_bullets",
                    'type' => 'list',
                    'value' => $slide['bullets'],
                ],
            ]);
        }

        $page->contentBlocks()->createMany([
            [
                'key' => 'hero_cta_demo_label',
                'type' => 'text',
                'value' => [
                    'ar' => 'اطلب العرض التفاعلي',
                    'en' => 'Request Live Demo',
                ],
            ],
            [
                'key' => 'hero_cta_contact_label',
                'type' => 'text',
                'value' => [
                    'ar' => 'تواصل مع الخبراء',
                    'en' => 'Speak to Counsel',
                ],
            ],
        ]);
    }

    private function seedAboutPage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'about'],
            ['title_ar' => 'من نحن', 'title_en' => 'About']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'about_badge',
                'type' => 'text',
                'value' => [
                    'ar' => 'عن أفوكات',
                    'en' => 'About Avocat',
                ],
            ],
            [
                'key' => 'about_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'الفخامة والابتكار وخدمات موثوقة',
                    'en' => 'Prestige, Innovation, and Trusted Counsel',
                ],
            ],
            [
                'key' => 'about_description',
                'type' => 'text',
                'value' => [
                    'ar' => 'نقود التحول الرقمي القانوي مع الحفاظ على الإرث وتقديم عدالة أذكى وأسرع لكل عميل.',
                    'en' => 'We champion digital legal transformation that honours heritage while unlocking smarter, faster justice for every client.',
                ],
            ],
            [
                'key' => 'about_detail_label',
                'type' => 'text',
                'value' => [
                    'ar' => 'ريادة رقمية',
                    'en' => 'Digital Leadership',
                ],
            ],
        ]);

        $pillars = [
            [
                'title' => [
                    'ar' => 'التأسيس والإرث',
                    'en' => 'Foundation & Heritage',
                ],
                'description' => [
                    'ar' => 'تأسس مكتب أفوكات عام 2013 ليكون جسراً بين الخبرة القانونية التقليدية والابتكار الرقمي، مقدماً عدالة أكثر أماناً وشفافية وفعالية.',
                    'en' => 'Founded in 2013, Avocat Law Firm bridges traditional expertise with digital innovation to deliver justice that is safer, more transparent, and more efficient.',
                ],
                'points' => [
                    'ar' => [
                        'حضور إقليمي يمتد من القاهرة ودبي إلى الرياض لدعم القضايا العابرة للحدود.',
                        'رقمنة أكثر من 12,000 ملف قانوني بأرشفة محكمة واسترجاع ذكي.',
                    ],
                    'en' => [
                        'Regional footprint spanning Cairo, Dubai, and Riyadh to support complex cross-border mandates.',
                        'Digitised more than 12,000 legal files with tamper-proof archives and intelligent retrieval.',
                    ],
                ],
            ],
            [
                'title' => [
                    'ar' => 'الرؤية والرسالة',
                    'en' => 'Vision & Mission',
                ],
                'description' => [
                    'ar' => 'أن نصبح الوجهة الأولى للعملاء الباحثين عن حلول قانونية رقمية ذكية تقوم على الثقة والسرعة والاحترافية.',
                    'en' => 'To be the leading destination for clients seeking smart digital legal solutions built on trust, speed, and professionalism.',
                ],
                'points' => [
                    'ar' => [
                        'الرؤية: منظومات عدالة ذكية تعزز ثقة العملاء ومرونة المؤسسات.',
                        'الرسالة: توظيف الاستشارات القانونية والتقنية والامتثال في منظومة واحدة لكل تكليف.',
                    ],
                    'en' => [
                        'Vision: smart justice ecosystems that elevate client confidence and institutional agility.',
                        'Mission: orchestrate integrated counsel, technology, and compliance for every mandate.',
                    ],
                ],
            ],
            [
                'title' => [
                    'ar' => 'فلسفة المستقبل',
                    'en' => 'Future Philosophy',
                ],
                'description' => [
                    'ar' => 'نرسم أطر عمل مستقبلية يلتقي فيها القانون بالبيانات والتصميم لصياغة عدالة متينة.',
                    'en' => 'We design forward-looking frameworks where law, data, and design converge to shape resilient justice.',
                ],
                'points' => [
                    'ar' => [
                        'مختبرات الابتكار تطور محاكم رقمية ومحاكمات إلكترونية ومساحات تشريعية تجريبية.',
                        'برامج تطوير مستمرة للمحامين والمحللين والعملاء في مجالات الذكاء الاصطناعي والأمن السيبراني.',
                    ],
                    'en' => [
                        'Innovation sprints prototype digital courtrooms, e-trials, and regulatory sandboxes.',
                        'Continuous capability-building for lawyers, analysts, and clients on AI and cybersecurity disciplines.',
                    ],
                ],
            ],
            [
                'title' => [
                    'ar' => 'التزامنا بالعملاء',
                    'en' => 'Client Commitment',
                ],
                'description' => [
                    'ar' => 'لأننا نمزج بين الخبرة القانونية العميقة وأحدث التقنيات لنقدم حلولاً مبتكرة وشفافة وموثوقة.',
                    'en' => 'Because we blend deep legal expertise with cutting-edge technology, delivering transparent, innovative, and reliable solutions.',
                ],
                'points' => [
                    'ar' => [
                        'بوابات آمنة وتقارير دقيقة ومؤشرات أداء قابلة للقياس في كل مهمة.',
                        'حوكمة أخلاقية تضمن السرية والشفافية والمساءلة.',
                    ],
                    'en' => [
                        'Secure portals, bilingual reporting, and measurable KPIs for every engagement.',
                        'Ethical governance that safeguards confidentiality, transparency, and accountability.',
                    ],
                ],
            ],
        ];

        foreach ($pillars as $index => $pillar) {
            $position = $index + 1;

            $page->contentBlocks()->createMany([
                [
                    'key' => "about_pillar_{$position}_title",
                    'type' => 'text',
                    'value' => $pillar['title'],
                ],
                [
                    'key' => "about_pillar_{$position}_description",
                    'type' => 'text',
                    'value' => $pillar['description'],
                ],
                [
                    'key' => "about_pillar_{$position}_points",
                    'type' => 'list',
                    'value' => $pillar['points'],
                ],
            ]);
        }
    }

    private function seedServicesPage(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'services'],
            ['title_ar' => 'خدماتنا', 'title_en' => 'Services']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'services_badge',
                'type' => 'text',
                'value' => [
                    'ar' => 'الخدمات القانونية والرقمية',
                    'en' => 'Legal & Digital Services',
                ],
            ],
            [
                'key' => 'services_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'منظومة متكاملة من الاستشارات والمنصات الذكية',
                    'en' => 'Full-Spectrum Counsel and Intelligent Platforms',
                ],
            ],
            [
                'key' => 'services_description',
                'type' => 'text',
                'value' => [
                    'ar' => 'خدمات مصممة بعناية تمزج بين المرافعة والحوكمة والتسريع الرقمي للمؤسسات الطموحة.',
                    'en' => 'Precision-crafted services blending advocacy, governance, and digital acceleration for ambitious institutions.',
                ],
            ],
        ]);

        $groups = [
            'legal_services' => [
                'title' => [
                    'ar' => 'الخدمات القانونية',
                    'en' => 'Legal Services',
                ],
                'description' => [
                    'ar' => 'التقاضي وحل النزاعات، التحكيم التجاري والدولي، صياغة العقود، الاستشارات للشركات، تأسيس الشركات، حماية الملكية الفكرية، والامتثال المتخصص لكل قطاع.',
                    'en' => 'Litigation & dispute resolution, international arbitration, contract drafting, corporate advisory, company formation, IP protection, and sector-specific compliance.',
                ],
                'items' => [
                    'ar' => [
                        'التقاضي وحل النزاعات',
                        'التحكيم التجاري والدولي',
                        'صياغة العقود والتفاوض',
                        'استشارات الحوكمة للشركات',
                        'تأسيس الشركات',
                        'حماية الملكية الفكرية',
                        'الامتثال للتشريعات',
                    ],
                    'en' => [
                        'Litigation & Dispute Resolution',
                        'International Arbitration',
                        'Contract Drafting & Negotiation',
                        'Corporate Governance Advisory',
                        'Company Incorporation',
                        'Intellectual Property Protection',
                        'Regulatory Compliance',
                    ],
                ],
            ],
            'digital_ai_services' => [
                'title' => [
                    'ar' => 'الخدمات الرقمية والذكاء الاصطناعي',
                    'en' => 'Digital & AI Services',
                ],
                'description' => [
                    'ar' => 'إدارة القضايا الرقمية، مساعدو البحث بالذكاء الاصطناعي، سير عمل التوقيع الإلكتروني، أتمتة الامتثال، مكافحة الجريمة الإلكترونية، وبرامج خصوصية البيانات.',
                    'en' => 'Digital case management, AI research assistants, e-signature workflows, compliance automation, cybercrime protection, and data privacy programs.',
                ],
                'items' => [
                    'ar' => [
                        'استراتيجيات القضايا المدعومة بالذكاء الاصطناعي',
                        'منصات إدارة القضايا الرقمية',
                        'سير عمل التوقيع الإلكتروني الآمن',
                        'لوحات أتمتة الامتثال',
                        'مكافحة الجريمة الإلكترونية',
                        'تدقيق خصوصية البيانات والحوكمة',
                        'الأدلة الجنائية الرقمية',
                    ],
                    'en' => [
                        'AI-Augmented Case Strategy',
                        'Digital Case Management Platforms',
                        'Secure E-Signature Workflows',
                        'Compliance Automation Dashboards',
                        'Cybercrime Protection',
                        'Data Privacy & Governance Audits',
                        'Digital Evidence Forensics',
                    ],
                ],
            ],
        ];

        foreach ($groups as $key => $group) {
            $page->contentBlocks()->createMany([
                [
                    'key' => "services_group_{$key}_title",
                    'type' => 'text',
                    'value' => $group['title'],
                ],
                [
                    'key' => "services_group_{$key}_description",
                    'type' => 'text',
                    'value' => $group['description'],
                ],
                [
                    'key' => "services_group_{$key}_items",
                    'type' => 'list',
                    'value' => $group['items'],
                ],
            ]);
        }

        $page->contentBlocks()->createMany([
            [
                'key' => 'services_highlight_1',
                'type' => 'text',
                'value' => [
                    'ar' => 'أمن سيبراني متوافق مع معيار ISO 27001 لحماية الملفات الحساسة.',
                    'en' => 'ISO 27001-aligned cybersecurity for sensitive case files.',
                ],
            ],
            [
                'key' => 'services_highlight_2',
                'type' => 'text',
                'value' => [
                    'ar' => 'تحليلات متكاملة وتقارير ولوحات شفافية للعملاء.',
                    'en' => 'Integrated analytics, reporting, and client transparency dashboards.',
                ],
            ],
        ]);
    }

    private function seedTeam(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'team'],
            ['title_ar' => 'الفريق', 'title_en' => 'Team']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'team_badge',
                'type' => 'text',
                'value' => [
                    'ar' => 'الفريق القيادي',
                    'en' => 'Leadership Team',
                ],
            ],
            [
                'key' => 'team_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'عقول قانونية تقود العدالة الرقمية',
                    'en' => 'Legal Minds Leading Digital Justice',
                ],
            ],
            [
                'key' => 'team_description',
                'type' => 'text',
                'value' => [
                    'ar' => 'شركاء خضرمون يجمعون بين الخبرة القضائية والرؤية التقنية التحولية.',
                    'en' => 'Senior partners blending courtroom mastery with transformative technology insight.',
                ],
            ],
            [
                'key' => 'team_leadership_badge_1',
                'type' => 'text',
                'value' => [
                    'ar' => 'مدافع عن العدالة الذكية',
                    'en' => 'Smart Justice Advocate',
                ],
            ],
            [
                'key' => 'team_leadership_badge_2',
                'type' => 'text',
                'value' => [
                    'ar' => 'متحدث في برامج دولية',
                    'en' => 'Global Faculty Speaker',
                ],
            ],
            [
                'key' => 'team_leadership_badge_3',
                'type' => 'text',
                'value' => [
                    'ar' => 'مستشار الأمن السيبراني',
                    'en' => 'Cybersecurity Counsel',
                ],
            ],
        ]);

        $members = [
            [
                'name_ar' => 'الأستاذ سامي محمد الجمل',
                'name_en' => 'Mr. Sami Mohamed El-Gamal',
                'position_ar' => 'الشريك المدير – القضايا التجارية والتحكيم الدولي',
                'position_en' => 'Managing Partner – Commercial Disputes & International Arbitration',
                'bio_ar' => 'مهندس استراتيجيات التقاضي التجاري عالية القيمة بخبرة تتجاوز 18 عاماً في تمثيل الشركات العالمية والجهات السيادية والمؤسسات المالية الرائدة في المنطقة.',
                'bio_en' => 'Architect of high-stakes commercial litigation strategies with more than 18 years representing global corporates, sovereign entities, and leading financial institutions across MENA.',
                'highlights_ar' => [
                    'محكّم معتمد لدى ICC وLCIA يقود أدلة التحكيم الرقمية ومشاريع الاسترداد العابرة للحدود.',
                    'رائد المحاكم بلا أوراق ونماذج المرافعات المدعومة بالذكاء الاصطناعي المعتمدة لدى كبار العملاء.',
                ],
                'highlights_en' => [
                    'ICC & LCIA accredited counsel leading digital arbitration playbooks and cross-border recovery projects.',
                    'Champion of paperless courtrooms and AI-assisted pleading models adopted by tier-one clients.',
                ],
                'image' => null,
            ],
            [
                'name_ar' => 'الأستاذ عبدالحميد محمد عسكر',
                'name_en' => 'Mr. Abdelhamid Mohamed Askar',
                'position_ar' => 'شريك – المنازعات المدنية وقانون الأمن السيبراني',
                'position_en' => 'Partner – Civil Litigation & Cybersecurity Law',
                'bio_ar' => 'متخصص في المنازعات الإدارية والمدنية والجرائم السيبرانية مع خبرة تمتد لعقد في قيادة التحقيقات الرقمية وبرامج التحول التشريعي.',
                'bio_en' => 'Specialist in administrative, civil, and cybercrime litigation with a decade leading digital forensics investigations and regulatory transformation programs.',
                'highlights_ar' => [
                    'صمم أطر الاستجابة الوطنية للجرائم الإلكترونية بدمج الفرق القانونية والفنية وفِرق الامتثال.',
                    'يستشار في سياسات الخصوصية المدمجة بالتصميم وتوطين البيانات وحوكمة الذكاء الاصطناعي للجهات التنظيمية وروّاد التكنولوجيا المالية.',
                ],
                'highlights_en' => [
                    'Designed national cybercrime response frameworks integrating legal, technical, and compliance teams.',
                    'Advises on privacy-by-design policies, data localization, and AI governance for regulators and fintech leaders.',
                ],
                'image' => null,
            ],
        ];

        foreach ($members as $member) {
            TeamMember::updateOrCreate(
                ['name_en' => $member['name_en']],
                $member
            );
        }
    }

    private function seedAchievements(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'achievements'],
            ['title_ar' => 'الإنجازات', 'title_en' => 'Achievements']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'achievements_badge',
                'type' => 'text',
                'value' => [
                    'ar' => 'الإنجازات',
                    'en' => 'Achievements',
                ],
            ],
            [
                'key' => 'achievements_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'نتائج مثبتة يثق بها القادة',
                    'en' => 'Proven Outcomes, Trusted by Leaders',
                ],
            ],
            [
                'key' => 'achievements_description',
                'type' => 'text',
                'value' => [
                    'ar' => 'انتصارات مفصلية وشراكات تحولية وأحكام رقمية تعيد تعريف التميز القانوني.',
                    'en' => 'Landmark victories, transformative partnerships, and digitally-enabled judgments that redefine legal excellence.',
                ],
            ],
            [
                'key' => 'achievements_metric_1',
                'type' => 'text',
                'value' => [
                    'ar' => 'نسبة تحول رقمي 98٪ في ملفات العملاء',
                    'en' => '98% digital adoption across client mandates',
                ],
            ],
            [
                'key' => 'achievements_metric_2',
                'type' => 'text',
                'value' => [
                    'ar' => 'أكثر من 45 ولاية قضائية بدعم فرق متعددة اللغات',
                    'en' => '45+ jurisdictions coordinated with multilingual teams',
                ],
            ],
            [
                'key' => 'achievements_metric_3',
                'type' => 'text',
                'value' => [
                    'ar' => 'مراكز قيادة واستجابة قانونية على مدار الساعة',
                    'en' => '24/7 incident response and legal command centers',
                ],
            ],
        ]);

        $stories = [
            [
                'title' => [
                    'ar' => 'قضايا محورية',
                    'en' => 'Landmark Cases',
                ],
                'summary' => [
                    'ar' => 'استرداد 240 مليون دولار في نزاع احتيال عابر للحدود عبر رسم خريطة رقمية للأدلة واستراتيجية تحكيم منسقة.',
                    'en' => 'Recovered USD 240M in a cross-border fraud dispute by orchestrating digital evidence mapping and coordinated arbitration strategy.',
                ],
                'details' => [
                    'ar' => [
                        'أول مكتب في المنطقة يعتمد سجلات البلوكتشين كأدلة مقبولة قضائياً.',
                        'فرق هجينة تجمع بين خبراء التدقيق الجنائي والمحامين ومحللي الأمن السيبراني.',
                    ],
                    'en' => [
                        'First MENA firm to validate blockchain records as admissible court evidence.',
                        'Hybrid teams blended forensic auditors, litigators, and cybersecurity analysts.',
                    ],
                ],
            ],
            [
                'title' => [
                    'ar' => 'شهادات العملاء',
                    'en' => 'Client Testimonials',
                ],
                'summary' => [
                    'ar' => '"أفوكات يقدم شفافية غير مسبوقة؛ مديرونا يتابعون الجلسات والمذكرات ومؤشرات الأداء مباشرة عبر مختلف الأجهزة." – المدير المالي لمجموعة طاقة إقليمية',
                    'en' => '“Avocat delivers unparalleled transparency. Our executives monitor hearings, filings, and KPIs live across devices.” – CFO, Regional Energy Group',
                ],
                'details' => [
                    'ar' => [
                        'رضا العملاء بنسبة 96٪ بفضل التقارير الدقيقة وغرف التعاون المؤمنة.',
                        'فريق دعم رقمي متخصص لخدمة الوزارات والصناديق السيادية وحاضنات الابتكار.',
                    ],
                    'en' => [
                        '96% client satisfaction with bilingual reporting and secured collaboration rooms.',
                        'Dedicated digital concierge supporting ministries, sovereign funds, and innovation hubs.',
                    ],
                ],
            ],
            [
                'title' => [
                    'ar' => 'أحكام مميزة',
                    'en' => 'Notable Judgments',
                ],
                'summary' => [
                    'ar' => 'أحكام إدارية وجنائية رائدة عززت قبول التوقيعات الرقمية وحماية الأمن السيبراني وحوكمة الامتثال.',
                    'en' => 'Secured precedent-setting administrative and criminal judgments reinforcing digital signatures, cybercrime protection, and compliance governance.',
                ],
                'details' => [
                    'ar' => [
                        'إطار عمل للتوقيع الإلكتروني معتمد قضائياً تبنته ثلاث جهات حكومية وطنية.',
                        'إرساء بروتوكولات للمحاكم الجنائية للتعامل مع الأدلة المولدة بالذكاء الاصطناعي.',
                    ],
                    'en' => [
                        'Court-endorsed e-signature framework adopted across three national authorities.',
                        'Pioneered criminal court protocols for handling AI-generated evidence.',
                    ],
                ],
            ],
        ];

        foreach ($stories as $index => $story) {
            $position = $index + 1;

            $page->contentBlocks()->createMany([
                [
                    'key' => "achievements_story_{$position}_title",
                    'type' => 'text',
                    'value' => $story['title'],
                ],
                [
                    'key' => "achievements_story_{$position}_summary",
                    'type' => 'text',
                    'value' => $story['summary'],
                ],
                [
                    'key' => "achievements_story_{$position}_details",
                    'type' => 'list',
                    'value' => $story['details'],
                ],
            ]);
        }

        $achievementStats = [
            ['title_ar' => 'قضايا ناجحة', 'title_en' => 'Successful Cases', 'number' => 250],
            ['title_ar' => 'أحكام براءة', 'title_en' => 'Acquittals', 'number' => 75],
            ['title_ar' => 'عقود وصيغ قانونية', 'title_en' => 'Contracts & Legal Drafts', 'number' => 500],
        ];

        foreach ($achievementStats as $stat) {
            Achievement::updateOrCreate(
                ['title_en' => $stat['title_en']],
                $stat
            );
        }
    }

    private function seedArticles(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'articles'],
            ['title_ar' => 'المدونة', 'title_en' => 'Insights & Blog']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'articles_badge',
                'type' => 'text',
                'value' => [
                    'ar' => 'مدونة التحول الرقمي',
                    'en' => 'Insights & Blog',
                ],
            ],
            [
                'key' => 'articles_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'ريادة فكرية في التحول الرقمي القانوني',
                    'en' => 'Thought Leadership in Digital Legal Transformation',
                ],
            ],
            [
                'key' => 'articles_description',
                'type' => 'text',
                'value' => [
                    'ar' => 'رؤى تساعد مجالس الإدارة والمبتكرين والفرق القانونية على التنقل في مجالات الذكاء الاصطناعي والأمن السيبراني وإصلاحات العدالة الذكية.',
                    'en' => 'Perspectives that help boards, innovators, and legal teams navigate AI, cybersecurity, and smart justice reforms.',
                ],
            ],
            [
                'key' => 'articles_cta',
                'type' => 'text',
                'value' => [
                    'ar' => 'اقرأ التحليل الكامل ↗',
                    'en' => 'Read the full insight ↗',
                ],
            ],
        ]);

        $articles = [
            [
                'title_ar' => 'حوكمة الذكاء الاصطناعي في مكاتب المحاماة الحديثة',
                'title_en' => 'AI Governance for the Modern Law Firm',
                'tag_ar' => 'التحول القانوني الرقمي',
                'tag_en' => 'Digital Legal Transformation',
                'summary_ar' => 'اكتشف كيف تسرّع التحليلات التنبؤية والمساعدات المعتمدة على التعلم الآلي والأطر الأخلاقية عمليات البحث في السوابق مع الحفاظ على المسؤولية المهنية.',
                'summary_en' => 'Discover how predictive analytics, machine learning assistants, and ethical frameworks accelerate precedent research while preserving professional responsibility.',
                'body_ar' => 'تحليل معمق لدور الذكاء الاصطناعي في تطوير البحث القانوني وتقييم المخاطر مع الالتزام بالمعايير الأخلاقية العالمية.',
                'body_en' => 'An in-depth look at how AI enhances legal research, risk scoring, and ethical governance frameworks across global mandates.',
            ],
            [
                'title_ar' => 'لوحات عدالة ذكية للقيادات التنفيذية',
                'title_en' => 'Smart Justice Dashboards for Executives',
                'tag_ar' => 'شفافية العملاء',
                'tag_en' => 'Client Transparency',
                'summary_ar' => 'لوحات تحكم تدمج حالة القضايا وتحليلات الميزانيات ومؤشرات رضا العملاء لتوفير حوكمة لحظية لمجالس الإدارة والوزارات.',
                'summary_en' => 'Dashboards that integrate litigation status, budget analytics, and client sentiment deliver real-time governance to boards and ministries.',
                'body_ar' => 'دراسة حول كيفية تقديم لوحات العدالة الذكية رؤية موحدة للأداء القانوني والمالي وتوقعات العملاء.',
                'body_en' => 'A study on how smart justice dashboards consolidate legal performance, financial KPIs, and client expectations into a single source of truth.',
            ],
            [
                'title_ar' => 'أدلة مكافحة الجرائم الإلكترونية للقطاعات المنظمة',
                'title_en' => 'Cybercrime Playbooks for Regulated Industries',
                'tag_ar' => 'الأمن السيبراني',
                'tag_en' => 'Cybersecurity',
                'summary_ar' => 'من الخدمات المالية إلى الرعاية الصحية، استكشف التحقيقات الرقمية المتوافقة، والاستجابة للحوادث، واستراتيجيات الإخطار العابرة للحدود.',
                'summary_en' => 'From financial services to healthcare, explore compliant digital forensics, incident response, and cross-border notification strategies.',
                'body_ar' => 'خريطة طريق للجهات المنظمة لتصميم أدلة استجابة للحوادث تتوافق مع المعايير الدولية وتحمي الثقة الرقمية.',
                'body_en' => 'A roadmap for regulators to build cybercrime response playbooks that align with international standards and protect digital trust.',
            ],
        ];

        foreach ($articles as $article) {
            $slug = Str::slug($article['title_en']);

            Article::updateOrCreate(
                ['slug' => $slug],
                $article + ['slug' => $slug, 'cover_image' => null]
            );
        }
    }

    private function seedBranding(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'branding'],
            ['title_ar' => 'الهوية البصرية', 'title_en' => 'Branding']
        );

        $page->contentBlocks()->delete();

        $sharedIconPaths = [
            'light' => '/branding/icons/logo-icon-light.png',
            'dark' => '/branding/icons/logo-icon-dark.png',
        ];

        $page->contentBlocks()->createMany([
            [
                'key' => 'logo_icon',
                'type' => 'image',
                'value' => [
                    'ar' => $sharedIconPaths,
                    'en' => $sharedIconPaths,
                ],
            ],
            [
                'key' => 'logo_text',
                'type' => 'image',
                'value' => [
                    'ar' => [
                        'light' => '/branding/text/logo-text-ar-light.png',
                        'dark' => '/branding/text/logo-text-ar-dark.png',
                    ],
                    'en' => [
                        'light' => '/branding/text/logo-text-en-light.png',
                        'dark' => '/branding/text/logo-text-en-dark.png',
                    ],
                ],
            ],
            [
                'key' => 'logo_full',
                'type' => 'image',
                'value' => [
                    'ar' => [
                        'light' => '/branding/full/logo-full-arabic-light.png',
                        'dark' => '/branding/full/logo-full-arabic-dark.png',
                    ],
                    'en' => [
                        'light' => '/branding/full/logo-full-en-light.png',
                        'dark' => '/branding/full/logo-full-en-dark.png',
                    ],
                ],
            ],
        ]);
    }
}
