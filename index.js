
function getOneRepMaxValue() {

    const inputElement = document.getElementById("oneRepMax");

    const repMaxValue = parseFloat(inputElement.value);

    return repMaxValue;
}

document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault();

    const repMax = getOneRepMaxValue();

    if(isNaN(repMax) || repMax < 80 || repMax > 1000) {
        alert("Please enter a valid rep max between 80 lbs and 1000 lbs.");
        return;
    }

    calculateAllWorkouts();
});

function calculateAllWorkouts() {
    const repMax = getOneRepMaxValue();

    console.log("Rep Max: ", repMax);

    const value55 = roundToNearest5(repMax * 0.55);
    const value60 = roundToNearest5(repMax * 0.6);
    const value65 = roundToNearest5(repMax * 0.65);
    const value70 = roundToNearest5(repMax * 0.7);
    const value75 = roundToNearest5(repMax * 0.75);
    const value80 = roundToNearest5(repMax * 0.8);
    const value85 = roundToNearest5(repMax * 0.85);
    const value90 = roundToNearest5(repMax * 0.9);
    const value95 = roundToNearest5(repMax * 0.95);
    const value100 = roundToNearest5(repMax);

    const w1Percentages = ["w1percent55", "w1percent60", "w1percent65", "w1percent70", "w1percent75"];
    const w1Values = [value55, value60, value65, value70, value75];

    for (let i = 0; i < w1Percentages.length; i++) {
        document.getElementById(w1Percentages[i]).textContent = w1Values[i];
    }

    const w2Percentages = ["w2percent55", "w2percent60", "w2percent65", "w2percent70", "w2percent75", "w2percent80"];
    const w2Values = [value55, value60, value65, value70, value75, value80];

    for (let i = 0; i < w2Percentages.length; i++) {
        document.getElementById(w2Percentages[i]).textContent = w2Values[i];
    }

    const w3Percentages = ["w3percent55", "w3percent65", "w3percent70", "w3percent75", "w3percent80", "w3percent85"];
    const w3Values = [value55, value65, value70, value75, value80, value85];

    for (let i = 0; i < w3Percentages.length; i++) {
        document.getElementById(w3Percentages[i]).textContent = w3Values[i];
    }

    const w4Percentages = ["w4percent55", "w4percent70", "w4percent75", "w4percent80", "w4percent85", "w4percent90"];
    const w4Values = [value55, value70, value75, value80, value85, value90];

    for (let i = 0; i < w4Percentages.length; i++) {
        document.getElementById(w4Percentages[i]).textContent = w4Values[i];
    }

    const w5Percentages = ["w5percent55", "w5percent75", "w5percent80", "w5percent85", "w5percent90", "w5percent95"];
    const w5Values = [value55, value75, value80, value85, value90, value95];

    for (let i = 0; i < w5Percentages.length; i++) {
        document.getElementById(w5Percentages[i]).textContent = w5Values[i];
    }

    const w6Percentages = ["w6percent55", "w6percent80", "w6percent85", "w6percent90", "w6percent95", "w6percent100"];
    const w6Values = [value55, value80, value85, value90, value95, value100];

    for (let i = 0; i < w6Percentages.length; i++) {
        document.getElementById(w6Percentages[i]).textContent = w6Values[i];
    }

}

function roundToNearest5(num) {
    return Math.round(num / 5) * 5;
}