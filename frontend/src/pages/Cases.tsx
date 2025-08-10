
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GlobalTable, TableColumn, TableAction } from '@/components/common/GlobalTable';
import { GlobalModal } from '@/components/common/GlobalModal';
import { CaseForm } from '@/components/cases/CaseForm';
import { Edit, Trash2, Eye, Plus, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import type { LegalCase } from '@/types';
import type { CaseFormData } from '@/types/forms';

// Mock data that matches the LegalCase interface
const mockCases: LegalCase[] = [
  {
    id: '1',
    title: 'Contract Dispute - ABC Corp',
    description: 'Commercial contract dispute case',
    caseNumber: 'CASE-2024-001',
    client: 'ABC Corporation',
    clientId: 'client-1',
    clientName: 'ABC Corporation',
    status: 'active',
    priority: 'high',
    nextHearing: '2024-02-15',
    assignedLawyer: 'Ahmed Hassan',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  },
  {
    id: '2',
    title: 'Property Litigation',
    description: 'Real estate ownership dispute',
    caseNumber: 'CASE-2024-002',
    client: 'Mohamed Ali',
    clientId: 'client-2',
    clientName: 'Mohamed Ali',
    status: 'pending',
    priority: 'medium',
    nextHearing: '2024-02-20',
    assignedLawyer: 'Fatima Nour',
    createdAt: '2024-01-10T09:00:00Z',
    updatedAt: '2024-01-18T16:45:00Z'
  },
  {
    id: '3',
    title: 'Employment Termination',
    description: 'Wrongful termination case',
    caseNumber: 'CASE-2024-003',
    client: 'Sara Ahmed',
    clientId: 'client-3',
    clientName: 'Sara Ahmed',
    status: 'on_hold',
    priority: 'low',
    nextHearing: '',
    assignedLawyer: 'Omar Farouk',
    createdAt: '2024-01-05T11:30:00Z',
    updatedAt: '2024-01-12T13:20:00Z'
  }
];

export default function Cases() {
  const [cases, setCases] = useState<LegalCase[]>(mockCases);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCase, setEditingCase] = useState<LegalCase | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'on_hold': return 'bg-gray-100 text-gray-800';
      case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: TableColumn<LegalCase>[] = [
    {
      key: 'caseNumber',
      label: 'Case Number',
      sortable: true
    },
    {
      key: 'title',
      label: 'Title',
      sortable: true
    },
    {
      key: 'client',
      label: 'Client'
    },
    {
      key: 'status',
      label: 'Status',
      render: (value: unknown) => (
        <Badge className={getStatusColor(String(value))}>
          {String(value).replace('_', ' ').toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'priority',
      label: 'Priority',
      render: (value: unknown) => (
        <Badge className={getPriorityColor(String(value))}>
          {String(value).toUpperCase()}
        </Badge>
      )
    },
    {
      key: 'nextHearing',
      label: 'Next Hearing',
      render: (value: unknown) => {
        if (!value || value === '') return <span className="text-gray-400">Not scheduled</span>;
        return <span>{format(new Date(String(value)), 'MMM dd, yyyy')}</span>;
      }
    },
    {
      key: 'assignedLawyer',
      label: 'Assigned Lawyer'
    }
  ];

  const actions: TableAction<LegalCase>[] = [
    {
      label: 'View',
      icon: <Eye className="h-4 w-4" />,
      onClick: (caseItem) => {
        console.log('View case:', caseItem);
      }
    },
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: (caseItem) => {
        setEditingCase(caseItem);
        setIsFormOpen(true);
      }
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (caseItem) => {
        setCases(cases.filter(c => c.id !== caseItem.id));
      },
      variant: 'destructive'
    }
  ];

  const handleFormSubmit = (data: CaseFormData) => {
    if (editingCase) {
      // Update existing case
      const updatedCase: LegalCase = {
        ...editingCase,
        title: data.title,
        caseNumber: data.caseNumber,
        client: data.client,
        status: data.status,
        priority: data.priority,
        nextHearing: data.nextHearing,
        assignedLawyer: data.assignedLawyer,
        notes: data.notes,
        updatedAt: new Date().toISOString()
      };
      setCases(cases.map(c => c.id === editingCase.id ? updatedCase : c));
    } else {
      // Create new case
      const newCase: LegalCase = {
        id: Date.now().toString(),
        title: data.title,
        description: `Case created for ${data.client}`,
        caseNumber: data.caseNumber,
        client: data.client,
        clientId: `client-${Date.now()}`,
        clientName: data.client,
        status: data.status,
        priority: data.priority,
        nextHearing: data.nextHearing,
        assignedLawyer: data.assignedLawyer,
        notes: data.notes,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setCases([...cases, newCase]);
    }
    setIsFormOpen(false);
    setEditingCase(null);
  };

  const convertToFormData = (caseItem: LegalCase): CaseFormData => {
    return {
      id: caseItem.id,
      title: caseItem.title,
      caseNumber: caseItem.caseNumber || '',
      client: caseItem.client || caseItem.clientName,
      status: caseItem.status,
      priority: caseItem.priority,
      nextHearing: caseItem.nextHearing || '',
      assignedLawyer: caseItem.assignedLawyer || '',
      notes: caseItem.notes || ''
    };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Legal Cases</h1>
          <p className="text-gray-600 mt-1">Manage and track all legal cases</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Case
        </Button>
      </div>

      <GlobalTable
        data={cases}
        columns={columns}
        actions={actions}
        searchable={true}
        pagination={true}
        pageSize={10}
        emptyMessage="No cases found. Create your first case to get started."
      />

      <GlobalModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingCase(null);
        }}
        title={editingCase ? 'Edit Case' : 'Add New Case'}
        size="lg"
      >
        <CaseForm
          caseData={editingCase ? convertToFormData(editingCase) : undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingCase(null);
          }}
        />
      </GlobalModal>
    </div>
  );
}
