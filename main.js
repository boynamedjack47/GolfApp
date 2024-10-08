async function getAvailableGolfCourses() {
    try {
      const response = await fetch("https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json");
      const courses = await response.json();
      return courses; // Return the fetched courses
    } catch (error) {
      console.error("Error fetching golf courses:", error);
    }
  }
  
  async function getGolfCourseDetails(golfCourseId) {
    try {
      const response = await fetch(`https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`);
      const courseDetails = await response.json();
      return courseDetails; // Return the fetched course details
    } catch (error) {
      console.error(`Error fetching golf course details for ID ${golfCourseId}:`, error);
    }
  }
  
  // Fetch courses and populate options
  async function populateCourseOptions() {
    const courses = await getAvailableGolfCourses();
    if (courses) {
      let courseOptionsHtml = '';
      courses.forEach((course) => {
        courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
      });
      document.getElementById('course-select').innerHTML = courseOptionsHtml;
    }
  }
  
  // Fetch tee boxes (assuming you have a function or data source for this)
  async function populateTeeBoxOptions() {
    const teeBoxes = await getTeeBoxes(); // Implement this function to fetch tee boxes
    let teeBoxSelectHtml = '';
    teeBoxes.forEach(function (teeBox, index) {
      teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()}, ${teeBox.totalYards} yards</option>`;
    });
    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  }
  
  // Call functions to populate options
  populateCourseOptions();
  populateTeeBoxOptions();
  
  // Player class remains the same
  class Player {
    constructor(name, id = getNextId(), scores = []) {
      this.name = name;
      this.id = id;
      this.scores = scores;
    }
  }
  