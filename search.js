let verbData = {};
const ITEMS_PER_PAGE = 10; 
let currentPage = 1;

fetch('irregularVerbs.json')
  .then(response => response.json())
  .then(data => {
    verbData = data;
    renderList(); 
  })
  .catch(error => console.error("Error loading JSON:", error));

function renderList(searchTerm = '') {
  const listContainer = document.getElementById('word-list');

  // جستجو در زبان انگلیسی و فارسی
  const searchResults = Object.keys(verbData)
    .filter(verb => 
      verb.toLowerCase().includes(searchTerm.toLowerCase()) || // جستجو در لغات انگلیسی
      (verbData[verb].persian && verbData[verb].persian.includes(searchTerm)) // جستجو در معانی فارسی
    )
    .slice(0, ITEMS_PER_PAGE * currentPage);

  if (searchResults.length === 0) {
    listContainer.innerHTML = '<p class="text-danger">هیچ کلمه‌ای یافت نشد.</p>';
    return;
  }

  let listHTML = '';
  searchResults.forEach(verb => {
    const verbInfo = verbData[verb];
    listHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${verb} - ${verbInfo.persian}
        <button class="btn btn-primary btn-sm" onclick="showDetails('${verb}')">جزئیات</button>
      </li>`;
  });

  listContainer.innerHTML = listHTML;

  document.getElementById('load-more').style.display =
    searchResults.length === Object.keys(verbData).filter(verb => 
      verb.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (verbData[verb].persian && verbData[verb].persian.includes(searchTerm))
    ).length
      ? 'none'
      : 'inline-block';

  document.getElementById('load-less').style.display = currentPage > 1 ? 'inline-block' : 'none';
}

function showDetails(verb) {
  const verbInfo = verbData[verb];
  document.getElementById('base-tense').textContent = `ساده: ${verb}`;
  document.getElementById('past-tense').textContent = `گذشته: ${verbInfo.past}`;
  document.getElementById('past-participle').textContent = `کامل: ${verbInfo.past_participle}`;
  document.getElementById('verbModalLabel').textContent = `جزئیات فعل ${verb}`;
  const modal = new bootstrap.Modal(document.getElementById('verbModal'));
  modal.show();
}

function loadMore() {
  currentPage++;
  renderList(document.getElementById('search-input').value.trim());
}

function loadLess() {
  if (currentPage > 1) {
    currentPage--;
    renderList(document.getElementById('search-input').value.trim());
  }
}

document.getElementById('search-form').addEventListener('submit', function (event) {
  event.preventDefault();
  currentPage = 1;
  const searchTerm = document.getElementById('search-input').value.trim();
  renderList(searchTerm);
});
