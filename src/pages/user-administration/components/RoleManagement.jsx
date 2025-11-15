import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RoleManagement = ({ roles, onRoleCreate, onRoleUpdate, onRoleDelete }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const permissionCategories = [
    {
      category: 'User Management',
      permissions: [
        { id: 'users.read', label: 'View Users', description: 'View user profiles and information' },
        { id: 'users.write', label: 'Manage Users', description: 'Create and edit user accounts' },
        { id: 'users.delete', label: 'Delete Users', description: 'Remove user accounts from system' }
      ]
    },
    {
      category: 'Sales & CRM',
      permissions: [
        { id: 'sales.read', label: 'View Sales Data', description: 'Access sales reports and pipeline' },
        { id: 'sales.write', label: 'Manage Sales', description: 'Create and edit sales opportunities' },
        { id: 'crm.read', label: 'View Customers', description: 'Access customer information' },
        { id: 'crm.write', label: 'Manage Customers', description: 'Create and edit customer records' }
      ]
    },
    {
      category: 'Financial Management',
      permissions: [
        { id: 'finance.read', label: 'View Financial Data', description: 'Access financial reports and data' },
        { id: 'finance.write', label: 'Manage Finances', description: 'Create invoices and manage accounting' },
        { id: 'finance.approve', label: 'Approve Transactions', description: 'Approve financial transactions' }
      ]
    },
    {
      category: 'System Administration',
      permissions: [
        { id: 'admin.settings', label: 'System Settings', description: 'Configure system-wide settings' },
        { id: 'admin.backup', label: 'Backup Management', description: 'Manage system backups' },
        { id: 'admin.audit', label: 'Audit Logs', description: 'Access system audit trails' }
      ]
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsCreating(false);
  };

  const handleCreateNew = () => {
    setIsCreating(true);
    setSelectedRole(null);
    setNewRole({
      name: '',
      description: '',
      permissions: []
    });
  };

  const handlePermissionToggle = (permissionId, isSelected) => {
    if (isCreating) {
      setNewRole(prev => ({
        ...prev,
        permissions: isSelected
          ? [...prev?.permissions, permissionId]
          : prev?.permissions?.filter(p => p !== permissionId)
      }));
    } else if (selectedRole) {
      const updatedRole = {
        ...selectedRole,
        permissions: isSelected
          ? [...selectedRole?.permissions, permissionId]
          : selectedRole?.permissions?.filter(p => p !== permissionId)
      };
      setSelectedRole(updatedRole);
      onRoleUpdate(updatedRole);
    }
  };

  const handleSaveNewRole = () => {
    if (newRole?.name?.trim()) {
      onRoleCreate(newRole);
      setIsCreating(false);
      setNewRole({ name: '', description: '', permissions: [] });
    }
  };

  const hasPermission = (permissionId) => {
    if (isCreating) {
      return newRole?.permissions?.includes(permissionId);
    }
    return selectedRole?.permissions?.includes(permissionId) || false;
  };

  const getRoleUserCount = (roleId) => {
    // Mock user count - in real app, this would come from props or API
    const counts = {
      'admin': 3,
      'manager': 12,
      'user': 45,
      'viewer': 8
    };
    return counts?.[roleId] || 0;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Role Management</h3>
            <p className="text-sm text-gray-500 mt-1">
              Configure roles and permissions for your organization
            </p>
          </div>
          <Button
            variant="default"
            onClick={handleCreateNew}
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Create Role
          </Button>
        </div>
      </div>
      <div className="flex h-96">
        {/* Roles List */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Available Roles</h4>
            <div className="space-y-2">
              {roles?.map((role) => (
                <button
                  key={role?.id}
                  onClick={() => handleRoleSelect(role)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors duration-150 ${
                    selectedRole?.id === role?.id
                      ? 'border-blue-500 bg-blue-50' :'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-sm text-gray-900">{role?.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{role?.description}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {getRoleUserCount(role?.id)} users
                      </div>
                    </div>
                    <Icon 
                      name="ChevronRight" 
                      size={16} 
                      className={selectedRole?.id === role?.id ? 'text-blue-500' : 'text-gray-400'} 
                    />
                  </div>
                </button>
              ))}
              
              {/* Create New Role Button */}
              <button
                onClick={handleCreateNew}
                className={`w-full text-left p-3 rounded-lg border-2 border-dashed transition-colors duration-150 ${
                  isCreating
                    ? 'border-blue-500 bg-blue-50' :'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Plus" size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-600">Create New Role</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Role Details */}
        <div className="flex-1 overflow-y-auto">
          {(selectedRole || isCreating) ? (
            <div className="p-6">
              {/* Role Info */}
              <div className="mb-6">
                {isCreating ? (
                  <div className="space-y-4">
                    <Input
                      label="Role Name"
                      type="text"
                      value={newRole?.name}
                      onChange={(e) => setNewRole(prev => ({ ...prev, name: e?.target?.value }))}
                      placeholder="Enter role name"
                      required
                    />
                    <Input
                      label="Description"
                      type="text"
                      value={newRole?.description}
                      onChange={(e) => setNewRole(prev => ({ ...prev, description: e?.target?.value }))}
                      placeholder="Enter role description"
                    />
                  </div>
                ) : (
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{selectedRole?.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{selectedRole?.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{getRoleUserCount(selectedRole?.id)} users assigned</span>
                      <span>•</span>
                      <span>{selectedRole?.permissions?.length || 0} permissions</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Permissions */}
              <div>
                <h5 className="text-sm font-medium text-gray-900 mb-4">Permissions</h5>
                <div className="space-y-6">
                  {permissionCategories?.map((category) => (
                    <div key={category?.category}>
                      <h6 className="text-sm font-medium text-gray-700 mb-3">{category?.category}</h6>
                      <div className="space-y-3 pl-4">
                        {category?.permissions?.map((permission) => (
                          <div key={permission?.id} className="flex items-start space-x-3">
                            <Checkbox
                              checked={hasPermission(permission?.id)}
                              onChange={(e) => handlePermissionToggle(permission?.id, e?.target?.checked)}
                              className="mt-0.5"
                            />
                            <div className="flex-1">
                              <label className="text-sm font-medium text-gray-900 cursor-pointer">
                                {permission?.label}
                              </label>
                              <p className="text-xs text-gray-500 mt-1">{permission?.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  {isCreating ? (
                    <div className="flex space-x-3">
                      <Button
                        variant="default"
                        onClick={handleSaveNewRole}
                        disabled={!newRole?.name?.trim()}
                        iconName="Save"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Create Role
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsCreating(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => onRoleDelete(selectedRole?.id)}
                        iconName="Trash2"
                        iconPosition="left"
                        iconSize={16}
                      >
                        Delete Role
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Icon name="Shield" size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Role</h3>
                <p className="text-gray-500">Choose a role to view and edit its permissions</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
