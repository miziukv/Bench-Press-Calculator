/**
 * Retrieves the one-rep max value from the input field.
 * 
 * @returns {number} The one-rep max value entered by the user.
 */
function getOneRepMaxValue() {
    const inputElement = document.getElementById("oneRepMax"); // Get the input element
    const repMaxValue = parseFloat(inputElement.value); // Parse the input value to a float
    return repMaxValue; // Return the parsed value
}

/**
 * Event listener for the submit button to calculate and display all workout sets.
 */
document.getElementById('submitButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const repMax = getOneRepMaxValue(); // Get the one-rep max value

    // Validate the input value
    if (isNaN(repMax) || repMax < 80 || repMax > 1000) {
        alert("Please enter a value between 80 lbs and 1000 lbs."); // Alert if input is invalid
        return;
    }

    calculateAllWorkouts(); // Proceed to calculate all workout sets if input is valid
});

/**
 * Calculates and updates all workout sets based on the one-rep max value.
 */
function calculateAllWorkouts() {
    const repMax = getOneRepMaxValue(); // Get the one-rep max value

    // Calculate weights for different percentages, rounded to the nearest 5
    const percentages = [0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1.0];
    const values = percentages.map(p => roundToNearest5(repMax * p));

    // Arrays to store element IDs for each workout and their respective values
    const workoutConfig = [
        { percIds: ['w1percent55', 'w1percent60', 'w1percent65', 'w1percent70', 'w1percent75'], 
            values: values.slice(0, 5), platesIds: ['w1plates1', 'w1plates2', 'w1plates3', 
                'w1plates4', 'w1plates5'] },

        { percIds: ['w2percent55', 'w2percent60', 'w2percent65', 'w2percent70', 'w2percent75', 
            'w2percent80'], values: values.slice(0, 6), platesIds: ['w2plates1', 'w2plates2', 
                'w2plates3', 'w2plates4', 'w2plates5', 'w2plates6'] },

        { percIds: ['w3percent55', 'w3percent65', 'w3percent70', 'w3percent75', 'w3percent80', 
            'w3percent85'], values: [values[0], values[2], values[3], values[4], values[5], 
            values[6]], platesIds: ['w3plates1', 'w3plates2', 'w3plates3', 'w3plates4', 
                'w3plates5', 'w3plates6'] },

        { percIds: ['w4percent55', 'w4percent70', 'w4percent75', 'w4percent80', 'w4percent85', 
            'w4percent90'], values: [values[0], values[3], values[4], values[5], values[6], 
            values[7]], platesIds: ['w4plates1', 'w4plates2', 'w4plates3', 'w4plates4', 
                'w4plates5', 'w4plates6'] },

        { percIds: ['w5percent55', 'w5percent75', 'w5percent80', 'w5percent85', 'w5percent90', 
            'w5percent95'], values: [values[0], values[4], values[5], values[6], values[7], 
            values[8]], platesIds: ['w5plates1', 'w5plates2', 'w5plates3', 'w5plates4', 
                'w5plates5', 'w5plates6'] },

        { percIds: ['w6percent55', 'w6percent80', 'w6percent85', 'w6percent90', 'w6percent95', 
            'w6percent100'], values: [values[0], values[5], values[6], values[7], values[8],
            values[9]], platesIds: ['w6plates1', 'w6plates2', 'w6plates3', 'w6plates4', 
                'w6plates5', 'w6plates6'] }
    ];

    // Update the DOM elements with the calculated values
    workoutConfig.forEach(workout => {
        workout.percIds.forEach((id, index) => {
            updateWorkoutSet(id, workout.values[index], workout.platesIds[index]);
        });
    });
}

/**
 * Updates the workout set by displaying the calculated weight and the corresponding weight plates
 * required to achieve that weight on the barbell.
 * 
 * @param {string} weightId - The ID of the HTML element where the weight value should be displayed.
 * @param {number} weightValue - The calculated weight to be displayed.
 * @param {string} plateSectionId - The ID of the HTML element where the weight plates should be displayed.
 */
function updateWorkoutSet(weightId, weightValue, plateSectionId) {

    const weightElement = document.getElementById(weightId); // Get the element for the percentage weight
    weightElement.textContent = `${weightValue} lbs`; // Update the text content with the calculated weight

    const plateSection = document.getElementById(plateSectionId); // Get the plate section element
    const plates = calculatePlates(weightValue); // Calculate the plates needed for the given weight

    plateSection.innerHTML = ''; // Clear the existing content

    // Create and append plate rows for each plate type
    plates.forEach(plate => {
        const plateRow = document.createElement('div');
        plateRow.className = 'plate-row';

        // Display plate weight and count, formatting for multiple plates
        plateRow.innerHTML = plate.count > 1 ? 
            `${plate.weight} x ${plate.count} <span style="font-weight: normal;">lb</span>` : 
            `${plate.weight} <span style="font-weight: normal;">lb</span>`;

        plateSection.appendChild(plateRow); // Append the plate row to the plate section
    });
}

/**
 * Calculates the number of each weight plate needed to achieve the desired weight on the barbell.
 *
 * @param {number} weight - The total desired weight on the barbell including the bar itself.
 * @returns {Array<{weight: number, count: number}>} Array of objects where each object represents 
 * a weight plate and the count of how many of that plate are needed.
 */
function calculatePlates(weight) {
    const barWeight = 45; // Standard barbell weight
    let remainingWeight = (weight - barWeight) / 2; // Weight to be loaded on each side of the bar
    const plates = [45, 35, 25, 10, 5, 2.5]; // Available plate weights
    const plateCounts = []; // Array to store the plate weight and count

    // Calculate the number of each plate type required
    plates.forEach(plateWeight => {
        const count = Math.floor(remainingWeight / plateWeight);
        if (count > 0) {
            plateCounts.push({ weight: plateWeight, count }); // Add plate weight and count to array
            remainingWeight -= count * plateWeight; // Subtract the calculated weight from remaining 
        }
    });

    return plateCounts; 
}

/**
 * Rounds a number to the nearest multiple of 5.
 * 
 * @param {number} num - The number to be rounded
 * @returns {number} The rounded number
 */
function roundToNearest5(num) {
    return Math.round(num / 5) * 5; 
}

/**
 * Adds event listeners to toggle buttons for showing and hiding workout sections.
 */
document.querySelectorAll('.toggle-button').forEach(button => {
    button.addEventListener('click', function() {
        const workoutId = this.getAttribute('data-workout-id'); // Get the ID of the workout to toggle
        toggleWorkout(workoutId); // Toggle the visibility of the workout
    });
});

/**
 * Toggles the visibility of a workout section.
 * 
 * @param {string} workoutId - The ID of the workout section to toggle.
 */
function toggleWorkout(workoutId) {
    const workoutContent = document.getElementById(workoutId); // Get the workout element by ID
    if (workoutContent) {
        workoutContent.classList.toggle('hidden'); // Toggle the 'hidden' class to show/hide the workout
    } else {
        console.error(`No element found with ID: ${workoutId}`); // Log an error if the element is not found
    }
}