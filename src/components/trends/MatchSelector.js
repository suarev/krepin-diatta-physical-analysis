import React from 'react';
import styled from 'styled-components';
import { useData } from '../../context/DataContext';
import { formatDate } from '../../utils/formatting';

const SelectorContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 20px;
`;

const SelectBox = styled.select`
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  font-family: inherit;
  font-size: 14px;
  width: 100%;
  max-width: 400px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
`;

const MatchSelector = ({ selectedMatch, onSelectMatch }) => {
  const { fullData, isDataLoaded } = useData();
  
  const handleChange = (e) => {
    const index = parseInt(e.target.value);
    onSelectMatch(index >= 0 ? fullData[index] : null);
  };
  
  if (!isDataLoaded || !fullData.length) {
    return <div>No match data available.</div>;
  }
  
  return (
    <SelectorContainer>
      <SelectBox
        value={selectedMatch ? fullData.indexOf(selectedMatch) : ''}
        onChange={handleChange}
      >
        <option value="">Select a match to analyze</option>
        {fullData.map((match, index) => (
          <option key={index} value={index}>
            {match.Match || `Match ${index + 1}`} ({formatDate(match.Date)})
          </option>
        ))}
      </SelectBox>
    </SelectorContainer>
  );
};

export default MatchSelector;