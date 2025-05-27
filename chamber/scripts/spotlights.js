// Member Spotlight Section
async function displaySpotlights() {
  const response = await fetch('data/members.json');
  const members = await response.json();

  // Filter for Gold and Silver members
  const premiumMembers = members.filter(m => m.membership === 'Gold' || m.membership === 'Silver');

  // Shuffle and pick 2–3 random members
  const shuffled = premiumMembers.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 or 3

  const spotlightContainer = document.querySelector('#spotlights');
  spotlightContainer.innerHTML = '';

  selected.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('spotlight-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <a href="${member.url}" target="_blank">V${member.url}</a>
      <p class="membership">${member.membership} Member</p>
    `;

    spotlightContainer.appendChild(card);
  });
}

displaySpotlights();
