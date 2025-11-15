import React from 'react';
import Icon from '../../../components/AppIcon';

const ProjectTimeline = ({ milestones, activities }) => {
  const getMilestoneIcon = (type) => {
    switch (type) {
      case 'start': return 'Play';
      case 'milestone': return 'Flag';
      case 'deadline': return 'Clock';
      case 'completion': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const getMilestoneColor = (type, status) => {
    if (status === 'completed') return 'text-success bg-success/10';
    if (status === 'overdue') return 'text-error bg-error/10';
    if (status === 'upcoming') return 'text-warning bg-warning/10';
    return 'text-primary bg-primary/10';
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Project Timeline</h2>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-primary hover:text-primary/80 enterprise-transition">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        {/* Milestones */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="Flag" size={16} className="mr-2" />
            Upcoming Milestones
          </h3>
          
          <div className="space-y-4">
            {milestones?.map((milestone, index) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getMilestoneColor(milestone?.type, milestone?.status)}`}>
                  <Icon name={getMilestoneIcon(milestone?.type)} size={16} />
                </div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-card-foreground">{milestone?.title}</h4>
                  <p className="text-xs text-muted-foreground">{milestone?.project}</p>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-card-foreground">{milestone?.date}</div>
                  <div className="text-xs text-muted-foreground">{milestone?.daysLeft} days left</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
            <Icon name="Activity" size={16} className="mr-2" />
            Recent Activities
          </h3>
          
          <div className="space-y-3">
            {activities?.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 hover:bg-muted/50 rounded-lg enterprise-transition">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={activity?.icon} size={14} className="text-primary" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-card-foreground">
                    <span className="font-medium">{activity?.user}</span> {activity?.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity?.timestamp}</p>
                </div>
                
                {activity?.project && (
                  <div className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {activity?.project}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTimeline;
