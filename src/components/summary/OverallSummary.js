// src/components/summary/OverallSummary.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useData } from '../../context/DataContext';
import { formatNumber, formatNumberWithCommas } from '../../utils/formatting';
import diattaImage from '../../assets/images/diatta-profile.png';
import monacoLogo from '../../assets/images/monaco-logo.png';

// AS Monaco color theme
const colors = {
  primary: '#C8102E', // Monaco red
  secondary: '#FFFFFF', // White
  tertiary: '#000000', // Black
  background: '#FCFCFC',
  lightGray: '#F5F5F5',
  darkGray: '#555555',
  textPrimary: '#222222',
  textSecondary: '#777777',
};

const ProfileImage = styled.div`
  width: 100%;
  aspect-ratio: 3/4;
  background-color: ${colors.lightGray};
  background-image: url(${diattaImage});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

// For team logos
const TeamLogoImage = styled.div`
  width: 60px;
  height: 60px;
  background-image: url(${monacoLogo});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
`;

// Animation for hover effects
const hoverEffect = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProfileImageSection = styled.div`
  flex: 0 0 250px;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;


const ProfileDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const PlayerName = styled.h2`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: ${colors.primary};
`;

const PlayerInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.lightGray};
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: ${colors.primary};
  margin-right: 5px;
`;

const InfoValue = styled.span`
  color: ${colors.textPrimary};
`;

const ClubsSection = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 10px 0;
  color: ${colors.textPrimary};
  border-bottom: 1px solid ${colors.lightGray};
  padding-bottom: 8px;
`;

const ClubsList = styled.div`
  display: flex;
  gap: 15px;
`;

const ClubCard = styled.div`
  background-color: ${colors.lightGray};
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  min-width: 120px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ClubName = styled.div`
  font-weight: 600;
  color: ${colors.primary};
  margin-bottom: 5px;
`;

const ClubPeriod = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

const PositionsSection = styled.div`
  margin-bottom: 20px;
`;

const PositionsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
`;

const PositionCard = styled.div`
  background-color: ${colors.lightGray};
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  min-width: 140px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PositionName = styled.div`
  font-weight: 600;
  color: ${colors.primary};
  margin-bottom: 5px;
`;

const PositionStats = styled.div`
  font-size: 12px;
  color: ${colors.textSecondary};
`;

const SummaryBox = styled.div`
  background-color: ${colors.background};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px;
`;

const SummaryItem = styled.div`
  padding: 15px;
  text-align: center;
  flex: 1;
  min-width: 140px;
  background-color: ${colors.lightGray};
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    animation: ${hoverEffect} 1s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background-color: white;
  }
`;

const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
  color: ${colors.primary};
`;

const SummaryLabel = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
  text-transform: uppercase;
`;

const SummarySection = styled.div`
  margin-bottom: 30px;
`;

const SummaryTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  color: ${colors.textPrimary};
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const HighlightCard = styled.div`
  background: linear-gradient(to bottom right, white, ${colors.lightGray});
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const HighlightTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 15px;
  color: ${colors.textPrimary};
  display: flex;
  justify-content: space-between;
`;

const MetricComparison = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const MetricValue = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${colors.primary};
  margin-right: 15px;
  white-space: nowrap;
`;

const MetricAverage = styled.div`
  font-size: 14px;
  color: ${colors.textSecondary};
  white-space: nowrap;
`;

const BarContainer = styled.div`
  flex-grow: 1;
  height: 40px;
  position: relative;
`;

const BarBackground = styled.div`
  position: absolute;
  height: 8px;
  width: 100%;
  background-color: #eee;
  border-radius: 4px;
  top: 50%;
  transform: translateY(-50%);
`;

const BarFill = styled.div`
  position: absolute;
  height: 8px;
  width: ${props => props.percentage}%;
  background-color: ${props => props.color || colors.primary};
  border-radius: 4px;
  top: 50%;
  transform: translateY(-50%);
  transition: width 1s ease;
`;

const HighlightDetails = styled.div`
  font-size: 13px;
  color: ${colors.textSecondary};
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px solid ${colors.lightGray};
`;

// Random colors for the bars to make them visually distinct
const metricColors = [
  '#C8102E', // Monaco red
  '#1F78B4', // Blue
  '#33A02C', // Green
  '#FF7F00', // Orange
  '#6A3D9A', // Purple
  '#A6CEE3', // Light blue
  '#B15928', // Brown
  '#FB9A99', // Pink
  '#E31A1C', // Red
  '#FDBF6F', // Light orange
];

const OverallSummary = () => {
  const { playerAverages, fullData, isDataLoaded } = useData();

  if (!isDataLoaded || !fullData.length) {
    return <div>Loading summary data...</div>;
  }

  // Define a calcAverage function to ensure we always get reliable data
  const calcAverage = (field) => {
    const validValues = fullData
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null")
      .map(val => parseFloat(val));
    
    if (validValues.length === 0) return 0;
    
    return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
  };

  // Group data by position
  const positionGroups = {};
  fullData.forEach(match => {
    const position = match['Position Group'];
    if (!positionGroups[position]) {
      positionGroups[position] = {
        matches: 0,
        minutes: 0
      };
    }
    positionGroups[position].matches += 1;
    positionGroups[position].minutes += parseFloat(match.Minutes) || 0;
  });

  // Calculate important averages directly from full data
  const avgDistanceP90 = calcAverage('Distance P90');
  const peakSpeed = Math.max(
    ...fullData
      .map(row => row['PSV-99'])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null")
      .map(val => parseFloat(val))
  );
  const avgHsrP90 = calcAverage('HSR Distance P90');
  const avgSprintCountP90 = calcAverage('Sprint Count P90');

  // Find the highlights (best performances for each metric)
  const highlights = {
    topSpeed: {
      match: [...fullData].sort((a, b) => (parseFloat(b['PSV-99']) || 0) - (parseFloat(a['PSV-99']) || 0))[0],
      avgValue: calcAverage('PSV-99'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row['PSV-99']) || 0).filter(val => !isNaN(val)))
    },
    highestDistance: {
      match: [...fullData].sort((a, b) => (parseFloat(b.Distance) || 0) - (parseFloat(a.Distance) || 0))[0],
      avgValue: calcAverage('Distance'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row.Distance) || 0).filter(val => !isNaN(val)))
    },
    mostSprints: {
      match: [...fullData].sort((a, b) => (parseFloat(b['Sprint Count']) || 0) - (parseFloat(a['Sprint Count']) || 0))[0],
      avgValue: calcAverage('Sprint Count'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row['Sprint Count']) || 0).filter(val => !isNaN(val)))
    },
    highestHSR: {
      match: [...fullData].sort((a, b) => (parseFloat(b['HSR Distance']) || 0) - (parseFloat(a['HSR Distance']) || 0))[0],
      avgValue: calcAverage('HSR Distance'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row['HSR Distance']) || 0).filter(val => !isNaN(val)))
    },
    highestAccel: {
      match: [...fullData].sort((a, b) => (parseFloat(b['High Acceleration Count']) || 0) - (parseFloat(a['High Acceleration Count']) || 0))[0],
      avgValue: calcAverage('High Acceleration Count'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row['High Acceleration Count']) || 0).filter(val => !isNaN(val)))
    },
    mediumAccel: {
      match: [...fullData].sort((a, b) => (parseFloat(b['Medium Acceleration Count']) || 0) - (parseFloat(a['Medium Acceleration Count']) || 0))[0],
      avgValue: calcAverage('Medium Acceleration Count'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row['Medium Acceleration Count']) || 0).filter(val => !isNaN(val)))
    },
    explosiveAccelHSR: {
      match: [...fullData].sort((a, b) => (parseFloat(b['Explosive Acceleration to HSR Count']) || 0) - (parseFloat(a['Explosive Acceleration to HSR Count']) || 0))[0],
      avgValue: calcAverage('Explosive Acceleration to HSR Count'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row['Explosive Acceleration to HSR Count']) || 0).filter(val => !isNaN(val)))
    },
    explosiveAccelSprint: {
      match: [...fullData].sort((a, b) => (parseFloat(b['Explosive Acceleration to Sprint Count']) || 0) - (parseFloat(a['Explosive Acceleration to Sprint Count']) || 0))[0],
      avgValue: calcAverage('Explosive Acceleration to Sprint Count'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row['Explosive Acceleration to Sprint Count']) || 0).filter(val => !isNaN(val)))
    },
    highestDecel: {
      match: [...fullData].sort((a, b) => (parseFloat(b['High Deceleration Count']) || 0) - (parseFloat(a['High Deceleration Count']) || 0))[0],
      avgValue: calcAverage('High Deceleration Count'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row['High Deceleration Count']) || 0).filter(val => !isNaN(val)))
    },
    mostHI: {
      match: [...fullData].sort((a, b) => (parseFloat(b['HI Count']) || 0) - (parseFloat(a['HI Count']) || 0))[0],
      avgValue: calcAverage('HI Count'),
      maxValue: Math.max(...fullData.map(row => parseFloat(row['HI Count']) || 0).filter(val => !isNaN(val)))
    }
  };

  // Format date function to prevent "Invalid Date" issues
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
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
    
    // If all else fails, return original string (but this shouldn't happen with proper data)
    return dateString;
  };

  // Helper function to safely get and format values
  const safeGetValue = (value, defaultValue = 0) => {
    if (value === undefined || value === null || isNaN(value) || value === "NaN" || value === "null") {
      return defaultValue;
    }
    return value;
  };

  return (
    <>
      <ProfileContainer>
        <ProfileImageSection>
          <ProfileImage></ProfileImage>
        </ProfileImageSection>
        
        <ProfileDetails>
          <PlayerName>Krepin Diatta</PlayerName>
          
          <PlayerInfo>
            <InfoItem>
              <InfoLabel>Birthdate:</InfoLabel>
              <InfoValue>{formatDate(fullData[0]?.Birthdate) || '10 Feb 1999'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Matches:</InfoLabel>
              <InfoValue>{fullData.length}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>Minutes:</InfoLabel>
              <InfoValue>{Math.round(fullData.reduce((sum, match) => sum + (parseFloat(match.Minutes) || 0), 0)).toLocaleString()}</InfoValue>
            </InfoItem>
          </PlayerInfo>
          
          <PositionsSection>
            <SectionTitle>Positions Played</SectionTitle>
            <PositionsList>
              {Object.keys(positionGroups).map(position => (
                <PositionCard key={position}>
                  <PositionName>{position}</PositionName>
                  <PositionStats>
                    {positionGroups[position].matches} match{positionGroups[position].matches !== 1 ? 'es' : ''}, 
                    {' '}{Math.round(positionGroups[position].minutes)} mins
                  </PositionStats>
                </PositionCard>
              ))}
            </PositionsList>
          </PositionsSection>
          
          <ClubsSection>
            <SectionTitle>Clubs</SectionTitle>
            <ClubsList>
              <ClubCard>
                <ClubName>AS Monaco</ClubName>
                <ClubPeriod>2021 - Present</ClubPeriod>
              </ClubCard>
              <ClubCard>
                <ClubName>Club Brugge</ClubName>
                <ClubPeriod>2018 - 2021</ClubPeriod>
              </ClubCard>
              <ClubCard>
                <ClubName>Sarpsborg 08</ClubName>
                <ClubPeriod>2017 - 2018</ClubPeriod>
              </ClubCard>
            </ClubsList>
          </ClubsSection>
          
          <SummaryBox>
            <SummaryItem>
              <SummaryValue>{!isNaN(avgDistanceP90) ? Math.round(avgDistanceP90).toLocaleString() + 'm' : 'N/A'}</SummaryValue>
              <SummaryLabel>Avg. Distance/90</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{!isNaN(peakSpeed) ? formatNumber(peakSpeed) + ' km/h' : 'N/A'}</SummaryValue>
              <SummaryLabel>Peak Speed</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{!isNaN(avgHsrP90) ? Math.round(avgHsrP90).toLocaleString() + 'm' : 'N/A'}</SummaryValue>
              <SummaryLabel>HSR/90</SummaryLabel>
            </SummaryItem>
            <SummaryItem>
              <SummaryValue>{!isNaN(avgSprintCountP90) ? formatNumber(avgSprintCountP90) : 'N/A'}</SummaryValue>
              <SummaryLabel>Sprint Count/90</SummaryLabel>
            </SummaryItem>
          </SummaryBox>
        </ProfileDetails>
      </ProfileContainer>
      
      <SummarySection>
        <SummaryTitle>Key Physical Highlights</SummaryTitle>
        <HighlightsGrid>
          <HighlightCard>
            <HighlightTitle>
              Top Speed
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{formatNumber(safeGetValue(highlights.topSpeed.match['PSV-99']))} km/h</MetricValue>
              <MetricAverage>Avg: {formatNumber(safeGetValue(highlights.topSpeed.avgValue))} km/h</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.topSpeed.avgValue) / safeGetValue(highlights.topSpeed.maxValue)) * 100, 100)} 
                color={metricColors[0]}
              />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.topSpeed.match?.Match || 'N/A'} ({formatDate(highlights.topSpeed.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
          
          <HighlightCard>
            <HighlightTitle>
              Highest Distance Covered
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{Math.round(safeGetValue(highlights.highestDistance.match.Distance)).toLocaleString()} m</MetricValue>
              <MetricAverage>Avg: {Math.round(safeGetValue(highlights.highestDistance.avgValue)).toLocaleString()} m</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.highestDistance.avgValue) / safeGetValue(highlights.highestDistance.maxValue)) * 100, 100)} 
                color={metricColors[1]}
              />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.highestDistance.match?.Match || 'N/A'} ({formatDate(highlights.highestDistance.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
          
          <HighlightCard>
            <HighlightTitle>
              Most Sprint Actions
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{formatNumber(safeGetValue(highlights.mostSprints.match['Sprint Count']))}</MetricValue>
              <MetricAverage>Avg: {formatNumber(safeGetValue(highlights.mostSprints.avgValue))}</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.mostSprints.avgValue) / safeGetValue(highlights.mostSprints.maxValue)) * 100, 100)} 
                color={metricColors[2]}
              />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.mostSprints.match?.Match || 'N/A'} ({formatDate(highlights.mostSprints.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
          
          <HighlightCard>
            <HighlightTitle>
              Highest HSR Distance
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{Math.round(safeGetValue(highlights.highestHSR.match['HSR Distance'])).toLocaleString()} m</MetricValue>
              <MetricAverage>Avg: {Math.round(safeGetValue(highlights.highestHSR.avgValue)).toLocaleString()} m</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.highestHSR.avgValue) / safeGetValue(highlights.highestHSR.maxValue)) * 100, 100)} 
                color={metricColors[3]}
              />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.highestHSR.match?.Match || 'N/A'} ({formatDate(highlights.highestHSR.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
          
          <HighlightCard>
            <HighlightTitle>
              Highest High Acceleration Count
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{formatNumber(safeGetValue(highlights.highestAccel.match['High Acceleration Count']))}</MetricValue>
              <MetricAverage>Avg: {formatNumber(safeGetValue(highlights.highestAccel.avgValue))}</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.highestAccel.avgValue) / safeGetValue(highlights.highestAccel.maxValue)) * 100, 100)} 
                color={metricColors[4]}
              />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.highestAccel.match?.Match || 'N/A'} ({formatDate(highlights.highestAccel.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
          
          <HighlightCard>
            <HighlightTitle>
              Highest Medium Acceleration Count
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{formatNumber(safeGetValue(highlights.mediumAccel.match['Medium Acceleration Count']))}</MetricValue>
              <MetricAverage>Avg: {formatNumber(safeGetValue(highlights.mediumAccel.avgValue))}</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.mediumAccel.avgValue) / safeGetValue(highlights.mediumAccel.maxValue)) * 100, 100)} 
                color={metricColors[5]}
              />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.mediumAccel.match?.Match || 'N/A'} ({formatDate(highlights.mediumAccel.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
          
          <HighlightCard>
            <HighlightTitle>
              Explosive Acceleration to HSR Count
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{formatNumber(safeGetValue(highlights.explosiveAccelHSR.match['Explosive Acceleration to HSR Count']))}</MetricValue>
              <MetricAverage>Avg: {formatNumber(safeGetValue(highlights.explosiveAccelHSR.avgValue))}</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.explosiveAccelHSR.avgValue) / safeGetValue(highlights.explosiveAccelHSR.maxValue)) * 100, 100)} 
                color={metricColors[6]}
              />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.explosiveAccelHSR.match?.Match || 'N/A'} ({formatDate(highlights.explosiveAccelHSR.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
          
          <HighlightCard>
            <HighlightTitle>
              Explosive Acceleration to Sprint Count
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{formatNumber(safeGetValue(highlights.explosiveAccelSprint.match['Explosive Acceleration to Sprint Count']))}</MetricValue>
              <MetricAverage>Avg: {formatNumber(safeGetValue(highlights.explosiveAccelSprint.avgValue))}</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.explosiveAccelSprint.avgValue) / safeGetValue(highlights.explosiveAccelSprint.maxValue)) * 100, 100)} 
                color={metricColors[7]}
                />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.explosiveAccelSprint.match?.Match || 'N/A'} ({formatDate(highlights.explosiveAccelSprint.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
          
          <HighlightCard>
            <HighlightTitle>
              Highest Deceleration Count
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{formatNumber(safeGetValue(highlights.highestDecel.match['High Deceleration Count']))}</MetricValue>
              <MetricAverage>Avg: {formatNumber(safeGetValue(highlights.highestDecel.avgValue))}</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.highestDecel.avgValue) / safeGetValue(highlights.highestDecel.maxValue)) * 100, 100)} 
                color={metricColors[8]}
              />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.highestDecel.match?.Match || 'N/A'} ({formatDate(highlights.highestDecel.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
          
          <HighlightCard>
            <HighlightTitle>
              Most High Intensity Actions
            </HighlightTitle>
            <MetricComparison>
              <MetricValue>{formatNumber(safeGetValue(highlights.mostHI.match['HI Count']))}</MetricValue>
              <MetricAverage>Avg: {formatNumber(safeGetValue(highlights.mostHI.avgValue))}</MetricAverage>
            </MetricComparison>
            <BarContainer>
              <BarBackground />
              <BarFill 
                percentage={Math.min((safeGetValue(highlights.mostHI.avgValue) / safeGetValue(highlights.mostHI.maxValue)) * 100, 100)} 
                color={metricColors[9]}
              />
            </BarContainer>
            <HighlightDetails>
              vs {highlights.mostHI.match?.Match || 'N/A'} ({formatDate(highlights.mostHI.match?.Date) || 'N/A'})
            </HighlightDetails>
          </HighlightCard>
        </HighlightsGrid>
      </SummarySection>
    </>
  );
};

export default OverallSummary;