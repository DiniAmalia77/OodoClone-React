import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = ({ activities, showAll = false }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'sale': 'ShoppingCart',
      'invoice': 'FileText',
      'payment': 'CreditCard',
      'user': 'User',
      'project': 'FolderOpen',
      'inventory': 'Package',
      'system': 'Settings'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      'sale': 'text-success',
      'invoice': 'text-primary',
      'payment': 'text-accent',
      'user': 'text-secondary',
      'project': 'text-warning',
      'inventory': 'text-muted-foreground',
      'system': 'text-error'
    };
    return colors?.[type] || 'text-muted-foreground';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const displayActivities = showAll ? activities : activities?.slice(0, 5);

  return (
    <div className="bg-card rounded-lg border border-border p-6 enterprise-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 enterprise-transition">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {displayActivities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                {activity?.user?.avatar && (
                  <Image 
                    src={activity?.user?.avatar} 
                    alt={activity?.user?.avatarAlt}
                    className="w-5 h-5 rounded-full"
                  />
                )}
                <p className="text-sm font-medium text-card-foreground truncate">
                  {activity?.user?.name || 'System'}
                </p>
                <span className="text-xs text-muted-foreground">
                  {formatTime(activity?.timestamp)}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {activity?.description}
              </p>
              
              {activity?.metadata && (
                <div className="mt-2 flex items-center space-x-4 text-xs text-muted-foreground">
                  {activity?.metadata?.amount && (
                    <span className="font-medium">{activity?.metadata?.amount}</span>
                  )}
                  {activity?.metadata?.status && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity?.metadata?.status === 'completed' ? 'bg-success/10 text-success' :
                      activity?.metadata?.status === 'pending'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                    }`}>
                      {activity?.metadata?.status}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {!showAll && activities?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <button className="w-full text-sm text-primary hover:text-primary/80 enterprise-transition">
            Show {activities?.length - 5} more activities
          </button>
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;
