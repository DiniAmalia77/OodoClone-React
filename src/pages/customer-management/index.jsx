import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CustomerListTable from './components/CustomerListTable';
import CustomerDetailPanel from './components/CustomerDetailPanel';
import CustomerFilters from './components/CustomerFilters';
import CustomerStats from './components/CustomerStats';
import QuickActions from './components/QuickActions';

const CustomerManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    salesRep: '',
    location: ''
  });
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  // Mock customer data
  const mockCustomers = [
  {
    id: 1,
    company: "TechCorp Solutions",
    contactPerson: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, San Francisco, CA 94105",
    website: "www.techcorp.com",
    industry: "Technology",
    companySize: "500-1000 employees",
    status: "active",
    type: "enterprise",
    salesRep: "John Smith",
    location: "north-america",
    customerSince: "2022-03-15T10:00:00Z",
    lastInteraction: "2025-11-12T14:30:00Z",
    totalSales: 125000,
    totalOrders: 45,
    openOpportunities: 3,
    logo: "https://images.unsplash.com/photo-1649621902418-eaa73f09b341",
    logoAlt: "Modern office building with glass facade representing TechCorp Solutions headquarters",
    interactions: [
    {
      id: 1,
      type: "email",
      subject: "Q4 Contract Renewal Discussion",
      description: "Discussed renewal terms and pricing for the upcoming quarter. Customer expressed interest in expanding services.",
      date: "2025-11-12T14:30:00Z",
      createdBy: "John Smith",
      status: "completed"
    },
    {
      id: 2,
      type: "call",
      subject: "Technical Support Follow-up",
      description: "Followed up on recent technical issues. All problems have been resolved satisfactorily.",
      date: "2025-11-10T09:15:00Z",
      createdBy: "Sarah Johnson",
      status: "completed"
    }],

    opportunities: [
    {
      id: 1,
      name: "Enterprise Software Upgrade",
      value: 75000,
      status: "open",
      closeDate: "2025-12-15T00:00:00Z",
      description: "Potential upgrade to enterprise-level software package with additional modules."
    },
    {
      id: 2,
      name: "Multi-year Service Contract",
      value: 200000,
      status: "open",
      closeDate: "2025-11-30T00:00:00Z",
      description: "Three-year service and support contract with premium SLA."
    }],

    orders: [
    {
      id: 1,
      orderNumber: "ORD-2025-001",
      amount: 25000,
      date: "2025-11-01T00:00:00Z",
      status: "completed",
      items: ["Software License", "Implementation Services", "Training"]
    },
    {
      id: 2,
      orderNumber: "ORD-2025-002",
      amount: 15000,
      date: "2025-10-15T00:00:00Z",
      status: "completed",
      items: ["Support Package", "Additional Users"]
    }]

  },
  {
    id: 2,
    company: "Global Industries",
    contactPerson: "Michael Chen",
    email: "m.chen@globalind.com",
    phone: "+1 (555) 987-6543",
    address: "456 Industrial Blvd, Chicago, IL 60601",
    website: "www.globalindustries.com",
    industry: "Manufacturing",
    companySize: "1000+ employees",
    status: "active",
    type: "enterprise",
    salesRep: "Sarah Johnson",
    location: "north-america",
    customerSince: "2021-08-22T10:00:00Z",
    lastInteraction: "2025-11-11T16:45:00Z",
    totalSales: 285000,
    totalOrders: 78,
    openOpportunities: 5,
    logo: "https://images.unsplash.com/photo-1583765747900-91993150c08d",
    logoAlt: "Industrial manufacturing facility with steel structures representing Global Industries operations",
    interactions: [
    {
      id: 1,
      type: "meeting",
      subject: "Quarterly Business Review",
      description: "Comprehensive review of services performance and discussion of expansion opportunities for next year.",
      date: "2025-11-11T16:45:00Z",
      createdBy: "Sarah Johnson",
      status: "completed"
    }],

    opportunities: [
    {
      id: 1,
      name: "Factory Automation System",
      value: 150000,
      status: "open",
      closeDate: "2026-01-31T00:00:00Z",
      description: "Complete automation system for new production line."
    }],

    orders: [
    {
      id: 1,
      orderNumber: "ORD-2025-003",
      amount: 45000,
      date: "2025-10-28T00:00:00Z",
      status: "pending",
      items: ["Equipment Maintenance", "Spare Parts", "Technical Support"]
    }]

  },
  {
    id: 3,
    company: "Innovation Labs",
    contactPerson: "Emily Rodriguez",
    email: "emily.r@innovationlabs.io",
    phone: "+1 (555) 456-7890",
    address: "789 Research Park, Austin, TX 78701",
    website: "www.innovationlabs.io",
    industry: "Research & Development",
    companySize: "50-100 employees",
    status: "prospect",
    type: "small-business",
    salesRep: "Michael Brown",
    location: "north-america",
    customerSince: "2025-09-10T10:00:00Z",
    lastInteraction: "2025-11-08T11:20:00Z",
    totalSales: 35000,
    totalOrders: 8,
    openOpportunities: 2,
    logo: "https://images.unsplash.com/photo-1656431756476-4dc873d79678",
    logoAlt: "Modern research laboratory with advanced equipment representing Innovation Labs facility",
    interactions: [
    {
      id: 1,
      type: "email",
      subject: "Product Demo Follow-up",
      description: "Sent detailed proposal following last week\'s product demonstration. Awaiting feedback from technical team.",
      date: "2025-11-08T11:20:00Z",
      createdBy: "Michael Brown",
      status: "pending"
    }],

    opportunities: [
    {
      id: 1,
      name: "Research Platform License",
      value: 25000,
      status: "open",
      closeDate: "2025-12-01T00:00:00Z",
      description: "Annual license for research data analysis platform."
    }],

    orders: [
    {
      id: 1,
      orderNumber: "ORD-2025-004",
      amount: 12000,
      date: "2025-09-15T00:00:00Z",
      status: "completed",
      items: ["Pilot License", "Training Sessions"]
    }]

  },
  {
    id: 4,
    company: "Future Systems",
    contactPerson: "David Kim",
    email: "david.kim@futuresys.com",
    phone: "+1 (555) 321-0987",
    address: "321 Future Ave, Seattle, WA 98101",
    website: "www.futuresystems.com",
    industry: "Software Development",
    companySize: "200-500 employees",
    status: "lead",
    type: "enterprise",
    salesRep: "Emily Davis",
    location: "north-america",
    customerSince: "2025-10-05T10:00:00Z",
    lastInteraction: "2025-11-07T13:15:00Z",
    totalSales: 0,
    totalOrders: 0,
    openOpportunities: 1,
    logo: "https://images.unsplash.com/photo-1703599744291-8d49bdcad171",
    logoAlt: "Futuristic office space with digital displays representing Future Systems workspace",
    interactions: [
    {
      id: 1,
      type: "call",
      subject: "Initial Discovery Call",
      description: "Conducted initial needs assessment and discussed potential solutions for their development workflow.",
      date: "2025-11-07T13:15:00Z",
      createdBy: "Emily Davis",
      status: "completed"
    }],

    opportunities: [
    {
      id: 1,
      name: "Development Tools Suite",
      value: 50000,
      status: "open",
      closeDate: "2025-12-20T00:00:00Z",
      description: "Comprehensive development and deployment tools for their engineering team."
    }],

    orders: []
  },
  {
    id: 5,
    company: "Retail Plus",
    contactPerson: "Lisa Thompson",
    email: "lisa.thompson@retailplus.com",
    phone: "+1 (555) 654-3210",
    address: "654 Commerce St, New York, NY 10001",
    website: "www.retailplus.com",
    industry: "Retail",
    companySize: "100-200 employees",
    status: "inactive",
    type: "small-business",
    salesRep: "David Wilson",
    location: "north-america",
    customerSince: "2023-05-12T10:00:00Z",
    lastInteraction: "2025-08-15T10:30:00Z",
    totalSales: 95000,
    totalOrders: 32,
    openOpportunities: 0,
    logo: "https://images.unsplash.com/photo-1625732867209-7c8afdb21d10",
    logoAlt: "Modern retail store interior with organized product displays representing Retail Plus operations",
    interactions: [
    {
      id: 1,
      type: "email",
      subject: "Account Reactivation Attempt",
      description: "Reached out to discuss potential reactivation of services. No response received yet.",
      date: "2025-08-15T10:30:00Z",
      createdBy: "David Wilson",
      status: "pending"
    }],

    opportunities: [],
    orders: [
    {
      id: 1,
      orderNumber: "ORD-2024-015",
      amount: 18000,
      date: "2024-12-10T00:00:00Z",
      status: "completed",
      items: ["POS System", "Inventory Management"]
    }]

  }];


  const handleFilterChange = (filterKey, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterKey]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      status: '',
      type: '',
      salesRep: '',
      location: ''
    });
    setSearchTerm('');
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setShowMobileDetail(true);
  };

  const handleCloseMobileDetail = () => {
    setShowMobileDetail(false);
    setSelectedCustomer(null);
  };

  const handleActionComplete = (actionId) => {
    console.log(`Action completed: ${actionId}`);
    // Handle action completion logic here
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen} />

      
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)} />


      <main className="lg:ml-72 pt-16">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Customer Management</h1>
              <p className="text-muted-foreground">
                Manage customer relationships, track interactions, and monitor sales opportunities
              </p>
            </div>
          </div>

          {/* Customer Statistics */}
          <CustomerStats customers={mockCustomers} />

          {/* Search and Filters */}
          <CustomerFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters} />


          {/* Main Content Area */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Customer List - Takes up more space on desktop */}
            <div className={`xl:col-span-2 ${showMobileDetail ? 'hidden xl:block' : ''}`}>
              <CustomerListTable
                customers={mockCustomers}
                selectedCustomer={selectedCustomer}
                onCustomerSelect={handleCustomerSelect}
                searchTerm={searchTerm}
                filters={filters} />

            </div>

            {/* Customer Detail Panel - Hidden on mobile when no selection */}
            <div className={`xl:col-span-1 ${!showMobileDetail ? 'hidden xl:block' : ''}`}>
              <CustomerDetailPanel
                customer={selectedCustomer}
                onClose={handleCloseMobileDetail} />

            </div>

            {/* Quick Actions Sidebar - Hidden on mobile when detail is shown */}
            <div className={`xl:col-span-1 ${showMobileDetail ? 'hidden xl:block' : ''}`}>
              <QuickActions
                selectedCustomer={selectedCustomer}
                onActionComplete={handleActionComplete} />

            </div>
          </div>
        </div>
      </main>
    </div>);

};

export default CustomerManagement;
