function createHeader() {
    const header = `
      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand text-success fw-bold" href="./index.html">دنیای افعال</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">دنیای افعال</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="./index.html">صفحه اصلی</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./search.html">لیست لغات</a>
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
        <p>© 2025 دنیای افعال. تمامی حقوق محفوظ است.</p>
        <ul class="list-inline">
          <li class="list-inline-item">
            <a href="./index.html" class="text-white">صفحه اصلی</a>
          </li>
          <li class="list-inline-item">
            <a href="./search.html" class="text-white">لیست لفات </a>
          </li>
          <li class="list-inline-item">
            <a href="t.me/DevsHouse" class="text-white">پیشنهادات</a>
          </li>
        </ul>
      </div>
    </footer>
    `;
    document.getElementById("footer-container").innerHTML = footer;
  }
  
  // Initialize the components
  window.onload = function() {
    createHeader();
    createFooter();
  };