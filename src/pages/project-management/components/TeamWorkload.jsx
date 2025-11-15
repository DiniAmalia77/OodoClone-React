import React from 'react';

import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TeamWorkload = ({ teamMembers, onViewMember }) => {
  const getWorkloadColor = (percentage) => {
    if (percentage >= 90) return 'text-error bg-error/10';
    if (percentage >= 75) return 'text-warning bg-warning/10';
    if (percentage >= 50) return 'text-secondary bg-secondary/10';
    return 'text-success bg-success/10';
  };

  const getWorkloadStatus = (percentage) => {
    if (percentage >= 90) return 'Overloaded';
    if (percentage >= 75) return 'High Load';
    if (percentage >= 50) return 'Moderate';
    return 'Available';
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Team Workload</h2>
        <Button
          variant="outline"
          size="sm"
          iconName="Calendar"
          iconPosition="left"
          iconSize={14}
        >
          View Calendar
        </Button>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {teamMembers?.map((member) => (
            <div key={member?.id} className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:bg-muted/50 enterprise-transition">
              <div className="flex items-center space-x-3 flex-1">
                <Image
                  src={member?.avatar}
                  alt={member?.avatarAlt}
                  className="w-10 h-10 rounded-full object-cover"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-sm text-card-foreground">{member?.name}</h4>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getWorkloadColor(member?.workloadPercentage)}`}>
                      {getWorkloadStatus(member?.workloadPercentage)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>{member?.role}</span>
                    <span>•</span>
                    <span>{member?.activeTasks} active tasks</span>
                    <span>•</span>
                    <span>{member?.hoursThisWeek}h this week</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-card-foreground">{member?.workloadPercentage}%</div>
                  <div className="text-xs text-muted-foreground">Capacity</div>
                </div>
                
                <div className="w-24">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full enterprise-transition ${
                        member?.workloadPercentage >= 90 ? 'bg-error' :
                        member?.workloadPercentage >= 75 ? 'bg-warning' :
                        member?.workloadPercentage >= 50 ? 'bg-secondary': 'bg-success'
                      }`}
                      style={{ width: `${Math.min(member?.workloadPercentage, 100)}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onViewMember(member)}
                  iconName="Eye"
                  iconSize={16}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Team Summary */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-success mb-1">
                {teamMembers?.filter(m => m?.workloadPercentage < 75)?.length}
              </div>
              <div className="text-sm text-muted-foreground">Available Members</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-warning mb-1">
                {teamMembers?.filter(m => m?.workloadPercentage >= 75 && m?.workloadPercentage < 90)?.length}
              </div>
              <div className="text-sm text-muted-foreground">High Workload</div>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <div className="text-2xl font-bold text-error mb-1">
                {teamMembers?.filter(m => m?.workloadPercentage >= 90)?.length}
              </div>
              <div className="text-sm text-muted-foreground">Overloaded</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamWorkload;
