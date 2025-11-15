import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BankReconciliation = ({ bankAccounts, reconciliationStatus }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'reconciled': 'text-success bg-success/10',
      'pending': 'text-warning bg-warning/10',
      'discrepancy': 'text-error bg-error/10'
    };
    return colors?.[status] || 'text-muted-foreground bg-muted/10';
  };

  const getStatusIcon = (status) => {
    const icons = {
      'reconciled': 'CheckCircle',
      'pending': 'Clock',
      'discrepancy': 'AlertTriangle'
    };
    return icons?.[status] || 'Circle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 enterprise-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Bank Reconciliation</h3>
        <Button variant="outline" size="sm" iconName="Upload" iconPosition="left">
          Import Statement
        </Button>
      </div>
      {/* Reconciliation Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Reconciled</span>
          </div>
          <div className="text-2xl font-bold text-success">
            {reconciliationStatus?.reconciled}
          </div>
          <div className="text-xs text-muted-foreground">Transactions matched</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Pending</span>
          </div>
          <div className="text-2xl font-bold text-warning">
            {reconciliationStatus?.pending}
          </div>
          <div className="text-xs text-muted-foreground">Awaiting review</div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={16} className="text-error" />
            <span className="text-sm font-medium text-foreground">Discrepancies</span>
          </div>
          <div className="text-2xl font-bold text-error">
            {reconciliationStatus?.discrepancies}
          </div>
          <div className="text-xs text-muted-foreground">Need attention</div>
        </div>
      </div>
      {/* Bank Accounts */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Bank Accounts Status</h4>
        
        {bankAccounts?.map((account) => (
          <div key={account?.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 enterprise-transition">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={20} className="text-primary" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{account?.name}</div>
                <div className="text-xs text-muted-foreground">
                  {account?.accountNumber} • Last reconciled: {formatDate(account?.lastReconciled)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {formatCurrency(account?.balance)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Book Balance
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {formatCurrency(account?.bankBalance)}
                </div>
                <div className="text-xs text-muted-foreground">
                  Bank Balance
                </div>
              </div>
              
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(account?.status)}`}>
                <div className="flex items-center space-x-1">
                  <Icon name={getStatusIcon(account?.status)} size={12} />
                  <span className="capitalize">{account?.status}</span>
                </div>
              </div>
              
              <Button variant="ghost" size="sm" iconName="ArrowRight" iconSize={16}>
                <span className="sr-only">Reconcile {account?.name}</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
      {/* Suggested Matches */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-foreground">Suggested Matches</h4>
          <Button variant="ghost" size="sm" iconName="RefreshCw" iconSize={16}>
            Refresh
          </Button>
        </div>
        
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-accent" />
            <span className="text-sm font-medium text-foreground">Auto-matching enabled</span>
          </div>
          <div className="text-xs text-muted-foreground">
            3 transactions automatically matched based on amount and date. 
            <Button variant="link" size="sm" className="p-0 h-auto text-xs">
              Review matches
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankReconciliation;
