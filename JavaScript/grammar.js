document.addEventListener("DOMContentLoaded", () => {
    const swiperWrapper = document.querySelector(".swiper-wrapper");

    fetch("./JSON/grammar.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(grammar => {
                const slide = document.createElement("div");
                slide.className = "swiper-slide";
                slide.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${grammar.title}</h5>
                            <p class="card-text">${grammar.description}</p>
                            <button class="btn btn-primary more-info" data-id="${grammar.id}">اطلاعات بیشتر</button>
                        </div>
                    </div>`;
                swiperWrapper.appendChild(slide);
            });

            document.querySelectorAll(".more-info").forEach(button => {
                button.addEventListener("click", e => {
                    const grammarId = e.target.getAttribute("data-id");
                    const grammar = data.find(item => item.id === grammarId);
                    if (grammar) {
                        showModal(grammar);
                    }
                });
            });

            new Swiper('.mySwiper', {
                slidesPerView: 1,
                spaceBetween: 20,
                autoplay: {
                    delay: 3000, 
                    disableOnInteraction: false, 
                },
                pagination: { el: '.swiper-pagination', clickable: true },
                navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
                breakpoints: {
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            });
        })
        .catch(error => console.error("خطا در بارگذاری داده‌ها:", error));
});

function showModal(grammar) {
    const modalTitle = document.getElementById("grammarModalLabel");
    const modalDescription = document.getElementById("grammarDescription");
    const modalExamples = document.getElementById("grammarExamples");

    modalTitle.textContent = grammar.title;
    modalDescription.textContent = grammar.details;
    modalExamples.innerHTML = `
        <strong>ساختار:</strong> ${grammar.structure}<br><br>
        <strong>مثال‌ها:</strong>
        <ul>${grammar.examples.map(ex => `<li>${ex}</li>`).join("")}</ul>
    `;

    const modal = new bootstrap.Modal(document.getElementById("grammarModal"));
    modal.show();
}