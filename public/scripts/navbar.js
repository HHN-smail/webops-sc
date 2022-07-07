const menu = document.querySelector(".menu");
const menuContent = document.querySelector(".menu__contents");
const menuTitle = document.querySelector(".menu__title");
menu.addEventListener("mouseover", (e) => {
  menu.classList.remove("menu--collapsed");
  menu.classList.add("menu--expanded");

  menuContent.classList.add("menu__contents--expanded");
});

menu.addEventListener("mouseout", (e) => {
  menu.classList.remove("menu--expanded");
  menu.classList.add("menu--collapsed");

  menuContent.classList.remove("menu__contents--expanded");
  menuContent.classList.remove("menu__contents--collapsed");
});

menu.addEventListener("click", (e) => {
  menu.classList.remove("menu--collapsed");
  menu.classList.add("menu--expanded");

  menuContent.classList.add("menu__contents--expanded");
});
if (window.innerWidth < 800) {
  center(document.querySelector("#nav-search"));
}

window.addEventListener("resize", (e) => {
  if (window.innerWidth < 800) {
    center(document.querySelector("#nav-search"));
  } else {
    document.querySelector("#nav-search").style = "display : flex;";
  }
});

function center(element) {
  element.style["right"] = `calc(50% - ${
    element.getBoundingClientRect().width / 1.7
  }px)`;
}

const search_bar = document.querySelector("#nav-search > input");
let regex_string_roll_number =
  "[A-Z]%[A-Z]%[0-9]%[0-9]%[A-Z]%[0-9]%[0-9]%[0-9]";

search_bar.addEventListener("keyup", async (e) => {
  let search_bar_value = search_bar.value;
  let regex_roll_number = new RegExp(
    "^" +
      regex_string_roll_number
        .split("%")
        .slice(0, search_bar_value.length)
        .join("") +
      "$"
  );
  if (search_bar_value.match(regex_roll_number)) {
    if (
      search_bar_value.length === 2 ||
      search_bar_value.length === 4 ||
      search_bar_value.length === 5 ||
      search_bar_value.length === 8
    ) {
      let rows = await fetch(`/form/select/${search_bar_value}`);
      console.log(await rows.text());
    }
  }
});
