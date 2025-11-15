import React from 'react';
import Icon from '../../../components/AppIcon';

const CustomerStats = ({ customers }) => {
  const calculateStats = () => {
    const totalCustomers = customers?.length;
    const activeCustomers = customers?.filter(c => c?.status === 'active')?.length;
    const prospects = customers?.filter(c => c?.status === 'prospect')?.length;
    const leads = customers?.filter(c => c?.status === 'lead')?.length;
    
    const totalSales = customers?.reduce((sum, c) => sum + c?.totalSales, 0);
    const avgSalesPerCustomer = totalCustomers > 0 ? totalSales / totalCustomers : 0;
    
    const totalOrders = customers?.reduce((sum, c) => sum + c?.totalOrders, 0);
    const totalOpportunities = customers?.reduce((sum, c) => sum + c?.openOpportunities, 0);

    return {
      totalCustomers,
      activeCustomers,
      prospects,
      leads,
      totalSales,
      avgSalesPerCustomer,
      totalOrders,
      totalOpportunities
    };
  };

  const stats = calculateStats();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    })?.format(amount);
  };

  const statCards = [
    {
      title: 'Total Customers',
      value: stats?.totalCustomers?.toLocaleString(),
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Customers',
      value: stats?.activeCustomers?.toLocaleString(),
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8%',
      changeType: 'positive'
    },
    {
      title: 'Total Sales',
      value: formatCurrency(stats?.totalSales),
      icon: 'DollarSign',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+15%',
      changeType: 'positive'
    },
    {
      title: 'Avg Sales/Customer',
      value: formatCurrency(stats?.avgSalesPerCustomer),
      icon: 'TrendingUp',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+3%',
      changeType: 'positive'
    },
    {
      title: 'Prospects',
      value: stats?.prospects?.toLocaleString(),
      icon: 'Target',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+25%',
      changeType: 'positive'
    },
    {
      title: 'Open Opportunities',
      value: stats?.totalOpportunities?.toLocaleString(),
      icon: 'Zap',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      change: '+18%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card rounded-lg border border-border enterprise-shadow p-4 hover:enterprise-shadow-md enterprise-transition"
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg ${stat?.bgColor}`}>
              <Icon name={stat?.icon} size={20} className={stat?.color} />
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full ${
              stat?.changeType === 'positive' ?'text-success bg-success/10' :'text-destructive bg-destructive/10'
            }`}>
              {stat?.change}
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="text-2xl font-bold text-card-foreground">
              {stat?.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat?.title}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerStats;
