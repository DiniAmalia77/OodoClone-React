import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Company Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center enterprise-shadow">
            <Icon name="Zap" size={28} color="white" />
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-bold text-primary">Odoo</h1>
            <p className="text-sm text-muted-foreground -mt-1">Enterprise</p>
          </div>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Enterprise Resource Planning
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Streamline your business operations with our comprehensive ERP solution. 
          Access all your company data and processes in one unified platform.
        </p>
      </div>

      {/* System Status */}
      <div className="mt-6 inline-flex items-center space-x-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-full">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-success">All systems operational</span>
      </div>
    </div>
  );
};

export default LoginHeader;
