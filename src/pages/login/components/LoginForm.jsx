import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Mock credentials for different user types
  const mockCredentials = {
    admin: { email: 'admin@odoo.com', password: 'admin123', role: 'Administrator' },
    manager: { email: 'manager@odoo.com', password: 'manager123', role: 'Manager' },
    user: { email: 'user@odoo.com', password: 'user123', role: 'User' }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleLogin = async (e) => {
    e?.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors)?.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Check mock credentials
      const validCredential = Object.values(mockCredentials)?.find(
        cred => cred?.email === formData?.email && cred?.password === formData?.password
      );

      if (!validCredential) {
        setErrors({ 
          general: `Invalid credentials. Try: admin@odoo.com/admin123, manager@odoo.com/manager123, or user@odoo.com/user123` 
        });
        setIsLoading(false);
        return;
      }

      // Simulate 2FA requirement for admin users
      if (validCredential?.role === 'Administrator' && !showTwoFactor) {
        setShowTwoFactor(true);
        setIsLoading(false);
        return;
      }

      // Store user session
      localStorage.setItem('userSession', JSON.stringify({
        email: formData?.email,
        role: validCredential?.role,
        loginTime: new Date()?.toISOString(),
        rememberMe: formData?.rememberMe
      }));

      // Navigate to dashboard
      navigate('/main-dashboard');
      
    } catch (error) {
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTwoFactorSubmit = async (e) => {
    e?.preventDefault();
    
    if (!twoFactorCode || twoFactorCode?.length !== 6) {
      setErrors({ twoFactor: 'Please enter a valid 6-digit code' });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock 2FA validation (accept 123456 as valid code)
      if (twoFactorCode !== '123456') {
        setErrors({ twoFactor: 'Invalid verification code. Use: 123456' });
        setIsLoading(false);
        return;
      }

      // Store user session
      localStorage.setItem('userSession', JSON.stringify({
        email: formData?.email,
        role: 'Administrator',
        loginTime: new Date()?.toISOString(),
        rememberMe: formData?.rememberMe,
        twoFactorVerified: true
      }));

      navigate('/main-dashboard');
      
    } catch (error) {
      setErrors({ twoFactor: 'Verification failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (resendTimer > 0) return;
    
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email address.');
  };

  if (showTwoFactor) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Two-Factor Authentication</h2>
          <p className="text-muted-foreground">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>
        <form onSubmit={handleTwoFactorSubmit} className="space-y-6">
          {errors?.general && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <p className="text-sm text-error">{errors?.general}</p>
              </div>
            </div>
          )}

          <Input
            label="Verification Code"
            type="text"
            placeholder="000000"
            value={twoFactorCode}
            onChange={(e) => {
              const value = e?.target?.value?.replace(/\D/g, '')?.slice(0, 6);
              setTwoFactorCode(value);
              if (errors?.twoFactor) {
                setErrors(prev => ({ ...prev, twoFactor: '' }));
              }
            }}
            error={errors?.twoFactor}
            maxLength={6}
            className="text-center text-2xl tracking-widest"
            required
          />

          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={twoFactorCode?.length !== 6}
          >
            Verify & Sign In
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={handleResendCode}
              disabled={resendTimer > 0}
              className="text-sm text-primary hover:text-primary/80 disabled:text-muted-foreground enterprise-transition"
            >
              {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend verification code'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowTwoFactor(false)}
            className="w-full text-sm text-muted-foreground hover:text-foreground enterprise-transition"
          >
            ← Back to login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to your Odoo Enterprise account
        </p>
      </div>
      <form onSubmit={handleLogin} className="space-y-6">
        {errors?.general && (
          <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-start space-x-2">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5" />
              <p className="text-sm text-error">{errors?.general}</p>
            </div>
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          required
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData?.rememberMe}
            onChange={handleInputChange}
            name="rememberMe"
          />
          
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 enterprise-transition"
          >
            Forgot password?
          </button>
        </div>

        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="right"
        >
          Sign In
        </Button>
      </form>
      <div className="mt-8 text-center">
        <p className="text-xs text-muted-foreground">
          Need help? Contact your system administrator
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
