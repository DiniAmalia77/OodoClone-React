import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Active Projects',
      value: stats?.activeProjects,
      icon: 'FolderOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12%',
      changeType: 'positive'
    },
    {
      label: 'Tasks Completed',
      value: stats?.completedTasks,
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8%',
      changeType: 'positive'
    },
    {
      label: 'Team Members',
      value: stats?.teamMembers,
      icon: 'Users',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+3',
      changeType: 'positive'
    },
    {
      label: 'Overdue Tasks',
      value: stats?.overdueTasks,
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '-5%',
      changeType: 'negative'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-6 enterprise-shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            <div className={`flex items-center text-xs font-medium ${
              item?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={item?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={12} 
                className="mr-1" 
              />
              {item?.change}
            </div>
          </div>
          
          <div>
            <div className="text-2xl font-bold text-card-foreground mb-1">{item?.value}</div>
            <div className="text-sm text-muted-foreground">{item?.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;
