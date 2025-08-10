
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar, Clock, User, MessageSquare } from 'lucide-react';
import type { SessionFormData } from '@/types/forms';

interface SessionFormProps {
  session?: SessionFormData;
  onSubmit: (data: SessionFormData) => void;
  onCancel: () => void;
}

export const SessionForm: React.FC<SessionFormProps> = ({
  session,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<SessionFormData>({
    caseTitle: session?.caseTitle || '',
    clientName: session?.clientName || '',
    sessionDate: session?.sessionDate?.split('T')[0] || '',
    sessionTime: session?.sessionDate ? new Date(session.sessionDate).toTimeString().slice(0, 5) : '',
    duration: session?.duration || 60,
    sessionType: session?.sessionType || 'consultation',
    status: session?.status || 'scheduled',
    notes: session?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const sessionDateTime = new Date(`${formData.sessionDate}T${formData.sessionTime}`);

    const sessionData: SessionFormData = {
      ...formData,
      sessionDate: sessionDateTime.toISOString(),
      id: session?.id || Date.now().toString()
    };
    
    onSubmit(sessionData);
  };

  const handleChange = <K extends keyof SessionFormData>(field: K, value: SessionFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="caseTitle" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            Case Title
          </Label>
          <Input
            id="caseTitle"
            value={formData.caseTitle}
            onChange={(e) => handleChange('caseTitle', e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clientName" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <User className="h-4 w-4 text-green-500" />
            Client Name
          </Label>
          <Input
            id="clientName"
            value={formData.clientName}
            onChange={(e) => handleChange('clientName', e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sessionDate" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Calendar className="h-4 w-4 text-purple-500" />
            Date
          </Label>
          <Input
            id="sessionDate"
            type="date"
            value={formData.sessionDate}
            onChange={(e) => handleChange('sessionDate', e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sessionTime" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <Clock className="h-4 w-4 text-orange-500" />
            Time
          </Label>
          <Input
            id="sessionTime"
            type="time"
            value={formData.sessionTime}
            onChange={(e) => handleChange('sessionTime', e.target.value)}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration" className="text-gray-700 dark:text-gray-300">
            Duration (minutes)
          </Label>
          <Input
            id="duration"
            type="number"
            min="15"
            max="480"
            step="15"
            value={formData.duration}
            onChange={(e) => handleChange('duration', parseInt(e.target.value))}
            className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300">Session Type</Label>
          <Select value={formData.sessionType} onValueChange={(value) => handleChange('sessionType', value as SessionFormData['sessionType'])}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="meeting">Meeting</SelectItem>
              <SelectItem value="phone_call">Phone Call</SelectItem>
              <SelectItem value="hearing">Court Hearing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-gray-700 dark:text-gray-300">Status</Label>
          <Select value={formData.status} onValueChange={(value) => handleChange('status', value as SessionFormData['status'])}>
            <SelectTrigger className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="no_show">No Show</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="text-gray-700 dark:text-gray-300">
          Notes
        </Label>
        <Textarea
          id="notes"
          rows={4}
          value={formData.notes}
          onChange={(e) => handleChange('notes', e.target.value)}
          className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          placeholder="Add any relevant notes about this session..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          {session ? 'Update Session' : 'Create Session'}
        </Button>
      </div>
    </form>
  );
};
