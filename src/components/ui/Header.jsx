import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState('Odoo Enterprise Inc.');
  const location = useLocation();

  const companies = [
    'Odoo Enterprise Inc.',
    'Subsidiary Corp.',
    'International Branch',
    'Regional Office'
  ];

  const userMenuItems = [
    { label: 'Profile Settings', icon: 'User', path: '/profile' },
    { label: 'Preferences', icon: 'Settings', path: '/preferences' },
    { label: 'Help & Support', icon: 'HelpCircle', path: '/help' },
    { label: 'Sign Out', icon: 'LogOut', path: '/login' }
  ];

  const getPageTitle = () => {
    const titles = {
      '/main-dashboard': 'Dashboard',
      '/customer-management': 'Customer Management',
      '/financial-dashboard': 'Financial Dashboard',
      '/project-management': 'Project Management',
      '/user-administration': 'User Administration'
    };
    return titles?.[location?.pathname] || 'Odoo Enterprise';
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-surface border-b border-border z-50 enterprise-shadow">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Menu Toggle & Title */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            iconName="Menu"
            iconSize={20}
          >
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-foreground">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Right Section - Company Selector & User Menu */}
        <div className="flex items-center space-x-4">
          {/* Company Selector */}
          <div className="relative hidden md:block">
            <Button
              variant="outline"
              className="text-sm font-medium"
              iconName="Building2"
              iconPosition="left"
              iconSize={16}
            >
              {selectedCompany}
            </Button>
          </div>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            iconName="Bell"
            iconSize={20}
          >
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-error rounded-full"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="hidden md:block text-left">
                <div className="text-sm font-medium text-foreground">John Doe</div>
                <div className="text-xs text-muted-foreground">Administrator</div>
              </div>
              <Icon 
                name="ChevronDown" 
                size={16} 
                className={`transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`}
              />
            </Button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg enterprise-shadow-lg z-50 animate-fade-in">
                <div className="p-3 border-b border-border">
                  <div className="font-medium text-sm text-popover-foreground">John Doe</div>
                  <div className="text-xs text-muted-foreground">john.doe@company.com</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedCompany}</div>
                </div>
                
                <div className="py-2">
                  {userMenuItems?.map((item, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-popover-foreground hover:bg-muted enterprise-transition"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        if (item?.path === '/login') {
                          // Handle logout logic
                          window.location.href = item?.path;
                        }
                      }}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile Company Selector */}
      <div className="md:hidden border-t border-border px-6 py-3">
        <Button
          variant="outline"
          size="sm"
          className="w-full justify-start text-sm"
          iconName="Building2"
          iconPosition="left"
          iconSize={16}
        >
          {selectedCompany}
        </Button>
      </div>
      {/* Click outside to close user menu */}
      {isUserMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsUserMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
