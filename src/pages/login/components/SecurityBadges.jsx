import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: '256-bit encryption'
    },
    {
      icon: 'Lock',
      label: 'SOC 2 Compliant',
      description: 'Type II certified'
    },
    {
      icon: 'CheckCircle',
      label: 'ISO 27001',
      description: 'Security certified'
    },
    {
      icon: 'Globe',
      label: 'GDPR Ready',
      description: 'Privacy compliant'
    }
  ];

  const trustMetrics = [
    { label: '99.9% Uptime', value: 'Guaranteed' },
    { label: 'Enterprise Grade', value: 'Security' },
    { label: '24/7 Support', value: 'Available' },
    { label: 'Data Centers', value: 'Global' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Security Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 bg-surface/50 rounded-lg border border-border/50"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div className="text-xs font-medium text-foreground mb-1">
              {feature?.label}
            </div>
            <div className="text-xs text-muted-foreground">
              {feature?.description}
            </div>
          </div>
        ))}
      </div>
      {/* Trust Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {trustMetrics?.map((metric, index) => (
          <div key={index} className="space-y-1">
            <div className="text-sm font-semibold text-primary">
              {metric?.value}
            </div>
            <div className="text-xs text-muted-foreground">
              {metric?.label}
            </div>
          </div>
        ))}
      </div>
      {/* Compliance Footer */}
      <div className="mt-8 pt-6 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground mb-2">
          Trusted by 8+ million users worldwide
        </p>
        <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
          <span>© {new Date()?.getFullYear()} Odoo Enterprise</span>
          <span>•</span>
          <span>Privacy Policy</span>
          <span>•</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityBadges;
