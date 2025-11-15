import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerListTable = ({ customers, selectedCustomer, onCustomerSelect, searchTerm, filters }) => {
  const [sortField, setSortField] = useState('company');
  const [sortDirection, setSortDirection] = useState('asc');

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      prospect: { color: 'bg-warning text-warning-foreground', label: 'Prospect' },
      lead: { color: 'bg-accent text-accent-foreground', label: 'Lead' }
    };

    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })?.format(new Date(date));
  };

  const filteredAndSortedCustomers = customers?.filter(customer => {
      const matchesSearch = customer?.company?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           customer?.contactPerson?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           customer?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      
      const matchesStatus = !filters?.status || customer?.status === filters?.status;
      const matchesType = !filters?.type || customer?.type === filters?.type;
      const matchesRep = !filters?.salesRep || customer?.salesRep === filters?.salesRep;
      
      return matchesSearch && matchesStatus && matchesType && matchesRep;
    })?.sort((a, b) => {
      let aValue = a?.[sortField];
      let bValue = b?.[sortField];
      
      if (sortField === 'totalSales') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (sortField === 'lastInteraction') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else {
        aValue = aValue?.toString()?.toLowerCase() || '';
        bValue = bValue?.toString()?.toLowerCase() || '';
      }
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  return (
    <div className="bg-card rounded-lg border border-border enterprise-shadow">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Customer Directory</h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
            <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
              Add Customer
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('company')}
                  className="flex items-center space-x-1 hover:text-foreground enterprise-transition"
                >
                  <span>Company</span>
                  <Icon 
                    name={sortField === 'company' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Contact Person</th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-foreground enterprise-transition"
                >
                  <span>Status</span>
                  <Icon 
                    name={sortField === 'status' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('lastInteraction')}
                  className="flex items-center space-x-1 hover:text-foreground enterprise-transition"
                >
                  <span>Last Contact</span>
                  <Icon 
                    name={sortField === 'lastInteraction' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('totalSales')}
                  className="flex items-center space-x-1 hover:text-foreground enterprise-transition"
                >
                  <span>Total Sales</span>
                  <Icon 
                    name={sortField === 'totalSales' ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown') : 'ChevronsUpDown'} 
                    size={14} 
                  />
                </button>
              </th>
              <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCustomers?.map((customer) => (
              <tr
                key={customer?.id}
                onClick={() => onCustomerSelect(customer)}
                className={`border-b border-border cursor-pointer enterprise-transition hover:bg-muted/50 ${
                  selectedCustomer?.id === customer?.id ? 'bg-accent/10' : ''
                }`}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={customer?.logo}
                      alt={customer?.logoAlt}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium text-card-foreground">{customer?.company}</div>
                      <div className="text-sm text-muted-foreground">{customer?.industry}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div>
                    <div className="font-medium text-card-foreground">{customer?.contactPerson}</div>
                    <div className="text-sm text-muted-foreground">{customer?.email}</div>
                  </div>
                </td>
                <td className="p-4">
                  {getStatusBadge(customer?.status)}
                </td>
                <td className="p-4">
                  <div className="text-sm text-card-foreground">
                    {formatDate(customer?.lastInteraction)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium text-card-foreground">
                    {formatCurrency(customer?.totalSales)}
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Mail"
                      iconSize={16}
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle email action
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="Phone"
                      iconSize={16}
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle phone action
                      }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreHorizontal"
                      iconSize={16}
                      onClick={(e) => {
                        e?.stopPropagation();
                        // Handle more actions
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredAndSortedCustomers?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No customers found</h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || Object.values(filters)?.some(f => f) 
              ? 'Try adjusting your search or filters' :'Get started by adding your first customer'
            }
          </p>
          <Button variant="default" iconName="Plus" iconPosition="left">
            Add Customer
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerListTable;
