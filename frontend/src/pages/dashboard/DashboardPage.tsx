'use client';

import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Calendar,
  ClipboardList,
  DollarSign,
  Sparkles,
  Users,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import QuickActions, { type Action } from '@/components/dashboard/QuickActions';
import DashboardActivityItem from '@/components/dashboard/DashboardActivityItem';
import DashboardStatCard from '@/components/dashboard/DashboardStatCard';
import DashboardTaskItem from '@/components/dashboard/DashboardTaskItem';
import RecentCases from '@/components/dashboard/RecentCases';
import CasesByStatusChart from '@/components/dashboard/CasesByStatusChart';
import PageHeader from '@/components/common/PageHeader';
import { AppCard } from '@/components/common/AppCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { shellContainer } from '@/components/layout/layout-classes';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import GlobalSpinner from '@/components/common/GlobalSpinner';
import { Client, type DashboardClient } from '@/pages/dashboard/api';

type DetailSection = 'cases' | 'services';
type DetailSubTab = 'procedures' | 'sessions' | 'ads' | null;

interface ClientViewState {
  section: DetailSection;
  itemId: string | null;
  subTab: DetailSubTab;
}

const RECENT_CASES = [
  { id: 1, title: 'Commercial Contract Dispute', client: 'Ahmed Ali', category: 'Corporate', statusColor: 'bg-emerald-500' },
  { id: 2, title: 'Employment Appeal', client: 'Sara Ibrahim', category: 'Labor', statusColor: 'bg-amber-500' },
  { id: 3, title: 'Property Fraud', client: 'Global Corp', category: 'Criminal', statusColor: 'bg-rose-500' },
];

const SERVICE_ITEMS = [
  { id: 'srv-1', title: 'Contract drafting', status: 'active' },
  { id: 'srv-2', title: 'Legal consultation', status: 'pending' },
  { id: 'srv-3', title: 'Case review', status: 'active' },
];

export default function DashboardPage() {
  const { t, language } = useLanguage();
  const isArabic = language === 'ar';
  const [query, setQuery] = useState('');
  const [clients, setClients] = useState<DashboardClient[]>([]);
  const [loadingClients, setLoadingClients] = useState(true);
  const [clientsError, setClientsError] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<DashboardClient | null>(null);
  const [activeResultIndex, setActiveResultIndex] = useState(-1);
  const [viewState, setViewState] = useState<ClientViewState>({
    section: 'cases',
    itemId: null,
    subTab: null,
  });
  const resultsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoadingClients(true);
    Client.list()
      .then((response) => {
        if (!isMounted) return;
        setClients(response);
        setClientsError(null);
      })
      .catch(() => {
        if (!isMounted) return;
        setClientsError(isArabic ? 'حدث خطأ أثناء تحميل العملاء' : 'Failed to load clients.');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoadingClients(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isArabic]);

  const handleSelectClient = useCallback((client: DashboardClient) => {
    setSelectedClient(client);
    setViewState({ section: 'cases', itemId: null, subTab: null });
    setActiveResultIndex(-1);
  }, []);

  const filteredClients = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return clients.filter((client) => {
      const fields = [client.name, client.slug, client.phoneNumber ?? ''];
      return fields.some((field) => field.toLowerCase().includes(normalizedQuery));
    });
  }, [clients, query]);

  const hasQuery = query.trim().length > 0;
  const hasResults = filteredClients.length > 0;
  const hideDashboardWidgets = hasQuery || selectedClient;

  useEffect(() => {
    setActiveResultIndex(-1);
  }, [query]);

  useEffect(() => {
    if (!resultsRef.current) return;
    const activeRow = resultsRef.current.querySelector<HTMLTableRowElement>(
      `tr[data-index='${activeResultIndex}']`,
    );
    if (activeRow) {
      activeRow.scrollIntoView({ block: 'nearest' });
    }
  }, [activeResultIndex]);

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!hasResults) {
      if (event.key === 'Escape') {
        setQuery('');
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveResultIndex((prev) => Math.min(prev + 1, filteredClients.length - 1));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveResultIndex((prev) => Math.max(prev - 1, 0));
    }

    if (event.key === 'Enter' && activeResultIndex >= 0) {
      event.preventDefault();
      handleSelectClient(filteredClients[activeResultIndex]);
    }

    if (event.key === 'Escape') {
      setQuery('');
      setActiveResultIndex(-1);
    }
  };

  const quickActions = useMemo<Action[]>(
    () => [
      { label: t('dashboard.new_case'), to: '/dashboard/cases', iconKey: 'cases', variant: 'premium' },
      { label: t('dashboard.add_client'), to: '/dashboard/clients', iconKey: 'clients', variant: 'secondary' },
      { label: t('dashboard.schedule_session'), to: '/dashboard/sessions', iconKey: 'sessions', variant: 'outline' },
      { label: t('dashboard.manage_services'), to: '/dashboard/services', iconKey: 'services', variant: 'ghost' },
    ],
    [t],
  );

  const stats = useMemo(
    () => [
      {
        title: t('dashboard.kpis.openCases'),
        value: '80',
        description: t('dashboard.total_cases'),
        icon: Briefcase,
        trend: '+8%',
        trendColor: 'text-green-600 dark:text-emerald-400',
      },
      {
        title: t('dashboard.kpis.activeClients'),
        value: '120',
        description: t('dashboard.active_clients'),
        icon: Users,
        trend: '+5%',
        trendColor: 'text-green-600 dark:text-emerald-400',
      },
      {
        title: t('dashboard.upcoming_sessions'),
        value: '18',
        description: isArabic ? 'هذا الشهر' : 'This month',
        icon: Calendar,
        trend: '+3',
        trendColor: 'text-brand-primary',
      },
      {
        title: t('dashboard.total_revenue'),
        value: '$240k',
        description: isArabic ? 'إيرادات هذا الربع' : 'Quarter to date',
        icon: DollarSign,
        trend: '+12%',
        trendColor: 'text-green-600 dark:text-emerald-400',
      },
    ],
    [isArabic, t],
  );

  const casesByStatus = useMemo(
    () => [
      { name: t('dashboard.active'), value: 45 },
      { name: t('dashboard.pending'), value: 22 },
      { name: t('dashboard.closed'), value: 15 },
      { name: t('dashboard.on_hold'), value: 9 },
    ],
    [t],
  );

  const recentActivity = useMemo(
    () => [
      {
        title: isArabic ? 'تمت إضافة قضية جديدة' : 'New case added',
        description: isArabic ? 'قضية تحكيم تجاري للعميل فهد الصالح' : 'Commercial arbitration case for Fahd Al-Saleh',
        status: 'success',
        time: '09:30',
        type: 'case',
      },
      {
        title: isArabic ? 'جلسة قادمة' : 'Upcoming session',
        description: isArabic ? 'جلسة استئناف - شركة الندى' : 'Appeal session - Al Nada Co.',
        status: 'warning',
        time: '13:00',
        type: 'session',
      },
      {
        title: isArabic ? 'مستند موقّع' : 'Document signed',
        description: isArabic ? 'اتفاقية تسوية مع العميل سارة' : 'Settlement agreement with client Sara',
        status: 'info',
        time: '16:10',
        type: 'document',
      },
    ],
    [isArabic],
  );

  const tasks = useMemo(
    () => [
      {
        title: isArabic ? 'إعداد مذكرة دفاع' : 'Prepare defense memo',
        time: isArabic ? 'اليوم - 5 مساءً' : 'Today - 5 PM',
        priority: 'high' as const,
      },
      {
        title: isArabic ? 'متابعة مع العميل' : 'Follow up with client',
        time: isArabic ? 'غداً - 11 صباحاً' : 'Tomorrow - 11 AM',
        priority: 'medium' as const,
      },
      {
        title: isArabic ? 'مراجعة عقد شراكة' : 'Review partnership agreement',
        time: isArabic ? 'الجمعة - 3 مساءً' : 'Friday - 3 PM',
        priority: 'low' as const,
      },
    ],
    [isArabic],
  );

  const renderActivityIcon = (type: string) => {
    switch (type) {
      case 'case':
        return <Briefcase className="h-5 w-5" />;
      case 'session':
        return <Calendar className="h-5 w-5" />;
      case 'document':
        return <ClipboardList className="h-5 w-5" />;
      default:
        return <Sparkles className="h-5 w-5" />;
    }
  };

  const getActivityStatusVariant = (status: string) => {
    if (status === 'success') return 'default';
    if (status === 'warning') return 'destructive';
    return 'secondary';
  };

  const getActivityStatusLabel = (status: string) => {
    if (status === 'success') return isArabic ? 'مكتمل' : 'Completed';
    if (status === 'warning') return isArabic ? 'قادمة' : 'Upcoming';
    return isArabic ? 'معلومة' : 'Info';
  };

  const renderTaskIcon = (priority: string) => {
    if (priority === 'high') return <Sparkles className="h-4 w-4" />;
    if (priority === 'medium') return <ClipboardList className="h-4 w-4" />;
    return <Calendar className="h-4 w-4" />;
  };

  const highlightMatch = (text: string) => {
    if (!hasQuery) return text;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.trim().toLowerCase();
    const index = lowerText.indexOf(lowerQuery);
    if (index === -1) return text;

    const before = text.slice(0, index);
    const match = text.slice(index, index + lowerQuery.length);
    const after = text.slice(index + lowerQuery.length);

    return (
      <>
        {before}
        <span className="rounded bg-amber-100 px-1 text-amber-800 dark:bg-amber-400/20 dark:text-amber-200">
          {match}
        </span>
        {after}
      </>
    );
  };

  const breadcrumbItems = useMemo(() => {
    const items = [isArabic ? 'لوحة التحكم' : 'Dashboard', isArabic ? 'بحث' : 'Search'];
    if (selectedClient) {
      items.push(selectedClient.name);
      if (viewState.section === 'cases') {
        items.push(isArabic ? 'القضايا' : 'Cases');
      } else {
        items.push(isArabic ? 'الخدمات' : 'Services');
      }
      if (viewState.itemId) {
        items.push(viewState.section === 'cases' ? `#${viewState.itemId}` : `#${viewState.itemId}`);
      }
      if (viewState.subTab) {
        const subTabLabel = viewState.subTab === 'procedures'
          ? isArabic ? 'الإجراءات' : 'Procedures'
          : viewState.subTab === 'sessions'
            ? isArabic ? 'الجلسات' : 'Sessions'
            : isArabic ? 'الإعلانات' : 'Ads';
        items.push(subTabLabel);
      }
    }
    return items;
  }, [isArabic, selectedClient, viewState]);

  return (
    <div className={cn(shellContainer, 'space-y-8 px-4 sm:px-6 lg:px-8')}>
      <PageHeader
        iconKey="dashboard"
        title={t('dashboard.title')}
        subtitle={isArabic ? 'لمحة سريعة عن سير العمل والأداء' : "Quick snapshot of today's workload"}
        actions={
          <Link
            to="/dashboard/reports"
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            {isArabic ? 'عرض التقارير' : 'View reports'}
          </Link>
        }
      />

      <div className="sticky top-20 z-20 rounded-2xl border border-border bg-background/95 p-4 shadow-soft backdrop-blur sm:top-24">
        <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>{isArabic ? 'ابحث عن موكل بالاسم أو الهاتف أو الرقم التعريفي' : 'Search clients by name, phone, or ID'}</span>
          {hasQuery && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedClient(null);
              }}
              className="text-xs font-semibold text-brand-primary hover:underline"
            >
              {isArabic ? 'مسح البحث' : 'Clear search'}
            </button>
          )}
        </div>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder={isArabic ? 'ابدأ بالكتابة...' : 'Start typing...'}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground shadow-sm outline-none transition focus:border-brand-primary"
        />

        <AnimatePresence>
          {(hasQuery || loadingClients || clientsError) && !selectedClient && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-3 overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              {loadingClients && (
                <div className="py-6">
                  <GlobalSpinner />
                </div>
              )}

              {clientsError && (
                <div className="px-4 py-6 text-center text-sm font-semibold text-destructive">
                  {clientsError}
                </div>
              )}

              {!loadingClients && !clientsError && hasQuery && !hasResults && (
                <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                  {isArabic ? 'لم يتم العثور على نتائج مطابقة.' : 'No matching clients found.'}
                </div>
              )}

              {!loadingClients && !clientsError && hasResults && (
                <div className="max-h-[320px] overflow-auto" ref={resultsRef}>
                  <table className="w-full border-collapse text-sm">
                    <thead className="bg-gradient-to-r from-brand-primary to-indigo-500 text-white">
                      <tr className="text-center">
                        <th className="px-4 py-3">{isArabic ? 'رقم الموكل' : 'Client ID'}</th>
                        <th className="px-4 py-3">{isArabic ? 'الاسم' : 'Name'}</th>
                        <th className="px-4 py-3">{isArabic ? 'رقم الجوال' : 'Phone'}</th>
                        <th className="px-4 py-3">{isArabic ? 'الحالة' : 'Status'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredClients.map((client, index) => {
                        const isActive = index === activeResultIndex;
                        return (
                          <tr
                            key={client.id}
                            data-index={index}
                            onClick={() => handleSelectClient(client)}
                            className={cn(
                              'cursor-pointer text-center transition hover:bg-muted/60',
                              isActive && 'bg-muted/60',
                            )}
                          >
                            <td className="px-4 py-3 font-semibold">{highlightMatch(client.slug)}</td>
                            <td className="px-4 py-3">{highlightMatch(client.name)}</td>
                            <td className="px-4 py-3">{client.phoneNumber ? highlightMatch(client.phoneNumber) : '—'}</td>
                            <td className="px-4 py-3">
                              <span
                                className={cn(
                                  'rounded-full px-2 py-1 text-xs font-semibold text-white',
                                  client.status === 'active' ? 'bg-emerald-500' : 'bg-rose-500',
                                )}
                              >
                                {client.status === 'active' ? (isArabic ? 'نشط' : 'Active') : (isArabic ? 'غير نشط' : 'Inactive')}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="space-y-4"
          >
            <Card>
              <CardContent className="space-y-4 p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? 'عميل محدد' : 'Selected client'}
                    </p>
                    <h2 className="text-xl font-bold text-foreground">{selectedClient.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedClient.slug} • {selectedClient.phoneNumber ?? '—'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedClient(null)}
                    className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-rose-600"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    {isArabic ? 'رجوع للبحث' : 'Back to search'}
                  </button>
                </div>

                <nav className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  {breadcrumbItems.map((item, index) => (
                    <div key={`${item}-${index}`} className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{item}</span>
                      {index < breadcrumbItems.length - 1 && (
                        <ChevronRight className="h-3 w-3 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </nav>

                <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
                  <ClientTreeNav
                    client={selectedClient}
                    viewState={viewState}
                    isArabic={isArabic}
                    onChangeSection={(section) => setViewState({ section, itemId: null, subTab: null })}
                    onSelectItem={(itemId) => setViewState((prev) => ({ ...prev, itemId, subTab: null }))}
                  />
                  <ClientDetailsView
                    client={selectedClient}
                    viewState={viewState}
                    isArabic={isArabic}
                    onChangeSubTab={(subTab) => setViewState((prev) => ({ ...prev, subTab }))}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {!hideDashboardWidgets && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>{t('dashboard.quick_actions')}</CardTitle>
            </CardHeader>
            <CardContent>
              <QuickActions actions={quickActions} />
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <DashboardStatCard key={item.title} {...item} />
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <CasesByStatusChart data={casesByStatus} title={t('dashboard.cases_by_status')} />
            </div>
            <RecentCases
              title={t('dashboard.recent_cases')}
              cases={RECENT_CASES.map((item) => ({
                ...item,
                title: isArabic
                  ? item.title.replace('Commercial', 'تجاري').replace('Employment', 'عمالي')
                  : item.title,
                client: isArabic ? `${item.client} (عميل)` : item.client,
                category: isArabic ? `${item.category} • ${t('dashboard.active')}` : item.category,
              }))}
            />
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-brand-primary" />
                  {t('dashboard.recentActivity')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity) => (
                  <DashboardActivityItem
                    key={activity.title}
                    language={language}
                    renderActivityIcon={renderActivityIcon}
                    getActivityStatusLabel={getActivityStatusLabel}
                    getActivityStatusVariant={getActivityStatusVariant}
                    {...activity}
                  />
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="h-5 w-5 text-brand-primary" />
                  {isArabic ? 'مهامك' : 'Your tasks'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {tasks.map((task) => (
                  <DashboardTaskItem
                    key={task.title}
                    language={language}
                    renderTaskIcon={renderTaskIcon}
                    {...task}
                  />
                ))}
              </CardContent>
            </Card>
          </div>

          <AppCard className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{isArabic ? 'أقرب جلسة قادمة' : 'Nearest upcoming session'}</p>
              <h3 className="text-xl font-bold text-foreground">{isArabic ? 'قضية استئناف - المحكمة التجارية' : 'Appeal hearing - Commercial court'}</h3>
              <p className="text-sm text-muted-foreground">{isArabic ? 'الخميس، 5 ديسمبر - 10:30 صباحاً' : 'Thursday, Dec 5 - 10:30 AM'}</p>
            </div>
            <Link
              to="/dashboard/sessions"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-soft hover:opacity-90"
            >
              {isArabic ? 'عرض الجدول' : 'View schedule'}
            </Link>
          </AppCard>
        </>
      )}
    </div>
  );
}

function ClientTreeNav({
  client,
  viewState,
  isArabic,
  onChangeSection,
  onSelectItem,
}: {
  client: DashboardClient;
  viewState: ClientViewState;
  isArabic: boolean;
  onChangeSection: (section: DetailSection) => void;
  onSelectItem: (itemId: string) => void;
}) {
  const clientCases = RECENT_CASES.filter((item) => item.client === client.name);

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-semibold text-foreground">🌳 {client.name}</h3>
      <div className="space-y-4 text-sm">
        <div>
          <button
            type="button"
            onClick={() => onChangeSection('cases')}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-semibold transition hover:bg-muted',
              viewState.section === 'cases' && 'bg-muted',
            )}
          >
            <span>📁 {isArabic ? 'القضايا' : 'Cases'}</span>
            <span className="text-xs text-muted-foreground">{clientCases.length}</span>
          </button>
          <div className="mt-2 space-y-2 pl-3">
            {clientCases.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'لا توجد قضايا حالياً.' : 'No cases available.'}
              </p>
            )}
            {clientCases.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectItem(String(item.id))}
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs transition hover:bg-muted/60',
                  viewState.section === 'cases' && viewState.itemId === String(item.id) && 'bg-muted/60 font-semibold',
                )}
              >
                <span>{item.title}</span>
                <span className="text-[10px] text-muted-foreground">{item.category}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => onChangeSection('services')}
            className={cn(
              'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left font-semibold transition hover:bg-muted',
              viewState.section === 'services' && 'bg-muted',
            )}
          >
            <span>🧾 {isArabic ? 'الخدمات' : 'Services'}</span>
            <span className="text-xs text-muted-foreground">{SERVICE_ITEMS.length}</span>
          </button>
          <div className="mt-2 space-y-2 pl-3">
            {SERVICE_ITEMS.map((service) => (
              <button
                key={service.id}
                type="button"
                onClick={() => onSelectItem(service.id)}
                className={cn(
                  'flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-xs transition hover:bg-muted/60',
                  viewState.section === 'services' && viewState.itemId === service.id && 'bg-muted/60 font-semibold',
                )}
              >
                <span>{service.title}</span>
                <span className="text-[10px] text-muted-foreground">{service.status}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientDetailsView({
  client,
  viewState,
  isArabic,
  onChangeSubTab,
}: {
  client: DashboardClient;
  viewState: ClientViewState;
  isArabic: boolean;
  onChangeSubTab: (subTab: DetailSubTab) => void;
}) {
  const showDetails = Boolean(viewState.itemId);
  const tabs: { id: DetailSubTab; label: string }[] = [
    { id: 'procedures', label: isArabic ? 'الإجراءات' : 'Procedures' },
    { id: 'sessions', label: isArabic ? 'الجلسات' : 'Sessions' },
    { id: 'ads', label: isArabic ? 'الإعلانات' : 'Ads' },
  ];

  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {viewState.section === 'cases' ? (isArabic ? '📌 القضايا' : '📌 Cases') : (isArabic ? '📌 الخدمات' : '📌 Services')}
          </h3>
          <p className="text-xs text-muted-foreground">
            {viewState.section === 'cases'
              ? isArabic ? 'اختر قضية لرؤية التفاصيل.' : 'Select a case to view details.'
              : isArabic ? 'اختر خدمة لرؤية التفاصيل.' : 'Select a service to view details.'}
          </p>
        </div>
      </div>

      {showDetails ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-muted/40 p-4">
            <p className="text-sm font-semibold text-foreground">
              {viewState.section === 'cases' ? (isArabic ? 'قضية' : 'Case') : (isArabic ? 'خدمة' : 'Service')} #{viewState.itemId}
            </p>
            <p className="text-xs text-muted-foreground">
              {viewState.section === 'cases'
                ? isArabic ? `تفاصيل القضايا لـ ${client.name}.` : `Case details for ${client.name}.`
                : isArabic ? `تفاصيل الخدمات لـ ${client.name}.` : `Service details for ${client.name}.`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChangeSubTab(tab.id)}
                className={cn(
                  'rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:bg-muted',
                  viewState.subTab === tab.id && 'border-brand-primary text-brand-primary',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-muted/20 p-4 text-sm text-muted-foreground">
            {viewState.subTab
              ? isArabic ? `عرض ${viewState.subTab} لـ ${client.name}.` : `Viewing ${viewState.subTab} for ${client.name}.`
              : isArabic ? 'اختر تبويباً لرؤية التفاصيل.' : 'Choose a tab to view details.'}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
          {viewState.section === 'cases'
            ? isArabic ? 'اختر قضية من الشجرة لعرض التفاصيل.' : 'Select a case from the tree to view details.'
            : isArabic ? 'اختر خدمة من الشجرة لعرض التفاصيل.' : 'Select a service from the tree to view details.'}
        </div>
      )}
    </div>
  );
}
