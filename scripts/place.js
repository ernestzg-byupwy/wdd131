const tempDD = document.querySelector("#temperature");
const windSpeedDD = document.querySelector("#wind-speed");
const windChildDD = document.querySelector("#wind-chill");

const tempUnit = "C";
const speedUnit = "km/h"
const temperature = 5;
const windSpeed = 6;

// The formula is tuned to work with temperature units of degrees 'Celsius' and the wind speed in 'km/h'
// make sure to convert the values to the right units before passing the arguments to the function
const calculateWindChill = (temperature, windSpeed) => 13.12 + 0.6215 * temperature - 11.37 * (windSpeed ** 0.16) + 0.3965 * temperature * (windSpeed ** 0.16);

// Convert windChill to degrees Fahrenheit if needed
// Conditions to call the function:
// - temperature <= 10 degrees Celsius
// - windSpeed > 4.8 km/h
let windChill = (temperature <= 10 && windSpeed > 4.8) ? calculateWindChill(temperature, windSpeed) : undefined;

tempDD.innerHTML = `${temperature} &deg;${tempUnit}`;
windSpeedDD.innerHTML = `${windSpeed} ${speedUnit}`;
windChildDD.innerHTML = windChill !== undefined ? `${windChill.toFixed(1)} &deg;${tempUnit}` : "N/A";