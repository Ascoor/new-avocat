  import { useState } from 'react';
  import { useTranslation } from 'react-i18next';
  import { useLanguage } from '../../hooks/useLanguage';
  import { NavLink, useLocation } from 'react-router-dom';
  import { Button } from '../ui/button';
  import {
    Home,
    Users,
    Briefcase,
    FileText,
    Calendar,
    Search,
    BarChart3,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Settings,
    Building,
    UserCheck,
    UserX,
    FolderOpen,
    FolderClosed,
    Cog,
    Scale,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Shield,
    UserCog,
    Megaphone,
    FileSearch,
    Calendar as CalendarIcon,
    ClipboardList,
    Globe
  } from 'lucide-react';
  import type { LucideIcon } from 'lucide-react';
  import { useTheme } from '../../context';

  interface MenuItem {
    key: string;
    icon: LucideIcon;
    path: string;
    children?: MenuItem[];
  }

  const menuItems: MenuItem[] = [
    { key: 'dashboard', icon: Home, path: '/dashboard' },
    
    // العملاء
    {
      key: 'clients',
      icon: Users,
      path: '/clients',
      children: [
        { key: 'clients_with_authorization', icon: UserCheck, path: '/clients/authorized' },
        { key: 'clients_without_authorization', icon: UserX, path: '/clients/unauthorized' }
      ]
    },
    
    // القضايا
    {
      key: 'cases',
      icon: Briefcase,
      path: '/cases',
      children: [
        { key: 'active_cases', icon: FolderOpen, path: '/cases/active' },
        { key: 'closed_cases', icon: FolderClosed, path: '/cases/closed' }
      ]
    },
    
    // الخدمات
    {
      key: 'services',
      icon: FileText,
      path: '/services',
      children: [
        { key: 'active_services', icon: Cog, path: '/services/active' },
        { key: 'completed_services', icon: Settings, path: '/services/completed' }
      ]
    },
    
    // إدارة المكتب
    {
      key: 'office_management',
      icon: Building,
      path: '/office',
      children: [
        { key: 'lawyers', icon: Scale, path: '/office/lawyers' },
        { key: 'courts', icon: Search, path: '/office/courts' },
        { key: 'office_data', icon: FileText, path: '/office/data' }
      ]
    },
    
    // التقارير
    {
      key: 'reports',
      icon: BarChart3,
      path: '/reports',
      children: [
        { key: 'cases_reports', icon: Briefcase, path: '/reports/cases' },
        { key: 'services_reports', icon: FileText, path: '/reports/services' },
        { key: 'sessions_reports', icon: CalendarIcon, path: '/reports/sessions' },
        { key: 'procedures_reports', icon: ClipboardList, path: '/reports/procedures' },
        { key: 'ads_reports', icon: Megaphone, path: '/reports/ads' }
      ]
    },
    
    // الإجراءات
    {
      key: 'procedures',
      icon: ClipboardList,
      path: '/procedures',
      children: [
        { key: 'sessions', icon: Calendar, path: '/procedures/sessions' },
        { key: 'announcements', icon: Megaphone, path: '/procedures/announcements' },
        { key: 'legal_procedures', icon: FileSearch, path: '/procedures/legal' }
      ]
    },
    
    // الحسابات
    {
      key: 'accounts',
      icon: DollarSign,
      path: '/accounts',
      children: [
        { key: 'expenses', icon: TrendingDown, path: '/accounts/expenses' },
        { key: 'revenues', icon: TrendingUp, path: '/accounts/revenues' },
        { key: 'account_settings', icon: Settings, path: '/accounts/settings' }
      ]
    },
    
    // المستخدمين
    {
      key: 'users',
      icon: Shield,
      path: '/users',
      children: [
        { key: 'users_list', icon: Users, path: '/users/list' },
        { key: 'roles_permissions', icon: UserCog, path: '/users/roles' }
      ]
    }
  ];

  interface SidebarProps {
    collapsed: boolean;
    onToggle: () => void;
    isMobile?: boolean;
  }

  export const Sidebar = ({ collapsed, onToggle, isMobile = false }: SidebarProps) => {
    const { t } = useTranslation();
    const { isRTL } = useLanguage();
    const location = useLocation();
    const { theme } = useTheme();
    const [expandedGroups, setExpandedGroups] = useState<string[]>([]);

    const toggleGroup = (key: string) => {
      if (collapsed && !isMobile) {
        // في الوضع المصغر، افتح الشريط الجانبي أولاً
        onToggle();
        setExpandedGroups([key]);
      } else {
        setExpandedGroups(prev => 
          prev.includes(key) 
            ? prev.filter(item => item !== key)
            : [...prev, key]
        );
      }
    };

    const isGroupExpanded = (key: string) => expandedGroups.includes(key);
    const isActiveParent = (item: MenuItem) => {
      if (!item.children) return false;
      return item.children.some(child => location.pathname.startsWith(child.path));
    };

    const renderMenuItem = (item: MenuItem, level = 0) => {
      const Icon = item.icon;
      const isActive = location.pathname === item.path;
      const hasChildren = item.children && item.children.length > 0;
      const isParentActive = isActiveParent(item);
      const isExpanded = isGroupExpanded(item.key);
      const paddingClass =
        hasChildren && (!collapsed || isMobile)
          ? isRTL
            ? 'pl-8'
            : 'pr-8'
          : '';

      return (
        <div key={item.key} className="w-full">
          {/* Parent Menu Item */}
          <div className="relative">
            <NavLink
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${paddingClass}
                ${isActive || isParentActive
                  ? 'bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }
                ${collapsed && !isMobile ? 'justify-center' : ''}
              `}
              title={collapsed && !isMobile ? t(`sidebar.${item.key}`) : undefined}
            >
              <Icon className={`h-5 w-5 ${isActive || isParentActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              {(!collapsed || isMobile) && (
                <span className="font-medium">
                  {t(`sidebar.${item.key}`)}
                </span>
              )}
            </NavLink>
            {hasChildren && (!collapsed || isMobile) && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleGroup(item.key);
                }}
                className={`absolute top-1/2 -translate-y-1/2 ${
                  isRTL ? 'left-3' : 'right-3'
                } rounded-md p-1 text-gray-500 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700`}
                aria-label="Toggle Submenu"
              >
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>

          {/* Children Menu Items */}
          {hasChildren && (isExpanded || isMobile) && (!collapsed || isMobile) && (
            <div className={`mt-1 ${isRTL ? 'mr-4' : 'ml-4'} space-y-1`}>
              {item.children!.map((child) => {
                const ChildIcon = child.icon;
                const isChildActive = location.pathname === child.path;
                
                return (
                  <NavLink
                    key={child.key}
                    to={child.path}
                    className={`
                      flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 text-sm
                      ${isChildActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-500 dark:border-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }
                    `}
                  >
                    <ChildIcon className={`h-4 w-4 ${isChildActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                    <span className="font-medium">
                      {t(`sidebar.${child.key}`)}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      );
    };

    return (
      <aside
        className={`
          hidden lg:block fixed top-0 ${isRTL ? 'right-0' : 'left-0'} z-40
          h-screen overflow-y-auto shadow-lg
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-80'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Brand and Toggle */}
          <div className="relative flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700">
            <div className={`flex items-center ${collapsed ? '' : 'gap-2'}`}>
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Globe className="h-4 w-4" />
              </div>
              {!collapsed && <span className="font-semibold text-lg">MyBrand</span>}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className={`p-2 absolute top-2 ${isRTL ? 'left-2' : 'right-2'}`}
              title={collapsed ? 'فتح الشريط الجانبي' : 'إغلاق الشريط الجانبي'}
            >
              {isRTL ? (
                collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              ) : (
                collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2">
            {menuItems.map((item) => renderMenuItem(item))}
          </nav>

          {/* Footer */}
          {!collapsed && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                © 2024 أفوكات - نظام المحاماة
              </div>
            </div>
          )}
        </div>
      </aside>
    );
  };
