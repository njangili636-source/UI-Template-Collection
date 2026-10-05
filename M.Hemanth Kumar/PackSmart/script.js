document.addEventListener("DOMContentLoaded", function() {

    const destination = document.getElementById("destination");
    const days = document.getElementById("days");
    const weather = document.getElementById("weather");
    const activity = document.getElementById("activity");

    const generateBtn = document.getElementById("generateBtn");
    const startBtn = document.getElementById("startBtn");
    const resetBtn = document.getElementById("resetBtn");

    const resultSection = document.getElementById("resultSection");

    const resultTitle = document.getElementById("resultTitle");
    const tripSummary = document.getElementById("tripSummary");

    const clothingList = document.getElementById("clothingList");
    const essentialList = document.getElementById("essentialList");
    const activityList = document.getElementById("activityList");

    const clothingCount = document.getElementById("clothingCount");
    const essentialCount = document.getElementById("essentialCount");
    const activityCount = document.getElementById("activityCount");

    const progressBar = document.getElementById("progressBar");
    const progressNumber = document.getElementById("progressNumber");

    const saveBtn = document.getElementById("saveBtn");

    const themeBtn = document.getElementById("themeBtn");

    const savedBtn = document.getElementById("savedBtn");
    const savedModal = document.getElementById("savedModal");
    const closeSavedBtn = document.getElementById("closeSavedBtn");
    const savedList = document.getElementById("savedList");

    const toast = document.getElementById("toast");

    let currentPlan = null;
    let toastTimer = null;


    /* =========================
       TOAST
    ========================= */

    function showToast(message) {

        clearTimeout(toastTimer);

        toast.textContent = message;
        toast.classList.add("show");

        toastTimer = setTimeout(function() {
            toast.classList.remove("show");
        }, 2200);
    }


    /* =========================
       START BUTTON
    ========================= */

    startBtn.addEventListener("click", function() {

        document.getElementById("planner").scrollIntoView({
            behavior: "smooth"
        });

    });


    /* =========================
       GENERATE LIST
    ========================= */

    generateBtn.addEventListener("click", function() {

        if (!destination.value) {
            showToast("Please choose your destination.");
            destination.focus();
            return;
        }

        if (!days.value) {
            showToast("Please choose trip duration.");
            days.focus();
            return;
        }

        if (!weather.value) {
            showToast("Please choose weather.");
            weather.focus();
            return;
        }

        if (!activity.value) {
            showToast("Please choose your activity.");
            activity.focus();
            return;
        }


        const tripDays = Number(days.value);

        const clothing = createClothingList(
            weather.value,
            tripDays
        );

        const essentials = createEssentialList();

        const activities = createActivityList(
            activity.value,
            destination.value
        );


        currentPlan = {
            destination: destination.value,
            days: tripDays,
            weather: weather.value,
            activity: activity.value,

            clothing: clothing,
            essentials: essentials,
            activities: activities,

            createdAt: new Date().toLocaleString()
        };


        resultTitle.textContent =
            destination.value + " Packing Plan";

        tripSummary.textContent =
            tripDays +
            " day trip • " +
            weather.value +
            " weather • " +
            activity.value;


        renderItems(
            clothingList,
            clothing,
            "clothing"
        );

        renderItems(
            essentialList,
            essentials,
            "essential"
        );

        renderItems(
            activityList,
            activities,
            "activity"
        );


        clothingCount.textContent =
            clothing.length;

        essentialCount.textContent =
            essentials.length;

        activityCount.textContent =
            activities.length;


        resultSection.classList.remove("hidden");

        resultSection.scrollIntoView({
            behavior: "smooth"
        });

        updateProgress();

        showToast("Packing list created! 🎉");

    });


    /* =========================
       CLOTHING
    ========================= */

    function createClothingList(weatherType, tripDays) {

        let list = [];

        const clothes =
            Math.min(Math.max(tripDays, 2), 7);

        if (weatherType === "Hot") {

            list.push("Light T-shirts × " + clothes);
            list.push("Shorts × 2");
            list.push("Sunglasses");
            list.push("Cap / Hat");
            list.push("Comfortable sandals");

        } else if (weatherType === "Cold") {

            list.push("Warm shirts × " + clothes);
            list.push("Jacket");
            list.push("Sweater");
            list.push("Warm socks");
            list.push("Gloves");
            list.push("Comfortable shoes");

        } else if (weatherType === "Rainy") {

            list.push("Quick-dry clothes × " + clothes);
            list.push("Rain jacket");
            list.push("Umbrella");
            list.push("Waterproof shoes");
            list.push("Extra socks");

        } else {

            list.push("T-shirts × " + clothes);
            list.push("Comfortable pants");
            list.push("Light jacket");
            list.push("Extra socks");
            list.push("Comfortable shoes");

        }

        return list;
    }


    /* =========================
       ESSENTIALS
    ========================= */

    function createEssentialList() {

        return [
            "Phone",
            "Phone charger",
            "Power bank",
            "Wallet",
            "ID / Passport",
            "Toiletries",
            "Water bottle",
            "Small first-aid kit"
        ];
    }


    /* =========================
       ACTIVITY LIST
    ========================= */

    function createActivityList(type, place) {

        let list = [];

        if (type === "Relaxing") {

            list.push("Book / Kindle");
            list.push("Headphones");
            list.push("Comfortable clothes");

        } else if (type === "Adventure") {

            list.push("Hiking shoes");
            list.push("Small backpack");
            list.push("Sunscreen");
            list.push("Torch");
            list.push("Water bottle");

        } else if (type === "Business") {

            list.push("Formal clothes");
            list.push("Laptop");
            list.push("Laptop charger");
            list.push("Notebook");
            list.push("Business cards");

        } else if (type === "Photography") {

            list.push("Camera");
            list.push("Camera charger");
            list.push("Extra memory card");
            list.push("Tripod");

        } else if (type === "Family") {

            list.push("Snacks");
            list.push("Extra clothes");
            list.push("Kids essentials");
            list.push("Entertainment items");

        }


        if (place === "Beach") {
            list.push("Beach towel");
        }

        if (place === "Mountain") {
            list.push("Warm layer");
        }

        return list;
    }


    /* =========================
       RENDER ITEMS
    ========================= */

    function renderItems(container, items, category) {

        container.innerHTML = "";

        items.forEach(function(item, index) {

            const wrapper =
                document.createElement("div");

            wrapper.className = "pack-item";

            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.id =
                category + "-" + index;


            const label =
                document.createElement("label");

            label.htmlFor =
                checkbox.id;

            label.textContent = item;


            checkbox.addEventListener("change", function() {

                if (checkbox.checked) {

                    wrapper.classList.add("checked");

                } else {

                    wrapper.classList.remove("checked");

                }

                updateProgress();

            });


            wrapper.appendChild(checkbox);
            wrapper.appendChild(label);

            container.appendChild(wrapper);

        });

    }


    /* =========================
       PROGRESS
    ========================= */

    function updateProgress() {

        const checkboxes =
            document.querySelectorAll(
                ".pack-item input[type='checkbox']"
            );

        if (checkboxes.length === 0) {

            progressBar.style.width = "0%";
            progressNumber.textContent = "0%";

            return;
        }


        let checked = 0;

        checkboxes.forEach(function(box) {

            if (box.checked) {
                checked++;
            }

        });


        const percentage =
            Math.round(
                (checked / checkboxes.length) * 100
            );


        progressBar.style.width =
            percentage + "%";

        progressNumber.textContent =
            percentage + "%";

    }


    /* =========================
       SAVE
    ========================= */

    saveBtn.addEventListener("click", function() {

        if (!currentPlan) {

            showToast("Create a packing list first.");

            return;
        }


        let saved =
            JSON.parse(
                localStorage.getItem("packSmartSaved") || "[]"
            );


        const duplicate =
            saved.some(function(item) {

                return (
                    item.destination === currentPlan.destination &&
                    item.days === currentPlan.days &&
                    item.weather === currentPlan.weather &&
                    item.activity === currentPlan.activity
                );

            });


        if (duplicate) {

            showToast("This packing list is already saved.");

            return;
        }


        saved.unshift(currentPlan);

        localStorage.setItem(
            "packSmartSaved",
            JSON.stringify(saved)
        );


        showToast("Packing list saved ❤️");

    });


    /* =========================
       NEW TRIP
    ========================= */

    resetBtn.addEventListener("click", function() {

        destination.value = "";
        days.value = "";
        weather.value = "";
        activity.value = "";

        currentPlan = null;

        resultSection.classList.add("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        showToast("Ready for a new trip!");

    });


    /* =========================
       DARK MODE
    ========================= */

    const savedTheme =
        localStorage.getItem("packSmartTheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

    }


    updateThemeButton();


    themeBtn.addEventListener("click", function() {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");


        localStorage.setItem(
            "packSmartTheme",
            isDark ? "dark" : "light"
        );


        updateThemeButton();

    });


    function updateThemeButton() {

        if (
            document.body.classList.contains("dark")
        ) {

            themeBtn.textContent = "☀️ Light";

        } else {

            themeBtn.textContent = "🌙 Dark";

        }

    }


    /* =========================
       SAVED LISTS
    ========================= */

    savedBtn.addEventListener("click", function() {

        loadSavedLists();

        savedModal.classList.remove("hidden");

    });


    closeSavedBtn.addEventListener("click", function() {

        savedModal.classList.add("hidden");

    });


    savedModal.addEventListener("click", function(event) {

        if (event.target === savedModal) {

            savedModal.classList.add("hidden");

        }

    });


    function loadSavedLists() {

        const saved =
            JSON.parse(
                localStorage.getItem("packSmartSaved") || "[]"
            );


        savedList.innerHTML = "";


        if (saved.length === 0) {

            savedList.innerHTML = `
                <div class="saved-item">
                    <strong>No saved trips yet.</strong>
                    <small>
                        Create and save a packing list first.
                    </small>
                </div>
            `;

            return;
        }


        saved.forEach(function(trip) {

            const item =
                document.createElement("div");

            item.className = "saved-item";

            item.innerHTML = `
                <strong>
                    🧳 ${escapeHTML(trip.destination)} Trip
                </strong>

                <small>
                    ${escapeHTML(String(trip.days))} days
                    • ${escapeHTML(trip.weather)}
                    • ${escapeHTML(trip.activity)}
                </small>

                <br>

                <small>
                    Saved: ${escapeHTML(trip.createdAt)}
                </small>
            `;

            savedList.appendChild(item);

        });

    }


    /* =========================
       SAFE TEXT
    ========================= */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }

});