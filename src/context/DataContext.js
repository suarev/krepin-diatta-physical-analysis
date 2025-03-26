// src/context/DataContext.js
import React, { createContext, useState, useContext } from 'react';
import Papa from 'papaparse';
import { formatNumber } from '../utils/formatting';

// Create context
const DataContext = createContext();

// Context provider component
export const DataProvider = ({ children }) => {
  const [fullData, setFullData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [currentView, setCurrentView] = useState('summary');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [playerAverages, setPlayerAverages] = useState(null);
  
  // Helper function to safely calculate average
  const calcAverage = (data, field) => {
    const validValues = data
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null" && val !== "NaN")
      .map(val => parseFloat(val));
    
    if (validValues.length === 0) return 0;
    
    return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
  };

  // Helper function to safely find maximum value
  const findMaxValue = (data, field) => {
    const validValues = data
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null" && val !== "NaN")
      .map(val => parseFloat(val));
    
    if (validValues.length === 0) return 0;
    
    return Math.max(...validValues);
  };

  // Helper function to calculate per 90 values
  const calculateP90Value = (matches, field) => {
    let totalValue = 0;
    let totalMinutes = 0;
    
    matches.forEach(match => {
      const value = parseFloat(match[field] || 0);
      const minutes = parseFloat(match.Minutes || 0);
      
      if (!isNaN(value) && !isNaN(minutes) && minutes > 0) {
        totalValue += value;
        totalMinutes += minutes;
      }
    });
    
    return totalMinutes > 0 ? (totalValue / totalMinutes) * 90 : 0;
  };
  
  // Process CSV data
  const processData = (csvData) => {
    try {
      // Parse the CSV using PapaParse
      const results = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });
      
      const data = results.data;
      console.log(`Total rows: ${data.length}`);
      
      // Sort data by date
      data.sort((a, b) => {
        try {
          return new Date(a.Date) - new Date(b.Date);
        } catch (e) {
          return 0;
        }
      });
      
      setFullData(data);
      setIsDataLoaded(true);
      
      // Calculate player statistics
      calculatePlayerStats(data);
    } catch (error) {
      console.error("Error processing data:", error);
    }
  };
  
  // Calculate player statistics
  const calculatePlayerStats = (data) => {
    // Group data by position
    const positionGroups = {};
    
    data.forEach(match => {
      const position = match['Position Group'];
      if (!positionGroups[position]) {
        positionGroups[position] = [];
      }
      positionGroups[position].push(match);
    });
    
    // Calculate averages for each position
    const positionAverages = {};
    
    Object.keys(positionGroups).forEach(position => {
      const matches = positionGroups[position];
      
      positionAverages[position] = {
        matches: matches.length,
        minutes: matches.reduce((sum, match) => sum + (parseFloat(match.Minutes) || 0), 0),
        
        // Basic per 90 metrics
        distanceP90: calcAverage(matches, 'Distance P90'),
        hsrDistanceP90: calcAverage(matches, 'HSR Distance P90'),
        sprintDistanceP90: calcAverage(matches, 'Sprint Distance P90'),
        hiCountP90: calcAverage(matches, 'HI Count P90'),
        
        // Acceleration metrics - calculated from raw data if P90 values are not available
        highAccelP90: calcAverage(matches, 'High Acceleration Count P90') || calculateP90Value(matches, 'High Acceleration Count'),
        mediumAccelP90: calcAverage(matches, 'Medium Acceleration Count P90') || calculateP90Value(matches, 'Medium Acceleration Count'),
        explosiveAccelHSRP90: calcAverage(matches, 'Explosive Acceleration to HSR Count P90') || calculateP90Value(matches, 'Explosive Acceleration to HSR Count'),
        explosiveAccelSprintP90: calcAverage(matches, 'Explosive Acceleration to Sprint Count P90') || calculateP90Value(matches, 'Explosive Acceleration to Sprint Count'),
        
        // Deceleration metrics
        highDecelP90: calcAverage(matches, 'High Deceleration Count P90') || calculateP90Value(matches, 'High Deceleration Count'),
        mediumDecelP90: calcAverage(matches, 'Medium Deceleration Count P90') || calculateP90Value(matches, 'Medium Deceleration Count'),
        
        sprintCountP90: calcAverage(matches, 'Sprint Count P90'),
        peakSpeed: findMaxValue(matches, 'PSV-99'),
        
        // Possession data
        tipDistancePerMin: calcAverage(matches, 'M/min TIP'),
        otipDistancePerMin: calcAverage(matches, 'M/min OTIP'),
        tipMinutes: matches.reduce((sum, match) => sum + (parseFloat(match['Minutes TIP']) || 0), 0),
        otipMinutes: matches.reduce((sum, match) => sum + (parseFloat(match['Minutes OTIP']) || 0), 0),
        
        // First half vs second half data
        firstHalfDistance: calcAverage(matches, 'Distance 1'),
        secondHalfDistance: calcAverage(matches, 'Distance 2'),
        firstHalfHSR: calcAverage(matches, 'HSR Distance 1'),
        secondHalfHSR: calcAverage(matches, 'HSR Distance 2'),
        firstHalfSprint: calcAverage(matches, 'Sprint Distance 1'),
        secondHalfSprint: calcAverage(matches, 'Sprint Distance 2'),
        firstHalfHI: calcAverage(matches, 'HI Count 1'),
        secondHalfHI: calcAverage(matches, 'HI Count 2'),
        
        // Acceleration by half
        firstHalfHighAccel: calcAverage(matches, 'High Acceleration Count 1'),
        secondHalfHighAccel: calcAverage(matches, 'High Acceleration Count 2'),
        firstHalfMediumAccel: calcAverage(matches, 'Medium Acceleration Count 1'),
        secondHalfMediumAccel: calcAverage(matches, 'Medium Acceleration Count 2'),
        
        // Explosive acceleration by half
        firstHalfExplosiveAccelHSR: calcAverage(matches, 'Explosive Acceleration to HSR Count 1'),
        secondHalfExplosiveAccelHSR: calcAverage(matches, 'Explosive Acceleration to HSR Count 2'),
        firstHalfExplosiveAccelSprint: calcAverage(matches, 'Explosive Acceleration to Sprint Count 1'),
        secondHalfExplosiveAccelSprint: calcAverage(matches, 'Explosive Acceleration to Sprint Count 2'),
        
        // Deceleration by half
        firstHalfHighDecel: calcAverage(matches, 'High Deceleration Count 1'),
        secondHalfHighDecel: calcAverage(matches, 'High Deceleration Count 2'),
        firstHalfMediumDecel: calcAverage(matches, 'Medium Deceleration Count 1'),
        secondHalfMediumDecel: calcAverage(matches, 'Medium Deceleration Count 2')
      };
    });
    
    // Calculate overall averages using the same pattern
    const overallAverages = {
      matches: data.length,
      minutes: data.reduce((sum, match) => sum + (parseFloat(match.Minutes) || 0), 0),
      
      // Basic per 90 metrics
      distanceP90: calcAverage(data, 'Distance P90'),
      hsrDistanceP90: calcAverage(data, 'HSR Distance P90'),
      sprintDistanceP90: calcAverage(data, 'Sprint Distance P90'),
      hiCountP90: calcAverage(data, 'HI Count P90'),
      
      // Acceleration metrics
      highAccelP90: calcAverage(data, 'High Acceleration Count P90') || calculateP90Value(data, 'High Acceleration Count'),
      mediumAccelP90: calcAverage(data, 'Medium Acceleration Count P90') || calculateP90Value(data, 'Medium Acceleration Count'),
      explosiveAccelHSRP90: calcAverage(data, 'Explosive Acceleration to HSR Count P90') || calculateP90Value(data, 'Explosive Acceleration to HSR Count'),
      explosiveAccelSprintP90: calcAverage(data, 'Explosive Acceleration to Sprint Count P90') || calculateP90Value(data, 'Explosive Acceleration to Sprint Count'),
      
      // Deceleration metrics
      highDecelP90: calcAverage(data, 'High Deceleration Count P90') || calculateP90Value(data, 'High Deceleration Count'),
      mediumDecelP90: calcAverage(data, 'Medium Deceleration Count P90') || calculateP90Value(data, 'Medium Deceleration Count'),
      
      sprintCountP90: calcAverage(data, 'Sprint Count P90'),
      peakSpeed: findMaxValue(data, 'PSV-99'),
      
      // Possession data
      tipDistancePerMin: calcAverage(data, 'M/min TIP'),
      otipDistancePerMin: calcAverage(data, 'M/min OTIP'),
      tipMinutes: data.reduce((sum, match) => sum + (parseFloat(match['Minutes TIP']) || 0), 0),
      otipMinutes: data.reduce((sum, match) => sum + (parseFloat(match['Minutes OTIP']) || 0), 0),
      
      // First half vs second half data
      firstHalfDistance: calcAverage(data, 'Distance 1'),
      secondHalfDistance: calcAverage(data, 'Distance 2'),
      firstHalfHSR: calcAverage(data, 'HSR Distance 1'),
      secondHalfHSR: calcAverage(data, 'HSR Distance 2'),
      firstHalfSprint: calcAverage(data, 'Sprint Distance 1'),
      secondHalfSprint: calcAverage(data, 'Sprint Distance 2'),
      firstHalfHI: calcAverage(data, 'HI Count 1'),
      secondHalfHI: calcAverage(data, 'HI Count 2'),
      
      // Acceleration by half
      firstHalfHighAccel: calcAverage(data, 'High Acceleration Count 1'),
      secondHalfHighAccel: calcAverage(data, 'High Acceleration Count 2'),
      firstHalfMediumAccel: calcAverage(data, 'Medium Acceleration Count 1'),
      secondHalfMediumAccel: calcAverage(data, 'Medium Acceleration Count 2'),
      
      // Explosive acceleration by half
      firstHalfExplosiveAccelHSR: calcAverage(data, 'Explosive Acceleration to HSR Count 1'),
      secondHalfExplosiveAccelHSR: calcAverage(data, 'Explosive Acceleration to HSR Count 2'),
      firstHalfExplosiveAccelSprint: calcAverage(data, 'Explosive Acceleration to Sprint Count 1'),
      secondHalfExplosiveAccelSprint: calcAverage(data, 'Explosive Acceleration to Sprint Count 2'),
      
      // Deceleration by half
      firstHalfHighDecel: calcAverage(data, 'High Deceleration Count 1'),
      secondHalfHighDecel: calcAverage(data, 'High Deceleration Count 2'),
      firstHalfMediumDecel: calcAverage(data, 'Medium Deceleration Count 1'),
      secondHalfMediumDecel: calcAverage(data, 'Medium Deceleration Count 2')
    };
    
    setPlayerAverages({
      byPosition: positionAverages,
      overall: overallAverages
    });
  };
  
  // Filter data by position
  const getFilteredData = () => {
    if (selectedPosition === 'all') {
      return fullData;
    } else {
      return fullData.filter(item => item['Position Group'] === selectedPosition);
    }
  };
  
  // Context value
  const value = {
    fullData,
    isDataLoaded,
    processData,
    currentView,
    setCurrentView,
    selectedPosition,
    setSelectedPosition,
    getFilteredData,
    playerAverages,
    getFullData: () => fullData
  };
  
  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};