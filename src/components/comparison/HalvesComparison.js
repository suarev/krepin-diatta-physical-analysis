// src/components/comparison/HalvesComparison.js
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
import { halvesMetricConfig } from '../../utils/metrics';
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
  color: ${props => props.isNegative ? '#e63946' : '#C8102E'};
`;

const StatChange = styled.div`
  font-size: 14px;
  margin-top: 5px;
  color: ${props => props.isNegative ? '#e63946' : '#43aa8b'};
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

const HalvesComparison = () => {
  const { fullData, isDataLoaded } = useData();
  const [currentMetric, setCurrentMetric] = useState('distance');
  
  const handleMetricChange = (metricKey) => {
    setCurrentMetric(metricKey);
  };
  
  if (!isDataLoaded || !fullData.length) {
    return <div>Loading comparison data...</div>;
  }
  
  const config = halvesMetricConfig[currentMetric];
  
  // Calculate averages directly from the data
  const calcAverage = (field) => {
    const validValues = fullData
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null")
      .map(val => parseFloat(val));
    
    if (validValues.length === 0) return 0;
    
    return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
  };
  
  const firstHalfAvg = calcAverage(config.firstHalfField);
  const secondHalfAvg = calcAverage(config.secondHalfField);
  const percentChange = firstHalfAvg > 0 ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100 : 0;
  
  // Calculate max values for first and second half
  const firstHalfMax = Math.max(
    ...fullData
      .map(row => row[config.firstHalfField])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null")
      .map(val => parseFloat(val))
  );
  
  const secondHalfMax = Math.max(
    ...fullData
      .map(row => row[config.secondHalfField])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null")
      .map(val => parseFloat(val))
  );
  
  const chartData = [
    { name: 'First Half', value: firstHalfAvg, fill: config.color1 },
    { name: 'Second Half', value: secondHalfAvg, fill: config.color2 }
  ];
  
  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <TooltipLabel>{label}</TooltipLabel>
          <TooltipValue>
            {config.title}: {formatNumberWithCommas(payload[0].value)} {config.unit}
          </TooltipValue>
        </CustomTooltip>
      );
    }
    return null;
  };
  
  const metrics = Object.keys(halvesMetricConfig).map(key => ({
    id: key,
    title: halvesMetricConfig[key].title
  }));
  
  // Custom reference arrow for the chart
  const CustomArrow = ({ x1, y1, x2, y2, label }) => {
    return (
      <g>
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon 
              points="0 0, 10 3.5, 0 7" 
              fill={percentChange < 0 ? '#e63946' : '#43aa8b'} 
            />
          </marker>
        </defs>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={percentChange < 0 ? '#e63946' : '#43aa8b'}
          strokeWidth="2"
          strokeDasharray="5,3"
          markerEnd="url(#arrowhead)"
        />
        <text
          x={(x1 + x2) / 2}
          y={(y1 + y2) / 2 - 15}
          textAnchor="middle"
          fill={percentChange < 0 ? '#e63946' : '#43aa8b'}
          fontWeight="bold"
          fontSize="14"
        >
          {formatNumber(percentChange)}%
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
              tickFormatter={(value) => formatNumberWithCommas(Math.round(value))}
            />
            <Tooltip content={renderCustomTooltip} />
            <Bar dataKey="value" fill={(entry) => entry.fill} radius={[4, 4, 0, 0]} />
            
            {/* Custom arrow with percentage change */}
            {Math.abs(percentChange) > 1 && (
              <CustomArrow 
                x1={100} 
                y1={400 - (400 * (firstHalfAvg / (Math.max(firstHalfAvg, secondHalfAvg) * 1.1)))} 
                x2={300} 
                y2={400 - (400 * (secondHalfAvg / (Math.max(firstHalfAvg, secondHalfAvg) * 1.1)))} 
                label={`${formatNumber(percentChange)}%`}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      <StatsRow>
        <StatCard>
          <StatTitle>Average First Half</StatTitle>
          <StatValue>{formatNumberWithCommas(firstHalfAvg)} {config.unit}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Average Second Half</StatTitle>
          <StatValue>{formatNumberWithCommas(secondHalfAvg)} {config.unit}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Average Change</StatTitle>
          <StatValue isNegative={percentChange < 0}>{formatNumber(percentChange)}%</StatValue>
          <StatChange isNegative={percentChange < 0}>
            {percentChange < 0 ? 'Decrease' : 'Increase'} in second half
          </StatChange>
        </StatCard>
        <StatCard>
          <StatTitle>Maximum First Half</StatTitle>
          <StatValue>{formatNumberWithCommas(firstHalfMax)} {config.unit}</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Maximum Second Half</StatTitle>
          <StatValue>{formatNumberWithCommas(secondHalfMax)} {config.unit}</StatValue>
        </StatCard>
      </StatsRow>
    </ComparisonContainer>
  );
};

export default HalvesComparison;