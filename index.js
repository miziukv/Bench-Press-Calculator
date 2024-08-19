
function getOneRepMaxValue() {

    const inputElement = document.getElementById("oneRepMax");

    const repMaxValue = parseFloat(inputElement.value);

    return repMaxValue;
}

document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault();

    const repMax = getOneRepMaxValue();

    if(isNaN(repMax) || repMax < 80 || repMax > 1000) {
        alert("Please enter a value between 80 lbs and 1000 lbs.");
        return;
    }

    calculateAllWorkouts();
});

function calculateAllWorkouts() {
    const repMax = getOneRepMaxValue();

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

    let w1Perc = ['w1percent55', 'w1percent60', 'w1percent65', 'w1percent70', 'w1percent75'];
    let w1Values = [value55, value60, value65, value70, value75];
    let w1Plates = ['w1plates1', 'w1plates2', 'w1plates3', 'w1plates4', 'w1plates5'];

    let w2Perc = ['w2percent55', 'w2percent60', 'w2percent65', 'w2percent70', 'w2percent75', 'w2percent80'];
    let w2Values = [value55, value60, value65, value70, value75, value80];
    let w2Plates = ['w2plates1', 'w2plates2', 'w2plates3', 'w2plates4', 'w2plates5', 'w2plates6'];

    let w3Perc = ['w3percent55', 'w3percent65', 'w3percent70', 'w3percent75', 'w3percent80', 'w3percent85'];
    let w3Values = [value55, value65, value70, value75, value80, value85];
    let w3Plates = ['w3plates1', 'w3plates2', 'w3plates3', 'w3plates4', 'w3plates5', 'w3plates6'];

    let w4Perc = ['w4percent55', 'w4percent70', 'w4percent75', 'w4percent80', 'w4percent85', 'w4percent90'];
    let w4Values = [value55, value70, value75, value80, value85, value90];
    let w4Plates = ['w4plates1', 'w4plates2', 'w4plates3', 'w4plates4', 'w4plates5', 'w4plates6'];

    let w5Perc = ['w5percent55', 'w5percent75', 'w5percent80', 'w5percent85', 'w5percent90', 'w5percent95'];
    let w5Values = [value55, value75, value80, value85, value90, value95];
    let w5Plates = ['w5plates1', 'w5plates2', 'w5plates3', 'w5plates4', 'w5plates5', 'w5plates6'];

    let w6Perc = ['w6percent55', 'w6percent80', 'w6percent85', 'w6percent90', 'w6percent95', 'w6percent100'];
    let w6Values = [value55, value80, value85, value90, value95, value100];
    let w6Plates = ['w6plates1', 'w6plates2', 'w6plates3', 'w6plates4', 'w6plates5', 'w6plates6'];

    let workoutsPerc = [w1Perc, w2Perc, w3Perc, w4Perc, w5Perc, w6Perc];
    let workoutsValues = [w1Values, w2Values, w3Values, w4Values, w5Values, w6Values];
    let workoutsPlates = [w1Plates, w2Plates, w3Plates, w4Plates, w5Plates, w6Plates];
    
    for (let i = 0; i < workoutsPerc.length; i++) {
        
        for (let j = 0; j < workoutsPerc[i].length; j++) {
            updateWorkoutSet(workoutsPerc[i][j], workoutsValues[i][j], workoutsPlates[i][j]);
        }
    }

}

function updateWorkoutSet(weightId, weightValue, plateSectionId) {

    const weightElement = document.getElementById(weightId);
    weightElement.textContent = weightValue + " lbs";

    const plateSection = document.getElementById(plateSectionId);
    const plates = calculatePlates(weightValue);

    plateSection.innerHTML = '';

    plates.forEach(plate => {
        const plateRow = document.createElement('div');
        plateRow.className = 'plate-row';

        if (plate.count > 1) {
            plateRow.innerHTML = `${plate.weight} <span style="font-weight: normal;">lb</span> x ${plate.count}`;
        } else {
            plateRow.innerHTML = `${plate.weight} <span style="font-weight: normal;">lb</span>`;
        }

        plateSection.appendChild(plateRow);
    });
}

function calculatePlates(weight) {
    const barWeight = 45; 
    let remainingWeight = (weight - barWeight) / 2; 
    const plates = [45, 35, 25, 10, 5, 2.5]; 
    const plateCounts = [];

    for (let i = 0; i < plates.length; i++) {
        const count = Math.floor(remainingWeight / plates[i]);
        if (count > 0) {
            plateCounts.push({ weight: plates[i], count });
            remainingWeight -= count * plates[i];
        }
    }

    return plateCounts;
}


function roundToNearest5(num) {
    return Math.round(num / 5) * 5;
}
