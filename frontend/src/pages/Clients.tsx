
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlobalTable, TableColumn, TableAction } from '@/components/common/GlobalTable';
import { AddEditClientForm } from '@/components/forms/AddEditClientForm';
import { Edit, Trash2, Eye, Plus, Phone, Mail } from 'lucide-react';
import { format } from 'date-fns';
import type { Client } from '@/types';

// Mock data that matches the Client interface
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Ahmed Hassan Mohamed',
    firstName: 'Ahmed',
    lastName: 'Hassan Mohamed',
    email: 'ahmed.hassan@example.com',
    phone: '+20 12 345 6789',
    identity_number: '29801123456789',
    address: '123 Tahrir Square, Cairo, Egypt',
    company: 'Hassan Trading Co.',
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    name: 'Fatima Ali Omar',
    firstName: 'Fatima',
    lastName: 'Ali Omar',
    email: 'fatima.ali@example.com',
    phone: '+20 10 987 6543',
    identity_number: '29505234567890',
    address: '456 Zamalek District, Cairo, Egypt',
    company: 'Omar Consulting',
    status: 'active',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '3',
    name: 'Mohamed Salah Ibrahim',
    firstName: 'Mohamed',
    lastName: 'Salah Ibrahim',
    email: 'mohamed.salah@example.com',
    phone: '+20 11 555 4321',
    identity_number: '29203345678901',
    address: '789 Heliopolis, Cairo, Egypt',
    company: '',
    status: 'inactive',
    createdAt: '2024-01-05T11:30:00Z',
    updatedAt: '2024-01-12T13:20:00Z'
  },
  {
    id: '4',
    name: 'Sara Ahmed Mahmoud',
    firstName: 'Sara',
    lastName: 'Ahmed Mahmoud',
    email: 'sara.ahmed@example.com',
    phone: '+20 15 111 2233',
    identity_number: '29701456789012',
    address: '321 Maadi, Cairo, Egypt',
    company: 'Mahmoud Industries',
    status: 'active',
    createdAt: '2024-01-08T14:15:00Z',
    updatedAt: '2024-01-22T10:00:00Z'
  },
  {
    id: '5',
    name: 'Omar Khaled Farouk',
    firstName: 'Omar',
    lastName: 'Khaled Farouk',
    email: 'omar.farouk@example.com',
    phone: '+20 12 777 8899',
    identity_number: '29102567890123',
    address: '654 New Cairo, Egypt',
    company: 'Farouk Enterprises',
    status: 'active',
    createdAt: '2024-01-12T16:45:00Z',
    updatedAt: '2024-01-25T09:30:00Z'
  }
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const handleSaved = (saved: Client) => {
    if (editingClient) {
      setClients(clients.map(c => c.id === saved.id ? saved : c));
    } else {
      setClients([...clients, saved]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: TableColumn<Client>[] = [
    {
      key: 'name',
      label: 'Full Name',
      sortable: true,
      render: (value: unknown, row: Client) => (
        <div className="flex flex-col">
          <span className="font-medium">{String(value)}</span>
          <span className="text-sm text-gray-500">{row.email}</span>
        </div>
      )
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (value: unknown) => (
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-gray-400" />
          <span>{String(value)}</span>
        </div>
      )
    },
    {
      key: 'company',
      label: 'Company',
      render: (value: unknown) => (
        <span>{value ? String(value) : 'Individual'}</span>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) => (
        <Badge className={getStatusColor(String(value))}>
          {String(value).toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      label: 'Join Date',
      render: (value: unknown) => (
        <span>{format(new Date(String(value)), 'MMM dd, yyyy')}</span>
      )
    }
  ];

  const actions: TableAction<Client>[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      onClick: (client) => {
        console.log('View client:', client);
      }
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (client) => {
        setEditingClient(client);
        setIsFormOpen(true);
      }
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (client) => {
        setClients(clients.filter(c => c.id !== client.id));
      },
      variant: 'destructive'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Clients</h1>
          <p className="text-gray-600 mt-1">Manage client information and relationships</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Client
        </Button>
      </div>

      <GlobalTable
        data={clients}
        columns={columns}
        actions={actions}
        searchable={true}
        pagination={true}
        pageSize={10}
        emptyMessage="No clients found. Add your first client to get started."
      />

      <AddEditClientForm
        client={editingClient || undefined}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingClient(null);
        }}
        onSaved={(c) => handleSaved(c)}
      />
    </div>
  );
}
