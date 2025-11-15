import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import FinancialMetricsCard from './components/FinancialMetricsCard';
import RevenueChart from './components/RevenueChart';
import AccountsSummary from './components/AccountsSummary';
import QuickActions from './components/QuickActions';
import BankReconciliation from './components/BankReconciliation';
import CurrencyExchange from './components/CurrencyExchange';
import ComplianceIndicators from './components/ComplianceIndicators';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';

const FinancialDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedView, setSelectedView] = useState('overview');

  // Mock data for financial metrics
  const financialMetrics = [
    {
      title: 'Cash Flow',
      amount: 245000,
      currency: 'USD',
      change: 12.5,
      changeType: 'positive',
      icon: 'Wallet',
      trend: true
    },
    {
      title: 'Accounts Receivable',
      amount: 89500,
      currency: 'USD',
      change: -3.2,
      changeType: 'negative',
      icon: 'TrendingUp',
      trend: true
    },
    {
      title: 'Accounts Payable',
      amount: 67200,
      currency: 'USD',
      change: 8.7,
      changeType: 'positive',
      icon: 'TrendingDown',
      trend: true
    },
    {
      title: 'Profit Margin',
      amount: 156800,
      currency: 'USD',
      change: 15.3,
      changeType: 'positive',
      icon: 'PieChart',
      trend: true
    }
  ];

  // Mock data for revenue chart
  const revenueData = [
    { month: 'Jan', revenue: 185000, expenses: 125000 },
    { month: 'Feb', revenue: 195000, expenses: 135000 },
    { month: 'Mar', revenue: 210000, expenses: 145000 },
    { month: 'Apr', revenue: 225000, expenses: 155000 },
    { month: 'May', revenue: 240000, expenses: 165000 },
    { month: 'Jun', revenue: 255000, expenses: 175000 },
    { month: 'Jul', revenue: 270000, expenses: 185000 },
    { month: 'Aug', revenue: 285000, expenses: 195000 },
    { month: 'Sep', revenue: 300000, expenses: 205000 },
    { month: 'Oct', revenue: 315000, expenses: 215000 },
    { month: 'Nov', revenue: 330000, expenses: 225000 },
    { month: 'Dec', revenue: 345000, expenses: 235000 }
  ];

  // Mock data for accounts
  const accounts = [
    {
      id: 1,
      name: 'Cash and Cash Equivalents',
      code: '1001',
      type: 'asset',
      balance: 245000,
      change: 12.5
    },
    {
      id: 2,
      name: 'Accounts Receivable',
      code: '1200',
      type: 'asset',
      balance: 89500,
      change: -3.2
    },
    {
      id: 3,
      name: 'Inventory',
      code: '1300',
      type: 'asset',
      balance: 156000,
      change: 5.8
    },
    {
      id: 4,
      name: 'Accounts Payable',
      code: '2001',
      type: 'liability',
      balance: -67200,
      change: 8.7
    },
    {
      id: 5,
      name: 'Revenue',
      code: '4001',
      type: 'revenue',
      balance: 345000,
      change: 18.2
    }
  ];

  // Mock data for recent transactions
  const recentTransactions = [
    {
      id: 1,
      description: 'Customer Payment - Invoice #INV-2024-001',
      account: 'Cash and Cash Equivalents',
      amount: 15000,
      type: 'credit',
      date: '2025-11-13',
      reference: 'PAY-001'
    },
    {
      id: 2,
      description: 'Office Supplies Purchase',
      account: 'Office Expenses',
      amount: -850,
      type: 'debit',
      date: '2025-11-12',
      reference: 'EXP-045'
    },
    {
      id: 3,
      description: 'Software License Renewal',
      account: 'Software Expenses',
      amount: -2400,
      type: 'debit',
      date: '2025-11-11',
      reference: 'EXP-046'
    },
    {
      id: 4,
      description: 'Sales Revenue - Project Alpha',
      account: 'Revenue',
      amount: 25000,
      type: 'credit',
      date: '2025-11-10',
      reference: 'SAL-012'
    },
    {
      id: 5,
      description: 'Utility Bill Payment',
      account: 'Utilities Expense',
      amount: -1200,
      type: 'debit',
      date: '2025-11-09',
      reference: 'EXP-047'
    }
  ];

  // Mock data for bank accounts
  const bankAccounts = [
    {
      id: 1,
      name: 'Chase Business Checking',
      accountNumber: '****1234',
      balance: 245000,
      bankBalance: 244850,
      status: 'pending',
      lastReconciled: '2025-11-10'
    },
    {
      id: 2,
      name: 'Wells Fargo Savings',
      accountNumber: '****5678',
      balance: 150000,
      bankBalance: 150000,
      status: 'reconciled',
      lastReconciled: '2025-11-12'
    },
    {
      id: 3,
      name: 'Bank of America Credit Line',
      accountNumber: '****9012',
      balance: -25000,
      bankBalance: -25200,
      status: 'discrepancy',
      lastReconciled: '2025-11-08'
    }
  ];

  // Mock reconciliation status
  const reconciliationStatus = {
    reconciled: 156,
    pending: 12,
    discrepancies: 3
  };

  // Mock exchange rates
  const exchangeRates = [
    {
      currency: 'EUR',
      name: 'Euro',
      rate: 0.8456,
      change: -0.12
    },
    {
      currency: 'GBP',
      name: 'British Pound',
      rate: 0.7234,
      change: 0.08
    },
    {
      currency: 'JPY',
      name: 'Japanese Yen',
      rate: 110.45,
      change: -0.34
    },
    {
      currency: 'CAD',
      name: 'Canadian Dollar',
      rate: 1.2567,
      change: 0.15
    }
  ];

  // Mock compliance items
  const complianceItems = [
    {
      id: 1,
      title: 'Monthly Tax Filing',
      description: 'Submit monthly sales tax return for October 2025',
      status: 'compliant',
      dueDate: '2025-11-15',
      progress: 100
    },
    {
      id: 2,
      title: 'Quarterly Financial Report',
      description: 'Prepare Q3 2025 financial statements for board review',
      status: 'warning',
      dueDate: '2025-11-20',
      progress: 75
    },
    {
      id: 3,
      title: 'Annual Audit Preparation',
      description: 'Gather documentation for 2025 annual audit',
      status: 'pending',
      dueDate: '2025-12-01',
      progress: 25
    },
    {
      id: 4,
      title: 'Payroll Tax Deposit',
      description: 'Submit federal payroll tax deposit for November',
      status: 'overdue',
      dueDate: '2025-11-10',
      progress: 0
    }
  ];

  const periodOptions = [
    { value: 'daily', label: 'Daily View' },
    { value: 'weekly', label: 'Weekly View' },
    { value: 'monthly', label: 'Monthly View' },
    { value: 'quarterly', label: 'Quarterly View' },
    { value: 'yearly', label: 'Annual View' }
  ];

  const viewOptions = [
    { value: 'overview', label: 'Overview' },
    { value: 'detailed', label: 'Detailed Analysis' },
    { value: 'comparative', label: 'Comparative View' }
  ];

  const handleQuickAction = (actionId) => {
    console.log(`Quick action clicked: ${actionId}`);
    // Handle navigation or modal opening based on action
    switch (actionId) {
      case 'journal-entry':
        // Navigate to journal entry creation
        break;
      case 'invoice':
        // Navigate to invoice generation
        break;
      case 'payment':
        // Navigate to payment processing
        break;
      case 'report':
        // Navigate to financial reports
        break;
      case 'reconcile':
        // Navigate to bank reconciliation
        break;
      case 'budget':
        // Navigate to budget analysis
        break;
      default:
        break;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        isMenuOpen={isSidebarOpen}
      />
      <Sidebar 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="lg:ml-72 pt-16">
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Financial Dashboard</h1>
              <p className="text-muted-foreground">
                Comprehensive financial overview and accounting management
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Select
                options={periodOptions}
                value={selectedPeriod}
                onChange={setSelectedPeriod}
                placeholder="Select period"
                className="w-40"
              />
              <Select
                options={viewOptions}
                value={selectedView}
                onChange={setSelectedView}
                placeholder="Select view"
                className="w-40"
              />
              <Button variant="default" iconName="Download" iconPosition="left">
                Export Data
              </Button>
            </div>
          </div>

          {/* Financial Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {financialMetrics?.map((metric, index) => (
              <FinancialMetricsCard
                key={index}
                title={metric?.title}
                amount={metric?.amount}
                currency={metric?.currency}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                trend={metric?.trend}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RevenueChart
              data={revenueData}
              type="line"
              title="Revenue vs Expenses Trend"
              height={350}
            />
            <RevenueChart
              data={revenueData?.slice(-6)}
              type="bar"
              title="Last 6 Months Comparison"
              height={350}
            />
          </div>

          {/* Quick Actions */}
          <QuickActions onActionClick={handleQuickAction} />

          {/* Accounts Summary */}
          <AccountsSummary 
            accounts={accounts}
            recentTransactions={recentTransactions}
          />

          {/* Bank Reconciliation & Currency Exchange */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2">
              <BankReconciliation
                bankAccounts={bankAccounts}
                reconciliationStatus={reconciliationStatus}
              />
            </div>
            <div>
              <CurrencyExchange
                exchangeRates={exchangeRates}
                baseCurrency="USD"
              />
            </div>
          </div>

          {/* Compliance Indicators */}
          <ComplianceIndicators complianceItems={complianceItems} />

          {/* Footer */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div className="text-sm text-muted-foreground">
                Last updated: November 13, 2025 at 9:00 PM
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <Button variant="ghost" size="sm" iconName="RefreshCw" iconSize={14}>
                  Refresh Data
                </Button>
                <Button variant="ghost" size="sm" iconName="Settings" iconSize={14}>
                  Dashboard Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FinancialDashboard;
