import React, { useState } from 'react';
import styled from 'styled-components';
import PerformanceTrends from '../components/trends/PerformanceTrends';
import MatchSelector from '../components/trends/MatchSelector';
import MatchDetail from '../components/trends/MatchDetail';
import { useData } from '../context/DataContext';

const TrendsContainer = styled.div`
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

const TrendsBox = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  margin-bottom: 25px;
`;

const TrendsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TrendsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #111;
`;

const TrendsSubtitle = styled.div`
  font-size: 14px;
  color: #777;
  margin-top: 5px;
`;

const TrendsPage = () => {
  const { isDataLoaded } = useData();
  const [selectedMatch, setSelectedMatch] = useState(null);
  
  if (!isDataLoaded) {
    return <div>Please upload data to view match trends.</div>;
  }
  
  return (
    <TrendsContainer>
      <SectionTitle>Match-by-Match Performance Trends</SectionTitle>
      
      <TrendsBox>
        <TrendsHeader>
          <div>
            <TrendsTitle>Physical Performance Evolution</TrendsTitle>
            <TrendsSubtitle>Select metrics to display on the chart</TrendsSubtitle>
          </div>
        </TrendsHeader>
        
        <PerformanceTrends />
      </TrendsBox>
      
      <TrendsBox>
        <TrendsHeader>
          <div>
            <TrendsTitle>Match Breakdown Analysis</TrendsTitle>
            <TrendsSubtitle>Select a match to see detailed performance metrics</TrendsSubtitle>
          </div>
        </TrendsHeader>
        
        <MatchSelector 
          selectedMatch={selectedMatch}
          onSelectMatch={setSelectedMatch}
        />
        
        <MatchDetail match={selectedMatch} />
      </TrendsBox>
    </TrendsContainer>
  );
};

export default TrendsPage;