/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
  // promptFor() is a custom function defined below that helps us prompt and validate input more easily
  // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  // Routes our application based on the user's input
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      //! TODO: Declare a searchByTrait function //////////////////////////////////////////
      searchResults = searchByTrait(people);
      break;
    default:
      // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
      app(people);
      break;
  }
  // Calls the mainMenu() only AFTER we find the SINGLE PERSON
  mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
  // A check to verify a person was found via searchByName() or searchByTrait()
  if (!person[0]) {
    alert("Could not find that individual.");
    // Restarts app() from the very beginning
    return app(people);
  }
  let displayOption = prompt(
    `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
  );
  // Routes our application based on the user's input
  switch (displayOption) {
    case "info":
      personInfo(person);
      mainMenu(person, people);
      break;

    case "family":
      getSpouse(person, people);
      getParents(person, people);
      let siblings = getSiblings(person, people);
      if (
        siblings.length !== 0
          ? displaySiblings(siblings)
          : alert(`${person.firstName} has no siblings`)
      );
      mainMenu(person, people);
      break;

    case "descendants":
      let parent_descendants = findPersonDescendants(person, people);
      if (
        parent_descendants.length !== 0
          ? displayPeople(parent_descendants)
          : alert(`${person.firstName} has no descendants`)
      );
      mainMenu(person, people);
      break;
  }
}

// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
  let foundPerson = people.filter(function (person) {
    if (person.firstName === firstName && person.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return `${person.firstName} ${person.lastName}`;
      })
      .join("\n")
  );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName + "\n";
      })
      .join("\n")
  );
}

// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
  do {
    var response = prompt(question).trim();
  } while (!response || !valid(response));
  return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
  return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
  return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function personInfo(person) {
  let personInfo = "firstName: " + person.firstName + "\n";
  personInfo += "lastName: " + person.lastName + "\n";
  personInfo += "gender: " + person.gender + "\n";
  personInfo += "dob: " + person.dob + "\n";
  personInfo += "height: " + person.height + "\n";
  personInfo += "weight: " + person.weight + "\n";
  personInfo += "eyeColor: " + person.eyeColor + "\n";
  personInfo += "occupation: " + person.occupation + "\n";
  personInfo += "spouse: " + person.currentSpouse + "\n";
  personInfo += "parents: " + person.parents;
  alert(personInfo);
}

function findPersonDescendants(person, people, children = [], id) {
  let personDescendants = people.filter((item) => {
    if (item.parents.includes(person.id)) {
      children.push(item);
      return true;
    }
  });

  for (let child = id; child < children.length; child++) {
    return findPersonDescendants(children[child], people, children, child + 1);
  }

  return personDescendants;

}

function getSiblings(person, people) {
  let siblings = people.filter(possibleSibling);
  {
    for (let siblings = 0; siblings.parents.length; siblings++) {
      if (possibleSibling.parents.includes(person.parents[siblings])) {
        return true;
      }
    }
  }
  return siblings;
}

function getSpouse(person, people) {
  let spouse = people.filter(possibleSpouse);

  if (person.currentSpouse === possibleSpouse.id) {
    return true;
  }

  if (spouse.length === 0) {
    alert(`${person.firstName} is single. `);
  } else {
    alert(
      `${person.firstName} is married to ${spouse[0][`firstName`]} ${
        spouse[0][`lastName`]
      }. `
    );
  }
  return spouse;
}




function getParents(person, people) {
  let parents = [];

  let parent = people.filter((possibleParent) => {
    if (person.parents.includes(possibleParent.id)) {
      parents.push(parent);
      return true;
    }
    if (parents.length === 0) {
      alert(`${person.firstName} has no parents`);
    } else {
      let family = ``;
      for (let parent = 0; parent < parents.length; parent++) {
        family += `${parents[parent].firstName}, ${parents[parent].lastName}`;

        alert(`Parents: ${family}`);
      }
    }
  });
}
