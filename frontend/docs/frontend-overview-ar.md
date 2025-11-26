# توثيق واجهة منصة Avocat

## 1. نظرة عامة تقنية
- الواجهة مبنية باستخدام **React 18** مع **TypeScript** ويتم تجميعها عبر **Vite**، مع الاعتماد على Tailwind CSS وطبقة مكونات مستندة إلى shadcn/Radix لتصميم واجهة تفاعلية قابلة لإعادة الاستخدام.【F:frontend/package.json†L1-L60】【F:frontend/tailwind.config.ts†L1-L118】
- نقطة الدخول هي ملف `index.html` الذي يحمّل الحزمة الأساسية ويستضيف عنصر الجذر، بينما يتولى `main.tsx` إقلاع تطبيق React وربطه بمزودي الحالة والسياقات العالمية.【F:frontend/index.html†L1-L49】【F:frontend/src/main.tsx†L1-L15】
- يتم تنظيم الكود داخل مجلد `src` حسب الوظائف (صفحات، مكونات، سياقات، خدمات API، وحدات متخصصة، إلخ) مما يسهل فهم الحدود بين واجهة الهبوط ولوحة التحكم ومسارات الإدارة المتقدمة.【F:frontend/src/App.tsx†L1-L103】【F:frontend/src/api/legalCases.service.ts†L1-L154】

## 2. دورة حياة الواجهة وتشغيلها
1. **تحميل المستند**: يستورد المتصفح `index.html` ثم يشغّل حزمة Vite التي تربط `main.tsx` بعنصر الجذر في DOM.【F:frontend/index.html†L1-L49】
2. **تهيئة React**: يقوم `main.tsx` بإنشاء الجذر عبر `createRoot` ويغلّف التطبيق داخل `React.StrictMode` لضمان اكتشاف السلوكيات غير المتوقعة أثناء التطوير.【F:frontend/src/main.tsx†L1-L15】
3. **حقن المزودين العالميين**: ملف `AppProviders.tsx` يطبّق شجرة المزودين (السمة، اللغة، TanStack Query، المصادقة، الإشعارات، حالة الشريط الجانبي، مزودات التلميحات ومشغلات التنبيه) قبل تمرير الأطفال، مما يجعل هذه السياقات متاحة على مستوى التطبيق بأكمله.【F:frontend/src/providers/AppProviders.tsx†L1-L39】
4. **تعريف التوجيه**: داخل `App.tsx` يتم إنشاء بنية المسارات باستخدام `BrowserRouter` و`Routes`، حيث تُقسّم إلى مسارات عامة (الهبوط، الدخول، التسجيل) ومسارات محمية ضمن `/dashboard` مع عناصر داخلية متعددة، بالإضافة إلى صفحة 404.【F:frontend/src/App.tsx†L1-L103】
5. **حماية الوصول**: مكوّن `ProtectedRoute` يتحقق من حالة التحميل والمصادقة؛ يعرض شاشة انتظار أثناء استرجاع بيانات الجلسة ويعيد التوجيه إلى صفحة الدخول إذا لم يكن المستخدم مصرحًا له.【F:frontend/src/components/ProtectedRoute.tsx†L1-L29】
6. **إدارة البيانات المتفاعلة**: تعتمد الصفحات التي تتعامل مع بيانات حية على TanStack Query (مثل خطاطيف `useLegalCases`) لإجراء الطلبات عبر خدمات Axios، تخزين النتائج مؤقتًا، وإبطالها عند التعديل أو الحذف، مما يضمن تزامن الواجهة مع الخادم.【F:frontend/src/hooks/useLegalCases.tsx†L1-L55】【F:frontend/src/api/axiosConfig.ts†L1-L59】
7. **تدفق الترجمة والاتجاه**: سياق اللغة يقرأ لغة المستخدم، يحدّث اتجاه الصفحة (RTL/LTR)، ويستدعي i18next لتحميل النصوص من ملفات الترجمة، ما يسمح بإظهار نفس الواجهة بالعربية أو الإنجليزية دون إعادة التحميل.【F:frontend/src/contexts/LanguageContext.tsx†L1-L86】【F:frontend/src/i18n/index.ts†L1-L35】
8. **الإشعارات الفورية**: عند تسجيل الدخول كمشرف يتم تشغيل `NotificationCenter` للاتصال بخادم الأحداث عبر SSE، مزامنة سجل النشاط، وتغذية لوحات الإدارة ببيانات آنية مع تكرار تلقائي عند حدوث خطأ.【F:frontend/src/modules/notifications/NotificationCenter.tsx†L1-L200】

## 3. المزودون والسياقات الأساسية
| السياق | المهام الرئيسية | نقاط التكامل |
| --- | --- | --- |
| ThemeContext | تخزين اختيار السمة (فاتح/داكن)، مراقبة تفضيل النظام، وتحديث `classList` للجذر لضبط ألوان Tailwind المتغيرة ديناميكيًا.【F:frontend/src/contexts/ThemeContext.tsx†L1-L97】 | مكونات التصميم، شريط الأدوات العلوي، مخططات اللون في Tailwind. |
| LanguageContext | تبديل اللغة، التحكم في الاتجاه، والربط بـ i18next مع تخزين الاختيار في LocalStorage.【F:frontend/src/contexts/LanguageContext.tsx†L1-L86】 | نصوص الصفحات، الشريط الجانبي، عناصر التنقل. |
| AuthContext | إقلاع الجلسة من التخزين، تنفيذ عمليات تسجيل الدخول/الخروج/التسجيل، وتخزين رمز الوصول ومعلومات المستخدم.【F:frontend/src/contexts/AuthContext.tsx†L1-L129】 | حماية المسارات، التبديل الشرطي للمحتوى، طلبات API المصادق عليها. |
| SidebarContext | التحكم في حالة طي الشريط الجانبي وفتحه على الأجهزة المحمولة مع تحديث العرض استنادًا إلى حجم الشاشة.【F:frontend/src/contexts/SidebarContext.tsx†L1-L92】 | مكونات التخطيط (Sidebar، MobileDrawer). |
| NotificationCenter | إدارة إشعارات SSE، عدد الرسائل غير المقروءة، وإبطال استعلامات TanStack Query المرتبطة بلوحات الإدارة.【F:frontend/src/modules/notifications/NotificationCenter.tsx†L1-L200】 | صفحات إدارة الموقع، مركز الإشعارات في الرأس. |

## 4. هيكل المجلدات العملية
- **`src/pages`**: يحتوي على صفحات التطبيق الموجهة بالتوجيه؛ أمثلة تشمل لوحة الهبوط المقسمة إلى وحدات (`Landing/index.tsx` مع أقسام مثل HeroCarousel وServices) وصفحات لوحة التحكم المتعددة.【F:frontend/src/pages/Landing/index.tsx†L1-L39】【F:frontend/src/pages/Dashboard.tsx†L1-L11】
- **`src/components`**: يضم المكونات القابلة لإعادة الاستخدام (التخطيطات، عناصر الجدولة، النماذج، مكونات المجال مثل تفاصيل القضايا) إضافة إلى مكتبة واجهة المستخدم المولدة من shadcn/Radix.【F:frontend/src/components/layout/AppShell.tsx†L1-L34】【F:frontend/src/components/legalCases/Details/LegalCaseDetails.tsx†L1-L80】
- **`src/api`**: طبقة الخدمات التي تتعامل مع REST API عبر Axios، وتشمل ملفات مخصصة للقضايا، العملاء، الإعلانات القضائية، إلخ.【F:frontend/src/api/legalCases.service.ts†L1-L154】【F:frontend/src/api/clients.service.ts†L1-L131】
- **`src/hooks`**: خطاطيف الأعمال المخصصة لتجميع الوصول إلى البيانات المنطقية (مثل `useLegalCases`, `useWebsiteContent`, `useClients`) وتغليف منطق TanStack Query.【F:frontend/src/hooks/useLegalCases.tsx†L1-L55】【F:frontend/src/hooks/useWebsiteContent.ts†L1-L73】
- **`src/config`**: ملفات التهيئة مثل `config.ts` لعنوان الخادم، و`sidebar.ts` لتوليد بنية الشريط الجانبي وأسماء الأيقونات.【F:frontend/src/config/config.ts†L1-L9】【F:frontend/src/config/sidebar.ts†L1-L83】
- **`src/modules`**: وحدات متخصصة عالية المستوى مثل مركز الإشعارات الذي يربط SSE مع React Query لتغذية صفحات الإدارة.【F:frontend/src/modules/notifications/NotificationCenter.tsx†L1-L200】

## 5. خريطة الصفحات والمسارات
### 5.1 المسارات العامة
| المسار | الغرض | المكونات البارزة |
| --- | --- | --- |
| `/` | صفحة الهبوط المكونة من أقسام قابلة للتخصيص من لوحة الإدارة (عرض الشرائح، الخدمات، الإنجازات، الفريق...).【F:frontend/src/pages/Landing/index.tsx†L1-L39】 | `LandingNavbar`, `HeroCarousel`, `Services`, `Testimonials`, `Insights`, `Contact`, `Footer`. |
| `/login` | شاشة مصادقة تتيح التبديل بين الدخول والتسجيل، مع تحكم كامل في التحقق والرسائل عبر التوست ومركز اللغة.【F:frontend/src/pages/Login.tsx†L1-L119】 | تبويبات Radix، نموذجين، `BrandLogo`, `useAuth`, `useToast`. |
| `/signup` | توجيه بسيط يعيد استخدام تخطيط المصادقة (غالبًا يحمّل نفس المكونات من `Login`).【F:frontend/src/pages/Signup.tsx†L1-L87】 | نموذج تسجيل منفصل، قسم مميزات للمنصة. |
| `*` | صفحة 404 تعرض رسالة مخصصة وروابط رجوع باستخدام مكونات الواجهة المشتركة.【F:frontend/src/pages/NotFound.tsx†L1-L63】 | `Button`, `BrandLogo`, تصميم متدرج. |

### 5.2 لوحة التحكم المحمية `/dashboard`
يتم تغليف جميع المسارات داخل `Dashboard` بواسطة `AppShell` الذي يوفّر الشريط الجانبي، الرأس، تخطيط المحتوى، ودعم الاتجاهين.【F:frontend/src/pages/Dashboard.tsx†L1-L11】【F:frontend/src/components/layout/AppShell.tsx†L1-L34】

| المسار الفرعي | الوظيفة | المكونات والخطاطيف |
| --- | --- | --- |
| (index) | لوحة معلومات غنية بالبطاقات، الرسوم البيانية (Recharts)، وملخص النشاط.【F:frontend/src/pages/dashboard/DashboardHome.tsx†L1-L120】 | `StatsCards`, `RecentCases`, بطاقات Tailwind، تكامل مع `useLanguage` و`useTheme`. |
| `cases` | شبكة إدارة القضايا مع جدول تفصيلي، بحث، وفرز، بالإضافة إلى نموذج إضافة/تعديل ومدخل للتفاصيل.【F:frontend/src/pages/LegalCasesPage.tsx†L1-L120】 | `DetailsTable`, `AddEditLegalCaseModal`, خطاطيف `useLegalCases` و`useDeleteLegalCase`. |
| `cases/:id` | عرض تفاصيل القضية بجلساتها وإجراءاتها وأطرافها، مع نماذج فرعية لإضافة الجلسات والإعلانات.【F:frontend/src/components/legalCases/Details/LegalCaseDetails.tsx†L1-L80】 | أقسام `CaseSection`, `ClientsSection`, `SessionsSection`, خطاطيف استرجاع التفاصيل. |
| `clients` | لوحة إدارة العملاء الحاليين مع تصفية وإجراءات متعددة.【F:frontend/src/pages/ClientsPage.tsx†L1-L22】 | `useClients`, نماذج التعديل، أدوات التصدير. |
| `unClients` | تتبع العملاء المحتملين (بدون وكالة)، إعادة استخدام `DetailsTable` مع أعمدة مختلفة.【F:frontend/src/pages/UnClientsPage.tsx†L1-L29】 | `useClients` مع فلاتر prospect، أزرار التحويل. |
| `lawyers` و`lawyers/:id` | دليل المحامين وبطاقة التفاصيل الفردية، بما في ذلك بطاقات الخدمات ومؤشرات التقييم.【F:frontend/src/pages/LawyersPage.tsx†L1-L4】 | `LawyersList`, `LawyerDetails`, خطاطيف `useUserRoles`. |
| `services` | إدارة الخدمات القانونية: بطاقات الخدمات، جداول الأسعار، وإمكانية التعديل.【F:frontend/src/pages/ServicesPage.tsx†L1-L140】 | استخدام مباشر لـ`useQuery`/`useMutation` مع خدمات `services.service`، بالإضافة إلى حوار `ServiceFormDialog`. |
| `office_settings` | إعدادات المكتب (المعلومات العامة، فرق العمل، مستندات الهوية).【F:frontend/src/pages/OfficeSettingsPage.tsx†L1-L140】 | تبويبات متعددة تعتمد على `useQuery` و`useMutation` مع خدمات `officeSettings.service` مع حوارات تأكيد وتبديل سمة العلامة التجارية. |
| `website/*` | مركز إدارة الموقع (صفحات، مقالات، الفريق، الإنجازات، الإعدادات) مع واجهات إدخال ديناميكية تعتمد على المحتوى من الـ CMS الداخلي.【F:frontend/src/pages/admin/Website/AdminWebsitePage.tsx†L1-L62】 | `PagesManager`, `ArticlesManager`, `TeamManager`, `AchievementsManager`, `SettingsManager`, كل منها يستخدم خطاطيف `useWebsiteContent` و`useWebsiteCollection`. |
| `website/report` | تقرير أداء الموقع مع بطاقات جاهزة تعرض مؤشرات النشر وصحة الـ API بناءً على `ReportWidget`.【F:frontend/src/pages/admin/Website/WebsiteReportPage.tsx†L1-L17】【F:frontend/src/pages/admin/Website/components/ReportWidget.tsx†L1-L120】 | `ReportWidget` يجمع بين `useQuery`، صلاحيات `useUserRoles`، وإشعارات `useNotifications` لعرض التقدم واستخدام الوسائط. |
| `website/workflow` | لوحة لمتابعة سير عمل النشر وجدول الموافقات في الزمن الحقيقي.【F:frontend/src/pages/admin/Website/WorkflowBoardPage.tsx†L1-L80】 | `useQuery` لاستدعاء `getPublishingQueue`، مع تكامل `useUserRoles` و`useNotifications` لعرض حالة الاتصال والتنبيهات. |
| `website/activity` | سجل النشاط الإداري يعرض أحداث SSE القادمة من `NotificationCenter`.【F:frontend/src/pages/admin/Website/ActivityLogPage.tsx†L1-L120】 | `useNotificationCenterContext`, جدول أحداث. |
| `website/notifications` | مركز إشعارات المسؤول مع إمكانيات تعليم كمقروء وإزالة الرسائل.【F:frontend/src/pages/admin/Website/NotificationsPage.tsx†L1-L112】 | `NotificationFeed`, `useNotificationCenterContext`. |
| مسارات قادمة (`sessions`, `procedures`, `reports`, `settings`, `users_roles`, `archive`, `courts_search`) | يتم تمثيلها بمكون Placeholder يترجم العناوين ويلمح لقدومها مستقبلاً.【F:frontend/src/App.tsx†L25-L70】 | `DashboardPlaceholder` مع نص مترجم من `LanguageContext`. |

## 6. المكونات المشتركة والبنية البصرية
- **التخطيط**: `AppShell` يجمع `Sidebar`, `MobileDrawer`, و`Header` ويضبط اتجاه النص وفق اللغة النشطة.【F:frontend/src/components/layout/AppShell.tsx†L1-L34】
- **الشريط الجانبي**: يعتمد على تهيئة `sidebarGroups` لتوليد العناصر ديناميكيًا، مع دعم الطي، إشارات الحالة، وتوافق الأجهزة المحمولة.【F:frontend/src/config/sidebar.ts†L1-L83】【F:frontend/src/components/layout/Sidebar.tsx†L1-L180】
- **مكتبة UI**: مجلد `components/ui` يحتوي على تغليفات لمكونات Radix (أزرار، تبويبات، نماذج، توست، Tooltip...) مع دمج Tailwind و`class-variance-authority` لتخصيص الأنماط.【F:frontend/src/components/ui/button.tsx†L1-L74】【F:frontend/src/components/ui/tabs.tsx†L1-L95】
- **الجداول المتقدمة**: مكوّن `DetailsTable` يوفر فرزًا، تصديرًا إلى Excel، إجراءات صفية، وحالات تحميل/عدم وجود بيانات موحدة.【F:frontend/src/components/common/DetailsTable.tsx†L1-L220】
- **مكونات المجال**: مثل `AddEditLegalCaseModal`, `LegalCaseDetails`، و`ClientsTable` التي تجمع بين النماذج، الجداول، والتكامل مع خدمات API المتخصصة.【F:frontend/src/components/legalCases/AddEditLegalCaseModal.tsx†L1-L210】【F:frontend/src/components/clientsAndUnclients/ClientsTable.tsx†L1-L160】

## 7. الحزم الخارجية الرئيسية
| الفئة | الحزم |
| --- | --- |
| إطار العمل والتجميع | `react`, `react-dom`, `vite`, `@vitejs/plugin-react-swc`, `typescript`.【F:frontend/package.json†L1-L54】 |
| إدارة الحالة والطلبات | `@tanstack/react-query`, `axios`.【F:frontend/package.json†L41-L44】 |
| التدويل | `i18next`, `react-i18next`, `i18next-browser-languagedetector`.【F:frontend/package.json†L47-L48】 |
| واجهة المستخدم | حزمة Radix المتعددة، `lucide-react` للأيقونات، `framer-motion` للحركة، `embla-carousel-react` للسلايدر، `react-day-picker`, `cmdk`, `sonner`.【F:frontend/package.json†L17-L60】 |
| الرسوم والتحليلات | `recharts` للرسوم البيانية، `react-resizable-panels` للتخطيطات التكيفية.【F:frontend/package.json†L52-L54】 |
| الأدوات المساندة | `class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`, `file-saver`, `exceljs` للتصدير.【F:frontend/package.json†L44-L60】 |

## 8. إدارة المحتوى والبيانات المساعدة
- تتوفر بيانات وهمية وعينات واجهات في `src/data` لدعم العرض في حال غياب بيانات حقيقية (مثل `dashboard-showcase` و`mock-data`).【F:frontend/src/data/dashboard-showcase.ts†L1-L120】【F:frontend/src/data/mock-data.ts†L1-L140】
- أدوات المساعدة مثل `smoothScrollToElement` و`resolveAssetUrl` تُستخدم في صفحة الهبوط للتمرير السلس وتحميل الوسائط الديناميكية من إعدادات لوحة الإدارة.【F:frontend/src/utils/smoothScroll.ts†L1-L60】【F:frontend/src/utils/asset.ts†L1-L80】

## 9. التدويل ودعم الاتجاهين
- إعداد i18next يحمّل نطاق `common` للغتين العربية والإنجليزية مع كشف اللغة تلقائيًا وتخزينها في LocalStorage لضمان تماسك التجربة بين الزيارات.【F:frontend/src/i18n/index.ts†L1-L35】
- عند تغيير اللغة يقوم `LanguageContext` بتحديث `dir` على مستوى `documentElement`، ما يسمح بتبديل الاتجاه في التخطيط والمكونات تلقائيًا دون إعادة تحميل الصفحة.【F:frontend/src/contexts/LanguageContext.tsx†L21-L78】

## 10. مسار العمل الإداري المتكامل
- صفحات إدارة الموقع (`/dashboard/website/...`) تستفيد من خطاطيف `useWebsiteContent` و`useWebsiteCollection` لجلب كتل المحتوى (hero, services, testimonials) مع دعم الترجمة والتخزين المؤقت، ما يتيح تحرير موقع الهبوط مباشرة من لوحة التحكم.【F:frontend/src/hooks/useWebsiteContent.ts†L1-L73】【F:frontend/src/pages/admin/Website/AdminWebsitePage.tsx†L1-L62】
- مركز الإشعارات وسجل النشاط يعتمدان على `NotificationCenter` لتتبع الأحداث المباشرة (نشر المحتوى، سير العمل، الموافقات) وإظهارها في الصفحات الخاصة مع إمكانية التعليم كمقروء والإبطال التلقائي لاستعلامات React Query المتعلقة.【F:frontend/src/modules/notifications/NotificationCenter.tsx†L1-L200】【F:frontend/src/pages/admin/Website/NotificationsPage.tsx†L1-L112】

هذا المستند يوفّر خريطة مرجعية شاملة لفهم بنية الواجهة، كيفية إقلاعها، وكيفية ترابط الصفحات والمكونات مع الحزم الخارجية، مما يسهّل على المطورين الجدد أو فرق التكامل بدء العمل بثقة وسرعة.
