import React, { useState, useMemo, useCallback } from 'react';
import { Typography, message } from 'antd';
import Tabs from 'periscope/components/Tabs';
import Header from 'components/Header/Header';
import DataStateRenderer from 'periscope/components/DataStateRenderer/DataStateRenderer';
import PermissionFilters from './components/PermissionFilters/PermissionFilters';
import PermissionsTable from './components/PermissionsTable/PermissionsTable';
import { usePermissions } from 'hooks/usePermissions';
import {
  routePermissionDescriptions,
  componentPermissionDescriptions
} from 'utils/permission';
import { USER_ROLES } from 'types/roles';
import { PermissionItem, FilterState, RolesPermissionsProps, PermissionTabType } from './types';
import './RolesPermissions.styles.scss';

const RolesPermissions: React.FC<RolesPermissionsProps> = ({
  initialTab = 'route'
}) => {
  const [activeTab, setActiveTab] = useState<PermissionTabType>(initialTab);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    selectedRoles: [],
    selectedPermissions: [],
  });

  // Use the permissions hook to get real data and actions
  const {
    componentPermission,
    routePermission,
    updateComponentPermissions,
    updateRoutePermissions,
    resetAllPermissions,
  } = usePermissions();

  // Convert permission data to table format
  const routePermissions = useMemo(() => {
    return Object.entries(routePermission).map(([key, roles], index) => ({
      id: `route-${index + 1}`,
      description: routePermissionDescriptions[key as keyof typeof routePermissionDescriptions] || `Access to ${key}`,
      key: key,
      roles: roles as string[]
    }));
  }, [routePermission]);

  const componentPermissions = useMemo(() => {
    return Object.entries(componentPermission).map(([key, roles], index) => ({
      id: `component-${index + 1}`,
      description: componentPermissionDescriptions[key as keyof typeof componentPermissionDescriptions] || `Permission for ${key}`,
      key: key,
      roles: roles as string[]
    }));
  }, [componentPermission]);

  // Get current permissions based on active tab
  const currentPermissions = useMemo(() => {
    return activeTab === 'route' ? routePermissions : componentPermissions;
  }, [activeTab, routePermissions, componentPermissions]);

  // Filter permissions based on current filters
  const filteredPermissions = useMemo(() => {
    let filtered = currentPermissions;

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (permission) =>
          permission.description.toLowerCase().includes(searchLower) ||
          permission.key.toLowerCase().includes(searchLower)
      );
    }

    // Role filter
    if (filters.selectedRoles.length > 0) {
      filtered = filtered.filter((permission) =>
        filters.selectedRoles.some((role) => permission.roles.includes(role))
      );
    }

    // Permission filter
    if (filters.selectedPermissions.length > 0) {
      filtered = filtered.filter((permission) =>
        filters.selectedPermissions.includes(permission.key)
      );
    }

    return filtered;
  }, [currentPermissions, filters]);

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: Partial<FilterState>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  // Handle permission update using the real hook actions
  const handleUpdatePermission = useCallback((permissionId: string, roles: string[]) => {
    const permission = currentPermissions.find(p => p.id === permissionId);
    if (!permission) return;

    try {
      if (activeTab === 'route') {
        updateRoutePermissions(permission.key as any, roles as any);
      } else {
        updateComponentPermissions(permission.key as any, roles as any);
      }
      // message.success('Permission updated successfully');
    } catch (error) {
      message.error('Failed to update permission');
    }
  }, [activeTab, currentPermissions, updateRoutePermissions, updateComponentPermissions]);

  // Handle export
  const handleExport = useCallback(() => {
    const dataToExport = {
      type: activeTab,
      permissions: filteredPermissions,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${activeTab}-permissions-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    message.success('Permissions exported successfully');
  }, [activeTab, filteredPermissions]);


  // Prepare options for filters
  const roleOptions = useMemo(
    () => Object.values(USER_ROLES).map((role) => ({ label: role, value: role })),
    []
  );

  const permissionOptions = useMemo(() => {
    const relevantKeys = activeTab === 'route'
      ? routePermissions.map(p => p.key)
      : componentPermissions.map(p => p.key);

    return relevantKeys.map((key) => ({ label: key, value: key }));
  }, [activeTab, routePermissions, componentPermissions]);

  // Header content
  const headerLeft = (
    <div className="page-header">
      <Typography.Title level={3} className="page-title">
        Roles and Permissions
      </Typography.Title>
      <Typography.Text type="secondary" className="page-subtitle">
        Manage what permissions each role has
      </Typography.Text>
    </div>
  );

  // Tab items
  const tabItems = [
    {
      key: 'route',
      label: 'Route Permissions',
      children: (
        <div className="tab-content">
          <PermissionFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            roleOptions={roleOptions}
            permissionOptions={permissionOptions}
            onExport={handleExport}
          />
          <div className="table-container">
            <DataStateRenderer
              isLoading={false}
              isRefetching={false}
              isError={false}
              data={filteredPermissions}
              loadingMessage="Loading route permissions..."
            >
              {(data) => (
                <PermissionsTable
                  permissions={data}
                  onUpdatePermission={handleUpdatePermission}
                  className="route-permissions-table"
                />
              )}
            </DataStateRenderer>
          </div>
        </div>
      ),
    },
    {
      key: 'component',
      label: 'Component Permissions',
      children: (
        <div className="tab-content">
          <PermissionFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            roleOptions={roleOptions}
            permissionOptions={permissionOptions}
            onExport={handleExport}
          />
          <div className="table-container">
            <DataStateRenderer
              isLoading={false}
              isRefetching={false}
              isError={false}
              data={filteredPermissions}
              loadingMessage="Loading component permissions..."
            >
              {(data) => (
                <PermissionsTable
                  permissions={data}
                  onUpdatePermission={handleUpdatePermission}
                  className="component-permissions-table"
                />
              )}
            </DataStateRenderer>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="roles-permissions-page">
      <Header leftComponent={headerLeft} rightComponent={null} />

      <div className="page-content">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key as PermissionTabType)}
          items={tabItems}
          className="permissions-tabs"
        />
      </div>
    </div>
  );
};

export default RolesPermissions;