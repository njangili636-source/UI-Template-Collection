document.addEventListener("DOMContentLoaded", () => {

    const themeBtn =
        document.getElementById("themeBtn");

    const aboutBtn =
        document.getElementById("aboutBtn");

    const projectBtn =
        document.getElementById("projectBtn");

    const exploreBtn =
        document.getElementById("exploreBtn");

    const searchInput =
        document.getElementById("searchInput");

    const filters =
        document.querySelectorAll(".filter");

    const cards =
        document.querySelectorAll(".app-card");

    const noResults =
        document.getElementById("noResults");

    const toast =
        document.getElementById("toast");


    let selectedFilter = "all";


    /* ==========================
       TOAST
    ========================== */

    function showToast(message) {

        if (!toast) return;

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {

            toast.classList.remove("show");

        }, 2200);
    }


    /* ==========================
       EXPLORE BUTTON
    ========================== */

    if (exploreBtn) {

        exploreBtn.addEventListener("click", () => {

            document
                .getElementById("apps")
                .scrollIntoView({
                    behavior: "smooth"
                });

            showToast(
                "🚀 Exploring all 20 applications"
            );

        });

    }


    /* ==========================
       ABOUT BUTTON
    ========================== */

    if (aboutBtn) {

        aboutBtn.addEventListener("click", () => {

            document
                .getElementById("about")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    }


    /* ==========================
       PROJECT BUTTON
    ========================== */

    if (projectBtn) {

        projectBtn.addEventListener("click", () => {

            document
                .getElementById("about")
                .scrollIntoView({
                    behavior: "smooth"
                });

            showToast(
                "✦ Welcome to our student project"
            );

        });

    }


    /* ==========================
       SEARCH + FILTER
    ========================== */

    function updateApps() {

        const search =
            searchInput ?
            searchInput.value
            .toLowerCase()
            .trim() :
            "";

        let visibleCount = 0;


        cards.forEach(card => {

            const name =
                card.dataset.name ?
                card.dataset.name.toLowerCase() :
                "";

            const category =
                card.dataset.category || "";


            const matchesSearch =
                name.includes(search);

            const matchesFilter =
                selectedFilter === "all" ||
                category === selectedFilter;


            if (
                matchesSearch &&
                matchesFilter
            ) {

                card.style.display = "block";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        if (noResults) {

            noResults.style.display =
                visibleCount === 0 ?
                "block" :
                "none";

        }

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            updateApps
        );

    }


    /* ==========================
       FILTER BUTTONS
    ========================== */

    filters.forEach(filter => {

        filter.addEventListener(
            "click",
            () => {

                filters.forEach(item => {

                    item.classList.remove("active");

                });


                filter.classList.add("active");


                selectedFilter =
                    filter.dataset.filter;


                updateApps();

            }
        );

    });


    /* ==========================
       DARK / LIGHT MODE
    ========================== */

    const savedTheme =
        localStorage.getItem("uix-theme");


    if (savedTheme === "light") {

        document.body.classList.add("light");

        if (themeBtn) {
            themeBtn.textContent = "🌙";
        }

    } else {

        if (themeBtn) {
            themeBtn.textContent = "☀️";
        }

    }


    if (themeBtn) {

        themeBtn.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "light"
                );


                const isLight =
                    document.body.classList.contains(
                        "light"
                    );


                if (isLight) {

                    themeBtn.textContent = "🌙";

                    localStorage.setItem(
                        "uix-theme",
                        "light"
                    );

                    showToast(
                        "☀️ Light mode enabled"
                    );

                } else {

                    themeBtn.textContent = "☀️";

                    localStorage.setItem(
                        "uix-theme",
                        "dark"
                    );

                    showToast(
                        "🌙 Dark mode enabled"
                    );

                }

            }
        );

    }


    /* ==========================
       3D APP CARD TILT
    ========================== */

    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const rotateX =
                    ((rect.height / 2) - y) / 30;

                const rotateY =
                    (x - rect.width / 2) / 30;


                card.style.transform = `
                    translateY(-8px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.015)
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform = "";

            }
        );

    });


    /* ==========================
       "/" SEARCH SHORTCUT
    ========================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "/" &&
                document.activeElement !== searchInput
            ) {

                event.preventDefault();

                if (searchInput) {
                    searchInput.focus();
                }

            }

        }
    );


    /* ==========================
       3D UIX MOUSE MOVEMENT
    ========================== */

    const stage =
        document.querySelector(".uix-stage");

    const circle =
        document.querySelector(".uix-circle");


    if (stage && circle) {

        stage.addEventListener(
            "mousemove",
            event => {

                const rect =
                    stage.getBoundingClientRect();


                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateY =
                    (x - centerX) / 35;

                const rotateX =
                    (centerY - y) / 35;


                circle.style.animation =
                    "none";

                circle.style.transform = `
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale(1.04)
                `;

            }
        );


        stage.addEventListener(
            "mouseleave",
            () => {

                circle.style.animation =
                    "uixFloat 5s ease-in-out infinite";

                circle.style.transform = "";

            }
        );

    }

});