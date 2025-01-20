fetch('./JSON/tens.json')
    .then(response => response.json())
    .then(data => {
        const tenses = data.tenses;
        const tenseList = document.getElementById('tenseList');
        const searchForm = document.getElementById('searchForm');
        const searchInput = document.getElementById('searchInput');
        const modal = document.getElementById('tenseModal');
        const modalTitle = document.getElementById('tenseModalLabel');
        const modalDescription = document.getElementById('tenseDescription');
        const modalDescriptionFa = document.getElementById('tenseDescription-fa');
        const modalStructure = document.getElementById('tenseStructure');
        const modalExample = document.getElementById('tenseExample');
        const modalExampleFa = document.getElementById('tenseExample-fa');
        const modalCloseButton = modal.querySelector('.close');

        const bootstrapModal = new bootstrap.Modal(modal);
        function renderTenses(filteredTenses) {
            tenseList.innerHTML = '';  

            filteredTenses.forEach(tense => {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item');
                listItem.innerHTML = `
                    <button class="btn btn-primary btn-sm" onclick="showDetails('${tense.tense_en}')">جزئیات</button>
                    <strong>${tense.tense_en}</strong>
                `;
                tenseList.appendChild(listItem);
            });
        }

        window.showDetails = function(tenseName) {
            const tense = tenses.find(t => t.tense_en === tenseName);
            if (tense) {
                modalTitle.textContent = tense.tense_en;
                modalDescription.textContent = tense.description;
                modalDescriptionFa.textContent = tense.description_fa;
                modalStructure.textContent = tense.structure;
                modalExample.textContent = tense.example;
                modalExampleFa.textContent = tense.example_fa;
                bootstrapModal.show();
            }
        }

        modalCloseButton.addEventListener('click', function() {
            bootstrapModal.hide();
        });

        renderTenses(tenses);

        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchQuery = searchInput.value.toLowerCase();
            const filteredTenses = tenses.filter(tense =>
                tense.tense_en.toLowerCase().includes(searchQuery) || 
                tense.tense_fa.toLowerCase().includes(searchQuery)
            );
            renderTenses(filteredTenses);
        });
    });
