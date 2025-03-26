// src/utils/metrics.js

// Metric configurations for general metrics
export const metricConfig = {
  distance: {
    title: 'Total Distance',
    field: 'Distance',
    fieldHalf1: 'Distance 1',
    fieldHalf2: 'Distance 2',
    fieldTIP: 'Distance TIP',
    fieldOTIP: 'Distance OTIP',
    unit: 'm',
    color: '#004D99', // Blue
    normalize: false,
    divisor: 100, // For chart scaling
    yAxisLabel: 'Distance (km)',
    binSize: 500,
    maxValue: 12000
  },
  hsrDistance: {
    title: 'HSR Distance',
    field: 'HSR Distance',
    fieldHalf1: 'HSR Distance 1',
    fieldHalf2: 'HSR Distance 2',
    fieldTIP: 'HSR Distance TIP',
    fieldOTIP: 'HSR Distance OTIP',
    unit: 'm',
    color: '#e63946', // Red
    normalize: false,
    divisor: 1, // No scaling needed
    yAxisLabel: 'HSR Distance (m)',
    binSize: 50,
    maxValue: 1000
  },
  sprintDistance: {
    title: 'Sprint Distance',
    field: 'Sprint Distance',
    fieldHalf1: 'Sprint Distance 1',
    fieldHalf2: 'Sprint Distance 2',
    fieldTIP: 'Sprint Distance TIP',
    fieldOTIP: 'Sprint Distance OTIP',
    unit: 'm',
    color: '#f9c74f', // Yellow
    normalize: false,
    divisor: 1, // No scaling needed
    yAxisLabel: 'Sprint Distance (m)',
    binSize: 25,
    maxValue: 400
  },
  hiCount: {
    title: 'High Intensity Count',
    field: 'HI Count',
    fieldHalf1: 'HI Count 1',
    fieldHalf2: 'HI Count 2',
    fieldTIP: 'HI Count TIP',
    fieldOTIP: 'HI Count OTIP',
    unit: '',
    color: '#43aa8b', // Green
    normalize: false,
    divisor: 1, // No scaling needed
    yAxisLabel: 'HI Count',
    binSize: 5,
    maxValue: 100
  },
  highAccel: {
    title: 'High Acceleration Count',
    field: 'High Acceleration Count',
    fieldHalf1: 'High Acceleration Count 1',
    fieldHalf2: 'High Acceleration Count 2',
    fieldTIP: 'High Acceleration Count TIP',
    fieldOTIP: 'High Acceleration Count OTIP',
    unit: '',
    color: '#4361ee', // Blue
    normalize: false,
    divisor: 1, // No scaling needed
    yAxisLabel: 'High Accel Count',
    binSize: 1,
    maxValue: 20
  },
  mediumAccel: {
    title: 'Medium Acceleration Count',
    field: 'Medium Acceleration Count',
    fieldHalf1: 'Medium Acceleration Count 1',
    fieldHalf2: 'Medium Acceleration Count 2',
    fieldTIP: 'Medium Acceleration Count TIP',
    fieldOTIP: 'Medium Acceleration Count OTIP',
    unit: '',
    color: '#3a86ff', // Light blue
    normalize: false,
    divisor: 1,
    yAxisLabel: 'Medium Accel Count',
    binSize: 2,
    maxValue: 40
  },
  explosiveAccelHSR: {
    title: 'Explosive Acceleration to HSR Count',
    field: 'Explosive Acceleration to HSR Count',
    fieldHalf1: 'Explosive Acceleration to HSR Count 1',
    fieldHalf2: 'Explosive Acceleration to HSR Count 2',
    fieldTIP: 'Explosive Acceleration to HSR Count TIP',
    fieldOTIP: 'Explosive Acceleration to HSR Count OTIP',
    unit: '',
    color: '#fb8500', // Orange
    normalize: false,
    divisor: 1,
    yAxisLabel: 'Explosive Accel to HSR Count',
    binSize: 1,
    maxValue: 15
  },
  explosiveAccelSprint: {
    title: 'Explosive Acceleration to Sprint Count',
    field: 'Explosive Acceleration to Sprint Count',
    fieldHalf1: 'Explosive Acceleration to Sprint Count 1', 
    fieldHalf2: 'Explosive Acceleration to Sprint Count 2',
    fieldTIP: 'Explosive Acceleration to Sprint Count TIP',
    fieldOTIP: 'Explosive Acceleration to Sprint Count OTIP',
    unit: '',
    color: '#d89200', // Dark orange
    normalize: false,
    divisor: 1,
    yAxisLabel: 'Explosive Accel to Sprint Count',
    binSize: 1,
    maxValue: 15
  },
  highDecel: {
    title: 'High Deceleration Count',
    field: 'High Deceleration Count',
    fieldHalf1: 'High Deceleration Count 1',
    fieldHalf2: 'High Deceleration Count 2',
    fieldTIP: 'High Deceleration Count TIP',
    fieldOTIP: 'High Deceleration Count OTIP',
    unit: '',
    color: '#9d4edd', // Purple
    normalize: false,
    divisor: 1, // No scaling needed
    yAxisLabel: 'High Decel Count',
    binSize: 2,
    maxValue: 40
  },
  mediumDecel: {
    title: 'Medium Deceleration Count',
    field: 'Medium Deceleration Count',
    fieldHalf1: 'Medium Deceleration Count 1',
    fieldHalf2: 'Medium Deceleration Count 2',
    fieldTIP: 'Medium Deceleration Count TIP',
    fieldOTIP: 'Medium Deceleration Count OTIP',
    unit: '',
    color: '#c77dff', // Light purple
    normalize: false,
    divisor: 1,
    yAxisLabel: 'Medium Decel Count',
    binSize: 3,
    maxValue: 60
  },
  speed: {
    title: 'Peak Speed',
    field: 'PSV-99',
    fieldHalf1: null,
    fieldHalf2: null,
    fieldTIP: null,
    fieldOTIP: null,
    unit: 'km/h',
    color: '#f72585', // Pink
    normalize: false,
    divisor: 1, // No scaling needed
    yAxisLabel: 'Speed (km/h)',
    binSize: 1,
    maxValue: 40
  }
};

// Metric configurations for halves comparison
export const halvesMetricConfig = {
  distance: {
    title: 'Total Distance',
    firstHalfField: 'Distance 1',
    secondHalfField: 'Distance 2',
    unit: 'm',
    color1: '#004D99', // Blue
    color2: '#5899E2', // Light blue
    yAxisLabel: 'Distance (m)'
  },
  hsrDistance: {
    title: 'HSR Distance',
    firstHalfField: 'HSR Distance 1',
    secondHalfField: 'HSR Distance 2',
    unit: 'm',
    color1: '#e63946', // Red
    color2: '#F47F88', // Light red
    yAxisLabel: 'HSR Distance (m)'
  },
  sprintDistance: {
    title: 'Sprint Distance',
    firstHalfField: 'Sprint Distance 1',
    secondHalfField: 'Sprint Distance 2',
    unit: 'm',
    color1: '#f9c74f', // Yellow
    color2: '#FCE0A2', // Light yellow
    yAxisLabel: 'Sprint Distance (m)'
  },
  hiCount: {
    title: 'High Intensity Count',
    firstHalfField: 'HI Count 1',
    secondHalfField: 'HI Count 2',
    unit: '',
    color1: '#43aa8b', // Green
    color2: '#87D4BF', // Light green
    yAxisLabel: 'HI Count'
  },
  highAccel: {
    title: 'High Acceleration Count',
    firstHalfField: 'High Acceleration Count 1',
    secondHalfField: 'High Acceleration Count 2',
    unit: '',
    color1: '#4361ee', // Blue
    color2: '#8D9FF5', // Light blue
    yAxisLabel: 'High Accel Count'
  },
  mediumAccel: {
    title: 'Medium Acceleration Count',
    firstHalfField: 'Medium Acceleration Count 1',
    secondHalfField: 'Medium Acceleration Count 2',
    unit: '',
    color1: '#3a86ff', // Light blue
    color2: '#7eb0ff', // Lighter blue
    yAxisLabel: 'Medium Accel Count'
  },
  explosiveAccelHSR: {
    title: 'Explosive Acceleration to HSR Count',
    firstHalfField: 'Explosive Acceleration to HSR Count 1',
    secondHalfField: 'Explosive Acceleration to HSR Count 2',
    unit: '',
    color1: '#fb8500', // Orange
    color2: '#ffc370', // Light orange
    yAxisLabel: 'Explosive Accel to HSR Count'
  },
  explosiveAccelSprint: {
    title: 'Explosive Acceleration to Sprint Count',
    firstHalfField: 'Explosive Acceleration to Sprint Count 1',
    secondHalfField: 'Explosive Acceleration to Sprint Count 2',
    unit: '',
    color1: '#d89200', // Dark orange
    color2: '#ffb638', // Light dark orange
    yAxisLabel: 'Explosive Accel to Sprint Count'
  },
  highDecel: {
    title: 'High Deceleration Count',
    firstHalfField: 'High Deceleration Count 1',
    secondHalfField: 'High Deceleration Count 2',
    unit: '',
    color1: '#9d4edd', // Purple
    color2: '#CDA0EE', // Light purple
    yAxisLabel: 'High Decel Count'
  },
  mediumDecel: {
    title: 'Medium Deceleration Count',
    firstHalfField: 'Medium Deceleration Count 1',
    secondHalfField: 'Medium Deceleration Count 2',
    unit: '',
    color1: '#c77dff', // Light purple
    color2: '#e0b1ff', // Lighter purple
    yAxisLabel: 'Medium Decel Count'
  }
};

// Metric configurations for possession comparison
export const possessionMetricConfig = {
  distancePerMin: {
    title: 'Distance/min',
    tipField: 'M/min TIP',
    otipField: 'M/min OTIP',
    unit: 'm/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'Distance (m/min)'
  },
  hsrPerMin: {
    title: 'HSR/min',
    tipField: 'HSR Distance TIP',
    otipField: 'HSR Distance OTIP',
    unit: 'm/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'HSR Distance (m/min)',
    needsCalculation: true
  },
  sprintPerMin: {
    title: 'Sprint/min',
    tipField: 'Sprint Distance TIP',
    otipField: 'Sprint Distance OTIP',
    unit: 'm/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'Sprint Distance (m/min)',
    needsCalculation: true
  },
  hiCountPerMin: {
    title: 'HI Count/min',
    tipField: 'HI Count TIP',
    otipField: 'HI Count OTIP',
    unit: '/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'HI Count per minute',
    needsCalculation: true
  },
  highAccelPerMin: {
    title: 'High Accelerations/min',
    tipField: 'High Acceleration Count TIP',
    otipField: 'High Acceleration Count OTIP',
    unit: '/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'High Accel Count per minute',
    needsCalculation: true
  },
  mediumAccelPerMin: {
    title: 'Medium Accelerations/min',
    tipField: 'Medium Acceleration Count TIP',
    otipField: 'Medium Acceleration Count OTIP',
    unit: '/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'Medium Accel Count per minute',
    needsCalculation: true
  },
  explosiveAccelHSRPerMin: {
    title: 'Explosive Accel to HSR/min',
    tipField: 'Explosive Acceleration to HSR Count TIP',
    otipField: 'Explosive Acceleration to HSR Count OTIP',
    unit: '/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'Explosive Accel to HSR Count per minute',
    needsCalculation: true
  },
  explosiveAccelSprintPerMin: {
    title: 'Explosive Accel to Sprint/min',
    tipField: 'Explosive Acceleration to Sprint Count TIP',
    otipField: 'Explosive Acceleration to Sprint Count OTIP',
    unit: '/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'Explosive Accel to Sprint Count per minute',
    needsCalculation: true
  },
  highDecelPerMin: {
    title: 'High Decelerations/min',
    tipField: 'High Deceleration Count TIP',
    otipField: 'High Deceleration Count OTIP',
    unit: '/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'High Decel Count per minute',
    needsCalculation: true
  },
  mediumDecelPerMin: {
    title: 'Medium Decelerations/min',
    tipField: 'Medium Deceleration Count TIP',
    otipField: 'Medium Deceleration Count OTIP',
    unit: '/min',
    color1: '#004D99', // Blue
    color2: '#e63946', // Red
    yAxisLabel: 'Medium Decel Count per minute',
    needsCalculation: true
  }
};