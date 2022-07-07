(() => {
  const name_field = document.querySelector("input[field = 'name']");
  const roll_number_field = document.querySelector(
    "input[field = 'roll_number']"
  );
  const email_field = document.querySelector("input[field = 'email']");
  const mobile_number_field = document.querySelector(
    "input[field = 'mobile_number']"
  );
  const password_field = document.querySelector("input[field = 'password']");
  const confirm_password_field = document.querySelector(
    "input[field = 'confirm_password']"
  );
  const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const mobile_number_regex = /[6-9][0-9]{9}/;
  const password_regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,}$/;
  let regex_string_roll_number =
    "[A-Z]%[A-Z]%[0-9]%[0-9]%[A-Z]%[0-9]%[0-9]%[0-9]";
  roll_number_field.addEventListener("keyup", (e) => {
    let length = roll_number_field.value.length;
    let regex_roll_number = new RegExp(
      "^" + regex_string_roll_number.split("%").slice(0, length).join("") + "$"
    );
    if (roll_number_field.value === "") {
      roll_number_field.classList.remove("error");
    } else if (!roll_number_field.value.match(regex_roll_number)) {
      roll_number_field.classList.add("error");
    } else {
      roll_number_field.classList.remove("error");
    }
  });
  email_field.addEventListener("keyup", (e) => {
    if (email_field.value === "") {
      email_field.classList.remove("error");
    } else if (!email_field.value.match(email_regex)) {
      email_field.classList.add("error");
    } else {
      email_field.classList.remove("error");
    }
  });
  mobile_number_field.addEventListener("keydown", (e) => {
    if (mobile_number_field.value.length > 9) {
      mobile_number_field.value = mobile_number_field.value.slice(
        mobile_number_field.value.length - 9,
        mobile_number_field.value.length
      );
    }
  });
  mobile_number_field.addEventListener("keyup", (e) => {
    if (mobile_number_field.value === "") {
      mobile_number_field.classList.remove("error");
    } else if (!mobile_number_field.value.match(mobile_number_regex)) {
      mobile_number_field.classList.add("error");
    } else {
      mobile_number_field.classList.remove("error");
    }
  });
  password_field.addEventListener("keyup", (e) => {
    if (password_field.value === "") {
      password_field.classList.remove("error");
    } else if (!password_field.value.match(password_regex)) {
      password_field.classList.add("error");
    } else {
      password_field.classList.remove("error");
    }
  });
  confirm_password_field.addEventListener("keyup", (e) => {
    if (confirm_password_field.value === "") {
      confirm_password_field.classList.remove("error");
    } else if (
      password_field.value != confirm_password_field.value ||
      password_field.classList.contains("error")
    ) {
      confirm_password_field.classList.add("error");
    } else {
      confirm_password_field.classList.remove("error");
    }
  });
})();

(() => {
  let form_button = document.querySelector("#user-register-button");
  form_button.setAttribute(
    "style",
    `margin-left : calc(50% - ${
      form_button.getBoundingClientRect().width / 1.65
    }px);`
  );
})();

document.querySelector("button").addEventListener("click", submitForm);

function submitForm() {
  const name_field = document.querySelector("input[field = 'name']");
  const roll_number_field = document.querySelector(
    "input[field = 'roll_number']"
  );
  const email_field = document.querySelector("input[field = 'email']");
  const hostel_field = document.querySelector("input[field = 'hostel']");
  const mobile_number_field = document.querySelector(
    "input[field = 'mobile_number']"
  );
  const password_field = document.querySelector("input[field = 'password']");

  if (
    name_field.classList.contains("error") ||
    roll_number_field.classList.contains("error") ||
    email_field.classList.contains("error") ||
    hostel_field.classList.contains("error") ||
    mobile_number_field.classList.contains("error") ||
    password_field.classList.contains("error") ||
    name_field.value === "" ||
    roll_number_field.value === "" ||
    email_field.value === "" ||
    hostel_field.value === "" ||
    mobile_number_field.value === "" ||
    password_field.value === ""
  ) {
    alert("fix the errors");
    return;
  }

  let register_form_xhr = new XMLHttpRequest();
  register_form_xhr.onload = (res) => {
    console.log("sent");
  };
  register_form_xhr.open("POST", "/form/register");
  register_form_xhr.setRequestHeader("Content-type", "application/json");

  register_form_xhr.send(
    JSON.stringify({
      name: name_field.value,
      roll_number: roll_number_field.value,
      email: email_field.value,
      hostel: hostel_field.value,
      mobile_number: mobile_number_field.value,
      password: password_field.value,
    })
  );
}

// function used in testing
function fillForm(
  name = "ABC",
  roll_number = "CS21B099",
  email = "CS21B099@smail.iitm.ac.in",
  hostel = "SU",
  mobile_number = "6469214271",
  password = "Annie@123"
) {
  const name_field = document.querySelector("input[field = 'name']");
  const roll_number_field = document.querySelector(
    "input[field = 'roll_number']"
  );
  const email_field = document.querySelector("input[field = 'email']");
  const hostel_field = document.querySelector("input[field = 'hostel']");
  const mobile_number_field = document.querySelector(
    "input[field = 'mobile_number']"
  );
  const password_field = document.querySelector("input[field = 'password']");
  const confirm_password_field = document.querySelector(
    "input[field = 'confirm_password']"
  );

  name_field.value = name;
  roll_number_field.value = roll_number;
  email_field.value = email;
  hostel_field.value = hostel;
  mobile_number_field.value = mobile_number;
  password_field.value = password;
  confirm_password_field.value = password;
}
