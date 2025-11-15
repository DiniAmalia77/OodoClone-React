import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'journal-entry',
      label: 'Create Journal Entry',
      icon: 'FileText',
      description: 'Record financial transactions',
      variant: 'default'
    },
    {
      id: 'invoice',
      label: 'Generate Invoice',
      icon: 'Receipt',
      description: 'Create customer invoice',
      variant: 'outline'
    },
    {
      id: 'payment',
      label: 'Process Payment',
      icon: 'CreditCard',
      description: 'Record payment received',
      variant: 'outline'
    },
    {
      id: 'report',
      label: 'Financial Report',
      icon: 'BarChart3',
      description: 'Generate financial reports',
      variant: 'outline'
    },
    {
      id: 'reconcile',
      label: 'Bank Reconciliation',
      icon: 'CheckCircle',
      description: 'Reconcile bank statements',
      variant: 'outline'
    },
    {
      id: 'budget',
      label: 'Budget Analysis',
      icon: 'Target',
      description: 'Review budget variance',
      variant: 'outline'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 enterprise-shadow">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <div key={action?.id} className="group">
            <Button
              variant={action?.variant}
              className="w-full h-auto p-4 flex-col space-y-2 group-hover:enterprise-shadow-md enterprise-transition"
              onClick={() => onActionClick && onActionClick(action?.id)}
              iconName={action?.icon}
              iconSize={24}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="text-sm font-medium">{action?.label}</div>
                <div className="text-xs text-muted-foreground text-center leading-tight">
                  {action?.description}
                </div>
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
