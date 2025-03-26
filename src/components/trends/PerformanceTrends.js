// src/components/trends/PerformanceTrends.js
import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useData } from '../../context/DataContext';
import { metricConfig } from '../../utils/metrics';
import { formatNumber } from '../../utils/formatting';

const TrendsContainer = styled.div`
  margin-bottom: 30px;
`;

const ChartContainer = styled.div`
  height: 400px;
  margin: 20px 0;
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const MetricSelector = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

const MetricCheckbox = styled.label`
  display: flex;
  align-items: center;
  background-color: #f5f7f9;
  padding: 6px 12px;
  border-radius: 15px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e6f0fa;
  }

  input {
    margin-right: 6px;
  }

  span {
    font-size: 14px;
    font-weight: 500;
  }
`;

const PositionSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const PositionLabel = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: #555;
`;

const PositionSelect = styled.select`
  padding: 6px 12px;
  border: 1px solid #ddd;
  border-radius: 15px;
  background-color: #f5f7f9;
  font-size: 14px;
  font-family: inherit;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #C8102E;
  }
`;

const ChartLegend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 10px;
  padding: 10px 0;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
`;

const LegendColor = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 6px;
  background-color: ${props => props.color};
`;

const CustomTooltip = styled.div`
  position: absolute;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 4px;
  font-size: 12px;
  pointer-events: none;
  z-index: 100;
  min-width: 150px;
  display: none;
`;

const TooltipTitle = styled.div`
  font-weight: 600;
  margin-bottom: 5px;
  font-size: 13px;
`;

const TooltipMetrics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const TooltipMetric = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TooltipValue = styled.span`
  font-weight: 600;
  margin-left: 10px;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 40px;
  font-style: italic;
  color: #777;
`;

const PerformanceTrends = () => {
  const { fullData, isDataLoaded } = useData();
  const [selectedMetrics, setSelectedMetrics] = useState(['distance', 'hsrDistance']);
  const [selectedPosition, setSelectedPosition] = useState('all');
  
  // Format date function to prevent "Invalid Date" issues
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
      // Try different formats
      const formats = [
        // Standard format (yyyy-mm-dd)
        (str) => {
          const date = new Date(str);
          return !isNaN(date.getTime()) ? 
            date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
        },
        // DD/MM/YYYY format
        (str) => {
          const parts = str.split('/');
          if (parts.length === 3) {
            const date = new Date(parts[2], parts[1] - 1, parts[0]);
            return !isNaN(date.getTime()) ? 
              date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
          }
          return null;
        }
      ];
      
      // Try each format
      for (const format of formats) {
        const formatted = format(dateString);
        if (formatted) return formatted;
      }
    } catch (error) {
      // If any error occurs, return the original string
      console.log("Date formatting error:", error);
    }
    
    // If all else fails, just return the original string
    return dateString;
  };
  
  const filteredData = useMemo(() => {
    if (!isDataLoaded || !fullData.length) return [];
    
    return selectedPosition === 'all' 
      ? fullData 
      : fullData.filter(match => match['Position Group'] === selectedPosition);
  }, [isDataLoaded, fullData, selectedPosition]);
  
  const chartData = useMemo(() => {
    if (!isDataLoaded || !filteredData.length) return [];
    
    return filteredData.map((match, index) => {
      const dataPoint = {
        // Just use index instead of match name for cleaner x-axis
        name: `Match ${index + 1}`,
        // Store the original match name for tooltip
        matchName: match.Match || `Match ${index + 1}`,
        date: match.Date,
        matchIndex: index,
        position: match['Position Group'] || 'Unknown'
      };
      
      // Add all possible metrics to the data point
      Object.keys(metricConfig).forEach(metricKey => {
        const config = metricConfig[metricKey];
        dataPoint[metricKey] = parseFloat(match[config.field]) || 0;
      });
      
      return dataPoint;
    });
  }, [isDataLoaded, filteredData]);
  
  // Get unique positions from the data
  const positions = useMemo(() => {
    if (!isDataLoaded || !fullData.length) return [];
    
    const allPositions = fullData.map(match => match['Position Group']).filter(Boolean);
    return ['all', ...Array.from(new Set(allPositions))];
  }, [isDataLoaded, fullData]);
  
  const handleMetricToggle = (metricKey) => {
    setSelectedMetrics(prev => {
      if (prev.includes(metricKey)) {
        return prev.filter(m => m !== metricKey);
      } else {
        return [...prev, metricKey];
      }
    });
  };
  
  const handlePositionChange = (e) => {
    setSelectedPosition(e.target.value);
  };
  
  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const matchData = payload[0].payload;
      
      return (
        <div className="custom-tooltip" style={{
          backgroundColor: '#fff',
          padding: '10px',
          border: '1px solid #ddd',
          borderRadius: '4px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
        }}>
          <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>
            {matchData.matchName} ({formatDate(matchData.date)})
          </p>
          <p style={{ margin: '0 0 5px 0', fontSize: '13px' }}>
            <b>Position:</b> {matchData.position}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ margin: '0 0 3px 0', fontSize: '13px', color: entry.color }}>
              <b>{metricConfig[entry.dataKey].title}:</b> {formatNumber(entry.value)}
              {metricConfig[entry.dataKey].unit ? ` ${metricConfig[entry.dataKey].unit}` : ''}
            </p>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  // Show tooltip on hover of data points
  const showTooltip = (event) => {
    const tooltip = document.querySelector('.chart-tooltip');
    const matchIndex = this.getAttribute('data-match-index');
    const metricKey = this.getAttribute('data-metric');
    const match = filteredData[matchIndex];
    const config = metricConfig[metricKey];
    
    // Format tooltip content
    const title = document.querySelector('.tooltip-title');
    title.textContent = match.Match ? match.Match : `Match ${parseInt(matchIndex) + 1}`;
    
    const metrics = document.querySelector('.tooltip-metrics');
    metrics.innerHTML = '';
    
    // Add position
    const positionRow = document.createElement('div');
    positionRow.className = 'tooltip-metric';
    
    const positionLabel = document.createElement('span');
    positionLabel.textContent = 'Position:';
    
    const positionValue = document.createElement('span');
    positionValue.className = 'tooltip-value';
    positionValue.textContent = match['Position Group'] || 'Unknown';
    
    positionRow.appendChild(positionLabel);
    positionRow.appendChild(positionValue);
    metrics.appendChild(positionRow);
    
    // Add date
    const dateRow = document.createElement('div');
    dateRow.className = 'tooltip-metric';
    
    const dateLabel = document.createElement('span');
    dateLabel.textContent = 'Date:';
    
    const dateValue = document.createElement('span');
    dateValue.className = 'tooltip-value';
    dateValue.textContent = formatDate(match.Date) || 'Unknown';
    
    dateRow.appendChild(dateLabel);
    dateRow.appendChild(dateValue);
    metrics.appendChild(dateRow);
    
    // Add highlighted metric
    const metricRow = document.createElement('div');
    metricRow.className = 'tooltip-metric';
    
    const metricLabel = document.createElement('span');
    metricLabel.textContent = `${config.title}:`;
    
    const metricValue = document.createElement('span');
    metricValue.className = 'tooltip-value';
    metricValue.textContent = `${formatNumber(match[config.field])}${config.unit ? ` ${config.unit}` : ''}`;
    
    metricRow.appendChild(metricLabel);
    metricRow.appendChild(metricValue);
    metrics.appendChild(metricRow);
    
    // Add minutes played
    const minutesRow = document.createElement('div');
    minutesRow.className = 'tooltip-metric';
    
    const minutesLabel = document.createElement('span');
    minutesLabel.textContent = 'Minutes:';
    
    const minutesValue = document.createElement('span');
    minutesValue.className = 'tooltip-value';
    minutesValue.textContent = formatNumber(match.Minutes);
    
    minutesRow.appendChild(minutesLabel);
    minutesRow.appendChild(minutesValue);
    metrics.appendChild(minutesRow);
    
    // Position tooltip near cursor
    tooltip.style.left = `${event.clientX + 10}px`;
    tooltip.style.top = `${event.clientY + 10}px`;
    
    // Show tooltip
    tooltip.style.display = 'block';
  };
  
  // Hide tooltip
  const hideTooltip = () => {
    const tooltip = document.querySelector('.chart-tooltip');
    tooltip.style.display = 'none';
  };
  
  if (!isDataLoaded) {
    return <div>Loading trend data...</div>;
  }
  
  if (filteredData.length === 0) {
    return (
      <EmptyMessage>
        No match data available {selectedPosition !== 'all' ? `for position: ${selectedPosition}` : ''}
      </EmptyMessage>
    );
  }
  
  return (
    <TrendsContainer>
      <FilterSection>
        <MetricSelector>
          {Object.keys(metricConfig).map(metricKey => (
            <MetricCheckbox key={metricKey}>
              <input 
                type="checkbox" 
                checked={selectedMetrics.includes(metricKey)} 
                onChange={() => handleMetricToggle(metricKey)}
              />
              <span>{metricConfig[metricKey].title}</span>
            </MetricCheckbox>
          ))}
        </MetricSelector>
        
        <PositionSelector>
          <PositionLabel>Position:</PositionLabel>
          <PositionSelect value={selectedPosition} onChange={handlePositionChange}>
            {positions.map(position => (
              <option key={position} value={position}>
                {position === 'all' ? 'All Positions' : position}
              </option>
            ))}
          </PositionSelect>
        </PositionSelector>
      </FilterSection>
      
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              label={{ 
                value: 'Matches', 
                position: 'bottom',
                offset: 0, 
                dy: 15
              }}
              // Show fewer ticks to reduce overlap
              tick={{ fontSize: 12 }}
              interval={Math.ceil(chartData.length / 8)}
            />
            <YAxis />
            <Tooltip content={renderCustomTooltip} />
            <Legend 
              verticalAlign="top"
              align="center"
              wrapperStyle={{ paddingBottom: 10 }}
            />
            {selectedMetrics.map(metricKey => {
              const config = metricConfig[metricKey];
              return (
                <Line
                  key={metricKey}
                  type="monotone"
                  dataKey={metricKey}
                  name={config.title}
                  stroke={config.color}
                  activeDot={{ r: 6 }}
                  dot={{ r: 3 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      <ChartLegend>
        {selectedMetrics.map(metricKey => {
          const config = metricConfig[metricKey];
          return (
            <LegendItem key={metricKey}>
              <LegendColor color={config.color} />
              {config.title}
            </LegendItem>
          );
        })}
      </ChartLegend>
      
      <CustomTooltip className="chart-tooltip">
        <TooltipTitle>Match vs Opponent</TooltipTitle>
        <TooltipMetrics>
          <TooltipMetric>
            <span>Metric:</span>
            <TooltipValue>Value</TooltipValue>
          </TooltipMetric>
        </TooltipMetrics>
      </CustomTooltip>
    </TrendsContainer>
  );
};

export default PerformanceTrends;