import React, { useMemo } from 'react';
import styled from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '../../context/DataContext';
import { createHistogram } from '../../utils/dataProcessing';
import { metricConfig } from '../../utils/metrics';
import { formatNumber, formatNumberWithCommas } from '../../utils/formatting';

const ChartContainer = styled.div`
  height: 300px;
  margin: 20px 0;
  position: relative;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const StatBox = styled.div`
  flex: 1;
  min-width: 120px;
  background-color: #f9f9f7;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #C8102E;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #777;
  text-transform: uppercase;
`;

const CustomTooltip = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TooltipLabel = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
`;

const TooltipContent = styled.div`
  font-size: 14px;
`;

const DistributionChart = ({ metricKey }) => {
  const { getFilteredData, isDataLoaded } = useData();
  
  const config = metricConfig[metricKey];
  const filteredData = getFilteredData();
  
  const histogramData = useMemo(() => {
    if (!isDataLoaded || !filteredData.length) return [];
    return createHistogram(filteredData, config.field, config.binSize, config.maxValue);
  }, [isDataLoaded, filteredData, config]);
  
  const stats = useMemo(() => {
    if (!isDataLoaded || !filteredData.length) return null;
    
    // Calculate statistics for this metric
    const validValues = filteredData
      .map(row => row[config.field])
      .filter(val => val !== undefined && val !== null && !isNaN(val));
    
    if (validValues.length === 0) return null;
    
    const sum = validValues.reduce((total, val) => total + parseFloat(val), 0);
    const avg = sum / validValues.length;
    
    const sortedValues = [...validValues].sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    const median = sortedValues.length % 2 !== 0
      ? sortedValues[mid]
      : (sortedValues[mid - 1] + sortedValues[mid]) / 2;
    
    const max = Math.max(...validValues);
    const min = Math.min(...validValues);
    
    // Calculate standard deviation
    const squareDiffs = validValues.map(value => {
      const diff = value - avg;
      return diff * diff;
    });
    const avgSquareDiff = squareDiffs.reduce((sum, value) => sum + value, 0) / squareDiffs.length;
    const stdDev = Math.sqrt(avgSquareDiff);
    
    return { avg, median, max, min, stdDev };
  }, [isDataLoaded, filteredData, config]);
  
  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const binData = payload[0].payload;
      return (
        <CustomTooltip>
          <TooltipLabel>{`${binData.minValue} - ${binData.maxValue} ${config.unit}`}</TooltipLabel>
          <TooltipContent>{`${binData.count} match${binData.count !== 1 ? 'es' : ''}`}</TooltipContent>
        </CustomTooltip>
      );
    }
    return null;
  };
  
  if (!isDataLoaded || !stats) {
    return <div>Loading distribution data...</div>;
  }
  
  return (
    <>
      <StatsContainer>
        <StatBox>
          <StatValue>{formatNumber(stats.avg)}{config.unit}</StatValue>
          <StatLabel>Average</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{formatNumber(stats.median)}{config.unit}</StatValue>
          <StatLabel>Median</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{formatNumber(stats.max)}{config.unit}</StatValue>
          <StatLabel>Maximum</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{formatNumber(stats.min)}{config.unit}</StatValue>
          <StatLabel>Minimum</StatLabel>
        </StatBox>
        <StatBox>
          <StatValue>{formatNumber(stats.stdDev)}{config.unit}</StatValue>
          <StatLabel>Std. Dev.</StatLabel>
        </StatBox>
      </StatsContainer>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={histogramData}
            margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="minValue" 
              label={{ 
                value: config.xAxisTitle, 
                position: 'bottom', 
                offset: 0,
                style: { textAnchor: 'middle' }
              }}
              tickFormatter={(value) => formatNumberWithCommas(value)}
            />
            <YAxis 
              label={{ 
                value: 'Number of Matches', 
                angle: -90, 
                position: 'insideLeft',
                style: { textAnchor: 'middle' } 
              }}
            />
            <Tooltip content={renderCustomTooltip} />
            <Bar 
              dataKey="count" 
              fill={config.color}
              radius={[4, 4, 0, 0]}
              name="Matches"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </>
  );
};

export default DistributionChart;