import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TaskBoard = ({ tasks, onTaskUpdate, onCreateTask }) => {
  const [activeView, setActiveView] = useState('kanban'); // kanban, list, gantt

  const taskColumns = [
    { id: 'todo', title: 'To Do', color: 'bg-muted' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-secondary/20' },
    { id: 'review', title: 'In Review', color: 'bg-warning/20' },
    { id: 'completed', title: 'Completed', color: 'bg-success/20' }
  ];

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High': return { icon: 'AlertTriangle', color: 'text-error' };
      case 'Medium': return { icon: 'Minus', color: 'text-warning' };
      case 'Low': return { icon: 'ArrowDown', color: 'text-success' };
      default: return { icon: 'Minus', color: 'text-muted-foreground' };
    }
  };

  const getTasksByStatus = (status) => {
    return tasks?.filter(task => task?.status === status);
  };

  const TaskCard = ({ task }) => {
    const priorityConfig = getPriorityIcon(task?.priority);
    
    return (
      <div className="bg-card border border-border rounded-lg p-4 mb-3 enterprise-shadow-sm hover:enterprise-shadow enterprise-transition cursor-pointer">
        <div className="flex items-start justify-between mb-3">
          <h4 className="text-sm font-medium text-card-foreground line-clamp-2">{task?.title}</h4>
          <Icon name={priorityConfig?.icon} size={14} className={priorityConfig?.color} />
        </div>
        {task?.description && (
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{task?.description}</p>
        )}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{task?.dueDate}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{task?.estimatedHours}h</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {task?.assignee && (
              <Image
                src={task?.assignee?.avatar}
                alt={task?.assignee?.avatarAlt}
                className="w-6 h-6 rounded-full object-cover"
              />
            )}
            <span className="text-xs font-medium text-card-foreground">
              {task?.assignee?.name || 'Unassigned'}
            </span>
          </div>
          
          {task?.attachments > 0 && (
            <div className="flex items-center space-x-1">
              <Icon name="Paperclip" size={12} className="text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{task?.attachments}</span>
            </div>
          )}
        </div>
        {task?.progress > 0 && (
          <div className="mt-3">
            <div className="w-full bg-muted rounded-full h-1">
              <div 
                className="bg-primary h-1 rounded-full enterprise-transition" 
                style={{ width: `${task?.progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-foreground">Task Management</h2>
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={activeView === 'kanban' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('kanban')}
              iconName="Columns"
              iconPosition="left"
              iconSize={14}
            >
              Kanban
            </Button>
            <Button
              variant={activeView === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('list')}
              iconName="List"
              iconPosition="left"
              iconSize={14}
            >
              List
            </Button>
            <Button
              variant={activeView === 'gantt' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveView('gantt')}
              iconName="BarChart3"
              iconPosition="left"
              iconSize={14}
            >
              Gantt
            </Button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
            iconSize={14}
          >
            Filter
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onCreateTask}
            iconName="Plus"
            iconPosition="left"
            iconSize={14}
          >
            New Task
          </Button>
        </div>
      </div>
      {/* Kanban View */}
      {activeView === 'kanban' && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {taskColumns?.map(column => (
              <div key={column?.id} className="flex flex-col">
                <div className={`flex items-center justify-between p-3 rounded-lg mb-4 ${column?.color}`}>
                  <h3 className="font-medium text-sm text-foreground">{column?.title}</h3>
                  <span className="text-xs bg-card px-2 py-1 rounded-full text-muted-foreground">
                    {getTasksByStatus(column?.id)?.length}
                  </span>
                </div>
                
                <div className="flex-1 min-h-[400px]">
                  {getTasksByStatus(column?.id)?.map(task => (
                    <TaskCard key={task?.id} task={task} />
                  ))}
                  
                  <Button
                    variant="ghost"
                    className="w-full border-2 border-dashed border-border hover:border-primary/50 h-12"
                    iconName="Plus"
                    iconSize={16}
                  >
                    Add Task
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* List View */}
      {activeView === 'list' && (
        <div className="p-6">
          <div className="space-y-2">
            {tasks?.map(task => (
              <div key={task?.id} className="flex items-center space-x-4 p-4 bg-card border border-border rounded-lg hover:bg-muted/50 enterprise-transition">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                  <div className="md:col-span-2">
                    <h4 className="font-medium text-sm text-card-foreground">{task?.title}</h4>
                    <p className="text-xs text-muted-foreground">{task?.project}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {task?.assignee && (
                      <Image
                        src={task?.assignee?.avatar}
                        alt={task?.assignee?.avatarAlt}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span className="text-sm text-card-foreground">{task?.assignee?.name || 'Unassigned'}</span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">{task?.dueDate}</div>
                  
                  <div className="flex items-center space-x-2">
                    <Icon name={getPriorityIcon(task?.priority)?.icon} size={14} className={getPriorityIcon(task?.priority)?.color} />
                    <span className="text-sm">{task?.priority}</span>
                  </div>
                  
                  <div className="flex items-center justify-end space-x-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      task?.status === 'completed' ? 'bg-success/10 text-success' :
                      task?.status === 'in-progress' ? 'bg-secondary/10 text-secondary' :
                      task?.status === 'review'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                    }`}>
                      {task?.status?.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Gantt View Placeholder */}
      {activeView === 'gantt' && (
        <div className="p-6">
          <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-12 text-center">
            <Icon name="BarChart3" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium text-foreground mb-2">Gantt Chart View</h3>
            <p className="text-muted-foreground mb-4">Interactive timeline view for project scheduling and dependencies</p>
            <Button variant="outline" iconName="Calendar" iconPosition="left">
              Configure Timeline
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskBoard;
