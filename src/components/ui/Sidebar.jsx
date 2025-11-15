import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isOpen = false, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/main-dashboard',
      description: 'Overview and analytics'
    },
    {
      label: 'Financial Management',
      icon: 'DollarSign',
      path: '/financial-dashboard',
      description: 'Accounting and reports'
    },
    {
      label: 'Customer Relations',
      icon: 'Users',
      path: '/customer-management',
      description: 'CRM and sales pipeline'
    },
    {
      label: 'Project Operations',
      icon: 'FolderOpen',
      path: '/project-management',
      description: 'Tasks and resources'
    },
    {
      label: 'System Administration',
      icon: 'Shield',
      path: '/user-administration',
      description: 'Users and permissions'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-surface border-r border-border z-50 enterprise-shadow-md
        transition-all duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-16' : 'w-72'}
        lg:fixed
      `}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={`flex items-center ${isCollapsed ? 'justify-center px-4' : 'justify-between px-6'} py-4 border-b border-border`}>
            {!isCollapsed && (
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="Zap" size={20} color="white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-primary">Odoo</h2>
                  <p className="text-xs text-muted-foreground -mt-1">Enterprise</p>
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Zap" size={20} color="white" />
              </div>
            )}

            {/* Collapse Toggle - Desktop Only */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleCollapse}
              className="hidden lg:flex"
              iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
              iconSize={16}
            >
              <span className="sr-only">Toggle sidebar</span>
            </Button>

            {/* Close Button - Mobile Only */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
              iconName="X"
              iconSize={20}
            >
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <div className={`space-y-2 ${isCollapsed ? 'px-2' : 'px-4'}`}>
              {navigationItems?.map((item) => {
                const isActive = location?.pathname === item?.path;
                
                return (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className={`
                      w-full flex items-center space-x-3 rounded-lg enterprise-transition
                      ${isCollapsed ? 'p-3 justify-center' : 'p-3'}
                      ${isActive 
                        ? 'bg-primary text-primary-foreground enterprise-shadow' 
                        : 'text-foreground hover:bg-muted hover:text-foreground'
                      }
                    `}
                    title={isCollapsed ? item?.label : undefined}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}
                    />
                    {!isCollapsed && (
                      <div className="flex-1 text-left">
                        <div className={`text-sm font-medium ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
                          {item?.label}
                        </div>
                        <div className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                          {item?.description}
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Footer Section */}
          <div className={`border-t border-border p-4 ${isCollapsed ? 'text-center' : ''}`}>
            {!isCollapsed ? (
              <div className="space-y-3">
                <div className="text-xs text-muted-foreground">
                  <div className="font-medium">System Status</div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>All systems operational</span>
                  </div>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  <div>Version 17.0.1</div>
                  <div>© 2025 Odoo Enterprise</div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-2 h-2 bg-success rounded-full" title="All systems operational"></div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
