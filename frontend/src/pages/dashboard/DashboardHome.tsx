import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import LegalIcon from "@/components/common/LegalIcon";
import { getIconDesign } from "@/config/iconography";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  TooltipProps,
} from "recharts";
import { TrendingUp, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import type { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

const DashboardHome = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  const palette = useMemo(
    () => ({
      primary: "hsl(var(--chart-primary))",
      accent: "hsl(var(--chart-secondary))",
      tertiary: "hsl(var(--chart-tertiary))",
      muted: "hsl(var(--chart-muted))",
    }),
    []
  );

  const revenueFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "ar" ? "ar-EG" : "en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(25000),
    [language]
  );

  const caseData = useMemo(
    () =>
      [
        { month: language === "ar" ? "يناير" : "Jan", cases: 65 },
        { month: language === "ar" ? "فبراير" : "Feb", cases: 59 },
        { month: language === "ar" ? "مارس" : "Mar", cases: 80 },
        { month: language === "ar" ? "أبريل" : "Apr", cases: 81 },
        { month: language === "ar" ? "مايو" : "May", cases: 56 },
        { month: language === "ar" ? "يونيو" : "Jun", cases: 95 },
      ],
    [language]
  );

  const caseStatusData = useMemo(
    () =>
      [
        { name: language === "ar" ? "نشطة" : "Active", value: 45, color: palette.primary },
        { name: language === "ar" ? "مكتملة" : "Completed", value: 30, color: "hsl(var(--success))" },
        { name: language === "ar" ? "معلقة" : "Pending", value: 15, color: "hsl(var(--warning))" },
        { name: language === "ar" ? "مؤجلة" : "On Hold", value: 10, color: palette.muted },
      ],
    [language, palette.primary, palette.muted]
  );

  const stats = [
    {
      title: language === "ar" ? "إجمالي القضايا" : "Total Cases",
      value: "247",
      change: "+12%",
      iconKey: "cases" as const,
    },
    {
      title: language === "ar" ? "العملاء النشطون" : "Active Clients",
      value: "89",
      change: "+8%",
      iconKey: "clients" as const,
    },
    {
      title: language === "ar" ? "الإيرادات الشهرية" : "Monthly Revenue",
      value: revenueFormatter,
      change: "+15%",
      iconKey: "reports" as const,
    },
    {
      title: language === "ar" ? "المواعيد القادمة" : "Upcoming Appointments",
      value: "12",
      change: "+3",
      iconKey: "sessions" as const,
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: language === "ar" ? "قضية جديدة مُضافة" : "New case added",
      client: language === "ar" ? "شركة الخليج" : "Gulf Corporation",
      time: language === "ar" ? "منذ 2 ساعة" : "2 hours ago",
      status: "new" as const,
    },
    {
      id: 2,
      action: language === "ar" ? "تم إكمال المستند" : "Document completed",
      client: language === "ar" ? "أحمد المحمدي" : "Ahmed Al-Mohammadi",
      time: language === "ar" ? "منذ 4 ساعات" : "4 hours ago",
      status: "completed" as const,
    },
    {
      id: 3,
      action: language === "ar" ? "موعد مجدول" : "Appointment scheduled",
      client: language === "ar" ? "شركة النور" : "Al-Noor Company",
      time: language === "ar" ? "منذ 6 ساعات" : "6 hours ago",
      status: "scheduled" as const,
    },
  ];

  const renderTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-lg border border-border/60 bg-card/95 px-3 py-2 shadow-lg backdrop-blur">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm text-foreground">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color as string }} />
            <span className="font-semibold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6" dir={language === "ar" ? "rtl" : "ltr"}>
      <div className="grid gap-6 lg:grid-cols-[2.2fr_1fr]">
        <Card className="card-premium">
          <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <Badge className="w-fit rounded-full border border-border/40 bg-background/40 px-4 py-1 text-xs uppercase tracking-[0.3em] text-muted-foreground" variant="outline">
                {theme === "dark"
                  ? language === "ar" ? "أداء ليلي" : "Night Insight"
                  : language === "ar" ? "أداء نهاري" : "Daylight Insight"}
              </Badge>
              <div className="space-y-1">
                <h1 className="text-2xl font-display font-bold tracking-tight sm:text-3xl">
                  {language === "ar" ? "مرحباً بك في لوحة التحكم" : "Welcome to Your Dashboard"}
                </h1>
                <p className="max-w-xl text-sm text-muted-foreground">
                  {language === "ar"
                    ? "نقدّم لك لمحة محدثة عن القضايا، العملاء والأداء المالي"
                    : "Get an updated snapshot of your cases, clients, and revenue streams."}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-2 rounded-full bg-background/60 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-primary))]" />
                  {language === "ar" ? "القضايا النشطة" : "Active Cases"}
                </div>
                <div className="flex items-center gap-2 rounded-full bg-background/60 px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-[hsl(var(--chart-secondary))]" />
                  {language === "ar" ? "قضايا مكتملة" : "Completed"}
                </div>
              </div>
            </div>
            <div className="relative flex h-full min-h-[160px] w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-[hsl(var(--primary)/0.08)] to-[hsl(var(--accent)/0.1)] sm:w-[220px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.2),transparent_60%)]" />
              <LegalIcon iconKey="dashboard" width={72} height={72} className="relative text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="dashboard-section-title flex items-center gap-2 text-base">
              <AlertCircle className="h-5 w-5 text-[hsl(var(--chart-secondary))]" />
              {language === "ar" ? "نظرة سريعة" : "Quick Glance"}
            </CardTitle>
            <CardDescription>
              {language === "ar" ? "أرقام اليوم المميزة" : "Today's highlights"}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {[
              { label: language === "ar" ? "جلسات اليوم" : "Sessions Today", value: "5" },
              { label: language === "ar" ? "وثائق قيد المراجعة" : "Docs in Review", value: "14" },
              { label: language === "ar" ? "نسبة الالتزام" : "Compliance", value: "92%" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl bg-background/60 px-4 py-3 text-sm font-medium text-muted-foreground"
              >
                <span>{item.label}</span>
                <span className="text-foreground">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="dashboard-bento">
        {stats.map((stat, index) => {
          const design = getIconDesign(stat.iconKey);
          return (
            <Card key={index} className="card-premium">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold tracking-tight text-text-strong">{stat.value}</p>
                    <Badge variant="secondary" className="mt-1 w-fit rounded-full px-3">
                      {stat.change}
                    </Badge>
                  </div>
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-2xl",
                      design.badgeClass ?? "text-white"
                    )}
                    style={{
                      background: design.badgeGradient,
                      boxShadow: design.shadow ?? "var(--shadow-premium)",
                    }}
                  >
                    <LegalIcon iconKey={stat.iconKey} width={28} height={28} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {language === "ar" ? "القضايا والإيرادات" : "Cases & Revenue"}
            </CardTitle>
            <CardDescription>
              {language === "ar" ? "نظرة عامة على الأداء الشهري" : "Monthly performance overview"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={caseData}>
                <defs>
                  <linearGradient id="casesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={palette.primary} stopOpacity={0.95} />
                    <stop offset="100%" stopColor={palette.primary} stopOpacity={0.25} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.6)" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" tickLine={false} axisLine={false} />
                <Tooltip content={renderTooltip} cursor={{ fill: "hsl(var(--muted) / 0.3)" }} />
                <Bar dataKey="cases" fill="url(#casesGradient)" radius={[12, 12, 12, 12]} barSize={26} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LegalIcon iconKey="cases" width={20} height={20} />
              {language === "ar" ? "توزيع حالة القضايا" : "Case Status Distribution"}
            </CardTitle>
            <CardDescription>
              {language === "ar" ? "التوزيع الحالي للقضايا حسب الحالة" : "Current distribution of cases by status"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={caseStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={110} dataKey="value">
                  {caseStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={renderTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-4">
              {caseStatusData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <Badge variant="outline">{item.value}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.7fr_1fr]">
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {language === "ar" ? "الأنشطة الأخيرة" : "Recent Activities"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-background/60 px-4 py-3 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-full",
                        activity.status === "new"
                          ? "bg-[hsl(var(--chart-primary))]/15 text-[hsl(var(--chart-primary))]"
                          : activity.status === "completed"
                          ? "bg-success/15 text-success"
                          : "bg-warning/15 text-warning"
                      )}
                    >
                      {activity.status === "new" && <AlertCircle className="h-4 w-4" />}
                      {activity.status === "completed" && <CheckCircle className="h-4 w-4" />}
                      {activity.status === "scheduled" && <Clock className="h-4 w-4" />}
                    </span>
                    <div>
                      <p className="font-medium text-text-strong">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.client}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle>{language === "ar" ? "إجراءات سريعة" : "Quick Actions"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="btn-premium w-full justify-start gap-3">
              <LegalIcon iconKey="cases" width={20} height={20} />
              {language === "ar" ? "قضية جديدة" : "New Case"}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 rounded-2xl border-border/60 bg-background/70">
              <LegalIcon iconKey="clients" width={20} height={20} />
              {language === "ar" ? "إضافة عميل" : "Add Client"}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 rounded-2xl border-border/60 bg-background/70">
              <LegalIcon iconKey="sessions" width={20} height={20} />
              {language === "ar" ? "جدولة موعد" : "Schedule Meeting"}
            </Button>
            <Button variant="outline" className="w-full justify-start gap-3 rounded-2xl border-border/60 bg-background/70">
              <LegalIcon iconKey="documents" width={20} height={20} />
              {language === "ar" ? "إنشاء مستند" : "Create Document"}
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            {language === "ar" ? "تقدم المهام" : "Task Progress"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: language === "ar" ? "مراجعة الوثائق" : "Document Review", value: 75 },
              { label: language === "ar" ? "متابعة العملاء" : "Client Follow-up", value: 60 },
              { label: language === "ar" ? "إعداد التقارير" : "Report Preparation", value: 90 },
            ].map((task) => (
              <div key={task.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{task.label}</span>
                  <span className="text-sm text-muted-foreground">{task.value}%</span>
                </div>
                <Progress value={task.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
