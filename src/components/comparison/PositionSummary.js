// src/components/comparison/PositionSummary.js
import React from 'react';
import styled from 'styled-components';
import { useData } from '../../context/DataContext';
import { formatNumber, formatNumberWithCommas } from '../../utils/formatting';

const SummaryContainer = styled.div`
  margin-top: 30px;
`;

const PositionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 30px;
`;

const PositionCard = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const PositionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #C8102E;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const ComparisonTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
`;

const TableHeader = styled.thead`
  background-color: #f5f5f5;
  
  th {
    padding: 12px 15px;
    text-align: left;
    font-weight: 600;
    font-size: 15px;
    border-bottom: 2px solid #eee;
  }
`;

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }
`;

const MetricName = styled.div`
  font-weight: 500;
`;

const MetricValue = styled.div`
  font-weight: 600;
  color: ${props => props.isHighlighted ? '#C8102E' : '#333'};
`;

const ComparisonValue = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: ${props => props.isPositive ? '#43aa8b' : (props.isNegative ? '#e63946' : '#333')};
`;

const ComparisonIndicator = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 5px;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    margin-right: 5px;
    border-radius: 50%;
    background-color: ${props => props.isPositive ? '#43aa8b' : (props.isNegative ? '#e63946' : '#777')};
  }
`;

const SectionHeader = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 30px 0 20px 0;
  color: #333;
  text-align: center;
`;

const NoPositionMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-style: italic;
  color: #777;
`;

const PositionSummary = () => {
  const { playerAverages, isDataLoaded } = useData();
  
  if (!isDataLoaded || !playerAverages) {
    return <div>Loading position data...</div>;
  }
  
  const positionData = playerAverages.byPosition;
  const positions = Object.keys(positionData);
  
  // Skip this component if there's only one position
  if (positions.length <= 1) {
    return (
      <SummaryContainer>
        <NoPositionMessage>
          Player has only played in one position ({positions[0]})
        </NoPositionMessage>
      </SummaryContainer>
    );
  }

  // Key metrics to compare
  const metrics = [
    { key: 'distanceP90', name: 'Distance/90', unit: 'm', format: (val) => Math.round(val).toLocaleString() },
    { key: 'hsrDistanceP90', name: 'HSR/90', unit: 'm', format: (val) => Math.round(val).toLocaleString() },
    { key: 'sprintDistanceP90', name: 'Sprint/90', unit: 'm', format: (val) => Math.round(val).toLocaleString() },
    { key: 'hiCountP90', name: 'HI Count/90', unit: '', format: (val) => formatNumber(val) },
    { key: 'highAccelP90', name: 'High Accel/90', unit: '', format: (val) => formatNumber(val) },
    { key: 'mediumAccelP90', name: 'Medium Accel/90', unit: '', format: (val) => formatNumber(val) },
    { key: 'explosiveAccelHSRP90', name: 'Explosive to HSR/90', unit: '', format: (val) => formatNumber(val) },
    { key: 'explosiveAccelSprintP90', name: 'Explosive to Sprint/90', unit: '', format: (val) => formatNumber(val) },
    { key: 'highDecelP90', name: 'High Decel/90', unit: '', format: (val) => formatNumber(val) },
    { key: 'mediumDecelP90', name: 'Medium Decel/90', unit: '', format: (val) => formatNumber(val) },
    { key: 'sprintCountP90', name: 'Sprint Count/90', unit: '', format: (val) => formatNumber(val) }
  ];
  
  return (
    <SummaryContainer>
      <SectionHeader>Performance Comparison by Position</SectionHeader>
      
      <PositionGrid>
        <PositionCard>
          <PositionTitle>
            Position Comparison: {positions.join(' vs. ')}
          </PositionTitle>
          
          <ComparisonTable>
            <TableHeader>
              <tr>
                <th>Metric</th>
                {positions.map(position => (
                  <th key={position}>{position} ({positionData[position].matches} matches)</th>
                ))}
                <th>Comparison</th>
              </tr>
            </TableHeader>
            <TableBody>
              {metrics.map(metric => {
                // Find the position with the highest value for this metric
                const values = positions.map(position => positionData[position][metric.key] || 0);
                const maxValue = Math.max(...values);
                const maxPosition = positions[values.indexOf(maxValue)];
                
                return (
                  <tr key={metric.key}>
                    <td>
                      <MetricName>{metric.name}</MetricName>
                    </td>
                    {positions.map(position => {
                      const value = positionData[position][metric.key] || 0;
                      const isHighest = value === maxValue && value > 0;
                      
                      return (
                        <td key={position}>
                          <MetricValue isHighlighted={isHighest}>
                            {metric.format(value)}{metric.unit}
                          </MetricValue>
                        </td>
                      );
                    })}
                    <td>
                      {positions.length === 2 && (
                        <ComparisonValue 
                          isPositive={positionData[positions[0]][metric.key] > positionData[positions[1]][metric.key]}
                          isNegative={positionData[positions[0]][metric.key] < positionData[positions[1]][metric.key]}
                        >
                          <ComparisonIndicator 
                            isPositive={positionData[positions[0]][metric.key] > positionData[positions[1]][metric.key]}
                            isNegative={positionData[positions[0]][metric.key] < positionData[positions[1]][metric.key]}
                          />
                          {positionData[positions[0]][metric.key] !== 0 && positionData[positions[1]][metric.key] !== 0 
                            ? formatNumber(((positionData[positions[0]][metric.key] / positionData[positions[1]][metric.key]) - 1) * 100) + '%'
                            : 'N/A'}
                        </ComparisonValue>
                      )}
                      {positions.length > 2 && (
                        <ComparisonValue>
                          {maxPosition} highest
                        </ComparisonValue>
                      )}
                    </td>
                  </tr>
                );
              })}
              
              {/* Add specific comparisons for first/second half and TIP/OTIP differences */}
              <tr>
                <td colSpan={positions.length + 2} style={{ backgroundColor: '#f5f5f5', fontWeight: 'bold', paddingTop: 20 }}>
                  Additional Comparisons
                </td>
              </tr>
              <tr>
                <td>
                  <MetricName>First/Second Half Diff</MetricName>
                </td>
                {positions.map(position => {
                  const data = positionData[position];
                  const diff = data.firstHalfDistance && data.secondHalfDistance 
                    ? ((data.secondHalfDistance - data.firstHalfDistance) / data.firstHalfDistance) * 100
                    : null;
                  
                  return (
                    <td key={position}>
                      <ComparisonValue isPositive={diff > 0} isNegative={diff < 0}>
                        {diff !== null ? formatNumber(diff) + '%' : 'N/A'}
                      </ComparisonValue>
                    </td>
                  );
                })}
                <td>
                  {positions.length === 2 && (
                    <ComparisonValue>
                      {/* Can add comparison between the differences if needed */}
                      -
                    </ComparisonValue>
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <MetricName>TIP/OTIP Distance Diff</MetricName>
                </td>
                {positions.map(position => {
                  const data = positionData[position];
                  const diff = data.tipDistancePerMin && data.otipDistancePerMin 
                    ? ((data.otipDistancePerMin - data.tipDistancePerMin) / data.tipDistancePerMin) * 100
                    : null;
                  
                  return (
                    <td key={position}>
                      <ComparisonValue isPositive={diff > 0} isNegative={diff < 0}>
                        {diff !== null ? formatNumber(diff) + '%' : 'N/A'}
                      </ComparisonValue>
                    </td>
                  );
                })}
                <td>
                  {positions.length === 2 && (
                    <ComparisonValue>
                      {/* Can add comparison between the differences if needed */}
                      -
                    </ComparisonValue>
                  )}
                </td>
              </tr>
            </TableBody>
          </ComparisonTable>
        </PositionCard>
      </PositionGrid>
    </SummaryContainer>
  );
};

export default PositionSummary;