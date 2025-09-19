import { Suspense, lazy } from 'react';
import { FaUserAltSlash } from 'react-icons/fa';

import GlobalSpinner from '@/components/common/GlobalSpinner';

const UnClientList = lazy(() => import('@/components/clientsAndUnclients/UnClients'));

const UnClientPage: React.FC = () => {
  return (
    <section className="flex min-h-screen flex-col items-center justify-start bg-gray-100 p-6 dark:bg-gray-900">
      <div className="mt-4 flex space-x-4 rounded-lg bg-white p-2 shadow-md dark:bg-gray-800">
        <button className="flex cursor-pointer items-center rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 text-lg font-medium text-white shadow-lg transition-all duration-300">
          <span className="mr-2 text-2xl">
            <FaUserAltSlash />
          </span>
          عملاء بدون وكالة
        </button>
      </div>

      <Suspense fallback={<GlobalSpinner />}>
        <div className="mt-8 w-full max-w-5xl rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
          <UnClientList />
        </div>
      </Suspense>
    </section>
  );
};

export default UnClientPage;
