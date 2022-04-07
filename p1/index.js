const wordInput = document.querySelector('input[name="word"]');
const submitBtn = document.querySelector('input[type="submit"]');
const resultsDiv = document.querySelector("div");

// handleSubmit collects the user input, then verifies it.
// If input invalid, notify user, else generate word list and display to resultsDiv.
function handleSubmit(e) {
  e.preventDefault();

  const word = wordInput.value;

  if (word.length < 5) {
    resultsDiv.innerHTML = "<h3>Word must be exactly 5 letters!</h3>";
  } else {
    let words = getAllWords(word);

    displayResults(words);
  }
}

// displayResults inflates the resultsDiv element from the generated word list.
function displayResults(words) {
  let list = document.createElement("ul");

  for (let w of words) {
    let li = document.createElement("li");
    li.innerHTML = w;
    list.appendChild(li);
  }

  resultsDiv.innerHTML = "";
  resultsDiv.appendChild(list);
}

// Gets all possible combinations of word and then generates all permutaions of the combinations.
// Returns the result as a Set.
function getAllWords(word) {
  let letters = word.split("");
  let combos = getCombinations(letters);
  let perms = [];

  for (let c of combos) {
    perms = perms.concat(getPermutations(c));
  }

  perms.sort();
  let set = new Set(perms);

  return set;
}

// returns all combinations for choose 3 of 5.
function getCombinations(letters) {
  let results = [];

  for (let l = 1; l < 5; l++) {
    for (let r = l + 1; r < 5; r++) {
      results.push([letters[0], letters[l], letters[r]]);
    }
  }

  return results;
}

// returns all permutations of given unfixed array
function getPermutations(unfixed, fixed = []) {
  if (unfixed.length < 2) {
    return [...fixed, ...unfixed].join("");
  } else {
    let results = [];
    for (let x of unfixed) {
      let f = [...fixed, x];
      let u = [...unfixed];
      u.splice(u.indexOf(x), 1);
      results = results.concat(getPermutations(u, f));
    }

    return results;
  }
}

// set onclick of submit button with handler function
submitBtn.addEventListener("click", handleSubmit);
