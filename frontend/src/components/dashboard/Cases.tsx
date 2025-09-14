import React, { useState } from 'react';
import { Plus, Search, Filter, Calendar, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface Case {
  id: string;
  title: string;
  client: string;
  status: 'active' | 'pending' | 'closed' | 'urgent';
  date: string;
  nextSession: string;
  type: string;
}

const Cases: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const cases: Case[] = [
    {
      id: '1',
      title: isRTL ? 'نزاع تجاري - شركة الأمل' : 'Commercial Dispute - Al Amal Company',
      client: isRTL ? 'أحمد محمد الخليل' : 'Ahmed Mohammed Al-Khalil',
      status: 'active',
      date: '2024-01-15',
      nextSession: '2024-02-10',
      type: isRTL ? 'تجاري' : 'Commercial'
    },
    {
      id: '2',
      title: isRTL ? 'قضية عقارات - فيلا الرياض' : 'Real Estate Case - Riyadh Villa',
      client: isRTL ? 'فاطمة سعد العتيبي' : 'Fatima Saad Al-Otaibi',
      status: 'urgent',
      date: '2024-01-20',
      nextSession: '2024-02-05',
      type: isRTL ? 'عقاري' : 'Real Estate'
    },
    {
      id: '3',
      title: isRTL ? 'قضية عمالية - حقوق الموظف' : 'Labor Case - Employee Rights',
      client: isRTL ? 'محمد عبدالله الشمري' : 'Mohammed Abdullah Al-Shamri',
      status: 'pending',
      date: '2024-01-25',
      nextSession: '2024-02-15',
      type: isRTL ? 'عمالي' : 'Labor'
    },
    {
      id: '4',
      title: isRTL ? 'قضية أسرية - حضانة أطفال' : 'Family Case - Child Custody',
      client: isRTL ? 'نورا سليمان القحطاني' : 'Nora Sulaiman Al-Qahtani',
      status: 'active',
      date: '2024-02-01',
      nextSession: '2024-02-12',
      type: isRTL ? 'أسري' : 'Family'
    },
    {
      id: '5',
      title: isRTL ? 'قضية جنائية - دفاع عن المتهم' : 'Criminal Case - Defense',
      client: isRTL ? 'سالم ناصر الدوسري' : 'Salem Naser Al-Dosari',
      status: 'closed',
      date: '2023-12-10',
      nextSession: '-',
      type: isRTL ? 'جنائي' : 'Criminal'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/20 text-success';
      case 'pending':
        return 'bg-warning/20 text-warning';
      case 'urgent':
        return 'bg-destructive/20 text-destructive';
      case 'closed':
        return 'bg-muted/20 text-muted-foreground';
      default:
        return 'bg-muted/20 text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return isRTL ? 'نشطة' : 'Active';
      case 'pending':
        return isRTL ? 'معلقة' : 'Pending';
      case 'urgent':
        return isRTL ? 'عاجلة' : 'Urgent';
      case 'closed':
        return isRTL ? 'مغلقة' : 'Closed';
      default:
        return status;
    }
  };

  const filteredCases = cases.filter(
    caseItem =>
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            {t('nav.cases')}
          </h1>
          <p className="text-muted-foreground">
            {isRTL ? 'إدارة ومتابعة جميع القضايا القانونية' : 'Manage and track all legal cases'}
          </p>
        </div>
        <Button variant="hero" className="w-full sm:w-auto">
          <Plus className="h-4 w-4" />
          {isRTL ? 'قضية جديدة' : 'New Case'}
        </Button>
      </div>

      {/* Search and Filters */}
      <GlassCard variant="primary">
        <GlassCardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className={`absolute top-3 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
              <Input
                placeholder={isRTL ? 'البحث في القضايا...' : 'Search cases...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`glass ${isRTL ? 'pr-10' : 'pl-10'}`}
              />
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4" />
              {isRTL ? 'تصفية' : 'Filter'}
            </Button>
          </div>
        </GlassCardContent>
      </GlassCard>

      {/* Cases Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCases.map((caseItem, index) => (
          <GlassCard
            key={caseItem.id}
            variant="primary"
            hover="glow"
            className="group animate-fade-in cursor-pointer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <GlassCardHeader>
              <div className="flex items-start justify-between gap-2">
                <GlassCardTitle className="text-lg leading-tight group-hover:text-accent transition-colors">
                  {caseItem.title}
                </GlassCardTitle>
                <Badge className={getStatusColor(caseItem.status)}>
                  {getStatusLabel(caseItem.status)}
                </Badge>
              </div>
              <GlassCardDescription className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {caseItem.client}
              </GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {isRTL ? 'النوع:' : 'Type:'}
                  </span>
                  <Badge variant="outline">{caseItem.type}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {isRTL ? 'تاريخ البدء:' : 'Start Date:'}
                  </span>
                  <span>{new Date(caseItem.date).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}</span>
                </div>
                {caseItem.nextSession !== '-' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {isRTL ? 'الجلسة القادمة:' : 'Next Session:'}
                    </span>
                    <span className="flex items-center gap-1 text-accent">
                      <Calendar className="h-3 w-3" />
                      {new Date(caseItem.nextSession).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US')}
                    </span>
                  </div>
                )}
                {caseItem.status === 'urgent' && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    {isRTL ? 'تحتاج إلى اهتمام فوري' : 'Needs immediate attention'}
                  </div>
                )}
              </div>
            </GlassCardContent>
          </GlassCard>
        ))}
      </div>

      {filteredCases.length === 0 && (
        <GlassCard variant="primary" className="text-center py-12">
          <GlassCardContent>
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">
              {isRTL ? 'لا توجد قضايا' : 'No cases found'}
            </p>
            <p className="text-muted-foreground">
              {isRTL ? 'لم يتم العثور على قضايا تطابق البحث' : 'No cases match your search criteria'}
            </p>
          </GlassCardContent>
        </GlassCard>
      )}
    </div>
  );
};

export default Cases;