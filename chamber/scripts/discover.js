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

// Christmas countdown
function calculateDaysUntilChristmas() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const christmas = new Date(currentYear, 11, 25);
    
    if (today > christmas) {
        christmas.setFullYear(currentYear + 1);
    }
    
    const diffTime = christmas - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function displayChristmasCountdown() {
    const days = calculateDaysUntilChristmas();
    const message = document.createElement('p');
    message.id = 'christmas-countdown';
    message.textContent = `Only ${days} ${days === 1 ? 'day' : 'days'} until Christmas!`;
    document.querySelector('.sidebar').appendChild(message);
}

// Initialize both features
window.addEventListener('DOMContentLoaded', function() {
    displayVisitMessage();
    displayChristmasCountdown();
});