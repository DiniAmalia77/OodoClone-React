import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = ({ actions }) => {
  const navigate = useNavigate();

  const handleAction = (action) => {
    if (action?.path) {
      navigate(action?.path);
    } else if (action?.onClick) {
      action?.onClick();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 enterprise-shadow">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {actions?.map((action) => (
          <Button
            key={action?.id}
            variant={action?.variant || "outline"}
            onClick={() => handleAction(action)}
            iconName={action?.icon}
            iconPosition="left"
            iconSize={16}
            className="justify-start h-12"
          >
            <div className="text-left">
              <div className="font-medium">{action?.title}</div>
              {action?.description && (
                <div className="text-xs text-muted-foreground">{action?.description}</div>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
