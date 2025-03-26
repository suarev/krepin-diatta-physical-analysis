import React from 'react';
import styled from 'styled-components';
import HalvesComparison from '../components/comparison/HalvesComparison';
import PossessionComparison from '../components/comparison/PossessionComparison';
import PositionSummary from '../components/comparison/PositionSummary';
import { useData } from '../context/DataContext';

const ComparisonContainer = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  margin: 30px 0 15px 0;
  color: #111;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 10px;
`;

const ComparisonBox = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 25px;
`;

const ComparisonHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ComparisonTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111;
`;

const ComparisonSubtitle = styled.div`
  font-size: 14px;
  color: #777;
  margin-top: 5px;
`;

const ComparisonPage = () => {
  const { isDataLoaded } = useData();
  
  if (!isDataLoaded) {
    return <div>Please upload data to view comparisons.</div>;
  }
  
  return (
    <ComparisonContainer>
      <SectionTitle>First vs Second Half Analysis</SectionTitle>
      <ComparisonBox>
        <ComparisonHeader>
          <div>
            <ComparisonTitle>How Diatta's Physical Metrics Change Between Halves</ComparisonTitle>
            <ComparisonSubtitle>Select a metric to visualize the change</ComparisonSubtitle>
          </div>
        </ComparisonHeader>
        
        <HalvesComparison />
      </ComparisonBox>
      
      <SectionTitle>In vs Out of Possession Analysis</SectionTitle>
      <ComparisonBox>
        <ComparisonHeader>
          <div>
            <ComparisonTitle>How Diatta's Physical Output Changes With Possession</ComparisonTitle>
            <ComparisonSubtitle>Select a metric to visualize the difference</ComparisonSubtitle>
          </div>
        </ComparisonHeader>
        
        <PossessionComparison />
      </ComparisonBox>
      
      <SectionTitle>Position-Based Summary</SectionTitle>
      <ComparisonBox>
        <ComparisonHeader>
          <div>
            <ComparisonTitle>Physical Performance by Position</ComparisonTitle>
            <ComparisonSubtitle>Summary of key metrics across different positions played</ComparisonSubtitle>
          </div>
        </ComparisonHeader>
        
        <PositionSummary />
      </ComparisonBox>
    </ComparisonContainer>
  );
};

export default ComparisonPage;