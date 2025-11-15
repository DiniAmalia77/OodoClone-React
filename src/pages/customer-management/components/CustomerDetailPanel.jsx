import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerDetailPanel = ({ customer, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!customer) {
    return (
      <div className="bg-card rounded-lg border border-border enterprise-shadow p-8 text-center">
        <Icon name="Users" size={64} className="mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium text-card-foreground mb-2">Select a Customer</h3>
        <p className="text-muted-foreground">
          Choose a customer from the list to view their detailed information and interaction history.
        </p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'interactions', label: 'Interactions', icon: 'MessageSquare' },
    { id: 'opportunities', label: 'Opportunities', icon: 'Target' },
    { id: 'orders', label: 'Orders', icon: 'ShoppingCart' }
  ];

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
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })?.format(new Date(date));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      inactive: { color: 'bg-muted text-muted-foreground', label: 'Inactive' },
      prospect: { color: 'bg-warning text-warning-foreground', label: 'Prospect' },
      lead: { color: 'bg-accent text-accent-foreground', label: 'Lead' },
      open: { color: 'bg-accent text-accent-foreground', label: 'Open' },
      won: { color: 'bg-success text-success-foreground', label: 'Won' },
      lost: { color: 'bg-destructive text-destructive-foreground', label: 'Lost' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pending' },
      completed: { color: 'bg-success text-success-foreground', label: 'Completed' },
      cancelled: { color: 'bg-destructive text-destructive-foreground', label: 'Cancelled' }
    };

    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Contact Information */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Contact" size={16} className="mr-2" />
          Contact Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <p className="text-card-foreground">{customer?.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Phone</label>
            <p className="text-card-foreground">{customer?.phone}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Address</label>
            <p className="text-card-foreground">{customer?.address}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Website</label>
            <p className="text-card-foreground">{customer?.website}</p>
          </div>
        </div>
      </div>

      {/* Business Information */}
      <div className="bg-muted/30 rounded-lg p-4">
        <h4 className="font-medium text-card-foreground mb-3 flex items-center">
          <Icon name="Building2" size={16} className="mr-2" />
          Business Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Industry</label>
            <p className="text-card-foreground">{customer?.industry}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Company Size</label>
            <p className="text-card-foreground">{customer?.companySize}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Sales Representative</label>
            <p className="text-card-foreground">{customer?.salesRep}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-muted-foreground">Customer Since</label>
            <p className="text-card-foreground">{formatDate(customer?.customerSince)}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <Icon name="DollarSign" size={24} className="mx-auto text-success mb-2" />
          <div className="text-2xl font-bold text-card-foreground">{formatCurrency(customer?.totalSales)}</div>
          <div className="text-sm text-muted-foreground">Total Sales</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <Icon name="ShoppingCart" size={24} className="mx-auto text-accent mb-2" />
          <div className="text-2xl font-bold text-card-foreground">{customer?.totalOrders}</div>
          <div className="text-sm text-muted-foreground">Total Orders</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <Icon name="Target" size={24} className="mx-auto text-warning mb-2" />
          <div className="text-2xl font-bold text-card-foreground">{customer?.openOpportunities}</div>
          <div className="text-sm text-muted-foreground">Open Opportunities</div>
        </div>
      </div>
    </div>
  );

  const renderInteractionsTab = () => (
    <div className="space-y-4">
      {customer?.interactions?.map((interaction) => (
        <div key={interaction?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon name={interaction?.type === 'email' ? 'Mail' : interaction?.type === 'call' ? 'Phone' : 'MessageSquare'} size={16} className="text-muted-foreground" />
              <span className="font-medium text-card-foreground">{interaction?.subject}</span>
            </div>
            <span className="text-sm text-muted-foreground">{formatDate(interaction?.date)}</span>
          </div>
          <p className="text-muted-foreground text-sm mb-2">{interaction?.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">By: {interaction?.createdBy}</span>
            {getStatusBadge(interaction?.status)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderOpportunitiesTab = () => (
    <div className="space-y-4">
      {customer?.opportunities?.map((opportunity) => (
        <div key={opportunity?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-card-foreground">{opportunity?.name}</h4>
            {getStatusBadge(opportunity?.status)}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <span className="text-sm text-muted-foreground">Value: </span>
              <span className="font-medium text-card-foreground">{formatCurrency(opportunity?.value)}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Close Date: </span>
              <span className="font-medium text-card-foreground">{formatDate(opportunity?.closeDate)}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{opportunity?.description}</p>
        </div>
      ))}
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-4">
      {customer?.orders?.map((order) => (
        <div key={order?.id} className="border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-medium text-card-foreground">Order #{order?.orderNumber}</h4>
            {getStatusBadge(order?.status)}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <span className="text-sm text-muted-foreground">Amount: </span>
              <span className="font-medium text-card-foreground">{formatCurrency(order?.amount)}</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Date: </span>
              <span className="font-medium text-card-foreground">{formatDate(order?.date)}</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            Items: {order?.items?.join(', ')}
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'interactions':
        return renderInteractionsTab();
      case 'opportunities':
        return renderOpportunitiesTab();
      case 'orders':
        return renderOrdersTab();
      default:
        return renderOverviewTab();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border enterprise-shadow">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src={customer?.logo}
              alt={customer?.logoAlt}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold text-card-foreground">{customer?.company}</h2>
              <p className="text-muted-foreground">{customer?.contactPerson}</p>
              <div className="flex items-center space-x-2 mt-1">
                {getStatusBadge(customer?.status)}
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">{customer?.industry}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Mail" iconPosition="left">
              Email
            </Button>
            <Button variant="outline" size="sm" iconName="Phone" iconPosition="left">
              Call
            </Button>
            <Button variant="outline" size="sm" iconName="Calendar" iconPosition="left">
              Schedule
            </Button>
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              iconSize={20}
              onClick={onClose}
              className="lg:hidden"
            />
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm enterprise-transition ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default CustomerDetailPanel;
