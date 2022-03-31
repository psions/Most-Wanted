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
  
  
  
  switch(displayOption){
    case "info":
      alert(("The following is " + person[0].firstName + " " + person[0].lastName + "'s personal info: \n\n" + displayPerson(person[0])));
      mainMenu(person[0], people);
      break;
    case "family":
      alert("The following are " + person[0].firstName + " " + person[0].lastName + "'s family members: \n\n" + displayPeople(getFamily(person[0], people)));
      mainMenu(person[0], people);
      break;
    case "descendants":
      alert("The following are " + person[0].firstName + " " + person[0].lastName + "'s descendants: \n\n" + displayPeople(getDescendants(person[0], people)));
      mainMenu(person[0], people);
      // let descendantsArray = getDescendants(person[0], people)
      // console.log(descendantsArray)
      break;
    case "restart":
      app(people);
      break;
    case "quit":
      return;
    default:
      alert("invalid input");
      mainMenu(person[0], people);
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
  let foundPerson = people.filter(function(person) {
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
  return(
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
// function displayPeople(people) {
//   alert(
//     people
//       .map(function (person) {
//         return person.firstName + " " + person.lastName + "\n";
//       })
//       .join("\n")
//   );
// }

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

function displayPerson(person) {
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
  return(personInfo);
}



function getFamily (person, people) {
  let array = [];
  let siblings = getSiblings(person, people);
  let descendants = getDescendants(person, people);
  let spouse = getSpouse(person, people);
  let parents = getParents(person, people);

  if (siblings != null) {
    for(let i = 0; i < siblings.length; i ++){
      array.push(siblings[i]);
    }
  }

  if (descendants != null) {
    for(let i = 0; i < descendants.length; i ++){
      array.push(descendants[i]);
      }
    }

  if (spouse != null) {
    for(let i = 0; i < spouse.length; i ++){
    array.push(spouse[i]);
    }
  }

  if (parents != null) {
    for(let i = 0; i < parents.length; i ++) {
      array.push(parents[i]);
    }
  }

  return array;
}

function getDescendants(person, people) {
  // Base case
  let descendants = people.filter(function(el){
    if(el.parents.includes(person.id)) return true;
  });

  if(descendants.length === 0) return descendants
  

  // Recursive Case
  for(let i = 0; i < descendants.length; i++) {
    descendants = descendants.concat(getDescendants(descendants[i], people));
  }
  return descendants;
}

function getSiblings(person, people) {
  let array = people.filter(function(el) {
    for (let i = 0; i < (el.parents).length; i++) {
      if(person == el) {
        return false;
      };
      if(person.includes(el.parents[i])){
        return true;
    };
  };
  });
  return array[0];
}

function getSpouse(person,people){
  let array = people.filter(function(el){
    if (el.currentSpouse === person.id){
      return true;
    }
  })
  return array
}

function getParents(person, people) {
  let array = people.filter(function(el) {
      if((person.parents).includes(el.id)) {
        return true;
      }
  });
  return array;
}

function searchByGender(people){
  let userInputGender = prompt("What is the person's gender?");
  let array = people.filter(function (el) {
    if(el.gender == userInputGender) {
      return true;
    }
  });
  return array;
  }

  function searchByAge(people){
    let userInputGender = prompt("What is the person's gender?");
    let array = people.filter(function (el) {
      if(el.gender == userInputGender) {
        return true;
      }
    });
    return array;
    }