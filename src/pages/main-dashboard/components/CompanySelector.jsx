import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompanySelector = ({ companies, selectedCompany, onCompanyChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCompanySelect = (company) => {
    onCompanyChange(company);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Building2"
        iconPosition="left"
        iconSize={16}
        className="min-w-48 justify-between"
      >
        <span className="truncate">{selectedCompany?.name}</span>
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg enterprise-shadow-lg z-50 animate-fade-in">
            <div className="p-2">
              {companies?.map((company) => (
                <button
                  key={company?.id}
                  onClick={() => handleCompanySelect(company)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg enterprise-transition text-left ${
                    selectedCompany?.id === company?.id 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-muted text-popover-foreground'
                  }`}
                >
                  <Icon name="Building2" size={16} />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{company?.name}</div>
                    <div className={`text-xs truncate ${
                      selectedCompany?.id === company?.id 
                        ? 'text-primary-foreground/80' 
                        : 'text-muted-foreground'
                    }`}>
                      {company?.type} • {company?.location}
                    </div>
                  </div>
                  {selectedCompany?.id === company?.id && (
                    <Icon name="Check" size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanySelector;
