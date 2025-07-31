// Types for Roles & Permissions page

export interface PermissionItem {
  id: string;
  description: string;
  key: string;
  roles: string[];
}

export interface FilterState {
  search: string;
  selectedRoles: string[];
  selectedPermissions: string[];
}

export interface RolesPermissionsProps {
  initialTab?: 'route' | 'component';
}

export type PermissionTabType = 'route' | 'component';

export enum RoleType {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  VIEWER = 'VIEWER',
  AUTHOR = 'AUTHOR'
}