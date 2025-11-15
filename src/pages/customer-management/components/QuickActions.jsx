import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ selectedCustomer, onActionComplete }) => {
  const [showActionMenu, setShowActionMenu] = useState(false);

  const quickActions = [
    {
      id: 'new-customer',
      label: 'Add New Customer',
      icon: 'UserPlus',
      color: 'bg-primary text-primary-foreground',
      description: 'Create a new customer record'
    },
    {
      id: 'import-customers',
      label: 'Import Customers',
      icon: 'Upload',
      color: 'bg-secondary text-secondary-foreground',
      description: 'Import customers from CSV/Excel'
    },
    {
      id: 'bulk-email',
      label: 'Send Bulk Email',
      icon: 'Mail',
      color: 'bg-accent text-accent-foreground',
      description: 'Send email to multiple customers'
    },
    {
      id: 'export-data',
      label: 'Export Data',
      icon: 'Download',
      color: 'bg-warning text-warning-foreground',
      description: 'Export customer data to file'
    }
  ];

  const customerActions = selectedCustomer ? [
    {
      id: 'send-email',
      label: 'Send Email',
      icon: 'Mail',
      description: `Send email to ${selectedCustomer?.contactPerson}`
    },
    {
      id: 'schedule-call',
      label: 'Schedule Call',
      icon: 'Phone',
      description: 'Schedule a call with customer'
    },
    {
      id: 'create-opportunity',
      label: 'New Opportunity',
      icon: 'Target',
      description: 'Create sales opportunity'
    },
    {
      id: 'add-note',
      label: 'Add Note',
      icon: 'FileText',
      description: 'Add interaction note'
    },
    {
      id: 'create-task',
      label: 'Create Task',
      icon: 'CheckSquare',
      description: 'Create follow-up task'
    },
    {
      id: 'view-orders',
      label: 'View Orders',
      icon: 'ShoppingCart',
      description: 'View customer orders'
    }
  ] : [];

  const handleAction = (actionId) => {
    // Handle different actions
    switch (actionId) {
      case 'new-customer': console.log('Opening new customer form...');
        break;
      case 'import-customers': console.log('Opening import dialog...');
        break;
      case 'bulk-email': console.log('Opening bulk email composer...');
        break;
      case 'export-data':
        console.log('Exporting customer data...');
        break;
      case 'send-email':
        console.log(`Sending email to ${selectedCustomer?.contactPerson}...`);
        break;
      case 'schedule-call': console.log('Opening calendar scheduler...');
        break;
      case 'create-opportunity': console.log('Creating new opportunity...');
        break;
      case 'add-note': console.log('Opening note editor...');
        break;
      case 'create-task': console.log('Creating new task...');
        break;
      case 'view-orders': console.log('Navigating to orders...');
        break;
      default:
        console.log(`Action ${actionId} not implemented`);
    }

    if (onActionComplete) {
      onActionComplete(actionId);
    }
    setShowActionMenu(false);
  };

  return (
    <div className="space-y-4">
      {/* General Quick Actions */}
      <div className="bg-card rounded-lg border border-border enterprise-shadow p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
          <Icon name="Zap" size={20} className="mr-2" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleAction(action?.id)}
              className={`${action?.color} rounded-lg p-4 text-left enterprise-transition hover:opacity-90 hover:enterprise-shadow-md`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={action?.icon} size={20} />
                <div>
                  <div className="font-medium">{action?.label}</div>
                  <div className="text-xs opacity-80">{action?.description}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Customer-Specific Actions */}
      {selectedCustomer && (
        <div className="bg-card rounded-lg border border-border enterprise-shadow p-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
            <Icon name="User" size={20} className="mr-2" />
            Actions for {selectedCustomer?.company}
          </h3>
          
          <div className="space-y-2">
            {customerActions?.map((action) => (
              <button
                key={action?.id}
                onClick={() => handleAction(action?.id)}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted enterprise-transition text-left"
              >
                <div className="p-2 bg-muted rounded-lg">
                  <Icon name={action?.icon} size={16} className="text-muted-foreground" />
                </div>
                <div>
                  <div className="font-medium text-card-foreground">{action?.label}</div>
                  <div className="text-sm text-muted-foreground">{action?.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Recent Activities */}
      <div className="bg-card rounded-lg border border-border enterprise-shadow p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center">
          <Icon name="Clock" size={20} className="mr-2" />
          Recent Activities
        </h3>
        
        <div className="space-y-3">
          {[
            {
              action: 'New customer added',
              customer: 'TechCorp Solutions',
              time: '2 minutes ago',
              icon: 'UserPlus',
              color: 'text-success'
            },
            {
              action: 'Email sent to',
              customer: 'Global Industries',
              time: '15 minutes ago',
              icon: 'Mail',
              color: 'text-accent'
            },
            {
              action: 'Call scheduled with',
              customer: 'Innovation Labs',
              time: '1 hour ago',
              icon: 'Phone',
              color: 'text-warning'
            },
            {
              action: 'Opportunity created for',
              customer: 'Future Systems',
              time: '2 hours ago',
              icon: 'Target',
              color: 'text-primary'
            }
          ]?.map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted enterprise-transition">
              <Icon name={activity?.icon} size={16} className={activity?.color} />
              <div className="flex-1">
                <div className="text-sm text-card-foreground">
                  {activity?.action} <span className="font-medium">{activity?.customer}</span>
                </div>
                <div className="text-xs text-muted-foreground">{activity?.time}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" size="sm" fullWidth iconName="Eye" iconPosition="left">
            View All Activities
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
