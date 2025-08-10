
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { GlobalModal } from '../components/common/GlobalModal';
import { SessionForm } from '../components/sessions/SessionForm';
import { Plus, Search, Calendar, Clock, User, Phone, Video, MessageSquare, Edit, Trash2 } from 'lucide-react';
import type { Session as SessionType } from '@/types';
import { GlobalTable } from '../components/common/GlobalTable';

const mockSessions: SessionType[] = [
  {
    id: '1',
    title: 'Personal Injury Claim',
    clientId: 'client-1',
    clientName: 'Sarah Johnson',
    date: '2024-01-15',
    time: '10:00:00',
    duration: 60,
    type: 'consultation',
    status: 'scheduled',
    notes: 'Initial consultation to discuss case details',
    caseTitle: 'Personal Injury Claim',
    sessionDate: '2024-01-15T10:00:00',
    sessionType: 'consultation'
  },
  {
    id: '2',
    title: 'Contract Dispute Resolution',
    clientId: 'client-2',
    clientName: 'Michael Chen',
    date: '2024-01-16',
    time: '14:30:00',
    duration: 90,
    type: 'meeting',
    status: 'completed',
    notes: 'Contract review and strategy discussion',
    caseTitle: 'Contract Dispute Resolution',
    sessionDate: '2024-01-16T14:30:00',
    sessionType: 'meeting'
  },
  {
    id: '3',
    title: 'Employment Law Matter',
    clientId: 'client-3',
    clientName: 'Emily Rodriguez',
    date: '2024-01-18',
    time: '09:00:00',
    duration: 45,
    type: 'phone',
    status: 'scheduled',
    notes: 'Follow-up discussion on case progress',
    caseTitle: 'Employment Law Matter',
    sessionDate: '2024-01-18T09:00:00',
    sessionType: 'phone_call'
  },
  {
    id: '4',
    title: 'Real Estate Transaction',
    clientId: 'client-4',
    clientName: 'Ahmed Al-Mansouri',
    date: '2024-01-20',
    time: '11:00:00',
    duration: 120,
    type: 'court',
    status: 'scheduled',
    notes: 'Property dispute hearing preparation',
    caseTitle: 'Real Estate Transaction',
    sessionDate: '2024-01-20T11:00:00',
    sessionType: 'hearing'
  }
];

const sessionTypeConfig = {
  consultation: { label: 'Consultation', icon: MessageSquare, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  meeting: { label: 'Meeting', icon: User, color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  phone_call: { label: 'Phone Call', icon: Phone, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  hearing: { label: 'Court Hearing', icon: Video, color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }
};

const statusConfig = {
  scheduled: { label: 'Scheduled', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
  no_show: { label: 'No Show', color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300' }
};

export const Sessions = () => {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState<SessionType[]>(mockSessions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<SessionType | null>(null);

  const handleAddSession = () => {
    setEditingSession(null);
    setIsModalOpen(true);
  };

  const handleEditSession = (session: SessionType) => {
    setEditingSession(session);
    setIsModalOpen(true);
  };

  const handleDeleteSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  const handleSubmitSession = (sessionData: SessionType) => {
    if (editingSession) {
      setSessions(prev => prev.map(s => s.id === sessionData.id ? sessionData : s));
    } else {
      setSessions(prev => [...prev, sessionData]);
    }
    setIsModalOpen(false);
    setEditingSession(null);
  };

  const tableColumns = [
    {
      key: 'caseTitle' as keyof SessionType,
      label: 'Case Title',
      sortable: true,
      render: (value: unknown, row: SessionType) => (
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{String(value)}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">with {row.clientName}</div>
        </div>
      )
    },
    {
      key: 'sessionDate' as keyof SessionType,
      label: 'Date & Time',
      sortable: true,
      render: (value: unknown) => {
        const date = new Date(String(value));
        return (
          <div className="flex flex-col">
            <span className="text-gray-900 dark:text-white">{date.toLocaleDateString()}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        );
      }
    },
    {
      key: 'sessionType' as keyof SessionType,
      label: 'Type',
      render: (value: unknown) => {
        const config = sessionTypeConfig[String(value) as keyof typeof sessionTypeConfig];
        if (!config) return <span>{String(value)}</span>;
        const Icon = config.icon;
        return (
          <Badge className={config.color}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        );
      }
    },
    {
      key: 'duration' as keyof SessionType,
      label: 'Duration',
      render: (value: unknown) => `${value} min`
    },
    {
      key: 'status' as keyof SessionType,
      label: 'Status',
      render: (value: unknown) => {
        const config = statusConfig[String(value) as keyof typeof statusConfig];
        return <Badge className={config.color}>{config.label}</Badge>;
      }
    }
  ];

  const tableActions = [
    {
      label: 'Edit',
      icon: <Edit className="h-4 w-4" />,
      onClick: handleEditSession
    },
    {
      label: 'Delete',
      icon: <Trash2 className="h-4 w-4" />,
      onClick: (session: SessionType) => handleDeleteSession(session.id)
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            Legal Sessions
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Schedule and manage your legal consultation sessions
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button 
            onClick={handleAddSession}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Session
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Sessions', value: sessions.length, icon: Calendar, color: 'blue' },
          { label: 'Scheduled', value: sessions.filter(s => s.status === 'scheduled').length, icon: Clock, color: 'yellow' },
          { label: 'Completed', value: sessions.filter(s => s.status === 'completed').length, icon: User, color: 'green' },
          { label: 'This Week', value: 8, icon: MessageSquare, color: 'purple' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 3) }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sessions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="shadow-xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-gray-900 dark:text-white">Session Management</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  {sessions.length} sessions found
                </CardDescription>
              </div>
              
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search sessions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600"
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <GlobalTable
              data={sessions}
              columns={tableColumns}
              actions={tableActions}
              className="bg-white dark:bg-gray-800"
            />
          </CardContent>
        </Card>
      </motion.div>

      {/* Session Modal */}
      <GlobalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSession ? 'Edit Session' : 'Schedule New Session'}
        size="lg"
      >
        <SessionForm
          session={editingSession ? {
            id: editingSession.id,
            caseTitle: editingSession.caseTitle || editingSession.title,
            clientName: editingSession.clientName,
            sessionDate: editingSession.sessionDate,
            sessionTime: editingSession.time,
            duration: editingSession.duration,
            sessionType: editingSession.sessionType || 'consultation',
            status: editingSession.status,
            notes: editingSession.notes
          } : undefined}
          onSubmit={(sessionData) => {
            const updatedSession: SessionType = {
              id: sessionData.id || `session-${Date.now()}`,
              title: sessionData.caseTitle,
              clientId: sessionData.clientName, // This should be actual client ID in real app
              clientName: sessionData.clientName,
              date: sessionData.sessionDate?.split('T')[0] || '',
              time: sessionData.sessionTime || '',
              duration: sessionData.duration,
              type: sessionData.sessionType === 'phone_call' ? 'phone' : 
                    sessionData.sessionType === 'hearing' ? 'court' : 
                    sessionData.sessionType || 'consultation',
              status: sessionData.status,
              notes: sessionData.notes,
              caseTitle: sessionData.caseTitle,
              sessionDate: sessionData.sessionDate,
              sessionType: sessionData.sessionType
            };
            
            if (editingSession) {
              setSessions(prev => prev.map(s => s.id === sessionData.id ? updatedSession : s));
            } else {
              setSessions(prev => [...prev, updatedSession]);
            }
            setIsModalOpen(false);
            setEditingSession(null);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </GlobalModal>
    </motion.div>
  );
};
