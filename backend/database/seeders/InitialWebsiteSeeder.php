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
        $this->seedCapabilities();
        $this->seedFeatures();
        $this->seedTeam();
        $this->seedTestimonials();
        $this->seedAchievements();
        $this->seedArticles();
        $this->seedCallToAction();
        $this->seedContact();
        $this->seedFooter();
        $this->seedSettings();
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
                'image' => [
                    'ar' => 'branding/landing/hero-legal-1.png',
                    'en' => 'branding/landing/hero-legal-1.png',
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
                'image' => [
                    'ar' => 'branding/landing/hero-digital-2.png',
                    'en' => 'branding/landing/hero-digital-2.png',
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
                'image' => [
                    'ar' => 'branding/landing/hero-partnership-3.png',
                    'en' => 'branding/landing/hero-partnership-3.png',
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
                'image' => [
                    'ar' => 'branding/landing/hero-team-4.png',
                    'en' => 'branding/landing/hero-team-4.png',
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
                    'key' => "hero_slide_{$position}_image",
                    'type' => 'image',
                    'value' => $slide['image'],
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

    private function seedCapabilities(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'capabilities'],
            ['title_ar' => 'الإمكانيات', 'title_en' => 'Capabilities']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'capabilities_badge',
                'type' => 'text',
                'value' => [
                    'ar' => 'الإمكانيات',
                    'en' => 'Capabilities',
                ],
            ],
            [
                'key' => 'capabilities_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'الذكاء والحماية والتمكن الرقمي',
                    'en' => 'Intelligence, Security, and Digital Mastery',
                ],
            ],
            [
                'key' => 'capabilities_subtitle',
                'type' => 'text',
                'value' => [
                    'ar' => 'نماذج تشغيل مصممة توحد التميز القانوني والتحليلات التنبؤية والأمن السيبراني الصارم.',
                    'en' => 'Tailored operating models unite legal excellence, predictive analytics, and uncompromising cybersecurity.',
                ],
            ],
        ]);

        $capabilities = [
            [
                'icon' => 'Layers',
                'title' => [
                    'ar' => 'القدرات الأساسية',
                    'en' => 'Core Capabilities',
                ],
                'description' => [
                    'ar' => 'استشارات استراتيجية في القضايا التجارية والإدارية والجنائية مدعومة بسير عمل رقمي دقيق.',
                    'en' => 'Strategic counsel across commercial, administrative, and criminal mandates supported by precision digital workflows.',
                ],
                'points' => [
                    'ar' => [
                        'إدارة شاملة لدورة حياة القضايا من التقاضي إلى التحكيم والتسويات.',
                        'لوحات تحكم لحظية تربط الشركاء والمحامين والعملاء بمؤشرات أداء قابلة للقياس.',
                    ],
                    'en' => [
                        'End-to-end lifecycle management for litigation, arbitration, and settlement.',
                        'Real-time dashboards aligning partners, associates, and clients with measurable KPIs.',
                    ],
                ],
            ],
            [
                'icon' => 'Cpu',
                'title' => [
                    'ar' => 'الذكاء الاصطناعي في الخدمات القانونية',
                    'en' => 'AI in Legal Services',
                ],
                'description' => [
                    'ar' => 'أنظمة ذكية لإدارة القضايا، البحث في السوابق، وبناء استراتيجيات قانونية قائمة على البيانات.',
                    'en' => 'Intelligent systems for case management, precedent research, and data-driven legal strategies.',
                ],
                'points' => [
                    'ar' => [
                        'خرائط معرفية تربط السوابق والتشريعات والآراء الخبرية في ثوانٍ.',
                        'محاكيات سيناريوهات تتوقع النتائج والأضرار ومخاطر الامتثال قبل التقديم.',
                    ],
                    'en' => [
                        'Knowledge graphs connect precedents, regulations, and expert opinions in seconds.',
                        'Scenario simulators model outcomes, damages, and compliance risks before submission.',
                    ],
                ],
            ],
            [
                'icon' => 'ShieldEllipsis',
                'title' => [
                    'ar' => 'الأمن السيبراني والثقة الرقمية',
                    'en' => 'Cybersecurity & Digital Trust',
                ],
                'description' => [
                    'ar' => 'حلول قانونية متطورة، تحقيقات رقمية، وتشريعات متوافقة مع القوانين الدولية لحماية الخصوصية والبيانات.',
                    'en' => 'Advanced legal solutions, digital forensics, and international compliance to protect privacy and data.',
                ],
                'points' => [
                    'ar' => [
                        'حماية من الجرائم الإلكترونية مع جاهزية للحوادث واحتواء للاختراقات وتبليغ تشريعي فوري.',
                        'بنية صفرية الثقة وتشفير وسجلات تدقيق تحمي كل مستند وتوقيع.',
                    ],
                    'en' => [
                        'Cybercrime protection with incident readiness, breach containment, and regulatory reporting.',
                        'Zero-trust architecture, encryption, and audit trails safeguarding every document and signature.',
                    ],
                ],
            ],
        ];

        foreach ($capabilities as $index => $capability) {
            $page->contentBlocks()->create([
                'key' => sprintf('capabilities_item_%d', $index + 1),
                'type' => 'json',
                'value' => [
                    'ar' => [
                        'icon' => $capability['icon'],
                        'title' => $capability['title']['ar'],
                        'description' => $capability['description']['ar'],
                        'points' => $capability['points']['ar'],
                    ],
                    'en' => [
                        'icon' => $capability['icon'],
                        'title' => $capability['title']['en'],
                        'description' => $capability['description']['en'],
                        'points' => $capability['points']['en'],
                    ],
                ],
            ]);
        }
    }

    private function seedFeatures(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'features'],
            ['title_ar' => 'الميزات', 'title_en' => 'Features']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'features_badge',
                'type' => 'text',
                'value' => [
                    'ar' => 'مرتكزات المنصة',
                    'en' => 'Platform Pillars',
                ],
            ],
            [
                'key' => 'features_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'مزايا ثورية للتقنية القانونية',
                    'en' => 'Revolutionary Legal Technology Solutions',
                ],
            ],
            [
                'key' => 'features_subtitle',
                'type' => 'text',
                'value' => [
                    'ar' => 'أدوات رقمية شاملة مصممة للتميز القانوني والكفاءة التشغيلية.',
                    'en' => 'Comprehensive digital tools engineered for legal excellence and operational efficiency.',
                ],
            ],
        ]);

        $features = [
            [
                'icon' => 'Shield',
                'title' => [
                    'ar' => 'حماية البيانات المتقدمة',
                    'en' => 'Advanced Data Protection',
                ],
                'description' => [
                    'ar' => 'تشفير بمستوى عسكري مع امتثال ISO 27001 يضمن بقاء وثائقك القانونية السرية ومعلومات العملاء الحساسة آمنة تماماً. بياناتك محمية في كل نقطة لمس رقمية.',
                    'en' => 'Military-grade encryption with ISO 27001 compliance keeps confidential legal documents and sensitive client information absolutely secure. Your data remains protected at every digital touchpoint.',
                ],
                'tagline' => [
                    'ar' => 'بياناتك، محمية في كل خطوة',
                    'en' => 'Your data, secured at every step',
                ],
            ],
            [
                'icon' => 'Users',
                'title' => [
                    'ar' => 'إدارة العملاء الذكية',
                    'en' => 'Intelligent Client Management',
                ],
                'description' => [
                    'ar' => 'نظام CRM ثوري مصمم خصيصاً للممارسات القانونية. تتبع تواصل العملاء، أتمت المتابعات، أدر الأتعاب، وقدم تجارب عملاء شخصية تبني علاقات دائمة.',
                    'en' => 'A revolutionary CRM designed specifically for legal practices. Track client communications, automate follow-ups, manage retainers, and deliver personalised experiences that build lasting relationships.',
                ],
                'tagline' => [
                    'ar' => 'علاقات تحقق النتائج',
                    'en' => 'Relationships that drive results',
                ],
            ],
            [
                'icon' => 'Database',
                'title' => [
                    'ar' => 'ذكاء القضايا في الوقت الفعلي',
                    'en' => 'Real-Time Case Intelligence',
                ],
                'description' => [
                    'ar' => 'إدارة دورة حياة القضايا المدعومة بالذكاء الاصطناعي مع الجدولة الآلية وتنبيهات المواعيد النهائية وتحليلات التقدم. لن تفوت موعداً حاسماً مع الحفاظ على رؤية كاملة عبر جميع الأنشطة.',
                    'en' => 'AI-powered case lifecycle management with automated scheduling, deadline alerts, and progress analytics. Never miss a critical date while retaining total visibility over every matter.',
                ],
                'tagline' => [
                    'ar' => 'ابق متقدماً، مطلعاً دائماً',
                    'en' => 'Stay ahead, always informed',
                ],
            ],
            [
                'icon' => 'Laptop',
                'title' => [
                    'ar' => 'التعليم القانوني المستمر',
                    'en' => 'Continuous Legal Education',
                ],
                'description' => [
                    'ar' => 'منظومة تدريب متكاملة تضم ندوات يقودها خبراء وبرامج شهادات ووحدات امتثال حكومي إلكتروني. مكّن فريقك بمهارات التكنولوجيا القانونية المتطورة.',
                    'en' => 'A comprehensive training ecosystem featuring expert-led webinars, certification programmes, and e-government compliance modules. Equip your teams with cutting-edge legal technology skills.',
                ],
                'tagline' => [
                    'ar' => 'المعرفة التي تحول الممارسة',
                    'en' => 'Knowledge that transforms practice',
                ],
            ],
        ];

        foreach ($features as $index => $feature) {
            $page->contentBlocks()->create([
                'key' => sprintf('features_item_%d', $index + 1),
                'type' => 'json',
                'value' => [
                    'ar' => [
                        'icon' => $feature['icon'],
                        'title' => $feature['title']['ar'],
                        'description' => $feature['description']['ar'],
                        'tagline' => $feature['tagline']['ar'],
                    ],
                    'en' => [
                        'icon' => $feature['icon'],
                        'title' => $feature['title']['en'],
                        'description' => $feature['description']['en'],
                        'tagline' => $feature['tagline']['en'],
                    ],
                ],
            ]);
        }
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

    private function seedTestimonials(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'testimonials'],
            ['title_ar' => 'الشهادات', 'title_en' => 'Testimonials']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'testimonials_badge',
                'type' => 'text',
                'value' => [
                    'ar' => 'أصوات موثوقة',
                    'en' => 'Trusted Voices',
                ],
            ],
            [
                'key' => 'testimonials_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'موثوق به من قبل القادة القانونيين عبر منطقة الشرق الأوسط وشمال أفريقيا',
                    'en' => 'Trusted by Legal Leaders Across MENA',
                ],
            ],
            [
                'key' => 'testimonials_subtitle',
                'type' => 'text',
                'value' => [
                    'ar' => 'استمع من المهنيين القانونيين الذين حولوا ممارستهم مع أفوكات.',
                    'en' => "Hear from legal professionals who've transformed their practice with Avocat.",
                ],
            ],
        ]);

        $testimonials = [
            [
                'id' => 1,
                'en' => [
                    'name' => 'Ahmed Al-Mansouri',
                    'position' => 'Managing Partner',
                    'company' => 'Al-Mansouri & Associates',
                    'quote' => 'Avocat transformed our practice completely. The digital tools increased our efficiency by 300% and our client satisfaction rates are at an all-time high.',
                    'avatar' => '👨‍💼',
                    'rating' => 5,
                    'type' => 'firm',
                ],
                'ar' => [
                    'name' => 'أحمد المنصوري',
                    'position' => 'شريك إداري',
                    'company' => 'مجموعة المنصوري وشركاه',
                    'quote' => 'حولت أفوكات ممارستنا بالكامل. الأدوات الرقمية زادت كفاءتنا بنسبة ٣٠٠٪ ورضا عملائنا في أعلى مستوياته.',
                    'avatar' => '👨‍💼',
                    'rating' => 5,
                    'type' => 'firm',
                ],
            ],
            [
                'id' => 2,
                'en' => [
                    'name' => 'Sarah Johnson',
                    'position' => 'Legal Director',
                    'company' => 'Global Corp',
                    'quote' => 'The compliance tracking and contract management features have revolutionized how we handle our legal operations. Outstanding platform!',
                    'avatar' => '👩‍💼',
                    'rating' => 5,
                    'type' => 'firm',
                ],
                'ar' => [
                    'name' => 'سارة جونسون',
                    'position' => 'مديرة الشؤون القانونية',
                    'company' => 'جلوبال كورب',
                    'quote' => 'ميزات تتبع الامتثال وإدارة العقود أحدثت ثورة في عملياتنا القانونية. منصة استثنائية!',
                    'avatar' => '👩‍💼',
                    'rating' => 5,
                    'type' => 'firm',
                ],
            ],
            [
                'id' => 3,
                'en' => [
                    'name' => 'Dr. Khalid Rahman',
                    'position' => 'Independent Lawyer',
                    'company' => 'Solo Practice',
                    'quote' => 'As a solo practitioner, Avocat gave me enterprise-level tools at an affordable price. My practice has grown 200% since I started using it.',
                    'avatar' => '👨‍⚖️',
                    'rating' => 5,
                    'type' => 'individual',
                ],
                'ar' => [
                    'name' => 'د. خالد رحمن',
                    'position' => 'محام مستقل',
                    'company' => 'مكتب مستقل',
                    'quote' => 'بصفتي محامياً مستقلاً منحتني أفوكات أدوات بمستوى الشركات بسعر مناسب. نمت ممارستي بنسبة ٢٠٠٪ منذ استخدامها.',
                    'avatar' => '👨‍⚖️',
                    'rating' => 5,
                    'type' => 'individual',
                ],
            ],
            [
                'id' => 4,
                'en' => [
                    'name' => 'Fatima Al-Zahra',
                    'position' => 'Senior Partner',
                    'company' => 'Legal Innovations LLC',
                    'quote' => 'The training programs helped our entire team transition to digital workflows seamlessly. Exceptional support and cutting-edge technology.',
                    'avatar' => '👩‍⚖️',
                    'rating' => 5,
                    'type' => 'firm',
                ],
                'ar' => [
                    'name' => 'فاطمة الزهراء',
                    'position' => 'شريك أول',
                    'company' => 'الابتكار القانوني ذ.م.م',
                    'quote' => 'برامج التدريب ساعدت فريقنا بالكامل على الانتقال إلى سير عمل رقمي بسلاسة. دعم استثنائي وتقنية متقدمة.',
                    'avatar' => '👩‍⚖️',
                    'rating' => 5,
                    'type' => 'firm',
                ],
            ],
        ];

        foreach ($testimonials as $testimonial) {
            $page->contentBlocks()->create([
                'key' => sprintf('testimonial_%d', $testimonial['id']),
                'type' => 'json',
                'value' => [
                    'ar' => $testimonial['ar'],
                    'en' => $testimonial['en'],
                ],
            ]);
        }

        $stats = [
            [
                'en' => ['number' => '500+', 'label' => 'Happy Clients', 'icon' => '😊'],
                'ar' => ['number' => '٥٠٠+', 'label' => 'عملاء سعداء', 'icon' => '😊'],
            ],
            [
                'en' => ['number' => '98%', 'label' => 'Satisfaction Rate', 'icon' => '⭐'],
                'ar' => ['number' => '٩٨٪', 'label' => 'معدل الرضا', 'icon' => '⭐'],
            ],
            [
                'en' => ['number' => '24/7', 'label' => 'Support Available', 'icon' => '🚀'],
                'ar' => ['number' => '٢٤/٧', 'label' => 'دعم متاح باستمرار', 'icon' => '🚀'],
            ],
        ];

        foreach ($stats as $index => $stat) {
            $page->contentBlocks()->create([
                'key' => sprintf('testimonials_stat_%d', $index + 1),
                'type' => 'json',
                'value' => [
                    'ar' => $stat['ar'],
                    'en' => $stat['en'],
                ],
            ]);
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

    private function seedCallToAction(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'cta'],
            ['title_ar' => 'الدعوة إلى الإجراء', 'title_en' => 'Call To Action']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'cta_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'مستعد لقيادة الثورة القانونية الرقمية؟',
                    'en' => 'Ready to Lead the Digital Legal Revolution?',
                ],
            ],
            [
                'key' => 'cta_subtitle',
                'type' => 'text',
                'value' => [
                    'ar' => 'انضم للمجتمع الحصري من المهنيين القانونيين المتطلعين للأمام الذين يثقون بأفوكات',
                    'en' => 'Join the exclusive community of forward-thinking legal professionals who trust Avocat',
                ],
            ],
            [
                'key' => 'cta_primary_label',
                'type' => 'text',
                'value' => [
                    'ar' => 'احصل على تجربة مجانية',
                    'en' => 'Get Free Demo',
                ],
            ],
            [
                'key' => 'cta_secondary_label',
                'type' => 'text',
                'value' => [
                    'ar' => 'تواصل مع فريق المبيعات',
                    'en' => 'Contact Sales',
                ],
            ],
            [
                'key' => 'cta_trust_note',
                'type' => 'text',
                'value' => [
                    'ar' => 'موثوق به من كبرى مكاتب المحاماة في المنطقة',
                    'en' => 'Trusted by leading law firms across MENA',
                ],
            ],
            [
                'key' => 'cta_bottom_note',
                'type' => 'text',
                'value' => [
                    'ar' => '🌟 انضم إلى ثورة التحول الرقمي القانوني اليوم!',
                    'en' => '🌟 Join the Legal Digital Revolution Today!',
                ],
            ],
            [
                'key' => 'cta_description',
                'type' => 'text',
                'value' => [
                    'ar' => 'ابدأ اليوم وضع ممارستك في المقدمة من الابتكار القانوني. وصول محدود الوقت لحزمة التحول المتميزة.',
                    'en' => 'Start today and position your practice at the forefront of legal innovation. Limited-time access to our premium transformation package.',
                ],
            ],
            [
                'key' => 'cta_urgency',
                'type' => 'text',
                'value' => [
                    'ar' => 'حوّل ممارستك في 30 يوماً أو أقل',
                    'en' => 'Transform your practice in 30 days or less',
                ],
            ],
            [
                'key' => 'cta_features',
                'type' => 'list',
                'value' => [
                    'ar' => [
                        '✅ تجربة مجانية لمدة 30 يوماً',
                        '🚀 إعداد فوري',
                        '💡 دعم خبراء على مدار الساعة',
                        '🔒 أمان بمستوى البنوك',
                    ],
                    'en' => [
                        '✅ Free 30-Day Trial',
                        '🚀 Instant Setup',
                        '💡 24/7 Expert Support',
                        '🔒 Bank-Level Security',
                    ],
                ],
            ],
            [
                'key' => 'cta_clients',
                'type' => 'list',
                'value' => [
                    'ar' => [
                        'شركة محاماة عالمية رائدة',
                        'مكتب قانوني إقليمي متميز',
                        'تحالف القانون الدولي',
                        'إدارة قانونية لشركة كبرى',
                        'جهة حكومية رقمية',
                    ],
                    'en' => [
                        'Baker McKenzie Style Firm',
                        'Regional Legal Leader',
                        'International Law Group',
                        'Corporate Legal Dept',
                        'Government Entity',
                    ],
                ],
            ],
        ]);
    }

    private function seedContact(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'contact'],
            ['title_ar' => 'اتصل بنا', 'title_en' => 'Contact']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'contact_badge',
                'type' => 'text',
                'value' => [
                    'ar' => 'اتصل بنا',
                    'en' => 'Contact',
                ],
            ],
            [
                'key' => 'contact_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'تواصل مع مكتب أفوكات للمحاماة',
                    'en' => 'Connect with Avocat Law Firm',
                ],
            ],
            [
                'key' => 'contact_subtitle',
                'type' => 'text',
                'value' => [
                    'ar' => 'حدد موعداً لاستشارة تستكشف التحول الرقمي القانوني المصمم لمؤسستك.',
                    'en' => 'Schedule a consultation to explore legal digital transformation tailored to your organisation.',
                ],
            ],
            [
                'key' => 'contact_note',
                'type' => 'text',
                'value' => [
                    'ar' => 'إرساليات سرية ومشفرة',
                    'en' => 'Confidential & encrypted submissions',
                ],
            ],
            [
                'key' => 'contact_concierge_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'مكتب قانوني رقمي على مدار الساعة',
                    'en' => '24/7 Digital Legal Desk',
                ],
            ],
            [
                'key' => 'contact_concierge_body',
                'type' => 'text',
                'value' => [
                    'ar' => 'فريق متخصص في التحول الرقمي القانوني يعمل على مدار الساعة لدعم القضايا العاجلة والتحقيقات والقيادات التنفيذية.',
                    'en' => 'Dedicated transformation specialists monitor secure channels around the clock to support urgent cases, investigations, and executive briefings.',
                ],
            ],
            [
                'key' => 'contact_form_copy',
                'type' => 'json',
                'value' => [
                    'ar' => [
                        'labels' => [
                            'name' => 'الاسم',
                            'email' => 'البريد الإلكتروني',
                            'message' => 'الرسالة',
                        ],
                        'placeholders' => [
                            'name' => 'الاسم الكامل',
                            'email' => 'you@avocatlaw.com',
                            'message' => 'صف احتياجاتك في التحول الرقمي القانوني',
                        ],
                        'submit' => 'إرسال الرسالة',
                        'submitting' => 'جارٍ الإرسال...',
                        'success' => [
                            'title' => 'تم إرسال الرسالة بنجاح',
                            'description' => 'سيتواصل معك مستشارو التحول الرقمي القانوني خلال يوم عمل واحد.',
                        ],
                    ],
                    'en' => [
                        'labels' => [
                            'name' => 'Name',
                            'email' => 'Email',
                            'message' => 'Message',
                        ],
                        'placeholders' => [
                            'name' => 'Full Name',
                            'email' => 'you@avocatlaw.com',
                            'message' => 'Describe your legal technology needs',
                        ],
                        'submit' => 'Send Message',
                        'submitting' => 'Sending...',
                        'success' => [
                            'title' => 'Message sent successfully',
                            'description' => 'Our legal transformation consultants will respond within one business day.',
                        ],
                    ],
                ],
            ],
        ]);

        $contactPoints = [
            [
                'icon' => 'MapPin',
                'en' => [
                    'title' => 'Headquarters',
                    'details' => 'Downtown Cairo Smart District, Nile Corniche',
                ],
                'ar' => [
                    'title' => 'المقر الرئيسي',
                    'details' => 'منطقة القاهرة الذكية – كورنيش النيل',
                ],
            ],
            [
                'icon' => 'Phone',
                'en' => [
                    'title' => 'Phone',
                    'details' => '+20 2 1234 5678 | +971 4 567 8900',
                ],
                'ar' => [
                    'title' => 'الهاتف',
                    'details' => '+٢٠ ٢ ١٢٣٤ ٥٦٧٨ | +٩٧١ ٤ ٥٦٧ ٨٩٠٠',
                ],
            ],
            [
                'icon' => 'Mail',
                'en' => [
                    'title' => 'Email',
                    'details' => 'contact@avocatlaw.com',
                ],
                'ar' => [
                    'title' => 'البريد الإلكتروني',
                    'details' => 'contact@avocatlaw.com',
                ],
            ],
            [
                'icon' => 'Clock3',
                'en' => [
                    'title' => 'Business Hours',
                    'details' => 'Sunday – Thursday | 9:00 – 18:00',
                ],
                'ar' => [
                    'title' => 'ساعات العمل',
                    'details' => 'الأحد – الخميس | ٩:٠٠ – ١٨:٠٠',
                ],
            ],
        ];

        foreach ($contactPoints as $index => $point) {
            $page->contentBlocks()->create([
                'key' => sprintf('contact_point_%d', $index + 1),
                'type' => 'json',
                'value' => [
                    'ar' => [
                        'icon' => $point['icon'],
                        'title' => $point['ar']['title'],
                        'details' => $point['ar']['details'],
                    ],
                    'en' => [
                        'icon' => $point['icon'],
                        'title' => $point['en']['title'],
                        'details' => $point['en']['details'],
                    ],
                ],
            ]);
        }
    }

    private function seedFooter(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'footer'],
            ['title_ar' => 'التذييل', 'title_en' => 'Footer']
        );

        $page->contentBlocks()->delete();

        $page->contentBlocks()->createMany([
            [
                'key' => 'footer_mission',
                'type' => 'text',
                'value' => [
                    'ar' => 'رواد التحول الرقمي القانوني في الشرق الأوسط وشمال أفريقيا بفخامة وابتكار وثقة راسخة.',
                    'en' => 'Pioneering legal digital transformation across the Middle East and North Africa with prestige, innovation, and unwavering trust.',
                ],
            ],
            [
                'key' => 'footer_highlight',
                'type' => 'text',
                'value' => [
                    'ar' => 'التحول الرقمي القانوني',
                    'en' => 'Legal Digital Transformation',
                ],
            ],
            [
                'key' => 'footer_quick_links_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'الروابط السريعة',
                    'en' => 'Quick Links',
                ],
            ],
            [
                'key' => 'footer_quick_links',
                'type' => 'json',
                'value' => [
                    'ar' => [
                        ['href' => '#home', 'label' => 'الرئيسية'],
                        ['href' => '#about', 'label' => 'من نحن'],
                        ['href' => '#services', 'label' => 'الخدمات'],
                        ['href' => '#capabilities', 'label' => 'الإمكانيات'],
                        ['href' => '#features', 'label' => 'الميزات'],
                        ['href' => '#achievements', 'label' => 'الإنجازات'],
                        ['href' => '#team', 'label' => 'الفريق'],
                        ['href' => '#testimonials', 'label' => 'الشهادات'],
                        ['href' => '#insights', 'label' => 'المدونة'],
                        ['href' => '#contact', 'label' => 'اتصل بنا'],
                    ],
                    'en' => [
                        ['href' => '#home', 'label' => 'Home'],
                        ['href' => '#about', 'label' => 'About'],
                        ['href' => '#services', 'label' => 'Services'],
                        ['href' => '#capabilities', 'label' => 'Capabilities'],
                        ['href' => '#features', 'label' => 'Features'],
                        ['href' => '#achievements', 'label' => 'Achievements'],
                        ['href' => '#team', 'label' => 'Team'],
                        ['href' => '#testimonials', 'label' => 'Testimonials'],
                        ['href' => '#insights', 'label' => 'Insights'],
                        ['href' => '#contact', 'label' => 'Contact'],
                    ],
                ],
            ],
            [
                'key' => 'footer_services_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'خدماتنا المميزة',
                    'en' => 'Signature Services',
                ],
            ],
            [
                'key' => 'footer_services',
                'type' => 'list',
                'value' => [
                    'ar' => [
                        'التقاضي والتحكيم',
                        'إدارة القضايا الرقمية',
                        'البحث القانوني بالذكاء الاصطناعي',
                        'استشارات الأمن السيبراني',
                    ],
                    'en' => [
                        'Litigation & Arbitration',
                        'Digital Case Management',
                        'AI Legal Research',
                        'Cybersecurity Advisory',
                    ],
                ],
            ],
            [
                'key' => 'footer_subscribe',
                'type' => 'json',
                'value' => [
                    'ar' => [
                        'title' => 'اشترك في الرؤى',
                        'body' => 'احصل على موجز شهري حول الذكاء الاصطناعي في القانون وتوجيهات الأمن السيبراني وإصلاحات العدالة الذكية.',
                    ],
                    'en' => [
                        'title' => 'Subscribe for Insights',
                        'body' => 'Receive monthly briefings on AI in law, cybersecurity directives, and smart justice reforms.',
                    ],
                ],
            ],
            [
                'key' => 'footer_contact_title',
                'type' => 'text',
                'value' => [
                    'ar' => 'معلومات الاتصال',
                    'en' => 'Contact Information',
                ],
            ],
            [
                'key' => 'footer_contact_details',
                'type' => 'json',
                'value' => [
                    'ar' => [
                        ['icon' => 'MapPin', 'text' => 'منطقة القاهرة الذكية – كورنيش النيل'],
                        ['icon' => 'Phone', 'text' => '+٢٠ ٢ ١٢٣٤ ٥٦٧٨ | +٩٧١ ٤ ٥٦٧ ٨٩٠٠'],
                        ['icon' => 'Mail', 'text' => 'contact@avocatlaw.com'],
                        ['icon' => 'Shield', 'text' => 'بنية رقمية متوافقة مع لوائح GDPR وDIFC والهيئة الوطنية للأمن السيبراني.'],
                    ],
                    'en' => [
                        ['icon' => 'MapPin', 'text' => 'Downtown Cairo Smart District, Nile Corniche'],
                        ['icon' => 'Phone', 'text' => '+20 2 1234 5678 | +971 4 567 8900'],
                        ['icon' => 'Mail', 'text' => 'contact@avocatlaw.com'],
                        ['icon' => 'Shield', 'text' => 'GDPR, DIFC, and NCA compliant digital infrastructure.'],
                    ],
                ],
            ],
            [
                'key' => 'footer_bottom',
                'type' => 'text',
                'value' => [
                    'ar' => '© ' . now()->year . ' مكتب أفوكات للمحاماة. جميع الحقوق محفوظة.',
                    'en' => '© ' . now()->year . ' Avocat Law Firm. All rights reserved.',
                ],
            ],
        ]);
    }

    private function seedSettings(): void
    {
        $page = Page::updateOrCreate(
            ['slug' => 'settings'],
            ['title_ar' => 'الإعدادات', 'title_en' => 'Settings']
        );

        $page->contentBlocks()->delete();

        $sharedIconPaths = [
            'light' => 'branding/icons/logo-icon-light.png',
            'dark' => 'branding/icons/logo-icon-dark.png',
        ];

        $page->contentBlocks()->createMany([
            [
                'key' => 'site_logo',
                'type' => 'image',
                'value' => [
                    'ar' => 'branding/full/logo-full-arabic-light.png',
                    'en' => 'branding/full/logo-full-en-light.png',
                ],
            ],
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
                        'light' => 'branding/text/logo-text-ar-light.png',
                        'dark' => 'branding/text/logo-text-ar-dark.png',
                    ],
                    'en' => [
                        'light' => 'branding/text/logo-text-en-light.png',
                        'dark' => 'branding/text/logo-text-en-dark.png',
                    ],
                ],
            ],
            [
                'key' => 'logo_full',
                'type' => 'image',
                'value' => [
                    'ar' => [
                        'light' => 'branding/full/logo-full-arabic-light.png',
                        'dark' => 'branding/full/logo-full-arabic-dark.png',
                    ],
                    'en' => [
                        'light' => 'branding/full/logo-full-en-light.png',
                        'dark' => 'branding/full/logo-full-en-dark.png',
                    ],
                ],
            ],
        ]);
    }
}
