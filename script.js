
let verbData = {};

fetch('irregularVerbs.json')
  .then(response => response.json())
  .then(data => {
    verbData = data;
  })
  .catch(error => console.error("Error loading JSON:", error));

function detectLanguage(word) {
  const persianRegex = /[\u0600-\u06FF]/;
  return persianRegex.test(word) ? 'persian' : 'english';
}

document.getElementById("word-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const word = document.getElementById("word-input").value.trim();
  const resultDiv = document.getElementById("result");

  const language = detectLanguage(word);

  if (language === 'english') {
    const result = findVerb(word);

    if (result) {
      const { verb, verbInfo, formType } = result;
      let resultMessage = `<h3>کلمه فارسی معنی: ${verbInfo.persian}</h3>`;

      if (formType === 'past') {
        resultMessage += `<p>این کلمه در شکل گذشته است.</p>`;
      } else if (formType === 'past participle') {
        resultMessage += `<p>این کلمه در شکل کامل است.</p>`;
      } else {
        resultMessage += `<p>این فعل در حالت ساده است.</p>`;
      }

      resultMessage += `
        <button class="btn btn-warning" data-toggle="modal" data-target="#verbModal" 
                onclick="showModal('${verb}', '${verbInfo.past}', '${verbInfo.past_participle}')">
          نمایش شکل‌های مختلف
        </button>
      `;

      resultDiv.innerHTML = resultMessage;
    } else {
      resultDiv.innerHTML = `<h6 class="text-danger">این کلمه در دیتابیس موجود نیست، بنابراین این فعل با قاعده است.</h6>`;
    }
  } else if (language === 'persian') {
    let found = false;

    for (let verb in verbData) {
      if (verbData[verb].persian === word) {
        const verbInfo = verbData[verb];
        let resultMessage = `<h3>معنی انگلیسی: ${verb}</h3>`;

        resultMessage += `
          <button class="btn btn-custom" data-toggle="modal" data-target="#verbModal" 
                  onclick="showModal('${verb}', '${verbInfo.past}', '${verbInfo.past_participle}')">
            نمایش شکل‌های مختلف
          </button>
        `;

        resultDiv.innerHTML = resultMessage;
        found = true;
        break;
      }
    }

    if (!found) {
      resultDiv.innerHTML = `<h3 class="text-danger">این کلمه در دیتابیس موجود نیست، بنابراین این فعل با قاعده است.</h3>`;
    }
  }
});

function findVerb(word) {
  if (!word) return null;

  for (let verb in verbData) {
    const verbInfo = verbData[verb];

    if (!verbInfo) continue; 

    if (verb?.toLowerCase() === word.toLowerCase()) {
      return { verb, verbInfo, formType: 'simple' }; 
    } else if (verbInfo.past?.toLowerCase() === word.toLowerCase()) {
      return { verb, verbInfo, formType: 'past' }; 
    } else if (verbInfo.past_participle?.toLowerCase() === word.toLowerCase()) {
      return { verb, verbInfo, formType: 'past participle' };
    }
  }
  return null;
}

function showModal(base, past, pastParticiple) {
  document.getElementById('base-tense').textContent = `ساده: ${base}`;
  document.getElementById('past-tense').textContent = `گذشته: ${past}`;
  document.getElementById('past-participle').textContent = `کامل: ${pastParticiple}`;
}

$('#verbModal').on('show.bs.modal', function () {});
