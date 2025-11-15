import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications }) => {
  const [filter, setFilter] = useState('all');

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-error',
      'medium': 'text-warning',
      'low': 'text-muted-foreground'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      'high': 'AlertTriangle',
      'medium': 'AlertCircle',
      'low': 'Info'
    };
    return icons?.[priority] || 'Bell';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'approval': 'CheckCircle',
      'alert': 'AlertTriangle',
      'info': 'Info',
      'reminder': 'Clock',
      'system': 'Settings'
    };
    return icons?.[type] || 'Bell';
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications?.filter(n => n?.priority === filter);

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

  return (
    <div className="bg-card rounded-lg border border-border p-6 enterprise-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Notifications</h3>
        <div className="flex items-center space-x-2">
          <select 
            value={filter}
            onChange={(e) => setFilter(e?.target?.value)}
            className="text-sm border border-border rounded px-2 py-1 bg-background"
          >
            <option value="all">All</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          <Button variant="ghost" size="icon" iconName="Settings" iconSize={16}>
            <span className="sr-only">Notification settings</span>
          </Button>
        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications?.map((notification) => (
          <div 
            key={notification?.id} 
            className={`p-4 rounded-lg border enterprise-transition hover:bg-muted/50 cursor-pointer ${
              notification?.read ? 'bg-background' : 'bg-primary/5 border-primary/20'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex-shrink-0 ${getPriorityColor(notification?.priority)}`}>
                <Icon name={getTypeIcon(notification?.type)} size={16} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-medium ${notification?.read ? 'text-muted-foreground' : 'text-card-foreground'}`}>
                    {notification?.title}
                  </h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(notification?.timestamp)}
                    </span>
                    {!notification?.read && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  {notification?.message}
                </p>
                
                {notification?.actions && notification?.actions?.length > 0 && (
                  <div className="flex items-center space-x-2">
                    {notification?.actions?.map((action, index) => (
                      <Button
                        key={index}
                        variant={action?.variant || "outline"}
                        size="xs"
                        onClick={() => action?.onClick && action?.onClick()}
                      >
                        {action?.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredNotifications?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground">No notifications found</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
