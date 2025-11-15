import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompanySelector = ({ onCompanySelect, selectedCompany }) => {
  const [isOpen, setIsOpen] = useState(false);

  const companies = [
  {
    id: 'odoo-main',
    name: 'Odoo Enterprise Inc.',
    logo: "https://images.unsplash.com/photo-1589559318737-361765299bd3",
    logoAlt: 'Modern office building with glass facade representing Odoo Enterprise headquarters',
    type: 'Main Company',
    employees: '2,500+',
    location: 'San Francisco, CA'
  },
  {
    id: 'subsidiary-corp',
    name: 'Subsidiary Corp.',
    logo: "https://images.unsplash.com/photo-1558301266-6e1f5ae8e5f3",
    logoAlt: 'Contemporary corporate building with steel and glass architecture for Subsidiary Corp',
    type: 'Subsidiary',
    employees: '850+',
    location: 'New York, NY'
  },
  {
    id: 'international-branch',
    name: 'International Branch',
    logo: "https://images.unsplash.com/photo-1660698367933-f4b1cee29e2e",
    logoAlt: 'International business district with modern skyscrapers representing global operations',
    type: 'Branch Office',
    employees: '1,200+',
    location: 'London, UK'
  },
  {
    id: 'regional-office',
    name: 'Regional Office',
    logo: "https://images.unsplash.com/photo-1495731975136-d43378465316",
    logoAlt: 'Regional office complex with modern design and landscaped surroundings',
    type: 'Regional',
    employees: '450+',
    location: 'Austin, TX'
  }];


  const handleCompanySelect = (company) => {
    onCompanySelect(company);
    setIsOpen(false);
  };

  const currentCompany = companies?.find((c) => c?.id === selectedCompany) || companies?.[0];

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <label className="block text-sm font-medium text-foreground mb-2">
        Select Company
      </label>
      <div className="relative">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full justify-between h-auto p-4">

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
              <img
                src={currentCompany?.logo}
                alt={currentCompany?.logoAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }} />

            </div>
            <div className="text-left">
              <div className="font-medium text-foreground">{currentCompany?.name}</div>
              <div className="text-xs text-muted-foreground">{currentCompany?.type}</div>
            </div>
          </div>
          <Icon
            name="ChevronDown"
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />

        </Button>

        {isOpen &&
        <>
            <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)} />

            <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg enterprise-shadow-lg z-50 max-h-80 overflow-y-auto">
              <div className="p-2">
                {companies?.map((company) =>
              <button
                key={company?.id}
                onClick={() => handleCompanySelect(company)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg enterprise-transition hover:bg-muted ${
                company?.id === selectedCompany ? 'bg-primary/10 border border-primary/20' : ''}`
                }>

                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                    src={company?.logo}
                    alt={company?.logoAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '/assets/images/no_image.png';
                    }} />

                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-foreground">{company?.name}</div>
                      <div className="text-xs text-muted-foreground">{company?.type} • {company?.employees} employees</div>
                      <div className="text-xs text-muted-foreground">{company?.location}</div>
                    </div>
                    {company?.id === selectedCompany &&
                <Icon name="Check" size={16} className="text-primary" />
                }
                  </button>
              )}
              </div>
            </div>
          </>
        }
      </div>
    </div>);

};

export default CompanySelector;
