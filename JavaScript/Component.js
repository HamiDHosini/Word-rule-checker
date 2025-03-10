function createHeader() {
  const header = `
     <nav class="navbar bg-body-tertiary navbar-expand-lg shadow-sm">
  <div class="container">
    <a class="navbar-brand text-success fw-bold d-flex align-items-center" href="./index.html">
      <i class="bi bi-journal-bookmark-fill me-2"></i> دنیای لغات
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="offcanvas offcanvas-start w-75" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title text-success fw-bold" id="offcanvasNavbarLabel">
          <i class="bi bi-journal-bookmark-fill me-2"></i> دنیای لغات
        </h5>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active d-flex align-items-center" aria-current="page" href="./index.html">
              <i class=" fw-bold bi bi-house-door-fill me-2 text-primary"></i> صفحه اصلی
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center" href="./search.html">
              <i class=" fw-bold bi bi-search me-2"></i> لیست لغات
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex align-items-center" href="./game.html">
              <i class=" fw-bold bi bi-controller me-2 text-warning"></i> بازی لغات
            </a>
          </li>
                    <li class="nav-item">
            <a class="nav-link d-flex align-items-center" href="./grammar.html">
              <i class=" fw-bold bi bi-spellcheck me-2 text-info"></i>گرامر
            </a>
          </li>
          <li class="nav-item d-md-none">
            <hr>
            <b>شبکه‌های اجتماعی</b>
            <div class="row w-75 fs-1 my-1">
              <div class="col">
                <a href="https://t.me/DevsHouse" class="text-primary">
                  <i class="bi bi-telegram"></i>
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>

    `;
  document.getElementById("header-container").innerHTML = header;
}

function createFooter() {
  const footer = `
   <footer class="bg-dark text-white text-center py-4">
      <div class="container">
        <p>تحت نظر استاد عبدالحمید  </p>

        <p>© 2025 دنیای لغات. تمامی حقوق محفوظ است.</p>
        <ul class="list-inline">
          <li class="list-inline-item">
            <a href="./index.html" class="text-white">صفحه اصلی</a>
          </li>
          <li class="list-inline-item">
            <a href="./search.html" class="text-white">لیست لغات </a>
          </li>
            <li class="list-inline-item">
            <a href="./game.html" class="text-white">بازی</a>
          </li>
          <li class="list-inline-item">
            <a href="https://t.me/devsHouse" target="_blank" class="text-white">پیشنهادات</a>
          </li>
        </ul>

      </div>
    </footer>
    `;
  document.getElementById("footer-container").innerHTML = footer;
}

window.onload = function () {
  createHeader();
  createFooter();
};
