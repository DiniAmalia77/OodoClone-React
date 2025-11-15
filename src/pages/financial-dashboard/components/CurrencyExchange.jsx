import React from 'react';
import Icon from '../../../components/AppIcon';

const CurrencyExchange = ({ exchangeRates, baseCurrency = 'USD' }) => {
  const formatRate = (rate) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    })?.format(rate);
  };

  const formatChange = (change) => {
    return `${change >= 0 ? '+' : ''}${change?.toFixed(2)}%`;
  };

  const getChangeColor = (change) => {
    if (change > 0) return 'text-success';
    if (change < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = (change) => {
    if (change > 0) return 'TrendingUp';
    if (change < 0) return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 enterprise-shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Exchange Rates</h3>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Clock" size={12} />
          <span>Updated 5 min ago</span>
        </div>
      </div>
      <div className="space-y-3">
        {exchangeRates?.map((rate) => (
          <div key={rate?.currency} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 enterprise-transition">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-primary">{rate?.currency}</span>
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">
                  {rate?.currency}/{baseCurrency}
                </div>
                <div className="text-xs text-muted-foreground">{rate?.name}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-foreground">
                  {formatRate(rate?.rate)}
                </div>
                <div className={`text-xs flex items-center space-x-1 ${getChangeColor(rate?.change)}`}>
                  <Icon name={getChangeIcon(rate?.change)} size={10} />
                  <span>{formatChange(rate?.change)}</span>
                </div>
              </div>
              
              <div className="w-12 h-6 bg-muted/50 rounded flex items-center justify-center">
                <Icon name="BarChart2" size={12} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Info" size={14} className="text-accent" />
            <span className="text-xs font-medium text-foreground">Multi-Currency Impact</span>
          </div>
          <div className="text-xs text-muted-foreground">
            Current exchange rate fluctuations have resulted in a +$2,450 unrealized gain on foreign currency holdings.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyExchange;
