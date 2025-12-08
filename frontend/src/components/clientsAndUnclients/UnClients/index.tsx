import { useState } from 'react';
import { ChevronDown, ChevronUp, UserPlus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';
import UnclientsTable from '../UnclientsTable';

const UnclientsSection = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/25 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
            <UserPlus className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">{t('unclients.list.title')}</p>
            <p className="text-xs text-muted-foreground">{t('unclients.list.subtitle')}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden rounded-full bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground shadow-inner shadow-border/60 sm:inline-block">
            {open ? t('table.detailsCard.hideDetails') : t('table.detailsCard.showDetails')}
          </span>
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-full">
              {open ? t('common.collapse') : t('common.expand')}
              {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>

      <CollapsibleContent className="space-y-6 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
        <UnclientsTable />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default UnclientsSection;
 