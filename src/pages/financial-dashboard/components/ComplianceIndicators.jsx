import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComplianceIndicators = ({ complianceItems }) => {
  const getStatusColor = (status) => {
    const colors = {
      'compliant': 'text-success bg-success/10 border-success/20',
      'warning': 'text-warning bg-warning/10 border-warning/20',
      'overdue': 'text-error bg-error/10 border-error/20',
      'pending': 'text-muted-foreground bg-muted/10 border-border'
    };
    return colors?.[status] || colors?.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      'compliant': 'CheckCircle',
      'warning': 'AlertTriangle',
      'overdue': 'XCircle',
      'pending': 'Clock'
    };
    return icons?.[status] || 'Circle';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 enterprise-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Compliance & Reporting</h3>
        <Button variant="outline" size="sm" iconName="FileText" iconPosition="left">
          Generate Report
        </Button>
      </div>
      <div className="space-y-4">
        {complianceItems?.map((item) => {
          const daysUntilDue = getDaysUntilDue(item?.dueDate);
          
          return (
            <div key={item?.id} className={`border rounded-lg p-4 ${getStatusColor(item?.status)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <Icon name={getStatusIcon(item?.status)} size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground mb-1">
                      {item?.title}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {item?.description}
                    </div>
                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>Due: {formatDate(item?.dueDate)}</span>
                      </div>
                      {daysUntilDue >= 0 && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>
                            {daysUntilDue === 0 ? 'Due today' : 
                             daysUntilDue === 1 ? '1 day left' : 
                             `${daysUntilDue} days left`}
                          </span>
                        </div>
                      )}
                      {daysUntilDue < 0 && (
                        <div className="flex items-center space-x-1 text-error">
                          <Icon name="AlertCircle" size={12} />
                          <span>{Math.abs(daysUntilDue)} days overdue</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {item?.progress !== undefined && (
                    <div className="w-16 text-xs text-right">
                      {item?.progress}%
                    </div>
                  )}
                  <Button variant="ghost" size="sm" iconName="ArrowRight" iconSize={14}>
                    <span className="sr-only">View {item?.title}</span>
                  </Button>
                </div>
              </div>
              {item?.progress !== undefined && (
                <div className="mt-3">
                  <div className="w-full bg-muted/50 rounded-full h-1.5">
                    <div 
                      className="bg-current h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${item?.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-success">12</div>
            <div className="text-xs text-muted-foreground">Compliant</div>
          </div>
          <div>
            <div className="text-lg font-bold text-warning">3</div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
          <div>
            <div className="text-lg font-bold text-error">1</div>
            <div className="text-xs text-muted-foreground">Overdue</div>
          </div>
          <div>
            <div className="text-lg font-bold text-muted-foreground">5</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceIndicators;
