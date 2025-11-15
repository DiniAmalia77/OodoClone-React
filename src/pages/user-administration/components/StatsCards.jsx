import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers,
      change: '+12%',
      changeType: 'positive',
      icon: 'Users',
      color: 'blue'
    },
    {
      title: 'Active Users',
      value: stats?.activeUsers,
      change: '+8%',
      changeType: 'positive',
      icon: 'UserCheck',
      color: 'green'
    },
    {
      title: 'Pending Approvals',
      value: stats?.pendingApprovals,
      change: '-5%',
      changeType: 'negative',
      icon: 'Clock',
      color: 'yellow'
    },
    {
      title: 'Security Alerts',
      value: stats?.securityAlerts,
      change: '+2',
      changeType: 'neutral',
      icon: 'Shield',
      color: 'red'
    }
  ];

  const getCardStyles = (color) => {
    const styles = {
      blue: {
        bg: 'bg-blue-50',
        icon: 'bg-blue-100 text-blue-600',
        border: 'border-blue-200'
      },
      green: {
        bg: 'bg-green-50',
        icon: 'bg-green-100 text-green-600',
        border: 'border-green-200'
      },
      yellow: {
        bg: 'bg-yellow-50',
        icon: 'bg-yellow-100 text-yellow-600',
        border: 'border-yellow-200'
      },
      red: {
        bg: 'bg-red-50',
        icon: 'bg-red-100 text-red-600',
        border: 'border-red-200'
      }
    };
    return styles?.[color] || styles?.blue;
  };

  const getChangeStyles = (type) => {
    const styles = {
      positive: 'text-green-600 bg-green-100',
      negative: 'text-red-600 bg-red-100',
      neutral: 'text-gray-600 bg-gray-100'
    };
    return styles?.[type] || styles?.neutral;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => {
        const cardStyles = getCardStyles(card?.color);
        const changeStyles = getChangeStyles(card?.changeType);
        
        return (
          <div
            key={index}
            className={`${cardStyles?.bg} ${cardStyles?.border} border rounded-lg p-6 hover:shadow-md transition-shadow duration-200`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card?.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mb-2">
                  {card?.value?.toLocaleString()}
                </p>
                <div className="flex items-center space-x-1">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeStyles}`}>
                    {card?.changeType === 'positive' && <Icon name="TrendingUp" size={12} className="mr-1" />}
                    {card?.changeType === 'negative' && <Icon name="TrendingDown" size={12} className="mr-1" />}
                    {card?.change}
                  </span>
                  <span className="text-xs text-gray-500">vs last month</span>
                </div>
              </div>
              <div className={`${cardStyles?.icon} p-3 rounded-lg`}>
                <Icon name={card?.icon} size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;
