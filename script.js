const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let users = [];

/* this event will be triggered each time we enter something inside the searchInput*/
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);
    user.element.classList.toggle(
      "hide",
      !isVisible
    ); /* is this user visible will make this false and not add the "hide class" */
  });
});

// console.log(userCardContainer);
fetch("./data.json") /* https://jsonplaceholder.typicode.com/users */
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      /* using an HTML template */
      /* get the content, clone node true => clone this content ass well as of the content inside of it */
      /* this cloneNode(true) returns a #document-fragment, and to get the data we need to select the first element/child */
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      const phone = card.querySelector("[data-phone]");
      header.textContent = user.name;
      body.textContent = user.email;
      phone.textContent = user.phone;
      userCardContainer.append(card);
      console.log(card);
      return { name: user.name, email: user.email, element: card };
    });
  });
