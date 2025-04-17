/**
 * Composting System Sensor Simulation
 * This script simulates temperature and humidity sensor readings
 * and updates the UI accordingly.
 */

// Configuration constants
const CONFIG = {
    UPDATE_INTERVAL: 2000, // 2 seconds
    TEMP_RANGE: { min: 28, max: 33 },
    HUM_RANGE: { min: 60, max: 75 },
    MAX_TEMP: 50,
    MAX_HUM: 100,
    STATUS: {
      OPTIMAL: {
        text: "Optimal Composting",
        color: "#32CD32", // green
        conditions: (temp, hum) => temp >= 30 && hum >= 70
      },
      PROGRESS: {
        text: "Composting in Progress",
        color: "#FFD700", // yellow
        conditions: (temp, hum) => temp < 30 && hum < 65
      },
      MONITORING: {
        text: "Monitoring...",
        color: "#FFA07A" // orange
      }
    }
  };
  
  /**
   * Updates the UI with new sensor values
   * @param {number} temperature - Current temperature in Celsius
   * @param {number} humidity - Current humidity percentage
   */
  function updateUI(temperature, humidity) {
    try {
      // Update text values
      document.getElementById("temp").textContent = `${temperature.toFixed(1)} °C`;
      document.getElementById("hum").textContent = `${humidity.toFixed(1)} %`;
  
      // Update progress bars
      document.getElementById("tempProgress").style.width = 
        `${(temperature / CONFIG.MAX_TEMP * 100).toFixed(1)}%`;
      document.getElementById("humProgress").style.width = 
        `${(humidity / CONFIG.MAX_HUM * 100).toFixed(1)}%`;
  
      // Determine composting status
      const status = determineStatus(temperature, humidity);
      const statusElem = document.getElementById("compostStatus");
      statusElem.textContent = status.text;
      statusElem.style.color = status.color;
    } catch (error) {
      console.error("Error updating UI:", error);
    }
  }
  
  /**
   * Determines the current composting status based on sensor readings
   * @param {number} temperature - Current temperature
   * @param {number} humidity - Current humidity
   * @returns {Object} Status object containing text and color
   */
  function determineStatus(temperature, humidity) {
    if (CONFIG.STATUS.OPTIMAL.conditions(temperature, humidity)) {
      return CONFIG.STATUS.OPTIMAL;
    } else if (CONFIG.STATUS.PROGRESS.conditions(temperature, humidity)) {
      return CONFIG.STATUS.PROGRESS;
    }
    return CONFIG.STATUS.MONITORING;
  }
  
  /**
   * Generates a random number within a specified range
   * @param {number} min - Minimum value
   * @param {number} max - Maximum value
   * @returns {number} Random number within range
   */
  function getRandomInRange(min, max) {
    return min + Math.random() * (max - min);
  }
  
  // Initialize the sensor simulation
  function initSensorSimulation() {
    setInterval(() => {
      const temperature = getRandomInRange(CONFIG.TEMP_RANGE.min, CONFIG.TEMP_RANGE.max);
      const humidity = getRandomInRange(CONFIG.HUM_RANGE.min, CONFIG.HUM_RANGE.max);
      updateUI(temperature, humidity);
    }, CONFIG.UPDATE_INTERVAL);
  }
  
  // Start the simulation when the document is ready
  document.addEventListener('DOMContentLoaded', initSensorSimulation);