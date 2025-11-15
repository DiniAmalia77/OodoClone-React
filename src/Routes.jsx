import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ProjectManagement from './pages/project-management';
import UserAdministration from './pages/user-administration';
import MainDashboard from './pages/main-dashboard';
import LoginPage from './pages/login';
import CustomerManagement from './pages/customer-management';
import FinancialDashboard from './pages/financial-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<MainDashboard />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/user-administration" element={<UserAdministration />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="/financial-dashboard" element={<FinancialDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
