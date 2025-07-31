import React from 'react';
import { Input, Button } from 'antd';
import { Search, Download } from 'lucide-react';
import CustomMultiSelect from 'components/NewSelect/CustomMultiSelect';
import { FilterState } from '../../types';
import './PermissionFilters.styles.scss';

interface PermissionFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  roleOptions: { label: string; value: string }[];
  permissionOptions: { label: string; value: string }[];
  onExport: () => void;
}

const PermissionFilters: React.FC<PermissionFiltersProps> = ({
  filters,
  onFiltersChange,
  roleOptions,
  permissionOptions,
  onExport,
}) => {
  return (
    <div className="permission-filters">
      <div className="filters-row">
        <div className="search-container">
          <Input
            placeholder="Search"
            prefix={<Search size={16} />}
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="search-input"
            allowClear
          />
        </div>

        <div className="filter-selects">
          <CustomMultiSelect
            placeholder="Roles"
            options={roleOptions}
            value={filters.selectedRoles}
            onChange={(values) => onFiltersChange({ selectedRoles: values as string[] })}
            enableAllSelection={true}
            allowClear={true}
            maxTagCount={2}
            className="roles-filter"
          />

          <CustomMultiSelect
            placeholder="Permissions"
            options={permissionOptions}
            value={filters.selectedPermissions}
            onChange={(values) => onFiltersChange({ selectedPermissions: values as string[] })}
            enableAllSelection={true}
            allowClear={true}
            maxTagCount={5}
            className="permissions-filter"
          />
          <Button
            type="primary"
            icon={<Download size={16} />}
            onClick={onExport}
            className="export-button"
          >
            Export
          </Button>
        </div>


      </div>
    </div>
  );
};

export default PermissionFilters;