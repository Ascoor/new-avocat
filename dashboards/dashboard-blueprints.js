const DASHBOARD_BLUEPRINTS = {
  "growth": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة تحليلات النمو",
        "en": "Growth Analytics Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": {
        "ar": "نمو",
        "en": "G"
      },
      "name": {
        "ar": "مؤشرات النمو",
        "en": "Growth Metrics"
      },
      "tagline": {
        "ar": "لوحة قيادة الشركات الناشئة",
        "en": "Startup velocity cockpit"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-indigo-950 to-fuchsia-900",
        "sidebarGradient": "from-slate-950 via-indigo-900 to-fuchsia-900",
        "cardBg": "bg-slate-900/70 backdrop-blur-xl",
        "cardBorder": "border-indigo-500/40",
        "accentGradient": "from-sky-500 via-indigo-500 to-fuchsia-500",
        "accentText": "text-indigo-300",
        "highlightBg": "bg-indigo-500/15 border-indigo-500/40",
        "badgeBg": "bg-indigo-500/20",
        "badgeText": "text-white",
        "navActive": "border border-indigo-400/60 bg-indigo-500/15",
        "navIconBg": "bg-indigo-950/50",
        "navBadgeText": "text-indigo-200",
        "listBorder": "border border-indigo-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-indigo-500/10",
        "timelineChip": "bg-indigo-500/10 text-indigo-200",
        "tableHeaderBg": "bg-indigo-500/10",
        "cardShadow": "shadow-[0_38px_120px_-54px_rgba(79,70,229,0.8)]"
      },
      "light": {
        "bodyGradient": "from-indigo-50 via-white to-sky-100",
        "sidebarGradient": "from-white via-sky-50 to-indigo-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-indigo-200",
        "accentGradient": "from-indigo-400 via-sky-400 to-fuchsia-400",
        "accentText": "text-indigo-600",
        "highlightBg": "bg-indigo-500/10 border-indigo-200/70",
        "badgeBg": "bg-indigo-200/60",
        "badgeText": "text-indigo-800",
        "navActive": "border border-indigo-200 bg-indigo-500/10",
        "navIconBg": "bg-indigo-100",
        "navBadgeText": "text-indigo-600",
        "listBorder": "border border-indigo-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-indigo-100",
        "timelineChip": "bg-indigo-100 text-indigo-700",
        "tableHeaderBg": "bg-indigo-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(37,99,235,0.45)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "chart-bar",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "مباشر",
          "en": "Live"
        }
      },
      {
        "id": "acquisition",
        "icon": "cursor-arrow",
        "label": {
          "ar": "الاكتساب",
          "en": "Acquisition"
        },
        "badge": {
          "ar": "قنوات",
          "en": "Channels"
        }
      },
      {
        "id": "activation",
        "icon": "sparkles",
        "label": {
          "ar": "التفعيل",
          "en": "Activation"
        },
        "badge": {
          "ar": "رحلة",
          "en": "Journey"
        }
      },
      {
        "id": "retention",
        "icon": "heart",
        "label": {
          "ar": "الاحتفاظ",
          "en": "Retention"
        },
        "badge": {
          "ar": "تحسن",
          "en": "Improving"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "نمو ربع سنوي",
        "en": "Quarterly growth"
      },
      "value": "+32%",
      "description": {
        "ar": "الحملات المخصصة رفعت التسجيلات وتحويلات القنوات المدفوعة.",
        "en": "Personalised campaigns boosted signups and paid channel conversions."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة قيادة النمو",
        "en": "Growth leadership cockpit"
      },
      "subtitle": {
        "ar": "تابع رحلة المستخدم من أول نقرة حتى الربحية مع تنبيهات لحظية حول الفرص الذهبية.",
        "en": "Follow the user journey from first click to profitability with instant alerts on breakout opportunities."
      },
      "primary": {
        "ar": "تصدير الرؤى",
        "en": "Export insights"
      },
      "secondary": {
        "ar": "مشاركة الرابط",
        "en": "Share link"
      }
    },
    "stats": [
      {
        "icon": "sparkles",
        "label": {
          "ar": "معدل التفعيل",
          "en": "Activation rate"
        },
        "value": "68%",
        "delta": {
          "ar": "+٧ نقاط خلال ٣٠ يوماً",
          "en": "+7 pts in 30 days"
        },
        "trend": "positive"
      },
      {
        "icon": "users",
        "label": {
          "ar": "العملاء النشطون",
          "en": "Active customers"
        },
        "value": "48,210",
        "delta": {
          "ar": "+١١٪ نمو سنوي",
          "en": "+11% year over year"
        },
        "trend": "positive"
      },
      {
        "icon": "chart-bar",
        "label": {
          "ar": "متوسط الإيراد لكل حساب",
          "en": "Average revenue per account"
        },
        "value": "$82",
        "delta": {
          "ar": "+٥ دولارات بعد التعديل السعري",
          "en": "+$5 post pricing refresh"
        },
        "trend": "positive"
      },
      {
        "icon": "heart",
        "label": {
          "ar": "معدل الاحتفاظ الشهري",
          "en": "Monthly retention rate"
        },
        "value": "92%",
        "delta": {
          "ar": "+٣٪ بفضل برامج النجاح",
          "en": "+3% with success programs"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "النمو الأسبوعي للأرباح المتكررة",
          "en": "Weekly recurring revenue slope"
        },
        "subtitle": {
          "ar": "مقارنة الأداء عبر القنوات المدفوعة والعضوية وتوقعات الأسبوع المقبل.",
          "en": "Stacked view of paid versus organic momentum with a projection for next week."
        },
        "action": {
          "ar": "تحميل ملف CSV",
          "en": "Download CSV"
        },
        "placeholder": {
          "ar": "مخطط نمو تفاعلي",
          "en": "Interactive growth chart"
        }
      },
      {
        "id": "product-fit",
        "type": "matrix",
        "title": {
          "ar": "ملاءمة المنتج عبر القطاعات",
          "en": "Product fit by segment"
        },
        "action": {
          "ar": "تحديث قبل ٣ دقائق",
          "en": "Refreshed 3 minutes ago"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "الشركات الناشئة",
              "en": "Startups"
            },
            "value": {
              "ar": "89%",
              "en": "89%"
            },
            "caption": {
              "ar": "نقاط التركيز: الإعداد الذكي",
              "en": "Focus: faster onboarding"
            },
            "badge": {
              "ar": "رائد",
              "en": "Leader"
            },
            "emphasis": true
          },
          {
            "title": {
              "ar": "القطاع المالي",
              "en": "Fintech"
            },
            "value": {
              "ar": "74%",
              "en": "74%"
            },
            "caption": {
              "ar": "نحتاج إلى دورات موافقات أعمق",
              "en": "Requires deeper approval loops"
            }
          },
          {
            "title": {
              "ar": "فرق المبيعات",
              "en": "Sales teams"
            },
            "value": {
              "ar": "63%",
              "en": "63%"
            },
            "caption": {
              "ar": "حملة التدريب قيد التنفيذ",
              "en": "Enablement campaign in motion"
            }
          },
          {
            "title": {
              "ar": "الأسواق الناشئة",
              "en": "Emerging markets"
            },
            "value": {
              "ar": "58%",
              "en": "58%"
            },
            "caption": {
              "ar": "إطلاق تجربة تسعير محلية",
              "en": "Local pricing test launching"
            }
          }
        ]
      },
      {
        "id": "north-star",
        "type": "spotlight",
        "kicker": {
          "ar": "هدف الشهر",
          "en": "Monthly focus"
        },
        "metric": {
          "ar": "1500 عميل وفريق منضم",
          "en": "1,500 teams onboarded"
        },
        "description": {
          "ar": "إعادة تصميم رحلة التفعيل اختصرت زمن القيمة الأولية إلى أقل من ٥ دقائق.",
          "en": "The redesigned activation path brings time-to-value under five minutes."
        },
        "bullets": [
          {
            "value": "38%",
            "title": {
              "ar": "تجارب تحسّن التحويل",
              "en": "Conversion uplift"
            },
            "subtitle": {
              "ar": "٣ تجارب ناجحة هذا الأسبوع",
              "en": "3 winning experiments this week"
            }
          },
          {
            "value": "24%",
            "title": {
              "ar": "زيادة الإحالة",
              "en": "Referral increase"
            },
            "subtitle": {
              "ar": "برامج الدعوات الجديدة",
              "en": "New invite programs"
            }
          },
          {
            "value": "7.2",
            "title": {
              "ar": "صافي نقاط الترويج",
              "en": "Net promoter score"
            },
            "subtitle": {
              "ar": "تحسّن ١.٤ نقطة",
              "en": "Up 1.4 points"
            }
          }
        ]
      },
      {
        "id": "milestones",
        "type": "timeline",
        "span": "xl:col-span-2",
        "title": {
          "ar": "أحداث الأسبوع الرئيسية",
          "en": "Key wins this week"
        },
        "items": [
          {
            "icon": "sparkles",
            "title": {
              "ar": "إطلاق مسار تجربة أسرع",
              "en": "Fast-track trial journey live"
            },
            "subtitle": {
              "ar": "يخفض معدل التراجع ١٨٪",
              "en": "Drops bounce rate by 18%"
            },
            "time": {
              "ar": "قبل ساعتين",
              "en": "2 hours ago"
            }
          },
          {
            "icon": "users",
            "title": {
              "ar": "توقيع شراكة نظام تعليم",
              "en": "Signed EDU platform partnership"
            },
            "subtitle": {
              "ar": "يضيف ٢٣٠٠ حساباً مؤسسياً",
              "en": "Adds 2,300 institutional accounts"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "icon": "chart-bar",
            "title": {
              "ar": "تحقيق هدف الإيراد الربع سنوي",
              "en": "Quarterly revenue target achieved"
            },
            "subtitle": {
              "ar": "١٠ أيام قبل الموعد",
              "en": "10 days ahead of plan"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          }
        ]
      }
    ],
    "id": "growth",
    "slug": "dashboard-1.html",
    "layout": {
      "shell": "bg-slate-950/20",
      "main": "space-y-12 bg-gradient-to-b from-slate-950/40 via-transparent to-slate-900/20",
      "stats": "md:grid-cols-2 xl:grid-cols-4",
      "panels": "xl:grid-cols-[2.1fr_1.2fr] gap-y-8"
    },
    "gallery": {
      "badge": {
        "ar": "النمو المتسارع",
        "en": "Hyper growth"
      },
      "title": {
        "ar": "قيادة رحلة النمو",
        "en": "Leading the growth journey"
      },
      "description": {
        "ar": "تصور متدرج لمسار الاكتساب والاحتفاظ يبرز الفرص الجديدة والنتائج المباشرة.",
        "en": "Layered acquisition-to-retention story surfacing live opportunities and compounding wins."
      },
      "tags": [
        {
          "ar": "تحليلات",
          "en": "Analytics"
        },
        {
          "ar": "منتج",
          "en": "Product"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "progress",
        "title": {
          "ar": "مسار التحويل",
          "en": "Conversion path"
        },
        "items": [
          {
            "label": {
              "ar": "زيارة الصفحة",
              "en": "Landing visit"
            },
            "value": "85%",
            "percent": "85%"
          },
          {
            "label": {
              "ar": "تجربة مجانية",
              "en": "Trial start"
            },
            "value": "46%",
            "percent": "46%"
          },
          {
            "label": {
              "ar": "اشتراك مدفوع",
              "en": "Paid plan"
            },
            "value": "27%",
            "percent": "27%"
          }
        ]
      },
      {
        "type": "callout",
        "title": {
          "ar": "تجربة توصيات الذكاء الاصطناعي",
          "en": "AI recommendations test"
        },
        "message": {
          "ar": "اطلق التجربة على ٨٪ من الزوار الجدد وقارن محركات التخصيص قبل نشر التغييرات بالكامل.",
          "en": "Roll the experiment to 8% of new visitors and compare personalization engines before a full release."
        },
        "actions": [
          {
            "label": {
              "ar": "جدولة مراجعة",
              "en": "Schedule review"
            },
            "style": "secondary"
          },
          {
            "label": {
              "ar": "نشر كامل",
              "en": "Ship globally"
            },
            "style": "primary"
          }
        ]
      }
    ]
  },
  "portfolio": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة إدارة المشاريع",
        "en": "Project Portfolio Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "P",
      "name": {
        "ar": "تحكم المشاريع",
        "en": "Project Pulse"
      },
      "tagline": {
        "ar": "متابعة التسليم متعدد الفرق",
        "en": "Multi-team delivery monitor"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-emerald-950 to-cyan-900",
        "sidebarGradient": "from-slate-950 via-teal-900 to-cyan-900",
        "cardBg": "bg-slate-900/65 backdrop-blur-xl",
        "cardBorder": "border-emerald-500/35",
        "accentGradient": "from-emerald-400 via-cyan-400 to-teal-400",
        "accentText": "text-cyan-200",
        "highlightBg": "bg-emerald-500/15 border-emerald-500/35",
        "badgeBg": "bg-emerald-500/20",
        "badgeText": "text-white",
        "navActive": "border border-emerald-400/50 bg-emerald-500/15",
        "navIconBg": "bg-teal-950/50",
        "navBadgeText": "text-emerald-200",
        "listBorder": "border border-cyan-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-cyan-500/10",
        "timelineChip": "bg-cyan-500/10 text-cyan-200",
        "tableHeaderBg": "bg-cyan-500/10",
        "cardShadow": "shadow-[0_34px_110px_-52px_rgba(16,185,129,0.7)]"
      },
      "light": {
        "bodyGradient": "from-teal-50 via-white to-emerald-50",
        "sidebarGradient": "from-white via-teal-50 to-emerald-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-teal-200",
        "accentGradient": "from-teal-400 via-emerald-400 to-cyan-400",
        "accentText": "text-cyan-600",
        "highlightBg": "bg-emerald-500/10 border-emerald-200/60",
        "badgeBg": "bg-emerald-200/60",
        "badgeText": "text-emerald-900",
        "navActive": "border border-emerald-200 bg-emerald-500/10",
        "navIconBg": "bg-teal-100",
        "navBadgeText": "text-emerald-600",
        "listBorder": "border border-cyan-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-cyan-100",
        "timelineChip": "bg-cyan-100 text-cyan-700",
        "tableHeaderBg": "bg-cyan-50/80",
        "cardShadow": "shadow-[0_32px_90px_-55px_rgba(16,185,129,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "presentation-chart",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "حالي",
          "en": "Current"
        }
      },
      {
        "id": "roadmap",
        "icon": "map",
        "label": {
          "ar": "خارطة الطريق",
          "en": "Roadmap"
        }
      },
      {
        "id": "resources",
        "icon": "users",
        "label": {
          "ar": "إدارة الموارد",
          "en": "Resource management"
        }
      },
      {
        "id": "risks",
        "icon": "shield",
        "label": {
          "ar": "المخاطر",
          "en": "Risks"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "إنجاز الربع",
        "en": "Quarter delivery"
      },
      "value": "78%",
      "description": {
        "ar": "ثلاث مبادرات استراتيجية تسير وفق الخطة الزمنية.",
        "en": "Three strategic initiatives remain on schedule."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة إدارة المحفظة",
        "en": "Portfolio control center"
      },
      "subtitle": {
        "ar": "تابع استقرار البرامج الإستراتيجية، استخدام السعة، ومسار التصعيد في شاشة واحدة.",
        "en": "Track strategic program stability, capacity usage, and escalation paths from one workspace."
      },
      "primary": {
        "ar": "إنشاء تقرير",
        "en": "Generate report"
      },
      "secondary": {
        "ar": "تعيين مسؤول",
        "en": "Assign owner"
      }
    },
    "stats": [
      {
        "icon": "folder",
        "label": {
          "ar": "مشاريع جارية",
          "en": "Active projects"
        },
        "value": "18",
        "delta": {
          "ar": "+3 مبادرات جديدة هذا الربع",
          "en": "+3 new initiatives this quarter"
        },
        "trend": "positive"
      },
      {
        "icon": "chart-bar",
        "label": {
          "ar": "الالتزام بالموعد",
          "en": "On-time delivery"
        },
        "value": "86%",
        "delta": {
          "ar": "+4% تحسن عن الشهر الماضي",
          "en": "+4% improvement vs last month"
        },
        "trend": "positive"
      },
      {
        "icon": "users",
        "label": {
          "ar": "استخدام الفرق",
          "en": "Team utilisation"
        },
        "value": "74%",
        "delta": {
          "ar": "+6% توزيع أفضل للقدرات",
          "en": "+6% better allocation of capacity"
        },
        "trend": "positive"
      },
      {
        "icon": "shield",
        "label": {
          "ar": "مخاطر مفتوحة",
          "en": "Open risks"
        },
        "value": "5",
        "delta": {
          "ar": "تمت معالجة خطرين هذا الأسبوع",
          "en": "Mitigated two risks this week"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "roadmap-board",
        "type": "kanban",
        "title": {
          "ar": "لوحة تقدم المحفظة",
          "en": "Portfolio flow board"
        },
        "action": {
          "ar": "تحديث قبل ٤ دقائق",
          "en": "Synced 4 minutes ago"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "الاكتشاف",
              "en": "Discovery"
            },
            "count": "3",
            "cards": [
              {
                "title": {
                  "ar": "دمج نظام الشراكات",
                  "en": "Partner ecosystem integration"
                },
                "subtitle": {
                  "ar": "تحليل الأثر جاهز",
                  "en": "Impact brief ready"
                },
                "tags": [
                  {
                    "ar": "الربع ٣",
                    "en": "Q3"
                  }
                ]
              },
              {
                "title": {
                  "ar": "بوابة الموردين",
                  "en": "Supplier gateway"
                },
                "subtitle": {
                  "ar": "جلسة تصميم الخميس",
                  "en": "Design jam Thursday"
                }
              }
            ]
          },
          {
            "title": {
              "ar": "قيد البناء",
              "en": "In build"
            },
            "count": "4",
            "cards": [
              {
                "title": {
                  "ar": "منصة بيانات المنتجات",
                  "en": "Product data platform"
                },
                "subtitle": {
                  "ar": "مرحلة تطوير Sprint 18",
                  "en": "Sprint 18 build"
                },
                "tags": [
                  {
                    "ar": "هندسة",
                    "en": "Engineering"
                  }
                ]
              },
              {
                "title": {
                  "ar": "تجربة العملاء العالمية",
                  "en": "Global CX revamp"
                },
                "subtitle": {
                  "ar": "اختبار قبول المستخدم",
                  "en": "UAT in flight"
                },
                "tags": [
                  {
                    "ar": "تجربة",
                    "en": "Experience"
                  }
                ]
              }
            ]
          },
          {
            "title": {
              "ar": "الإطلاق",
              "en": "Launch"
            },
            "count": "2",
            "cards": [
              {
                "title": {
                  "ar": "تطبيق الهاتف للميدان",
                  "en": "Field mobile app"
                },
                "subtitle": {
                  "ar": "حملة تواصل تبدأ غداً",
                  "en": "Comms live tomorrow"
                },
                "tags": [
                  {
                    "ar": "جاهز",
                    "en": "Go live"
                  }
                ]
              },
              {
                "title": {
                  "ar": "واجهة الإدارة التنفيذية",
                  "en": "Executive command suite"
                },
                "subtitle": {
                  "ar": "تدريب القيادة الاثنين",
                  "en": "Exec enablement Monday"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "portfolio-health",
        "type": "spotlight",
        "kicker": {
          "ar": "صحة البرامج",
          "en": "Program health"
        },
        "metric": {
          "ar": "92٪ جاهزية إطلاق",
          "en": "92% launch-ready"
        },
        "description": {
          "ar": "حزم المواءمة الأخيرة تغطي فرق الامتثال والتشغيل قبل الإطلاق الربع سنوي.",
          "en": "Final alignment sprints cover compliance and operations squads ahead of quarterly launch."
        },
        "bullets": [
          {
            "value": "14",
            "title": {
              "ar": "المخاطر المفتوحة",
              "en": "Open risks"
            },
            "subtitle": {
              "ar": "٢ منها مرتفعة",
              "en": "2 high severity"
            }
          },
          {
            "value": "86%",
            "title": {
              "ar": "استخدام الموارد",
              "en": "Resource utilisation"
            },
            "subtitle": {
              "ar": "مدار ضمن الهدف",
              "en": "Within target bands"
            }
          },
          {
            "value": "7",
            "title": {
              "ar": "الإنجازات",
              "en": "Milestones"
            },
            "subtitle": {
              "ar": "تم التسليم هذا الأسبوع",
              "en": "Delivered this week"
            }
          }
        ]
      },
      {
        "id": "team-capacity",
        "type": "matrix",
        "title": {
          "ar": "سعة الفرق الأساسية",
          "en": "Core squad capacity"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "Squad Atlas",
              "en": "Squad Atlas"
            },
            "value": {
              "ar": "82%",
              "en": "82%"
            },
            "caption": {
              "ar": "تحول إلى دعم إضافي 15%",
              "en": "Allocating 15% support rotation"
            },
            "badge": {
              "ar": "مستقر",
              "en": "Steady"
            }
          },
          {
            "title": {
              "ar": "Delta Ops",
              "en": "Delta Ops"
            },
            "value": {
              "ar": "68%",
              "en": "68%"
            },
            "caption": {
              "ar": "قيد توظيف مهندس أمن",
              "en": "Security engineer hiring"
            }
          },
          {
            "title": {
              "ar": "Launch Lab",
              "en": "Launch Lab"
            },
            "value": {
              "ar": "94%",
              "en": "94%"
            },
            "caption": {
              "ar": "مستوى تكدس مرتفع للأسبوع القادم",
              "en": "Peak load next week"
            },
            "emphasis": true
          },
          {
            "title": {
              "ar": "Fusion CX",
              "en": "Fusion CX"
            },
            "value": {
              "ar": "71%",
              "en": "71%"
            },
            "caption": {
              "ar": "خطة تدريب محتوى قادمة",
              "en": "Content training scheduled"
            }
          }
        ]
      },
      {
        "id": "ceremonies",
        "type": "schedule",
        "title": {
          "ar": "مواعيد رئيسية",
          "en": "Key ceremonies"
        },
        "action": {
          "ar": "مزامنة مع تقويم PMO",
          "en": "Sync to PMO calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "استعراض خارطة الطريق",
              "en": "Roadmap review"
            },
            "subtitle": {
              "ar": "مع فرق المنتج",
              "en": "With product leads"
            },
            "time": {
              "ar": "الأربعاء 14:00",
              "en": "Wed 14:00"
            }
          },
          {
            "title": {
              "ar": "جلسة المخاطر",
              "en": "Risk mitigation standup"
            },
            "subtitle": {
              "ar": "تشارك فرق الامتثال",
              "en": "Compliance co-lead"
            },
            "time": {
              "ar": "الخميس 09:30",
              "en": "Thu 09:30"
            }
          },
          {
            "title": {
              "ar": "مختبر الدروس المستفادة",
              "en": "Retrospective lab"
            },
            "subtitle": {
              "ar": "التركيز على الإطلاقات الأخيرة",
              "en": "Focus on recent launches"
            },
            "time": {
              "ar": "الجمعة 15:15",
              "en": "Fri 15:15"
            }
          }
        ]
      }
    ],
    "id": "portfolio",
    "slug": "dashboard-2.html",
    "layout": {
      "shell": "bg-slate-950/10",
      "main": "space-y-14 lg:px-16",
      "stats": "sm:grid-cols-2 xl:grid-cols-4 gap-5",
      "panels": "xl:grid-cols-[1.55fr_1fr] gap-y-10"
    },
    "gallery": {
      "badge": {
        "ar": "حوكمة المشاريع",
        "en": "Program PMO"
      },
      "title": {
        "ar": "إدارة محفظة البرامج بدقة",
        "en": "Orchestrate the program portfolio"
      },
      "description": {
        "ar": "تنسيق متدرج لحالة المشاريع، القدرات، والمخاطر يمنح فرق PMO رؤية فورية.",
        "en": "Layered PMO cockpit aligning project health, capacity, and risk posture instantly."
      },
      "tags": [
        {
          "ar": "مشاريع",
          "en": "Projects"
        },
        {
          "ar": "حوكمة",
          "en": "Governance"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "نقاط المتابعة",
          "en": "Follow-up queue"
        },
        "items": [
          {
            "label": {
              "ar": "اجتماع توجيهي",
              "en": "Steering sync"
            },
            "value": {
              "ar": "الثلاثاء 10:00",
              "en": "Tue 10:00"
            }
          },
          {
            "label": {
              "ar": "تصعيد مورد",
              "en": "Resource escalation"
            },
            "value": {
              "ar": "قيد المراجعة",
              "en": "In review"
            }
          },
          {
            "label": {
              "ar": "ميزانية Q3",
              "en": "Q3 budget"
            },
            "value": {
              "ar": "متوقع 12.4M",
              "en": "$12.4M pending"
            }
          }
        ]
      },
      {
        "type": "progress",
        "title": {
          "ar": "جاهزية الإطلاق",
          "en": "Launch readiness"
        },
        "items": [
          {
            "label": {
              "ar": "التصميم",
              "en": "Design"
            },
            "value": "92%",
            "percent": "92%"
          },
          {
            "label": {
              "ar": "الهندسة",
              "en": "Engineering"
            },
            "value": "78%",
            "percent": "78%"
          },
          {
            "label": {
              "ar": "التمكين",
              "en": "Enablement"
            },
            "value": "63%",
            "percent": "63%"
          }
        ]
      }
    ]
  },
  "commerce": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة تجارة إلكترونية",
        "en": "E-commerce Intelligence Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "E",
      "name": {
        "ar": "نبض التجارة",
        "en": "Commerce Pulse"
      },
      "tagline": {
        "ar": "تحليلات المبيعات وتجربة العملاء",
        "en": "Sales and experience analytics"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-amber-950 to-emerald-900",
        "sidebarGradient": "from-slate-950 via-amber-900 to-emerald-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-amber-500/35",
        "accentGradient": "from-amber-400 via-emerald-400 to-lime-400",
        "accentText": "text-amber-200",
        "highlightBg": "bg-amber-500/15 border-amber-500/35",
        "badgeBg": "bg-amber-500/20",
        "badgeText": "text-white",
        "navActive": "border border-amber-400/50 bg-amber-500/15",
        "navIconBg": "bg-emerald-950/40",
        "navBadgeText": "text-amber-200",
        "listBorder": "border border-amber-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-amber-500/10",
        "timelineChip": "bg-amber-500/10 text-amber-200",
        "tableHeaderBg": "bg-amber-500/10",
        "cardShadow": "shadow-[0_34px_110px_-54px_rgba(217,119,6,0.7)]"
      },
      "light": {
        "bodyGradient": "from-amber-50 via-white to-emerald-50",
        "sidebarGradient": "from-white via-amber-50 to-emerald-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-amber-200",
        "accentGradient": "from-amber-400 via-emerald-400 to-lime-400",
        "accentText": "text-amber-600",
        "highlightBg": "bg-amber-500/10 border-amber-200/60",
        "badgeBg": "bg-amber-200/60",
        "badgeText": "text-amber-900",
        "navActive": "border border-amber-200 bg-amber-500/10",
        "navIconBg": "bg-amber-100",
        "navBadgeText": "text-amber-700",
        "listBorder": "border border-amber-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-amber-100",
        "timelineChip": "bg-amber-100 text-amber-700",
        "tableHeaderBg": "bg-amber-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(217,119,6,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "shopping-bag",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "موسمي",
          "en": "Seasonal"
        }
      },
      {
        "id": "sales",
        "icon": "chart-bar",
        "label": {
          "ar": "المبيعات",
          "en": "Sales"
        }
      },
      {
        "id": "marketing",
        "icon": "megaphone",
        "label": {
          "ar": "التسويق",
          "en": "Marketing"
        }
      },
      {
        "id": "fulfilment",
        "icon": "truck",
        "label": {
          "ar": "التنفيذ والشحن",
          "en": "Fulfilment & shipping"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "إيرادات اليوم",
        "en": "Today’s revenue"
      },
      "value": "$482K",
      "description": {
        "ar": "حملة الإطلاق الصيفية رفعت متوسط قيمة السلة 18%.",
        "en": "Summer launch campaign lifted average order value by 18%."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة تجارة إلكترونية",
        "en": "E-commerce performance hub"
      },
      "subtitle": {
        "ar": "راقب المبيعات وسلوك العملاء والعمليات اللوجستية لحظياً.",
        "en": "Monitor revenue, customer behaviour, and fulfilment in real time."
      },
      "primary": {
        "ar": "تصدير تقرير الإيرادات",
        "en": "Export revenue report"
      },
      "secondary": {
        "ar": "إدارة حملات العروض",
        "en": "Manage promo campaigns"
      }
    },
    "stats": [
      {
        "icon": "shopping-bag",
        "label": {
          "ar": "قيمة المبيعات اليومية",
          "en": "Daily sales value"
        },
        "value": "$482K",
        "delta": {
          "ar": "+14% مقارنة بالأسبوع الماضي",
          "en": "+14% vs previous week"
        },
        "trend": "positive"
      },
      {
        "icon": "cursor-arrow",
        "label": {
          "ar": "نسبة التحويل",
          "en": "Conversion rate"
        },
        "value": "3.9%",
        "delta": {
          "ar": "+0.6 نقطة عن المتوسط",
          "en": "+0.6 pts above average"
        },
        "trend": "positive"
      },
      {
        "icon": "heart",
        "label": {
          "ar": "متوسط قيمة السلة",
          "en": "Average order value"
        },
        "value": "$126",
        "delta": {
          "ar": "+18% بعد الحملات",
          "en": "+18% after campaigns"
        },
        "trend": "positive"
      },
      {
        "icon": "truck",
        "label": {
          "ar": "طلبات جاهزة للشحن",
          "en": "Orders ready to ship"
        },
        "value": "1,280",
        "delta": {
          "ar": "تم تسليم 92% خلال 24 ساعة",
          "en": "92% delivered within 24h"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "$482K قيمة المبيعات اليومية",
          "en": "$482K Daily sales value"
        },
        "description": {
          "ar": "راقب المبيعات وسلوك العملاء والعمليات اللوجستية لحظياً.",
          "en": "Monitor revenue, customer behaviour, and fulfilment in real time."
        },
        "bullets": [
          {
            "value": "3.9%",
            "title": {
              "ar": "نسبة التحويل",
              "en": "Conversion rate"
            },
            "subtitle": {
              "ar": "+0.6 نقطة عن المتوسط",
              "en": "+0.6 pts above average"
            }
          },
          {
            "value": "$126",
            "title": {
              "ar": "متوسط قيمة السلة",
              "en": "Average order value"
            },
            "subtitle": {
              "ar": "+18% بعد الحملات",
              "en": "+18% after campaigns"
            }
          },
          {
            "value": "1,280",
            "title": {
              "ar": "طلبات جاهزة للشحن",
              "en": "Orders ready to ship"
            },
            "subtitle": {
              "ar": "تم تسليم 92% خلال 24 ساعة",
              "en": "92% delivered within 24h"
            }
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "قيمة المبيعات اليومية",
              "en": "Daily sales value"
            },
            "value": {
              "ar": "$482K",
              "en": "$482K"
            },
            "caption": {
              "ar": "+14% مقارنة بالأسبوع الماضي",
              "en": "+14% vs previous week"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "نسبة التحويل",
              "en": "Conversion rate"
            },
            "value": {
              "ar": "3.9%",
              "en": "3.9%"
            },
            "caption": {
              "ar": "+0.6 نقطة عن المتوسط",
              "en": "+0.6 pts above average"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "متوسط قيمة السلة",
              "en": "Average order value"
            },
            "value": {
              "ar": "$126",
              "en": "$126"
            },
            "caption": {
              "ar": "+18% بعد الحملات",
              "en": "+18% after campaigns"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "طلبات جاهزة للشحن",
              "en": "Orders ready to ship"
            },
            "value": {
              "ar": "1,280",
              "en": "1,280"
            },
            "caption": {
              "ar": "تم تسليم 92% خلال 24 ساعة",
              "en": "92% delivered within 24h"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "إطلاق حملة العطلات",
              "en": "Holiday campaign launch"
            },
            "subtitle": {
              "ar": "تم تخصيص عروض للمشتركين المخلصين",
              "en": "Loyal subscribers receive tailored bundles"
            },
            "time": {
              "ar": "قبل ساعة",
              "en": "1 hour ago"
            }
          },
          {
            "title": {
              "ar": "مركز توزيع جديد",
              "en": "New fulfilment hub"
            },
            "subtitle": {
              "ar": "تقليل أوقات الشحن للمنطقة الغربية",
              "en": "Shorter lead times for western region"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "تقييمات خدمة مميزة",
              "en": "Service ratings highlight"
            },
            "subtitle": {
              "ar": "متوسط رضا العملاء 4.7/5",
              "en": "Customer satisfaction averages 4.7/5"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "منحنى الإيرادات",
          "en": "Revenue curve"
        },
        "subtitle": {
          "ar": "تدفق الطلبات والإيرادات الإجمالية خلال 14 يوماً.",
          "en": "Order flow and gross revenue across 14 days."
        },
        "action": {
          "ar": "عرض حسب القناة",
          "en": "Segment by channel"
        },
        "placeholder": {
          "ar": "مخطط الإيرادات",
          "en": "Revenue chart"
        }
      },
      {
        "id": "products",
        "type": "list",
        "title": {
          "ar": "المنتجات الأعلى أداءً",
          "en": "Top performing products"
        },
        "action": {
          "ar": "تحديث تلقائي",
          "en": "Auto-updating"
        },
        "items": [
          {
            "icon": "sparkles",
            "title": {
              "ar": "حزمة العناية بالبشرة",
              "en": "Skincare essentials kit"
            },
            "subtitle": {
              "ar": "متوسط تقييم 4.8",
              "en": "Average rating 4.8"
            },
            "value": "$96K",
            "delta": {
              "ar": "+22% عائد يومي",
              "en": "+22% daily revenue"
            }
          },
          {
            "icon": "shopping-bag",
            "title": {
              "ar": "حذاء رياضي ذكي",
              "en": "Smart running shoe"
            },
            "subtitle": {
              "ar": "مخزون كافٍ لـ 12 يوماً",
              "en": "Stock cover for 12 days"
            },
            "value": "$72K",
            "delta": {
              "ar": "+8% عائد",
              "en": "+8% revenue"
            }
          },
          {
            "icon": "heart",
            "title": {
              "ar": "اشتراك عضوية VIP",
              "en": "VIP membership subscription"
            },
            "subtitle": {
              "ar": "زيادة معدل التجديد 11%",
              "en": "Renewal rate up 11%"
            },
            "value": "$58K",
            "delta": {
              "ar": "+3% عائد متكرر",
              "en": "+3% recurring"
            }
          }
        ]
      }
    ],
    "id": "commerce",
    "slug": "dashboard-3.html",
    "layout": {
      "shell": "bg-slate-950/15",
      "main": "space-y-12 lg:px-14",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.4fr_1fr] gap-y-8"
    },
    "gallery": {
      "badge": {
        "ar": "تحليلات التجارة",
        "en": "Commerce intelligence"
      },
      "title": {
        "ar": "ضبط رحلات الشراء",
        "en": "Tune the purchase journeys"
      },
      "description": {
        "ar": "تتبع فوري لتدفقات المبيعات، حالة المخزون، وسلوك العملاء عبر القنوات.",
        "en": "Realtime insight into sales streams, inventory posture, and shopper behaviour across every channel."
      },
      "tags": [
        {
          "ar": "تجارة إلكترونية",
          "en": "E-commerce"
        },
        {
          "ar": "سلاسل الإمداد",
          "en": "Supply"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "قيمة المبيعات اليومية",
              "en": "Daily sales value"
            },
            "value": {
              "ar": "$482K",
              "en": "$482K"
            }
          },
          {
            "label": {
              "ar": "نسبة التحويل",
              "en": "Conversion rate"
            },
            "value": {
              "ar": "3.9%",
              "en": "3.9%"
            }
          },
          {
            "label": {
              "ar": "متوسط قيمة السلة",
              "en": "Average order value"
            },
            "value": {
              "ar": "$126",
              "en": "$126"
            }
          }
        ]
      }
    ]
  },
  "cloud": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة البنية السحابية",
        "en": "Cloud Infrastructure Control Panel"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "C",
      "name": {
        "ar": "مرصد السحابة",
        "en": "Cloud Atlas"
      },
      "tagline": {
        "ar": "مراقبة الصحة والأداء والتكاليف",
        "en": "Health, performance, and cost monitoring"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-sky-950 to-cyan-900",
        "sidebarGradient": "from-slate-950 via-sky-900 to-indigo-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-sky-500/35",
        "accentGradient": "from-sky-400 via-cyan-400 to-indigo-400",
        "accentText": "text-sky-200",
        "highlightBg": "bg-sky-500/15 border-sky-500/35",
        "badgeBg": "bg-sky-500/20",
        "badgeText": "text-white",
        "navActive": "border border-sky-400/50 bg-sky-500/15",
        "navIconBg": "bg-slate-900/60",
        "navBadgeText": "text-sky-200",
        "listBorder": "border border-sky-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-sky-500/10",
        "timelineChip": "bg-sky-500/10 text-sky-200",
        "tableHeaderBg": "bg-sky-500/10",
        "cardShadow": "shadow-[0_36px_110px_-54px_rgba(56,189,248,0.75)]"
      },
      "light": {
        "bodyGradient": "from-sky-50 via-white to-cyan-100",
        "sidebarGradient": "from-white via-sky-50 to-indigo-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-sky-200",
        "accentGradient": "from-sky-400 via-cyan-400 to-indigo-400",
        "accentText": "text-sky-600",
        "highlightBg": "bg-sky-500/10 border-sky-200/60",
        "badgeBg": "bg-sky-200/60",
        "badgeText": "text-sky-900",
        "navActive": "border border-sky-200 bg-sky-500/10",
        "navIconBg": "bg-sky-100",
        "navBadgeText": "text-sky-700",
        "listBorder": "border border-sky-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-sky-100",
        "timelineChip": "bg-sky-100 text-sky-700",
        "tableHeaderBg": "bg-sky-50/80",
        "cardShadow": "shadow-[0_32px_90px_-55px_rgba(56,189,248,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "cloud",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "مراقبة",
          "en": "Monitor"
        }
      },
      {
        "id": "health",
        "icon": "shield",
        "label": {
          "ar": "الصحة والأمان",
          "en": "Health & security"
        }
      },
      {
        "id": "capacity",
        "icon": "cube",
        "label": {
          "ar": "السعة والاستيعاب",
          "en": "Capacity"
        }
      },
      {
        "id": "costs",
        "icon": "bank",
        "label": {
          "ar": "التكاليف",
          "en": "Costs"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "حالة المنصة",
        "en": "Platform status"
      },
      "value": "99.98% SLA",
      "description": {
        "ar": "مناطق التوفر الثلاث تعمل دون حوادث خلال 27 يوماً.",
        "en": "All three availability zones running incident-free for 27 days."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة البنية السحابية",
        "en": "Cloud infrastructure dashboard"
      },
      "subtitle": {
        "ar": "تحليلات زمن الاستجابة، السعة، والإنفاق عبر البيئات.",
        "en": "Analyse latency, capacity, and spend across environments."
      },
      "primary": {
        "ar": "جدولة صيانة",
        "en": "Schedule maintenance"
      },
      "secondary": {
        "ar": "عرض توصيات التوفير",
        "en": "View savings plan"
      }
    },
    "stats": [
      {
        "icon": "cloud",
        "label": {
          "ar": "متوسط زمن الاستجابة",
          "en": "Average latency"
        },
        "value": "142ms",
        "delta": {
          "ar": "-18% مقارنة بالأسبوع الماضي",
          "en": "-18% vs last week"
        },
        "trend": "positive"
      },
      {
        "icon": "shield",
        "label": {
          "ar": "حوادث حرجة",
          "en": "Critical incidents"
        },
        "value": "2",
        "delta": {
          "ar": "تم إغلاق 5 خلال 48 ساعة",
          "en": "5 resolved within 48h"
        },
        "trend": "positive"
      },
      {
        "icon": "cube",
        "label": {
          "ar": "العُقد النشطة",
          "en": "Active nodes"
        },
        "value": "1,240",
        "delta": {
          "ar": "+7% توسع تلقائي",
          "en": "+7% autoscaling boost"
        },
        "trend": "positive"
      },
      {
        "icon": "bank",
        "label": {
          "ar": "تكلفة يومية",
          "en": "Daily spend"
        },
        "value": "$38K",
        "delta": {
          "ar": "-9% بفضل الخطة المحسّنة",
          "en": "-9% with optimized plan"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "142ms متوسط زمن الاستجابة",
          "en": "142ms Average latency"
        },
        "description": {
          "ar": "تحليلات زمن الاستجابة، السعة، والإنفاق عبر البيئات.",
          "en": "Analyse latency, capacity, and spend across environments."
        },
        "bullets": [
          {
            "value": "2",
            "title": {
              "ar": "حوادث حرجة",
              "en": "Critical incidents"
            },
            "subtitle": {
              "ar": "تم إغلاق 5 خلال 48 ساعة",
              "en": "5 resolved within 48h"
            }
          },
          {
            "value": "1,240",
            "title": {
              "ar": "العُقد النشطة",
              "en": "Active nodes"
            },
            "subtitle": {
              "ar": "+7% توسع تلقائي",
              "en": "+7% autoscaling boost"
            }
          },
          {
            "value": "$38K",
            "title": {
              "ar": "تكلفة يومية",
              "en": "Daily spend"
            },
            "subtitle": {
              "ar": "-9% بفضل الخطة المحسّنة",
              "en": "-9% with optimized plan"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "حوسبة المنطقة الشرقية",
                  "en": "East compute cluster"
                },
                "subtitle": {
                  "ar": "استخدام CPU 63%",
                  "en": "CPU utilisation 63%"
                },
                "tags": [
                  {
                    "ar": "تم تفعيل أولوية الأداء",
                    "en": "Performance priority enabled"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "مزارع التحليلات",
                  "en": "Analytics farms"
                },
                "subtitle": {
                  "ar": "ذاكرة فائضة 12%",
                  "en": "Memory headroom 12%"
                },
                "tags": [
                  {
                    "ar": "استهلاك ثابت",
                    "en": "Stable consumption"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "وحدة الأمان المُدارة",
                  "en": "Managed security edge"
                },
                "subtitle": {
                  "ar": "حجب 2.3M تهديد/يوم",
                  "en": "Blocking 2.3M threats/day"
                },
                "tags": [
                  {
                    "ar": "زيادة التدقيق",
                    "en": "Inspection increased"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "متوسط زمن الاستجابة",
              "en": "Average latency"
            },
            "value": {
              "ar": "142ms",
              "en": "142ms"
            },
            "caption": {
              "ar": "-18% مقارنة بالأسبوع الماضي",
              "en": "-18% vs last week"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "حوادث حرجة",
              "en": "Critical incidents"
            },
            "value": {
              "ar": "2",
              "en": "2"
            },
            "caption": {
              "ar": "تم إغلاق 5 خلال 48 ساعة",
              "en": "5 resolved within 48h"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "العُقد النشطة",
              "en": "Active nodes"
            },
            "value": {
              "ar": "1,240",
              "en": "1,240"
            },
            "caption": {
              "ar": "+7% توسع تلقائي",
              "en": "+7% autoscaling boost"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "تكلفة يومية",
              "en": "Daily spend"
            },
            "value": {
              "ar": "$38K",
              "en": "$38K"
            },
            "caption": {
              "ar": "-9% بفضل الخطة المحسّنة",
              "en": "-9% with optimized plan"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "مراقبة زمن الاستجابة",
          "en": "Latency monitor"
        },
        "subtitle": {
          "ar": "قياس عالمي بين المناطق الأساسية والخدمات الحرجة.",
          "en": "Global measurement across core regions and critical services."
        },
        "action": {
          "ar": "تفاصيل الخدمة",
          "en": "Service detail"
        },
        "placeholder": {
          "ar": "مخطط الاستجابة",
          "en": "Latency visual"
        }
      },
      {
        "id": "clusters",
        "type": "list",
        "title": {
          "ar": "أعلى مجموعات الحمل",
          "en": "Top load clusters"
        },
        "action": {
          "ar": "تحديث في آخر 2 دقيقة",
          "en": "Updated 2 minutes ago"
        },
        "items": [
          {
            "icon": "cloud",
            "title": {
              "ar": "حوسبة المنطقة الشرقية",
              "en": "East compute cluster"
            },
            "subtitle": {
              "ar": "استخدام CPU 63%",
              "en": "CPU utilisation 63%"
            },
            "value": "512 عقدة",
            "delta": {
              "ar": "تم تفعيل أولوية الأداء",
              "en": "Performance priority enabled"
            }
          },
          {
            "icon": "cube",
            "title": {
              "ar": "مزارع التحليلات",
              "en": "Analytics farms"
            },
            "subtitle": {
              "ar": "ذاكرة فائضة 12%",
              "en": "Memory headroom 12%"
            },
            "value": "386 عقدة",
            "delta": {
              "ar": "استهلاك ثابت",
              "en": "Stable consumption"
            }
          },
          {
            "icon": "shield",
            "title": {
              "ar": "وحدة الأمان المُدارة",
              "en": "Managed security edge"
            },
            "subtitle": {
              "ar": "حجب 2.3M تهديد/يوم",
              "en": "Blocking 2.3M threats/day"
            },
            "value": "كفاءة 98%",
            "delta": {
              "ar": "زيادة التدقيق",
              "en": "Inspection increased"
            }
          }
        ]
      }
    ],
    "id": "cloud",
    "slug": "dashboard-4.html",
    "layout": {
      "shell": "bg-slate-950/18",
      "main": "space-y-12 lg:px-15",
      "stats": "md:grid-cols-2 xl:grid-cols-5 gap-5",
      "panels": "xl:grid-cols-[1.6fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "مراقبة السحابة",
        "en": "Cloud observability"
      },
      "title": {
        "ar": "سطر أوامر متكامل للسحابة",
        "en": "Unified cloud control plane"
      },
      "description": {
        "ar": "مؤشرات توفر، تكلفة، وأداء وقتي عبر البيئات متعددة المناطق والبنية التحتية.",
        "en": "Realtime availability, cost, and performance telemetry across multi-region infrastructure."
      },
      "tags": [
        {
          "ar": "سحابة",
          "en": "Cloud"
        },
        {
          "ar": "مراقبة",
          "en": "Observability"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "متوسط زمن الاستجابة",
              "en": "Average latency"
            },
            "value": {
              "ar": "142ms",
              "en": "142ms"
            }
          },
          {
            "label": {
              "ar": "حوادث حرجة",
              "en": "Critical incidents"
            },
            "value": {
              "ar": "2",
              "en": "2"
            }
          },
          {
            "label": {
              "ar": "العُقد النشطة",
              "en": "Active nodes"
            },
            "value": {
              "ar": "1,240",
              "en": "1,240"
            }
          }
        ]
      }
    ]
  },
  "content": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة إدارة المحتوى",
        "en": "Content Operations Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "M",
      "name": {
        "ar": "إيقاع المحتوى",
        "en": "Content Rhythm"
      },
      "tagline": {
        "ar": "تخطيط النشر وتجربة القراء",
        "en": "Publishing cadence & reader experience"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-fuchsia-950 to-purple-900",
        "sidebarGradient": "from-slate-950 via-fuchsia-900 to-purple-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-fuchsia-500/35",
        "accentGradient": "from-fuchsia-400 via-purple-400 to-rose-400",
        "accentText": "text-violet-200",
        "highlightBg": "bg-fuchsia-500/15 border-fuchsia-500/35",
        "badgeBg": "bg-fuchsia-500/20",
        "badgeText": "text-white",
        "navActive": "border border-fuchsia-400/50 bg-fuchsia-500/15",
        "navIconBg": "bg-purple-950/50",
        "navBadgeText": "text-fuchsia-200",
        "listBorder": "border border-fuchsia-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-fuchsia-500/10",
        "timelineChip": "bg-fuchsia-500/10 text-fuchsia-200",
        "tableHeaderBg": "bg-fuchsia-500/10",
        "cardShadow": "shadow-[0_38px_120px_-54px_rgba(192,38,211,0.75)]"
      },
      "light": {
        "bodyGradient": "from-fuchsia-50 via-white to-purple-100",
        "sidebarGradient": "from-white via-fuchsia-50 to-purple-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-fuchsia-200",
        "accentGradient": "from-fuchsia-400 via-purple-400 to-rose-400",
        "accentText": "text-fuchsia-600",
        "highlightBg": "bg-fuchsia-500/10 border-fuchsia-200/60",
        "badgeBg": "bg-fuchsia-200/60",
        "badgeText": "text-fuchsia-900",
        "navActive": "border border-fuchsia-200 bg-fuchsia-500/10",
        "navIconBg": "bg-fuchsia-100",
        "navBadgeText": "text-fuchsia-700",
        "listBorder": "border border-fuchsia-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-fuchsia-100",
        "timelineChip": "bg-fuchsia-100 text-fuchsia-700",
        "tableHeaderBg": "bg-fuchsia-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(192,38,211,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "sparkles",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "تحرير",
          "en": "Editorial"
        }
      },
      {
        "id": "calendar",
        "icon": "calendar",
        "label": {
          "ar": "الجدول التحريري",
          "en": "Editorial calendar"
        }
      },
      {
        "id": "authors",
        "icon": "users",
        "label": {
          "ar": "المحررون والمؤلفون",
          "en": "Authors & editors"
        }
      },
      {
        "id": "distribution",
        "icon": "megaphone",
        "label": {
          "ar": "التوزيع والترويج",
          "en": "Distribution & promotion"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "حملة الأسبوع",
        "en": "Campaign of the week"
      },
      "value": "سلسلة التحولات الرقمية",
      "description": {
        "ar": "ارتفعت القراءات العميقة بنسبة 26% بعد إطلاق السلسلة المكونة من خمسة أجزاء.",
        "en": "Deep reads climbed 26% after launching the five-part digital transformation series."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة إدارة المحتوى",
        "en": "Content operations dashboard"
      },
      "subtitle": {
        "ar": "تنسيق جدول النشر، جودة المواد، وأداء القنوات.",
        "en": "Coordinate publishing schedules, content quality, and channel performance."
      },
      "primary": {
        "ar": "إطلاق موضوع خاص",
        "en": "Launch special topic"
      },
      "secondary": {
        "ar": "مراجعة الخطة الأسبوعية",
        "en": "Review weekly plan"
      }
    },
    "stats": [
      {
        "icon": "sparkles",
        "label": {
          "ar": "مقالات منشورة هذا الشهر",
          "en": "Articles published this month"
        },
        "value": "64",
        "delta": {
          "ar": "+12 عن الشهر السابق",
          "en": "+12 vs last month"
        },
        "trend": "positive"
      },
      {
        "icon": "heart",
        "label": {
          "ar": "معدل التفاعل",
          "en": "Engagement rate"
        },
        "value": "7.4%",
        "delta": {
          "ar": "+1.2 نقطة",
          "en": "+1.2 pts"
        },
        "trend": "positive"
      },
      {
        "icon": "folder",
        "label": {
          "ar": "مسودات قيد المراجعة",
          "en": "Drafts in review"
        },
        "value": "18",
        "delta": {
          "ar": "-6 مقارنة بالأسبوع الماضي",
          "en": "-6 vs last week"
        },
        "trend": "positive"
      },
      {
        "icon": "users",
        "label": {
          "ar": "مساهمون نشطون",
          "en": "Active contributors"
        },
        "value": "27",
        "delta": {
          "ar": "+4 أصوات جديدة",
          "en": "+4 new voices"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "64 مقالات منشورة هذا الشهر",
          "en": "64 Articles published this month"
        },
        "description": {
          "ar": "تنسيق جدول النشر، جودة المواد، وأداء القنوات.",
          "en": "Coordinate publishing schedules, content quality, and channel performance."
        },
        "bullets": [
          {
            "value": "7.4%",
            "title": {
              "ar": "معدل التفاعل",
              "en": "Engagement rate"
            },
            "subtitle": {
              "ar": "+1.2 نقطة",
              "en": "+1.2 pts"
            }
          },
          {
            "value": "18",
            "title": {
              "ar": "مسودات قيد المراجعة",
              "en": "Drafts in review"
            },
            "subtitle": {
              "ar": "-6 مقارنة بالأسبوع الماضي",
              "en": "-6 vs last week"
            }
          },
          {
            "value": "27",
            "title": {
              "ar": "مساهمون نشطون",
              "en": "Active contributors"
            },
            "subtitle": {
              "ar": "+4 أصوات جديدة",
              "en": "+4 new voices"
            }
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "إطلاق جدول النشر الجديد",
              "en": "New publishing calendar launched"
            },
            "subtitle": {
              "ar": "أولويات موجهة نحو القصص المتعمقة",
              "en": "Focus on deep-dive features"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "تعيين محرر ضيف",
              "en": "Guest editor assignment"
            },
            "subtitle": {
              "ar": "سلسلة ريادة الأعمال الناشئة",
              "en": "Emerging founders series"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          },
          {
            "title": {
              "ar": "حملة النشرة الأسبوعية",
              "en": "Weekly newsletter push"
            },
            "subtitle": {
              "ar": "زيادة معدل الفتح إلى 41%",
              "en": "Open rate up to 41%"
            },
            "time": {
              "ar": "قبل يومين",
              "en": "2 days ago"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "مستقبل الذكاء الاصطناعي التوليدي",
                  "en": "Future of generative AI"
                },
                "subtitle": {
                  "ar": "3 أجزاء | 12 دقيقة قراءة",
                  "en": "3-part | 12 min read"
                },
                "tags": [
                  {
                    "ar": "معدل إكمال 68%",
                    "en": "Completion rate 68%"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "دليل استراتيجيات المحتوى لعام 2024",
                  "en": "2024 content strategy guide"
                },
                "subtitle": {
                  "ar": "PDF قابل للتنزيل",
                  "en": "Downloadable PDF"
                },
                "tags": [
                  {
                    "ar": "600 مشاركة اجتماعية",
                    "en": "600 social shares"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "بودكاست صوت الصناعة",
                  "en": "Industry voice podcast"
                },
                "subtitle": {
                  "ar": "حلقة جديدة كل ثلاثاء",
                  "en": "New episode every Tuesday"
                },
                "tags": [
                  {
                    "ar": "متوسط استماع 21 دقيقة",
                    "en": "Avg listen 21 mins"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "منحنى التفاعل اليومي",
          "en": "Daily engagement curve"
        },
        "subtitle": {
          "ar": "مقارنة التفاعل بين المقالات الطويلة والقصيرة عبر القنوات.",
          "en": "Long-form vs short-form engagement across channels."
        },
        "action": {
          "ar": "عرض حسب الفئة",
          "en": "Segment by category"
        },
        "placeholder": {
          "ar": "مخطط التفاعل",
          "en": "Engagement chart"
        }
      },
      {
        "id": "stories",
        "type": "list",
        "title": {
          "ar": "مواضيع رائجة",
          "en": "Trending stories"
        },
        "action": {
          "ar": "آخر تحديث 15 دقيقة",
          "en": "Updated 15 minutes ago"
        },
        "items": [
          {
            "icon": "sparkles",
            "title": {
              "ar": "مستقبل الذكاء الاصطناعي التوليدي",
              "en": "Future of generative AI"
            },
            "subtitle": {
              "ar": "3 أجزاء | 12 دقيقة قراءة",
              "en": "3-part | 12 min read"
            },
            "value": "24K",
            "delta": {
              "ar": "معدل إكمال 68%",
              "en": "Completion rate 68%"
            }
          },
          {
            "icon": "book-open",
            "title": {
              "ar": "دليل استراتيجيات المحتوى لعام 2024",
              "en": "2024 content strategy guide"
            },
            "subtitle": {
              "ar": "PDF قابل للتنزيل",
              "en": "Downloadable PDF"
            },
            "value": "18K",
            "delta": {
              "ar": "600 مشاركة اجتماعية",
              "en": "600 social shares"
            }
          },
          {
            "icon": "megaphone",
            "title": {
              "ar": "بودكاست صوت الصناعة",
              "en": "Industry voice podcast"
            },
            "subtitle": {
              "ar": "حلقة جديدة كل ثلاثاء",
              "en": "New episode every Tuesday"
            },
            "value": "9.3K",
            "delta": {
              "ar": "متوسط استماع 21 دقيقة",
              "en": "Avg listen 21 mins"
            }
          }
        ]
      }
    ],
    "id": "content",
    "slug": "dashboard-5.html",
    "layout": {
      "shell": "bg-slate-950/22",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.3fr_1fr] gap-y-10"
    },
    "gallery": {
      "badge": {
        "ar": "تشغيل المحتوى",
        "en": "Content operations"
      },
      "title": {
        "ar": "أتمتة غرف الأخبار الرقمية",
        "en": "Automate the digital newsroom"
      },
      "description": {
        "ar": "جدولة إنتاج المحتوى، توزيع القنوات، ومراقبة الأداء السردي بواجهة واحدة.",
        "en": "Orchestrate content production, channel distribution, and storytelling impact from one canvas."
      },
      "tags": [
        {
          "ar": "محتوى",
          "en": "Content"
        },
        {
          "ar": "تعاون",
          "en": "Collaboration"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "مقالات منشورة هذا الشهر",
              "en": "Articles published this month"
            },
            "value": {
              "ar": "64",
              "en": "64"
            }
          },
          {
            "label": {
              "ar": "معدل التفاعل",
              "en": "Engagement rate"
            },
            "value": {
              "ar": "7.4%",
              "en": "7.4%"
            }
          },
          {
            "label": {
              "ar": "مسودات قيد المراجعة",
              "en": "Drafts in review"
            },
            "value": {
              "ar": "18",
              "en": "18"
            }
          }
        ]
      }
    ]
  },
  "experience": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة تجربة العملاء",
        "en": "Customer Experience Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "X",
      "name": {
        "ar": "إشراق التجربة",
        "en": "Experience Glow"
      },
      "tagline": {
        "ar": "صوت العميل، الدعم، والرحلات الرقمية",
        "en": "Voice of customer, support, and journeys"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-rose-950 to-orange-900",
        "sidebarGradient": "from-slate-950 via-rose-900 to-amber-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-rose-500/35",
        "accentGradient": "from-rose-400 via-orange-400 to-amber-400",
        "accentText": "text-emerald-200",
        "highlightBg": "bg-rose-500/15 border-rose-500/35",
        "badgeBg": "bg-rose-500/20",
        "badgeText": "text-white",
        "navActive": "border border-rose-400/50 bg-rose-500/15",
        "navIconBg": "bg-rose-950/50",
        "navBadgeText": "text-rose-200",
        "listBorder": "border border-rose-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-rose-500/10",
        "timelineChip": "bg-rose-500/10 text-rose-200",
        "tableHeaderBg": "bg-rose-500/10",
        "cardShadow": "shadow-[0_36px_110px_-54px_rgba(244,63,94,0.7)]"
      },
      "light": {
        "bodyGradient": "from-rose-50 via-white to-amber-100",
        "sidebarGradient": "from-white via-rose-50 to-amber-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-rose-200",
        "accentGradient": "from-rose-400 via-orange-400 to-amber-400",
        "accentText": "text-rose-600",
        "highlightBg": "bg-rose-500/10 border-rose-200/60",
        "badgeBg": "bg-rose-200/60",
        "badgeText": "text-rose-900",
        "navActive": "border border-rose-200 bg-rose-500/10",
        "navIconBg": "bg-rose-100",
        "navBadgeText": "text-rose-700",
        "listBorder": "border border-rose-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-rose-100",
        "timelineChip": "bg-rose-100 text-rose-700",
        "tableHeaderBg": "bg-rose-50/80",
        "cardShadow": "shadow-[0_32px_90px_-55px_rgba(244,63,94,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "heart",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "رضا",
          "en": "Satisfaction"
        }
      },
      {
        "id": "support",
        "icon": "chat-bubble",
        "label": {
          "ar": "الدعم والتذاكر",
          "en": "Support & tickets"
        }
      },
      {
        "id": "feedback",
        "icon": "sparkles",
        "label": {
          "ar": "ملاحظات العملاء",
          "en": "Customer feedback"
        }
      },
      {
        "id": "journeys",
        "icon": "map",
        "label": {
          "ar": "الرحلات الرقمية",
          "en": "Digital journeys"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "نبض العملاء",
        "en": "Customer pulse"
      },
      "value": "NPS 71",
      "description": {
        "ar": "برنامج الترحيب الجديد رفع رضا المستخدمين الجدد بنسبة 14 نقطة.",
        "en": "New onboarding journey increased new-user satisfaction by 14 points."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة تجربة العملاء",
        "en": "Customer experience dashboard"
      },
      "subtitle": {
        "ar": "أثر الدعم، الملاحظات، والتحويلات عبر كل نقطة تواصل.",
        "en": "Track support, feedback, and conversions across every touchpoint."
      },
      "primary": {
        "ar": "إطلاق حملة وفاء",
        "en": "Launch loyalty campaign"
      },
      "secondary": {
        "ar": "عرض لوحة الرحلات",
        "en": "View journey board"
      }
    },
    "stats": [
      {
        "icon": "heart",
        "label": {
          "ar": "رضا العملاء (CSAT)",
          "en": "Customer satisfaction (CSAT)"
        },
        "value": "92%",
        "delta": {
          "ar": "+3 نقاط هذا الربع",
          "en": "+3 points this quarter"
        },
        "trend": "positive"
      },
      {
        "icon": "sparkles",
        "label": {
          "ar": "مؤشر المروج الصافي",
          "en": "Net promoter score"
        },
        "value": "71",
        "delta": {
          "ar": "+6 نقاط منذ الشهر الماضي",
          "en": "+6 points since last month"
        },
        "trend": "positive"
      },
      {
        "icon": "chat-bubble",
        "label": {
          "ar": "طلبات مُغلقة خلال 24 ساعة",
          "en": "Tickets resolved within 24h"
        },
        "value": "87%",
        "delta": {
          "ar": "+9% بعد أتمتة الردود",
          "en": "+9% after automation rollout"
        },
        "trend": "positive"
      },
      {
        "icon": "map",
        "label": {
          "ar": "تغطية الرحلات المؤتمتة",
          "en": "Automated journey coverage"
        },
        "value": "63%",
        "delta": {
          "ar": "+12% خلال 45 يوماً",
          "en": "+12% over 45 days"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "92% رضا العملاء (CSAT)",
          "en": "92% Customer satisfaction (CSAT)"
        },
        "description": {
          "ar": "أثر الدعم، الملاحظات، والتحويلات عبر كل نقطة تواصل.",
          "en": "Track support, feedback, and conversions across every touchpoint."
        },
        "bullets": [
          {
            "value": "71",
            "title": {
              "ar": "مؤشر المروج الصافي",
              "en": "Net promoter score"
            },
            "subtitle": {
              "ar": "+6 نقاط منذ الشهر الماضي",
              "en": "+6 points since last month"
            }
          },
          {
            "value": "87%",
            "title": {
              "ar": "طلبات مُغلقة خلال 24 ساعة",
              "en": "Tickets resolved within 24h"
            },
            "subtitle": {
              "ar": "+9% بعد أتمتة الردود",
              "en": "+9% after automation rollout"
            }
          },
          {
            "value": "63%",
            "title": {
              "ar": "تغطية الرحلات المؤتمتة",
              "en": "Automated journey coverage"
            },
            "subtitle": {
              "ar": "+12% خلال 45 يوماً",
              "en": "+12% over 45 days"
            }
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "رضا العملاء (CSAT)",
              "en": "Customer satisfaction (CSAT)"
            },
            "value": {
              "ar": "92%",
              "en": "92%"
            },
            "caption": {
              "ar": "+3 نقاط هذا الربع",
              "en": "+3 points this quarter"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "مؤشر المروج الصافي",
              "en": "Net promoter score"
            },
            "value": {
              "ar": "71",
              "en": "71"
            },
            "caption": {
              "ar": "+6 نقاط منذ الشهر الماضي",
              "en": "+6 points since last month"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "طلبات مُغلقة خلال 24 ساعة",
              "en": "Tickets resolved within 24h"
            },
            "value": {
              "ar": "87%",
              "en": "87%"
            },
            "caption": {
              "ar": "+9% بعد أتمتة الردود",
              "en": "+9% after automation rollout"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "تغطية الرحلات المؤتمتة",
              "en": "Automated journey coverage"
            },
            "value": {
              "ar": "63%",
              "en": "63%"
            },
            "caption": {
              "ar": "+12% خلال 45 يوماً",
              "en": "+12% over 45 days"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "إطلاق روبوت المحادثة الجديد",
              "en": "New chatbot launched"
            },
            "subtitle": {
              "ar": "يغطي 42% من الأسئلة المتكررة",
              "en": "Covers 42% of repeat questions"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "جلسات الاستماع للعملاء",
              "en": "Customer listening sessions"
            },
            "subtitle": {
              "ar": "5 مجموعات تركيز في ثلاثة أسواق",
              "en": "5 focus groups across three markets"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          },
          {
            "title": {
              "ar": "تدفق رحلة متكامل جديد",
              "en": "New integrated journey flow"
            },
            "subtitle": {
              "ar": "يُقلل الخطوات بنسبة 23%",
              "en": "Reduces steps by 23%"
            },
            "time": {
              "ar": "قبل يومين",
              "en": "2 days ago"
            }
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "تطور مؤشر الرضا",
          "en": "Satisfaction evolution"
        },
        "subtitle": {
          "ar": "مسار التقييمات اليومية عبر القنوات والدول.",
          "en": "Daily sentiment across channels and geographies."
        },
        "action": {
          "ar": "تحليل الشرائح",
          "en": "Segment analysis"
        },
        "placeholder": {
          "ar": "مخطط الرضا",
          "en": "Satisfaction chart"
        }
      },
      {
        "id": "channels",
        "type": "list",
        "title": {
          "ar": "أفضل قنوات الخدمة",
          "en": "Top service channels"
        },
        "action": {
          "ar": "مقارنة أسبوعية",
          "en": "Week-over-week compare"
        },
        "items": [
          {
            "icon": "chat-bubble",
            "title": {
              "ar": "مركز المساعدة المباشر",
              "en": "Live help centre"
            },
            "subtitle": {
              "ar": "زمن استجابة 38 ثانية",
              "en": "Response time 38s"
            },
            "value": "CSAT 95%",
            "delta": {
              "ar": "+4 نقاط",
              "en": "+4 points"
            }
          },
          {
            "icon": "sparkles",
            "title": {
              "ar": "الرسائل داخل التطبيق",
              "en": "In-app messaging"
            },
            "subtitle": {
              "ar": "حملات تفعيل سياقية",
              "en": "Contextual activation"
            },
            "value": "تفاعل 67%",
            "delta": {
              "ar": "+8% اعتماد",
              "en": "+8% adoption"
            }
          },
          {
            "icon": "megaphone",
            "title": {
              "ar": "وسائل التواصل الاجتماعي",
              "en": "Social care"
            },
            "subtitle": {
              "ar": "فريق متعدد اللغات",
              "en": "Multi-lingual team"
            },
            "value": "حل 78%",
            "delta": {
              "ar": "+12% رضا",
              "en": "+12% satisfaction"
            }
          }
        ]
      }
    ],
    "id": "experience",
    "slug": "dashboard-6.html",
    "layout": {
      "shell": "bg-slate-950/20",
      "main": "space-y-13 lg:px-15",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.5fr_1fr] gap-y-10"
    },
    "gallery": {
      "badge": {
        "ar": "تجربة العملاء",
        "en": "Customer experience"
      },
      "title": {
        "ar": "تجربة عملاء غامرة",
        "en": "Design immersive CX"
      },
      "description": {
        "ar": "تنبؤ ولحظات حاسمة تعكس رحلة العميل من الاهتمام إلى الولاء بوقت حقيقي.",
        "en": "Predictive journeys and moment maps from awareness to loyalty in realtime."
      },
      "tags": [
        {
          "ar": "رحلة العميل",
          "en": "Journey"
        },
        {
          "ar": "ولاء",
          "en": "Loyalty"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "رضا العملاء (CSAT)",
              "en": "Customer satisfaction (CSAT)"
            },
            "value": {
              "ar": "92%",
              "en": "92%"
            }
          },
          {
            "label": {
              "ar": "مؤشر المروج الصافي",
              "en": "Net promoter score"
            },
            "value": {
              "ar": "71",
              "en": "71"
            }
          },
          {
            "label": {
              "ar": "طلبات مُغلقة خلال 24 ساعة",
              "en": "Tickets resolved within 24h"
            },
            "value": {
              "ar": "87%",
              "en": "87%"
            }
          }
        ]
      }
    ]
  },
  "people": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة الموارد البشرية",
        "en": "People Operations Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "H",
      "name": {
        "ar": "نبض الموارد البشرية",
        "en": "People Pulse"
      },
      "tagline": {
        "ar": "الاستقطاب، الأداء، وتجربة الموظفين",
        "en": "Hiring, performance, and employee experience"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-emerald-950 to-lime-900",
        "sidebarGradient": "from-slate-950 via-emerald-900 to-lime-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-emerald-500/35",
        "accentGradient": "from-emerald-400 via-lime-400 to-teal-400",
        "accentText": "text-amber-200",
        "highlightBg": "bg-emerald-500/15 border-emerald-500/35",
        "badgeBg": "bg-emerald-500/20",
        "badgeText": "text-white",
        "navActive": "border border-emerald-400/50 bg-emerald-500/15",
        "navIconBg": "bg-emerald-950/40",
        "navBadgeText": "text-emerald-200",
        "listBorder": "border border-lime-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-lime-500/10",
        "timelineChip": "bg-lime-500/10 text-lime-200",
        "tableHeaderBg": "bg-lime-500/10",
        "cardShadow": "shadow-[0_32px_100px_-48px_rgba(16,185,129,0.7)]"
      },
      "light": {
        "bodyGradient": "from-emerald-50 via-white to-lime-100",
        "sidebarGradient": "from-white via-emerald-50 to-lime-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-emerald-200",
        "accentGradient": "from-emerald-400 via-lime-400 to-teal-400",
        "accentText": "text-lime-600",
        "highlightBg": "bg-emerald-500/10 border-emerald-200/60",
        "badgeBg": "bg-emerald-200/60",
        "badgeText": "text-emerald-900",
        "navActive": "border border-emerald-200 bg-emerald-500/10",
        "navIconBg": "bg-emerald-100",
        "navBadgeText": "text-emerald-700",
        "listBorder": "border border-lime-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-lime-100",
        "timelineChip": "bg-lime-100 text-lime-700",
        "tableHeaderBg": "bg-lime-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(16,185,129,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "users",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "فِرق",
          "en": "Teams"
        }
      },
      {
        "id": "talent",
        "icon": "briefcase",
        "label": {
          "ar": "المواهب والتوظيف",
          "en": "Talent & hiring"
        }
      },
      {
        "id": "performance",
        "icon": "sparkles",
        "label": {
          "ar": "الأداء والتطوير",
          "en": "Performance & development"
        }
      },
      {
        "id": "wellbeing",
        "icon": "heart",
        "label": {
          "ar": "الرفاهية",
          "en": "Wellbeing"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "نبض الفريق",
        "en": "Team pulse"
      },
      "value": "94% احتفاظ",
      "description": {
        "ar": "برنامج الإرشاد المهني ساهم في رفع نسبة الاحتفاظ السنوية 6 نقاط.",
        "en": "Mentorship program lifted annual retention by 6 points."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة الموارد البشرية",
        "en": "People operations dashboard"
      },
      "subtitle": {
        "ar": "نظرة شاملة على القوى العاملة، المواهب، والرفاهية.",
        "en": "Holistic view of workforce, talent pipelines, and wellbeing."
      },
      "primary": {
        "ar": "إطلاق حملة التوظيف",
        "en": "Launch hiring sprint"
      },
      "secondary": {
        "ar": "مراجعة خطة التطوير",
        "en": "Review development plan"
      }
    },
    "stats": [
      {
        "icon": "users",
        "label": {
          "ar": "عدد الموظفين الحالي",
          "en": "Current headcount"
        },
        "value": "1,240",
        "delta": {
          "ar": "+42 خلال الربع",
          "en": "+42 this quarter"
        },
        "trend": "positive"
      },
      {
        "icon": "briefcase",
        "label": {
          "ar": "مرشحون في المسار",
          "en": "Candidates in pipeline"
        },
        "value": "36",
        "delta": {
          "ar": "20% أسرع من المتوسط",
          "en": "20% faster than avg"
        },
        "trend": "positive"
      },
      {
        "icon": "sparkles",
        "label": {
          "ar": "إكمال تقييم الأداء",
          "en": "Performance review completion"
        },
        "value": "88%",
        "delta": {
          "ar": "+9% مشاركة",
          "en": "+9% participation"
        },
        "trend": "positive"
      },
      {
        "icon": "book-open",
        "label": {
          "ar": "ساعات التدريب",
          "en": "Training hours"
        },
        "value": "1,820",
        "delta": {
          "ar": "+460 ساعة منذ يناير",
          "en": "+460 hours since January"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "1,240 عدد الموظفين الحالي",
          "en": "1,240 Current headcount"
        },
        "description": {
          "ar": "نظرة شاملة على القوى العاملة، المواهب، والرفاهية.",
          "en": "Holistic view of workforce, talent pipelines, and wellbeing."
        },
        "bullets": [
          {
            "value": "36",
            "title": {
              "ar": "مرشحون في المسار",
              "en": "Candidates in pipeline"
            },
            "subtitle": {
              "ar": "20% أسرع من المتوسط",
              "en": "20% faster than avg"
            }
          },
          {
            "value": "88%",
            "title": {
              "ar": "إكمال تقييم الأداء",
              "en": "Performance review completion"
            },
            "subtitle": {
              "ar": "+9% مشاركة",
              "en": "+9% participation"
            }
          },
          {
            "value": "1,820",
            "title": {
              "ar": "ساعات التدريب",
              "en": "Training hours"
            },
            "subtitle": {
              "ar": "+460 ساعة منذ يناير",
              "en": "+460 hours since January"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "مدير هندسة المنصة",
                  "en": "Platform engineering manager"
                },
                "subtitle": {
                  "ar": "مرحلة المقابلة النهائية",
                  "en": "Final interview stage"
                },
                "tags": [
                  {
                    "ar": "متوسط قرار 8 أيام",
                    "en": "Decision in 8 days"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "قائد تجربة العملاء",
                  "en": "Customer experience lead"
                },
                "subtitle": {
                  "ar": "تمت دعوة 5 متقدمين",
                  "en": "5 invites sent"
                },
                "tags": [
                  {
                    "ar": "تعاون مع الفريق التجاري",
                    "en": "Working with commercial team"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "مصمم تعلم رقمي",
                  "en": "Digital learning designer"
                },
                "subtitle": {
                  "ar": "يبدأ برنامج التدريب في مايو",
                  "en": "Enablement program kicks off May"
                },
                "tags": [
                  {
                    "ar": "تجربة تقنية مطلوبة",
                    "en": "Looking for tech background"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "عدد الموظفين الحالي",
              "en": "Current headcount"
            },
            "value": {
              "ar": "1,240",
              "en": "1,240"
            },
            "caption": {
              "ar": "+42 خلال الربع",
              "en": "+42 this quarter"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "مرشحون في المسار",
              "en": "Candidates in pipeline"
            },
            "value": {
              "ar": "36",
              "en": "36"
            },
            "caption": {
              "ar": "20% أسرع من المتوسط",
              "en": "20% faster than avg"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "إكمال تقييم الأداء",
              "en": "Performance review completion"
            },
            "value": {
              "ar": "88%",
              "en": "88%"
            },
            "caption": {
              "ar": "+9% مشاركة",
              "en": "+9% participation"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "ساعات التدريب",
              "en": "Training hours"
            },
            "value": {
              "ar": "1,820",
              "en": "1,820"
            },
            "caption": {
              "ar": "+460 ساعة منذ يناير",
              "en": "+460 hours since January"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "توزيع القوى العاملة",
          "en": "Workforce distribution"
        },
        "subtitle": {
          "ar": "مقارنة النمو بين الأقسام والمناطق.",
          "en": "Growth comparison by department and region."
        },
        "action": {
          "ar": "تحميل تقرير القوى العاملة",
          "en": "Download workforce report"
        },
        "placeholder": {
          "ar": "مخطط القوى العاملة",
          "en": "Workforce chart"
        }
      },
      {
        "id": "roles",
        "type": "list",
        "title": {
          "ar": "أدوار حرجة مفتوحة",
          "en": "Critical open roles"
        },
        "action": {
          "ar": "آخر تحديث صباح اليوم",
          "en": "Updated this morning"
        },
        "items": [
          {
            "icon": "briefcase",
            "title": {
              "ar": "مدير هندسة المنصة",
              "en": "Platform engineering manager"
            },
            "subtitle": {
              "ar": "مرحلة المقابلة النهائية",
              "en": "Final interview stage"
            },
            "value": "3 مرشحين",
            "delta": {
              "ar": "متوسط قرار 8 أيام",
              "en": "Decision in 8 days"
            }
          },
          {
            "icon": "sparkles",
            "title": {
              "ar": "قائد تجربة العملاء",
              "en": "Customer experience lead"
            },
            "subtitle": {
              "ar": "تمت دعوة 5 متقدمين",
              "en": "5 invites sent"
            },
            "value": "قيد التقييم",
            "delta": {
              "ar": "تعاون مع الفريق التجاري",
              "en": "Working with commercial team"
            }
          },
          {
            "icon": "book-open",
            "title": {
              "ar": "مصمم تعلم رقمي",
              "en": "Digital learning designer"
            },
            "subtitle": {
              "ar": "يبدأ برنامج التدريب في مايو",
              "en": "Enablement program kicks off May"
            },
            "value": "4 مرشحين",
            "delta": {
              "ar": "تجربة تقنية مطلوبة",
              "en": "Looking for tech background"
            }
          }
        ]
      }
    ],
    "id": "people",
    "slug": "dashboard-7.html",
    "layout": {
      "shell": "bg-slate-950/18",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.4fr_1fr] gap-y-10"
    },
    "gallery": {
      "badge": {
        "ar": "موارد بشرية",
        "en": "People ops"
      },
      "title": {
        "ar": "طاقة فرق عالية الأداء",
        "en": "Empower high-performing teams"
      },
      "description": {
        "ar": "رؤية فورية للتوظيف، المشاركة، ومخاطر الاستبقاء لمديري الموارد البشرية.",
        "en": "Realtime clarity on hiring, engagement, and retention risks for HR leaders."
      },
      "tags": [
        {
          "ar": "مواهب",
          "en": "Talent"
        },
        {
          "ar": "مشاركة",
          "en": "Engagement"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "عدد الموظفين الحالي",
              "en": "Current headcount"
            },
            "value": {
              "ar": "1,240",
              "en": "1,240"
            }
          },
          {
            "label": {
              "ar": "مرشحون في المسار",
              "en": "Candidates in pipeline"
            },
            "value": {
              "ar": "36",
              "en": "36"
            }
          },
          {
            "label": {
              "ar": "إكمال تقييم الأداء",
              "en": "Performance review completion"
            },
            "value": {
              "ar": "88%",
              "en": "88%"
            }
          }
        ]
      }
    ]
  },
  "learning": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة التعليم الإلكتروني",
        "en": "E-learning Experience Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "L",
      "name": {
        "ar": "منصة التعلم الذكي",
        "en": "Smart Learning Hub"
      },
      "tagline": {
        "ar": "تعليم ذاتي، بث مباشر، وشهادات احترافية",
        "en": "Self-paced, live cohorts, and pro certifications"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-sky-950 to-violet-900",
        "sidebarGradient": "from-slate-950 via-sky-900 to-violet-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-sky-500/35",
        "accentGradient": "from-sky-400 via-indigo-400 to-violet-400",
        "accentText": "text-indigo-200",
        "highlightBg": "bg-sky-500/15 border-sky-500/35",
        "badgeBg": "bg-sky-500/20",
        "badgeText": "text-white",
        "navActive": "border border-sky-400/50 bg-sky-500/15",
        "navIconBg": "bg-indigo-950/50",
        "navBadgeText": "text-sky-200",
        "listBorder": "border border-violet-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-violet-500/10",
        "timelineChip": "bg-violet-500/10 text-violet-200",
        "tableHeaderBg": "bg-violet-500/10",
        "cardShadow": "shadow-[0_34px_110px_-54px_rgba(56,189,248,0.7)]"
      },
      "light": {
        "bodyGradient": "from-sky-50 via-white to-violet-100",
        "sidebarGradient": "from-white via-sky-50 to-violet-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-sky-200",
        "accentGradient": "from-sky-400 via-indigo-400 to-violet-400",
        "accentText": "text-violet-600",
        "highlightBg": "bg-sky-500/10 border-sky-200/60",
        "badgeBg": "bg-sky-200/60",
        "badgeText": "text-indigo-900",
        "navActive": "border border-sky-200 bg-sky-500/10",
        "navIconBg": "bg-sky-100",
        "navBadgeText": "text-indigo-700",
        "listBorder": "border border-violet-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-violet-100",
        "timelineChip": "bg-violet-100 text-violet-700",
        "tableHeaderBg": "bg-violet-50/80",
        "cardShadow": "shadow-[0_32px_90px_-55px_rgba(56,189,248,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "book-open",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "تعلم",
          "en": "Learning"
        }
      },
      {
        "id": "courses",
        "icon": "sparkles",
        "label": {
          "ar": "الدورات والبرامج",
          "en": "Courses & programs"
        }
      },
      {
        "id": "learners",
        "icon": "users",
        "label": {
          "ar": "المتعلمون",
          "en": "Learners"
        }
      },
      {
        "id": "certs",
        "icon": "trophy",
        "label": {
          "ar": "الشهادات",
          "en": "Certifications"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "أبرز برنامج",
        "en": "Featured program"
      },
      "value": "قادة المنتجات الاحترافية",
      "description": {
        "ar": "مسار من 8 أسابيع مع إرشاد مباشر ارتفع معدل إكماله إلى 84%.",
        "en": "Eight-week mentored track now reaching 84% completion."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة التعليم الإلكتروني",
        "en": "E-learning experience dashboard"
      },
      "subtitle": {
        "ar": "حلّل مشاركة المتعلمين، فعالية المحتوى، وأداء البرامج الحية.",
        "en": "Analyse learner engagement, content effectiveness, and live cohort performance."
      },
      "primary": {
        "ar": "إطلاق فصل جديد",
        "en": "Launch new cohort"
      },
      "secondary": {
        "ar": "تصدير تقدم المتعلمين",
        "en": "Export learner progress"
      }
    },
    "stats": [
      {
        "icon": "users",
        "label": {
          "ar": "متعلمين نشطين",
          "en": "Active learners"
        },
        "value": "6,480",
        "delta": {
          "ar": "+18% نمو خلال 90 يوماً",
          "en": "+18% growth over 90 days"
        },
        "trend": "positive"
      },
      {
        "icon": "book-open",
        "label": {
          "ar": "معدل إكمال الدورات",
          "en": "Course completion rate"
        },
        "value": "82%",
        "delta": {
          "ar": "+7 نقاط بفضل التفاعل",
          "en": "+7 pts after interactivity"
        },
        "trend": "positive"
      },
      {
        "icon": "play",
        "label": {
          "ar": "جلسات مباشرة هذا الأسبوع",
          "en": "Live sessions this week"
        },
        "value": "34",
        "delta": {
          "ar": "+9 جلسات مقارنة بالأسبوع الماضي",
          "en": "+9 sessions vs last week"
        },
        "trend": "positive"
      },
      {
        "icon": "heart",
        "label": {
          "ar": "رضا المتعلمين",
          "en": "Learner satisfaction"
        },
        "value": "4.6/5",
        "delta": {
          "ar": "+0.3 بعد تحسين التقييم",
          "en": "+0.3 after feedback revamp"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "6,480 متعلمين نشطين",
          "en": "6,480 Active learners"
        },
        "description": {
          "ar": "حلّل مشاركة المتعلمين، فعالية المحتوى، وأداء البرامج الحية.",
          "en": "Analyse learner engagement, content effectiveness, and live cohort performance."
        },
        "bullets": [
          {
            "value": "82%",
            "title": {
              "ar": "معدل إكمال الدورات",
              "en": "Course completion rate"
            },
            "subtitle": {
              "ar": "+7 نقاط بفضل التفاعل",
              "en": "+7 pts after interactivity"
            }
          },
          {
            "value": "34",
            "title": {
              "ar": "جلسات مباشرة هذا الأسبوع",
              "en": "Live sessions this week"
            },
            "subtitle": {
              "ar": "+9 جلسات مقارنة بالأسبوع الماضي",
              "en": "+9 sessions vs last week"
            }
          },
          {
            "value": "4.6/5",
            "title": {
              "ar": "رضا المتعلمين",
              "en": "Learner satisfaction"
            },
            "subtitle": {
              "ar": "+0.3 بعد تحسين التقييم",
              "en": "+0.3 after feedback revamp"
            }
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "إطلاق استوديو البث الجديد",
              "en": "New live studio launch"
            },
            "subtitle": {
              "ar": "جودة بث 4K ودعم متعدد اللغات",
              "en": "4K streaming with multi-language support"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "تحسين تجربة التطبيق",
              "en": "Mobile app refresh"
            },
            "subtitle": {
              "ar": "إشعارات تقدم ذكية",
              "en": "Smart progress alerts"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          },
          {
            "title": {
              "ar": "شراكة اعتماد جديدة",
              "en": "New accreditation partner"
            },
            "subtitle": {
              "ar": "اعتماد دولي للبرامج التقنية",
              "en": "Global certification for tech tracks"
            },
            "time": {
              "ar": "قبل يومين",
              "en": "2 days ago"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "تصميم المنتج المعتمد",
                  "en": "Certified product design"
                },
                "subtitle": {
                  "ar": "نسبة إكمال 86%",
                  "en": "Completion rate 86%"
                },
                "tags": [
                  {
                    "ar": "+320 تسجيل جديد",
                    "en": "+320 new enrollments"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "تحليل البيانات المتقدم",
                  "en": "Advanced data analytics"
                },
                "subtitle": {
                  "ar": "مشروع تخرج فعلي",
                  "en": "Capstone project"
                },
                "tags": [
                  {
                    "ar": "+14% معدل نجاح",
                    "en": "+14% success rate"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "شهادة الأمن السيبراني",
                  "en": "Cybersecurity certification"
                },
                "subtitle": {
                  "ar": "مختبرات عملية مباشرة",
                  "en": "Hands-on live labs"
                },
                "tags": [
                  {
                    "ar": "تحقيق 92% رضا",
                    "en": "Achieved 92% satisfaction"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "مشاركة التعلم الأسبوعية",
          "en": "Weekly learning engagement"
        },
        "subtitle": {
          "ar": "الوقت المستغرق والتفاعل عبر مسارات التعلم.",
          "en": "Time spent and interactions across learning paths."
        },
        "action": {
          "ar": "عرض حسب المسار",
          "en": "View by track"
        },
        "placeholder": {
          "ar": "مخطط المشاركة",
          "en": "Engagement plot"
        }
      },
      {
        "id": "courses",
        "type": "list",
        "title": {
          "ar": "الدورات الأعلى أداءً",
          "en": "Top performing courses"
        },
        "action": {
          "ar": "تحديث تلقائي",
          "en": "Auto refreshed"
        },
        "items": [
          {
            "icon": "sparkles",
            "title": {
              "ar": "تصميم المنتج المعتمد",
              "en": "Certified product design"
            },
            "subtitle": {
              "ar": "نسبة إكمال 86%",
              "en": "Completion rate 86%"
            },
            "value": "1,240 متعلم",
            "delta": {
              "ar": "+320 تسجيل جديد",
              "en": "+320 new enrollments"
            }
          },
          {
            "icon": "book-open",
            "title": {
              "ar": "تحليل البيانات المتقدم",
              "en": "Advanced data analytics"
            },
            "subtitle": {
              "ar": "مشروع تخرج فعلي",
              "en": "Capstone project"
            },
            "value": "980 متعلم",
            "delta": {
              "ar": "+14% معدل نجاح",
              "en": "+14% success rate"
            }
          },
          {
            "icon": "trophy",
            "title": {
              "ar": "شهادة الأمن السيبراني",
              "en": "Cybersecurity certification"
            },
            "subtitle": {
              "ar": "مختبرات عملية مباشرة",
              "en": "Hands-on live labs"
            },
            "value": "760 متعلم",
            "delta": {
              "ar": "تحقيق 92% رضا",
              "en": "Achieved 92% satisfaction"
            }
          }
        ]
      }
    ],
    "id": "learning",
    "slug": "dashboard-8.html",
    "layout": {
      "shell": "bg-slate-950/20",
      "main": "space-y-12 lg:px-15",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.5fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "تعلم إلكتروني",
        "en": "Learning"
      },
      "title": {
        "ar": "رحلات تعلم مرنة",
        "en": "Craft adaptive learning journeys"
      },
      "description": {
        "ar": "تحليلات تقدم، تفاعل، ومسارات تعلم فردية لفرق الأكاديميات الرقمية.",
        "en": "Progress, engagement, and adaptive pathways analytics for digital academies."
      },
      "tags": [
        {
          "ar": "تعلم",
          "en": "Learning"
        },
        {
          "ar": "منصات",
          "en": "Platforms"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "متعلمين نشطين",
              "en": "Active learners"
            },
            "value": {
              "ar": "6,480",
              "en": "6,480"
            }
          },
          {
            "label": {
              "ar": "معدل إكمال الدورات",
              "en": "Course completion rate"
            },
            "value": {
              "ar": "82%",
              "en": "82%"
            }
          },
          {
            "label": {
              "ar": "جلسات مباشرة هذا الأسبوع",
              "en": "Live sessions this week"
            },
            "value": {
              "ar": "34",
              "en": "34"
            }
          }
        ]
      }
    ]
  },
  "security": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة أمن المعلومات",
        "en": "Cybersecurity Operations Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "S",
      "name": {
        "ar": "درع الأمن",
        "en": "Security Shield"
      },
      "tagline": {
        "ar": "مراقبة التهديدات، الامتثال، والاستجابة",
        "en": "Threat monitoring, compliance, and response"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-slate-900 to-rose-900",
        "sidebarGradient": "from-slate-950 via-slate-900 to-rose-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-rose-500/35",
        "accentGradient": "from-rose-400 via-purple-400 to-slate-400",
        "accentText": "text-emerald-200",
        "highlightBg": "bg-rose-500/15 border-rose-500/35",
        "badgeBg": "bg-rose-500/20",
        "badgeText": "text-white",
        "navActive": "border border-rose-400/50 bg-rose-500/15",
        "navIconBg": "bg-slate-900/60",
        "navBadgeText": "text-rose-200",
        "listBorder": "border border-emerald-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-emerald-500/10",
        "timelineChip": "bg-emerald-500/10 text-emerald-200",
        "tableHeaderBg": "bg-emerald-500/10",
        "cardShadow": "shadow-[0_34px_110px_-54px_rgba(244,63,94,0.7)]"
      },
      "light": {
        "bodyGradient": "from-rose-50 via-white to-slate-100",
        "sidebarGradient": "from-white via-rose-50 to-slate-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-rose-200",
        "accentGradient": "from-rose-400 via-purple-400 to-slate-400",
        "accentText": "text-emerald-600",
        "highlightBg": "bg-rose-500/10 border-rose-200/60",
        "badgeBg": "bg-rose-200/60",
        "badgeText": "text-rose-900",
        "navActive": "border border-rose-200 bg-rose-500/10",
        "navIconBg": "bg-rose-100",
        "navBadgeText": "text-rose-700",
        "listBorder": "border border-emerald-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-emerald-100",
        "timelineChip": "bg-emerald-100 text-emerald-700",
        "tableHeaderBg": "bg-emerald-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(244,63,94,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "shield",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "آمن",
          "en": "Secure"
        }
      },
      {
        "id": "threats",
        "icon": "sparkles",
        "label": {
          "ar": "التهديدات الحية",
          "en": "Live threats"
        }
      },
      {
        "id": "compliance",
        "icon": "scale",
        "label": {
          "ar": "الامتثال",
          "en": "Compliance"
        }
      },
      {
        "id": "operations",
        "icon": "cog",
        "label": {
          "ar": "العمليات والاستجابة",
          "en": "Operations & response"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "وضع الأمان",
        "en": "Security posture"
      },
      "value": "مستوى المخاطر: منخفض",
      "description": {
        "ar": "تم تحديث سياسات XDR وإغلاق ثغرات الكتالوج خلال 48 ساعة.",
        "en": "XDR policies refreshed and catalog vulnerabilities closed within 48 hours."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة أمن المعلومات",
        "en": "Cybersecurity operations dashboard"
      },
      "subtitle": {
        "ar": "رؤية فورية للهجمات، التصحيحات، والتدقيق التنظيمي.",
        "en": "Instant insight into attacks, patching, and regulatory audits."
      },
      "primary": {
        "ar": "إطلاق اختبار اختراق",
        "en": "Launch penetration test"
      },
      "secondary": {
        "ar": "مراجعة التقارير التنظيمية",
        "en": "Review compliance reports"
      }
    },
    "stats": [
      {
        "icon": "shield",
        "label": {
          "ar": "محاولات تم صدّها",
          "en": "Blocked attempts"
        },
        "value": "2.3M",
        "delta": {
          "ar": "+18% منذ الأمس",
          "en": "+18% since yesterday"
        },
        "trend": "positive"
      },
      {
        "icon": "sparkles",
        "label": {
          "ar": "متوسط زمن الاكتشاف",
          "en": "Mean time to detect"
        },
        "value": "14 دقيقة",
        "delta": {
          "ar": "-6 دقائق مقارنة بالربع الماضي",
          "en": "-6 minutes vs last quarter"
        },
        "trend": "positive"
      },
      {
        "icon": "scale",
        "label": {
          "ar": "ثغرات حرجة مفتوحة",
          "en": "Open critical vulnerabilities"
        },
        "value": "3",
        "delta": {
          "ar": "قيد الإغلاق خلال 24 ساعة",
          "en": "Due to close within 24h"
        },
        "trend": "positive"
      },
      {
        "icon": "cog",
        "label": {
          "ar": "تغطية سياسات الأمان",
          "en": "Security policy coverage"
        },
        "value": "94%",
        "delta": {
          "ar": "+5% بعد التحديث الأخير",
          "en": "+5% after latest update"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "2.3M محاولات تم صدّها",
          "en": "2.3M Blocked attempts"
        },
        "description": {
          "ar": "رؤية فورية للهجمات، التصحيحات، والتدقيق التنظيمي.",
          "en": "Instant insight into attacks, patching, and regulatory audits."
        },
        "bullets": [
          {
            "value": "14 دقيقة",
            "title": {
              "ar": "متوسط زمن الاكتشاف",
              "en": "Mean time to detect"
            },
            "subtitle": {
              "ar": "-6 دقائق مقارنة بالربع الماضي",
              "en": "-6 minutes vs last quarter"
            }
          },
          {
            "value": "3",
            "title": {
              "ar": "ثغرات حرجة مفتوحة",
              "en": "Open critical vulnerabilities"
            },
            "subtitle": {
              "ar": "قيد الإغلاق خلال 24 ساعة",
              "en": "Due to close within 24h"
            }
          },
          {
            "value": "94%",
            "title": {
              "ar": "تغطية سياسات الأمان",
              "en": "Security policy coverage"
            },
            "subtitle": {
              "ar": "+5% بعد التحديث الأخير",
              "en": "+5% after latest update"
            }
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "محاولات تم صدّها",
              "en": "Blocked attempts"
            },
            "value": {
              "ar": "2.3M",
              "en": "2.3M"
            },
            "caption": {
              "ar": "+18% منذ الأمس",
              "en": "+18% since yesterday"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "متوسط زمن الاكتشاف",
              "en": "Mean time to detect"
            },
            "value": {
              "ar": "14 دقيقة",
              "en": "14 دقيقة"
            },
            "caption": {
              "ar": "-6 دقائق مقارنة بالربع الماضي",
              "en": "-6 minutes vs last quarter"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "ثغرات حرجة مفتوحة",
              "en": "Open critical vulnerabilities"
            },
            "value": {
              "ar": "3",
              "en": "3"
            },
            "caption": {
              "ar": "قيد الإغلاق خلال 24 ساعة",
              "en": "Due to close within 24h"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "تغطية سياسات الأمان",
              "en": "Security policy coverage"
            },
            "value": {
              "ar": "94%",
              "en": "94%"
            },
            "caption": {
              "ar": "+5% بعد التحديث الأخير",
              "en": "+5% after latest update"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "تمرين محاكاة هجوم",
              "en": "Attack simulation drill"
            },
            "subtitle": {
              "ar": "مشاركة 9 فرق استجابة",
              "en": "9 response teams participated"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "اجتياز تدقيق ISO 27001",
              "en": "ISO 27001 audit passed"
            },
            "subtitle": {
              "ar": "صفر ملاحظات رئيسية",
              "en": "Zero major findings"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          },
          {
            "title": {
              "ar": "تحديث مركز العمليات الأمنية",
              "en": "SOC platform update"
            },
            "subtitle": {
              "ar": "لوحة جديدة للرؤية الموحدة",
              "en": "New unified visibility console"
            },
            "time": {
              "ar": "قبل يومين",
              "en": "2 days ago"
            }
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "سجل التنبيهات خلال 24 ساعة",
          "en": "24h alert timeline"
        },
        "subtitle": {
          "ar": "تصنيف التنبيهات حسب المصدر والأولوية.",
          "en": "Alert classification by source and severity."
        },
        "action": {
          "ar": "عرض التفاصيل",
          "en": "View details"
        },
        "placeholder": {
          "ar": "مخطط التنبيهات",
          "en": "Alerts visual"
        }
      },
      {
        "id": "threats",
        "type": "list",
        "title": {
          "ar": "أهم الحوادث",
          "en": "Top incidents"
        },
        "action": {
          "ar": "تحديث كل دقيقة",
          "en": "Updated every minute"
        },
        "items": [
          {
            "icon": "shield",
            "title": {
              "ar": "محاولة تصعيد امتيازات",
              "en": "Privilege escalation attempt"
            },
            "subtitle": {
              "ar": "مركز البيانات الأوروبي",
              "en": "EU data centre"
            },
            "value": "تم الإحباط",
            "delta": {
              "ar": "حُظر على الفور",
              "en": "Blocked instantly"
            }
          },
          {
            "icon": "sparkles",
            "title": {
              "ar": "ملف خبيث موقّع",
              "en": "Signed malicious binary"
            },
            "subtitle": {
              "ar": "تم العزل في صندوق الرمل",
              "en": "Quarantined in sandbox"
            },
            "value": "تحليل جارٍ",
            "delta": {
              "ar": "ينتظر تقرير المختبر",
              "en": "Awaiting lab report"
            }
          },
          {
            "icon": "cog",
            "title": {
              "ar": "استثناء جدار ناري غير مطابق",
              "en": "Non-compliant firewall rule"
            },
            "subtitle": {
              "ar": "تم اكتشافه عبر التدقيق الآلي",
              "en": "Automated audit detection"
            },
            "value": "قيد الإصلاح",
            "delta": {
              "ar": "جارٍ مع الفريق الشبكي",
              "en": "Working with network team"
            }
          }
        ]
      }
    ],
    "id": "security",
    "slug": "dashboard-9.html",
    "layout": {
      "shell": "bg-slate-950/22",
      "main": "space-y-12 lg:px-15",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.45fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "أمن المعلومات",
        "en": "Security ops"
      },
      "title": {
        "ar": "قيادة دفاعات ذكية",
        "en": "Command adaptive defenses"
      },
      "description": {
        "ar": "مؤشرات تهديدات، استجابة، والتزام لحظية عبر بيئات متعددة وفرق الحماية.",
        "en": "Instant view of threats, response posture, and compliance across hybrid estates."
      },
      "tags": [
        {
          "ar": "تهديدات",
          "en": "Threats"
        },
        {
          "ar": "استجابة",
          "en": "Response"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "محاولات تم صدّها",
              "en": "Blocked attempts"
            },
            "value": {
              "ar": "2.3M",
              "en": "2.3M"
            }
          },
          {
            "label": {
              "ar": "متوسط زمن الاكتشاف",
              "en": "Mean time to detect"
            },
            "value": {
              "ar": "14 دقيقة",
              "en": "14 دقيقة"
            }
          },
          {
            "label": {
              "ar": "ثغرات حرجة مفتوحة",
              "en": "Open critical vulnerabilities"
            },
            "value": {
              "ar": "3",
              "en": "3"
            }
          }
        ]
      }
    ]
  },
  "finance": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة الخدمات المالية",
        "en": "Financial Services Performance Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "F",
      "name": {
        "ar": "إيقاع التمويل",
        "en": "Finance Pulse"
      },
      "tagline": {
        "ar": "إدارة الأصول، المخاطر، والعوائد في الوقت الفعلي",
        "en": "Real-time asset, risk, and revenue management"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-indigo-950 to-emerald-900",
        "sidebarGradient": "from-slate-950 via-indigo-900 to-emerald-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-indigo-500/35",
        "accentGradient": "from-indigo-400 via-emerald-400 to-amber-400",
        "accentText": "text-emerald-200",
        "highlightBg": "bg-indigo-500/15 border-indigo-500/35",
        "badgeBg": "bg-indigo-500/20",
        "badgeText": "text-white",
        "navActive": "border border-indigo-400/50 bg-indigo-500/15",
        "navIconBg": "bg-indigo-950/50",
        "navBadgeText": "text-indigo-200",
        "listBorder": "border border-emerald-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-emerald-500/10",
        "timelineChip": "bg-emerald-500/10 text-emerald-200",
        "tableHeaderBg": "bg-emerald-500/10",
        "cardShadow": "shadow-[0_36px_110px_-54px_rgba(79,70,229,0.7)]"
      },
      "light": {
        "bodyGradient": "from-indigo-50 via-white to-emerald-100",
        "sidebarGradient": "from-white via-indigo-50 to-emerald-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-indigo-200",
        "accentGradient": "from-indigo-400 via-emerald-400 to-amber-400",
        "accentText": "text-emerald-600",
        "highlightBg": "bg-indigo-500/10 border-indigo-200/60",
        "badgeBg": "bg-indigo-200/60",
        "badgeText": "text-indigo-900",
        "navActive": "border border-indigo-200 bg-indigo-500/10",
        "navIconBg": "bg-indigo-100",
        "navBadgeText": "text-indigo-700",
        "listBorder": "border border-emerald-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-emerald-100",
        "timelineChip": "bg-emerald-100 text-emerald-700",
        "tableHeaderBg": "bg-emerald-50/80",
        "cardShadow": "shadow-[0_32px_90px_-55px_rgba(79,70,229,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "bank",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "أساسي",
          "en": "Core"
        }
      },
      {
        "id": "portfolios",
        "icon": "chart-bar",
        "label": {
          "ar": "المحافظ",
          "en": "Portfolios"
        }
      },
      {
        "id": "risk",
        "icon": "scale",
        "label": {
          "ar": "المخاطر",
          "en": "Risk"
        }
      },
      {
        "id": "revenue",
        "icon": "sparkles",
        "label": {
          "ar": "الإيرادات",
          "en": "Revenue"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "مؤشر الأداء",
        "en": "Performance index"
      },
      "value": "126.4 نقطة",
      "description": {
        "ar": "تفوقت المحافظ المتوازنة على المؤشر المرجعي بنسبة 4.6% منذ بداية العام.",
        "en": "Balanced portfolios outperformed benchmark by 4.6% year-to-date."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة الخدمات المالية",
        "en": "Financial services dashboard"
      },
      "subtitle": {
        "ar": "مراقبة الأصول المدارة، العائدات، والمخاطر التشغيلية.",
        "en": "Monitor assets under management, returns, and operational risk."
      },
      "primary": {
        "ar": "إرسال تقرير تنفيذي",
        "en": "Send executive brief"
      },
      "secondary": {
        "ar": "مقارنة بالمؤشرات",
        "en": "Compare to benchmarks"
      }
    },
    "stats": [
      {
        "icon": "bank",
        "label": {
          "ar": "الأصول تحت الإدارة",
          "en": "Assets under management"
        },
        "value": "$3.8B",
        "delta": {
          "ar": "+6.2% منذ بداية العام",
          "en": "+6.2% year-to-date"
        },
        "trend": "positive"
      },
      {
        "icon": "sparkles",
        "label": {
          "ar": "الإيرادات اليومية",
          "en": "Daily revenue"
        },
        "value": "$12.4M",
        "delta": {
          "ar": "+1.3M عن المتوسط",
          "en": "+1.3M vs average"
        },
        "trend": "positive"
      },
      {
        "icon": "scale",
        "label": {
          "ar": "التعرّض للمخاطر",
          "en": "Risk exposure"
        },
        "value": "0.78",
        "delta": {
          "ar": "-0.05 مقارنة بالربع الماضي",
          "en": "-0.05 vs last quarter"
        },
        "trend": "positive"
      },
      {
        "icon": "heart",
        "label": {
          "ar": "احتفاظ العملاء",
          "en": "Client retention"
        },
        "value": "97%",
        "delta": {
          "ar": "+2 نقاط بعد مبادرة تجربة العملاء",
          "en": "+2 pts after CX initiative"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "$3.8B الأصول تحت الإدارة",
          "en": "$3.8B Assets under management"
        },
        "description": {
          "ar": "مراقبة الأصول المدارة، العائدات، والمخاطر التشغيلية.",
          "en": "Monitor assets under management, returns, and operational risk."
        },
        "bullets": [
          {
            "value": "$12.4M",
            "title": {
              "ar": "الإيرادات اليومية",
              "en": "Daily revenue"
            },
            "subtitle": {
              "ar": "+1.3M عن المتوسط",
              "en": "+1.3M vs average"
            }
          },
          {
            "value": "0.78",
            "title": {
              "ar": "التعرّض للمخاطر",
              "en": "Risk exposure"
            },
            "subtitle": {
              "ar": "-0.05 مقارنة بالربع الماضي",
              "en": "-0.05 vs last quarter"
            }
          },
          {
            "value": "97%",
            "title": {
              "ar": "احتفاظ العملاء",
              "en": "Client retention"
            },
            "subtitle": {
              "ar": "+2 نقاط بعد مبادرة تجربة العملاء",
              "en": "+2 pts after CX initiative"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "محفظة النمو العالمية",
                  "en": "Global growth fund"
                },
                "subtitle": {
                  "ar": "عائد سنوي 14.2%",
                  "en": "14.2% annual return"
                },
                "tags": [
                  {
                    "ar": "+1.8% هذا الشهر",
                    "en": "+1.8% this month"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "محفظة الدخل المتوازن",
                  "en": "Balanced income fund"
                },
                "subtitle": {
                  "ar": "انحراف معياري 0.62",
                  "en": "Std deviation 0.62"
                },
                "tags": [
                  {
                    "ar": "+0.9% نمو صافي",
                    "en": "+0.9% net growth"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "صندوق البنية التحتية",
                  "en": "Infrastructure fund"
                },
                "subtitle": {
                  "ar": "مشاريع طاقة وخدمات",
                  "en": "Energy and utilities projects"
                },
                "tags": [
                  {
                    "ar": "تدفقات جديدة 42M$",
                    "en": "New inflows $42M"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "الأصول تحت الإدارة",
              "en": "Assets under management"
            },
            "value": {
              "ar": "$3.8B",
              "en": "$3.8B"
            },
            "caption": {
              "ar": "+6.2% منذ بداية العام",
              "en": "+6.2% year-to-date"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "الإيرادات اليومية",
              "en": "Daily revenue"
            },
            "value": {
              "ar": "$12.4M",
              "en": "$12.4M"
            },
            "caption": {
              "ar": "+1.3M عن المتوسط",
              "en": "+1.3M vs average"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "التعرّض للمخاطر",
              "en": "Risk exposure"
            },
            "value": {
              "ar": "0.78",
              "en": "0.78"
            },
            "caption": {
              "ar": "-0.05 مقارنة بالربع الماضي",
              "en": "-0.05 vs last quarter"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "احتفاظ العملاء",
              "en": "Client retention"
            },
            "value": {
              "ar": "97%",
              "en": "97%"
            },
            "caption": {
              "ar": "+2 نقاط بعد مبادرة تجربة العملاء",
              "en": "+2 pts after CX initiative"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "أداء المحافظ",
          "en": "Portfolio performance"
        },
        "subtitle": {
          "ar": "العوائد الشهرية مقارنة بالمؤشرات الرئيسية.",
          "en": "Monthly returns vs key benchmarks."
        },
        "action": {
          "ar": "تنزيل CSV",
          "en": "Download CSV"
        },
        "placeholder": {
          "ar": "مخطط العوائد",
          "en": "Performance chart"
        }
      },
      {
        "id": "portfolios",
        "type": "list",
        "title": {
          "ar": "محافظ قيد المراقبة",
          "en": "Portfolios on watch"
        },
        "action": {
          "ar": "تحديث كل ساعتين",
          "en": "Updated every 2 hours"
        },
        "items": [
          {
            "icon": "chart-bar",
            "title": {
              "ar": "محفظة النمو العالمية",
              "en": "Global growth fund"
            },
            "subtitle": {
              "ar": "عائد سنوي 14.2%",
              "en": "14.2% annual return"
            },
            "value": "$820M",
            "delta": {
              "ar": "+1.8% هذا الشهر",
              "en": "+1.8% this month"
            }
          },
          {
            "icon": "scale",
            "title": {
              "ar": "محفظة الدخل المتوازن",
              "en": "Balanced income fund"
            },
            "subtitle": {
              "ar": "انحراف معياري 0.62",
              "en": "Std deviation 0.62"
            },
            "value": "$610M",
            "delta": {
              "ar": "+0.9% نمو صافي",
              "en": "+0.9% net growth"
            }
          },
          {
            "icon": "bank",
            "title": {
              "ar": "صندوق البنية التحتية",
              "en": "Infrastructure fund"
            },
            "subtitle": {
              "ar": "مشاريع طاقة وخدمات",
              "en": "Energy and utilities projects"
            },
            "value": "$480M",
            "delta": {
              "ar": "تدفقات جديدة 42M$",
              "en": "New inflows $42M"
            }
          }
        ]
      }
    ],
    "id": "finance",
    "slug": "dashboard-10.html",
    "layout": {
      "shell": "bg-slate-950/18",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-5 gap-6",
      "panels": "xl:grid-cols-[1.6fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "الخدمات المالية",
        "en": "Financial services"
      },
      "title": {
        "ar": "شفافية مالية لحظية",
        "en": "Realtime financial clarity"
      },
      "description": {
        "ar": "مراقبة الهوامش، المخاطر، وسير القوائم المالية مع تحكم بالسيناريوهات.",
        "en": "Watch margins, risk exposure, and close cycles with scenario control in one pane."
      },
      "tags": [
        {
          "ar": "مالية",
          "en": "Finance"
        },
        {
          "ar": "إدارة مخاطر",
          "en": "Risk"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "الأصول تحت الإدارة",
              "en": "Assets under management"
            },
            "value": {
              "ar": "$3.8B",
              "en": "$3.8B"
            }
          },
          {
            "label": {
              "ar": "الإيرادات اليومية",
              "en": "Daily revenue"
            },
            "value": {
              "ar": "$12.4M",
              "en": "$12.4M"
            }
          },
          {
            "label": {
              "ar": "التعرّض للمخاطر",
              "en": "Risk exposure"
            },
            "value": {
              "ar": "0.78",
              "en": "0.78"
            }
          }
        ]
      }
    ]
  },
  "health": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة عمليات الرعاية الصحية",
        "en": "Healthcare Operations Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "HC",
      "name": {
        "ar": "إدارة الرعاية",
        "en": "Care Command"
      },
      "tagline": {
        "ar": "تدفق المرضى، جودة الخدمة، والجاهزية السريرية",
        "en": "Patient flow, care quality, and bed readiness"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-teal-950 to-rose-900",
        "sidebarGradient": "from-slate-950 via-teal-900 to-rose-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-teal-500/35",
        "accentGradient": "from-teal-400 via-rose-400 to-sky-400",
        "accentText": "text-amber-200",
        "highlightBg": "bg-teal-500/15 border-teal-500/35",
        "badgeBg": "bg-teal-500/20",
        "badgeText": "text-white",
        "navActive": "border border-teal-400/50 bg-teal-500/15",
        "navIconBg": "bg-teal-950/50",
        "navBadgeText": "text-teal-200",
        "listBorder": "border border-teal-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-teal-500/10",
        "timelineChip": "bg-teal-500/10 text-teal-200",
        "tableHeaderBg": "bg-teal-500/10",
        "cardShadow": "shadow-[0_34px_110px_-54px_rgba(13,148,136,0.7)]"
      },
      "light": {
        "bodyGradient": "from-teal-50 via-white to-rose-100",
        "sidebarGradient": "from-white via-teal-50 to-rose-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-teal-200",
        "accentGradient": "from-teal-400 via-rose-400 to-sky-400",
        "accentText": "text-teal-600",
        "highlightBg": "bg-teal-500/10 border-teal-200/60",
        "badgeBg": "bg-teal-200/60",
        "badgeText": "text-teal-900",
        "navActive": "border border-teal-200 bg-teal-500/10",
        "navIconBg": "bg-teal-100",
        "navBadgeText": "text-teal-700",
        "listBorder": "border border-teal-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-teal-100",
        "timelineChip": "bg-teal-100 text-teal-700",
        "tableHeaderBg": "bg-teal-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(13,148,136,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "heart",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "رعاية",
          "en": "Care"
        }
      },
      {
        "id": "clinical",
        "icon": "stethoscope",
        "label": {
          "ar": "المؤشرات السريرية",
          "en": "Clinical metrics"
        }
      },
      {
        "id": "capacity",
        "icon": "users",
        "label": {
          "ar": "الطاقة الاستيعابية",
          "en": "Capacity"
        }
      },
      {
        "id": "finance",
        "icon": "bank",
        "label": {
          "ar": "المالية والإدارة",
          "en": "Finance & admin"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "مستوى الإنذار",
        "en": "Alert level"
      },
      "value": "مستقر",
      "description": {
        "ar": "وحدة العناية الحرجة تعمل بنسبة 92% وتتوفر أسرة احتياطية للطوارئ.",
        "en": "Critical care running at 92% with surge beds ready for emergencies."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة عمليات الرعاية الصحية",
        "en": "Healthcare operations dashboard"
      },
      "subtitle": {
        "ar": "راقب سلامة المرضى، الكفاءات السريرية، وكفاءة الموارد.",
        "en": "Monitor patient safety, clinical efficiency, and resource utilisation."
      },
      "primary": {
        "ar": "تفعيل خطة الطوارئ",
        "en": "Activate contingency plan"
      },
      "secondary": {
        "ar": "عرض تقرير الجودة",
        "en": "View quality report"
      }
    },
    "stats": [
      {
        "icon": "heart",
        "label": {
          "ar": "نسبة إشغال الأسرة",
          "en": "Bed occupancy"
        },
        "value": "84%",
        "delta": {
          "ar": "-3% عن الأسبوع الماضي",
          "en": "-3% vs last week"
        },
        "trend": "positive"
      },
      {
        "icon": "stethoscope",
        "label": {
          "ar": "متوسط انتظار العيادات",
          "en": "Average clinic wait time"
        },
        "value": "12 دقيقة",
        "delta": {
          "ar": "-5 دقائق بعد تحسين الجدولة",
          "en": "-5 minutes after scheduling optimisation"
        },
        "trend": "positive"
      },
      {
        "icon": "users",
        "label": {
          "ar": "توافر الطواقم",
          "en": "Staff availability"
        },
        "value": "92%",
        "delta": {
          "ar": "+4% بعد برنامج المناوبة الذكية",
          "en": "+4% with smart rostering"
        },
        "trend": "positive"
      },
      {
        "icon": "scale",
        "label": {
          "ar": "امتثال أحداث السلامة",
          "en": "Safety incident compliance"
        },
        "value": "99%",
        "delta": {
          "ar": "جميع الحوادث مُغلقة خلال 48 ساعة",
          "en": "All incidents closed within 48h"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "84% نسبة إشغال الأسرة",
          "en": "84% Bed occupancy"
        },
        "description": {
          "ar": "راقب سلامة المرضى، الكفاءات السريرية، وكفاءة الموارد.",
          "en": "Monitor patient safety, clinical efficiency, and resource utilisation."
        },
        "bullets": [
          {
            "value": "12 دقيقة",
            "title": {
              "ar": "متوسط انتظار العيادات",
              "en": "Average clinic wait time"
            },
            "subtitle": {
              "ar": "-5 دقائق بعد تحسين الجدولة",
              "en": "-5 minutes after scheduling optimisation"
            }
          },
          {
            "value": "92%",
            "title": {
              "ar": "توافر الطواقم",
              "en": "Staff availability"
            },
            "subtitle": {
              "ar": "+4% بعد برنامج المناوبة الذكية",
              "en": "+4% with smart rostering"
            }
          },
          {
            "value": "99%",
            "title": {
              "ar": "امتثال أحداث السلامة",
              "en": "Safety incident compliance"
            },
            "subtitle": {
              "ar": "جميع الحوادث مُغلقة خلال 48 ساعة",
              "en": "All incidents closed within 48h"
            }
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "إطلاق برنامج متابعة المنزل",
              "en": "Home monitoring programme launch"
            },
            "subtitle": {
              "ar": "يتضمن أجهزة تتبع حيوية",
              "en": "Includes remote vital devices"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "تحديث نظام الفوترة الطبية",
              "en": "Medical billing system refresh"
            },
            "subtitle": {
              "ar": "تكامل مع التأمين الصحي",
              "en": "Integrated with insurers"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          },
          {
            "title": {
              "ar": "مراجعة سلامة شهرية",
              "en": "Monthly safety review"
            },
            "subtitle": {
              "ar": "صفر حوادث عالية الخطورة",
              "en": "Zero high-risk events"
            },
            "time": {
              "ar": "قبل يومين",
              "en": "2 days ago"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "ارتفاع ضغط طارئ",
                  "en": "Hypertension escalation"
                },
                "subtitle": {
                  "ar": "جناح الباطنية",
                  "en": "Internal medicine ward"
                },
                "tags": [
                  {
                    "ar": "ممرضة مسؤولة تم تكليفها",
                    "en": "Charge nurse assigned"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "متابعة مضاد حيوي",
                  "en": "Antibiotic stewardship follow-up"
                },
                "subtitle": {
                  "ar": "قائمة مراجعة الجرعات متاحة",
                  "en": "Dosage checklist available"
                },
                "tags": [
                  {
                    "ar": "ينتظر موافقة الاستشاري",
                    "en": "Awaiting consultant sign-off"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "نقص فريق التمريض الليلي",
                  "en": "Night shift staffing gap"
                },
                "subtitle": {
                  "ar": "تغطية إضافية من الوحدة B",
                  "en": "Backfilled from Unit B"
                },
                "tags": [
                  {
                    "ar": "تمت جدولة المناوبة",
                    "en": "Shift scheduled"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "تدفق المرضى اليومي",
          "en": "Daily patient flow"
        },
        "subtitle": {
          "ar": "دخول، خروج، وتحويلات عبر الأقسام.",
          "en": "Admissions, discharges, and transfers across units."
        },
        "action": {
          "ar": "عرض حسب القسم",
          "en": "View by unit"
        },
        "placeholder": {
          "ar": "مخطط التدفق",
          "en": "Flow chart"
        }
      },
      {
        "id": "alerts",
        "type": "list",
        "title": {
          "ar": "تنبيهات سريرية",
          "en": "Clinical alerts"
        },
        "action": {
          "ar": "آخر تحديث 5 دقائق",
          "en": "Updated 5 minutes ago"
        },
        "items": [
          {
            "icon": "heart",
            "title": {
              "ar": "ارتفاع ضغط طارئ",
              "en": "Hypertension escalation"
            },
            "subtitle": {
              "ar": "جناح الباطنية",
              "en": "Internal medicine ward"
            },
            "value": "تم التدخل",
            "delta": {
              "ar": "ممرضة مسؤولة تم تكليفها",
              "en": "Charge nurse assigned"
            }
          },
          {
            "icon": "stethoscope",
            "title": {
              "ar": "متابعة مضاد حيوي",
              "en": "Antibiotic stewardship follow-up"
            },
            "subtitle": {
              "ar": "قائمة مراجعة الجرعات متاحة",
              "en": "Dosage checklist available"
            },
            "value": "قيد المراجعة",
            "delta": {
              "ar": "ينتظر موافقة الاستشاري",
              "en": "Awaiting consultant sign-off"
            }
          },
          {
            "icon": "users",
            "title": {
              "ar": "نقص فريق التمريض الليلي",
              "en": "Night shift staffing gap"
            },
            "subtitle": {
              "ar": "تغطية إضافية من الوحدة B",
              "en": "Backfilled from Unit B"
            },
            "value": "تم الحل",
            "delta": {
              "ar": "تمت جدولة المناوبة",
              "en": "Shift scheduled"
            }
          }
        ]
      }
    ],
    "id": "health",
    "slug": "dashboard-11.html",
    "layout": {
      "shell": "bg-slate-950/22",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.5fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "الصحة",
        "en": "Healthcare"
      },
      "title": {
        "ar": "تنسيق عمليات الرعاية",
        "en": "Coordinate clinical operations"
      },
      "description": {
        "ar": "لوحة موحدة للقدرة السريرية، سلامة المرضى، والعمليات الحرجة للمستشفيات.",
        "en": "Unified view of clinical capacity, patient safety, and hospital operations readiness."
      },
      "tags": [
        {
          "ar": "رعاية",
          "en": "Care"
        },
        {
          "ar": "تشغيل",
          "en": "Operations"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "نسبة إشغال الأسرة",
              "en": "Bed occupancy"
            },
            "value": {
              "ar": "84%",
              "en": "84%"
            }
          },
          {
            "label": {
              "ar": "متوسط انتظار العيادات",
              "en": "Average clinic wait time"
            },
            "value": {
              "ar": "12 دقيقة",
              "en": "12 دقيقة"
            }
          },
          {
            "label": {
              "ar": "توافر الطواقم",
              "en": "Staff availability"
            },
            "value": {
              "ar": "92%",
              "en": "92%"
            }
          }
        ]
      }
    ]
  },
  "marketing": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة حملات التسويق",
        "en": "Marketing Campaigns Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "MK",
      "name": {
        "ar": "نبض الحملات",
        "en": "Campaign Pulse"
      },
      "tagline": {
        "ar": "إدارة الأداء، القنوات، والأتمتة الذكية",
        "en": "Performance, channels, and smart automation"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-fuchsia-950 to-amber-900",
        "sidebarGradient": "from-slate-950 via-fuchsia-900 to-amber-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-fuchsia-500/35",
        "accentGradient": "from-fuchsia-400 via-amber-400 to-rose-400",
        "accentText": "text-pink-200",
        "highlightBg": "bg-fuchsia-500/15 border-fuchsia-500/35",
        "badgeBg": "bg-fuchsia-500/20",
        "badgeText": "text-white",
        "navActive": "border border-fuchsia-400/50 bg-fuchsia-500/15",
        "navIconBg": "bg-fuchsia-950/50",
        "navBadgeText": "text-fuchsia-200",
        "listBorder": "border border-pink-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-pink-500/10",
        "timelineChip": "bg-pink-500/10 text-pink-200",
        "tableHeaderBg": "bg-pink-500/10",
        "cardShadow": "shadow-[0_36px_110px_-54px_rgba(236,72,153,0.75)]"
      },
      "light": {
        "bodyGradient": "from-fuchsia-50 via-white to-amber-100",
        "sidebarGradient": "from-white via-fuchsia-50 to-amber-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-fuchsia-200",
        "accentGradient": "from-fuchsia-400 via-amber-400 to-rose-400",
        "accentText": "text-pink-600",
        "highlightBg": "bg-fuchsia-500/10 border-fuchsia-200/60",
        "badgeBg": "bg-fuchsia-200/60",
        "badgeText": "text-fuchsia-900",
        "navActive": "border border-fuchsia-200 bg-fuchsia-500/10",
        "navIconBg": "bg-fuchsia-100",
        "navBadgeText": "text-fuchsia-700",
        "listBorder": "border border-pink-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-pink-100",
        "timelineChip": "bg-pink-100 text-pink-700",
        "tableHeaderBg": "bg-pink-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(236,72,153,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "megaphone",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "مباشر",
          "en": "Live"
        }
      },
      {
        "id": "campaigns",
        "icon": "sparkles",
        "label": {
          "ar": "الحملات النشطة",
          "en": "Active campaigns"
        }
      },
      {
        "id": "channels",
        "icon": "tv",
        "label": {
          "ar": "القنوات والإعلانات",
          "en": "Channels & ads"
        }
      },
      {
        "id": "automation",
        "icon": "cog",
        "label": {
          "ar": "الأتمتة والتحسين",
          "en": "Automation & optimisation"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "حملة مميزة",
        "en": "Featured campaign"
      },
      "value": "إطلاق الخدمة السحابية",
      "description": {
        "ar": "تجاوز الهدف بنسبة 32% مع تكلفة اكتساب 18$.",
        "en": "Exceeded goal by 32% with $18 CPA."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة حملات التسويق",
        "en": "Marketing campaigns dashboard"
      },
      "subtitle": {
        "ar": "تتبع أداء القنوات، تحويل الحملات، وتجارب الرسائل.",
        "en": "Track channel performance, campaign conversions, and messaging experiments."
      },
      "primary": {
        "ar": "إطلاق حملة جديدة",
        "en": "Launch new campaign"
      },
      "secondary": {
        "ar": "تصدير تقرير الأداء",
        "en": "Export performance report"
      }
    },
    "stats": [
      {
        "icon": "megaphone",
        "label": {
          "ar": "العملاء المحتملون",
          "en": "Qualified leads"
        },
        "value": "48,200",
        "delta": {
          "ar": "+11% مقابل الشهر الماضي",
          "en": "+11% vs last month"
        },
        "trend": "positive"
      },
      {
        "icon": "sparkles",
        "label": {
          "ar": "عائد الإنفاق الإعلاني",
          "en": "Return on ad spend"
        },
        "value": "4.3x",
        "delta": {
          "ar": "+0.6 زيادة",
          "en": "+0.6 lift"
        },
        "trend": "positive"
      },
      {
        "icon": "tv",
        "label": {
          "ar": "معدل فتح البريد",
          "en": "Email open rate"
        },
        "value": "38%",
        "delta": {
          "ar": "+5 نقاط بفضل التخصيص",
          "en": "+5 pts due to personalisation"
        },
        "trend": "positive"
      },
      {
        "icon": "heart",
        "label": {
          "ar": "تفاعل اجتماعي",
          "en": "Social engagement"
        },
        "value": "67K",
        "delta": {
          "ar": "+14% نمو أسبوعي",
          "en": "+14% weekly growth"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "48,200 العملاء المحتملون",
          "en": "48,200 Qualified leads"
        },
        "description": {
          "ar": "تتبع أداء القنوات، تحويل الحملات، وتجارب الرسائل.",
          "en": "Track channel performance, campaign conversions, and messaging experiments."
        },
        "bullets": [
          {
            "value": "4.3x",
            "title": {
              "ar": "عائد الإنفاق الإعلاني",
              "en": "Return on ad spend"
            },
            "subtitle": {
              "ar": "+0.6 زيادة",
              "en": "+0.6 lift"
            }
          },
          {
            "value": "38%",
            "title": {
              "ar": "معدل فتح البريد",
              "en": "Email open rate"
            },
            "subtitle": {
              "ar": "+5 نقاط بفضل التخصيص",
              "en": "+5 pts due to personalisation"
            }
          },
          {
            "value": "67K",
            "title": {
              "ar": "تفاعل اجتماعي",
              "en": "Social engagement"
            },
            "subtitle": {
              "ar": "+14% نمو أسبوعي",
              "en": "+14% weekly growth"
            }
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "العملاء المحتملون",
              "en": "Qualified leads"
            },
            "value": {
              "ar": "48,200",
              "en": "48,200"
            },
            "caption": {
              "ar": "+11% مقابل الشهر الماضي",
              "en": "+11% vs last month"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "عائد الإنفاق الإعلاني",
              "en": "Return on ad spend"
            },
            "value": {
              "ar": "4.3x",
              "en": "4.3x"
            },
            "caption": {
              "ar": "+0.6 زيادة",
              "en": "+0.6 lift"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "معدل فتح البريد",
              "en": "Email open rate"
            },
            "value": {
              "ar": "38%",
              "en": "38%"
            },
            "caption": {
              "ar": "+5 نقاط بفضل التخصيص",
              "en": "+5 pts due to personalisation"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "تفاعل اجتماعي",
              "en": "Social engagement"
            },
            "value": {
              "ar": "67K",
              "en": "67K"
            },
            "caption": {
              "ar": "+14% نمو أسبوعي",
              "en": "+14% weekly growth"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "إطلاق نسخة الصفحة الرئيسية",
              "en": "Homepage variant launch"
            },
            "subtitle": {
              "ar": "اختبار A/B على 40% من الزوار",
              "en": "A/B test across 40% traffic"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "توقيع شراكة إعلامية",
              "en": "Media partnership signed"
            },
            "subtitle": {
              "ar": "حزم محتوى مشتركة للربع القادم",
              "en": "Co-branded content packages"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          },
          {
            "title": {
              "ar": "تحديث منصة الأتمتة",
              "en": "Automation platform update"
            },
            "subtitle": {
              "ar": "محرك تنبؤي لحجم الجمهور",
              "en": "Predictive audience sizing"
            },
            "time": {
              "ar": "قبل يومين",
              "en": "2 days ago"
            }
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "أداء القنوات المتعددة",
          "en": "Omnichannel performance"
        },
        "subtitle": {
          "ar": "الإنفاق، الزيارات، والتحويلات لكل قناة.",
          "en": "Spend, visits, and conversions by channel."
        },
        "action": {
          "ar": "تفاصيل حسب المنطقة",
          "en": "View by region"
        },
        "placeholder": {
          "ar": "مخطط الأداء",
          "en": "Performance chart"
        }
      },
      {
        "id": "campaigns",
        "type": "list",
        "title": {
          "ar": "حملات يجب مراقبتها",
          "en": "Campaigns to watch"
        },
        "action": {
          "ar": "مزامنة كل 30 دقيقة",
          "en": "Synced every 30 minutes"
        },
        "items": [
          {
            "icon": "sparkles",
            "title": {
              "ar": "سلسلة الويب المباشر",
              "en": "Live webinar series"
            },
            "subtitle": {
              "ar": "نسبة التحويل 12%",
              "en": "12% conversion rate"
            },
            "value": "$420K",
            "delta": {
              "ar": "+18% نمو",
              "en": "+18% growth"
            }
          },
          {
            "icon": "megaphone",
            "title": {
              "ar": "حملة المؤثرين الإقليمية",
              "en": "Regional influencer push"
            },
            "subtitle": {
              "ar": "تكلفة النقر 1.8$",
              "en": "CPC $1.8"
            },
            "value": "$260K",
            "delta": {
              "ar": "+9% وصول",
              "en": "+9% reach"
            }
          },
          {
            "icon": "tv",
            "title": {
              "ar": "سلسلة الإعلانات التلفزيونية المتصلة",
              "en": "Connected TV flight"
            },
            "subtitle": {
              "ar": "نسبة مشاهدة 91%",
              "en": "91% completion rate"
            },
            "value": "$310K",
            "delta": {
              "ar": "+4.2 ROAS",
              "en": "ROAS 4.2"
            }
          }
        ]
      }
    ],
    "id": "marketing",
    "slug": "dashboard-12.html",
    "layout": {
      "shell": "bg-slate-950/18",
      "main": "space-y-12 lg:px-15",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.35fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "التسويق",
        "en": "Marketing"
      },
      "title": {
        "ar": "ضبط حملات الأداء",
        "en": "Tune performance campaigns"
      },
      "description": {
        "ar": "رؤية كاملة لحملات القنوات المتعددة، الميزانيات، ونقاط التحويل.",
        "en": "Full-funnel command of omnichannel campaigns, spend pacing, and conversion moments."
      },
      "tags": [
        {
          "ar": "حملات",
          "en": "Campaigns"
        },
        {
          "ar": "قنوات",
          "en": "Channels"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "العملاء المحتملون",
              "en": "Qualified leads"
            },
            "value": {
              "ar": "48,200",
              "en": "48,200"
            }
          },
          {
            "label": {
              "ar": "عائد الإنفاق الإعلاني",
              "en": "Return on ad spend"
            },
            "value": {
              "ar": "4.3x",
              "en": "4.3x"
            }
          },
          {
            "label": {
              "ar": "معدل فتح البريد",
              "en": "Email open rate"
            },
            "value": {
              "ar": "38%",
              "en": "38%"
            }
          }
        ]
      }
    ]
  },
  "supply": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة سلسلة الإمداد",
        "en": "Supply Chain Command Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "SC",
      "name": {
        "ar": "نبض الإمداد",
        "en": "Supply Pulse"
      },
      "tagline": {
        "ar": "العمليات اللوجستية، المخزون، والشركاء",
        "en": "Logistics, inventory, and supplier orchestration"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-amber-950 to-slate-800",
        "sidebarGradient": "from-slate-950 via-amber-900 to-slate-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-amber-500/35",
        "accentGradient": "from-amber-400 via-slate-400 to-emerald-400",
        "accentText": "text-emerald-200",
        "highlightBg": "bg-amber-500/15 border-amber-500/35",
        "badgeBg": "bg-amber-500/20",
        "badgeText": "text-white",
        "navActive": "border border-amber-400/50 bg-amber-500/15",
        "navIconBg": "bg-slate-900/60",
        "navBadgeText": "text-amber-200",
        "listBorder": "border border-emerald-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-emerald-500/10",
        "timelineChip": "bg-emerald-500/10 text-emerald-200",
        "tableHeaderBg": "bg-emerald-500/10",
        "cardShadow": "shadow-[0_36px_110px_-54px_rgba(245,158,11,0.65)]"
      },
      "light": {
        "bodyGradient": "from-amber-50 via-white to-slate-100",
        "sidebarGradient": "from-white via-amber-50 to-slate-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-amber-200",
        "accentGradient": "from-amber-400 via-slate-400 to-emerald-400",
        "accentText": "text-emerald-600",
        "highlightBg": "bg-amber-500/10 border-amber-200/60",
        "badgeBg": "bg-amber-200/60",
        "badgeText": "text-amber-900",
        "navActive": "border border-amber-200 bg-amber-500/10",
        "navIconBg": "bg-amber-100",
        "navBadgeText": "text-amber-700",
        "listBorder": "border border-emerald-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-emerald-100",
        "timelineChip": "bg-emerald-100 text-emerald-700",
        "tableHeaderBg": "bg-emerald-50/80",
        "cardShadow": "shadow-[0_32px_90px_-55px_rgba(245,158,11,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "truck",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "سلسلة",
          "en": "Chain"
        }
      },
      {
        "id": "logistics",
        "icon": "map",
        "label": {
          "ar": "العمليات اللوجستية",
          "en": "Logistics"
        }
      },
      {
        "id": "inventory",
        "icon": "cube",
        "label": {
          "ar": "المخزون",
          "en": "Inventory"
        }
      },
      {
        "id": "suppliers",
        "icon": "factory",
        "label": {
          "ar": "الموردون والشركاء",
          "en": "Suppliers & partners"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "مستوى المخاطر",
        "en": "Risk level"
      },
      "value": "متوسط منخفض",
      "description": {
        "ar": "لا توجد اختناقات كبرى، تم تأمين النقل البري للربع القادم.",
        "en": "No major bottlenecks, road haulage secured for next quarter."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة سلسلة الإمداد",
        "en": "Supply chain dashboard"
      },
      "subtitle": {
        "ar": "تتبع تدفق الشحنات، تغطية المخزون، وأداء الموردين.",
        "en": "Track shipments, inventory coverage, and supplier performance."
      },
      "primary": {
        "ar": "إنشاء أمر شراء جماعي",
        "en": "Create bulk purchase order"
      },
      "secondary": {
        "ar": "عرض سيناريوهات المخاطر",
        "en": "View risk scenarios"
      }
    },
    "stats": [
      {
        "icon": "truck",
        "label": {
          "ar": "التسليم في الوقت",
          "en": "On-time deliveries"
        },
        "value": "94%",
        "delta": {
          "ar": "+3% بعد تحسين المسارات",
          "en": "+3% after route optimisation"
        },
        "trend": "positive"
      },
      {
        "icon": "map",
        "label": {
          "ar": "شحنات قيد النقل",
          "en": "Shipments in transit"
        },
        "value": "128",
        "delta": {
          "ar": "37% عبر البحر، 63% بري",
          "en": "37% ocean, 63% road"
        },
        "trend": "positive"
      },
      {
        "icon": "cube",
        "label": {
          "ar": "تغطية المخزون",
          "en": "Inventory coverage"
        },
        "value": "32 يوم",
        "delta": {
          "ar": "+4 أيام عن الهدف",
          "en": "+4 days vs target"
        },
        "trend": "positive"
      },
      {
        "icon": "factory",
        "label": {
          "ar": "تقييم الموردين",
          "en": "Supplier quality score"
        },
        "value": "87",
        "delta": {
          "ar": "+6 نقاط في ربع واحد",
          "en": "+6 points in one quarter"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "94% التسليم في الوقت",
          "en": "94% On-time deliveries"
        },
        "description": {
          "ar": "تتبع تدفق الشحنات، تغطية المخزون، وأداء الموردين.",
          "en": "Track shipments, inventory coverage, and supplier performance."
        },
        "bullets": [
          {
            "value": "128",
            "title": {
              "ar": "شحنات قيد النقل",
              "en": "Shipments in transit"
            },
            "subtitle": {
              "ar": "37% عبر البحر، 63% بري",
              "en": "37% ocean, 63% road"
            }
          },
          {
            "value": "32 يوم",
            "title": {
              "ar": "تغطية المخزون",
              "en": "Inventory coverage"
            },
            "subtitle": {
              "ar": "+4 أيام عن الهدف",
              "en": "+4 days vs target"
            }
          },
          {
            "value": "87",
            "title": {
              "ar": "تقييم الموردين",
              "en": "Supplier quality score"
            },
            "subtitle": {
              "ar": "+6 نقاط في ربع واحد",
              "en": "+6 points in one quarter"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "شنغهاي → روتردام",
                  "en": "Shanghai → Rotterdam"
                },
                "subtitle": {
                  "ar": "ETA خمسة أيام",
                  "en": "ETA five days"
                },
                "tags": [
                  {
                    "ar": "في الميناء 96 ساعة",
                    "en": "Port dwell 96h"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "شيكاغو → تورنتو",
                  "en": "Chicago → Toronto"
                },
                "subtitle": {
                  "ar": "تسليم سريع عبر السكك الحديدية",
                  "en": "Express rail service"
                },
                "tags": [
                  {
                    "ar": "في الموعد",
                    "en": "On schedule"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "مورد الإلكترونيات - فيتنام",
                  "en": "Electronics vendor - Vietnam"
                },
                "subtitle": {
                  "ar": "زيادة الطاقة 12%",
                  "en": "Capacity up 12%"
                },
                "tags": [
                  {
                    "ar": "يتطلب فحص جودة إضافي",
                    "en": "Extra QA required"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "التسليم في الوقت",
              "en": "On-time deliveries"
            },
            "value": {
              "ar": "94%",
              "en": "94%"
            },
            "caption": {
              "ar": "+3% بعد تحسين المسارات",
              "en": "+3% after route optimisation"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "شحنات قيد النقل",
              "en": "Shipments in transit"
            },
            "value": {
              "ar": "128",
              "en": "128"
            },
            "caption": {
              "ar": "37% عبر البحر، 63% بري",
              "en": "37% ocean, 63% road"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "تغطية المخزون",
              "en": "Inventory coverage"
            },
            "value": {
              "ar": "32 يوم",
              "en": "32 يوم"
            },
            "caption": {
              "ar": "+4 أيام عن الهدف",
              "en": "+4 days vs target"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "تقييم الموردين",
              "en": "Supplier quality score"
            },
            "value": {
              "ar": "87",
              "en": "87"
            },
            "caption": {
              "ar": "+6 نقاط في ربع واحد",
              "en": "+6 points in one quarter"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "تقدم الشحنات اليومية",
          "en": "Daily shipment progress"
        },
        "subtitle": {
          "ar": "حالة الشحنات حسب القارة ونوع النقل.",
          "en": "Shipment status by region and mode."
        },
        "action": {
          "ar": "عرض تفاصيل المسارات",
          "en": "View route details"
        },
        "placeholder": {
          "ar": "مخطط الشحنات",
          "en": "Shipments chart"
        }
      },
      {
        "id": "routes",
        "type": "list",
        "title": {
          "ar": "ممرات يجب مراقبتها",
          "en": "Lanes to monitor"
        },
        "action": {
          "ar": "تحديث كل ساعة",
          "en": "Updated hourly"
        },
        "items": [
          {
            "icon": "truck",
            "title": {
              "ar": "شنغهاي → روتردام",
              "en": "Shanghai → Rotterdam"
            },
            "subtitle": {
              "ar": "ETA خمسة أيام",
              "en": "ETA five days"
            },
            "value": "حاويات 220",
            "delta": {
              "ar": "في الميناء 96 ساعة",
              "en": "Port dwell 96h"
            }
          },
          {
            "icon": "map",
            "title": {
              "ar": "شيكاغو → تورنتو",
              "en": "Chicago → Toronto"
            },
            "subtitle": {
              "ar": "تسليم سريع عبر السكك الحديدية",
              "en": "Express rail service"
            },
            "value": "شحنات 78",
            "delta": {
              "ar": "في الموعد",
              "en": "On schedule"
            }
          },
          {
            "icon": "factory",
            "title": {
              "ar": "مورد الإلكترونيات - فيتنام",
              "en": "Electronics vendor - Vietnam"
            },
            "subtitle": {
              "ar": "زيادة الطاقة 12%",
              "en": "Capacity up 12%"
            },
            "value": "POD الأسبوع المقبل",
            "delta": {
              "ar": "يتطلب فحص جودة إضافي",
              "en": "Extra QA required"
            }
          }
        ]
      }
    ],
    "id": "supply",
    "slug": "dashboard-13.html",
    "layout": {
      "shell": "bg-slate-950/20",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.6fr_1fr] gap-y-10"
    },
    "gallery": {
      "badge": {
        "ar": "سلسلة التوريد",
        "en": "Supply chain"
      },
      "title": {
        "ar": "رؤية شاملة للتوريد",
        "en": "End-to-end supply visibility"
      },
      "description": {
        "ar": "مراقبة الطلب، المخزون، والشحن عبر الشبكات اللوجستية العالمية.",
        "en": "Monitor demand, inventory, and logistics execution across global networks."
      },
      "tags": [
        {
          "ar": "لوجستيات",
          "en": "Logistics"
        },
        {
          "ar": "تخطيط",
          "en": "Planning"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "التسليم في الوقت",
              "en": "On-time deliveries"
            },
            "value": {
              "ar": "94%",
              "en": "94%"
            }
          },
          {
            "label": {
              "ar": "شحنات قيد النقل",
              "en": "Shipments in transit"
            },
            "value": {
              "ar": "128",
              "en": "128"
            }
          },
          {
            "label": {
              "ar": "تغطية المخزون",
              "en": "Inventory coverage"
            },
            "value": {
              "ar": "32 يوم",
              "en": "32 يوم"
            }
          }
        ]
      }
    ]
  },
  "realestate": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة إدارة العقارات",
        "en": "Real Estate Portfolio Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "RE",
      "name": {
        "ar": "مركز الأصول",
        "en": "Asset Center"
      },
      "tagline": {
        "ar": "الإشغال، الإيرادات، وصحة الأصول العقارية",
        "en": "Occupancy, revenue, and asset health insights"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-emerald-900 to-stone-900",
        "sidebarGradient": "from-slate-950 via-emerald-900 to-stone-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-emerald-500/30",
        "accentGradient": "from-emerald-400 via-stone-400 to-blue-400",
        "accentText": "text-blue-200",
        "highlightBg": "bg-emerald-500/15 border-emerald-500/30",
        "badgeBg": "bg-emerald-500/20",
        "badgeText": "text-white",
        "navActive": "border border-emerald-400/50 bg-emerald-500/15",
        "navIconBg": "bg-stone-900/60",
        "navBadgeText": "text-emerald-200",
        "listBorder": "border border-indigo-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-indigo-500/10",
        "timelineChip": "bg-indigo-500/10 text-indigo-200",
        "tableHeaderBg": "bg-indigo-500/10",
        "cardShadow": "shadow-[0_32px_100px_-50px_rgba(16,185,129,0.55)]"
      },
      "light": {
        "bodyGradient": "from-emerald-50 via-white to-stone-100",
        "sidebarGradient": "from-white via-emerald-50 to-stone-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-emerald-200",
        "accentGradient": "from-emerald-400 via-stone-400 to-blue-400",
        "accentText": "text-indigo-600",
        "highlightBg": "bg-emerald-500/10 border-emerald-200/60",
        "badgeBg": "bg-emerald-200/60",
        "badgeText": "text-emerald-900",
        "navActive": "border border-emerald-200 bg-emerald-500/10",
        "navIconBg": "bg-emerald-100",
        "navBadgeText": "text-emerald-700",
        "listBorder": "border border-indigo-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-indigo-100",
        "timelineChip": "bg-indigo-100 text-indigo-700",
        "tableHeaderBg": "bg-indigo-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(16,185,129,0.28)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "building",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "محفظة",
          "en": "Portfolio"
        }
      },
      {
        "id": "listings",
        "icon": "map",
        "label": {
          "ar": "العقارات والإدراجات",
          "en": "Properties & listings"
        }
      },
      {
        "id": "occupancy",
        "icon": "users",
        "label": {
          "ar": "الإشغال والإيجارات",
          "en": "Occupancy & leasing"
        }
      },
      {
        "id": "revenue",
        "icon": "bank",
        "label": {
          "ar": "الإيرادات والتكاليف",
          "en": "Revenue & costs"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "أولوية الأسبوع",
        "en": "Priority of the week"
      },
      "value": "خطة تحديث برج المينا",
      "description": {
        "ar": "رفع جودة الخدمات للمستأجرين المميزين وتحسين استدامة الطاقة.",
        "en": "Enhancing premium tenant services and improving energy efficiency."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة إدارة العقارات",
        "en": "Real estate management dashboard"
      },
      "subtitle": {
        "ar": "مراقبة الإشغال، التدفقات المالية، وحالة الأصول عبر المحافظ.",
        "en": "Monitor occupancy, financial flows, and asset condition across portfolios."
      },
      "primary": {
        "ar": "إطلاق حملة تأجير",
        "en": "Launch leasing campaign"
      },
      "secondary": {
        "ar": "تحميل تقرير الملاك",
        "en": "Download owner report"
      }
    },
    "stats": [
      {
        "icon": "building",
        "label": {
          "ar": "نسبة الإشغال",
          "en": "Portfolio occupancy"
        },
        "value": "91%",
        "delta": {
          "ar": "+2 نقاط منذ الربع الماضي",
          "en": "+2 pts vs last quarter"
        },
        "trend": "positive"
      },
      {
        "icon": "sparkles",
        "label": {
          "ar": "عقود جديدة هذا الشهر",
          "en": "New leases this month"
        },
        "value": "38",
        "delta": {
          "ar": "+9 عقود مقارنة بالسنة الماضية",
          "en": "+9 YoY"
        },
        "trend": "positive"
      },
      {
        "icon": "bank",
        "label": {
          "ar": "صفقات قيد التفاوض",
          "en": "Deals in pipeline"
        },
        "value": "$124M",
        "delta": {
          "ar": "زيادة 18M$ خلال أسبوعين",
          "en": "$18M increase in 2 weeks"
        },
        "trend": "positive"
      },
      {
        "icon": "cog",
        "label": {
          "ar": "طلبات الصيانة المفتوحة",
          "en": "Open maintenance requests"
        },
        "value": "54",
        "delta": {
          "ar": "-22% بعد نظام التتبع",
          "en": "-22% after tracking rollout"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "91% نسبة الإشغال",
          "en": "91% Portfolio occupancy"
        },
        "description": {
          "ar": "مراقبة الإشغال، التدفقات المالية، وحالة الأصول عبر المحافظ.",
          "en": "Monitor occupancy, financial flows, and asset condition across portfolios."
        },
        "bullets": [
          {
            "value": "38",
            "title": {
              "ar": "عقود جديدة هذا الشهر",
              "en": "New leases this month"
            },
            "subtitle": {
              "ar": "+9 عقود مقارنة بالسنة الماضية",
              "en": "+9 YoY"
            }
          },
          {
            "value": "$124M",
            "title": {
              "ar": "صفقات قيد التفاوض",
              "en": "Deals in pipeline"
            },
            "subtitle": {
              "ar": "زيادة 18M$ خلال أسبوعين",
              "en": "$18M increase in 2 weeks"
            }
          },
          {
            "value": "54",
            "title": {
              "ar": "طلبات الصيانة المفتوحة",
              "en": "Open maintenance requests"
            },
            "subtitle": {
              "ar": "-22% بعد نظام التتبع",
              "en": "-22% after tracking rollout"
            }
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "افتتاح صالة المستأجرين الجديدة",
              "en": "Tenant lounge opening"
            },
            "subtitle": {
              "ar": "تجربة ضيافة متكاملة في وسط المدينة",
              "en": "Hospitality experience in downtown tower"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "تحديث نظام إدارة الممتلكات",
              "en": "Property management system update"
            },
            "subtitle": {
              "ar": "تكامل مع واجهة تحليلات البيانات",
              "en": "Integrated with analytics workspace"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          },
          {
            "title": {
              "ar": "تمويل تطوير جديد",
              "en": "New development financing"
            },
            "subtitle": {
              "ar": "تسهيلات بقيمة 220M$",
              "en": "$220M facility secured"
            },
            "time": {
              "ar": "قبل يومين",
              "en": "2 days ago"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "برج الخليج للأعمال",
                  "en": "Gulf Business Tower"
                },
                "subtitle": {
                  "ar": "تجديد طابق كامل قيد التنفيذ",
                  "en": "Floor refurbishment in progress"
                },
                "tags": [
                  {
                    "ar": "متوسط إيجار 64$/قدم²",
                    "en": "Avg rent $64/sqft"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "حدائق السكن الذكية",
                  "en": "Smart Gardens Residences"
                },
                "subtitle": {
                  "ar": "قائمة انتظار إيجار 41 عائلة",
                  "en": "Waitlist of 41 families"
                },
                "tags": [
                  {
                    "ar": "تقييم رضا 4.8/5",
                    "en": "Satisfaction 4.8/5"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "مجمع الميناء اللوجستي",
                  "en": "Harbour Logistics Park"
                },
                "subtitle": {
                  "ar": "تجديد عقد مع مستأجر رئيسي",
                  "en": "Renewal with anchor tenant"
                },
                "tags": [
                  {
                    "ar": "فرصة توسعة 45K متر²",
                    "en": "Expansion opportunity 45K sqm"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "العوائد الشهرية للمحافظ",
          "en": "Monthly returns by portfolio"
        },
        "subtitle": {
          "ar": "المباني المكتبية، السكنية، والتجارية.",
          "en": "Office, residential, and retail assets."
        },
        "action": {
          "ar": "عرض حسب المنطقة",
          "en": "View by region"
        },
        "placeholder": {
          "ar": "مخطط العوائد",
          "en": "Returns chart"
        }
      },
      {
        "id": "properties",
        "type": "list",
        "title": {
          "ar": "عقارات تستحق الانتباه",
          "en": "Properties to watch"
        },
        "action": {
          "ar": "تحديث مرتين يومياً",
          "en": "Updated twice daily"
        },
        "items": [
          {
            "icon": "building",
            "title": {
              "ar": "برج الخليج للأعمال",
              "en": "Gulf Business Tower"
            },
            "subtitle": {
              "ar": "تجديد طابق كامل قيد التنفيذ",
              "en": "Floor refurbishment in progress"
            },
            "value": "إشغال 96%",
            "delta": {
              "ar": "متوسط إيجار 64$/قدم²",
              "en": "Avg rent $64/sqft"
            }
          },
          {
            "icon": "map",
            "title": {
              "ar": "حدائق السكن الذكية",
              "en": "Smart Gardens Residences"
            },
            "subtitle": {
              "ar": "قائمة انتظار إيجار 41 عائلة",
              "en": "Waitlist of 41 families"
            },
            "value": "إشغال 99%",
            "delta": {
              "ar": "تقييم رضا 4.8/5",
              "en": "Satisfaction 4.8/5"
            }
          },
          {
            "icon": "bank",
            "title": {
              "ar": "مجمع الميناء اللوجستي",
              "en": "Harbour Logistics Park"
            },
            "subtitle": {
              "ar": "تجديد عقد مع مستأجر رئيسي",
              "en": "Renewal with anchor tenant"
            },
            "value": "عائد 12%",
            "delta": {
              "ar": "فرصة توسعة 45K متر²",
              "en": "Expansion opportunity 45K sqm"
            }
          }
        ]
      }
    ],
    "id": "realestate",
    "slug": "dashboard-14.html",
    "layout": {
      "shell": "bg-slate-950/18",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.4fr_1fr] gap-y-10"
    },
    "gallery": {
      "badge": {
        "ar": "العقارات",
        "en": "Real estate"
      },
      "title": {
        "ar": "إدارة الأصول المتعددة",
        "en": "Manage multi-asset portfolios"
      },
      "description": {
        "ar": "تحكم في الإشغال، العوائد، وتحليل المحافظ العقارية عبر المدن.",
        "en": "Command occupancy, yields, and asset mix analytics across urban portfolios."
      },
      "tags": [
        {
          "ar": "أصول",
          "en": "Assets"
        },
        {
          "ar": "إيرادات",
          "en": "Revenue"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "نسبة الإشغال",
              "en": "Portfolio occupancy"
            },
            "value": {
              "ar": "91%",
              "en": "91%"
            }
          },
          {
            "label": {
              "ar": "عقود جديدة هذا الشهر",
              "en": "New leases this month"
            },
            "value": {
              "ar": "38",
              "en": "38"
            }
          },
          {
            "label": {
              "ar": "صفقات قيد التفاوض",
              "en": "Deals in pipeline"
            },
            "value": {
              "ar": "$124M",
              "en": "$124M"
            }
          }
        ]
      }
    ]
  },
  "manufacturing": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة العمليات التصنيعية",
        "en": "Manufacturing Operations Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "MF",
      "name": {
        "ar": "مركز الإنتاج",
        "en": "Production Hub"
      },
      "tagline": {
        "ar": "الإنتاجية، الجودة، وصيانة المصنع في الوقت الفعلي",
        "en": "Productivity, quality, and plant maintenance in real time"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-orange-950 to-slate-800",
        "sidebarGradient": "from-slate-950 via-orange-900 to-slate-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-orange-500/35",
        "accentGradient": "from-orange-400 via-amber-400 to-slate-400",
        "accentText": "text-amber-200",
        "highlightBg": "bg-orange-500/15 border-orange-500/35",
        "badgeBg": "bg-orange-500/20",
        "badgeText": "text-white",
        "navActive": "border border-orange-400/50 bg-orange-500/15",
        "navIconBg": "bg-slate-900/60",
        "navBadgeText": "text-orange-200",
        "listBorder": "border border-amber-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-amber-500/10",
        "timelineChip": "bg-amber-500/10 text-amber-200",
        "tableHeaderBg": "bg-amber-500/10",
        "cardShadow": "shadow-[0_36px_110px_-54px_rgba(234,88,12,0.65)]"
      },
      "light": {
        "bodyGradient": "from-orange-50 via-white to-slate-100",
        "sidebarGradient": "from-white via-orange-50 to-slate-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-orange-200",
        "accentGradient": "from-orange-400 via-amber-400 to-slate-400",
        "accentText": "text-amber-600",
        "highlightBg": "bg-orange-500/10 border-orange-200/60",
        "badgeBg": "bg-orange-200/60",
        "badgeText": "text-orange-900",
        "navActive": "border border-orange-200 bg-orange-500/10",
        "navIconBg": "bg-orange-100",
        "navBadgeText": "text-orange-700",
        "listBorder": "border border-amber-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-amber-100",
        "timelineChip": "bg-amber-100 text-amber-700",
        "tableHeaderBg": "bg-amber-50/80",
        "cardShadow": "shadow-[0_32px_90px_-55px_rgba(234,88,12,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "factory",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "مصنع",
          "en": "Plant"
        }
      },
      {
        "id": "production",
        "icon": "chart-bar",
        "label": {
          "ar": "أداء الإنتاج",
          "en": "Production performance"
        }
      },
      {
        "id": "quality",
        "icon": "scale",
        "label": {
          "ar": "الجودة والعيوب",
          "en": "Quality & defects"
        }
      },
      {
        "id": "maintenance",
        "icon": "cog",
        "label": {
          "ar": "الصيانة والجاهزية",
          "en": "Maintenance & readiness"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "حالة المصنع",
        "en": "Plant status"
      },
      "value": "تشغيل مستقر",
      "description": {
        "ar": "خط الإنتاج 3 يعمل بالطاقة القصوى، خطة صيانة وقائية تبدأ غداً.",
        "en": "Line 3 running at peak load, preventive maintenance scheduled tomorrow."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة العمليات التصنيعية",
        "en": "Manufacturing operations dashboard"
      },
      "subtitle": {
        "ar": "راقب الإنتاج، الجودة، والصيانة في جميع الخطوط.",
        "en": "Monitor output, quality, and maintenance across lines."
      },
      "primary": {
        "ar": "ضبط خطة الإنتاج",
        "en": "Adjust production plan"
      },
      "secondary": {
        "ar": "إرسال تقرير المصنع",
        "en": "Send plant report"
      }
    },
    "stats": [
      {
        "icon": "factory",
        "label": {
          "ar": "معدل الإنتاج اللحظي",
          "en": "Real-time throughput"
        },
        "value": "1,240 وحدة/ساعة",
        "delta": {
          "ar": "+6% عن متوسط الأسبوع",
          "en": "+6% vs weekly average"
        },
        "trend": "positive"
      },
      {
        "icon": "chart-bar",
        "label": {
          "ar": "الكفاءة الشاملة للمعدات",
          "en": "Overall equipment effectiveness"
        },
        "value": "87%",
        "delta": {
          "ar": "+4 نقاط بعد تحسين الإعداد",
          "en": "+4 pts after setup optimisation"
        },
        "trend": "positive"
      },
      {
        "icon": "scale",
        "label": {
          "ar": "نسبة الهدر",
          "en": "Scrap rate"
        },
        "value": "2.1%",
        "delta": {
          "ar": "-0.7 نقطة بفضل مراقبة الجودة",
          "en": "-0.7 pts with inline QA"
        },
        "trend": "positive"
      },
      {
        "icon": "cog",
        "label": {
          "ar": "توقف مخطط للأسبوع",
          "en": "Planned downtime this week"
        },
        "value": "18 ساعة",
        "delta": {
          "ar": "3 ساعات أقل من الميزانية",
          "en": "3 hours under budget"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "1,240 وحدة/ساعة معدل الإنتاج اللحظي",
          "en": "1,240 وحدة/ساعة Real-time throughput"
        },
        "description": {
          "ar": "راقب الإنتاج، الجودة، والصيانة في جميع الخطوط.",
          "en": "Monitor output, quality, and maintenance across lines."
        },
        "bullets": [
          {
            "value": "87%",
            "title": {
              "ar": "الكفاءة الشاملة للمعدات",
              "en": "Overall equipment effectiveness"
            },
            "subtitle": {
              "ar": "+4 نقاط بعد تحسين الإعداد",
              "en": "+4 pts after setup optimisation"
            }
          },
          {
            "value": "2.1%",
            "title": {
              "ar": "نسبة الهدر",
              "en": "Scrap rate"
            },
            "subtitle": {
              "ar": "-0.7 نقطة بفضل مراقبة الجودة",
              "en": "-0.7 pts with inline QA"
            }
          },
          {
            "value": "18 ساعة",
            "title": {
              "ar": "توقف مخطط للأسبوع",
              "en": "Planned downtime this week"
            },
            "subtitle": {
              "ar": "3 ساعات أقل من الميزانية",
              "en": "3 hours under budget"
            }
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "معدل الإنتاج اللحظي",
              "en": "Real-time throughput"
            },
            "value": {
              "ar": "1,240 وحدة/ساعة",
              "en": "1,240 وحدة/ساعة"
            },
            "caption": {
              "ar": "+6% عن متوسط الأسبوع",
              "en": "+6% vs weekly average"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "الكفاءة الشاملة للمعدات",
              "en": "Overall equipment effectiveness"
            },
            "value": {
              "ar": "87%",
              "en": "87%"
            },
            "caption": {
              "ar": "+4 نقاط بعد تحسين الإعداد",
              "en": "+4 pts after setup optimisation"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "نسبة الهدر",
              "en": "Scrap rate"
            },
            "value": {
              "ar": "2.1%",
              "en": "2.1%"
            },
            "caption": {
              "ar": "-0.7 نقطة بفضل مراقبة الجودة",
              "en": "-0.7 pts with inline QA"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "توقف مخطط للأسبوع",
              "en": "Planned downtime this week"
            },
            "value": {
              "ar": "18 ساعة",
              "en": "18 ساعة"
            },
            "caption": {
              "ar": "3 ساعات أقل من الميزانية",
              "en": "3 hours under budget"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "تشغيل خط التغليف الجديد",
              "en": "New packaging line launched"
            },
            "subtitle": {
              "ar": "زيادة الطاقة بمقدار 14%",
              "en": "Capacity up 14%"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "تجربة نظام رؤية بالذكاء الاصطناعي",
              "en": "AI vision pilot deployed"
            },
            "subtitle": {
              "ar": "رصد العيوب في الوقت الحقيقي",
              "en": "Real-time defect detection"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          },
          {
            "title": {
              "ar": "تحديث لوحة التشغيل",
              "en": "Operations dashboard update"
            },
            "subtitle": {
              "ar": "مؤشرات الأداء المباشرة لكل خط",
              "en": "Live KPIs for each line"
            },
            "time": {
              "ar": "قبل يومين",
              "en": "2 days ago"
            }
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "إنتاج خطوط التصنيع",
          "en": "Production by line"
        },
        "subtitle": {
          "ar": "ساعات العمل الفعلية مقابل المخطط لكل خط.",
          "en": "Actual vs planned runtime for each line."
        },
        "action": {
          "ar": "تفاصيل حسب الوردية",
          "en": "View by shift"
        },
        "placeholder": {
          "ar": "مخطط الإنتاج",
          "en": "Production chart"
        }
      },
      {
        "id": "alerts",
        "type": "list",
        "title": {
          "ar": "تنبيهات حرجة",
          "en": "Critical alerts"
        },
        "action": {
          "ar": "آخر تحديث 10 دقائق",
          "en": "Updated 10 minutes ago"
        },
        "items": [
          {
            "icon": "cog",
            "title": {
              "ar": "اهتزاز عالٍ على خط التغليف",
              "en": "High vibration on packaging line"
            },
            "subtitle": {
              "ar": "تم تخفيض السرعة حتى المعاينة",
              "en": "Speed reduced pending inspection"
            },
            "value": "قيد المعالجة",
            "delta": {
              "ar": "فريق الصيانة في الطريق",
              "en": "Maintenance en route"
            }
          },
          {
            "icon": "scale",
            "title": {
              "ar": "زيادة عيوب الجودة في خط 2",
              "en": "Quality spike on line 2"
            },
            "subtitle": {
              "ar": "التحليل يشير إلى مادة خام جديدة",
              "en": "Linked to new raw batch"
            },
            "value": "تم التحقيق",
            "delta": {
              "ar": "جارٍ تعديل المورد",
              "en": "Supplier adjustment underway"
            }
          },
          {
            "icon": "factory",
            "title": {
              "ar": "استهلاك طاقة أعلى من المتوقع",
              "en": "Energy consumption above target"
            },
            "subtitle": {
              "ar": "قيد المراقبة مع فريق الطاقة",
              "en": "Energy team monitoring"
            },
            "value": "تنبيه متوسط",
            "delta": {
              "ar": "توصية بتحديث المحركات",
              "en": "Recommendation: motor upgrade"
            }
          }
        ]
      }
    ],
    "id": "manufacturing",
    "slug": "dashboard-15.html",
    "layout": {
      "shell": "bg-slate-950/22",
      "main": "space-y-12 lg:px-15",
      "stats": "md:grid-cols-2 xl:grid-cols-5 gap-6",
      "panels": "xl:grid-cols-[1.55fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "التصنيع",
        "en": "Manufacturing"
      },
      "title": {
        "ar": "إيقاع إنتاج مثالي",
        "en": "Perfect the production rhythm"
      },
      "description": {
        "ar": "تحليل خطوط الإنتاج، جودة المنتجات، وصيانة المعدات في الوقت الحقيقي.",
        "en": "Realtime analysis of production lines, quality yields, and maintenance readiness."
      },
      "tags": [
        {
          "ar": "عمليات",
          "en": "Operations"
        },
        {
          "ar": "جودة",
          "en": "Quality"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "معدل الإنتاج اللحظي",
              "en": "Real-time throughput"
            },
            "value": {
              "ar": "1,240 وحدة/ساعة",
              "en": "1,240 وحدة/ساعة"
            }
          },
          {
            "label": {
              "ar": "الكفاءة الشاملة للمعدات",
              "en": "Overall equipment effectiveness"
            },
            "value": {
              "ar": "87%",
              "en": "87%"
            }
          },
          {
            "label": {
              "ar": "نسبة الهدر",
              "en": "Scrap rate"
            },
            "value": {
              "ar": "2.1%",
              "en": "2.1%"
            }
          }
        ]
      }
    ]
  },
  "streaming": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة منصة البث",
        "en": "Streaming Service Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "MS",
      "name": {
        "ar": "نبض البث",
        "en": "Stream Pulse"
      },
      "tagline": {
        "ar": "الاشتراكات، المحتوى، وجودة التجربة",
        "en": "Subscriptions, content, and experience quality"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-violet-950 to-rose-900",
        "sidebarGradient": "from-slate-950 via-violet-900 to-rose-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-violet-500/35",
        "accentGradient": "from-violet-400 via-rose-400 to-amber-400",
        "accentText": "text-indigo-200",
        "highlightBg": "bg-violet-500/15 border-violet-500/35",
        "badgeBg": "bg-violet-500/20",
        "badgeText": "text-white",
        "navActive": "border border-violet-400/50 bg-violet-500/15",
        "navIconBg": "bg-violet-950/50",
        "navBadgeText": "text-violet-200",
        "listBorder": "border border-fuchsia-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-fuchsia-500/10",
        "timelineChip": "bg-fuchsia-500/10 text-fuchsia-200",
        "tableHeaderBg": "bg-fuchsia-500/10",
        "cardShadow": "shadow-[0_36px_110px_-54px_rgba(168,85,247,0.75)]"
      },
      "light": {
        "bodyGradient": "from-violet-50 via-white to-rose-100",
        "sidebarGradient": "from-white via-violet-50 to-rose-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-violet-200",
        "accentGradient": "from-violet-400 via-rose-400 to-amber-400",
        "accentText": "text-fuchsia-600",
        "highlightBg": "bg-violet-500/10 border-violet-200/60",
        "badgeBg": "bg-violet-200/60",
        "badgeText": "text-violet-900",
        "navActive": "border border-violet-200 bg-violet-500/10",
        "navIconBg": "bg-violet-100",
        "navBadgeText": "text-violet-700",
        "listBorder": "border border-fuchsia-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-fuchsia-100",
        "timelineChip": "bg-fuchsia-100 text-fuchsia-700",
        "tableHeaderBg": "bg-fuchsia-50/80",
        "cardShadow": "shadow-[0_32px_90px_-55px_rgba(168,85,247,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "play",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "بث",
          "en": "Stream"
        }
      },
      {
        "id": "content",
        "icon": "sparkles",
        "label": {
          "ar": "المحتوى والأصناف",
          "en": "Content & genres"
        }
      },
      {
        "id": "subscribers",
        "icon": "users",
        "label": {
          "ar": "المشتركين والتحويل",
          "en": "Subscribers & conversion"
        }
      },
      {
        "id": "performance",
        "icon": "tv",
        "label": {
          "ar": "الأداء التقني",
          "en": "Technical performance"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "إصدار مميز",
        "en": "Featured release"
      },
      "value": "مسلسل الخيال العلمي - الموسم 2",
      "description": {
        "ar": "حقق 2.4M مشاهدة في 24 ساعة مع تقييم 4.7/5.",
        "en": "Reached 2.4M views in 24h with 4.7/5 rating."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة منصة البث",
        "en": "Streaming platform dashboard"
      },
      "subtitle": {
        "ar": "إدارة المشتركين، أداء المحتوى، وجاهزية الشبكة.",
        "en": "Manage subscribers, content performance, and network readiness."
      },
      "primary": {
        "ar": "إطلاق حملة ترويجية",
        "en": "Launch promo campaign"
      },
      "secondary": {
        "ar": "عرض تقرير المحتوى",
        "en": "View content report"
      }
    },
    "stats": [
      {
        "icon": "users",
        "label": {
          "ar": "مشتركين نشطين",
          "en": "Active subscribers"
        },
        "value": "3.2M",
        "delta": {
          "ar": "+120K خلال الشهر",
          "en": "+120K this month"
        },
        "trend": "positive"
      },
      {
        "icon": "play",
        "label": {
          "ar": "عدد المشاهدات اليومية",
          "en": "Daily streams"
        },
        "value": "18.4M",
        "delta": {
          "ar": "+14% بعد إطلاق الموسم",
          "en": "+14% after season launch"
        },
        "trend": "positive"
      },
      {
        "icon": "tv",
        "label": {
          "ar": "معدل التخزين المؤقت",
          "en": "Buffering ratio"
        },
        "value": "0.9%",
        "delta": {
          "ar": "-0.3 نقطة بفضل تحسين CDN",
          "en": "-0.3 pts with CDN tuning"
        },
        "trend": "positive"
      },
      {
        "icon": "sparkles",
        "label": {
          "ar": "وقت مشاهدة أفضل تصنيف",
          "en": "Top genre watchtime"
        },
        "value": "6.3M ساعة",
        "delta": {
          "ar": "+1.1M ساعة أسبوعياً",
          "en": "+1.1M hours weekly"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "3.2M مشتركين نشطين",
          "en": "3.2M Active subscribers"
        },
        "description": {
          "ar": "إدارة المشتركين، أداء المحتوى، وجاهزية الشبكة.",
          "en": "Manage subscribers, content performance, and network readiness."
        },
        "bullets": [
          {
            "value": "18.4M",
            "title": {
              "ar": "عدد المشاهدات اليومية",
              "en": "Daily streams"
            },
            "subtitle": {
              "ar": "+14% بعد إطلاق الموسم",
              "en": "+14% after season launch"
            }
          },
          {
            "value": "0.9%",
            "title": {
              "ar": "معدل التخزين المؤقت",
              "en": "Buffering ratio"
            },
            "subtitle": {
              "ar": "-0.3 نقطة بفضل تحسين CDN",
              "en": "-0.3 pts with CDN tuning"
            }
          },
          {
            "value": "6.3M ساعة",
            "title": {
              "ar": "وقت مشاهدة أفضل تصنيف",
              "en": "Top genre watchtime"
            },
            "subtitle": {
              "ar": "+1.1M ساعة أسبوعياً",
              "en": "+1.1M hours weekly"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "وثائقي الطاقة الشمسية",
                  "en": "Solar energy documentary"
                },
                "subtitle": {
                  "ar": "تقييم 4.9/5",
                  "en": "Rating 4.9/5"
                },
                "tags": [
                  {
                    "ar": "+32% نمو",
                    "en": "+32% growth"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "سلسلة الأكشن الليلية",
                  "en": "Night action series"
                },
                "subtitle": {
                  "ar": "معدل إكمال 71%",
                  "en": "Completion 71%"
                },
                "tags": [
                  {
                    "ar": "+0.8M منذ الأسبوع الماضي",
                    "en": "+0.8M since last week"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "برنامج البث المباشر الرياضي",
                  "en": "Live sports show"
                },
                "subtitle": {
                  "ar": "متوسط مشاهدة متزامنة 420K",
                  "en": "Concurrent viewers 420K"
                },
                "tags": [
                  {
                    "ar": "زمن مشاهدة قياسي",
                    "en": "Record watchtime"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "مشتركين نشطين",
              "en": "Active subscribers"
            },
            "value": {
              "ar": "3.2M",
              "en": "3.2M"
            },
            "caption": {
              "ar": "+120K خلال الشهر",
              "en": "+120K this month"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "عدد المشاهدات اليومية",
              "en": "Daily streams"
            },
            "value": {
              "ar": "18.4M",
              "en": "18.4M"
            },
            "caption": {
              "ar": "+14% بعد إطلاق الموسم",
              "en": "+14% after season launch"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "معدل التخزين المؤقت",
              "en": "Buffering ratio"
            },
            "value": {
              "ar": "0.9%",
              "en": "0.9%"
            },
            "caption": {
              "ar": "-0.3 نقطة بفضل تحسين CDN",
              "en": "-0.3 pts with CDN tuning"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "وقت مشاهدة أفضل تصنيف",
              "en": "Top genre watchtime"
            },
            "value": {
              "ar": "6.3M ساعة",
              "en": "6.3M ساعة"
            },
            "caption": {
              "ar": "+1.1M ساعة أسبوعياً",
              "en": "+1.1M hours weekly"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "منحنى المشاهدات اليومية",
          "en": "Daily view curve"
        },
        "subtitle": {
          "ar": "توزيع المشاهدات حسب الجهاز والمنطقة.",
          "en": "Views segmented by device and region."
        },
        "action": {
          "ar": "تصدير CSV",
          "en": "Export CSV"
        },
        "placeholder": {
          "ar": "مخطط المشاهدات",
          "en": "View chart"
        }
      },
      {
        "id": "content",
        "type": "list",
        "title": {
          "ar": "أعمال محتوى بارزة",
          "en": "Featured content performance"
        },
        "action": {
          "ar": "تحديث تلقائي",
          "en": "Auto refreshed"
        },
        "items": [
          {
            "icon": "play",
            "title": {
              "ar": "وثائقي الطاقة الشمسية",
              "en": "Solar energy documentary"
            },
            "subtitle": {
              "ar": "تقييم 4.9/5",
              "en": "Rating 4.9/5"
            },
            "value": "1.3M مشاهدة",
            "delta": {
              "ar": "+32% نمو",
              "en": "+32% growth"
            }
          },
          {
            "icon": "sparkles",
            "title": {
              "ar": "سلسلة الأكشن الليلية",
              "en": "Night action series"
            },
            "subtitle": {
              "ar": "معدل إكمال 71%",
              "en": "Completion 71%"
            },
            "value": "2.7M مشاهدة",
            "delta": {
              "ar": "+0.8M منذ الأسبوع الماضي",
              "en": "+0.8M since last week"
            }
          },
          {
            "icon": "tv",
            "title": {
              "ar": "برنامج البث المباشر الرياضي",
              "en": "Live sports show"
            },
            "subtitle": {
              "ar": "متوسط مشاهدة متزامنة 420K",
              "en": "Concurrent viewers 420K"
            },
            "value": "90 دقيقة",
            "delta": {
              "ar": "زمن مشاهدة قياسي",
              "en": "Record watchtime"
            }
          }
        ]
      }
    ],
    "id": "streaming",
    "slug": "dashboard-16.html",
    "layout": {
      "shell": "bg-slate-950/20",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-5 gap-6",
      "panels": "xl:grid-cols-[1.6fr_1fr] gap-y-10"
    },
    "gallery": {
      "badge": {
        "ar": "البث الرقمي",
        "en": "Streaming"
      },
      "title": {
        "ar": "منصة بث ديناميكية",
        "en": "Dynamic streaming studio"
      },
      "description": {
        "ar": "قياس المشاهدة، التفاعل، وسير المحتوى عند الطلب في الوقت الفعلي.",
        "en": "Track viewing, engagement, and content pipelines for on-demand services in realtime."
      },
      "tags": [
        {
          "ar": "مشاهدة",
          "en": "Viewership"
        },
        {
          "ar": "إيرادات",
          "en": "Revenue"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "مشتركين نشطين",
              "en": "Active subscribers"
            },
            "value": {
              "ar": "3.2M",
              "en": "3.2M"
            }
          },
          {
            "label": {
              "ar": "عدد المشاهدات اليومية",
              "en": "Daily streams"
            },
            "value": {
              "ar": "18.4M",
              "en": "18.4M"
            }
          },
          {
            "label": {
              "ar": "معدل التخزين المؤقت",
              "en": "Buffering ratio"
            },
            "value": {
              "ar": "0.9%",
              "en": "0.9%"
            }
          }
        ]
      }
    ]
  },
  "smartcity": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة المدينة الذكية",
        "en": "Smart City Operations Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "CT",
      "name": {
        "ar": "مركز المدينة الذكية",
        "en": "Smart City Center"
      },
      "tagline": {
        "ar": "الحركة، الطاقة، والخدمات الحضرية الذكية",
        "en": "Mobility, energy, and smart civic services"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-cyan-950 to-emerald-900",
        "sidebarGradient": "from-slate-950 via-cyan-900 to-emerald-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-cyan-500/35",
        "accentGradient": "from-cyan-400 via-emerald-400 to-amber-400",
        "accentText": "text-emerald-200",
        "highlightBg": "bg-cyan-500/15 border-cyan-500/35",
        "badgeBg": "bg-cyan-500/20",
        "badgeText": "text-white",
        "navActive": "border border-cyan-400/50 bg-cyan-500/15",
        "navIconBg": "bg-cyan-950/50",
        "navBadgeText": "text-cyan-200",
        "listBorder": "border border-blue-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-blue-500/10",
        "timelineChip": "bg-blue-500/10 text-blue-200",
        "tableHeaderBg": "bg-blue-500/10",
        "cardShadow": "shadow-[0_34px_110px_-54px_rgba(34,211,238,0.65)]"
      },
      "light": {
        "bodyGradient": "from-cyan-50 via-white to-emerald-100",
        "sidebarGradient": "from-white via-cyan-50 to-emerald-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-cyan-200",
        "accentGradient": "from-cyan-400 via-emerald-400 to-amber-400",
        "accentText": "text-blue-600",
        "highlightBg": "bg-cyan-500/10 border-cyan-200/60",
        "badgeBg": "bg-cyan-200/60",
        "badgeText": "text-cyan-900",
        "navActive": "border border-cyan-200 bg-cyan-500/10",
        "navIconBg": "bg-cyan-100",
        "navBadgeText": "text-cyan-700",
        "listBorder": "border border-blue-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-blue-100",
        "timelineChip": "bg-blue-100 text-blue-700",
        "tableHeaderBg": "bg-blue-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(34,211,238,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "map",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "مدينة",
          "en": "City"
        }
      },
      {
        "id": "mobility",
        "icon": "truck",
        "label": {
          "ar": "الحركة والتنقل",
          "en": "Mobility"
        }
      },
      {
        "id": "energy",
        "icon": "sun",
        "label": {
          "ar": "الطاقة والاستدامة",
          "en": "Energy & sustainability"
        }
      },
      {
        "id": "services",
        "icon": "sparkles",
        "label": {
          "ar": "الخدمات الحضرية",
          "en": "Urban services"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "تنبيه تشغيلي",
        "en": "Operational alert"
      },
      "value": "إغلاق شارع رئيسي مؤقت",
      "description": {
        "ar": "أعمال الصيانة الليلية تتطلب تحويل مسار حركة المرور حتى صباح الغد.",
        "en": "Night maintenance requires rerouting traffic until tomorrow morning."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة المدينة الذكية",
        "en": "Smart city dashboard"
      },
      "subtitle": {
        "ar": "قياس الأداء الحضري عبر التنقل، الطاقة، والخدمات الرقمية.",
        "en": "Measure urban performance across mobility, energy, and digital services."
      },
      "primary": {
        "ar": "إرسال تحديث للسكان",
        "en": "Send resident update"
      },
      "secondary": {
        "ar": "عرض خريطة الاستشعار",
        "en": "View sensor map"
      }
    },
    "stats": [
      {
        "icon": "truck",
        "label": {
          "ar": "انسيابية المرور",
          "en": "Traffic flow"
        },
        "value": "87%",
        "delta": {
          "ar": "+5% بعد إدارة الإشارات الذكية",
          "en": "+5% with smart signals"
        },
        "trend": "positive"
      },
      {
        "icon": "users",
        "label": {
          "ar": "التزام النقل العام بالمواعيد",
          "en": "Transit on-time rate"
        },
        "value": "92%",
        "delta": {
          "ar": "+7 نقاط منذ الشهر الماضي",
          "en": "+7 pts vs last month"
        },
        "trend": "positive"
      },
      {
        "icon": "sun",
        "label": {
          "ar": "استهلاك الطاقة اليومي",
          "en": "Daily energy consumption"
        },
        "value": "1.8GWh",
        "delta": {
          "ar": "-9% بفضل الألواح الشمسية",
          "en": "-9% via solar grid"
        },
        "trend": "positive"
      },
      {
        "icon": "sparkles",
        "label": {
          "ar": "طلبات المواطنين المنجزة",
          "en": "Citizen service requests resolved"
        },
        "value": "76%",
        "delta": {
          "ar": "+12% بعد مركز الخدمة الموحد",
          "en": "+12% after unified portal"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "87% انسيابية المرور",
          "en": "87% Traffic flow"
        },
        "description": {
          "ar": "قياس الأداء الحضري عبر التنقل، الطاقة، والخدمات الرقمية.",
          "en": "Measure urban performance across mobility, energy, and digital services."
        },
        "bullets": [
          {
            "value": "92%",
            "title": {
              "ar": "التزام النقل العام بالمواعيد",
              "en": "Transit on-time rate"
            },
            "subtitle": {
              "ar": "+7 نقاط منذ الشهر الماضي",
              "en": "+7 pts vs last month"
            }
          },
          {
            "value": "1.8GWh",
            "title": {
              "ar": "استهلاك الطاقة اليومي",
              "en": "Daily energy consumption"
            },
            "subtitle": {
              "ar": "-9% بفضل الألواح الشمسية",
              "en": "-9% via solar grid"
            }
          },
          {
            "value": "76%",
            "title": {
              "ar": "طلبات المواطنين المنجزة",
              "en": "Citizen service requests resolved"
            },
            "subtitle": {
              "ar": "+12% بعد مركز الخدمة الموحد",
              "en": "+12% after unified portal"
            }
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "إطلاق منصة الخدمات الموحدة",
              "en": "Unified services portal launched"
            },
            "subtitle": {
              "ar": "30 خدمة رقمية في مكان واحد",
              "en": "30 digital services consolidated"
            },
            "time": {
              "ar": "اليوم",
              "en": "Today"
            }
          },
          {
            "title": {
              "ar": "بدء تشغيل مزرعة الطاقة الشمسية",
              "en": "Solar farm commissioned"
            },
            "subtitle": {
              "ar": "قدرة 25 ميجاوات للمنطقة الصناعية",
              "en": "25MW for industrial zone"
            },
            "time": {
              "ar": "أمس",
              "en": "Yesterday"
            }
          },
          {
            "title": {
              "ar": "ورشة مشاركة مجتمعية",
              "en": "Community co-creation workshop"
            },
            "subtitle": {
              "ar": "مشاركة 280 مشاركاً في تخطيط الحي",
              "en": "280 residents shaping neighborhood plan"
            },
            "time": {
              "ar": "قبل يومين",
              "en": "2 days ago"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "محور الشمال السريع",
                  "en": "North expressway"
                },
                "subtitle": {
                  "ar": "تدفق 93%، زمن رحلة 18 دقيقة",
                  "en": "Flow 93%, travel time 18 min"
                },
                "tags": [
                  {
                    "ar": "لا توجد اختناقات",
                    "en": "No congestion"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "شبكة الحافلات الذكية",
                  "en": "Smart bus network"
                },
                "subtitle": {
                  "ar": "90% حافلات في الموعد",
                  "en": "90% buses on schedule"
                },
                "tags": [
                  {
                    "ar": "تشغيل 312 مركبة",
                    "en": "312 vehicles running"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "ممر الدراجات الخضراء",
                  "en": "Green bike corridor"
                },
                "subtitle": {
                  "ar": "أكثر من 6.2K رحلة يومية",
                  "en": "6.2K trips daily"
                },
                "tags": [
                  {
                    "ar": "حوافز استخدام جديدة",
                    "en": "New usage incentives"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "مؤشرات المدينة اليومية",
          "en": "Daily city indicators"
        },
        "subtitle": {
          "ar": "حركة المرور، الطاقة، وجودة الهواء عبر الأحياء.",
          "en": "Traffic, energy, and air quality across districts."
        },
        "action": {
          "ar": "التفاصيل حسب الحي",
          "en": "Detail by district"
        },
        "placeholder": {
          "ar": "مخطط المؤشرات",
          "en": "City metrics"
        }
      },
      {
        "id": "mobility",
        "type": "list",
        "title": {
          "ar": "محاور الحركة النشطة",
          "en": "Active mobility corridors"
        },
        "action": {
          "ar": "تحديث كل 15 دقيقة",
          "en": "Refresh every 15 minutes"
        },
        "items": [
          {
            "icon": "map",
            "title": {
              "ar": "محور الشمال السريع",
              "en": "North expressway"
            },
            "subtitle": {
              "ar": "تدفق 93%، زمن رحلة 18 دقيقة",
              "en": "Flow 93%, travel time 18 min"
            },
            "value": "في المسار",
            "delta": {
              "ar": "لا توجد اختناقات",
              "en": "No congestion"
            }
          },
          {
            "icon": "truck",
            "title": {
              "ar": "شبكة الحافلات الذكية",
              "en": "Smart bus network"
            },
            "subtitle": {
              "ar": "90% حافلات في الموعد",
              "en": "90% buses on schedule"
            },
            "value": "حالة جيدة",
            "delta": {
              "ar": "تشغيل 312 مركبة",
              "en": "312 vehicles running"
            }
          },
          {
            "icon": "sparkles",
            "title": {
              "ar": "ممر الدراجات الخضراء",
              "en": "Green bike corridor"
            },
            "subtitle": {
              "ar": "أكثر من 6.2K رحلة يومية",
              "en": "6.2K trips daily"
            },
            "value": "نشط",
            "delta": {
              "ar": "حوافز استخدام جديدة",
              "en": "New usage incentives"
            }
          }
        ]
      }
    ],
    "id": "smartcity",
    "slug": "dashboard-17.html",
    "layout": {
      "shell": "bg-slate-950/18",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.5fr_1fr] gap-y-10"
    },
    "gallery": {
      "badge": {
        "ar": "المدن الذكية",
        "en": "Smart city"
      },
      "title": {
        "ar": "مركز تشغيل حضري",
        "en": "Urban operations hub"
      },
      "description": {
        "ar": "دمج بيانات التنقل، الطاقة، والخدمات لتمكين قرارات بلدية أسرع.",
        "en": "Fuse mobility, energy, and civic services data for faster municipal decisions."
      },
      "tags": [
        {
          "ar": "خدمات",
          "en": "Services"
        },
        {
          "ar": "طاقة",
          "en": "Energy"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "انسيابية المرور",
              "en": "Traffic flow"
            },
            "value": {
              "ar": "87%",
              "en": "87%"
            }
          },
          {
            "label": {
              "ar": "التزام النقل العام بالمواعيد",
              "en": "Transit on-time rate"
            },
            "value": {
              "ar": "92%",
              "en": "92%"
            }
          },
          {
            "label": {
              "ar": "استهلاك الطاقة اليومي",
              "en": "Daily energy consumption"
            },
            "value": {
              "ar": "1.8GWh",
              "en": "1.8GWh"
            }
          }
        ]
      }
    ]
  },
  "hospitality": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة تجربة الضيافة",
        "en": "Hospitality Experience Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "HT",
      "name": {
        "ar": "مجموعة الضيافة الراقية",
        "en": "Prestige Hospitality Group"
      },
      "tagline": {
        "ar": "فنادق، منتجعات، وتجارب ضيافة فاخرة",
        "en": "Hotels, resorts, and elevated guest journeys"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-rose-950 to-amber-900",
        "sidebarGradient": "from-slate-950 via-rose-900 to-amber-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-rose-500/35",
        "accentGradient": "from-rose-400 via-amber-400 to-emerald-400",
        "accentText": "text-amber-200",
        "highlightBg": "bg-rose-500/15 border-rose-500/35",
        "badgeBg": "bg-rose-500/20",
        "badgeText": "text-white",
        "navActive": "border border-rose-400/50 bg-rose-500/15",
        "navIconBg": "bg-rose-950/50",
        "navBadgeText": "text-rose-200",
        "listBorder": "border border-rose-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-rose-500/10",
        "timelineChip": "bg-rose-500/10 text-rose-200",
        "tableHeaderBg": "bg-rose-500/10",
        "cardShadow": "shadow-[0_34px_110px_-54px_rgba(244,63,94,0.65)]"
      },
      "light": {
        "bodyGradient": "from-rose-50 via-white to-amber-100",
        "sidebarGradient": "from-white via-rose-50 to-amber-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-rose-200",
        "accentGradient": "from-rose-400 via-amber-400 to-emerald-400",
        "accentText": "text-rose-600",
        "highlightBg": "bg-rose-500/10 border-rose-200/60",
        "badgeBg": "bg-rose-200/60",
        "badgeText": "text-rose-900",
        "navActive": "border border-rose-200 bg-rose-500/10",
        "navIconBg": "bg-rose-100",
        "navBadgeText": "text-rose-700",
        "listBorder": "border border-rose-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-rose-100",
        "timelineChip": "bg-rose-100 text-rose-700",
        "tableHeaderBg": "bg-rose-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(244,63,94,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "building",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "المجموعة",
          "en": "Group"
        }
      },
      {
        "id": "occupancy",
        "icon": "calendar",
        "label": {
          "ar": "الإشغال والحجوزات",
          "en": "Occupancy & bookings"
        }
      },
      {
        "id": "experience",
        "icon": "heart",
        "label": {
          "ar": "تجربة الضيوف",
          "en": "Guest experience"
        }
      },
      {
        "id": "revenue",
        "icon": "bank",
        "label": {
          "ar": "الإيرادات والتسعير",
          "en": "Revenue & pricing"
        }
      },
      {
        "id": "operations",
        "icon": "sparkles",
        "label": {
          "ar": "العمليات اليومية",
          "en": "Daily operations"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "فرصة مميزة",
        "en": "Featured opportunity"
      },
      "value": "باقة موسم الأعياد الجديدة",
      "description": {
        "ar": "استفد من معدل تحويل مرتفع لحزمة الأجنحة الفاخرة في عطلة نهاية الأسبوع.",
        "en": "Capitalize on the high-converting luxury suite weekend package."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة تجربة الضيوف",
        "en": "Guest experience intelligence"
      },
      "subtitle": {
        "ar": "راقب معدلات الإشغال، رضا الضيوف، وإيرادات الغرف عبر محفظة الفنادق.",
        "en": "Monitor occupancy, guest sentiment, and room revenue across the hotel portfolio."
      },
      "primary": {
        "ar": "إطلاق حملة ترقية",
        "en": "Launch upgrade campaign"
      },
      "secondary": {
        "ar": "عرض الملاحظات التفصيلية",
        "en": "View feedback details"
      }
    },
    "stats": [
      {
        "icon": "building",
        "label": {
          "ar": "متوسط إشغال الغرف",
          "en": "Average room occupancy"
        },
        "value": "88%",
        "delta": {
          "ar": "+6% مقارنة بالأسبوع الماضي",
          "en": "+6% vs last week"
        },
        "trend": "positive"
      },
      {
        "icon": "calendar",
        "label": {
          "ar": "حجوزات الشهر القادم",
          "en": "Next-month bookings"
        },
        "value": "12.4K",
        "delta": {
          "ar": "+1.2K بعد الحملة الرقمية",
          "en": "+1.2K after digital push"
        },
        "trend": "positive"
      },
      {
        "icon": "heart",
        "label": {
          "ar": "مؤشر رضا الضيوف",
          "en": "Guest satisfaction index"
        },
        "value": "4.7 / 5",
        "delta": {
          "ar": "+0.3 عن متوسط الموسم",
          "en": "+0.3 vs seasonal avg."
        },
        "trend": "positive"
      },
      {
        "icon": "bank",
        "label": {
          "ar": "متوسط العائد لكل غرفة",
          "en": "RevPAR"
        },
        "value": "$216",
        "delta": {
          "ar": "+$14 عن العام الماضي",
          "en": "+$14 YoY"
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "88% متوسط إشغال الغرف",
          "en": "88% Average room occupancy"
        },
        "description": {
          "ar": "راقب معدلات الإشغال، رضا الضيوف، وإيرادات الغرف عبر محفظة الفنادق.",
          "en": "Monitor occupancy, guest sentiment, and room revenue across the hotel portfolio."
        },
        "bullets": [
          {
            "value": "12.4K",
            "title": {
              "ar": "حجوزات الشهر القادم",
              "en": "Next-month bookings"
            },
            "subtitle": {
              "ar": "+1.2K بعد الحملة الرقمية",
              "en": "+1.2K after digital push"
            }
          },
          {
            "value": "4.7 / 5",
            "title": {
              "ar": "مؤشر رضا الضيوف",
              "en": "Guest satisfaction index"
            },
            "subtitle": {
              "ar": "+0.3 عن متوسط الموسم",
              "en": "+0.3 vs seasonal avg."
            }
          },
          {
            "value": "$216",
            "title": {
              "ar": "متوسط العائد لكل غرفة",
              "en": "RevPAR"
            },
            "subtitle": {
              "ar": "+$14 عن العام الماضي",
              "en": "+$14 YoY"
            }
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "متوسط إشغال الغرف",
              "en": "Average room occupancy"
            },
            "value": {
              "ar": "88%",
              "en": "88%"
            },
            "caption": {
              "ar": "+6% مقارنة بالأسبوع الماضي",
              "en": "+6% vs last week"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "حجوزات الشهر القادم",
              "en": "Next-month bookings"
            },
            "value": {
              "ar": "12.4K",
              "en": "12.4K"
            },
            "caption": {
              "ar": "+1.2K بعد الحملة الرقمية",
              "en": "+1.2K after digital push"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "مؤشر رضا الضيوف",
              "en": "Guest satisfaction index"
            },
            "value": {
              "ar": "4.7 / 5",
              "en": "4.7 / 5"
            },
            "caption": {
              "ar": "+0.3 عن متوسط الموسم",
              "en": "+0.3 vs seasonal avg."
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "متوسط العائد لكل غرفة",
              "en": "RevPAR"
            },
            "value": {
              "ar": "$216",
              "en": "$216"
            },
            "caption": {
              "ar": "+$14 عن العام الماضي",
              "en": "+$14 YoY"
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "تدقيق أجنحة كبار الشخصيات",
              "en": "VIP suite inspection"
            },
            "subtitle": {
              "ar": "التأكد من تجهيزات الترحيب قبل الوصول.",
              "en": "Ensure welcome amenities before arrival."
            },
            "time": {
              "ar": "09:30 صباحاً",
              "en": "09:30 AM"
            }
          },
          {
            "title": {
              "ar": "فعالية تذوق المأكولات",
              "en": "Culinary tasting event"
            },
            "subtitle": {
              "ar": "عرض قائمة الطاهي الجديدة لمجموعة من المؤثرين.",
              "en": "Showcase new chef menu to influencers."
            },
            "time": {
              "ar": "01:00 ظهراً",
              "en": "01:00 PM"
            }
          },
          {
            "title": {
              "ar": "متابعة تقييمات الضيوف",
              "en": "Guest feedback follow-up"
            },
            "subtitle": {
              "ar": "الاتصال بضيوف الباقات العائلية لضمان الرضا.",
              "en": "Call family package guests for satisfaction check."
            },
            "time": {
              "ar": "05:45 مساءً",
              "en": "05:45 PM"
            }
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "مؤشرات الضيافة اليومية",
          "en": "Daily hospitality metrics"
        },
        "subtitle": {
          "ar": "الإشغال، متوسط الأسعار، وقنوات الحجز لكل فندق.",
          "en": "Occupancy, ADR, and booking mix by property."
        },
        "action": {
          "ar": "عرض حسب المنطقة",
          "en": "View by region"
        },
        "placeholder": {
          "ar": "مخطط الأداء اليومي",
          "en": "Daily performance chart"
        }
      },
      {
        "id": "occupancy",
        "type": "list",
        "title": {
          "ar": "أعلى الفنادق أداءً",
          "en": "Top performing hotels"
        },
        "action": {
          "ar": "مقارنة بكل الفنادق",
          "en": "Compare all hotels"
        },
        "items": [
          {
            "icon": "building",
            "title": {
              "ar": "منتجع الخليج الذهبي",
              "en": "Golden Gulf Resort"
            },
            "subtitle": {
              "ar": "إشغال 94% | إيراد غرفة $289",
              "en": "94% occupancy | $289 ADR"
            },
            "value": "NPS 72",
            "delta": {
              "ar": "+8 نقاط خلال 30 يوماً",
              "en": "+8 pts in 30 days"
            }
          },
          {
            "icon": "building",
            "title": {
              "ar": "فندق سنترال سكاي",
              "en": "Central Sky Hotel"
            },
            "subtitle": {
              "ar": "إشغال 89% | إيراد غرفة $198",
              "en": "89% occupancy | $198 ADR"
            },
            "value": "NPS 66",
            "delta": {
              "ar": "+5 نقاط بعد تجديد اللوبي",
              "en": "+5 after lobby refresh"
            }
          },
          {
            "icon": "building",
            "title": {
              "ar": "أجنحة الواحة",
              "en": "Oasis Suites"
            },
            "subtitle": {
              "ar": "إشغال 86% | إيراد غرفة $235",
              "en": "86% occupancy | $235 ADR"
            },
            "value": "NPS 70",
            "delta": {
              "ar": "+4 نقاط من خدمة الكونسييرج",
              "en": "+4 via concierge service"
            }
          }
        ]
      }
    ],
    "id": "hospitality",
    "slug": "dashboard-18.html",
    "layout": {
      "shell": "bg-slate-950/20",
      "main": "space-y-12 lg:px-15",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.45fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "الضيافة",
        "en": "Hospitality"
      },
      "title": {
        "ar": "إدارة تجربة الضيوف",
        "en": "Curate guest experience"
      },
      "description": {
        "ar": "لوحة شاملة للإشغال، الإيرادات، ورضا الضيوف لسلاسل الفنادق والمنتجعات.",
        "en": "Unified occupancy, revenue, and guest sentiment view for hotel and resort portfolios."
      },
      "tags": [
        {
          "ar": "ضيوف",
          "en": "Guests"
        },
        {
          "ar": "إيرادات",
          "en": "Revenue"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "متوسط إشغال الغرف",
              "en": "Average room occupancy"
            },
            "value": {
              "ar": "88%",
              "en": "88%"
            }
          },
          {
            "label": {
              "ar": "حجوزات الشهر القادم",
              "en": "Next-month bookings"
            },
            "value": {
              "ar": "12.4K",
              "en": "12.4K"
            }
          },
          {
            "label": {
              "ar": "مؤشر رضا الضيوف",
              "en": "Guest satisfaction index"
            },
            "value": {
              "ar": "4.7 / 5",
              "en": "4.7 / 5"
            }
          }
        ]
      }
    ]
  },
  "energy": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة الطاقة المتجددة",
        "en": "Renewable Energy Operations Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "RE",
      "name": {
        "ar": "شبكة الطاقة الخضراء",
        "en": "Green Grid Alliance"
      },
      "tagline": {
        "ar": "طاقة شمسية، رياح، وتخزين ذكي للشبكات",
        "en": "Solar, wind, and intelligent storage orchestration"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-emerald-950 to-lime-900",
        "sidebarGradient": "from-slate-950 via-emerald-900 to-lime-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-emerald-500/35",
        "accentGradient": "from-emerald-400 via-lime-400 to-sky-400",
        "accentText": "text-emerald-200",
        "highlightBg": "bg-emerald-500/15 border-emerald-500/35",
        "badgeBg": "bg-emerald-500/20",
        "badgeText": "text-white",
        "navActive": "border border-emerald-400/50 bg-emerald-500/15",
        "navIconBg": "bg-emerald-950/50",
        "navBadgeText": "text-emerald-200",
        "listBorder": "border border-emerald-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-emerald-500/10",
        "timelineChip": "bg-emerald-500/10 text-emerald-200",
        "tableHeaderBg": "bg-emerald-500/10",
        "cardShadow": "shadow-[0_34px_110px_-54px_rgba(34,197,94,0.7)]"
      },
      "light": {
        "bodyGradient": "from-emerald-50 via-white to-lime-100",
        "sidebarGradient": "from-white via-emerald-50 to-lime-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-emerald-200",
        "accentGradient": "from-emerald-400 via-lime-400 to-sky-400",
        "accentText": "text-emerald-600",
        "highlightBg": "bg-emerald-500/10 border-emerald-200/60",
        "badgeBg": "bg-emerald-200/60",
        "badgeText": "text-emerald-900",
        "navActive": "border border-emerald-200 bg-emerald-500/10",
        "navIconBg": "bg-emerald-100",
        "navBadgeText": "text-emerald-700",
        "listBorder": "border border-emerald-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-emerald-100",
        "timelineChip": "bg-emerald-100 text-emerald-700",
        "tableHeaderBg": "bg-emerald-50/80",
        "cardShadow": "shadow-[0_32px_90px_-55px_rgba(34,197,94,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "chart-bar",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "تشغيل",
          "en": "Ops"
        }
      },
      {
        "id": "generation",
        "icon": "sun",
        "label": {
          "ar": "الإنتاج المباشر",
          "en": "Live generation"
        }
      },
      {
        "id": "grid",
        "icon": "cloud",
        "label": {
          "ar": "الشبكة والتخزين",
          "en": "Grid & storage"
        }
      },
      {
        "id": "maintenance",
        "icon": "cog",
        "label": {
          "ar": "الصيانة والمشاريع",
          "en": "Maintenance & projects"
        }
      },
      {
        "id": "sustainability",
        "icon": "leaf",
        "label": {
          "ar": "الاستدامة والأثر",
          "en": "Sustainability impact"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "تنبيه الشبكة",
        "en": "Grid alert"
      },
      "value": "سحابة رملية تؤثر على محطات الطاقة الشمسية",
      "description": {
        "ar": "انخفاض إنتاجية الألواح بنسبة 9% خلال الساعتين القادمتين، إعادة التوزيع مطلوبة.",
        "en": "Solar output forecasted -9% for next 2 hours, redistribute load accordingly."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة عمليات الطاقة المتجددة",
        "en": "Renewable operations overview"
      },
      "subtitle": {
        "ar": "راقب إنتاج الطاقة، توازن الشبكة، ومبادرات الاستدامة في الوقت الفعلي.",
        "en": "Track generation, grid balance, and sustainability programs in real time."
      },
      "primary": {
        "ar": "إعادة ضبط توزيع الأحمال",
        "en": "Rebalance grid dispatch"
      },
      "secondary": {
        "ar": "استعراض خطة الصيانة",
        "en": "Review maintenance plan"
      }
    },
    "stats": [
      {
        "icon": "sun",
        "label": {
          "ar": "الإنتاج الشمسي الحالي",
          "en": "Current solar output"
        },
        "value": "612 MW",
        "delta": {
          "ar": "-5% بسبب الغبار",
          "en": "-5% due to dust"
        },
        "trend": "negative"
      },
      {
        "icon": "cloud",
        "label": {
          "ar": "طاقة الرياح قيد الاستخدام",
          "en": "Wind capacity utilized"
        },
        "value": "74%",
        "delta": {
          "ar": "+11% خلال آخر 24 ساعة",
          "en": "+11% over 24h"
        },
        "trend": "positive"
      },
      {
        "icon": "leaf",
        "label": {
          "ar": "انبعاثات تم تجنبها اليوم",
          "en": "Emissions avoided today"
        },
        "value": "1.9 kt CO₂e",
        "delta": {
          "ar": "+0.4 مقارنة بالهدف",
          "en": "+0.4 vs target"
        },
        "trend": "positive"
      },
      {
        "icon": "chart-bar",
        "label": {
          "ar": "كفاءة التخزين",
          "en": "Storage efficiency"
        },
        "value": "91%",
        "delta": {
          "ar": "+3 نقاط عن المتوسط الشهري",
          "en": "+3 pts vs monthly avg."
        },
        "trend": "positive"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "612 MW الإنتاج الشمسي الحالي",
          "en": "612 MW Current solar output"
        },
        "description": {
          "ar": "راقب إنتاج الطاقة، توازن الشبكة، ومبادرات الاستدامة في الوقت الفعلي.",
          "en": "Track generation, grid balance, and sustainability programs in real time."
        },
        "bullets": [
          {
            "value": "74%",
            "title": {
              "ar": "طاقة الرياح قيد الاستخدام",
              "en": "Wind capacity utilized"
            },
            "subtitle": {
              "ar": "+11% خلال آخر 24 ساعة",
              "en": "+11% over 24h"
            }
          },
          {
            "value": "1.9 kt CO₂e",
            "title": {
              "ar": "انبعاثات تم تجنبها اليوم",
              "en": "Emissions avoided today"
            },
            "subtitle": {
              "ar": "+0.4 مقارنة بالهدف",
              "en": "+0.4 vs target"
            }
          },
          {
            "value": "91%",
            "title": {
              "ar": "كفاءة التخزين",
              "en": "Storage efficiency"
            },
            "subtitle": {
              "ar": "+3 نقاط عن المتوسط الشهري",
              "en": "+3 pts vs monthly avg."
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "مجمع شمس الجنوب",
                  "en": "Southern Sun Complex"
                },
                "subtitle": {
                  "ar": "إنتاج 182 ميجاوات | انحراف -4%",
                  "en": "182 MW output | -4% deviation"
                },
                "tags": [
                  {
                    "ar": "عمليات التنظيف تبدأ خلال ساعة",
                    "en": "Cleaning crews in 1 hr"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "محطة رياح الساحل",
                  "en": "Coastal Wind Hub"
                },
                "subtitle": {
                  "ar": "إنتاج 154 ميجاوات | انحراف +7%",
                  "en": "154 MW output | +7% deviation"
                },
                "tags": [
                  {
                    "ar": "سرعة رياح مستقرة",
                    "en": "Stable wind speeds"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "مختبر التخزين الأخضر",
                  "en": "Green Storage Lab"
                },
                "subtitle": {
                  "ar": "شحن 68 ميجاوات | تفريغ 52 ميجاوات",
                  "en": "Charging 68 MW | Discharging 52 MW"
                },
                "tags": [
                  {
                    "ar": "وضع تحسين ذاتي",
                    "en": "Auto-optimization active"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "performance-matrix",
        "type": "matrix",
        "title": {
          "ar": "مصفوفة الأداء",
          "en": "Performance matrix"
        },
        "layout": "md:grid-cols-2",
        "cells": [
          {
            "title": {
              "ar": "الإنتاج الشمسي الحالي",
              "en": "Current solar output"
            },
            "value": {
              "ar": "612 MW",
              "en": "612 MW"
            },
            "caption": {
              "ar": "-5% بسبب الغبار",
              "en": "-5% due to dust"
            },
            "emphasis": true,
            "badge": {
              "ar": "أولوية",
              "en": "Priority"
            }
          },
          {
            "title": {
              "ar": "طاقة الرياح قيد الاستخدام",
              "en": "Wind capacity utilized"
            },
            "value": {
              "ar": "74%",
              "en": "74%"
            },
            "caption": {
              "ar": "+11% خلال آخر 24 ساعة",
              "en": "+11% over 24h"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "انبعاثات تم تجنبها اليوم",
              "en": "Emissions avoided today"
            },
            "value": {
              "ar": "1.9 kt CO₂e",
              "en": "1.9 kt CO₂e"
            },
            "caption": {
              "ar": "+0.4 مقارنة بالهدف",
              "en": "+0.4 vs target"
            },
            "emphasis": false
          },
          {
            "title": {
              "ar": "كفاءة التخزين",
              "en": "Storage efficiency"
            },
            "value": {
              "ar": "91%",
              "en": "91%"
            },
            "caption": {
              "ar": "+3 نقاط عن المتوسط الشهري",
              "en": "+3 pts vs monthly avg."
            },
            "emphasis": false
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "مؤشرات توليد الطاقة المباشرة",
          "en": "Live generation overview"
        },
        "subtitle": {
          "ar": "مزيج الطاقة حسب المصدر والموقع، مع توقعات الساعات الأربع القادمة.",
          "en": "Generation mix by source and site with 4-hour forecast."
        },
        "action": {
          "ar": "تفاصيل محطات الطاقة",
          "en": "View plant details"
        },
        "placeholder": {
          "ar": "مخطط الإنتاج الفوري",
          "en": "Real-time output chart"
        }
      },
      {
        "id": "generation",
        "type": "list",
        "title": {
          "ar": "أعلى المزارع إنتاجاً",
          "en": "Top producing farms"
        },
        "action": {
          "ar": "عرض كامل المحفظة",
          "en": "View full portfolio"
        },
        "items": [
          {
            "icon": "sun",
            "title": {
              "ar": "مجمع شمس الجنوب",
              "en": "Southern Sun Complex"
            },
            "subtitle": {
              "ar": "إنتاج 182 ميجاوات | انحراف -4%",
              "en": "182 MW output | -4% deviation"
            },
            "value": "إتاحة 96%",
            "delta": {
              "ar": "عمليات التنظيف تبدأ خلال ساعة",
              "en": "Cleaning crews in 1 hr"
            }
          },
          {
            "icon": "cloud",
            "title": {
              "ar": "محطة رياح الساحل",
              "en": "Coastal Wind Hub"
            },
            "subtitle": {
              "ar": "إنتاج 154 ميجاوات | انحراف +7%",
              "en": "154 MW output | +7% deviation"
            },
            "value": "إتاحة 99%",
            "delta": {
              "ar": "سرعة رياح مستقرة",
              "en": "Stable wind speeds"
            }
          },
          {
            "icon": "leaf",
            "title": {
              "ar": "مختبر التخزين الأخضر",
              "en": "Green Storage Lab"
            },
            "subtitle": {
              "ar": "شحن 68 ميجاوات | تفريغ 52 ميجاوات",
              "en": "Charging 68 MW | Discharging 52 MW"
            },
            "value": "دورة 18%",
            "delta": {
              "ar": "وضع تحسين ذاتي",
              "en": "Auto-optimization active"
            }
          }
        ]
      }
    ],
    "id": "energy",
    "slug": "dashboard-19.html",
    "layout": {
      "shell": "bg-slate-950/18",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.6fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "الطاقة المتجددة",
        "en": "Renewable energy"
      },
      "title": {
        "ar": "تشغيل الطاقة النظيفة",
        "en": "Operate clean energy grids"
      },
      "description": {
        "ar": "رصد التوليد، الاستهلاك، ومخازن الطاقة في الوقت الحقيقي عبر المحطات.",
        "en": "Monitor generation, load, and storage performance across renewable plants in realtime."
      },
      "tags": [
        {
          "ar": "طاقة",
          "en": "Energy"
        },
        {
          "ar": "شبكات",
          "en": "Grids"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "الإنتاج الشمسي الحالي",
              "en": "Current solar output"
            },
            "value": {
              "ar": "612 MW",
              "en": "612 MW"
            }
          },
          {
            "label": {
              "ar": "طاقة الرياح قيد الاستخدام",
              "en": "Wind capacity utilized"
            },
            "value": {
              "ar": "74%",
              "en": "74%"
            }
          },
          {
            "label": {
              "ar": "انبعاثات تم تجنبها اليوم",
              "en": "Emissions avoided today"
            },
            "value": {
              "ar": "1.9 kt CO₂e",
              "en": "1.9 kt CO₂e"
            }
          }
        ]
      }
    ]
  },
  "sports": {
    "defaultLang": "ar",
    "meta": {
      "title": {
        "ar": "لوحة إدارة الرياضة",
        "en": "Sports Management Analytics Dashboard"
      }
    },
    "actions": {
      "open": {
        "ar": "فتح القائمة",
        "en": "Open menu"
      },
      "close": {
        "ar": "إغلاق",
        "en": "Close"
      },
      "collapse": {
        "ar": "تصغير الشريط",
        "en": "Collapse sidebar"
      },
      "expand": {
        "ar": "توسيع الشريط",
        "en": "Expand sidebar"
      }
    },
    "brand": {
      "badge": "SP",
      "name": {
        "ar": "مركز أداء البطولات",
        "en": "Championship Performance Hub"
      },
      "tagline": {
        "ar": "تحليلات للفرق، الجماهير، والعمليات الميدانية",
        "en": "Analytics for teams, fans, and game-day ops"
      }
    },
    "theme": {
      "defaultMode": "dark",
      "dark": {
        "bodyGradient": "from-slate-950 via-purple-950 to-indigo-900",
        "sidebarGradient": "from-slate-950 via-purple-900 to-indigo-900",
        "cardBg": "bg-slate-950/60 backdrop-blur-xl",
        "cardBorder": "border-purple-500/35",
        "accentGradient": "from-purple-400 via-indigo-400 to-emerald-400",
        "accentText": "text-violet-200",
        "highlightBg": "bg-purple-500/15 border-purple-500/35",
        "badgeBg": "bg-purple-500/20",
        "badgeText": "text-white",
        "navActive": "border border-purple-400/50 bg-purple-500/15",
        "navIconBg": "bg-purple-950/50",
        "navBadgeText": "text-purple-200",
        "listBorder": "border border-violet-500/20",
        "listBg": "bg-slate-900/70",
        "timelineIconBg": "bg-violet-500/10",
        "timelineChip": "bg-violet-500/10 text-violet-200",
        "tableHeaderBg": "bg-violet-500/10",
        "cardShadow": "shadow-[0_34px_110px_-54px_rgba(139,92,246,0.7)]"
      },
      "light": {
        "bodyGradient": "from-purple-50 via-white to-indigo-100",
        "sidebarGradient": "from-white via-purple-50 to-indigo-100",
        "cardBg": "bg-white/90 backdrop-blur-xl",
        "cardBorder": "border-purple-200",
        "accentGradient": "from-purple-400 via-indigo-400 to-emerald-400",
        "accentText": "text-violet-600",
        "highlightBg": "bg-purple-500/10 border-purple-200/60",
        "badgeBg": "bg-purple-200/60",
        "badgeText": "text-purple-900",
        "navActive": "border border-purple-200 bg-purple-500/10",
        "navIconBg": "bg-purple-100",
        "navBadgeText": "text-purple-700",
        "listBorder": "border border-violet-100",
        "listBg": "bg-white",
        "timelineIconBg": "bg-violet-100",
        "timelineChip": "bg-violet-100 text-violet-700",
        "tableHeaderBg": "bg-violet-50/80",
        "cardShadow": "shadow-[0_30px_90px_-55px_rgba(139,92,246,0.35)]"
      }
    },
    "nav": [
      {
        "id": "overview",
        "icon": "trophy",
        "label": {
          "ar": "نظرة عامة",
          "en": "Overview"
        },
        "badge": {
          "ar": "نادي",
          "en": "Club"
        }
      },
      {
        "id": "performance",
        "icon": "chart-bar",
        "label": {
          "ar": "أداء الفريق",
          "en": "Team performance"
        }
      },
      {
        "id": "fans",
        "icon": "users",
        "label": {
          "ar": "الجماهير والتذاكر",
          "en": "Fans & tickets"
        }
      },
      {
        "id": "media",
        "icon": "megaphone",
        "label": {
          "ar": "الإعلام والرعاة",
          "en": "Media & sponsors"
        }
      },
      {
        "id": "operations",
        "icon": "play",
        "label": {
          "ar": "عمليات يوم المباراة",
          "en": "Game-day operations"
        }
      }
    ],
    "highlight": {
      "label": {
        "ar": "تنبيه المباراة",
        "en": "Match alert"
      },
      "value": "مباراة نصف النهائي تبدأ خلال 4 ساعات",
      "description": {
        "ar": "تأكد من جاهزية الفريق، التنسيق الجماهيري، وتفعيل مزايا الرعاة قبل الافتتاح.",
        "en": "Ensure squad readiness, fan coordination, and sponsor activations before kickoff."
      }
    },
    "header": {
      "title": {
        "ar": "لوحة أداء النادي الرياضي",
        "en": "Club performance intelligence"
      },
      "subtitle": {
        "ar": "تابع نتائج المباريات، صحة اللاعبين، وتفاعل الجماهير عبر موسم البطولة.",
        "en": "Follow match results, player wellness, and fan engagement throughout the season."
      },
      "primary": {
        "ar": "إعداد تقرير ما قبل المباراة",
        "en": "Prepare pre-match report"
      },
      "secondary": {
        "ar": "جدولة جلسة التدريب",
        "en": "Schedule training session"
      }
    },
    "stats": [
      {
        "icon": "trophy",
        "label": {
          "ar": "سجل الانتصارات هذا الموسم",
          "en": "Season win record"
        },
        "value": "18-3",
        "delta": {
          "ar": "+5 مباريات عن الموسم الماضي",
          "en": "+5 vs last season"
        },
        "trend": "positive"
      },
      {
        "icon": "chart-bar",
        "label": {
          "ar": "متوسط نقاط المباراة",
          "en": "Average points per game"
        },
        "value": "92.6",
        "delta": {
          "ar": "+4.3 خلال آخر 6 مباريات",
          "en": "+4.3 over last 6 games"
        },
        "trend": "positive"
      },
      {
        "icon": "users",
        "label": {
          "ar": "نسبة إشغال المدرجات",
          "en": "Stadium occupancy rate"
        },
        "value": "97%",
        "delta": {
          "ar": "+8% بعد حملة الأعضاء",
          "en": "+8% after member drive"
        },
        "trend": "positive"
      },
      {
        "icon": "heart",
        "label": {
          "ar": "جاهزية اللاعبين الأساسيين",
          "en": "Starting lineup fitness"
        },
        "value": "93%",
        "delta": {
          "ar": "-2% بسبب إصابة طفيفة",
          "en": "-2% minor knock"
        },
        "trend": "negative"
      }
    ],
    "panels": [
      {
        "id": "executive-spotlight",
        "type": "spotlight",
        "kicker": {
          "ar": "موجز القيادة",
          "en": "Executive pulse"
        },
        "metric": {
          "ar": "18-3 سجل الانتصارات هذا الموسم",
          "en": "18-3 Season win record"
        },
        "description": {
          "ar": "تابع نتائج المباريات، صحة اللاعبين، وتفاعل الجماهير عبر موسم البطولة.",
          "en": "Follow match results, player wellness, and fan engagement throughout the season."
        },
        "bullets": [
          {
            "value": "92.6",
            "title": {
              "ar": "متوسط نقاط المباراة",
              "en": "Average points per game"
            },
            "subtitle": {
              "ar": "+4.3 خلال آخر 6 مباريات",
              "en": "+4.3 over last 6 games"
            }
          },
          {
            "value": "97%",
            "title": {
              "ar": "نسبة إشغال المدرجات",
              "en": "Stadium occupancy rate"
            },
            "subtitle": {
              "ar": "+8% بعد حملة الأعضاء",
              "en": "+8% after member drive"
            }
          },
          {
            "value": "93%",
            "title": {
              "ar": "جاهزية اللاعبين الأساسيين",
              "en": "Starting lineup fitness"
            },
            "subtitle": {
              "ar": "-2% بسبب إصابة طفيفة",
              "en": "-2% minor knock"
            }
          }
        ]
      },
      {
        "id": "next-events",
        "type": "schedule",
        "title": {
          "ar": "محطات قادمة",
          "en": "Upcoming checkpoints"
        },
        "action": {
          "ar": "تزامن مع التقويم",
          "en": "Sync to calendar"
        },
        "slots": [
          {
            "title": {
              "ar": "اجتماع الخطط التكتيكية",
              "en": "Tactical briefing"
            },
            "subtitle": {
              "ar": "مراجعة خطط الهجوم والدفاع مع الطاقم الفني.",
              "en": "Review offense/defense scripts with staff."
            },
            "time": {
              "ar": "11:30 صباحاً",
              "en": "11:30 AM"
            }
          },
          {
            "title": {
              "ar": "فتح بوابات الجماهير",
              "en": "Gates open for fans"
            },
            "subtitle": {
              "ar": "تنشيط نقاط البيع والتجارب التفاعلية.",
              "en": "Activate concessions and fan zones."
            },
            "time": {
              "ar": "03:00 عصراً",
              "en": "03:00 PM"
            }
          },
          {
            "title": {
              "ar": "الاستعراض الافتتاحي",
              "en": "Opening ceremony"
            },
            "subtitle": {
              "ar": "عرض ترفيهي مع مشاركة الرعاة واللاعبين القدامى.",
              "en": "Showcase with sponsors and alumni."
            },
            "time": {
              "ar": "05:45 مساءً",
              "en": "05:45 PM"
            }
          }
        ]
      },
      {
        "id": "workflow-board",
        "type": "kanban",
        "title": {
          "ar": "حركة العمل",
          "en": "Workflow board"
        },
        "layout": "md:grid-cols-3",
        "columns": [
          {
            "title": {
              "ar": "التركيز الآن",
              "en": "Immediate focus"
            },
            "cards": [
              {
                "title": {
                  "ar": "سامي الخطيب | جناح هجومي",
                  "en": "Sami Alkhateeb | Forward"
                },
                "subtitle": {
                  "ar": "متوسط 24.8 نقطة | 6 تمريرات",
                  "en": "Avg 24.8 pts | 6 assists"
                },
                "tags": [
                  {
                    "ar": "+3 دقائق عن المتوسط",
                    "en": "+3 mins vs avg."
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "قيد التنفيذ",
              "en": "In execution"
            },
            "cards": [
              {
                "title": {
                  "ar": "مازن عارف | حارس المرمى",
                  "en": "Mazen Aref | Goalkeeper"
                },
                "subtitle": {
                  "ar": "نسبة تصدي 81% | 4 شباك نظيفة",
                  "en": "Save rate 81% | 4 clean sheets"
                },
                "tags": [
                  {
                    "ar": "أعلى أداء في الدوري",
                    "en": "Top league rating"
                  }
                ]
              }
            ],
            "count": "1"
          },
          {
            "title": {
              "ar": "نتائج",
              "en": "Outcomes"
            },
            "cards": [
              {
                "title": {
                  "ar": "خالد البدر | خط الوسط",
                  "en": "Khaled AlBadr | Midfield"
                },
                "subtitle": {
                  "ar": "معدل جهد 89% | تغطية 11.2 كم",
                  "en": "Effort 89% | Coverage 11.2 km"
                },
                "tags": [
                  {
                    "ar": "متاح للمباراة القادمة",
                    "en": "Cleared for next match"
                  }
                ]
              }
            ],
            "count": "1"
          }
        ]
      },
      {
        "id": "overview",
        "type": "chart",
        "span": "xl:col-span-2",
        "title": {
          "ar": "تحليلات الموسم الحالية",
          "en": "Season insights overview"
        },
        "subtitle": {
          "ar": "نقاط القوة والهجوم والدفاع مقارنة بأندية الدوري.",
          "en": "Offense vs defense strengths benchmarked to league."
        },
        "action": {
          "ar": "تحميل ملف التحليل",
          "en": "Download analytics brief"
        },
        "placeholder": {
          "ar": "مخطط الأداء عبر الموسم",
          "en": "Season performance chart"
        }
      },
      {
        "id": "performance",
        "type": "list",
        "title": {
          "ar": "مؤشرات اللاعبين الرئيسيين",
          "en": "Key player metrics"
        },
        "action": {
          "ar": "مشاهدة لقطات الفيديو",
          "en": "Watch highlight reels"
        },
        "items": [
          {
            "icon": "trophy",
            "title": {
              "ar": "سامي الخطيب | جناح هجومي",
              "en": "Sami Alkhateeb | Forward"
            },
            "subtitle": {
              "ar": "متوسط 24.8 نقطة | 6 تمريرات",
              "en": "Avg 24.8 pts | 6 assists"
            },
            "value": "دقيقة لعب 31",
            "delta": {
              "ar": "+3 دقائق عن المتوسط",
              "en": "+3 mins vs avg."
            }
          },
          {
            "icon": "chart-bar",
            "title": {
              "ar": "مازن عارف | حارس المرمى",
              "en": "Mazen Aref | Goalkeeper"
            },
            "subtitle": {
              "ar": "نسبة تصدي 81% | 4 شباك نظيفة",
              "en": "Save rate 81% | 4 clean sheets"
            },
            "value": "ضغط 9.4",
            "delta": {
              "ar": "أعلى أداء في الدوري",
              "en": "Top league rating"
            }
          },
          {
            "icon": "heart",
            "title": {
              "ar": "خالد البدر | خط الوسط",
              "en": "Khaled AlBadr | Midfield"
            },
            "subtitle": {
              "ar": "معدل جهد 89% | تغطية 11.2 كم",
              "en": "Effort 89% | Coverage 11.2 km"
            },
            "value": "جاهزية 96%",
            "delta": {
              "ar": "متاح للمباراة القادمة",
              "en": "Cleared for next match"
            }
          }
        ]
      }
    ],
    "id": "sports",
    "slug": "dashboard-20.html",
    "layout": {
      "shell": "bg-slate-950/18",
      "main": "space-y-12 lg:px-16",
      "stats": "md:grid-cols-2 xl:grid-cols-4 gap-6",
      "panels": "xl:grid-cols-[1.4fr_1fr] gap-y-9"
    },
    "gallery": {
      "badge": {
        "ar": "الرياضة",
        "en": "Sports analytics"
      },
      "title": {
        "ar": "لوحة إدارة الفرق",
        "en": "Team performance cockpit"
      },
      "description": {
        "ar": "مؤشرات الأداء، الصحة، والتفاعل الجماهيري للنوادي الرياضية المحترفة.",
        "en": "Player performance, wellness, and fan engagement analytics for professional clubs."
      },
      "tags": [
        {
          "ar": "أداء",
          "en": "Performance"
        },
        {
          "ar": "جماهير",
          "en": "Fans"
        }
      ]
    },
    "sidebarSections": [
      {
        "type": "list",
        "title": {
          "ar": "مؤشرات سريعة",
          "en": "Quick indicators"
        },
        "items": [
          {
            "label": {
              "ar": "سجل الانتصارات هذا الموسم",
              "en": "Season win record"
            },
            "value": {
              "ar": "18-3",
              "en": "18-3"
            }
          },
          {
            "label": {
              "ar": "متوسط نقاط المباراة",
              "en": "Average points per game"
            },
            "value": {
              "ar": "92.6",
              "en": "92.6"
            }
          },
          {
            "label": {
              "ar": "نسبة إشغال المدرجات",
              "en": "Stadium occupancy rate"
            },
            "value": {
              "ar": "97%",
              "en": "97%"
            }
          }
        ]
      }
    ]
  }
};

function getDashboardBlueprint(id) {
  return DASHBOARD_BLUEPRINTS[id];
}

if (typeof window !== "undefined") {
  window.DASHBOARD_BLUEPRINTS = DASHBOARD_BLUEPRINTS;
  window.getDashboardBlueprint = getDashboardBlueprint;
}

export { DASHBOARD_BLUEPRINTS, getDashboardBlueprint };