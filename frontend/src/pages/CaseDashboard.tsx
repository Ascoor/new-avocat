import { useParams } from 'react-router-dom';
import { ProceduresTable, AnnouncementsTable, SessionsTable, TasksTable } from '../components/common/HomeCards';

const CaseDashboard = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-avocat-blue dark:text-avocat-orange">
        لوحة القضية رقم {id}
      </h1>
      {/* TODO: replace fakeData with real API once available */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProceduresTable />
        <AnnouncementsTable />
        <SessionsTable />
        <TasksTable />
      </div>
    </div>
  );
};

export default CaseDashboard;
