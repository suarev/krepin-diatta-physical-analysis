import React, { useState } from 'react';
import styled from 'styled-components';
import { metricConfig } from '../utils/metrics';
import MetricSelector from '../components/distribution/MetricSelector';
import DistributionChart from '../components/distribution/DistributionChart';
import MatchList from '../components/distribution/MatchList';
import { useData } from '../context/DataContext';

const DistributionContainer = styled.div`
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

const DistributionBox = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 25px;
`;

const DistributionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DistributionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111;
`;

const DistributionSubtitle = styled.div`
  font-size: 14px;
  color: #777;
  margin-top: 5px;
`;

const DistributionPage = () => {
  const { isDataLoaded, selectedPosition } = useData();
  const [currentMetric, setCurrentMetric] = useState('hsrDistance');
  
  const metrics = Object.keys(metricConfig).map(key => ({
    id: key,
    title: metricConfig[key].title
  }));
  
  if (!isDataLoaded) {
    return <div>Please upload data to view distribution analysis.</div>;
  }
  
  const config = metricConfig[currentMetric];
  
  return (
    <DistributionContainer>
      <SectionTitle>Detailed Physical Metric Analysis</SectionTitle>
      
      <MetricSelector 
        metrics={metrics}
        activeMetric={currentMetric}
        onChange={setCurrentMetric}
      />
      
      <DistributionBox>
        <DistributionHeader>
          <div>
            <DistributionTitle>{config.title} Distribution</DistributionTitle>
            <DistributionSubtitle>
              Analysis {selectedPosition !== 'all' ? `for ${selectedPosition} position` : 'across all positions'}
            </DistributionSubtitle>
          </div>
        </DistributionHeader>
        
        <DistributionChart metricKey={currentMetric} />
      </DistributionBox>
      
      <DistributionBox>
        <DistributionHeader>
          <div>
            <DistributionTitle>Match-by-Match {config.title} Performance</DistributionTitle>
            <DistributionSubtitle>Click on a match to see detailed breakdown</DistributionSubtitle>
          </div>
        </DistributionHeader>
        
        <MatchList 
          metricKey={currentMetric}
          metricConfig={config}
        />
      </DistributionBox>
    </DistributionContainer>
  );
};

export default DistributionPage;