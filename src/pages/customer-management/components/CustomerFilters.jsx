import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const CustomerFilters = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'prospect', label: 'Prospect' },
    { value: 'lead', label: 'Lead' }
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'enterprise', label: 'Enterprise' },
    { value: 'small-business', label: 'Small Business' },
    { value: 'startup', label: 'Startup' },
    { value: 'individual', label: 'Individual' }
  ];

  const salesRepOptions = [
    { value: '', label: 'All Representatives' },
    { value: 'John Smith', label: 'John Smith' },
    { value: 'Sarah Johnson', label: 'Sarah Johnson' },
    { value: 'Michael Brown', label: 'Michael Brown' },
    { value: 'Emily Davis', label: 'Emily Davis' },
    { value: 'David Wilson', label: 'David Wilson' }
  ];

  const locationOptions = [
    { value: '', label: 'All Locations' },
    { value: 'north-america', label: 'North America' },
    { value: 'europe', label: 'Europe' },
    { value: 'asia-pacific', label: 'Asia Pacific' },
    { value: 'latin-america', label: 'Latin America' },
    { value: 'middle-east-africa', label: 'Middle East & Africa' }
  ];

  const hasActiveFilters = Object.values(filters)?.some(filter => filter !== '');

  return (
    <div className="bg-card rounded-lg border border-border enterprise-shadow p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-card-foreground flex items-center">
          <Icon name="Filter" size={20} className="mr-2" />
          Search & Filters
        </h3>
        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Search customers by company, contact person, or email..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={20} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
        </div>

        {/* Filter Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Status"
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            placeholder="Select status"
          />

          <Select
            label="Customer Type"
            options={typeOptions}
            value={filters?.type}
            onChange={(value) => onFilterChange('type', value)}
            placeholder="Select type"
          />

          <Select
            label="Sales Representative"
            options={salesRepOptions}
            value={filters?.salesRep}
            onChange={(value) => onFilterChange('salesRep', value)}
            placeholder="Select representative"
            searchable
          />

          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => onFilterChange('location', value)}
            placeholder="Select location"
          />
        </div>

        {/* Advanced Filters Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Quick Filters:</span>
            <button
              onClick={() => onFilterChange('status', 'active')}
              className="text-success hover:underline enterprise-transition"
            >
              Active Customers
            </button>
            <button
              onClick={() => onFilterChange('status', 'prospect')}
              className="text-warning hover:underline enterprise-transition"
            >
              Prospects
            </button>
            <button
              onClick={() => onFilterChange('type', 'enterprise')}
              className="text-accent hover:underline enterprise-transition"
            >
              Enterprise
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export Results
            </Button>
            <Button variant="outline" size="sm" iconName="Save" iconPosition="left">
              Save Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerFilters;
