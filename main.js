function getAvailableGolfCourses() {
    return fetch(
      "https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/courses.json",
    { mode: "no-cors" }
    ).then(function (response) {
      return response.json();
    });
  }

  function getGolfCourseDetails(golfCourseId) {
    return fetch(
      `https://exquisite-pastelito-9d4dd1.netlify.app/golfapi/course${golfCourseId}.json`,
      { mode: "no-cors" }
    ).then(function (response) {
      return response.json();
    });
  }
  