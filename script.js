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

document.getElementById("word-form").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const word = document.getElementById("word-input").value.trim();
  const resultDiv = document.getElementById("result");

  const language = detectLanguage(word);

  if (language === 'english') {
    if (verbData[word]) {
      const verbInfo = verbData[word];
      let resultMessage = `<h3>کلمه فارسی معنی: ${verbInfo.persian}</h3>`;

      if (verbInfo.irregular) {
        resultMessage += `
          <button class="btn btn-custom" data-toggle="modal" data-target="#verbModal" 
                  onclick="showModal('${verbInfo.past}', '${verbInfo.past_participle}')">
            نمایش شکل‌های مختلف
          </button>
        `;
      } else {
        resultMessage += `<p>این فعل با قاعده است.</p>`;
      }

      resultDiv.innerHTML = resultMessage;
    } else if (findVerbByForm(word)) {
      resultDiv.innerHTML = findVerbByForm(word);
    } else {
      resultDiv.innerHTML = `<h6 class="text-danger">این کلمه در دیتابیس موجود نیست، بنابراین این فعل با قاعده است.</h6>`;
    }
  } else if (language === 'persian') {
    let found = false;
    for (let verb in verbData) {
      if (verbData[verb].persian === word) {
        const verbInfo = verbData[verb];
        let resultMessage = `<h3>معنی انگلیسی: ${verb}</h3>`;

        if (verbInfo.irregular) {
          resultMessage += `
            <button class="btn btn-custom" data-toggle="modal" data-target="#verbModal" 
                    onclick="showModal('${verbInfo.past}', '${verbInfo.past_participle}')">
              نمایش شکل‌های مختلف
            </button>
          `;
        } else {
          resultMessage += `<p>این فعل با قاعده است.</p>`;
        }

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
function findVerbByForm(word) {
  for (let verb in verbData) {
    const verbInfo = verbData[verb];
    if (verbInfo.past === word) {
      return generateResultMessage(verb, verbInfo, 'past');
    } else if (verbInfo.past_participle === word) {
      return generateResultMessage(verb, verbInfo, 'past participle');
    }
  }
  return null;
}

function generateResultMessage(verb, verbInfo, formType) {
  return `
    <h3>کلمه انگلیسی: ${verb}</h3>
    <p>این فعل در شکل ${formType} است.</p>
    <button class="btn btn-custom" data-toggle="modal" data-target="#verbModal" 
            onclick="showModal('${verbInfo.past}', '${verbInfo.past_participle}')">
      نمایش شکل‌های مختلف
    </button>
  `;
}

function showModal(past, pastParticiple) {
  document.getElementById('past-tense').textContent = `گذشته: ${past}`;
  document.getElementById('past-participle').textContent = `کامل: ${pastParticiple}`;
}

$('#verbModal').on('show.bs.modal', function () {
});
