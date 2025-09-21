// Function to check spelling for a single word
async function checkWord(word) {
  const response = await fetch(`https://api.datamuse.com/words?sp=${word}&max=1`);
  const data = await response.json();
  if (data.length === 0 || data[0].word.toLowerCase() !== word.toLowerCase()) {
    return data.length > 0 ? data[0].word : null;
  }
  return null; // word is correct
}

// Function to handle input events
function handleInput(event) {
  const input = event.target;
  const words = input.value.split(/\s+/); // split by space
  let corrected = words.map(async (word) => {
    const suggestion = await checkWord(word);
    return suggestion || word;
  });

  Promise.all(corrected).then((newWords) => {
    input.value = newWords.join(" ");
  });
}

// Attach event listeners to all input and textarea elements
function attachListeners() {
  document.querySelectorAll("input[type='text'], textarea").forEach((el) => {
    el.addEventListener("input", handleInput);
  });
}

// Run on page load
attachListeners();

// Optional: dynamically attach to future elements
const observer = new MutationObserver(attachListeners);
observer.observe(document.body, { childList: true, subtree: true });
