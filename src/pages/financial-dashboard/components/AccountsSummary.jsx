import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountsSummary = ({ accounts, recentTransactions }) => {
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

  const getAccountTypeIcon = (type) => {
    const icons = {
      'asset': 'Wallet',
      'liability': 'CreditCard',
      'equity': 'PieChart',
      'revenue': 'TrendingUp',
      'expense': 'TrendingDown'
    };
    return icons?.[type] || 'DollarSign';
  };

  const getTransactionIcon = (type) => {
    return type === 'credit' ? 'ArrowUpRight' : 'ArrowDownLeft';
  };

  const getTransactionColor = (type) => {
    return type === 'credit' ? 'text-success' : 'text-error';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart of Accounts */}
      <div className="bg-card border border-border rounded-lg p-6 enterprise-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Chart of Accounts</h3>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            Add Account
          </Button>
        </div>
        
        <div className="space-y-3">
          {accounts?.map((account) => (
            <div key={account?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 enterprise-transition">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={getAccountTypeIcon(account?.type)} size={16} className="text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{account?.name}</div>
                  <div className="text-xs text-muted-foreground">{account?.code} • {account?.type}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {formatCurrency(account?.balance)}
                </div>
                <div className={`text-xs ${account?.change >= 0 ? 'text-success' : 'text-error'}`}>
                  {account?.change >= 0 ? '+' : ''}{account?.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full" iconName="ExternalLink" iconPosition="right">
            View All Accounts
          </Button>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-lg p-6 enterprise-shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
          <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
            New Entry
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentTransactions?.map((transaction) => (
            <div key={transaction?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 enterprise-transition">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  transaction?.type === 'credit' ? 'bg-success/10' : 'bg-error/10'
                }`}>
                  <Icon 
                    name={getTransactionIcon(transaction?.type)} 
                    size={16} 
                    className={transaction?.type === 'credit' ? 'text-success' : 'text-error'} 
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{transaction?.description}</div>
                  <div className="text-xs text-muted-foreground">
                    {transaction?.account} • {formatDate(transaction?.date)}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-sm font-medium ${getTransactionColor(transaction?.type)}`}>
                  {transaction?.type === 'credit' ? '+' : '-'}{formatCurrency(Math.abs(transaction?.amount))}
                </div>
                <div className="text-xs text-muted-foreground">{transaction?.reference}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" className="w-full" iconName="ExternalLink" iconPosition="right">
            View All Transactions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountsSummary;
