import React from 'react';
import styled from 'styled-components';
import { formatNumber, formatDate } from '../../utils/formatting';

const DetailContainer = styled.div`
  margin-top: 20px;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const DetailTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 5px;
  color: #111;
`;

const DetailSubtitle = styled.div`
  font-size: 14px;
  color: #777;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 30px;
`;

const DetailCard = styled.div`
  background-color: #f5f7f9;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const DetailCardTitle = styled.div`
  font-size: 14px;
  color: #777;
  margin-bottom: 5px;
`;

const DetailCardValue = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #C8102E;
`;

const ComparisonSection = styled.div`
  margin-top: 30px;
`;

const ComparisonTitle = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const HalvesComparison = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const HalfColumn = styled.div`
  flex: 1;
  background-color: #f5f7f9;
  padding: 15px;
  border-radius: 5px;
`;

const HalfTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

const MetricsTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const MetricRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 3px 0;
  border-bottom: 1px solid #eee;
`;

const MetricLabel = styled.span``;

const MetricValue = styled.span`
  font-weight: 600;
  color: #C8102E;
`;

const PossessionComparison = styled.div`
  display: flex;
  gap: 20px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PossessionColumn = styled.div`
  flex: 1;
  padding: 15px;
  border-radius: 5px;
  background-color: ${props => props.type === 'possession' ? '#e6f3ff' : '#fff0e6'};
`;

const PossessionTitle = styled.div`
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: center;
`;

const PossessionMetric = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  padding: 3px 0;
  border-bottom: 1px solid rgba(0,0,0,0.05);
`;

const PossessionLabel = styled.span``;

const PossessionValue = styled.span`
  font-weight: 600;
  color: ${props => props.type === 'possession' ? '#C8102E' : '#e65c00'};
`;

const MatchDetail = ({ match }) => {
  if (!match) {
    return (
      <DetailContainer>
        <DetailHeader>
          <DetailTitle>Match Breakdown Analysis</DetailTitle>
        </DetailHeader>
        <div>Select a match to view its detailed breakdown.</div>
      </DetailContainer>
    );
  }
  
  return (
    <DetailContainer>
      <DetailHeader>
        <div>
          <DetailTitle>Match Breakdown: {match.Match}</DetailTitle>
          <DetailSubtitle>{formatDate(match.Date)}</DetailSubtitle>
        </div>
      </DetailHeader>
      
      <DetailGrid>
        <DetailCard>
          <DetailCardTitle>Position</DetailCardTitle>
          <DetailCardValue>{match['Position Group'] || 'Unknown'}</DetailCardValue>
        </DetailCard>
        <DetailCard>
          <DetailCardTitle>Minutes Played</DetailCardTitle>
          <DetailCardValue>{formatNumber(match.Minutes)} min</DetailCardValue>
        </DetailCard>
        <DetailCard>
          <DetailCardTitle>Total Distance</DetailCardTitle>
          <DetailCardValue>{formatNumber(match.Distance)} m</DetailCardValue>
        </DetailCard>
        <DetailCard>
          <DetailCardTitle>Distance/min</DetailCardTitle>
          <DetailCardValue>{formatNumber(match['M/min'])} m/min</DetailCardValue>
        </DetailCard>
        <DetailCard>
          <DetailCardTitle>HSR Distance</DetailCardTitle>
          <DetailCardValue>{formatNumber(match['HSR Distance'])} m</DetailCardValue>
        </DetailCard>
        <DetailCard>
          <DetailCardTitle>Sprint Distance</DetailCardTitle>
          <DetailCardValue>{formatNumber(match['Sprint Distance'])} m</DetailCardValue>
        </DetailCard>
        <DetailCard>
          <DetailCardTitle>Top Speed</DetailCardTitle>
          <DetailCardValue>{formatNumber(match['PSV-99'])} km/h</DetailCardValue>
        </DetailCard>
        <DetailCard>
          <DetailCardTitle>High Intensity Count</DetailCardTitle>
          <DetailCardValue>{formatNumber(match['HI Count'])}</DetailCardValue>
        </DetailCard>
      </DetailGrid>
      
      <ComparisonSection>
        <ComparisonTitle>Half-by-Half Comparison</ComparisonTitle>
        <HalvesComparison>
          <HalfColumn>
            <HalfTitle>First Half Performance</HalfTitle>
            <MetricsTable>
              <MetricRow>
                <MetricLabel>Distance:</MetricLabel>
                <MetricValue>{formatNumber(match['Distance 1'])} m</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Distance/min:</MetricLabel>
                <MetricValue>
                  {match['Minutes 1'] ? formatNumber(match['Distance 1'] / match['Minutes 1']) : 'N/A'} m/min
                </MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>HSR Distance:</MetricLabel>
                <MetricValue>{formatNumber(match['HSR Distance 1'])} m</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Sprint Distance:</MetricLabel>
                <MetricValue>{formatNumber(match['Sprint Distance 1'])} m</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>HI Count:</MetricLabel>
                <MetricValue>{formatNumber(match['HI Count 1'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>High Accel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['High Acceleration Count 1'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Medium Accel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['Medium Acceleration Count 1'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Explosive Accel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['Explosive Acceleration to HSR Count 1'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>High Decel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['High Deceleration Count 1'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Medium Decel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['Medium Deceleration Count 1'])}</MetricValue>
              </MetricRow>
            </MetricsTable>
          </HalfColumn>
          
          <HalfColumn>
            <HalfTitle>Second Half Performance</HalfTitle>
            <MetricsTable>
              <MetricRow>
                <MetricLabel>Distance:</MetricLabel>
                <MetricValue>{formatNumber(match['Distance 2'])} m</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Distance/min:</MetricLabel>
                <MetricValue>
                  {match['Minutes 2'] ? formatNumber(match['Distance 2'] / match['Minutes 2']) : 'N/A'} m/min
                </MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>HSR Distance:</MetricLabel>
                <MetricValue>{formatNumber(match['HSR Distance 2'])} m</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Sprint Distance:</MetricLabel>
                <MetricValue>{formatNumber(match['Sprint Distance 2'])} m</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>HI Count:</MetricLabel>
                <MetricValue>{formatNumber(match['HI Count 2'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>High Accel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['High Acceleration Count 2'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Medium Accel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['Medium Acceleration Count 2'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Explosive Accel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['Explosive Acceleration to HSR Count 2'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>High Decel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['High Deceleration Count 2'])}</MetricValue>
              </MetricRow>
              <MetricRow>
                <MetricLabel>Medium Decel Count:</MetricLabel>
                <MetricValue>{formatNumber(match['Medium Deceleration Count 2'])}</MetricValue>
              </MetricRow>
            </MetricsTable>
          </HalfColumn>
        </HalvesComparison>
      </ComparisonSection>
      
      <ComparisonSection>
        <ComparisonTitle>Possession-Based Analysis</ComparisonTitle>
        <PossessionComparison>
          <PossessionColumn type="possession">
            <PossessionTitle>In Possession (TIP)</PossessionTitle>
            <MetricsTable>
              <PossessionMetric>
                <PossessionLabel>Minutes:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['Minutes TIP'])} min</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Distance:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['Distance TIP'])} m</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Distance/min:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['M/min TIP'])} m/min</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>HSR Distance:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['HSR Distance TIP'])} m</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Sprint Distance:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['Sprint Distance TIP'])} m</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>High Accel Count:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['High Acceleration Count TIP'])}</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Medium Accel Count:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['Medium Acceleration Count TIP'])}</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Explosive Accel Count:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['Explosive Acceleration to HSR Count TIP'])}</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>High Decel Count:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['High Deceleration Count TIP'])}</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Medium Decel Count:</PossessionLabel>
                <PossessionValue type="possession">{formatNumber(match['Medium Deceleration Count TIP'])}</PossessionValue>
              </PossessionMetric>
            </MetricsTable>
          </PossessionColumn>
          
          <PossessionColumn type="out-of-possession">
            <PossessionTitle>Out of Possession (OTIP)</PossessionTitle>
            <MetricsTable>
              <PossessionMetric>
                <PossessionLabel>Minutes:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['Minutes OTIP'])} min</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Distance:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['Distance OTIP'])} m</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Distance/min:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['M/min OTIP'])} m/min</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>HSR Distance:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['HSR Distance OTIP'])} m</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Sprint Distance:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['Sprint Distance OTIP'])} m</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>High Accel Count:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['High Acceleration Count OTIP'])}</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Medium Accel Count:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['Medium Acceleration Count OTIP'])}</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Explosive Accel Count:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['Explosive Acceleration to HSR Count OTIP'])}</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>High Decel Count:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['High Deceleration Count OTIP'])}</PossessionValue>
              </PossessionMetric>
              <PossessionMetric>
                <PossessionLabel>Medium Decel Count:</PossessionLabel>
                <PossessionValue type="out-of-possession">{formatNumber(match['Medium Deceleration Count OTIP'])}</PossessionValue>
              </PossessionMetric>
            </MetricsTable>
          </PossessionColumn>
        </PossessionComparison>
      </ComparisonSection>
    </DetailContainer>
  );
};

export default MatchDetail;