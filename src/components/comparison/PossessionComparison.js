// src/components/comparison/PossessionComparison.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Label
} from 'recharts';
import { useData } from '../../context/DataContext';
import { possessionMetricConfig } from '../../utils/metrics';
import { formatNumber, formatNumberWithCommas } from '../../utils/formatting';

const ComparisonContainer = styled.div`
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  height: 400px;
  margin: 20px 0;
`;

const StatsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  min-width: 200px;
  background-color: #f9f9f7;
  border-radius: 5px;
  padding: 15px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const StatTitle = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
`;

const StatValue = styled.div`
  font-size: 22px;
  font-weight: 600;
  color: ${props => (props.type === 'tip' ? '#C8102E' : props.type === 'otip' ? '#e63946' : props.isNegative ? '#e63946' : '#43aa8b')};
`;

const StatChange = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: ${props => (props.isPositive ? '#43aa8b' : '#e63946')};
`;

const CustomTooltip = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TooltipLabel = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
`;

const TooltipValue = styled.div`
  font-size: 14px;
  margin-bottom: 3px;
`;

const PossessionComparison = () => {
  const { fullData, isDataLoaded } = useData();
  const [currentMetric, setCurrentMetric] = useState('distancePerMin');
  
  const handleMetricChange = (metricKey) => {
    setCurrentMetric(metricKey);
  };
  
  if (!isDataLoaded || !fullData.length) {
    return <div>Loading possession comparison data...</div>;
  }
  
  const config = possessionMetricConfig[currentMetric];
  
  // Helper function to calculate average
  const calcAverage = (field) => {
    const validValues = fullData
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null")
      .map(val => parseFloat(val));
    
    if (validValues.length === 0) return 0;
    
    return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
  };
  
  // Helper function to calculate per-minute values
  const calcPerMinute = (valueField, minutesField) => {
    let totalValue = 0;
    let totalMinutes = 0;
    
    fullData.forEach(match => {
      const value = parseFloat(match[valueField]);
      const minutes = parseFloat(match[minutesField]);
      
      if (!isNaN(value) && !isNaN(minutes) && minutes > 0) {
        totalValue += value;
        totalMinutes += minutes;
      }
    });
    
    return totalMinutes > 0 ? totalValue / totalMinutes : 0;
  };
  
  let tipAvg, otipAvg;
  
  if (config.needsCalculation) {
    // For metrics that need to be normalized by minutes
    tipAvg = calcPerMinute(config.tipField, 'Minutes TIP');
    otipAvg = calcPerMinute(config.otipField, 'Minutes OTIP');
  } else {
    // For metrics already in per-minute form
    tipAvg = calcAverage(config.tipField);
    otipAvg = calcAverage(config.otipField);
  }
  
  const percentDifference = tipAvg > 0 ? ((otipAvg - tipAvg) / tipAvg) * 100 : 0;
  
  // Calculate max values
  const tipMax = Math.max(
    ...fullData
      .map(row => {
        if (config.needsCalculation) {
          const value = parseFloat(row[config.tipField]);
          const minutes = parseFloat(row['Minutes TIP']);
          return !isNaN(value) && !isNaN(minutes) && minutes > 0 ? value / minutes : 0;
        } else {
          return parseFloat(row[config.tipField]);
        }
      })
      .filter(val => !isNaN(val))
  );
  
  const otipMax = Math.max(
    ...fullData
      .map(row => {
        if (config.needsCalculation) {
          const value = parseFloat(row[config.otipField]);
          const minutes = parseFloat(row['Minutes OTIP']);
          return !isNaN(value) && !isNaN(minutes) && minutes > 0 ? value / minutes : 0;
        } else {
          return parseFloat(row[config.otipField]);
        }
      })
      .filter(val => !isNaN(val))
  );
  
  const chartData = [
    { name: 'In Possession', value: tipAvg, fill: config.color1 },
    { name: 'Out of Possession', value: otipAvg, fill: config.color2 }
  ];
  
  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <TooltipLabel>{label}</TooltipLabel>
          <TooltipValue>
            {config.title}: {formatNumber(payload[0].value)} {config.unit}
          </TooltipValue>
        </CustomTooltip>
      );
    }
    return null;
  };
  
  const metrics = Object.keys(possessionMetricConfig).map(key => ({
    id: key,
    title: possessionMetricConfig[key].title
  }));
  
  // Custom reference arrow for the chart
  const CustomArrow = ({ x1, y1, x2, y2, label }) => {
    return (
      <g>
        <defs>
          <marker
            id="arrowhead-possession"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon 
              points="0 0, 10 3.5, 0 7" 
              fill={percentDifference < 0 ? '#e63946' : '#43aa8b'} 
            />
          </marker>
        </defs>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={percentDifference < 0 ? '#e63946' : '#43aa8b'}
          strokeWidth="2"
          strokeDasharray="5,3"
          markerEnd="url(#arrowhead-possession)"
        />
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 15}
          textAnchor="middle"
          fill={percentDifference < 0 ? '#e63946' : '#43aa8b'}
          fontWeight="bold"
          fontSize="14"
        >
          {formatNumber(percentDifference)}%
        </text>
      </g>
    );
  };
  
  return (
    <ComparisonContainer>
      <div className="metric-selector">
        {metrics.map(metric => (
          <button
            key={metric.id}
            className={`metric-button ${currentMetric === metric.id ? 'active' : ''}`}
            onClick={() => handleMetricChange(metric.id)}
          >
            {metric.title}
          </button>
        ))}
      </div>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis
              label={{ 
                value: config.yAxisLabel, 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' } 
              }}
            />
            <Tooltip content={renderCustomTooltip} />
            <Bar dataKey="value" fill={(entry) => entry.fill} radius={[4, 4, 0, 0]} />
            
            {/* Custom arrow with percentage difference */}
            {Math.abs(percentDifference) > 1 && (
              <CustomArrow 
                x1={100} 
                y1={400 - (400 * (tipAvg / (Math.max(tipAvg, otipAvg) * 1.1)))} 
                x2={300} 
                y2={400 - (400 * (otipAvg / (Math.max(tipAvg, otipAvg) * 1.1)))} 
                label={`${formatNumber(percentDifference)}%`}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      <StatsRow>
        <StatCard>
          <StatTitle>In Possession (TIP)</StatTitle>
          <StatValue type="tip">{formatNumber(tipAvg)} {config.unit}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Out of Possession (OTIP)</StatTitle>
          <StatValue type="otip">{formatNumber(otipAvg)} {config.unit}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Difference</StatTitle>
          <StatValue isNegative={percentDifference < 0}>{formatNumber(percentDifference)}%</StatValue>
          <StatChange isPositive={percentDifference > 0}>
            {percentDifference > 0 ? 'Higher' : 'Lower'} out of possession
          </StatChange>
        </StatCard>
        <StatCard>
          <StatTitle>Maximum TIP</StatTitle>
          <StatValue type="tip">{formatNumber(tipMax)} {config.unit}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Maximum OTIP</StatTitle>
          <StatValue type="otip">{formatNumber(otipMax)} {config.unit}</StatValue>
        </StatCard>
      </StatsRow>
    </ComparisonContainer>
  );
};

export default PossessionComparison;