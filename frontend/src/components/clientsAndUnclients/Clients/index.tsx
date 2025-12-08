import { useState } from 'react';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { useLanguage } from '@/contexts/LanguageContext';
import ClientsTable from '../ClientsTable';

const ClientsSection = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(true);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-muted/25 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-foreground">{t('clients.list.title')}</p>
            <p className="text-xs text-muted-foreground">{t('clients.list.subtitle')}</p>
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
        <ClientsTable />
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ClientsSection;
