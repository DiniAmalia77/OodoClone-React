import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import CompanySelector from './components/CompanySelector';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';
import Icon from '../../components/AppIcon';


const LoginPage = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState('odoo-main');

  useEffect(() => {
    // Check if user is already logged in
    const userSession = localStorage.getItem('userSession');
    if (userSession) {
      try {
        const session = JSON.parse(userSession);
        // Check if session is still valid (within 24 hours for remember me, 8 hours otherwise)
        const loginTime = new Date(session.loginTime);
        const now = new Date();
        const hoursDiff = (now - loginTime) / (1000 * 60 * 60);
        
        const maxHours = session.rememberMe ? 24 : 8;
        
        if (hoursDiff < maxHours) {
          navigate('/main-dashboard');
          return;
        } else {
          // Session expired, clear it
          localStorage.removeItem('userSession');
        }
      } catch (error) {
        // Invalid session data, clear it
        localStorage.removeItem('userSession');
      }
    }

    // Set page title
    document.title = 'Login - Odoo Enterprise';
  }, [navigate]);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company.id);
    // Store selected company for the session
    localStorage.setItem('selectedCompany', JSON.stringify(company));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.3%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-40"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Branding & Info */}
              <div className="hidden lg:block space-y-8">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium text-primary">Enterprise Edition</span>
                  </div>
                  
                  <h1 className="text-4xl font-bold text-foreground leading-tight">
                    Manage Your Business
                    <br />
                    <span className="text-primary">All in One Place</span>
                  </h1>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    From sales and inventory to accounting and HR, Odoo Enterprise 
                    provides everything you need to run your business efficiently.
                  </p>
                </div>

                {/* Feature Highlights */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: 'BarChart3', title: 'Real-time Analytics', desc: 'Live business insights' },
                    { icon: 'Users', title: 'Team Collaboration', desc: 'Seamless workflows' },
                    { icon: 'Shield', title: 'Enterprise Security', desc: 'Bank-grade protection' },
                    { icon: 'Smartphone', title: 'Mobile Ready', desc: 'Access anywhere' }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-surface/60 rounded-lg border border-border/50">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name={feature.icon} size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground text-sm">{feature.title}</div>
                        <div className="text-xs text-muted-foreground">{feature.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Login Form */}
              <div className="w-full max-w-md mx-auto lg:mx-0">
                <div className="bg-surface rounded-2xl enterprise-shadow-lg border border-border p-8">
                  <LoginHeader />
                  <CompanySelector 
                    selectedCompany={selectedCompany}
                    onCompanySelect={handleCompanySelect}
                  />
                  <LoginForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Security Badges */}
        <footer className="py-8 px-4">
          <SecurityBadges />
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
