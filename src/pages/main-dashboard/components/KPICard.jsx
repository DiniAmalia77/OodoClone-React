import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, trend, subtitle }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 enterprise-shadow hover:enterprise-shadow-md enterprise-transition">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name={icon} size={20} className="text-primary" />
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold text-card-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col items-end space-y-2">
          {change && (
            <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
              <Icon name={getChangeIcon()} size={14} />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
          
          {trend && (
            <div className="w-16 h-8 bg-muted rounded flex items-center justify-center">
              <Icon name="BarChart3" size={16} className="text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KPICard;
