// ==========================================
// AGRISCAN - SMART PLANT DOCTOR
// ==========================================


// ------------------------------
// GET ELEMENTS
// ------------------------------

const plantImage = document.getElementById("plantImage");
const uploadBox = document.getElementById("uploadBox");

const uploadContent = document.getElementById("uploadContent");
const previewBox = document.getElementById("previewBox");
const previewImage = document.getElementById("previewImage");

const fileName = document.getElementById("fileName");
const fileSize = document.getElementById("fileSize");

const removeImage = document.getElementById("removeImage");

const plantType = document.getElementById("plantType");
const locationSelect = document.getElementById("location");
const symptom = document.getElementById("symptom");

const scanBtn = document.getElementById("scanBtn");

const scanningSection = document.getElementById("scanningSection");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const scanMessage = document.getElementById("scanMessage");

const resultSection = document.getElementById("resultSection");

const healthIcon = document.getElementById("healthIcon");
const healthTitle = document.getElementById("healthTitle");
const severity = document.getElementById("severity");

const resultDescription = document.getElementById("resultDescription");

const resultPlant = document.getElementById("resultPlant");
const resultLocation = document.getElementById("resultLocation");
const resultSymptom = document.getElementById("resultSymptom");

const careList = document.getElementById("careList");

const newScanBtn = document.getElementById("newScanBtn");
const saveResultBtn = document.getElementById("saveResultBtn");

const themeBtn = document.getElementById("themeBtn");
const historyBtn = document.getElementById("historyBtn");


// ------------------------------
// IMAGE UPLOAD
// ------------------------------

plantImage.addEventListener("change", function() {

    const file = this.files[0];

    if (!file) {
        return;
    }

    handleImage(file);
});


// ------------------------------
// HANDLE IMAGE
// ------------------------------

function handleImage(file) {

    // Check file type

    if (!file.type.startsWith("image/")) {

        alert("Please choose a valid image file.");

        plantImage.value = "";

        return;
    }


    // Check file size

    if (file.size > 10 * 1024 * 1024) {

        alert("Image should be less than 10 MB.");

        plantImage.value = "";

        return;
    }


    // FileReader

    const reader = new FileReader();


    reader.onload = function(event) {

        previewImage.src = event.target.result;

        fileName.textContent = file.name;

        fileSize.textContent =
            (file.size / 1024 / 1024).toFixed(2) + " MB";


        uploadContent.classList.add("hidden");

        previewBox.classList.remove("hidden");

    };


    reader.onerror = function() {

        alert("Unable to read this image.");

    };


    reader.readAsDataURL(file);
}


// ------------------------------
// REMOVE IMAGE
// ------------------------------

removeImage.addEventListener("click", function() {

    plantImage.value = "";

    previewImage.src = "";

    previewBox.classList.add("hidden");

    uploadContent.classList.remove("hidden");
});


// ------------------------------
// DRAG & DROP
// ------------------------------

uploadBox.addEventListener("dragover", function(event) {

    event.preventDefault();

    uploadBox.classList.add("dragover");

});


uploadBox.addEventListener("dragleave", function() {

    uploadBox.classList.remove("dragover");

});


uploadBox.addEventListener("drop", function(event) {

    event.preventDefault();

    uploadBox.classList.remove("dragover");


    const file = event.dataTransfer.files[0];

    if (!file) {
        return;
    }


    // Put dropped file into input

    try {

        const dataTransfer = new DataTransfer();

        dataTransfer.items.add(file);

        plantImage.files = dataTransfer.files;

    } catch (error) {

        console.log("DataTransfer not supported");

    }


    handleImage(file);
});


// ------------------------------
// PLANT DATABASE
// ------------------------------

const plantResults = {

    tomato: {

        yellow: {
            icon: "🍅",
            title: "Possible Nutrient Deficiency",
            severity: "Needs Attention",
            description: "Yellow tomato leaves can be associated with nutrient imbalance, watering issues or natural leaf aging.",
            care: [
                "Check soil moisture before watering.",
                "Provide balanced plant nutrition.",
                "Remove heavily damaged leaves.",
                "Ensure sufficient sunlight and airflow."
            ]
        },

        spots: {
            icon: "🍅",
            title: "Possible Leaf Spot",
            severity: "Moderate",
            description: "Dark or unusual spots may indicate a fungal or bacterial leaf problem.",
            care: [
                "Remove badly affected leaves.",
                "Avoid watering directly on leaves.",
                "Improve air circulation.",
                "Monitor nearby plants for similar symptoms."
            ]
        },

        dry: {
            icon: "🍅",
            title: "Possible Water Stress",
            severity: "Needs Attention",
            description: "Dry or wilting tomato leaves may be related to insufficient water or heat stress.",
            care: [
                "Check soil moisture.",
                "Water deeply when the soil is dry.",
                "Provide shade during extreme heat.",
                "Maintain regular watering."
            ]
        },

        holes: {
            icon: "🍅",
            title: "Possible Pest Activity",
            severity: "Check Plant",
            description: "Holes in leaves can be associated with insects or other pests.",
            care: [
                "Inspect both sides of leaves.",
                "Remove visible insects.",
                "Keep the area clean.",
                "Use appropriate pest control if required."
            ]
        },

        healthy: {
            icon: "🍅",
            title: "Plant Looks Healthy",
            severity: "Healthy",
            description: "The selected symptoms do not indicate an obvious problem in this demo analysis.",
            care: [
                "Continue regular watering.",
                "Maintain sufficient sunlight.",
                "Monitor new leaves regularly.",
                "Keep the growing area clean."
            ]
        }

    },


    rice: {

        yellow: {
            icon: "🌾",
            title: "Possible Nutrient Issue",
            severity: "Needs Attention",
            description: "Yellow rice leaves can be associated with nutrient deficiency or water management issues.",
            care: [
                "Check soil nutrients.",
                "Maintain appropriate field water levels.",
                "Use balanced fertilizer when required.",
                "Monitor new leaf growth."
            ]
        },

        spots: {
            icon: "🌾",
            title: "Possible Leaf Disease",
            severity: "Moderate",
            description: "Leaf spots may indicate a possible rice leaf disease.",
            care: [
                "Remove severely affected plant material.",
                "Avoid excessive moisture.",
                "Maintain field airflow.",
                "Monitor surrounding plants."
            ]
        },

        dry: {
            icon: "🌾",
            title: "Possible Water Stress",
            severity: "Needs Attention",
            description: "Dry leaves may indicate insufficient water or environmental stress.",
            care: [
                "Check field moisture.",
                "Maintain suitable irrigation.",
                "Avoid prolonged dry conditions.",
                "Monitor plant recovery."
            ]
        },

        holes: {
            icon: "🌾",
            title: "Possible Pest Damage",
            severity: "Check Plant",
            description: "Leaf holes may be caused by insects or other pests.",
            care: [
                "Inspect leaves carefully.",
                "Look for insects or larvae.",
                "Monitor affected areas.",
                "Use suitable pest management practices."
            ]
        },

        healthy: {
            icon: "🌾",
            title: "Rice Plant Looks Healthy",
            severity: "Healthy",
            description: "The plant appears healthy based on the selected demo symptoms.",
            care: [
                "Continue proper irrigation.",
                "Maintain soil nutrition.",
                "Monitor plant growth.",
                "Inspect regularly for pests."
            ]
        }

    },


    cotton: {

        yellow: {
            icon: "🌿",
            title: "Possible Nutrient Stress",
            severity: "Needs Attention",
            description: "Yellowing leaves may be related to nutrient or water stress.",
            care: [
                "Check soil moisture.",
                "Review nutrient availability.",
                "Avoid excessive watering.",
                "Monitor new leaves."
            ]
        },

        spots: {
            icon: "🌿",
            title: "Possible Leaf Disease",
            severity: "Moderate",
            description: "Spots can be associated with fungal or bacterial leaf problems.",
            care: [
                "Remove severely affected leaves.",
                "Improve airflow.",
                "Avoid wetting leaves.",
                "Monitor disease spread."
            ]
        },

        dry: {
            icon: "🌿",
            title: "Possible Drought Stress",
            severity: "Needs Attention",
            description: "Dry leaves may indicate insufficient moisture or heat stress.",
            care: [
                "Check soil moisture.",
                "Maintain appropriate irrigation.",
                "Protect young plants from extreme heat.",
                "Monitor plant recovery."
            ]
        },

        holes: {
            icon: "🌿",
            title: "Possible Pest Damage",
            severity: "Check Plant",
            description: "Holes can indicate insect feeding or pest activity.",
            care: [
                "Inspect leaves carefully.",
                "Look for insects.",
                "Remove severely damaged leaves.",
                "Use suitable pest management."
            ]
        },

        healthy: {
            icon: "🌿",
            title: "Cotton Plant Looks Healthy",
            severity: "Healthy",
            description: "The selected information suggests a healthy plant in this demo.",
            care: [
                "Continue regular irrigation.",
                "Maintain soil nutrition.",
                "Monitor pests.",
                "Keep the field clean."
            ]
        }

    },


    chilli: {

        yellow: {
            icon: "🌶️",
            title: "Possible Nutrient Stress",
            severity: "Needs Attention",
            description: "Yellow leaves may be related to nutrient imbalance or watering problems.",
            care: [
                "Check soil moisture.",
                "Maintain balanced nutrition.",
                "Avoid overwatering.",
                "Provide sufficient sunlight."
            ]
        },

        spots: {
            icon: "🌶️",
            title: "Possible Leaf Spot",
            severity: "Moderate",
            description: "Leaf spots can indicate a possible disease or environmental stress.",
            care: [
                "Remove affected leaves.",
                "Improve airflow.",
                "Avoid overhead watering.",
                "Monitor nearby plants."
            ]
        },

        dry: {
            icon: "🌶️",
            title: "Possible Water Stress",
            severity: "Needs Attention",
            description: "Dry or wilting chilli leaves may be related to insufficient moisture.",
            care: [
                "Check soil moisture.",
                "Water consistently.",
                "Protect from excessive heat.",
                "Maintain good soil condition."
            ]
        },

        holes: {
            icon: "🌶️",
            title: "Possible Pest Activity",
            severity: "Check Plant",
            description: "Holes may indicate insect feeding.",
            care: [
                "Inspect leaves.",
                "Look for pests.",
                "Remove visible insects.",
                "Use suitable pest control if necessary."
            ]
        },

        healthy: {
            icon: "🌶️",
            title: "Chilli Plant Looks Healthy",
            severity: "Healthy",
            description: "The plant appears healthy based on the selected information.",
            care: [
                "Continue regular watering.",
                "Maintain good sunlight.",
                "Monitor pests.",
                "Keep the growing area clean."
            ]
        }

    },


    potato: {

        yellow: {
            icon: "🥔",
            title: "Possible Nutrient Issue",
            severity: "Needs Attention",
            description: "Yellow leaves can be associated with nutrient or water management issues.",
            care: [
                "Check soil condition.",
                "Maintain suitable moisture.",
                "Use balanced nutrition.",
                "Monitor plant growth."
            ]
        },

        spots: {
            icon: "🥔",
            title: "Possible Leaf Disease",
            severity: "Moderate",
            description: "Spots may indicate a possible potato leaf disease.",
            care: [
                "Remove badly affected leaves.",
                "Improve airflow.",
                "Avoid excessive leaf moisture.",
                "Monitor disease development."
            ]
        },

        dry: {
            icon: "🥔",
            title: "Possible Water Stress",
            severity: "Needs Attention",
            description: "Dry leaves may indicate insufficient water or heat stress.",
            care: [
                "Check soil moisture.",
                "Maintain regular irrigation.",
                "Avoid extreme dry conditions.",
                "Monitor plant recovery."
            ]
        },

        holes: {
            icon: "🥔",
            title: "Possible Pest Damage",
            severity: "Check Plant",
            description: "Leaf holes may indicate insect activity.",
            care: [
                "Inspect leaves.",
                "Look for insects.",
                "Remove visible pests.",
                "Monitor the crop regularly."
            ]
        },

        healthy: {
            icon: "🥔",
            title: "Potato Plant Looks Healthy",
            severity: "Healthy",
            description: "The selected information indicates a healthy plant in this demo.",
            care: [
                "Continue proper irrigation.",
                "Maintain soil nutrients.",
                "Monitor for pests.",
                "Inspect leaves regularly."
            ]
        }

    }

};


// ------------------------------
// SCAN BUTTON
// ------------------------------

scanBtn.addEventListener("click", function() {

    // Validation

    if (!plantImage.files.length) {

        alert("🌱 Please choose a plant image first.");

        return;
    }


    if (!plantType.value) {

        alert("Please select the plant type.");

        return;
    }


    if (!locationSelect.value) {

        alert("Please select the growing location.");

        return;
    }


    if (!symptom.value) {

        alert("Please select the visible symptom.");

        return;
    }


    // Hide previous result

    resultSection.classList.add("hidden");

    // Show scanning

    scanningSection.classList.remove("hidden");

    // Scroll

    scanningSection.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });


    let progress = 0;


    const messages = [
        "Reading plant image...",
        "Checking plant information...",
        "Analyzing selected symptoms...",
        "Preparing care recommendations...",
        "Finalizing result..."
    ];


    const interval = setInterval(function() {

        progress += 5;

        progressBar.style.width = progress + "%";

        progressText.textContent = progress + "%";


        const index =
            Math.min(
                Math.floor(progress / 20),
                messages.length - 1
            );

        scanMessage.textContent = messages[index];


        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(function() {

                scanningSection.classList.add("hidden");

                showResult();

            }, 500);
        }

    }, 100);

});


// ------------------------------
// SHOW RESULT
// ------------------------------

function showResult() {

    const plant = plantType.value;
    const selectedSymptom = symptom.value;

    const data =
        plantResults[plant][selectedSymptom];


    healthIcon.textContent = data.icon;

    healthTitle.textContent = data.title;

    severity.textContent = data.severity;

    resultDescription.textContent =
        data.description;


    resultPlant.textContent =
        plantType.options[
            plantType.selectedIndex
        ].text;


    resultLocation.textContent =
        locationSelect.options[
            locationSelect.selectedIndex
        ].text;


    resultSymptom.textContent =
        symptom.options[
            symptom.selectedIndex
        ].text;


    careList.innerHTML = "";


    data.care.forEach(function(item) {

        const div = document.createElement("div");

        div.className = "care-item";

        div.textContent = "✓ " + item;

        careList.appendChild(div);

    });


    resultSection.classList.remove("hidden");


    resultSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


// ------------------------------
// NEW SCAN
// ------------------------------

newScanBtn.addEventListener("click", function() {

    plantImage.value = "";

    previewImage.src = "";

    uploadContent.classList.remove("hidden");

    previewBox.classList.add("hidden");

    plantType.value = "";

    locationSelect.value = "";

    symptom.value = "";

    resultSection.classList.add("hidden");

    progressBar.style.width = "0%";

    progressText.textContent = "0%";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// ------------------------------
// SAVE RESULT
// ------------------------------

saveResultBtn.addEventListener("click", function() {

    const result = {

        plant: plantType.options[
            plantType.selectedIndex
        ].text,

        location: locationSelect.options[
            locationSelect.selectedIndex
        ].text,

        symptom: symptom.options[
            symptom.selectedIndex
        ].text,

        health: healthTitle.textContent,

        severity: severity.textContent,

        date: new Date().toLocaleString()

    };


    let history =
        JSON.parse(
            localStorage.getItem("agriScanHistory")
        ) || [];


    history.unshift(result);


    localStorage.setItem(
        "agriScanHistory",
        JSON.stringify(history)
    );


    alert("✅ Scan result saved successfully!");

});


// ------------------------------
// HISTORY
// ------------------------------

historyBtn.addEventListener("click", function() {

    const history =
        JSON.parse(
            localStorage.getItem("agriScanHistory")
        ) || [];


    if (history.length === 0) {

        alert(
            "📋 No saved scans yet.\n\nComplete a plant scan and click Save Result."
        );

        return;
    }


    let message =
        "📋 AGRISCAN HISTORY\n\n";


    history.slice(0, 5).forEach(function(item, index) {

        message +=
            `${index + 1}. ${item.plant}\n`;

        message +=
            `Health: ${item.health}\n`;

        message +=
            `Severity: ${item.severity}\n`;

        message +=
            `Date: ${item.date}\n\n`;

    });


    alert(message);

});


// ------------------------------
// DARK MODE
// ------------------------------

function updateThemeButton() {

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️ Light";

    } else {

        themeBtn.textContent = "🌙 Dark";

    }

}


themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");


    const isDark =
        document.body.classList.contains("dark");


    localStorage.setItem(
        "agriTheme",
        isDark ? "dark" : "light"
    );


    updateThemeButton();

});


// Load saved theme

const savedTheme =
    localStorage.getItem("agriTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark");

}


updateThemeButton();


// ------------------------------
// HOW IT WORKS BUTTONS
// ------------------------------

const steps =
    document.querySelectorAll(".step");


steps.forEach(function(step) {

    step.addEventListener("click", function() {

        const number =
            this.dataset.step;


        if (number === "1") {

            document.querySelector(".scanner-section")
                .scrollIntoView({
                    behavior: "smooth"
                });

            setTimeout(function() {

                plantImage.click();

            }, 500);

        }


        if (number === "2") {

            document.querySelector(".form-grid")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            setTimeout(function() {

                plantType.focus();

            }, 500);

        }


        if (number === "3") {

            document.querySelector(".scanner-section")
                .scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            setTimeout(function() {

                scanBtn.focus();

            }, 500);

        }


        if (number === "4") {

            if (!resultSection.classList.contains("hidden")) {

                resultSection.scrollIntoView({
                    behavior: "smooth"
                });

            } else {

                alert(
                    "🌱 First complete a plant scan to view the result."
                );

            }

        }

    });

});


// ------------------------------
// INITIAL MESSAGE
// ------------------------------

console.log("🌱 AgriScan loaded successfully!");