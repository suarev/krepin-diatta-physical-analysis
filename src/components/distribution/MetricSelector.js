import React from 'react';
import styled from 'styled-components';

const SelectorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`;

const MetricButton = styled.button`
  padding: 8px 16px;
  background-color: ${props => props.active ? '#C8102E' : '#eee'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? '#C8102E' : '#e0e0e0'};
  }
`;

const MetricSelector = ({ metrics, activeMetric, onChange }) => {
  return (
    <SelectorContainer>
      {metrics.map(metric => (
        <MetricButton 
          key={metric.id}
          active={activeMetric === metric.id}
          onClick={() => onChange(metric.id)}
        >
          {metric.title}
        </MetricButton>
      ))}
    </SelectorContainer>
  );
};

export default MetricSelector;