import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import KPICard from './components/KPICard';
import ChartWidget from './components/ChartWidget';
import ActivityFeed from './components/ActivityFeed';
import QuickActions from './components/QuickActions';
import NotificationPanel from './components/NotificationPanel';
import CompanySelector from './components/CompanySelector';
import PeriodSelector from './components/PeriodSelector';

const MainDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('this_month');
  const [customRange, setCustomRange] = useState({ start: '', end: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for companies
  const companies = [
  {
    id: 1,
    name: "Odoo Enterprise Inc.",
    type: "Headquarters",
    location: "San Francisco, CA"
  },
  {
    id: 2,
    name: "Odoo Europe Ltd.",
    type: "Subsidiary",
    location: "London, UK"
  },
  {
    id: 3,
    name: "Odoo Asia Pacific",
    type: "Regional Office",
    location: "Singapore"
  },
  {
    id: 4,
    name: "Odoo Manufacturing Corp.",
    type: "Manufacturing Unit",
    location: "Detroit, MI"
  }];


  // Mock KPI data
  const kpiData = [
  {
    id: 1,
    title: "Total Revenue",
    value: "$2,847,392",
    change: "+12.5%",
    changeType: "positive",
    icon: "DollarSign",
    subtitle: "vs last month",
    trend: true
  },
  {
    id: 2,
    title: "Active Customers",
    value: "1,247",
    change: "+8.2%",
    changeType: "positive",
    icon: "Users",
    subtitle: "total customers",
    trend: true
  },
  {
    id: 3,
    title: "Pending Orders",
    value: "89",
    change: "-5.1%",
    changeType: "negative",
    icon: "ShoppingCart",
    subtitle: "awaiting processing",
    trend: true
  },
  {
    id: 4,
    title: "Cash Flow",
    value: "$847,293",
    change: "+15.8%",
    changeType: "positive",
    icon: "TrendingUp",
    subtitle: "current balance",
    trend: true
  },
  {
    id: 5,
    title: "Inventory Value",
    value: "$1,234,567",
    change: "+3.2%",
    changeType: "positive",
    icon: "Package",
    subtitle: "total stock value",
    trend: true
  },
  {
    id: 6,
    title: "Open Projects",
    value: "24",
    change: "0%",
    changeType: "neutral",
    icon: "FolderOpen",
    subtitle: "active projects",
    trend: false
  }];


  // Mock chart data
  const salesChartData = [
  { name: 'Jan', value: 245000 },
  { name: 'Feb', value: 312000 },
  { name: 'Mar', value: 289000 },
  { name: 'Apr', value: 367000 },
  { name: 'May', value: 423000 },
  { name: 'Jun', value: 398000 },
  { name: 'Jul', value: 445000 },
  { name: 'Aug', value: 467000 },
  { name: 'Sep', value: 523000 },
  { name: 'Oct', value: 589000 },
  { name: 'Nov', value: 634000 }];


  const pipelineChartData = [
  { name: 'Leads', value: 156 },
  { name: 'Qualified', value: 89 },
  { name: 'Proposal', value: 45 },
  { name: 'Negotiation', value: 23 },
  { name: 'Closed Won', value: 12 }];


  const departmentData = [
  { name: 'Sales', value: 35 },
  { name: 'Marketing', value: 25 },
  { name: 'Support', value: 20 },
  { name: 'Development', value: 15 },
  { name: 'HR', value: 5 }];


  // Mock activities data
  const activities = [
  {
    id: 1,
    type: 'sale',
    user: {
      name: 'Sarah Johnson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ad96eb63-1762273750348.png",
      avatarAlt: 'Professional woman with brown hair in white blazer smiling at camera'
    },
    description: 'Created new sales order SO-2024-001 for Acme Corporation worth $45,000',
    timestamp: new Date(Date.now() - 300000),
    metadata: {
      amount: '$45,000',
      status: 'completed'
    }
  },
  {
    id: 2,
    type: 'invoice',
    user: {
      name: 'Michael Chen',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fbddf848-1762275096037.png",
      avatarAlt: 'Asian man in navy suit with friendly smile in office setting'
    },
    description: 'Generated invoice INV-2024-0847 and sent to client for approval',
    timestamp: new Date(Date.now() - 900000),
    metadata: {
      amount: '$12,500',
      status: 'pending'
    }
  },
  {
    id: 3,
    type: 'payment',
    user: {
      name: 'Emma Rodriguez',
      avatar: "https://images.unsplash.com/photo-1692216243095-ceade89fe669",
      avatarAlt: 'Hispanic woman with long dark hair in professional blue shirt'
    },
    description: 'Payment received for invoice INV-2024-0823 via bank transfer',
    timestamp: new Date(Date.now() - 1800000),
    metadata: {
      amount: '$28,750',
      status: 'completed'
    }
  },
  {
    id: 4,
    type: 'user',
    user: {
      name: 'David Wilson',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19341f160-1762248855459.png",
      avatarAlt: 'Caucasian man with beard in gray sweater looking confident'
    },
    description: 'Added new team member to Sales department with CRM access permissions',
    timestamp: new Date(Date.now() - 3600000),
    metadata: {
      status: 'completed'
    }
  },
  {
    id: 5,
    type: 'project',
    user: {
      name: 'Lisa Thompson',
      avatar: "https://images.unsplash.com/photo-1677594333284-68463516a828",
      avatarAlt: 'Professional woman with blonde hair in black blazer at modern office'
    },
    description: 'Project milestone completed: Website redesign phase 2 delivered on schedule',
    timestamp: new Date(Date.now() - 7200000),
    metadata: {
      status: 'completed'
    }
  },
  {
    id: 6,
    type: 'inventory',
    user: {
      name: 'James Park',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_154d5c41c-1762274259253.png",
      avatarAlt: 'Asian man in white dress shirt with professional demeanor'
    },
    description: 'Stock level alert: Product SKU-12345 inventory below minimum threshold',
    timestamp: new Date(Date.now() - 10800000),
    metadata: {
      status: 'pending'
    }
  },
  {
    id: 7,
    type: 'system',
    description: 'Automated backup completed successfully for all company databases',
    timestamp: new Date(Date.now() - 14400000),
    metadata: {
      status: 'completed'
    }
  }];


  // Mock notifications data
  const notifications = [
  {
    id: 1,
    type: 'approval',
    priority: 'high',
    title: 'Purchase Order Approval Required',
    message: 'PO-2024-0156 for $75,000 requires your approval before processing',
    timestamp: new Date(Date.now() - 1800000),
    read: false,
    actions: [
    { label: 'Approve', variant: 'default', onClick: () => console.log('Approved') },
    { label: 'Reject', variant: 'outline', onClick: () => console.log('Rejected') }]

  },
  {
    id: 2,
    type: 'alert',
    priority: 'high',
    title: 'Low Inventory Alert',
    message: 'Multiple products are running low on stock and need immediate attention',
    timestamp: new Date(Date.now() - 3600000),
    read: false,
    actions: [
    { label: 'View Details', variant: 'outline', onClick: () => console.log('View details') }]

  },
  {
    id: 3,
    type: 'reminder',
    priority: 'medium',
    title: 'Monthly Report Due',
    message: 'Financial report for November 2024 is due in 2 days',
    timestamp: new Date(Date.now() - 7200000),
    read: true,
    actions: [
    { label: 'Generate Report', variant: 'default', onClick: () => console.log('Generate report') }]

  },
  {
    id: 4,
    type: 'info',
    priority: 'low',
    title: 'System Maintenance Scheduled',
    message: 'Planned maintenance window on Sunday 3:00 AM - 5:00 AM EST',
    timestamp: new Date(Date.now() - 14400000),
    read: true
  },
  {
    id: 5,
    type: 'approval',
    priority: 'medium',
    title: 'Employee Leave Request',
    message: 'Sarah Johnson has requested 3 days leave from Dec 15-17, 2024',
    timestamp: new Date(Date.now() - 21600000),
    read: false,
    actions: [
    { label: 'Approve', variant: 'default', onClick: () => console.log('Leave approved') },
    { label: 'Decline', variant: 'outline', onClick: () => console.log('Leave declined') }]

  }];


  // Mock quick actions data
  const quickActions = [
  {
    id: 1,
    title: 'Create Sales Order',
    description: 'New customer order',
    icon: 'Plus',
    variant: 'default',
    path: '/customer-management'
  },
  {
    id: 2,
    title: 'Add Customer',
    description: 'Register new client',
    icon: 'UserPlus',
    variant: 'outline',
    path: '/customer-management'
  },
  {
    id: 3,
    title: 'Generate Invoice',
    description: 'Create billing document',
    icon: 'FileText',
    variant: 'outline',
    path: '/financial-dashboard'
  },
  {
    id: 4,
    title: 'New Project',
    description: 'Start project tracking',
    icon: 'FolderPlus',
    variant: 'outline',
    path: '/project-management'
  },
  {
    id: 5,
    title: 'Inventory Check',
    description: 'Review stock levels',
    icon: 'Package',
    variant: 'outline',
    onClick: () => console.log('Inventory check initiated')
  },
  {
    id: 6,
    title: 'Financial Report',
    description: 'Generate analytics',
    icon: 'BarChart3',
    variant: 'outline',
    path: '/financial-dashboard'
  }];


  useEffect(() => {
    // Set default company on component mount
    if (companies?.length > 0 && !selectedCompany) {
      setSelectedCompany(companies?.[0]);
    }
  }, [companies, selectedCompany]);

  const handleCompanyChange = (company) => {
    setIsLoading(true);
    setSelectedCompany(company);

    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handlePeriodChange = (period) => {
    setIsLoading(true);
    setSelectedPeriod(period);

    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isMenuOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <main className="lg:ml-72 pt-16">
        <div className="p-6 space-y-6">
          {/* Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard Overview</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's what's happening with your business today.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <CompanySelector
                companies={companies}
                selectedCompany={selectedCompany}
                onCompanyChange={handleCompanyChange} />

              <PeriodSelector
                selectedPeriod={selectedPeriod}
                onPeriodChange={handlePeriodChange}
                customRange={customRange}
                onCustomRangeChange={setCustomRange} />

            </div>
          </div>

          {/* Loading Indicator */}
          {isLoading &&
          <div className="fixed top-20 right-6 bg-primary text-primary-foreground px-4 py-2 rounded-lg enterprise-shadow-md z-50">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm">Updating data...</span>
              </div>
            </div>
          }

          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpiData?.map((kpi) =>
            <KPICard key={kpi?.id} {...kpi} />
            )}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartWidget
              title="Monthly Sales Revenue"
              type="bar"
              data={salesChartData}
              height={300} />

            <ChartWidget
              title="Sales Pipeline"
              type="line"
              data={pipelineChartData}
              height={300} />

          </div>

          {/* Department Performance Chart */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <ChartWidget
                title="Department Performance"
                type="pie"
                data={departmentData}
                height={350} />

            </div>
            <div className="space-y-6">
              <QuickActions actions={quickActions} />
            </div>
          </div>

          {/* Activity and Notifications */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <ActivityFeed activities={activities} />
            <NotificationPanel notifications={notifications} />
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-6 mt-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <p className="text-sm text-muted-foreground">
                Last updated: {new Date()?.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Odoo Enterprise. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default MainDashboard;
