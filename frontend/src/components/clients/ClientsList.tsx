import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getClients, deleteClient } from "@/services/clients";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Client } from "@/types/index";
import AddEditClientModal from "@/components/clients/AddEditClientModal";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { DataTable } from "../ui/data-table";
import type { TableColumn } from "@/lib/table-utils";

const ClientsList: React.FC = () => {
  const qc = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [selected, setSelected] = useState<Client | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => (await getClients()).data as unknown,
  });

  const del = useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clients"] }),
  });

  if (isLoading) return <div className="p-6">Loading...</div>;
  if (isError) return <div className="p-6 text-destructive">Error loading clients</div>;

  // Normalize API shapes
  const rows = (Array.isArray(data)
    ? data
    : (data as { clients?: Client[]; data?: Client[] } | undefined)?.clients ||
      (data as { data?: Client[] } | undefined)?.data ||
      []) as Client[];

  const columns: TableColumn<Client>[] = [
{
  key: "id",
  title: "#",
  sortable: true,
  render: (_value, item) => item.slug || item.id || "-"
},

    {
      key: "name",
      title: "Name",
      sortable: true,
    },
    {
      key: "gender",
      title: "Gender",
    },
    {
      key: "religion",
      title: "Religion",
    },
    {
      key: "address",
      title: "Address",
    },
    {
      key: "status",
      title: "Status",
      render: (value) =>
        value ? (
          <Badge
            className={
              String(value).toLowerCase() === "active"
                ? "border-transparent bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]"
                : "border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]"
            }
          >
            {value}
          </Badge>
        ) : (
          "-"
        ),
    },
    {
      // not a real field; used for controls only
      key: "actions" as unknown as keyof Client,
      title: "Actions",
      render: (_, row) => (
        <div className="text-right">
          <Button
            size="sm"
            variant="outline"
            className="mr-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(row);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={(e) => {
              e.stopPropagation();
              row.id && setConfirmId(String(row.id));
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="font-semibold">Clients</h3>
        <Button
          size="sm"
          onClick={() => {
            setSelected(null);
            setOpenModal(true);
          }}
        >
          Add Client
        </Button>
      </div>

      {/* DataTable */}
      <div className="overflow-x-auto">
        <DataTable
          data={rows}
          columns={columns}
          title="Clients"
          searchable
          exportable
          pageSize={10}
        />
      </div>

      {/* Add/Edit Modal */}
      <AddEditClientModal open={openModal} onClose={() => setOpenModal(false)} initial={selected} />

      {/* Confirm Delete */}
      <AlertDialog open={!!confirmId} onOpenChange={(o) => !o && setConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete client?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmId) del.mutate(confirmId);
                setConfirmId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ClientsList;
