import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StatsCards from './components/StatsCards';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import ActivityLog from './components/ActivityLog';
import RoleManagement from './components/RoleManagement';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const UserAdministration = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('users');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [selectedUsers, setSelectedUsers] = useState([]);

  // Mock data
  const stats = {
    totalUsers: 156,
    activeUsers: 142,
    pendingApprovals: 8,
    securityAlerts: 3
  };

  const users = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    role: "admin",
    department: "IT",
    phone: "+1 (555) 123-4567",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
    avatarAlt: "Professional headshot of woman with brown hair in business attire smiling at camera",
    status: "active",
    lastLogin: "2 hours ago",
    twoFactorEnabled: true,
    permissions: ["users.read", "users.write", "users.delete", "admin.settings"]
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@company.com",
    role: "manager",
    department: "Sales",
    phone: "+1 (555) 234-5678",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116b22d4e-1762273809021.png",
    avatarAlt: "Professional headshot of Asian man with short black hair in navy suit",
    status: "active",
    lastLogin: "1 day ago",
    twoFactorEnabled: false,
    permissions: ["sales.read", "sales.write", "crm.read", "crm.write"]
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.rodriguez@company.com",
    role: "user",
    department: "Marketing",
    phone: "+1 (555) 345-6789",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1beb9fc75-1762273370028.png",
    avatarAlt: "Professional headshot of Hispanic woman with long dark hair in white blouse",
    status: "active",
    lastLogin: "3 hours ago",
    twoFactorEnabled: true,
    permissions: ["crm.read", "sales.read"]
  },
  {
    id: 4,
    name: "David Thompson",
    email: "david.thompson@company.com",
    role: "manager",
    department: "Finance",
    phone: "+1 (555) 456-7890",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dcecb93b-1762274344274.png",
    avatarAlt: "Professional headshot of Caucasian man with beard in gray suit jacket",
    status: "inactive",
    lastLogin: "1 week ago",
    twoFactorEnabled: false,
    permissions: ["finance.read", "finance.write"]
  },
  {
    id: 5,
    name: "Lisa Wang",
    email: "lisa.wang@company.com",
    role: "user",
    department: "HR",
    phone: "+1 (555) 567-8901",
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_129b1ff05-1762273604073.png",
    avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in burgundy blazer",
    status: "suspended",
    lastLogin: "2 weeks ago",
    twoFactorEnabled: true,
    permissions: ["users.read"]
  }];


  const activities = [
  {
    id: 1,
    type: "login",
    description: "Successful login from new device",
    timestamp: new Date(Date.now() - 300000),
    user: {
      name: "Sarah Johnson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
      avatarAlt: "Professional headshot of woman with brown hair in business attire smiling at camera"
    },
    ipAddress: "192.168.1.100",
    location: "New York, NY"
  },
  {
    id: 2,
    type: "user_created",
    description: "Created new user account for John Smith",
    timestamp: new Date(Date.now() - 900000),
    user: {
      name: "Michael Chen",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_116b22d4e-1762273809021.png",
      avatarAlt: "Professional headshot of Asian man with short black hair in navy suit"
    },
    details: "Role: User, Department: Marketing"
  },
  {
    id: 3,
    type: "permission",
    description: "Updated permissions for Emily Rodriguez",
    timestamp: new Date(Date.now() - 1800000),
    user: {
      name: "Sarah Johnson",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_10c75be77-1762273997956.png",
      avatarAlt: "Professional headshot of woman with brown hair in business attire smiling at camera"
    },
    details: "Added: sales.write, Removed: finance.read"
  },
  {
    id: 4,
    type: "security",
    description: "Failed login attempt detected",
    timestamp: new Date(Date.now() - 3600000),
    user: null,
    ipAddress: "203.0.113.45",
    location: "Unknown",
    details: "Multiple failed attempts for user: david.thompson@company.com"
  },
  {
    id: 5,
    type: "password_change",
    description: "Password changed successfully",
    timestamp: new Date(Date.now() - 7200000),
    user: {
      name: "Lisa Wang",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_129b1ff05-1762273604073.png",
      avatarAlt: "Professional headshot of Asian woman with shoulder-length black hair in burgundy blazer"
    }
  }];


  const roles = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full system access with all permissions",
    permissions: ["users.read", "users.write", "users.delete", "admin.settings", "admin.backup", "admin.audit"]
  },
  {
    id: "manager",
    name: "Manager",
    description: "Department-level management access",
    permissions: ["users.read", "sales.read", "sales.write", "crm.read", "crm.write", "finance.read"]
  },
  {
    id: "user",
    name: "User",
    description: "Standard user with limited access",
    permissions: ["crm.read", "sales.read"]
  },
  {
    id: "viewer",
    name: "Viewer",
    description: "Read-only access to assigned modules",
    permissions: ["crm.read"]
  }];


  const tabs = [
  { id: 'users', label: 'User Management', icon: 'Users' },
  { id: 'roles', label: 'Roles & Permissions', icon: 'Shield' },
  { id: 'activity', label: 'Activity Log', icon: 'Activity' }];


  const handleCreateUser = () => {
    setModalMode('create');
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setModalMode('edit');
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleSaveUser = (userData) => {
    console.log('Saving user:', userData);
    // In a real app, this would make an API call
  };

  const handleBulkAction = (action) => {
    console.log('Bulk action:', action, 'for users:', selectedUsers);
    // In a real app, this would make an API call
    setSelectedUsers([]);
  };

  const handleRoleCreate = (roleData) => {
    console.log('Creating role:', roleData);
    // In a real app, this would make an API call
  };

  const handleRoleUpdate = (roleData) => {
    console.log('Updating role:', roleData);
    // In a real app, this would make an API call
  };

  const handleRoleDelete = (roleId) => {
    console.log('Deleting role:', roleId);
    // In a real app, this would make an API call
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen} />

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)} />

      <main className="lg:ml-72 pt-16">
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Administration</h1>
                <p className="text-gray-600 mt-1">
                  Manage user accounts, roles, and security settings
                </p>
              </div>
              
              <div className="mt-4 sm:mt-0 flex space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}>

                  Export Users
                </Button>
                <Button
                  variant="default"
                  onClick={handleCreateUser}
                  iconName="UserPlus"
                  iconPosition="left"
                  iconSize={16}>

                  Add User
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards stats={stats} />

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab?.id ?
                  'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`
                  }>

                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                )}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'users' &&
            <UserTable
              users={users}
              onUserSelect={setSelectedUsers}
              onBulkAction={handleBulkAction}
              selectedUsers={selectedUsers}
              onUserEdit={handleEditUser} />

            }

            {activeTab === 'roles' &&
            <RoleManagement
              roles={roles}
              onRoleCreate={handleRoleCreate}
              onRoleUpdate={handleRoleUpdate}
              onRoleDelete={handleRoleDelete} />

            }

            {activeTab === 'activity' &&
            <ActivityLog activities={activities} />
            }
          </div>
        </div>
      </main>
      {/* User Modal */}
      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
        mode={modalMode} />

    </div>);

};

export default UserAdministration;
