import { useCallback, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getAdminProfile } from '@/api/adminAuth.service';
import type { Permission, Role } from '@/types/website';

const rolePermissions: Record<Role, Permission[]> = {
  Admin: [
    'pages:view',
    'pages:edit',
    'pages:publish',
    'pages:approve',
    'pages:schedule',
    'pages:bulk-publish',
    'media:upload',
    'analytics:view',
  ],
  Editor: ['pages:view', 'pages:edit', 'pages:schedule', 'media:upload'],
  Viewer: ['pages:view', 'analytics:view'],
};

const normalizeRoles = (roles?: Role[] | null): Role[] => {
  if (!roles || roles.length === 0) {
    return ['Viewer'];
  }
  const unique = Array.from(new Set(roles));
  return unique as Role[];
};

export interface UseUserRolesResult {
  roles: Role[];
  permissions: Permission[];
  hasRole: (role: Role | Role[]) => boolean;
  can: (permission: Permission) => boolean;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

export const useUserRoles = (): UseUserRolesResult => {
  const profileQuery = useQuery({
    queryKey: ['admin-profile'],
    queryFn: getAdminProfile,
  });

  const roles = useMemo(() => normalizeRoles(profileQuery.data?.roles), [profileQuery.data?.roles]);

  const permissions = useMemo(() => {
    const base = new Set<Permission>();
    roles.forEach((role) => {
      const rolePerms = rolePermissions[role];
      rolePerms?.forEach((permission) => base.add(permission));
    });
    profileQuery.data?.permissions?.forEach((permission) => base.add(permission));
    return Array.from(base);
  }, [profileQuery.data?.permissions, roles]);

  const hasRole = useCallback(
    (role: Role | Role[]) => {
      const targets = Array.isArray(role) ? role : [role];
      return targets.some((target) => roles.includes(target));
    },
    [roles],
  );

  const can = useCallback(
    (permission: Permission) => {
      return permissions.includes(permission);
    },
    [permissions],
  );

  return {
    roles,
    permissions,
    hasRole,
    can,
    isLoading: profileQuery.isLoading,
    isError: profileQuery.isError,
    error: profileQuery.error,
  };
};

export default useUserRoles;
