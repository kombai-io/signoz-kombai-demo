import React from 'react';
import { Typography } from 'antd';
import ResizeTable from 'components/ResizeTable/ResizeTable';
import CustomMultiSelect from 'components/NewSelect/CustomMultiSelect';
import { PermissionItem } from '../../types';
import { USER_ROLES } from 'types/roles';
import './PermissionsTable.styles.scss';

interface PermissionsTableProps {
  permissions: PermissionItem[];
  onUpdatePermission: (permissionId: string, roles: string[]) => void;
  className?: string;
}

const PermissionsTable: React.FC<PermissionsTableProps> = ({
  permissions,
  onUpdatePermission,
  className,
}) => {
  const handleRoleDropdownChange = (permissionId: string, selectedRoles: string[]) => {
    onUpdatePermission(permissionId, selectedRoles);
  };

  const roleOptions = Object.values(USER_ROLES).map(role => ({ label: role, value: role }));

  const columns = [
    {
      title: 'Route Permission',
      dataIndex: 'description',
      key: 'description',
      width: 300,
      render: (text: string) => (
        <Typography.Text className="permission-description">
          {text}
        </Typography.Text>
      ),
    },
    {
      title: 'Permission key',
      dataIndex: 'key',
      key: 'key',
      width: 200,
      render: (text: string) => (
        <Typography.Text code className="permission-key">
          {text}
        </Typography.Text>
      ),
    },
    {
      title: 'Roles with these permission',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: string[], record: PermissionItem) => (
        <div className="roles-container">
          <CustomMultiSelect
            placeholder="Select roles..."
            options={roleOptions}
            value={roles}
            onChange={(values) => handleRoleDropdownChange(record.id, values as string[])}
            enableAllSelection={false}
            allowClear={true}
            maxTagCount={3}
            className="roles-multiselect"
          />
        </div>
      ),
    },
  ];

  return (
    <div className={`permissions-table-container ${className || ''}`}>
      <ResizeTable
        columns={columns}
        dataSource={permissions}
        pagination={false}
        className="permissions-table"
        rowKey="id"
        size="middle"
      />
    </div>
  );
};

export default PermissionsTable;