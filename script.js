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
fetch(
  "https://jsonplaceholder.typicode.com/users"
) /* https://jsonplaceholder.typicode.com/users */
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
      // console.log(card);
      return { name: user.name, email: user.email, element: card };
    });
  });

/* create a new person using POST method */
/* 
const formName = document.querySelector("#form-name");
const formEmail = document.querySelector("#form-email");
const formPhone = document.querySelector("#form-phone");
const formBtn = document.querySelector("#submit");

formBtn.addEventListener("click", (e) => {
  e.preventDefault();

  fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: 11,
      name: formName.value,
      email: formEmail.value,
      phone: formPhone.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      const phone = card.querySelector("[data-phone]");
      header.textContent = data.name;
      body.textContent = data.email;
      phone.textContent = data.phone;
      userCardContainer.append(card);
      return { name: data.name, email: data.email, element: data };
    });
});
 */

const formName = document.querySelector("#form-name");
const formEmail = document.querySelector("#form-email");
const formPhone = document.querySelector("#form-phone");
const formBtn = document.querySelector("#submit");
const resetBtn = document.querySelector("#reset");
const removeLast = document.querySelector("#remove_last");

// Funcție pentru a încărca utilizatorii salvați din localStorage
function loadUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.forEach((user) => {
    const card = userCardTemplate.content.cloneNode(true).children[0];
    const header = card.querySelector("[data-header]");
    const body = card.querySelector("[data-body]");
    const phone = card.querySelector("[data-phone]");
    header.textContent = user.name;
    body.textContent = user.email;
    phone.textContent = user.phone;
    userCardContainer.append(card);
  });
}

// Apelarea funcției pentru a încărca utilizatorii la inițializarea paginii
loadUsers();

formBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const newUser = {
    id: Date.now(), // Utilizăm timestamp-ul pentru un id unic
    name: formName.value,
    email: formEmail.value,
    phone: formPhone.value,
  };
  // verificam daca userii exista deja
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const userExists = users.some(
    (user) => user.email === newUser.email || user.phone === newUser.phone
  );

  if (userExists) {
    alert("Acest user este deja in sistem");
    return;
  }

  fetch(`https://jsonplaceholder.typicode.com/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((data) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      const phone = card.querySelector("[data-phone]");
      header.textContent = data.name;
      body.textContent = data.email;
      phone.textContent = data.phone;

      // if((data.phone || data.email)includes(data))
      userCardContainer.append(card);

      // Salvăm noul utilizator în localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];
      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      return { name: data.name, email: data.email, element: data };
    });
});

resetBtn.addEventListener("click", function () {
  localStorage.removeItem("users");
  location.reload();
});

removeLast.addEventListener("click", function () {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length > 0) {
    users.pop();
    localStorage.setItem("users", JSON.stringify(users));
    userCardContainer.removeChild(userCardContainer.lastElementChild);
    console.log("last user was removed");
  }
});
