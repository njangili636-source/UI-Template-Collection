document.addEventListener("DOMContentLoaded", () => {

    const problemCards = document.querySelectorAll(".problem-card");

    const diagnoseBtn = document.getElementById("diagnoseBtn");

    const result = document.getElementById("result");

    const resultTitle = document.getElementById("resultTitle");
    const resultDescription = document.getElementById("resultDescription");

    const difficulty = document.getElementById("difficulty");

    const toolsList = document.getElementById("toolsList");
    const timeText = document.getElementById("timeText");
    const safetyText = document.getElementById("safetyText");

    const stepsList = document.getElementById("stepsList");

    const severity = document.getElementById("severity");
    const attempt = document.getElementById("attempt");

    const saveBtn = document.getElementById("saveBtn");
    const newBtn = document.getElementById("newBtn");

    const startBtn = document.getElementById("startBtn");

    const themeBtn = document.getElementById("themeBtn");

    const savedBtn = document.getElementById("savedBtn");
    const savedModal = document.getElementById("savedModal");
    const closeModal = document.getElementById("closeModal");

    const savedList = document.getElementById("savedList");
    const clearBtn = document.getElementById("clearBtn");

    const toast = document.getElementById("toast");


    let selectedProblem = "tap";
    let currentGuide = null;


    /* PROBLEM SELECTION */

    problemCards.forEach(card => {

        card.addEventListener("click", () => {

            problemCards.forEach(item => {
                item.classList.remove("active");
            });

            card.classList.add("active");

            selectedProblem = card.dataset.problem;

            result.classList.remove("show");

        });

    });


    /* START BUTTON */

    startBtn.addEventListener("click", () => {

        document.getElementById("repairSection").scrollIntoView({
            behavior: "smooth"
        });

    });


    /* DIAGNOSE */

    diagnoseBtn.addEventListener("click", () => {

        const guide = getGuide(selectedProblem);

        currentGuide = guide;

        displayGuide(guide);

    });


    /* GUIDE DATABASE */

    function getGuide(problem) {

        const guides = {

            tap: {
                title: "Fix a Leaking Tap",
                description: "A dripping tap is often caused by a loose connection or a worn washer.",
                difficulty: "Easy",
                time: "15–30 minutes",
                tools: [
                    "Adjustable wrench",
                    "Screwdriver",
                    "Replacement washer"
                ],
                safety: "Turn off the water supply before opening the tap.",
                steps: [
                    "Turn off the water supply.",
                    "Open the tap to release remaining water.",
                    "Remove the tap handle carefully.",
                    "Check the washer for damage.",
                    "Replace the damaged washer.",
                    "Reassemble the tap and turn the water supply back on.",
                    "Check whether the dripping has stopped."
                ]
            },

            light: {
                title: "Troubleshoot a Light",
                description: "A light that does not turn on may have a bulb, switch or power connection issue.",
                difficulty: "Easy",
                time: "10–20 minutes",
                tools: [
                    "Replacement bulb",
                    "Dry cloth",
                    "Screwdriver"
                ],
                safety: "Switch off power before touching electrical components.",
                steps: [
                    "Switch off the power.",
                    "Check whether the bulb is properly fitted.",
                    "Try a known working bulb.",
                    "Check the wall switch.",
                    "If the light still does not work, check the circuit breaker.",
                    "For wiring problems, contact a qualified electrician."
                ]
            },

            door: {
                title: "Fix a Difficult Door",
                description: "A door that is difficult to close may have loose hinges or alignment issues.",
                difficulty: "Easy",
                time: "15–25 minutes",
                tools: [
                    "Screwdriver",
                    "Lubricant",
                    "Small level"
                ],
                safety: "Keep fingers away from hinge gaps while adjusting the door.",
                steps: [
                    "Open and close the door slowly to identify the problem area.",
                    "Check the hinge screws.",
                    "Tighten loose screws.",
                    "Apply a small amount of lubricant to the hinges.",
                    "Check whether the door is aligned correctly.",
                    "Test the door several times."
                ]
            },

            furniture: {
                title: "Stabilize Loose Furniture",
                description: "Loose furniture is commonly caused by loose screws, bolts or joints.",
                difficulty: "Easy",
                time: "10–20 minutes",
                tools: [
                    "Screwdriver",
                    "Allen key",
                    "Replacement screws"
                ],
                safety: "Do not use unstable furniture until it has been secured.",
                steps: [
                    "Place the furniture on a stable surface.",
                    "Identify the loose joint.",
                    "Tighten the screws or bolts.",
                    "Check all other joints.",
                    "Replace damaged screws if needed.",
                    "Test the furniture gently before normal use."
                ]
            },

            vacuum: {
                title: "Troubleshoot a Vacuum",
                description: "Reduced suction can be caused by a full dust container, blocked filter or hose.",
                difficulty: "Medium",
                time: "20–30 minutes",
                tools: [
                    "Cleaning brush",
                    "Dry cloth",
                    "Replacement filter if required"
                ],
                safety: "Unplug the vacuum before cleaning or inspecting it.",
                steps: [
                    "Unplug the vacuum.",
                    "Empty the dust container.",
                    "Check the hose for visible blockage.",
                    "Clean the filter according to the manufacturer's instructions.",
                    "Check the brush area.",
                    "Reconnect the vacuum and test it."
                ]
            },

            socket: {
                title: "Check a Power Socket",
                description: "A non-working socket may be related to the circuit breaker or another electrical issue.",
                difficulty: "Advanced",
                time: "10–20 minutes",
                tools: [
                    "Flashlight",
                    "No-contact voltage tester if available"
                ],
                safety: "Do not open or repair electrical wiring yourself. Contact a qualified electrician.",
                steps: [
                    "Unplug devices from the socket.",
                    "Check whether the circuit breaker has tripped.",
                    "Reset the breaker only if it is safe to do so.",
                    "Test the socket with a known working device.",
                    "Check whether nearby sockets also have no power.",
                    "If the problem continues, contact a qualified electrician."
                ]
            }

        };

        return guides[problem];

    }


    /* DISPLAY GUIDE */

    function displayGuide(guide) {

        resultTitle.textContent = guide.title;

        resultDescription.textContent =
            guide.description;

        difficulty.textContent =
            guide.difficulty;

        timeText.textContent =
            guide.time;

        safetyText.textContent =
            guide.safety;


        toolsList.innerHTML = "";

        guide.tools.forEach(tool => {

            const li = document.createElement("li");

            li.textContent = tool;

            toolsList.appendChild(li);

        });


        stepsList.innerHTML = "";

        guide.steps.forEach((step, index) => {

            const div = document.createElement("div");

            div.className = "step";

            div.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <p>${step}</p>
            `;

            stepsList.appendChild(div);

        });


        result.classList.add("show");

        result.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }


    /* SAVE GUIDE */

    saveBtn.addEventListener("click", () => {

        if (!currentGuide) {

            showToast("Find a solution first.");

            return;
        }


        let saved =
            JSON.parse(
                localStorage.getItem("fixItSaved")
            ) || [];


        const item = {

            title: currentGuide.title,

            difficulty: currentGuide.difficulty,

            time: currentGuide.time,

            date: new Date().toLocaleString()

        };


        saved.unshift(item);

        saved = saved.slice(0, 10);


        localStorage.setItem(
            "fixItSaved",
            JSON.stringify(saved)
        );


        showToast("Guide saved successfully.");

    });


    /* NEW PROBLEM */

    newBtn.addEventListener("click", () => {

        result.classList.remove("show");

        attempt.value = "";

        document.getElementById("repairSection").scrollIntoView({
            behavior: "smooth"
        });

        showToast("Choose another problem.");

    });


    /* SAVED MODAL */

    savedBtn.addEventListener("click", () => {

        displaySaved();

        savedModal.classList.add("show");

    });


    closeModal.addEventListener("click", () => {

        savedModal.classList.remove("show");

    });


    savedModal.addEventListener("click", event => {

        if (event.target === savedModal) {

            savedModal.classList.remove("show");

        }

    });


    function displaySaved() {

        const saved =
            JSON.parse(
                localStorage.getItem("fixItSaved")
            ) || [];


        savedList.innerHTML = "";


        if (saved.length === 0) {

            savedList.innerHTML =
                "<p>No saved guides yet.</p>";

            return;
        }


        saved.forEach(item => {

            const div = document.createElement("div");

            div.className = "saved-item";

            div.innerHTML = `
                <strong>${item.title}</strong>
                <br>
                Difficulty: ${item.difficulty}
                <br>
                Time: ${item.time}
                <br>
                <small>${item.date}</small>
            `;

            savedList.appendChild(div);

        });

    }


    /* CLEAR SAVED */

    clearBtn.addEventListener("click", () => {

        localStorage.removeItem("fixItSaved");

        displaySaved();

        showToast("Saved guides cleared.");

    });


    /* DARK MODE */

    const savedTheme =
        localStorage.getItem("fixItTheme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";

    }


    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
            document.body.classList.contains("dark");


        localStorage.setItem(
            "fixItTheme",
            isDark ? "dark" : "light"
        );


        themeBtn.textContent =
            isDark ? "☀️" : "🌙";

    });


    /* TOAST */

    function showToast(message) {

        toast.textContent = message;

        toast.classList.add("show");

        setTimeout(() => {

            toast.classList.remove("show");

        }, 2500);

    }

});