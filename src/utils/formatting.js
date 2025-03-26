// Format number with appropriate decimal places
export const formatNumber = (num) => {
    if (num === undefined || num === null || isNaN(num)) return "N/A";
    if (num >= 10) return parseFloat(num).toFixed(1);
    return parseFloat(num).toFixed(2);
  };
  
  // Format number with commas for thousands
  export const formatNumberWithCommas = (num) => {
    if (isNaN(num)) return "N/A";
    
    // Handle decimals appropriately
    const rounded = num >= 10 ? parseFloat(num).toFixed(1) : parseFloat(num).toFixed(2);
    
    // Add commas for thousands
    return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Format date
  export // Improved date handling function to never show "Invalid Date"
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    
    try {
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
    } catch (error) {
      // If any error occurs, return the original string
      console.log("Date formatting error:", error);
    }
    
    // If all else fails, just return the original string
    return dateString;
  };
  
  // Get relative change with formatting
  export const getChangeFormat = (oldValue, newValue) => {
    if (!oldValue || !newValue || oldValue === 0) return { value: 0, isPositive: false };
    
    const change = ((newValue - oldValue) / oldValue) * 100;
    return {
      value: formatNumber(change),
      isPositive: change >= 0
    };
  };