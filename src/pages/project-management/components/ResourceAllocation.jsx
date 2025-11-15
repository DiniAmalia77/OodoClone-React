import React from 'react';
import Icon from '../../../components/AppIcon';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ResourceAllocation = ({ resourceData, budgetData }) => {
  const COLORS = ['#1E3A8A', '#3B82F6', '#10B981', '#D97706', '#DC2626'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 enterprise-shadow-lg">
          <p className="text-sm font-medium text-popover-foreground">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              {entry?.name}: {entry?.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="flex items-center justify-between p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Resource Allocation</h2>
        <div className="flex items-center space-x-2">
          <button className="text-sm text-primary hover:text-primary/80 enterprise-transition">
            Export Report
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Team Utilization Chart */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
              <Icon name="Users" size={16} className="mr-2" />
              Team Utilization
            </h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={resourceData?.teamUtilization}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    axisLine={{ stroke: 'var(--color-border)' }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: 'var(--color-muted-foreground)' }}
                    axisLine={{ stroke: 'var(--color-border)' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="allocated" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="available" fill="var(--color-success)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="flex items-center justify-center space-x-6 mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded"></div>
                <span className="text-xs text-muted-foreground">Allocated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded"></div>
                <span className="text-xs text-muted-foreground">Available</span>
              </div>
            </div>
          </div>

          {/* Budget Distribution */}
          <div>
            <h3 className="text-sm font-medium text-foreground mb-4 flex items-center">
              <Icon name="DollarSign" size={16} className="mr-2" />
              Budget Distribution
            </h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={budgetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {budgetData?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              {budgetData?.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded" 
                    style={{ backgroundColor: COLORS?.[index % COLORS?.length] }}
                  ></div>
                  <span className="text-xs text-muted-foreground">{item?.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name="Clock" size={20} className="text-primary" />
              <span className="text-xs text-success font-medium">+5.2%</span>
            </div>
            <div className="text-2xl font-bold text-card-foreground">1,247</div>
            <div className="text-sm text-muted-foreground">Total Hours Logged</div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name="DollarSign" size={20} className="text-success" />
              <span className="text-xs text-success font-medium">On Budget</span>
            </div>
            <div className="text-2xl font-bold text-card-foreground">$127,500</div>
            <div className="text-sm text-muted-foreground">Budget Utilized</div>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <Icon name="TrendingUp" size={20} className="text-warning" />
              <span className="text-xs text-warning font-medium">87%</span>
            </div>
            <div className="text-2xl font-bold text-card-foreground">23</div>
            <div className="text-sm text-muted-foreground">Active Resources</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;
