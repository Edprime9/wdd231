// Courses array
const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming.",
    technology: ["HTML", "CSS"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "CSE 111 students become more organized, efficient, and powerful computer programmers...",
    technology: ["Python"],
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course will introduce the notion of classes and objects...",
    technology: ["C#"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience in Web Fundamentals and programming...",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    certificate: "Web and Computer Programming",
    description:
      "This course builds on prior experience with Dynamic Web Fundamentals and programming...",
    technology: ["HTML", "CSS", "JavaScript"],
    completed: false,
  },
];

const coursesContainer = document.querySelector(".courses");
const filterButtons = document.querySelectorAll(".filters button");

function renderCourses(filteredCourses) {
  coursesContainer.innerHTML = "";
  let totalCredits = 0;

  filteredCourses.forEach((course) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.classList.add(course.completed ? "completed" : "not-completed");
    div.innerHTML = `
      <strong>${course.subject} ${course.number}</strong><br>
      ${course.title}<br>
      <small>${course.credits} credits</small>
    `;
    totalCredits += course.credits;
    coursesContainer.appendChild(div);
  });

  const creditDisplay = document.querySelector("#credit-display");
  if (creditDisplay)
    creditDisplay.textContent = `Total Credits: ${totalCredits}`;
  else {
    const p = document.createElement("p");
    p.id = "credit-display";
    p.textContent = `Total Credits: ${totalCredits}`;
    coursesContainer.parentElement.appendChild(p);
  }
}

function filterCourses(subject) {
  if (subject === "All") {
    renderCourses(courses);
  } else {
    renderCourses(courses.filter((c) => c.subject === subject));
  }
}

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => filterCourses(btn.textContent));
});

// Initial render
renderCourses(courses);

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  toggleBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
});

// Dynamically populate current year
document.getElementById("currentyear").textContent = new Date().getFullYear();

// Dynamically populate last modified date
document.getElementById("lastModified").textContent =
  "Last Modification: " + document.lastModified;
