// Load attractions data and generate cards
fetch("data/attractions.json")
  .then((response) => response.json())
  .then((data) => {
    const gallery = document.querySelector(".gallery");

    data.forEach((attraction) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
                <h2>${attraction.name}</h2>
                <figure>
                    <img src="${attraction.image}" alt="${attraction.name}" loading="lazy" width="300" height="200">
                </figure>
                <address>${attraction.address}</address>
                <p>${attraction.description}</p>
                <button>Learn More</button>
            `;
      gallery.appendChild(card);
    });
  });

// Visit tracking
function displayVisitMessage() {
  const visitMessage = document.getElementById("visit-message");
  const lastVisit = localStorage.getItem("lastVisit");
  const currentVisit = Date.now();

  if (!lastVisit) {
    visitMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor(
      (currentVisit - lastVisit) / (1000 * 60 * 60 * 24)
    );

    if (daysBetween < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayText = daysBetween === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${daysBetween} ${dayText} ago.`;
    }
  }

  localStorage.setItem("lastVisit", currentVisit);
}

// Initialize on page load
window.addEventListener("DOMContentLoaded", displayVisitMessage);
