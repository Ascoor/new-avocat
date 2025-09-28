import json
from pathlib import Path
from copy import deepcopy

BASE_PATH = Path(__file__).resolve().parent.parent / 'dashboards'
BASE_CONFIG = json.loads((BASE_PATH / 'extracted-dashboards.json').read_text())

ID_MAP = {
    'dashboard-1': 'growth',
    'dashboard-2': 'portfolio',
    'dashboard-3': 'commerce',
    'dashboard-4': 'cloud',
    'dashboard-5': 'content',
    'dashboard-6': 'experience',
    'dashboard-7': 'people',
    'dashboard-8': 'learning',
    'dashboard-9': 'security',
    'dashboard-10': 'finance',
    'dashboard-11': 'health',
    'dashboard-12': 'marketing',
    'dashboard-13': 'supply',
    'dashboard-14': 'realestate',
    'dashboard-15': 'manufacturing',
    'dashboard-16': 'streaming',
    'dashboard-17': 'smartcity',
    'dashboard-18': 'hospitality',
    'dashboard-19': 'energy',
    'dashboard-20': 'sports'
}

OVERRIDES = {
    'growth': {
        'layout': {
            'shell': 'bg-slate-950/20',
            'main': 'space-y-12 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-900/20',
            'stats': 'md:grid-cols-2 xl:grid-cols-4',
            'panels': 'xl:grid-cols-[2.1fr_1.2fr] gap-y-8'
        },
        'brand': {
            'badge': { 'ar': 'نمو', 'en': 'G' },
            'name': { 'ar': 'مؤشرات النمو', 'en': 'Growth Metrics' },
            'tagline': { 'ar': 'لوحة قيادة الشركات الناشئة', 'en': 'Startup velocity cockpit' }
        },
        'theme': {
            'defaultMode': 'dark',
            'dark': {
                'bodyGradient': 'from-slate-950 via-indigo-950 to-fuchsia-900',
                'sidebarGradient': 'from-slate-950 via-indigo-900 to-fuchsia-900',
                'cardBorder': 'border-indigo-500/40',
                'cardShadow': 'shadow-[0_38px_120px_-54px_rgba(79,70,229,0.8)]',
                'accentGradient': 'from-sky-500 via-indigo-500 to-fuchsia-500',
                'highlightBg': 'bg-indigo-500/15 border-indigo-500/40',
                'navActive': 'border border-indigo-400/60 bg-indigo-500/15',
                'navIconBg': 'bg-indigo-950/50',
                'navBadgeText': 'text-indigo-200',
                'badgeBg': 'bg-indigo-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-indigo-50 via-white to-sky-100',
                'sidebarGradient': 'from-white via-sky-50 to-indigo-100',
                'cardBorder': 'border-indigo-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(37,99,235,0.45)]',
                'accentGradient': 'from-indigo-400 via-sky-400 to-fuchsia-400',
                'highlightBg': 'bg-indigo-500/10 border-indigo-200/70',
                'navActive': 'border border-indigo-200 bg-indigo-500/10',
                'navIconBg': 'bg-indigo-100',
                'navBadgeText': 'text-indigo-600',
                'badgeBg': 'bg-indigo-200/60',
                'badgeText': 'text-indigo-800'
            }
        },
        'gallery': {
            'badge': { 'ar': 'النمو المتسارع', 'en': 'Hyper growth' },
            'title': { 'ar': 'قيادة رحلة النمو', 'en': 'Leading the growth journey' },
            'description': {
                'ar': 'تصور متدرج لمسار الاكتساب والاحتفاظ يبرز الفرص الجديدة والنتائج المباشرة.',
                'en': 'Layered acquisition-to-retention story surfacing live opportunities and compounding wins.'
            },
            'tags': [
                { 'ar': 'تحليلات', 'en': 'Analytics' },
                { 'ar': 'منتج', 'en': 'Product' }
            ]
        },
        'sidebarSections': [
            {
                'type': 'progress',
                'title': { 'ar': 'مسار التحويل', 'en': 'Conversion path' },
                'items': [
                    { 'label': { 'ar': 'زيارة الصفحة', 'en': 'Landing visit' }, 'value': '85%', 'percent': '85%' },
                    { 'label': { 'ar': 'تجربة مجانية', 'en': 'Trial start' }, 'value': '46%', 'percent': '46%' },
                    { 'label': { 'ar': 'اشتراك مدفوع', 'en': 'Paid plan' }, 'value': '27%', 'percent': '27%' }
                ]
            },
            {
                'type': 'callout',
                'title': { 'ar': 'تجربة توصيات الذكاء الاصطناعي', 'en': 'AI recommendations test' },
                'message': {
                    'ar': 'اطلق التجربة على ٨٪ من الزوار الجدد وقارن محركات التخصيص قبل نشر التغييرات بالكامل.',
                    'en': 'Roll the experiment to 8% of new visitors and compare personalization engines before a full release.'
                },
                'actions': [
                    { 'label': { 'ar': 'جدولة مراجعة', 'en': 'Schedule review' }, 'style': 'secondary' },
                    { 'label': { 'ar': 'نشر كامل', 'en': 'Ship globally' }, 'style': 'primary' }
                ]
            }
        ],
        'header': {
            'title': { 'ar': 'لوحة قيادة النمو', 'en': 'Growth leadership cockpit' },
            'subtitle': {
                'ar': 'تابع رحلة المستخدم من أول نقرة حتى الربحية مع تنبيهات لحظية حول الفرص الذهبية.',
                'en': 'Follow the user journey from first click to profitability with instant alerts on breakout opportunities.'
            },
            'primary': { 'ar': 'تصدير الرؤى', 'en': 'Export insights' },
            'secondary': { 'ar': 'مشاركة الرابط', 'en': 'Share link' }
        },
        'nav': [
            { 'id': 'overview', 'icon': 'chart-bar', 'label': { 'ar': 'نظرة عامة', 'en': 'Overview' }, 'badge': { 'ar': 'مباشر', 'en': 'Live' } },
            { 'id': 'acquisition', 'icon': 'cursor-arrow', 'label': { 'ar': 'الاكتساب', 'en': 'Acquisition' }, 'badge': { 'ar': 'قنوات', 'en': 'Channels' } },
            { 'id': 'activation', 'icon': 'sparkles', 'label': { 'ar': 'التفعيل', 'en': 'Activation' }, 'badge': { 'ar': 'رحلة', 'en': 'Journey' } },
            { 'id': 'retention', 'icon': 'heart', 'label': { 'ar': 'الاحتفاظ', 'en': 'Retention' }, 'badge': { 'ar': 'تحسن', 'en': 'Improving' } }
        ],
        'stats': [
            { 'icon': 'sparkles', 'label': { 'ar': 'معدل التفعيل', 'en': 'Activation rate' }, 'value': '68%', 'delta': { 'ar': '+٧ نقاط خلال ٣٠ يوماً', 'en': '+7 pts in 30 days' }, 'trend': 'positive' },
            { 'icon': 'users', 'label': { 'ar': 'العملاء النشطون', 'en': 'Active customers' }, 'value': '48,210', 'delta': { 'ar': '+١١٪ نمو سنوي', 'en': '+11% year over year' }, 'trend': 'positive' },
            { 'icon': 'chart-bar', 'label': { 'ar': 'متوسط الإيراد لكل حساب', 'en': 'Average revenue per account' }, 'value': '$82', 'delta': { 'ar': '+٥ دولارات بعد التعديل السعري', 'en': '+$5 post pricing refresh' }, 'trend': 'positive' },
            { 'icon': 'heart', 'label': { 'ar': 'معدل الاحتفاظ الشهري', 'en': 'Monthly retention rate' }, 'value': '92%', 'delta': { 'ar': '+٣٪ بفضل برامج النجاح', 'en': '+3% with success programs' }, 'trend': 'positive' }
        ],
        'panels': [
            {
                'id': 'overview',
                'type': 'chart',
                'span': 'xl:col-span-2',
                'title': { 'ar': 'النمو الأسبوعي للأرباح المتكررة', 'en': 'Weekly recurring revenue slope' },
                'subtitle': {
                    'ar': 'مقارنة الأداء عبر القنوات المدفوعة والعضوية وتوقعات الأسبوع المقبل.',
                    'en': 'Stacked view of paid versus organic momentum with a projection for next week.'
                },
                'action': { 'ar': 'تحميل ملف CSV', 'en': 'Download CSV' },
                'placeholder': { 'ar': 'مخطط نمو تفاعلي', 'en': 'Interactive growth chart' }
            },
            {
                'id': 'product-fit',
                'type': 'matrix',
                'title': { 'ar': 'ملاءمة المنتج عبر القطاعات', 'en': 'Product fit by segment' },
                'action': { 'ar': 'تحديث قبل ٣ دقائق', 'en': 'Refreshed 3 minutes ago' },
                'layout': 'md:grid-cols-2',
                'cells': [
                    { 'title': { 'ar': 'الشركات الناشئة', 'en': 'Startups' }, 'value': { 'ar': '89%', 'en': '89%' }, 'caption': { 'ar': 'نقاط التركيز: الإعداد الذكي', 'en': 'Focus: faster onboarding' }, 'badge': { 'ar': 'رائد', 'en': 'Leader' }, 'emphasis': True },
                    { 'title': { 'ar': 'القطاع المالي', 'en': 'Fintech' }, 'value': { 'ar': '74%', 'en': '74%' }, 'caption': { 'ar': 'نحتاج إلى دورات موافقات أعمق', 'en': 'Requires deeper approval loops' } },
                    { 'title': { 'ar': 'فرق المبيعات', 'en': 'Sales teams' }, 'value': { 'ar': '63%', 'en': '63%' }, 'caption': { 'ar': 'حملة التدريب قيد التنفيذ', 'en': 'Enablement campaign in motion' } },
                    { 'title': { 'ar': 'الأسواق الناشئة', 'en': 'Emerging markets' }, 'value': { 'ar': '58%', 'en': '58%' }, 'caption': { 'ar': 'إطلاق تجربة تسعير محلية', 'en': 'Local pricing test launching' } }
                ]
            },
            {
                'id': 'north-star',
                'type': 'spotlight',
                'kicker': { 'ar': 'هدف الشهر', 'en': 'Monthly focus' },
                'metric': { 'ar': '1500 عميل وفريق منضم', 'en': '1,500 teams onboarded' },
                'description': {
                    'ar': 'إعادة تصميم رحلة التفعيل اختصرت زمن القيمة الأولية إلى أقل من ٥ دقائق.',
                    'en': 'The redesigned activation path brings time-to-value under five minutes.'
                },
                'bullets': [
                    { 'value': '38%', 'title': { 'ar': 'تجارب تحسّن التحويل', 'en': 'Conversion uplift' }, 'subtitle': { 'ar': '٣ تجارب ناجحة هذا الأسبوع', 'en': '3 winning experiments this week' } },
                    { 'value': '24%', 'title': { 'ar': 'زيادة الإحالة', 'en': 'Referral increase' }, 'subtitle': { 'ar': 'برامج الدعوات الجديدة', 'en': 'New invite programs' } },
                    { 'value': '7.2', 'title': { 'ar': 'صافي نقاط الترويج', 'en': 'Net promoter score' }, 'subtitle': { 'ar': 'تحسّن ١.٤ نقطة', 'en': 'Up 1.4 points' } }
                ]
            },
            {
                'id': 'milestones',
                'type': 'timeline',
                'span': 'xl:col-span-2',
                'title': { 'ar': 'أحداث الأسبوع الرئيسية', 'en': 'Key wins this week' },
                'items': [
                    { 'icon': 'sparkles', 'title': { 'ar': 'إطلاق مسار تجربة أسرع', 'en': 'Fast-track trial journey live' }, 'subtitle': { 'ar': 'يخفض معدل التراجع ١٨٪', 'en': 'Drops bounce rate by 18%' }, 'time': { 'ar': 'قبل ساعتين', 'en': '2 hours ago' } },
                    { 'icon': 'users', 'title': { 'ar': 'توقيع شراكة نظام تعليم', 'en': 'Signed EDU platform partnership' }, 'subtitle': { 'ar': 'يضيف ٢٣٠٠ حساباً مؤسسياً', 'en': 'Adds 2,300 institutional accounts' }, 'time': { 'ar': 'اليوم', 'en': 'Today' } },
                    { 'icon': 'chart-bar', 'title': { 'ar': 'تحقيق هدف الإيراد الربع سنوي', 'en': 'Quarterly revenue target achieved' }, 'subtitle': { 'ar': '١٠ أيام قبل الموعد', 'en': '10 days ahead of plan' }, 'time': { 'ar': 'أمس', 'en': 'Yesterday' } }
                ]
            }
        ]
    },
    'portfolio': {
        'layout': {
            'shell': 'bg-slate-950/10',
            'main': 'space-y-14 lg:px-16',
            'stats': 'sm:grid-cols-2 xl:grid-cols-4 gap-5',
            'panels': 'xl:grid-cols-[1.55fr_1fr] gap-y-10'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-emerald-950 to-cyan-900',
                'sidebarGradient': 'from-slate-950 via-teal-900 to-cyan-900',
                'cardBorder': 'border-emerald-500/35',
                'cardShadow': 'shadow-[0_34px_110px_-52px_rgba(16,185,129,0.7)]',
                'accentGradient': 'from-emerald-400 via-cyan-400 to-teal-400',
                'highlightBg': 'bg-emerald-500/15 border-emerald-500/35',
                'navActive': 'border border-emerald-400/50 bg-emerald-500/15',
                'navIconBg': 'bg-teal-950/50',
                'navBadgeText': 'text-emerald-200',
                'badgeBg': 'bg-emerald-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-teal-50 via-white to-emerald-50',
                'sidebarGradient': 'from-white via-teal-50 to-emerald-100',
                'cardBorder': 'border-teal-200',
                'cardShadow': 'shadow-[0_32px_90px_-55px_rgba(16,185,129,0.35)]',
                'accentGradient': 'from-teal-400 via-emerald-400 to-cyan-400',
                'highlightBg': 'bg-emerald-500/10 border-emerald-200/60',
                'navActive': 'border border-emerald-200 bg-emerald-500/10',
                'navIconBg': 'bg-teal-100',
                'navBadgeText': 'text-emerald-600',
                'badgeBg': 'bg-emerald-200/60',
                'badgeText': 'text-emerald-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'حوكمة المشاريع', 'en': 'Program PMO' },
            'title': { 'ar': 'إدارة محفظة البرامج بدقة', 'en': 'Orchestrate the program portfolio' },
            'description': {
                'ar': 'تنسيق متدرج لحالة المشاريع، القدرات، والمخاطر يمنح فرق PMO رؤية فورية.',
                'en': 'Layered PMO cockpit aligning project health, capacity, and risk posture instantly.'
            },
            'tags': [
                { 'ar': 'مشاريع', 'en': 'Projects' },
                { 'ar': 'حوكمة', 'en': 'Governance' }
            ]
        },
        'sidebarSections': [
            {
                'type': 'list',
                'title': { 'ar': 'نقاط المتابعة', 'en': 'Follow-up queue' },
                'items': [
                    { 'label': { 'ar': 'اجتماع توجيهي', 'en': 'Steering sync' }, 'value': { 'ar': 'الثلاثاء 10:00', 'en': 'Tue 10:00' } },
                    { 'label': { 'ar': 'تصعيد مورد', 'en': 'Resource escalation' }, 'value': { 'ar': 'قيد المراجعة', 'en': 'In review' } },
                    { 'label': { 'ar': 'ميزانية Q3', 'en': 'Q3 budget' }, 'value': { 'ar': 'متوقع 12.4M', 'en': '$12.4M pending' } }
                ]
            },
            {
                'type': 'progress',
                'title': { 'ar': 'جاهزية الإطلاق', 'en': 'Launch readiness' },
                'items': [
                    { 'label': { 'ar': 'التصميم', 'en': 'Design' }, 'value': '92%', 'percent': '92%' },
                    { 'label': { 'ar': 'الهندسة', 'en': 'Engineering' }, 'value': '78%', 'percent': '78%' },
                    { 'label': { 'ar': 'التمكين', 'en': 'Enablement' }, 'value': '63%', 'percent': '63%' }
                ]
            }
        ],
        'header': {
            'title': { 'ar': 'لوحة إدارة المحفظة', 'en': 'Portfolio control center' },
            'subtitle': {
                'ar': 'تابع استقرار البرامج الإستراتيجية، استخدام السعة، ومسار التصعيد في شاشة واحدة.',
                'en': 'Track strategic program stability, capacity usage, and escalation paths from one workspace.'
            },
            'primary': { 'ar': 'إنشاء تقرير', 'en': 'Generate report' },
            'secondary': { 'ar': 'تعيين مسؤول', 'en': 'Assign owner' }
        },
        'panels': [
            {
                'id': 'roadmap-board',
                'type': 'kanban',
                'title': { 'ar': 'لوحة تقدم المحفظة', 'en': 'Portfolio flow board' },
                'action': { 'ar': 'تحديث قبل ٤ دقائق', 'en': 'Synced 4 minutes ago' },
                'layout': 'md:grid-cols-3',
                'columns': [
                    {
                        'title': { 'ar': 'الاكتشاف', 'en': 'Discovery' },
                        'count': '3',
                        'cards': [
                            { 'title': { 'ar': 'دمج نظام الشراكات', 'en': 'Partner ecosystem integration' }, 'subtitle': { 'ar': 'تحليل الأثر جاهز', 'en': 'Impact brief ready' }, 'tags': [ { 'ar': 'الربع ٣', 'en': 'Q3' } ] },
                            { 'title': { 'ar': 'بوابة الموردين', 'en': 'Supplier gateway' }, 'subtitle': { 'ar': 'جلسة تصميم الخميس', 'en': 'Design jam Thursday' } }
                        ]
                    },
                    {
                        'title': { 'ar': 'قيد البناء', 'en': 'In build' },
                        'count': '4',
                        'cards': [
                            { 'title': { 'ar': 'منصة بيانات المنتجات', 'en': 'Product data platform' }, 'subtitle': { 'ar': 'مرحلة تطوير Sprint 18', 'en': 'Sprint 18 build' }, 'tags': [ { 'ar': 'هندسة', 'en': 'Engineering' } ] },
                            { 'title': { 'ar': 'تجربة العملاء العالمية', 'en': 'Global CX revamp' }, 'subtitle': { 'ar': 'اختبار قبول المستخدم', 'en': 'UAT in flight' }, 'tags': [ { 'ar': 'تجربة', 'en': 'Experience' } ] }
                        ]
                    },
                    {
                        'title': { 'ar': 'الإطلاق', 'en': 'Launch' },
                        'count': '2',
                        'cards': [
                            { 'title': { 'ar': 'تطبيق الهاتف للميدان', 'en': 'Field mobile app' }, 'subtitle': { 'ar': 'حملة تواصل تبدأ غداً', 'en': 'Comms live tomorrow' }, 'tags': [ { 'ar': 'جاهز', 'en': 'Go live' } ] },
                            { 'title': { 'ar': 'واجهة الإدارة التنفيذية', 'en': 'Executive command suite' }, 'subtitle': { 'ar': 'تدريب القيادة الاثنين', 'en': 'Exec enablement Monday' } }
                        ]
                    }
                ]
            },
            {
                'id': 'portfolio-health',
                'type': 'spotlight',
                'kicker': { 'ar': 'صحة البرامج', 'en': 'Program health' },
                'metric': { 'ar': '92٪ جاهزية إطلاق', 'en': '92% launch-ready' },
                'description': {
                    'ar': 'حزم المواءمة الأخيرة تغطي فرق الامتثال والتشغيل قبل الإطلاق الربع سنوي.',
                    'en': 'Final alignment sprints cover compliance and operations squads ahead of quarterly launch.'
                },
                'bullets': [
                    { 'value': '14', 'title': { 'ar': 'المخاطر المفتوحة', 'en': 'Open risks' }, 'subtitle': { 'ar': '٢ منها مرتفعة', 'en': '2 high severity' } },
                    { 'value': '86%', 'title': { 'ar': 'استخدام الموارد', 'en': 'Resource utilisation' }, 'subtitle': { 'ar': 'مدار ضمن الهدف', 'en': 'Within target bands' } },
                    { 'value': '7', 'title': { 'ar': 'الإنجازات', 'en': 'Milestones' }, 'subtitle': { 'ar': 'تم التسليم هذا الأسبوع', 'en': 'Delivered this week' } }
                ]
            },
            {
                'id': 'team-capacity',
                'type': 'matrix',
                'title': { 'ar': 'سعة الفرق الأساسية', 'en': 'Core squad capacity' },
                'layout': 'md:grid-cols-2',
                'cells': [
                    { 'title': { 'ar': 'Squad Atlas', 'en': 'Squad Atlas' }, 'value': { 'ar': '82%', 'en': '82%' }, 'caption': { 'ar': 'تحول إلى دعم إضافي 15%', 'en': 'Allocating 15% support rotation' }, 'badge': { 'ar': 'مستقر', 'en': 'Steady' } },
                    { 'title': { 'ar': 'Delta Ops', 'en': 'Delta Ops' }, 'value': { 'ar': '68%', 'en': '68%' }, 'caption': { 'ar': 'قيد توظيف مهندس أمن', 'en': 'Security engineer hiring' } },
                    { 'title': { 'ar': 'Launch Lab', 'en': 'Launch Lab' }, 'value': { 'ar': '94%', 'en': '94%' }, 'caption': { 'ar': 'مستوى تكدس مرتفع للأسبوع القادم', 'en': 'Peak load next week' }, 'emphasis': True },
                    { 'title': { 'ar': 'Fusion CX', 'en': 'Fusion CX' }, 'value': { 'ar': '71%', 'en': '71%' }, 'caption': { 'ar': 'خطة تدريب محتوى قادمة', 'en': 'Content training scheduled' } }
                ]
            },
            {
                'id': 'ceremonies',
                'type': 'schedule',
                'title': { 'ar': 'مواعيد رئيسية', 'en': 'Key ceremonies' },
                'action': { 'ar': 'مزامنة مع تقويم PMO', 'en': 'Sync to PMO calendar' },
                'slots': [
                    { 'title': { 'ar': 'استعراض خارطة الطريق', 'en': 'Roadmap review' }, 'subtitle': { 'ar': 'مع فرق المنتج', 'en': 'With product leads' }, 'time': { 'ar': 'الأربعاء 14:00', 'en': 'Wed 14:00' } },
                    { 'title': { 'ar': 'جلسة المخاطر', 'en': 'Risk mitigation standup' }, 'subtitle': { 'ar': 'تشارك فرق الامتثال', 'en': 'Compliance co-lead' }, 'time': { 'ar': 'الخميس 09:30', 'en': 'Thu 09:30' } },
                    { 'title': { 'ar': 'مختبر الدروس المستفادة', 'en': 'Retrospective lab' }, 'subtitle': { 'ar': 'التركيز على الإطلاقات الأخيرة', 'en': 'Focus on recent launches' }, 'time': { 'ar': 'الجمعة 15:15', 'en': 'Fri 15:15' } }
                ]
            }
        ]
    }
    ,
    'commerce': {
        'layout': {
            'shell': 'bg-slate-950/15',
            'main': 'space-y-12 lg:px-14',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.4fr_1fr] gap-y-8'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-amber-950 to-emerald-900',
                'sidebarGradient': 'from-slate-950 via-amber-900 to-emerald-900',
                'cardBorder': 'border-amber-500/35',
                'cardShadow': 'shadow-[0_34px_110px_-54px_rgba(217,119,6,0.7)]',
                'accentGradient': 'from-amber-400 via-emerald-400 to-lime-400',
                'highlightBg': 'bg-amber-500/15 border-amber-500/35',
                'navActive': 'border border-amber-400/50 bg-amber-500/15',
                'navIconBg': 'bg-emerald-950/40',
                'navBadgeText': 'text-amber-200',
                'badgeBg': 'bg-amber-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-amber-50 via-white to-emerald-50',
                'sidebarGradient': 'from-white via-amber-50 to-emerald-100',
                'cardBorder': 'border-amber-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(217,119,6,0.35)]',
                'accentGradient': 'from-amber-400 via-emerald-400 to-lime-400',
                'highlightBg': 'bg-amber-500/10 border-amber-200/60',
                'navActive': 'border border-amber-200 bg-amber-500/10',
                'navIconBg': 'bg-amber-100',
                'navBadgeText': 'text-amber-700',
                'badgeBg': 'bg-amber-200/60',
                'badgeText': 'text-amber-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'تحليلات التجارة', 'en': 'Commerce intelligence' },
            'title': { 'ar': 'ضبط رحلات الشراء', 'en': 'Tune the purchase journeys' },
            'description': {
                'ar': 'تتبع فوري لتدفقات المبيعات، حالة المخزون، وسلوك العملاء عبر القنوات.',
                'en': 'Realtime insight into sales streams, inventory posture, and shopper behaviour across every channel.'
            },
            'tags': [
                { 'ar': 'تجارة إلكترونية', 'en': 'E-commerce' },
                { 'ar': 'سلاسل الإمداد', 'en': 'Supply' }
            ]
        }
    },
    'cloud': {
        'layout': {
            'shell': 'bg-slate-950/18',
            'main': 'space-y-12 lg:px-15',
            'stats': 'md:grid-cols-2 xl:grid-cols-5 gap-5',
            'panels': 'xl:grid-cols-[1.6fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-sky-950 to-cyan-900',
                'sidebarGradient': 'from-slate-950 via-sky-900 to-indigo-900',
                'cardBorder': 'border-sky-500/35',
                'cardShadow': 'shadow-[0_36px_110px_-54px_rgba(56,189,248,0.75)]',
                'accentGradient': 'from-sky-400 via-cyan-400 to-indigo-400',
                'highlightBg': 'bg-sky-500/15 border-sky-500/35',
                'navActive': 'border border-sky-400/50 bg-sky-500/15',
                'navIconBg': 'bg-slate-900/60',
                'navBadgeText': 'text-sky-200',
                'badgeBg': 'bg-sky-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-sky-50 via-white to-cyan-100',
                'sidebarGradient': 'from-white via-sky-50 to-indigo-100',
                'cardBorder': 'border-sky-200',
                'cardShadow': 'shadow-[0_32px_90px_-55px_rgba(56,189,248,0.35)]',
                'accentGradient': 'from-sky-400 via-cyan-400 to-indigo-400',
                'highlightBg': 'bg-sky-500/10 border-sky-200/60',
                'navActive': 'border border-sky-200 bg-sky-500/10',
                'navIconBg': 'bg-sky-100',
                'navBadgeText': 'text-sky-700',
                'badgeBg': 'bg-sky-200/60',
                'badgeText': 'text-sky-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'مراقبة السحابة', 'en': 'Cloud observability' },
            'title': { 'ar': 'سطر أوامر متكامل للسحابة', 'en': 'Unified cloud control plane' },
            'description': {
                'ar': 'مؤشرات توفر، تكلفة، وأداء وقتي عبر البيئات متعددة المناطق والبنية التحتية.',
                'en': 'Realtime availability, cost, and performance telemetry across multi-region infrastructure.'
            },
            'tags': [
                { 'ar': 'سحابة', 'en': 'Cloud' },
                { 'ar': 'مراقبة', 'en': 'Observability' }
            ]
        }
    },
    'content': {
        'layout': {
            'shell': 'bg-slate-950/22',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.3fr_1fr] gap-y-10'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-fuchsia-950 to-purple-900',
                'sidebarGradient': 'from-slate-950 via-fuchsia-900 to-purple-900',
                'cardBorder': 'border-fuchsia-500/35',
                'cardShadow': 'shadow-[0_38px_120px_-54px_rgba(192,38,211,0.75)]',
                'accentGradient': 'from-fuchsia-400 via-purple-400 to-rose-400',
                'highlightBg': 'bg-fuchsia-500/15 border-fuchsia-500/35',
                'navActive': 'border border-fuchsia-400/50 bg-fuchsia-500/15',
                'navIconBg': 'bg-purple-950/50',
                'navBadgeText': 'text-fuchsia-200',
                'badgeBg': 'bg-fuchsia-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-fuchsia-50 via-white to-purple-100',
                'sidebarGradient': 'from-white via-fuchsia-50 to-purple-100',
                'cardBorder': 'border-fuchsia-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(192,38,211,0.35)]',
                'accentGradient': 'from-fuchsia-400 via-purple-400 to-rose-400',
                'highlightBg': 'bg-fuchsia-500/10 border-fuchsia-200/60',
                'navActive': 'border border-fuchsia-200 bg-fuchsia-500/10',
                'navIconBg': 'bg-fuchsia-100',
                'navBadgeText': 'text-fuchsia-700',
                'badgeBg': 'bg-fuchsia-200/60',
                'badgeText': 'text-fuchsia-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'تشغيل المحتوى', 'en': 'Content operations' },
            'title': { 'ar': 'أتمتة غرف الأخبار الرقمية', 'en': 'Automate the digital newsroom' },
            'description': {
                'ar': 'جدولة إنتاج المحتوى، توزيع القنوات، ومراقبة الأداء السردي بواجهة واحدة.',
                'en': 'Orchestrate content production, channel distribution, and storytelling impact from one canvas.'
            },
            'tags': [
                { 'ar': 'محتوى', 'en': 'Content' },
                { 'ar': 'تعاون', 'en': 'Collaboration' }
            ]
        }
    },
    'experience': {
        'layout': {
            'shell': 'bg-slate-950/20',
            'main': 'space-y-13 lg:px-15',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.5fr_1fr] gap-y-10'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-rose-950 to-orange-900',
                'sidebarGradient': 'from-slate-950 via-rose-900 to-amber-900',
                'cardBorder': 'border-rose-500/35',
                'cardShadow': 'shadow-[0_36px_110px_-54px_rgba(244,63,94,0.7)]',
                'accentGradient': 'from-rose-400 via-orange-400 to-amber-400',
                'highlightBg': 'bg-rose-500/15 border-rose-500/35',
                'navActive': 'border border-rose-400/50 bg-rose-500/15',
                'navIconBg': 'bg-rose-950/50',
                'navBadgeText': 'text-rose-200',
                'badgeBg': 'bg-rose-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-rose-50 via-white to-amber-100',
                'sidebarGradient': 'from-white via-rose-50 to-amber-100',
                'cardBorder': 'border-rose-200',
                'cardShadow': 'shadow-[0_32px_90px_-55px_rgba(244,63,94,0.35)]',
                'accentGradient': 'from-rose-400 via-orange-400 to-amber-400',
                'highlightBg': 'bg-rose-500/10 border-rose-200/60',
                'navActive': 'border border-rose-200 bg-rose-500/10',
                'navIconBg': 'bg-rose-100',
                'navBadgeText': 'text-rose-700',
                'badgeBg': 'bg-rose-200/60',
                'badgeText': 'text-rose-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'تجربة العملاء', 'en': 'Customer experience' },
            'title': { 'ar': 'تجربة عملاء غامرة', 'en': 'Design immersive CX' },
            'description': {
                'ar': 'تنبؤ ولحظات حاسمة تعكس رحلة العميل من الاهتمام إلى الولاء بوقت حقيقي.',
                'en': 'Predictive journeys and moment maps from awareness to loyalty in realtime.'
            },
            'tags': [
                { 'ar': 'رحلة العميل', 'en': 'Journey' },
                { 'ar': 'ولاء', 'en': 'Loyalty' }
            ]
        }
    },
    'people': {
        'layout': {
            'shell': 'bg-slate-950/18',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.4fr_1fr] gap-y-10'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-emerald-950 to-lime-900',
                'sidebarGradient': 'from-slate-950 via-emerald-900 to-lime-900',
                'cardBorder': 'border-emerald-500/35',
                'cardShadow': 'shadow-[0_32px_100px_-48px_rgba(16,185,129,0.7)]',
                'accentGradient': 'from-emerald-400 via-lime-400 to-teal-400',
                'highlightBg': 'bg-emerald-500/15 border-emerald-500/35',
                'navActive': 'border border-emerald-400/50 bg-emerald-500/15',
                'navIconBg': 'bg-emerald-950/40',
                'navBadgeText': 'text-emerald-200',
                'badgeBg': 'bg-emerald-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-emerald-50 via-white to-lime-100',
                'sidebarGradient': 'from-white via-emerald-50 to-lime-100',
                'cardBorder': 'border-emerald-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(16,185,129,0.35)]',
                'accentGradient': 'from-emerald-400 via-lime-400 to-teal-400',
                'highlightBg': 'bg-emerald-500/10 border-emerald-200/60',
                'navActive': 'border border-emerald-200 bg-emerald-500/10',
                'navIconBg': 'bg-emerald-100',
                'navBadgeText': 'text-emerald-700',
                'badgeBg': 'bg-emerald-200/60',
                'badgeText': 'text-emerald-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'موارد بشرية', 'en': 'People ops' },
            'title': { 'ar': 'طاقة فرق عالية الأداء', 'en': 'Empower high-performing teams' },
            'description': {
                'ar': 'رؤية فورية للتوظيف، المشاركة، ومخاطر الاستبقاء لمديري الموارد البشرية.',
                'en': 'Realtime clarity on hiring, engagement, and retention risks for HR leaders.'
            },
            'tags': [
                { 'ar': 'مواهب', 'en': 'Talent' },
                { 'ar': 'مشاركة', 'en': 'Engagement' }
            ]
        }
    },
    'learning': {
        'layout': {
            'shell': 'bg-slate-950/20',
            'main': 'space-y-12 lg:px-15',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.5fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-sky-950 to-violet-900',
                'sidebarGradient': 'from-slate-950 via-sky-900 to-violet-900',
                'cardBorder': 'border-sky-500/35',
                'cardShadow': 'shadow-[0_34px_110px_-54px_rgba(56,189,248,0.7)]',
                'accentGradient': 'from-sky-400 via-indigo-400 to-violet-400',
                'highlightBg': 'bg-sky-500/15 border-sky-500/35',
                'navActive': 'border border-sky-400/50 bg-sky-500/15',
                'navIconBg': 'bg-indigo-950/50',
                'navBadgeText': 'text-sky-200',
                'badgeBg': 'bg-sky-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-sky-50 via-white to-violet-100',
                'sidebarGradient': 'from-white via-sky-50 to-violet-100',
                'cardBorder': 'border-sky-200',
                'cardShadow': 'shadow-[0_32px_90px_-55px_rgba(56,189,248,0.35)]',
                'accentGradient': 'from-sky-400 via-indigo-400 to-violet-400',
                'highlightBg': 'bg-sky-500/10 border-sky-200/60',
                'navActive': 'border border-sky-200 bg-sky-500/10',
                'navIconBg': 'bg-sky-100',
                'navBadgeText': 'text-indigo-700',
                'badgeBg': 'bg-sky-200/60',
                'badgeText': 'text-indigo-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'تعلم إلكتروني', 'en': 'Learning' },
            'title': { 'ar': 'رحلات تعلم مرنة', 'en': 'Craft adaptive learning journeys' },
            'description': {
                'ar': 'تحليلات تقدم، تفاعل، ومسارات تعلم فردية لفرق الأكاديميات الرقمية.',
                'en': 'Progress, engagement, and adaptive pathways analytics for digital academies.'
            },
            'tags': [
                { 'ar': 'تعلم', 'en': 'Learning' },
                { 'ar': 'منصات', 'en': 'Platforms' }
            ]
        }
    },
    'security': {
        'layout': {
            'shell': 'bg-slate-950/22',
            'main': 'space-y-12 lg:px-15',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.45fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-slate-900 to-rose-900',
                'sidebarGradient': 'from-slate-950 via-slate-900 to-rose-900',
                'cardBorder': 'border-rose-500/35',
                'cardShadow': 'shadow-[0_34px_110px_-54px_rgba(244,63,94,0.7)]',
                'accentGradient': 'from-rose-400 via-purple-400 to-slate-400',
                'highlightBg': 'bg-rose-500/15 border-rose-500/35',
                'navActive': 'border border-rose-400/50 bg-rose-500/15',
                'navIconBg': 'bg-slate-900/60',
                'navBadgeText': 'text-rose-200',
                'badgeBg': 'bg-rose-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-rose-50 via-white to-slate-100',
                'sidebarGradient': 'from-white via-rose-50 to-slate-100',
                'cardBorder': 'border-rose-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(244,63,94,0.35)]',
                'accentGradient': 'from-rose-400 via-purple-400 to-slate-400',
                'highlightBg': 'bg-rose-500/10 border-rose-200/60',
                'navActive': 'border border-rose-200 bg-rose-500/10',
                'navIconBg': 'bg-rose-100',
                'navBadgeText': 'text-rose-700',
                'badgeBg': 'bg-rose-200/60',
                'badgeText': 'text-rose-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'أمن المعلومات', 'en': 'Security ops' },
            'title': { 'ar': 'قيادة دفاعات ذكية', 'en': 'Command adaptive defenses' },
            'description': {
                'ar': 'مؤشرات تهديدات، استجابة، والتزام لحظية عبر بيئات متعددة وفرق الحماية.',
                'en': 'Instant view of threats, response posture, and compliance across hybrid estates.'
            },
            'tags': [
                { 'ar': 'تهديدات', 'en': 'Threats' },
                { 'ar': 'استجابة', 'en': 'Response' }
            ]
        }
    },
    'finance': {
        'layout': {
            'shell': 'bg-slate-950/18',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-5 gap-6',
            'panels': 'xl:grid-cols-[1.6fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-indigo-950 to-emerald-900',
                'sidebarGradient': 'from-slate-950 via-indigo-900 to-emerald-900',
                'cardBorder': 'border-indigo-500/35',
                'cardShadow': 'shadow-[0_36px_110px_-54px_rgba(79,70,229,0.7)]',
                'accentGradient': 'from-indigo-400 via-emerald-400 to-amber-400',
                'highlightBg': 'bg-indigo-500/15 border-indigo-500/35',
                'navActive': 'border border-indigo-400/50 bg-indigo-500/15',
                'navIconBg': 'bg-indigo-950/50',
                'navBadgeText': 'text-indigo-200',
                'badgeBg': 'bg-indigo-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-indigo-50 via-white to-emerald-100',
                'sidebarGradient': 'from-white via-indigo-50 to-emerald-100',
                'cardBorder': 'border-indigo-200',
                'cardShadow': 'shadow-[0_32px_90px_-55px_rgba(79,70,229,0.35)]',
                'accentGradient': 'from-indigo-400 via-emerald-400 to-amber-400',
                'highlightBg': 'bg-indigo-500/10 border-indigo-200/60',
                'navActive': 'border border-indigo-200 bg-indigo-500/10',
                'navIconBg': 'bg-indigo-100',
                'navBadgeText': 'text-indigo-700',
                'badgeBg': 'bg-indigo-200/60',
                'badgeText': 'text-indigo-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'الخدمات المالية', 'en': 'Financial services' },
            'title': { 'ar': 'شفافية مالية لحظية', 'en': 'Realtime financial clarity' },
            'description': {
                'ar': 'مراقبة الهوامش، المخاطر، وسير القوائم المالية مع تحكم بالسيناريوهات.',
                'en': 'Watch margins, risk exposure, and close cycles with scenario control in one pane.'
            },
            'tags': [
                { 'ar': 'مالية', 'en': 'Finance' },
                { 'ar': 'إدارة مخاطر', 'en': 'Risk' }
            ]
        }
    },
    'health': {
        'layout': {
            'shell': 'bg-slate-950/22',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.5fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-teal-950 to-rose-900',
                'sidebarGradient': 'from-slate-950 via-teal-900 to-rose-900',
                'cardBorder': 'border-teal-500/35',
                'cardShadow': 'shadow-[0_34px_110px_-54px_rgba(13,148,136,0.7)]',
                'accentGradient': 'from-teal-400 via-rose-400 to-sky-400',
                'highlightBg': 'bg-teal-500/15 border-teal-500/35',
                'navActive': 'border border-teal-400/50 bg-teal-500/15',
                'navIconBg': 'bg-teal-950/50',
                'navBadgeText': 'text-teal-200',
                'badgeBg': 'bg-teal-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-teal-50 via-white to-rose-100',
                'sidebarGradient': 'from-white via-teal-50 to-rose-100',
                'cardBorder': 'border-teal-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(13,148,136,0.35)]',
                'accentGradient': 'from-teal-400 via-rose-400 to-sky-400',
                'highlightBg': 'bg-teal-500/10 border-teal-200/60',
                'navActive': 'border border-teal-200 bg-teal-500/10',
                'navIconBg': 'bg-teal-100',
                'navBadgeText': 'text-teal-700',
                'badgeBg': 'bg-teal-200/60',
                'badgeText': 'text-teal-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'الصحة', 'en': 'Healthcare' },
            'title': { 'ar': 'تنسيق عمليات الرعاية', 'en': 'Coordinate clinical operations' },
            'description': {
                'ar': 'لوحة موحدة للقدرة السريرية، سلامة المرضى، والعمليات الحرجة للمستشفيات.',
                'en': 'Unified view of clinical capacity, patient safety, and hospital operations readiness.'
            },
            'tags': [
                { 'ar': 'رعاية', 'en': 'Care' },
                { 'ar': 'تشغيل', 'en': 'Operations' }
            ]
        }
    },
    'marketing': {
        'layout': {
            'shell': 'bg-slate-950/18',
            'main': 'space-y-12 lg:px-15',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.35fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-fuchsia-950 to-amber-900',
                'sidebarGradient': 'from-slate-950 via-fuchsia-900 to-amber-900',
                'cardBorder': 'border-fuchsia-500/35',
                'cardShadow': 'shadow-[0_36px_110px_-54px_rgba(236,72,153,0.75)]',
                'accentGradient': 'from-fuchsia-400 via-amber-400 to-rose-400',
                'highlightBg': 'bg-fuchsia-500/15 border-fuchsia-500/35',
                'navActive': 'border border-fuchsia-400/50 bg-fuchsia-500/15',
                'navIconBg': 'bg-fuchsia-950/50',
                'navBadgeText': 'text-fuchsia-200',
                'badgeBg': 'bg-fuchsia-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-fuchsia-50 via-white to-amber-100',
                'sidebarGradient': 'from-white via-fuchsia-50 to-amber-100',
                'cardBorder': 'border-fuchsia-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(236,72,153,0.35)]',
                'accentGradient': 'from-fuchsia-400 via-amber-400 to-rose-400',
                'highlightBg': 'bg-fuchsia-500/10 border-fuchsia-200/60',
                'navActive': 'border border-fuchsia-200 bg-fuchsia-500/10',
                'navIconBg': 'bg-fuchsia-100',
                'navBadgeText': 'text-fuchsia-700',
                'badgeBg': 'bg-fuchsia-200/60',
                'badgeText': 'text-fuchsia-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'التسويق', 'en': 'Marketing' },
            'title': { 'ar': 'ضبط حملات الأداء', 'en': 'Tune performance campaigns' },
            'description': {
                'ar': 'رؤية كاملة لحملات القنوات المتعددة، الميزانيات، ونقاط التحويل.',
                'en': 'Full-funnel command of omnichannel campaigns, spend pacing, and conversion moments.'
            },
            'tags': [
                { 'ar': 'حملات', 'en': 'Campaigns' },
                { 'ar': 'قنوات', 'en': 'Channels' }
            ]
        }
    },
    'supply': {
        'layout': {
            'shell': 'bg-slate-950/20',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.6fr_1fr] gap-y-10'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-amber-950 to-slate-800',
                'sidebarGradient': 'from-slate-950 via-amber-900 to-slate-900',
                'cardBorder': 'border-amber-500/35',
                'cardShadow': 'shadow-[0_36px_110px_-54px_rgba(245,158,11,0.65)]',
                'accentGradient': 'from-amber-400 via-slate-400 to-emerald-400',
                'highlightBg': 'bg-amber-500/15 border-amber-500/35',
                'navActive': 'border border-amber-400/50 bg-amber-500/15',
                'navIconBg': 'bg-slate-900/60',
                'navBadgeText': 'text-amber-200',
                'badgeBg': 'bg-amber-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-amber-50 via-white to-slate-100',
                'sidebarGradient': 'from-white via-amber-50 to-slate-100',
                'cardBorder': 'border-amber-200',
                'cardShadow': 'shadow-[0_32px_90px_-55px_rgba(245,158,11,0.35)]',
                'accentGradient': 'from-amber-400 via-slate-400 to-emerald-400',
                'highlightBg': 'bg-amber-500/10 border-amber-200/60',
                'navActive': 'border border-amber-200 bg-amber-500/10',
                'navIconBg': 'bg-amber-100',
                'navBadgeText': 'text-amber-700',
                'badgeBg': 'bg-amber-200/60',
                'badgeText': 'text-amber-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'سلسلة التوريد', 'en': 'Supply chain' },
            'title': { 'ar': 'رؤية شاملة للتوريد', 'en': 'End-to-end supply visibility' },
            'description': {
                'ar': 'مراقبة الطلب، المخزون، والشحن عبر الشبكات اللوجستية العالمية.',
                'en': 'Monitor demand, inventory, and logistics execution across global networks.'
            },
            'tags': [
                { 'ar': 'لوجستيات', 'en': 'Logistics' },
                { 'ar': 'تخطيط', 'en': 'Planning' }
            ]
        }
    },
    'realestate': {
        'layout': {
            'shell': 'bg-slate-950/18',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.4fr_1fr] gap-y-10'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-emerald-900 to-stone-900',
                'sidebarGradient': 'from-slate-950 via-emerald-900 to-stone-900',
                'cardBorder': 'border-emerald-500/30',
                'cardShadow': 'shadow-[0_32px_100px_-50px_rgba(16,185,129,0.55)]',
                'accentGradient': 'from-emerald-400 via-stone-400 to-blue-400',
                'highlightBg': 'bg-emerald-500/15 border-emerald-500/30',
                'navActive': 'border border-emerald-400/50 bg-emerald-500/15',
                'navIconBg': 'bg-stone-900/60',
                'navBadgeText': 'text-emerald-200',
                'badgeBg': 'bg-emerald-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-emerald-50 via-white to-stone-100',
                'sidebarGradient': 'from-white via-emerald-50 to-stone-100',
                'cardBorder': 'border-emerald-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(16,185,129,0.28)]',
                'accentGradient': 'from-emerald-400 via-stone-400 to-blue-400',
                'highlightBg': 'bg-emerald-500/10 border-emerald-200/60',
                'navActive': 'border border-emerald-200 bg-emerald-500/10',
                'navIconBg': 'bg-emerald-100',
                'navBadgeText': 'text-emerald-700',
                'badgeBg': 'bg-emerald-200/60',
                'badgeText': 'text-emerald-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'العقارات', 'en': 'Real estate' },
            'title': { 'ar': 'إدارة الأصول المتعددة', 'en': 'Manage multi-asset portfolios' },
            'description': {
                'ar': 'تحكم في الإشغال، العوائد، وتحليل المحافظ العقارية عبر المدن.',
                'en': 'Command occupancy, yields, and asset mix analytics across urban portfolios.'
            },
            'tags': [
                { 'ar': 'أصول', 'en': 'Assets' },
                { 'ar': 'إيرادات', 'en': 'Revenue' }
            ]
        }
    },
    'manufacturing': {
        'layout': {
            'shell': 'bg-slate-950/22',
            'main': 'space-y-12 lg:px-15',
            'stats': 'md:grid-cols-2 xl:grid-cols-5 gap-6',
            'panels': 'xl:grid-cols-[1.55fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-orange-950 to-slate-800',
                'sidebarGradient': 'from-slate-950 via-orange-900 to-slate-900',
                'cardBorder': 'border-orange-500/35',
                'cardShadow': 'shadow-[0_36px_110px_-54px_rgba(234,88,12,0.65)]',
                'accentGradient': 'from-orange-400 via-amber-400 to-slate-400',
                'highlightBg': 'bg-orange-500/15 border-orange-500/35',
                'navActive': 'border border-orange-400/50 bg-orange-500/15',
                'navIconBg': 'bg-slate-900/60',
                'navBadgeText': 'text-orange-200',
                'badgeBg': 'bg-orange-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-orange-50 via-white to-slate-100',
                'sidebarGradient': 'from-white via-orange-50 to-slate-100',
                'cardBorder': 'border-orange-200',
                'cardShadow': 'shadow-[0_32px_90px_-55px_rgba(234,88,12,0.35)]',
                'accentGradient': 'from-orange-400 via-amber-400 to-slate-400',
                'highlightBg': 'bg-orange-500/10 border-orange-200/60',
                'navActive': 'border border-orange-200 bg-orange-500/10',
                'navIconBg': 'bg-orange-100',
                'navBadgeText': 'text-orange-700',
                'badgeBg': 'bg-orange-200/60',
                'badgeText': 'text-orange-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'التصنيع', 'en': 'Manufacturing' },
            'title': { 'ar': 'إيقاع إنتاج مثالي', 'en': 'Perfect the production rhythm' },
            'description': {
                'ar': 'تحليل خطوط الإنتاج، جودة المنتجات، وصيانة المعدات في الوقت الحقيقي.',
                'en': 'Realtime analysis of production lines, quality yields, and maintenance readiness.'
            },
            'tags': [
                { 'ar': 'عمليات', 'en': 'Operations' },
                { 'ar': 'جودة', 'en': 'Quality' }
            ]
        }
    },
    'streaming': {
        'layout': {
            'shell': 'bg-slate-950/20',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-5 gap-6',
            'panels': 'xl:grid-cols-[1.6fr_1fr] gap-y-10'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-violet-950 to-rose-900',
                'sidebarGradient': 'from-slate-950 via-violet-900 to-rose-900',
                'cardBorder': 'border-violet-500/35',
                'cardShadow': 'shadow-[0_36px_110px_-54px_rgba(168,85,247,0.75)]',
                'accentGradient': 'from-violet-400 via-rose-400 to-amber-400',
                'highlightBg': 'bg-violet-500/15 border-violet-500/35',
                'navActive': 'border border-violet-400/50 bg-violet-500/15',
                'navIconBg': 'bg-violet-950/50',
                'navBadgeText': 'text-violet-200',
                'badgeBg': 'bg-violet-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-violet-50 via-white to-rose-100',
                'sidebarGradient': 'from-white via-violet-50 to-rose-100',
                'cardBorder': 'border-violet-200',
                'cardShadow': 'shadow-[0_32px_90px_-55px_rgba(168,85,247,0.35)]',
                'accentGradient': 'from-violet-400 via-rose-400 to-amber-400',
                'highlightBg': 'bg-violet-500/10 border-violet-200/60',
                'navActive': 'border border-violet-200 bg-violet-500/10',
                'navIconBg': 'bg-violet-100',
                'navBadgeText': 'text-violet-700',
                'badgeBg': 'bg-violet-200/60',
                'badgeText': 'text-violet-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'البث الرقمي', 'en': 'Streaming' },
            'title': { 'ar': 'منصة بث ديناميكية', 'en': 'Dynamic streaming studio' },
            'description': {
                'ar': 'قياس المشاهدة، التفاعل، وسير المحتوى عند الطلب في الوقت الفعلي.',
                'en': 'Track viewing, engagement, and content pipelines for on-demand services in realtime.'
            },
            'tags': [
                { 'ar': 'مشاهدة', 'en': 'Viewership' },
                { 'ar': 'إيرادات', 'en': 'Revenue' }
            ]
        }
    },
    'smartcity': {
        'layout': {
            'shell': 'bg-slate-950/18',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.5fr_1fr] gap-y-10'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-cyan-950 to-emerald-900',
                'sidebarGradient': 'from-slate-950 via-cyan-900 to-emerald-900',
                'cardBorder': 'border-cyan-500/35',
                'cardShadow': 'shadow-[0_34px_110px_-54px_rgba(34,211,238,0.65)]',
                'accentGradient': 'from-cyan-400 via-emerald-400 to-amber-400',
                'highlightBg': 'bg-cyan-500/15 border-cyan-500/35',
                'navActive': 'border border-cyan-400/50 bg-cyan-500/15',
                'navIconBg': 'bg-cyan-950/50',
                'navBadgeText': 'text-cyan-200',
                'badgeBg': 'bg-cyan-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-cyan-50 via-white to-emerald-100',
                'sidebarGradient': 'from-white via-cyan-50 to-emerald-100',
                'cardBorder': 'border-cyan-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(34,211,238,0.35)]',
                'accentGradient': 'from-cyan-400 via-emerald-400 to-amber-400',
                'highlightBg': 'bg-cyan-500/10 border-cyan-200/60',
                'navActive': 'border border-cyan-200 bg-cyan-500/10',
                'navIconBg': 'bg-cyan-100',
                'navBadgeText': 'text-cyan-700',
                'badgeBg': 'bg-cyan-200/60',
                'badgeText': 'text-cyan-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'المدن الذكية', 'en': 'Smart city' },
            'title': { 'ar': 'مركز تشغيل حضري', 'en': 'Urban operations hub' },
            'description': {
                'ar': 'دمج بيانات التنقل، الطاقة، والخدمات لتمكين قرارات بلدية أسرع.',
                'en': 'Fuse mobility, energy, and civic services data for faster municipal decisions.'
            },
            'tags': [
                { 'ar': 'خدمات', 'en': 'Services' },
                { 'ar': 'طاقة', 'en': 'Energy' }
            ]
        }
    },
    'hospitality': {
        'layout': {
            'shell': 'bg-slate-950/20',
            'main': 'space-y-12 lg:px-15',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.45fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-rose-950 to-amber-900',
                'sidebarGradient': 'from-slate-950 via-rose-900 to-amber-900',
                'cardBorder': 'border-rose-500/35',
                'cardShadow': 'shadow-[0_34px_110px_-54px_rgba(244,63,94,0.65)]',
                'accentGradient': 'from-rose-400 via-amber-400 to-emerald-400',
                'highlightBg': 'bg-rose-500/15 border-rose-500/35',
                'navActive': 'border border-rose-400/50 bg-rose-500/15',
                'navIconBg': 'bg-rose-950/50',
                'navBadgeText': 'text-rose-200',
                'badgeBg': 'bg-rose-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-rose-50 via-white to-amber-100',
                'sidebarGradient': 'from-white via-rose-50 to-amber-100',
                'cardBorder': 'border-rose-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(244,63,94,0.35)]',
                'accentGradient': 'from-rose-400 via-amber-400 to-emerald-400',
                'highlightBg': 'bg-rose-500/10 border-rose-200/60',
                'navActive': 'border border-rose-200 bg-rose-500/10',
                'navIconBg': 'bg-rose-100',
                'navBadgeText': 'text-rose-700',
                'badgeBg': 'bg-rose-200/60',
                'badgeText': 'text-rose-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'الضيافة', 'en': 'Hospitality' },
            'title': { 'ar': 'إدارة تجربة الضيوف', 'en': 'Curate guest experience' },
            'description': {
                'ar': 'لوحة شاملة للإشغال، الإيرادات، ورضا الضيوف لسلاسل الفنادق والمنتجعات.',
                'en': 'Unified occupancy, revenue, and guest sentiment view for hotel and resort portfolios.'
            },
            'tags': [
                { 'ar': 'ضيوف', 'en': 'Guests' },
                { 'ar': 'إيرادات', 'en': 'Revenue' }
            ]
        }
    },
    'energy': {
        'layout': {
            'shell': 'bg-slate-950/18',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.6fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-emerald-950 to-lime-900',
                'sidebarGradient': 'from-slate-950 via-emerald-900 to-lime-900',
                'cardBorder': 'border-emerald-500/35',
                'cardShadow': 'shadow-[0_34px_110px_-54px_rgba(34,197,94,0.7)]',
                'accentGradient': 'from-emerald-400 via-lime-400 to-sky-400',
                'highlightBg': 'bg-emerald-500/15 border-emerald-500/35',
                'navActive': 'border border-emerald-400/50 bg-emerald-500/15',
                'navIconBg': 'bg-emerald-950/50',
                'navBadgeText': 'text-emerald-200',
                'badgeBg': 'bg-emerald-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-emerald-50 via-white to-lime-100',
                'sidebarGradient': 'from-white via-emerald-50 to-lime-100',
                'cardBorder': 'border-emerald-200',
                'cardShadow': 'shadow-[0_32px_90px_-55px_rgba(34,197,94,0.35)]',
                'accentGradient': 'from-emerald-400 via-lime-400 to-sky-400',
                'highlightBg': 'bg-emerald-500/10 border-emerald-200/60',
                'navActive': 'border border-emerald-200 bg-emerald-500/10',
                'navIconBg': 'bg-emerald-100',
                'navBadgeText': 'text-emerald-700',
                'badgeBg': 'bg-emerald-200/60',
                'badgeText': 'text-emerald-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'الطاقة المتجددة', 'en': 'Renewable energy' },
            'title': { 'ar': 'تشغيل الطاقة النظيفة', 'en': 'Operate clean energy grids' },
            'description': {
                'ar': 'رصد التوليد، الاستهلاك، ومخازن الطاقة في الوقت الحقيقي عبر المحطات.',
                'en': 'Monitor generation, load, and storage performance across renewable plants in realtime.'
            },
            'tags': [
                { 'ar': 'طاقة', 'en': 'Energy' },
                { 'ar': 'شبكات', 'en': 'Grids' }
            ]
        }
    },
    'sports': {
        'layout': {
            'shell': 'bg-slate-950/18',
            'main': 'space-y-12 lg:px-16',
            'stats': 'md:grid-cols-2 xl:grid-cols-4 gap-6',
            'panels': 'xl:grid-cols-[1.4fr_1fr] gap-y-9'
        },
        'theme': {
            'dark': {
                'bodyGradient': 'from-slate-950 via-purple-950 to-indigo-900',
                'sidebarGradient': 'from-slate-950 via-purple-900 to-indigo-900',
                'cardBorder': 'border-purple-500/35',
                'cardShadow': 'shadow-[0_34px_110px_-54px_rgba(139,92,246,0.7)]',
                'accentGradient': 'from-purple-400 via-indigo-400 to-emerald-400',
                'highlightBg': 'bg-purple-500/15 border-purple-500/35',
                'navActive': 'border border-purple-400/50 bg-purple-500/15',
                'navIconBg': 'bg-purple-950/50',
                'navBadgeText': 'text-purple-200',
                'badgeBg': 'bg-purple-500/20',
                'badgeText': 'text-white'
            },
            'light': {
                'bodyGradient': 'from-purple-50 via-white to-indigo-100',
                'sidebarGradient': 'from-white via-purple-50 to-indigo-100',
                'cardBorder': 'border-purple-200',
                'cardShadow': 'shadow-[0_30px_90px_-55px_rgba(139,92,246,0.35)]',
                'accentGradient': 'from-purple-400 via-indigo-400 to-emerald-400',
                'highlightBg': 'bg-purple-500/10 border-purple-200/60',
                'navActive': 'border border-purple-200 bg-purple-500/10',
                'navIconBg': 'bg-purple-100',
                'navBadgeText': 'text-purple-700',
                'badgeBg': 'bg-purple-200/60',
                'badgeText': 'text-purple-900'
            }
        },
        'gallery': {
            'badge': { 'ar': 'الرياضة', 'en': 'Sports analytics' },
            'title': { 'ar': 'لوحة إدارة الفرق', 'en': 'Team performance cockpit' },
            'description': {
                'ar': 'مؤشرات الأداء، الصحة، والتفاعل الجماهيري للنوادي الرياضية المحترفة.',
                'en': 'Player performance, wellness, and fan engagement analytics for professional clubs.'
            },
            'tags': [
                { 'ar': 'أداء', 'en': 'Performance' },
                { 'ar': 'جماهير', 'en': 'Fans' }
            ]
        }
    }
}


def deep_merge(original, overrides):
    result = deepcopy(original)
    for key, value in overrides.items():
        if isinstance(value, dict) and isinstance(result.get(key), dict):
            result[key] = deep_merge(result.get(key, {}), value)
        else:
            result[key] = value
    return result


def build_spotlight(conf):
    stats = conf.get('stats', [])
    if len(stats) < 1:
        return None
    primary = stats[0]
    bullets = []
    for stat in stats[1:4]:
        bullets.append({
            'value': stat.get('value', ''),
            'title': stat.get('label', {'ar': '', 'en': ''}),
            'subtitle': stat.get('delta', {'ar': '', 'en': ''})
        })
    while len(bullets) < 3:
        bullets.append({
            'value': primary.get('value', ''),
            'title': primary.get('label', {'ar': '', 'en': ''}),
            'subtitle': primary.get('delta', {'ar': '', 'en': ''})
        })
    subtitle = conf.get('header', {}).get('subtitle', {'ar': '', 'en': ''})
    return {
        'id': 'executive-spotlight',
        'type': 'spotlight',
        'kicker': { 'ar': 'موجز القيادة', 'en': 'Executive pulse' },
        'metric': {
            'ar': f"{primary.get('value', '')} {primary.get('label', {}).get('ar', '')}",
            'en': f"{primary.get('value', '')} {primary.get('label', {}).get('en', '')}"
        },
        'description': subtitle,
        'bullets': bullets
    }


def build_matrix(conf):
    stats = conf.get('stats', [])
    if len(stats) < 2:
        return None
    cells = []
    for index, stat in enumerate(stats[:4]):
        cell = {
            'title': stat.get('label', {'ar': '', 'en': ''}),
            'value': { 'ar': stat.get('value', ''), 'en': stat.get('value', '') },
            'caption': stat.get('delta', {'ar': '', 'en': ''}),
            'emphasis': index == 0
        }
        if index == 0:
            cell['badge'] = { 'ar': 'أولوية', 'en': 'Priority' }
        cells.append(cell)
    return {
        'id': 'performance-matrix',
        'type': 'matrix',
        'title': { 'ar': 'مصفوفة الأداء', 'en': 'Performance matrix' },
        'layout': 'md:grid-cols-2',
        'cells': cells
    }


def build_schedule(conf):
    timeline = None
    for panel in conf.get('panels', []):
        if panel.get('type') == 'timeline':
            timeline = panel
            break
    slots = []
    if timeline:
        for item in timeline.get('items', [])[:3]:
            slots.append({
                'title': item.get('title', {'ar': '', 'en': ''}),
                'subtitle': item.get('subtitle', {'ar': '', 'en': ''}),
                'time': item.get('time', {'ar': 'قريباً', 'en': 'Soon'})
            })
    if not slots:
        return None
    return {
        'id': 'next-events',
        'type': 'schedule',
        'title': { 'ar': 'محطات قادمة', 'en': 'Upcoming checkpoints' },
        'action': { 'ar': 'تزامن مع التقويم', 'en': 'Sync to calendar' },
        'slots': slots
    }


def build_kanban(conf):
    list_panel = None
    for panel in conf.get('panels', []):
        if panel.get('type') == 'list':
            list_panel = panel
            break
    if not list_panel:
        return None
    columns = [
        { 'title': { 'ar': 'التركيز الآن', 'en': 'Immediate focus' }, 'cards': [] },
        { 'title': { 'ar': 'قيد التنفيذ', 'en': 'In execution' }, 'cards': [] },
        { 'title': { 'ar': 'نتائج', 'en': 'Outcomes' }, 'cards': [] }
    ]
    for index, item in enumerate(list_panel.get('items', [])):
        target = columns[index % len(columns)]
        target['cards'].append({
            'title': item.get('title', {'ar': '', 'en': ''}),
            'subtitle': item.get('subtitle', {'ar': '', 'en': ''}),
            'tags': [item.get('delta', {'ar': '', 'en': ''})]
        })
    for column in columns:
        column['count'] = str(len(column['cards']))
    return {
        'id': 'workflow-board',
        'type': 'kanban',
        'title': { 'ar': 'حركة العمل', 'en': 'Workflow board' },
        'layout': 'md:grid-cols-3',
        'columns': columns
    }


def compose_panels(conf, index, overrides):
    if 'panels' in overrides:
        return conf['panels']
    new_panels = []
    spotlight = build_spotlight(conf)
    if spotlight:
        new_panels.append(spotlight)
    if index % 3 == 0:
        matrix = build_matrix(conf)
        if matrix:
            new_panels.append(matrix)
        schedule = build_schedule(conf)
        if schedule:
            new_panels.append(schedule)
    elif index % 3 == 1:
        kanban = build_kanban(conf)
        if kanban:
            new_panels.append(kanban)
        matrix = build_matrix(conf)
        if matrix:
            new_panels.append(matrix)
    else:
        schedule = build_schedule(conf)
        if schedule:
            new_panels.append(schedule)
        kanban = build_kanban(conf)
        if kanban:
            new_panels.append(kanban)
    for panel in conf.get('panels', [])[:2]:
        new_panels.append(panel)
    return new_panels


def ensure_sidebar(conf):
    if 'sidebarSections' in conf:
        return conf['sidebarSections']
    sections = []
    stats = conf.get('stats', [])
    if stats:
        items = []
        for stat in stats[:3]:
            items.append({
                'label': stat.get('label', {'ar': '', 'en': ''}),
                'value': { 'ar': stat.get('value', ''), 'en': stat.get('value', '') }
            })
        sections.append({
            'type': 'list',
            'title': { 'ar': 'مؤشرات سريعة', 'en': 'Quick indicators' },
            'items': items
        })
    return sections


BLUEPRINTS = {}

for key, base_conf in BASE_CONFIG.items():
    blueprint_id = ID_MAP[key]
    conf = deepcopy(base_conf)
    conf['id'] = blueprint_id
    conf['slug'] = f"{key}.html"
    overrides = OVERRIDES.get(blueprint_id, {})
    conf = deep_merge(conf, overrides)
    if 'gallery' not in conf:
        raise ValueError(f"Gallery information missing for {blueprint_id}")
    index = int(key.split('-')[1])
    conf['panels'] = compose_panels(conf, index, overrides)
    conf['sidebarSections'] = ensure_sidebar(conf)
    BLUEPRINTS[blueprint_id] = conf

output = json.dumps(BLUEPRINTS, ensure_ascii=False, indent=2)
lines = [
    'const DASHBOARD_BLUEPRINTS = ' + output + ';',
    '',
    'function getDashboardBlueprint(id) {',
    '  return DASHBOARD_BLUEPRINTS[id];',
    '}',
    '',
    'if (typeof window !== "undefined") {',
    '  window.DASHBOARD_BLUEPRINTS = DASHBOARD_BLUEPRINTS;',
    '  window.getDashboardBlueprint = getDashboardBlueprint;',
    '}',
    '',
    'export { DASHBOARD_BLUEPRINTS, getDashboardBlueprint };'
]
(BASE_PATH / 'dashboard-blueprints.js').write_text('\n'.join(lines))
