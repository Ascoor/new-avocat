import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Gavel, Briefcase, Activity } from 'lucide-react';

import { Card } from '@/components/ui/card';
import SearchHubV2 from '@/features/clients/SearchHubV2';
import { fetchClients, fetchLegalCases, fetchServices } from '@/lib/v2-api';

const DashboardLandingV2 = () => {
  const clientsQuery = useQuery({
    queryKey: ['v2-clients'],
    queryFn: fetchClients,
    staleTime: 5 * 60 * 1000,
  });

  const casesQuery = useQuery({
    queryKey: ['v2-legal-cases'],
    queryFn: fetchLegalCases,
    staleTime: 5 * 60 * 1000,
  });

  const servicesQuery = useQuery({
    queryKey: ['v2-services'],
    queryFn: fetchServices,
    staleTime: 5 * 60 * 1000,
  });

  const stats = useMemo(
    () => [
      {
        label: 'Active Clients',
        value: clientsQuery.data?.length ?? 0,
        icon: Users,
      },
      {
        label: 'Legal Cases',
        value: casesQuery.data?.length ?? 0,
        icon: Gavel,
      },
      {
        label: 'Services',
        value: servicesQuery.data?.length ?? 0,
        icon: Briefcase,
      },
      {
        label: 'Live Updates',
        value: 'Realtime',
        icon: Activity,
      },
    ],
    [clientsQuery.data, casesQuery.data, servicesQuery.data],
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Post-auth landing</p>
        <h1 className="text-3xl font-semibold text-foreground">Dashboard v2 Overview</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Branded workspace with real-time client search and linked case/service data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="flex items-center justify-between p-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
            </Card>
          );
        })}
      </div>

      <SearchHubV2 />
    </div>
  );
};

export default DashboardLandingV2;
