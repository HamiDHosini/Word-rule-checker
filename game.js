let verbData = {};  
let currentWord = {};  

function loadWordsFromJson() {
  fetch('irregularVerbs.json')
    .then(response => response.json())
    .then(data => {
      verbData = data; 
      showWord(); 
    })
    .catch(error => console.error("Error loading JSON:", error));
}

function getRandomWord() {
  const keys = Object.keys(verbData);  
  const randomKey = keys[Math.floor(Math.random() * keys.length)];  
  return { word: randomKey, ...verbData[randomKey] };  
}

function getScrambledWord(word) {
  let scrambled = word.split('');
  while (scrambled.join('') === word) {
    scrambled.sort(() => Math.random() - 0.5);  
  }
  return scrambled.join('');
}

function showWord() {
  currentWord = getRandomWord();

  const scrambledWord = getScrambledWord(currentWord.word);
  document.getElementById('word-display').textContent = scrambledWord;
  document.getElementById('result-message').textContent = '';
  document.getElementById('word-meaning').style.display = 'none';
  document.getElementById('guess-input').value = '';
  document.getElementById('next-word').style.display = 'none';  
  document.getElementById('change-word').style.display = 'inline-block';  
}

document.getElementById('submit-guess').addEventListener('click', function() {
  const userGuess = document.getElementById('guess-input').value.trim().toLowerCase();
  const correctWord = currentWord.word;

  if (userGuess === "") {
    document.getElementById('result-message').textContent = 'لطفاً یک حدس وارد کنید.';
  } else if (userGuess === correctWord) {
    document.getElementById('result-message').textContent = 'درست حدس زدید!';
    document.getElementById('word-meaning').textContent = `معنی: ${currentWord.persian}`;
    document.getElementById('word-meaning').style.display = 'block';
    document.getElementById('next-word').style.display = 'inline-block';
    document.getElementById('change-word').style.display = 'none';  
  } else {
    document.getElementById('result-message').textContent = 'اشتباه حدس زدید. دوباره امتحان کنید.';
  }
});

document.getElementById('next-word').addEventListener('click', function() {
  showWord();  
  document.getElementById('next-word').style.display = 'none'; 
});

document.getElementById('change-word').addEventListener('click', function() {
  showWord();  
});


loadWordsFromJson();
