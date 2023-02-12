window.onload = function () {
  fetch(
    "https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const countryDropdown = document.getElementById("country");
      const stateDropdown = document.getElementById("state");

      // Populate the country dropdown with the list of countries
      data.forEach((country) => {
        const option = document.createElement("option");
        option.value = country.code3;
        option.text = country.name;
        // console.log("Option: ", option);
        countryDropdown.add(option);
      });

      // Update the state dropdown whenever the country is changed
      countryDropdown.addEventListener("change", (onclick) => {
        // Remove all previous options from the state dropdown
        while (stateDropdown.firstChild) {
          stateDropdown.removeChild(stateDropdown.firstChild);
        }

        // Populate the state dropdown with the states of the selected country
        const selectedCountry = data.find(
          (country) => country.code3 === countryDropdown.value
        );
        // console.log("Selected Country: ", countryDropdown.value);
        // console.log("Selected Country: ", selectedCountry);
        if (selectedCountry) {
          selectedCountry.states.forEach((state) => {
            const option = document.createElement("option");
            option.value = state.code;
            option.text = state.name;
            stateDropdown.add(option);
          });
        }
      });
    });
};



$(document).ready(function () {
  // Add validation to the name field
  $("#name").on("input", function () {
    var name = $(this).val();
    if (name.length < 4 || name.length > 10) {
      $(this).addClass("invalid");
    } else {
      $(this).removeClass("invalid");
    }
  });

  // Add validation to the email field
  $("#email").on("input", function () {
    var email = $(this).val();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $(this).addClass("invalid");
    } else {
      $(this).removeClass("invalid");
    }
  });

  // Add validation to the contact number field
  $("#contact").on("input", function () {
    var contact = $(this).val();
    if (contact.length != 10 || isNaN(contact)) {
      $(this).addClass("invalid");
    } else {
      $(this).removeClass("invalid");
    }
  });

  // Add validation to the country and state fields
  $("#country, #state").on("change", function () {
    var value = $(this).val();
    if (value == "") {
      $(this).addClass("invalid");
    } else {
      $(this).removeClass("invalid");
    }
  });

  // Handle form submission
  $("form").on("submit", function (e) {
    e.preventDefault();

    var errors = {};
    var name = $("#name").val();
    var email = $("#email").val();
    var contact = $("#contact").val();
    var country = $("#country").val();
    var state = $("#state").val();

    if (name.length < 4 || name.length > 10) {
      errors["Name"] = { error: "Length should be between 4-10 characters." };
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors["Email"] = { error: "Please enter valid email address." };
    }

    if (contact.length != 10 || isNaN(contact)) {
      errors["Contact Number"] = { error: "Mobile number should be of 10 digits." };
    }

    if (country == "") {
      errors["Country"] = { error: "Country is a mandatory field." };
    }

    if (state == "") {
      errors["State"] = { error: "State is a mandatory field." };
    }

    // Display error message
    if (Object.keys(errors).length > 0) {
      var message = {};
      for (var key in errors) {
        message[key] = errors[key];
      }
      var messageElement = parent.document.getElementById("message");
      messageElement.innerHTML = "Result: " + JSON.stringify(message);
    }
    // Display success message
    else {
      var message = { Success: "All fields are valid." };
      var messageElement = parent.document.getElementById("message");
      messageElement.innerHTML = "Result: " + JSON.stringify(message);
    }
  });

});

