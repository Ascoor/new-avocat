
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { CaseFormData } from '@/types/forms';

interface CaseFormProps {
  caseData?: CaseFormData;
  onSubmit: (data: CaseFormData) => void;
  onCancel: () => void;
}

export const CaseForm: React.FC<CaseFormProps> = ({ caseData, onSubmit, onCancel }) => {
  const [form, setForm] = useState<CaseFormData>({
    title: caseData?.title || '',
    caseNumber: caseData?.caseNumber || '',
    client: caseData?.client || '',
    status: caseData?.status || 'active',
    priority: caseData?.priority || 'low',
    nextHearing: caseData?.nextHearing || '',
    assignedLawyer: caseData?.assignedLawyer || '',
    notes: caseData?.notes || ''
  });

  const handleChange = <K extends keyof CaseFormData>(field: K, value: CaseFormData[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: CaseFormData = {
      ...form,
      id: caseData?.id || Date.now().toString()
    };
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="caseNumber">Case Number</Label>
          <Input
            id="caseNumber"
            value={form.caseNumber}
            onChange={(e) => handleChange('caseNumber', e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="client">Client</Label>
        <Input
          id="client"
          value={form.client}
          onChange={(e) => handleChange('client', e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={form.status} onValueChange={(v) => handleChange('status', v as CaseFormData['status'])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="on_hold">On Hold</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Priority</Label>
          <Select value={form.priority} onValueChange={(v) => handleChange('priority', v as CaseFormData['priority'])}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nextHearing">Next Hearing</Label>
        <Input
          id="nextHearing"
          type="date"
          value={form.nextHearing}
          onChange={(e) => handleChange('nextHearing', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="assignedLawyer">Assigned Lawyer</Label>
        <Input
          id="assignedLawyer"
          value={form.assignedLawyer}
          onChange={(e) => handleChange('assignedLawyer', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={form.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          {caseData ? 'Update Case' : 'Create Case'}
        </Button>
      </div>
    </form>
  );
};
