let verbData = {};
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

fetch('./JSON/irregularVerbs.json')
  .then(response => response.json())
  .then(data => {
    verbData = data;
    renderList();
  })
  .catch(error => console.error("Error loading JSON:", error));

function renderList(searchTerm = '') {
  const listContainer = document.getElementById('word-list');

  const searchResults = Object.keys(verbData)
    .filter(verb => {
      const verbInfo = verbData[verb];
      return (
        verb.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (verbInfo.past && verbInfo.past.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (verbInfo.past_participle && verbInfo.past_participle.toLowerCase().includes(searchTerm.toLowerCase())) || // جستجو در شکل کامل
        (verbInfo.persian && verbInfo.persian.includes(searchTerm))
      );
    })
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
        ${verb} - ${verbInfo.persian || 'نامشخص'}
        <button class="btn btn-primary btn-sm" onclick="showDetails('${verb}')">جزئیات</button>
      </li>`;
  });

  listContainer.innerHTML = listHTML;

  const totalResults = Object.keys(verbData).filter(verb => {
    const verbInfo = verbData[verb];
    return (
      verb.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (verbInfo.past && verbInfo.past.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (verbInfo.past_participle && verbInfo.past_participle.toLowerCase().includes(searchTerm.toLowerCase())) || 
      (verbInfo.persian && verbInfo.persian.includes(searchTerm))
    );
  }).length;

  document.getElementById('load-more').style.display =
    searchResults.length >= totalResults ? 'none' : 'inline-block';

  document.getElementById('load-less').style.display = currentPage > 1 ? 'inline-block' : 'none';
}

function showDetails(verb) {
  const verbInfo = verbData[verb];
  document.getElementById('base-tense').textContent = `ساده: ${verb}`;
  document.getElementById('past-tense').textContent = `گذشته: ${verbInfo.past || 'نامشخص'}`;
  document.getElementById('past-participle').textContent = `کامل: ${verbInfo.past_participle || 'نامشخص'}`;
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
document.getElementById('search-input').addEventListener('input', function () {
  currentPage = 1;
  const searchTerm = this.value.trim();
  renderList(searchTerm);
});
