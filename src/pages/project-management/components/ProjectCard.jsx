import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProjectCard = ({ project, onViewDetails, onEditProject }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'On Track': return 'text-success bg-success/10';
      case 'At Risk': return 'text-warning bg-warning/10';
      case 'Delayed': return 'text-error bg-error/10';
      case 'Completed': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-error';
      case 'Medium': return 'text-warning';
      case 'Low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 enterprise-shadow hover:enterprise-shadow-md enterprise-transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-card-foreground mb-2">{project?.name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{project?.description}</p>
          
          <div className="flex items-center space-x-4 mb-4">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project?.status)}`}>
              {project?.status}
            </span>
            <span className={`inline-flex items-center text-xs font-medium ${getPriorityColor(project?.priority)}`}>
              <Icon name="Flag" size={12} className="mr-1" />
              {project?.priority}
            </span>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEditProject(project)}
          iconName="MoreVertical"
          iconSize={16}
        />
      </div>
      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">{project?.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full enterprise-transition" 
            style={{ width: `${project?.progress}%` }}
          />
        </div>
      </div>
      {/* Project Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Icon name="Calendar" size={14} className="mr-2" />
            Due Date
          </div>
          <div className="text-sm font-medium text-card-foreground">{project?.dueDate}</div>
        </div>
        <div>
          <div className="flex items-center text-sm text-muted-foreground mb-1">
            <Icon name="DollarSign" size={14} className="mr-2" />
            Budget
          </div>
          <div className="text-sm font-medium text-card-foreground">{project?.budget}</div>
        </div>
      </div>
      {/* Team Members */}
      <div className="mb-4">
        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Icon name="Users" size={14} className="mr-2" />
          Team ({project?.teamMembers?.length})
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {project?.teamMembers?.slice(0, 4)?.map((member, index) => (
              <div key={index} className="relative">
                <Image
                  src={member?.avatar}
                  alt={member?.avatarAlt}
                  className="w-8 h-8 rounded-full border-2 border-card object-cover"
                />
              </div>
            ))}
            {project?.teamMembers?.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center">
                <span className="text-xs font-medium text-muted-foreground">
                  +{project?.teamMembers?.length - 4}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          size="sm"
          onClick={() => onViewDetails(project)}
          iconName="Eye"
          iconPosition="left"
          iconSize={14}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="outline"
          size="sm"
          iconName="MessageSquare"
          iconSize={14}
        />
        <Button
          variant="outline"
          size="sm"
          iconName="Share2"
          iconSize={14}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
