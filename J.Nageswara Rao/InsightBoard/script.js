// ==========================================
// INSIGHTBOARD JAVASCRIPT
// ==========================================

const themeBtn = document.getElementById("themeBtn");
const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const closeNotification = document.getElementById("closeNotification");

const profileBtn = document.getElementById("profileBtn");
const profilePanel = document.getElementById("profilePanel");
const closeProfile = document.getElementById("closeProfile");

const exportBtn = document.getElementById("exportBtn");
const periodSelect = document.getElementById("periodSelect");

const viewAllBtn = document.getElementById("viewAllBtn");
const detailsBtn = document.getElementById("detailsBtn");

const toast = document.getElementById("toast");

const revenueValue = document.getElementById("revenueValue");
const usersValue = document.getElementById("usersValue");
const ordersValue = document.getElementById("ordersValue");


// ==========================================
// SIDEBAR
// ==========================================

document.querySelectorAll(".nav-btn").forEach(button => {

    button.addEventListener("click", function() {

        document.querySelectorAll(".nav-btn")
            .forEach(btn => btn.classList.remove("active"));

        this.classList.add("active");

        const page = this.dataset.page;

        if (page === "overview") {

            showToast("Overview dashboard opened 📊");

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else if (page === "analytics") {

            document.querySelector(".chart-grid")
                .scrollIntoView({
                    behavior: "smooth"
                });

            showToast("Analytics section opened 📈");

        } else if (page === "customers") {

            document.querySelector(".bottom-grid")
                .scrollIntoView({
                    behavior: "smooth"
                });

            showToast("Customer analytics opened 👥");

        } else if (page === "reports") {

            showReport();

        } else if (page === "settings") {

            showSettings();
        }
    });
});


// ==========================================
// DARK MODE
// ==========================================

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "insightTheme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "insightTheme",
            "light"
        );
    }
});


if (localStorage.getItem("insightTheme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";
}


// ==========================================
// NOTIFICATIONS
// ==========================================

notificationBtn.addEventListener("click", function() {

    notificationPanel.classList.add("show");

    document.getElementById("notificationCount").textContent = "0";
});


closeNotification.addEventListener("click", function() {

    notificationPanel.classList.remove("show");
});


notificationPanel.addEventListener("click", function(event) {

    if (event.target === notificationPanel) {

        notificationPanel.classList.remove("show");
    }
});


// ==========================================
// PROFILE
// ==========================================

profileBtn.addEventListener("click", function() {

    profilePanel.classList.add("show");
});


closeProfile.addEventListener("click", function() {

    profilePanel.classList.remove("show");
});


profilePanel.addEventListener("click", function(event) {

    if (event.target === profilePanel) {

        profilePanel.classList.remove("show");
    }
});


// ==========================================
// PERIOD FILTER
// ==========================================

periodSelect.addEventListener("change", function() {

    const days = this.value;

    if (days === "7") {

        revenueValue.textContent = "₹84,250";
        usersValue.textContent = "12,480";
        ordersValue.textContent = "2,846";

        showToast("Showing last 7 days 📊");

    } else if (days === "30") {

        revenueValue.textContent = "₹3,42,850";
        usersValue.textContent = "48,920";
        ordersValue.textContent = "10,846";

        showToast("Showing last 30 days 📅");

    } else {

        revenueValue.textContent = "₹9,84,500";
        usersValue.textContent = "1,42,800";
        ordersValue.textContent = "31,420";

        showToast("Showing last 90 days 📈");
    }
});


// ==========================================
// EXPORT
// ==========================================

exportBtn.addEventListener("click", function() {

    const report = `
INSIGHTBOARD ANALYTICS REPORT
=============================

Revenue: ${revenueValue.textContent}
Users: ${usersValue.textContent}
Conversion Rate: 7.82%
Orders: ${ordersValue.textContent}

Generated from InsightBoard.
`;

    const blob = new Blob(
        [report], { type: "text/plain" }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download = "InsightBoard-Report.txt";

    link.click();

    URL.revokeObjectURL(url);

    showToast("Report downloaded successfully 📄");
});


// ==========================================
// VIEW ALL CUSTOMERS
// ==========================================

viewAllBtn.addEventListener("click", function() {

    const table = document.getElementById("customerTable");

    table.innerHTML += `

        <tr>
            <td>👩 Sneha Rao</td>
            <td>Business Plan</td>
            <td>₹4,999</td>
            <td>
                <span class="status success">
                    Completed
                </span>
            </td>
        </tr>

        <tr>
            <td>👨 Vikram Singh</td>
            <td>Pro Plan</td>
            <td>₹2,499</td>
            <td>
                <span class="status success">
                    Completed
                </span>
            </td>
        </tr>

        <tr>
            <td>👩 Kavya Reddy</td>
            <td>Starter Plan</td>
            <td>₹999</td>
            <td>
                <span class="status pending">
                    Pending
                </span>
            </td>
        </tr>
    `;

    showToast("All customers loaded 👥");

    viewAllBtn.textContent = "All Customers ✓";
});


// ==========================================
// PERFORMANCE DETAILS
// ==========================================

detailsBtn.addEventListener("click", function() {

    showDetails();
});


// ==========================================
// REPORT
// ==========================================

function showReport() {

    showPopup(`
        <h2>📄 Monthly Report</h2>

        <p>
            Your business performance report is ready.
        </p>

        <div style="
            margin-top:20px;
            padding:18px;
            background:#f0efff;
            border-radius:12px;
        ">

            <strong>Revenue Growth</strong>
            <h2>+18.4%</h2>

            <strong>Users Growth</strong>
            <h2>+12.8%</h2>

            <strong>Conversion</strong>
            <h2>7.82%</h2>

        </div>

        <button
            onclick="closeGeneratedPopup()"
            style="
                margin-top:20px;
                border:none;
                background:#635bff;
                color:white;
                padding:12px 20px;
                border-radius:8px;
                cursor:pointer;
            ">
            Close
        </button>
    `);
}


// ==========================================
// SETTINGS
// ==========================================

function showSettings() {

    showPopup(`
        <h2>⚙️ Dashboard Settings</h2>

        <p>
            Customize your InsightBoard experience.
        </p>

        <div style="
            margin-top:20px;
            padding:15px;
            background:#f0efff;
            border-radius:10px;
        ">
            ✓ Real-time analytics enabled
        </div>

        <div style="
            margin-top:10px;
            padding:15px;
            background:#f0efff;
            border-radius:10px;
        ">
            ✓ Automatic reports enabled
        </div>

        <div style="
            margin-top:10px;
            padding:15px;
            background:#f0efff;
            border-radius:10px;
        ">
            ✓ Email notifications enabled
        </div>

        <button
            onclick="closeGeneratedPopup()"
            style="
                margin-top:20px;
                border:none;
                background:#635bff;
                color:white;
                padding:12px 20px;
                border-radius:8px;
                cursor:pointer;
            ">
            Done
        </button>
    `);
}


// ==========================================
// DETAILS
// ==========================================

function showDetails() {

    showPopup(`
        <h2>🎯 Performance Details</h2>

        <p>
            Here is your current monthly performance.
        </p>

        <div style="
            margin-top:20px;
            padding:18px;
            background:#f0efff;
            border-radius:12px;
        ">

            <p>Revenue Target</p>
            <h2>82%</h2>

            <p style="margin-top:15px;">
                Customer Retention
            </p>
            <h2>91%</h2>

            <p style="margin-top:15px;">
                Team Efficiency
            </p>
            <h2>94%</h2>

        </div>

        <button
            onclick="closeGeneratedPopup()"
            style="
                margin-top:20px;
                border:none;
                background:#635bff;
                color:white;
                padding:12px 20px;
                border-radius:8px;
                cursor:pointer;
            ">
            Close
        </button>
    `);
}


// ==========================================
// GENERATED POPUP
// ==========================================

function showPopup(content) {

    const popup = document.createElement("div");

    popup.id = "generatedPopup";

    popup.className = "popup show";

    popup.innerHTML = `
        <div class="popup-box">
            <button
                class="close-btn"
                onclick="closeGeneratedPopup()">
                ×
            </button>

            ${content}
        </div>
    `;

    document.body.appendChild(popup);
}


function closeGeneratedPopup() {

    const popup =
        document.getElementById("generatedPopup");

    if (popup) {

        popup.remove();
    }
}


// ==========================================
// TOAST
// ==========================================

let toastTimer;

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(function() {

        toast.classList.remove("show");

    }, 2500);
}


// ==========================================
// ESC KEY
// ==========================================

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        notificationPanel.classList.remove("show");

        profilePanel.classList.remove("show");

        closeGeneratedPopup();
    }
});