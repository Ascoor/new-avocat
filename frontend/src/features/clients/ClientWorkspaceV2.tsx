import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronDown, ChevronRight } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import {
  fetchCaseAds,
  fetchCaseProcedures,
  fetchCaseSessions,
  fetchLegalCases,
  fetchServiceDetail,
  fetchServices,
} from '@/lib/v2-api';
import type { LegalCase, LegalAd, LegalSession, Procedure } from '@/types/legalCase';
import type { ServiceRecord } from '@/components/services/types';

interface ClientWorkspaceV2Props {
  clientId?: string | null;
  clientName?: string;
}

const CasePanel = ({ legCase }: { legCase: LegalCase }) => {
  const [open, setOpen] = useState(false);

  const proceduresQuery = useQuery<Procedure[]>({
    queryKey: ['v2-case-procedures', legCase.id],
    queryFn: () => fetchCaseProcedures(legCase.id),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  const sessionsQuery = useQuery<LegalSession[]>({
    queryKey: ['v2-case-sessions', legCase.id],
    queryFn: () => fetchCaseSessions(legCase.id),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  const adsQuery = useQuery<LegalAd[]>({
    queryKey: ['v2-case-ads', legCase.id],
    queryFn: () => fetchCaseAds(legCase.id),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-foreground">{legCase.title}</p>
          <p className="text-xs text-muted-foreground">{legCase.slug}</p>
        </div>
        <span className="text-muted-foreground">
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>
      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <Tabs defaultValue="procedures">
            <TabsList className="flex w-full justify-start gap-2">
              <TabsTrigger value="procedures">Procedures</TabsTrigger>
              <TabsTrigger value="sessions">Sessions</TabsTrigger>
              <TabsTrigger value="ads">Ads</TabsTrigger>
            </TabsList>

            <TabsContent value="procedures" className="mt-3">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr>
                      <th className="px-2 py-1 text-left">Job</th>
                      <th className="px-2 py-1 text-left">Status</th>
                      <th className="px-2 py-1 text-left">Lawyer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {proceduresQuery.data?.length ? (
                      proceduresQuery.data.map((procedure) => (
                        <tr key={procedure.id} className="border-t border-border">
                          <td className="px-2 py-2">{procedure.job}</td>
                          <td className="px-2 py-2">{procedure.status ?? '—'}</td>
                          <td className="px-2 py-2">{procedure.lawyer?.name ?? '—'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-2 py-2 text-muted-foreground" colSpan={3}>
                          {proceduresQuery.isLoading ? 'Loading procedures…' : 'No procedures yet.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="sessions" className="mt-3">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr>
                      <th className="px-2 py-1 text-left">Date</th>
                      <th className="px-2 py-1 text-left">Status</th>
                      <th className="px-2 py-1 text-left">Court</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessionsQuery.data?.length ? (
                      sessionsQuery.data.map((session) => (
                        <tr key={session.id} className="border-t border-border">
                          <td className="px-2 py-2">{session.session_date ?? '—'}</td>
                          <td className="px-2 py-2">{session.status ?? '—'}</td>
                          <td className="px-2 py-2">{session.court?.name ?? '—'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-2 py-2 text-muted-foreground" colSpan={3}>
                          {sessionsQuery.isLoading ? 'Loading sessions…' : 'No sessions yet.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="ads" className="mt-3">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="text-xs text-muted-foreground">
                    <tr>
                      <th className="px-2 py-1 text-left">Number</th>
                      <th className="px-2 py-1 text-left">Status</th>
                      <th className="px-2 py-1 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adsQuery.data?.length ? (
                      adsQuery.data.map((ad) => (
                        <tr key={ad.id} className="border-t border-border">
                          <td className="px-2 py-2">{ad.number ?? '—'}</td>
                          <td className="px-2 py-2">{ad.status ?? '—'}</td>
                          <td className="px-2 py-2">{ad.date ?? '—'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="px-2 py-2 text-muted-foreground" colSpan={3}>
                          {adsQuery.isLoading ? 'Loading ads…' : 'No ads yet.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

const ServicePanel = ({ service }: { service: ServiceRecord }) => {
  const [open, setOpen] = useState(false);
  const detailQuery = useQuery({
    queryKey: ['v2-service-detail', service.id],
    queryFn: () => fetchServiceDetail(String(service.id)),
    enabled: open,
    staleTime: 5 * 60 * 1000,
  });

  const procedures = detailQuery.data?.procedures ?? service.procedures ?? [];

  return (
    <div className="rounded-xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-foreground">{service.description ?? service.slug}</p>
          <p className="text-xs text-muted-foreground">{service.slug}</p>
        </div>
        <span className="text-muted-foreground">
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </span>
      </button>
      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-xs text-muted-foreground">
                <tr>
                  <th className="px-2 py-1 text-left">Procedure</th>
                  <th className="px-2 py-1 text-left">Status</th>
                  <th className="px-2 py-1 text-left">Lawyer</th>
                </tr>
              </thead>
              <tbody>
                {procedures.length ? (
                  procedures.map((procedure) => (
                    <tr key={procedure.id} className="border-t border-border">
                      <td className="px-2 py-2">{procedure.title ?? procedure.job ?? '—'}</td>
                      <td className="px-2 py-2">{procedure.status ?? '—'}</td>
                      <td className="px-2 py-2">{procedure.lawyer?.name ?? '—'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="px-2 py-2 text-muted-foreground" colSpan={3}>
                      {detailQuery.isLoading ? 'Loading procedures…' : 'No procedures yet.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

const ClientWorkspaceV2 = ({ clientId, clientName }: ClientWorkspaceV2Props) => {
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

  const filteredCases = useMemo(() => {
    if (!clientId) return [];
    return (casesQuery.data ?? []).filter((legCase) =>
      legCase.clients?.some((client) => String(client.id) === String(clientId)),
    );
  }, [casesQuery.data, clientId]);

  const filteredServices = useMemo(() => {
    if (!clientId) return [];
    return (servicesQuery.data ?? []).filter((service) =>
      service.clients?.some((client) => String(client.id) === String(clientId)),
    );
  }, [servicesQuery.data, clientId]);

  return (
    <section className="min-w-0 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Workspace</p>
        <h2 className="text-2xl font-semibold text-foreground">
          {clientName ? `Client: ${clientName}` : 'Select a client to begin'}
        </h2>
      </div>

      <div className={cn('space-y-6', !clientId && 'opacity-60')}>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Cases</h3>
          {clientId ? (
            filteredCases.length ? (
              <div className="space-y-3">
                {filteredCases.map((legCase) => (
                  <CasePanel key={legCase.id} legCase={legCase} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No cases linked to this client yet.</p>
            )
          ) : (
            <p className="text-sm text-muted-foreground">Pick a client from the results list.</p>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Services</h3>
          {clientId ? (
            filteredServices.length ? (
              <div className="space-y-3">
                {filteredServices.map((service) => (
                  <ServicePanel key={service.id} service={service} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No services linked to this client yet.</p>
            )
          ) : (
            <p className="text-sm text-muted-foreground">Pick a client to load service procedures.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientWorkspaceV2;
