import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ActivityLog = ({ activities }) => {
  const [filter, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('today');

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'login', label: 'Login Events' },
    { value: 'permission', label: 'Permission Changes' },
    { value: 'user_created', label: 'User Creation' },
    { value: 'user_updated', label: 'User Updates' },
    { value: 'security', label: 'Security Events' }
  ];

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  const filteredActivities = activities?.filter(activity => {
    const matchesFilter = filter === 'all' || activity?.type === filter;
    // In a real app, you'd filter by timeRange as well
    return matchesFilter;
  });

  const getActivityIcon = (type) => {
    const icons = {
      login: 'LogIn',
      logout: 'LogOut',
      permission: 'Shield',
      user_created: 'UserPlus',
      user_updated: 'UserCheck',
      security: 'AlertTriangle',
      password_change: 'Key',
      role_change: 'Users'
    };
    return icons?.[type] || 'Activity';
  };

  const getActivityColor = (type) => {
    const colors = {
      login: 'text-green-600 bg-green-100',
      logout: 'text-gray-600 bg-gray-100',
      permission: 'text-blue-600 bg-blue-100',
      user_created: 'text-purple-600 bg-purple-100',
      user_updated: 'text-blue-600 bg-blue-100',
      security: 'text-red-600 bg-red-100',
      password_change: 'text-yellow-600 bg-yellow-100',
      role_change: 'text-indigo-600 bg-indigo-100'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-100';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Activity Log</h3>
            <p className="text-sm text-gray-500 mt-1">
              Track user activities and system changes
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Select
              options={filterOptions}
              value={filter}
              onChange={setFilter}
              className="w-full sm:w-40"
            />
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
              className="w-full sm:w-32"
            />
          </div>
        </div>
      </div>
      {/* Activity List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredActivities?.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {filteredActivities?.map((activity) => (
              <div key={activity?.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start space-x-4">
                  {/* Activity Icon */}
                  <div className={`flex-shrink-0 p-2 rounded-lg ${getActivityColor(activity?.type)}`}>
                    <Icon name={getActivityIcon(activity?.type)} size={16} />
                  </div>
                  
                  {/* Activity Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {activity?.user && (
                          <Image
                            src={activity?.user?.avatar}
                            alt={activity?.user?.avatarAlt}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                        )}
                        <span className="text-sm font-medium text-gray-900">
                          {activity?.user ? activity?.user?.name : 'System'}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatTimeAgo(activity?.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mt-1">
                      {activity?.description}
                    </p>
                    
                    {activity?.details && (
                      <div className="mt-2 text-xs text-gray-500 bg-gray-50 rounded p-2">
                        {activity?.details}
                      </div>
                    )}
                    
                    {activity?.ipAddress && (
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center space-x-1">
                          <Icon name="Globe" size={12} />
                          <span>IP: {activity?.ipAddress}</span>
                        </span>
                        {activity?.location && (
                          <span className="flex items-center space-x-1">
                            <Icon name="MapPin" size={12} />
                            <span>{activity?.location}</span>
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Icon name="Activity" size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-500">No activities match your current filter criteria.</p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Showing {filteredActivities?.length} of {activities?.length} activities
          </span>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            iconSize={16}
          >
            Export Log
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityLog;
