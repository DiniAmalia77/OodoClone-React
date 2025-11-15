import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserModal = ({ isOpen, onClose, user, onSave, mode = 'create' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    department: '',
    phone: '',
    avatar: '',
    status: 'active',
    twoFactorEnabled: false,
    permissions: []
  });

  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState('profile');

  const roleOptions = [
    { value: 'admin', label: 'Administrator' },
    { value: 'manager', label: 'Manager' },
    { value: 'user', label: 'User' },
    { value: 'viewer', label: 'Viewer' }
  ];

  const departmentOptions = [
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'it', label: 'Information Technology' },
    { value: 'operations', label: 'Operations' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' }
  ];

  const permissionModules = [
    { id: 'sales', label: 'Sales Management', permissions: ['read', 'write', 'delete'] },
    { id: 'crm', label: 'Customer Relations', permissions: ['read', 'write', 'delete'] },
    { id: 'finance', label: 'Financial Management', permissions: ['read', 'write', 'delete'] },
    { id: 'inventory', label: 'Inventory Control', permissions: ['read', 'write', 'delete'] },
    { id: 'hr', label: 'Human Resources', permissions: ['read', 'write', 'delete'] },
    { id: 'projects', label: 'Project Management', permissions: ['read', 'write', 'delete'] },
    { id: 'reports', label: 'Reports & Analytics', permissions: ['read', 'write', 'delete'] },
    { id: 'admin', label: 'System Administration', permissions: ['read', 'write', 'delete'] }
  ];

  useEffect(() => {
    if (user && mode === 'edit') {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'user',
        department: user?.department || '',
        phone: user?.phone || '',
        avatar: user?.avatar || '',
        status: user?.status || 'active',
        twoFactorEnabled: user?.twoFactorEnabled || false,
        permissions: user?.permissions || []
      });
    } else {
      setFormData({
        name: '',
        email: '',
        role: 'user',
        department: '',
        phone: '',
        avatar: '',
        status: 'active',
        twoFactorEnabled: false,
        permissions: []
      });
    }
    setErrors({});
    setActiveTab('profile');
  }, [user, mode, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handlePermissionChange = (moduleId, permission, checked) => {
    setFormData(prev => {
      const permissions = [...prev?.permissions];
      const permissionKey = `${moduleId}.${permission}`;
      
      if (checked) {
        if (!permissions?.includes(permissionKey)) {
          permissions?.push(permissionKey);
        }
      } else {
        const index = permissions?.indexOf(permissionKey);
        if (index > -1) {
          permissions?.splice(index, 1);
        }
      }
      
      return {
        ...prev,
        permissions
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  const hasPermission = (moduleId, permission) => {
    return formData?.permissions?.includes(`${moduleId}.${permission}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Add New User' : 'Edit User'}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile' ?'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Profile Information
            </button>
            <button
              onClick={() => setActiveTab('permissions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'permissions' ?'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Permissions & Access
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'security' ?'border-blue-500 text-blue-600' :'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Security Settings
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          <form onSubmit={handleSubmit}>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    type="text"
                    value={formData?.name}
                    onChange={(e) => handleInputChange('name', e?.target?.value)}
                    error={errors?.name}
                    required
                    placeholder="Enter full name"
                  />
                  
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData?.email}
                    onChange={(e) => handleInputChange('email', e?.target?.value)}
                    error={errors?.email}
                    required
                    placeholder="Enter email address"
                  />
                  
                  <Select
                    label="Role"
                    options={roleOptions}
                    value={formData?.role}
                    onChange={(value) => handleInputChange('role', value)}
                    required
                  />
                  
                  <Select
                    label="Department"
                    options={departmentOptions}
                    value={formData?.department}
                    onChange={(value) => handleInputChange('department', value)}
                    error={errors?.department}
                    required
                  />
                  
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={formData?.phone}
                    onChange={(e) => handleInputChange('phone', e?.target?.value)}
                    placeholder="Enter phone number"
                  />
                  
                  <Select
                    label="Account Status"
                    options={statusOptions}
                    value={formData?.status}
                    onChange={(value) => handleInputChange('status', value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture URL
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={formData?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'}
                        alt="User profile picture showing professional headshot"
                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                      />
                    </div>
                    <Input
                      type="url"
                      value={formData?.avatar}
                      onChange={(e) => handleInputChange('avatar', e?.target?.value)}
                      placeholder="Enter image URL"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Permissions Tab */}
            {activeTab === 'permissions' && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-900 mb-2">Permission Matrix</h3>
                  <p className="text-sm text-blue-700">
                    Configure granular access controls for each module. Users can have read, write, or delete permissions.
                  </p>
                </div>

                <div className="space-y-4">
                  {permissionModules?.map((module) => (
                    <div key={module.id} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-3">{module.label}</h4>
                      <div className="grid grid-cols-3 gap-4">
                        {module.permissions?.map((permission) => (
                          <Checkbox
                            key={`${module.id}-${permission}`}
                            label={permission?.charAt(0)?.toUpperCase() + permission?.slice(1)}
                            checked={hasPermission(module.id, permission)}
                            onChange={(e) => handlePermissionChange(module.id, permission, e?.target?.checked)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-yellow-900 mb-2">Security Configuration</h3>
                  <p className="text-sm text-yellow-700">
                    Configure security settings and authentication requirements for this user.
                  </p>
                </div>

                <div className="space-y-4">
                  <Checkbox
                    label="Enable Two-Factor Authentication"
                    description="Require additional verification during login"
                    checked={formData?.twoFactorEnabled}
                    onChange={(e) => handleInputChange('twoFactorEnabled', e?.target?.checked)}
                  />

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Password Policy</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span>Minimum 8 characters</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span>At least one uppercase letter</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span>At least one number</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-green-500" />
                        <span>At least one special character</span>
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">Session Management</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Session Timeout (minutes)
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="30">30 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="120">2 hours</option>
                          <option value="480">8 hours</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Max Concurrent Sessions
                        </label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="1">1 session</option>
                          <option value="3">3 sessions</option>
                          <option value="5">5 sessions</option>
                          <option value="unlimited">Unlimited</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleSubmit}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            {mode === 'create' ? 'Create User' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
