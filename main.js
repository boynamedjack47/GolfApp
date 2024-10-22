// Fetch available golf courses and populate the course select dropdown
async function getAvailableGolfCourses() {
  try {
    const response = await fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorMessage = await response.text(); // Log the actual response content
      throw new Error(`Expected JSON, got: ${errorMessage}`);
    }

    const courses = await response.json();
    return courses;
  } catch (error) {
    console.error("Error fetching golf courses:", error);
  }
}

// Fetch details of a specific golf course
async function getGolfCourseDetails(golfCourseId) {
  try {
    const response = await fetch(`https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json`);

    // Check if the response is JSON
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const errorMessage = await response.text(); // Log the actual response content
      throw new Error(`Expected JSON, got: ${errorMessage}`);
    }

    const courseDetails = await response.json();
    return courseDetails;
  } catch (error) {
    console.error(`Error fetching golf course details for ID ${golfCourseId}:`, error);
  }
}

// Populate the course select dropdown with options
async function populateCourseOptions() {
  const courses = await getAvailableGolfCourses();
  if (courses) {
    let courseOptionsHtml = '<option value="">Select a course</option>'; // Placeholder option
    courses.forEach((course) => {
      courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });
    document.getElementById('course-select').innerHTML = courseOptionsHtml;

    // Add event listener for when a course is selected
    document.getElementById('course-select').addEventListener('change', async (event) => {
      const courseId = event.target.value;
      console.log("Selected course ID:", courseId); // Debugging log
      if (courseId) {
        const courseDetails = await getGolfCourseDetails(courseId);
        console.log("Fetched course details:", courseDetails); // Debugging log
        populateScoreCard(courseDetails);
      }
    });
  }
}

// Populate the scorecard table with the fetched course details
function populateScoreCard(courseDetails) {
  if (!courseDetails || !courseDetails.holes) {
    console.error("Course details are not available or incomplete.");
    return;
  }

  const yardageRow = document.querySelector('tr:nth-child(3)'); // Yardage row
  const parRow = document.querySelector('tr:nth-child(4)'); // Par row
  const handicapRow = document.querySelector('tr:nth-child(5)'); // Handicap row

  // Clear existing content
  yardageRow.innerHTML = '<th>Yardage</th>';
  parRow.innerHTML = '<th>Par</th>';
  handicapRow.innerHTML = '<th>Handicap</th>';

  // Populate rows with data from the courseDetails
  courseDetails.holes.forEach((hole) => {
    yardageRow.innerHTML += `<td>${hole.yardage}</td>`;
    parRow.innerHTML += `<td>${hole.par}</td>`;
    handicapRow.innerHTML += `<td>${hole.handicap}</td>`;
  });

  // Update course name in the first row
  const courseNameCell = document.querySelector('thead tr:nth-child(1) th:nth-child(1)');
  courseNameCell.textContent = courseDetails.name;
}

// Add a new player scorecard row
function addList() {
  const playerNameInput = document.getElementById('new-list-name-input');
  const playerName = playerNameInput.value.trim();

  // Check if player name is valid
  if (playerName === "") {
    alert("Please enter a player name.");
    return;
  }

  // Clear the input field after adding
  playerNameInput.value = "";

  // Find the scorecard table body to append the new player row
  const tableBody = document.querySelector('table tbody');
  
  // Create a new row for the player
  const newRow = document.createElement('tr');
  newRow.innerHTML = `
    <td>${playerName}<button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
    <td><input type="number" class="playerscore"></td>
    <td><input type="number" class="playerscore"></td>
    <td><input type="number" class="playerscore"></td>
    <td><input type="number" class="playerscore"></td>
    <td><input type="number" class="playerscore"></td>
    <td><input type="number" class="playerscore"></td>
    <td><input type="number" class="playerscore"></td>
    <td><input type="number" class="playerscore"></td>
    <td><input type="number" class="playerscore"></td>
    <td>Total</td>
  
  `;

  newRow.querySelector('.delete-btn').addEventListener('click', function () {
    tableBody.removeChild(newRow); // Remove the row
  });


  // Append the new row to the table body
  tableBody.appendChild(newRow);
}

// Ensure the course options are populated when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  populateCourseOptions();
});
