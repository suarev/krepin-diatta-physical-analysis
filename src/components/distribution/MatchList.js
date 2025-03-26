import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useData } from '../../context/DataContext';
import { formatNumber } from '../../utils/formatting';
import { formatDate } from '../../utils/formatting';

const ListContainer = styled.div`
  max-height: 400px;
  overflow-y: auto;
  margin-top: 20px;
  border: 1px solid #eee;
  border-radius: 5px;
`;

const ListHeader = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding: 10px 15px;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 10;
`;

const MatchRow = styled.div`
  display: flex;
  padding: 8px 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: ${props => props.selected ? '#e6f0fa' : 'transparent'};

  &:hover {
    background-color: ${props => props.selected ? '#e6f0fa' : '#f9f9f7'};
  }
`;

const Cell = styled.div`
  flex: ${props => props.width || 1};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
`;

const MatchDetail = styled.div`
  margin-top: 20px;
  background-color: #f9f9f7;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
`;

const DetailTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
`;

const DetailItem = styled.div`
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const DetailLabel = styled.div`
  font-size: 12px;
  color: #777;
  margin-bottom: 3px;
`;

const DetailValue = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const MatchList = ({ metricKey, metricConfig }) => {
  const { getFilteredData, isDataLoaded } = useData();
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  const sortedMatches = useMemo(() => {
    if (!isDataLoaded) return [];
    
    const filteredData = getFilteredData();
    
    // Sort by the metric value (descending)
    return [...filteredData].sort((a, b) => {
      const valueA = parseFloat(a[metricConfig.field]) || 0;
      const valueB = parseFloat(b[metricConfig.field]) || 0;
      return valueB - valueA;
    });
  }, [isDataLoaded, getFilteredData, metricConfig]);
  
  const handleSelectMatch = (match) => {
    setSelectedMatch(match);
  };
  
  if (!isDataLoaded || !sortedMatches.length) {
    return <div>No match data available.</div>;
  }
  
  return (
    <>
      <ListContainer>
        <ListHeader>
          <Cell width={2}>Match</Cell>
          <Cell>Date</Cell>
          <Cell>{metricConfig.title}</Cell>
          <Cell>{metricConfig.countField ? metricConfig.title.replace('Distance', 'Count') : 'Minutes'}</Cell>
          <Cell>Minutes</Cell>
        </ListHeader>
        {sortedMatches.map((match, index) => (
          <MatchRow 
            key={index}
            selected={selectedMatch === match}
            onClick={() => handleSelectMatch(match)}
          >
            <Cell width={2}>{match.Match || 'Unknown'}</Cell>
            <Cell>{formatDate(match.Date) || 'Unknown'}</Cell>
            <Cell>
              {formatNumber(match[metricConfig.field])}
              {metricConfig.unit ? ` ${metricConfig.unit}` : ''}
            </Cell>
            <Cell>
              {metricConfig.countField 
                ? formatNumber(match[metricConfig.countField]) 
                : formatNumber(match.Minutes)}
            </Cell>
            <Cell>{formatNumber(match.Minutes)}</Cell>
          </MatchRow>
        ))}
      </ListContainer>
      
      {selectedMatch && (
        <MatchDetail>
          <DetailTitle>Match Details: {selectedMatch.Match}</DetailTitle>
          <DetailGrid>
            <DetailItem>
              <DetailLabel>Date</DetailLabel>
              <DetailValue>{formatDate(selectedMatch.Date)}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Position</DetailLabel>
              <DetailValue>{selectedMatch['Position Group'] || 'N/A'}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Minutes</DetailLabel>
              <DetailValue>{formatNumber(selectedMatch.Minutes)} mins</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Distance</DetailLabel>
              <DetailValue>{formatNumber(selectedMatch.Distance)} m</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Distance/min</DetailLabel>
              <DetailValue>{formatNumber(selectedMatch['M/min'])} m/min</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>HSR Distance</DetailLabel>
              <DetailValue>{formatNumber(selectedMatch['HSR Distance'])} m</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Sprint Distance</DetailLabel>
              <DetailValue>{formatNumber(selectedMatch['Sprint Distance'])} m</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>High Accelerations</DetailLabel>
              <DetailValue>{formatNumber(selectedMatch['High Acceleration Count'])}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Medium Accelerations</DetailLabel>
              <DetailValue>{formatNumber(selectedMatch['Medium Acceleration Count'])}</DetailValue>
            </DetailItem>
            <DetailItem>
              <DetailLabel>Explosive Accelerations</DetailLabel>
              <DetailValue>{formatNumber(selectedMatch['Explosive Acceleration to HSR Count'])}</DetailValue>
            </DetailItem>
          </DetailGrid>
        </MatchDetail>
      )}
    </>
  );
};

export default MatchList;