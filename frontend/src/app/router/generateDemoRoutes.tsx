import React from 'react';
import { Route } from 'react-router-dom';
import DemoPage from '@/pages/demo/DemoPage';
import type { MenuItem } from '@/config/menuItems';

export const generateDemoRoutes = (items: MenuItem[], skip: Set<string> = new Set()) => {
  const routes: React.ReactElement[] = [];

  const traverse = (list: MenuItem[]) => {
    list.forEach((item) => {
      if (!skip.has(item.path)) {
        routes.push(
          <Route key={item.path} path={item.path} element={<DemoPage titleKey={item.key} />} />
        );
      }
      if (item.children) traverse(item.children);
    });
  };

  traverse(items);
  return routes;
};

export default generateDemoRoutes;
