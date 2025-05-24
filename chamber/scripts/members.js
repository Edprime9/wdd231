const memberContainer = document.getElementById("members");
const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");

async function getMembers() {
  const response = await fetch("data/members.json");
  const data = await response.json();
  displayMembers(data);
}

function displayMembers(members) {
  memberContainer.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("div");
    card.classList.add("member-card");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${member.url}" target="_blank">${member.url}</a></p>
    `;

    memberContainer.appendChild(card);
  });
}

const toggleButton = document.getElementById("menu-toggle");
const navList = document.querySelector("#main-nav ul");

toggleButton.addEventListener("click", () => {
  navList.classList.toggle("show");
});

// View toggle functionality
gridBtn.addEventListener("click", () => {
  memberContainer.classList.add("grid-view");
  memberContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", () => {
  memberContainer.classList.add("list-view");
  memberContainer.classList.remove("grid-view");
});

getMembers();
