import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useClientsSearch from '@/hooks/useClientsSearch';
import type { Client } from '@/types/clients';
import ClientWorkspaceV2 from '@/features/clients/ClientWorkspaceV2';

const SearchHubV2 = () => {
  const [query, setQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { results, loading, error } = useClientsSearch(query, { debounceMs: 280 });

  const displayResults = useMemo(() => results ?? [], [results]);

  const handleSelect = (client: Client) => {
    setSelectedClient(client);
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <Card className="col-span-12 space-y-4 p-4 lg:col-span-4">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Search Hub</p>
          <h2 className="text-xl font-semibold text-foreground">Find a client</h2>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name, code, or phone"
              className="pl-9"
              aria-label="Search clients"
            />
          </div>
          {error && <p className="text-xs text-destructive">{error}</p>}
        </div>

        <div className="max-h-[70vh] space-y-2 overflow-auto">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 bg-card text-xs text-muted-foreground">
                <tr>
                  <th className="px-2 py-2 text-left">Client</th>
                  <th className="px-2 py-2 text-left">Code</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td className="px-2 py-2 text-muted-foreground" colSpan={2}>
                      Loading clients…
                    </td>
                  </tr>
                )}
                {!loading && !displayResults.length && (
                  <tr>
                    <td className="px-2 py-2 text-muted-foreground" colSpan={2}>
                      {query.trim() ? 'No clients found.' : 'Start typing to search.'}
                    </td>
                  </tr>
                )}
                {displayResults.map((client) => (
                  <tr
                    key={client.id}
                    className={cn(
                      'cursor-pointer border-t border-border transition-colors hover:bg-muted/40',
                      selectedClient?.id === client.id && 'bg-muted/60',
                    )}
                    onClick={() => handleSelect(client)}
                  >
                    <td className="px-2 py-2">
                      <div className="font-medium text-foreground">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.phone_number ?? '—'}</div>
                    </td>
                    <td className="px-2 py-2 text-muted-foreground">{client.slug}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <div className="col-span-12 min-w-0 lg:col-span-8">
        <ClientWorkspaceV2 clientId={selectedClient?.id?.toString()} clientName={selectedClient?.name} />
      </div>
    </div>
  );
};

export default SearchHubV2;
