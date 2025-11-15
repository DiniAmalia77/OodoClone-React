import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PeriodSelector = ({ selectedPeriod, onPeriodChange, customRange, onCustomRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomRange, setShowCustomRange] = useState(false);

  const periods = [
    { id: 'today', label: 'Today', value: 'today' },
    { id: 'yesterday', label: 'Yesterday', value: 'yesterday' },
    { id: 'this_week', label: 'This Week', value: 'this_week' },
    { id: 'last_week', label: 'Last Week', value: 'last_week' },
    { id: 'this_month', label: 'This Month', value: 'this_month' },
    { id: 'last_month', label: 'Last Month', value: 'last_month' },
    { id: 'this_quarter', label: 'This Quarter', value: 'this_quarter' },
    { id: 'last_quarter', label: 'Last Quarter', value: 'last_quarter' },
    { id: 'this_year', label: 'This Year', value: 'this_year' },
    { id: 'last_year', label: 'Last Year', value: 'last_year' },
    { id: 'custom', label: 'Custom Range', value: 'custom' }
  ];

  const handlePeriodSelect = (period) => {
    if (period?.value === 'custom') {
      setShowCustomRange(true);
    } else {
      onPeriodChange(period?.value);
      setIsOpen(false);
      setShowCustomRange(false);
    }
  };

  const handleCustomRangeApply = () => {
    onPeriodChange('custom');
    setIsOpen(false);
    setShowCustomRange(false);
  };

  const getCurrentPeriodLabel = () => {
    if (selectedPeriod === 'custom' && customRange?.start && customRange?.end) {
      return `${customRange?.start} - ${customRange?.end}`;
    }
    const period = periods?.find(p => p?.value === selectedPeriod);
    return period ? period?.label : 'This Month';
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Calendar"
        iconPosition="left"
        iconSize={16}
        className="min-w-40 justify-between"
      >
        <span className="truncate">{getCurrentPeriodLabel()}</span>
        <Icon 
          name="ChevronDown" 
          size={16} 
          className={`ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </Button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg enterprise-shadow-lg z-50 animate-fade-in">
            {!showCustomRange ? (
              <div className="p-2">
                {periods?.map((period) => (
                  <button
                    key={period?.id}
                    onClick={() => handlePeriodSelect(period)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg enterprise-transition text-left ${
                      selectedPeriod === period?.value 
                        ? 'bg-primary text-primary-foreground' 
                        : 'hover:bg-muted text-popover-foreground'
                    }`}
                  >
                    <span>{period?.label}</span>
                    {selectedPeriod === period?.value && (
                      <Icon name="Check" size={16} />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4">
                <h4 className="font-medium text-popover-foreground mb-3">Custom Date Range</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-popover-foreground mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={customRange?.start || ''}
                      onChange={(e) => onCustomRangeChange({ ...customRange, start: e?.target?.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-popover-foreground mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={customRange?.end || ''}
                      onChange={(e) => onCustomRangeChange({ ...customRange, end: e?.target?.value })}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowCustomRange(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={handleCustomRangeApply}
                      disabled={!customRange?.start || !customRange?.end}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PeriodSelector;
