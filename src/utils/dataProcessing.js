// Helper function to calculate average
export const calculateAverage = (data, field) => {
    const validValues = data
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null");
    
    if (validValues.length === 0) return 0;
    
    const sum = validValues.reduce((total, val) => total + parseFloat(val), 0);
    return sum / validValues.length;
  };
  
  // Helper function to find maximum value
  export const findMaxValue = (data, field) => {
    const validValues = data
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null");
    
    if (validValues.length === 0) return 0;
    
    return Math.max(...validValues.map(val => parseFloat(val)));
  };
  
  // Helper function to find minimum value
  export const findMinValue = (data, field) => {
    const validValues = data
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null");
    
    if (validValues.length === 0) return 0;
    
    return Math.min(...validValues.map(val => parseFloat(val)));
  };
  
  // Helper function to calculate median
  export const calculateMedian = (data, field) => {
    const validValues = data
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null")
      .map(val => parseFloat(val))
      .sort((a, b) => a - b);
    
    if (validValues.length === 0) return 0;
    
    const mid = Math.floor(validValues.length / 2);
    
    return validValues.length % 2 !== 0
      ? validValues[mid]
      : (validValues[mid - 1] + validValues[mid]) / 2;
  };
  
  // Helper function to calculate standard deviation
  export const calculateStdDev = (data, field) => {
    const validValues = data
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null")
      .map(val => parseFloat(val));
    
    if (validValues.length === 0) return 0;
    
    const mean = validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
    const squaredDiffs = validValues.map(val => Math.pow(val - mean, 2));
    const variance = squaredDiffs.reduce((sum, val) => sum + val, 0) / validValues.length;
    
    return Math.sqrt(variance);
  };
  
  // Create histogram data
  export const createHistogram = (data, field, binSize, maxValue) => {
    // Extract valid values for the field
    const validValues = data
      .map(row => row[field])
      .filter(val => val !== undefined && val !== null && !isNaN(val) && val !== "null")
      .map(val => parseFloat(val));
    
    if (validValues.length === 0) return [];
    
    // Create bins
    const numBins = Math.ceil(maxValue / binSize);
    const bins = Array(numBins).fill(0);
    
    // Count values in each bin
    validValues.forEach(val => {
      const binIndex = Math.min(Math.floor(val / binSize), numBins - 1);
      bins[binIndex]++;
    });
    
    // Create histogram data
    return bins.map((count, index) => ({
      range: `${index * binSize}-${(index + 1) * binSize}`,
      count: count,
      minValue: index * binSize,
      maxValue: (index + 1) * binSize
    }));
  };
  
  // Group data by position
  export const groupByPosition = (data) => {
    const positionGroups = {};
    
    data.forEach(match => {
      const position = match['Position Group'];
      if (!positionGroups[position]) {
        positionGroups[position] = [];
      }
      positionGroups[position].push(match);
    });
    
    return positionGroups;
  };