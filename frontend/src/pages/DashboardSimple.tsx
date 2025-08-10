import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CasePieChart from '../components/common/CasePieChart';

export default function DashboardSimple() {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className={`transition-all duration-200 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} bg-gray-800 text-white`}>
        {/* Sidebar content */}
      </aside>
      <div className="flex-1 p-8">
        <button
          className="mb-4 px-4 py-2 bg-blue-700 text-white rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? t('dashboard.close_sidebar') : t('dashboard.open_sidebar')}
        </button>
        <h1 className="text-2xl mb-8">{t('dashboard.welcome_message')}</h1>
 
        <CasePieChart openCases={60} closedCases={40} />
 
      </div>
    </div>
  );
}
