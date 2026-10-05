// ==========================================
// LEARNSPACE - FULL WORKING JAVASCRIPT
// ==========================================

const courses = [{
        id: 1,
        title: "JavaScript Mastery",
        category: "development",
        teacher: "Alex Johnson",
        icon: "⚡",
        students: "12K",
        description: "Master JavaScript, DOM, events and modern web development."
    },
    {
        id: 2,
        title: "UI/UX Design",
        category: "design",
        teacher: "Sarah Miller",
        icon: "🎨",
        students: "8.5K",
        description: "Learn modern interface design and user experience."
    },
    {
        id: 3,
        title: "Python for Data Science",
        category: "data",
        teacher: "David Lee",
        icon: "🐍",
        students: "15K",
        description: "Analyze data using Python, Pandas and visualization."
    },
    {
        id: 4,
        title: "Digital Marketing",
        category: "business",
        teacher: "Emma Wilson",
        icon: "📈",
        students: "7.2K",
        description: "Learn SEO, social media and modern marketing strategies."
    },
    {
        id: 5,
        title: "React Development",
        category: "development",
        teacher: "Mike Brown",
        icon: "⚛️",
        students: "10K",
        description: "Build powerful modern web applications with React."
    },
    {
        id: 6,
        title: "Graphic Design",
        category: "design",
        teacher: "Olivia Smith",
        icon: "🖌️",
        students: "6.8K",
        description: "Create beautiful graphics and visual experiences."
    },
    {
        id: 7,
        title: "Machine Learning",
        category: "data",
        teacher: "Daniel King",
        icon: "🤖",
        students: "11K",
        description: "Understand machine learning algorithms and applications."
    },
    {
        id: 8,
        title: "Business Strategy",
        category: "business",
        teacher: "Sophia Davis",
        icon: "💼",
        students: "5.4K",
        description: "Learn practical strategies for modern businesses."
    }
];


// ==========================================
// DOM ELEMENTS
// ==========================================

const courseGrid = document.getElementById("courseGrid");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categorySelect = document.getElementById("categorySelect");
const courseResult = document.getElementById("courseResult");

const courseModal = document.getElementById("courseModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

const profileModal = document.getElementById("profileModal");
const profileBtn = document.getElementById("profileBtn");
const closeProfile = document.getElementById("closeProfile");

const themeBtn = document.getElementById("themeBtn");
const exploreBtn = document.getElementById("exploreBtn");
const continueBtn = document.getElementById("continueBtn");

const toast = document.getElementById("toast");

let searchText = "";
let selectedCategory = "all";


// ==========================================
// DISPLAY COURSES
// ==========================================

function displayCourses() {

    let filtered = courses.filter(course => {

        const searchMatch =
            course.title
            .toLowerCase()
            .includes(searchText.toLowerCase());

        const categoryMatch =
            selectedCategory === "all" ||
            course.category === selectedCategory;

        return searchMatch && categoryMatch;
    });


    courseGrid.innerHTML = "";


    if (filtered.length === 0) {

        courseGrid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:60px;
            ">
                <div style="font-size:55px;">🔍</div>
                <h3>No courses found</h3>
                <p>Try another course name.</p>
            </div>
        `;

        courseResult.textContent = "No courses found";

        return;
    }


    courseResult.textContent =
        `${filtered.length} courses available`;


    filtered.forEach(course => {

        const card = document.createElement("div");

        card.className = "course";

        card.innerHTML = `
            <div class="course-image">
                ${course.icon}
            </div>

            <div class="course-info">

                <small>
                    ${course.category.toUpperCase()}
                </small>

                <h3>${course.title}</h3>

                <p>👨‍🏫 ${course.teacher}</p>

                <p>👥 ${course.students} students</p>

                <button onclick="openCourse(${course.id})">
                    View Course
                </button>

            </div>
        `;

        courseGrid.appendChild(card);
    });
}


// ==========================================
// VIEW COURSE
// ==========================================

function openCourse(id) {

    const course = courses.find(
        item => item.id === id
    );

    if (!course) return;


    modalContent.innerHTML = `

        <div class="modal-icon">
            ${course.icon}
        </div>

        <small>
            ${course.category.toUpperCase()}
        </small>

        <h2>${course.title}</h2>

        <p>
            ${course.description}
        </p>

        <p>
            👨‍🏫 ${course.teacher}
        </p>

        <p>
            👥 ${course.students} students enrolled
        </p>

        <br>

        <button
            class="modal-start"
            onclick="startCourse(${course.id})">
            ▶ Start Learning
        </button>
    `;


    courseModal.classList.add("show");
}


// ==========================================
// START LEARNING
// ==========================================

function startCourse(id) {

    const course = courses.find(
        item => item.id === id
    );

    if (!course) return;


    modalContent.innerHTML = `

        <div style="font-size:70px;">
            ${course.icon}
        </div>

        <h2>${course.title}</h2>

        <p>
            🎉 Your lesson is ready!
        </p>

        <div style="
            background:#f1efff;
            padding:20px;
            border-radius:15px;
            margin:20px 0;
        ">

            <h3>Lesson 1</h3>

            <p>
                Introduction to ${course.title}
            </p>

            <br>

            <strong>
                ⏱ 12 minutes
            </strong>

        </div>

        <button
            class="modal-start"
            onclick="completeLesson('${course.title}')">
            ▶ Open Lesson
        </button>
    `;
}


// ==========================================
// OPEN LESSON
// ==========================================

function completeLesson(courseName) {

    modalContent.innerHTML = `

        <div style="font-size:65px;">
            🎉
        </div>

        <h2>Lesson Started!</h2>

        <p>
            You are now learning:
        </p>

        <strong>
            ${courseName}
        </strong>

        <div style="
            margin:25px 0;
            padding:18px;
            background:#eeeaff;
            border-radius:12px;
        ">

            <h3>📖 Lesson 1</h3>

            <p>
                Watch the lesson and complete
                the activity to continue.
            </p>

        </div>

        <button
            class="modal-start"
            onclick="finishLesson()">
            ✓ Mark Lesson Complete
        </button>
    `;
}


// ==========================================
// FINISH LESSON
// ==========================================

function finishLesson() {

    courseModal.classList.remove("show");

    const progressBar =
        document.getElementById("progressBar");

    progressBar.style.width = "82%";

    showToast("Lesson completed! 🎉 Progress: 82%");
}


// ==========================================
// CLOSE COURSE MODAL
// ==========================================

closeModal.addEventListener("click", function() {

    courseModal.classList.remove("show");
});


courseModal.addEventListener("click", function(event) {

    if (event.target === courseModal) {

        courseModal.classList.remove("show");
    }
});


// ==========================================
// SEARCH
// ==========================================

searchBtn.addEventListener("click", function() {

    searchText = searchInput.value.trim();

    displayCourses();

    document
        .getElementById("courseSection")
        .scrollIntoView({
            behavior: "smooth"
        });
});


searchInput.addEventListener("input", function() {

    searchText = searchInput.value.trim();

    displayCourses();
});


// ==========================================
// CATEGORY
// ==========================================

categorySelect.addEventListener("change", function() {

    selectedCategory = categorySelect.value;

    displayCourses();
});


// ==========================================
// EXPLORE COURSES
// ==========================================

exploreBtn.addEventListener("click", function() {

    document
        .getElementById("courseSection")
        .scrollIntoView({
            behavior: "smooth"
        });
});


// ==========================================
// CONTINUE LEARNING
// ==========================================

continueBtn.addEventListener("click", function() {

    modalContent.innerHTML = `

        <div style="font-size:70px;">
            ⚡
        </div>

        <h2>DOM Events</h2>

        <p>
            Lesson 14 of JavaScript Mastery
        </p>

        <div style="
            background:#f1efff;
            padding:20px;
            border-radius:15px;
            margin:20px 0;
        ">

            <h3>What you will learn</h3>

            <p>• Click events</p>
            <p>• Keyboard events</p>
            <p>• Mouse events</p>
            <p>• Event listeners</p>

        </div>

        <button
            class="modal-start"
            onclick="completeDomLesson()">
            ▶ Start DOM Lesson
        </button>
    `;

    courseModal.classList.add("show");
});


// ==========================================
// DOM LESSON
// ==========================================

function completeDomLesson() {

    modalContent.innerHTML = `

        <div style="font-size:60px;">
            💻
        </div>

        <h2>DOM Events Lesson</h2>

        <p>
            Welcome to Lesson 14!
        </p>

        <div style="
            text-align:left;
            background:#f1efff;
            padding:20px;
            border-radius:15px;
            margin:20px 0;
        ">

            <strong>Example:</strong>

            <p style="margin-top:10px;">
                button.addEventListener("click", ...)
            </p>

            <br>

            <p>
                DOM events allow JavaScript to respond
                to user actions.
            </p>

        </div>

        <button
            class="modal-start"
            onclick="finishLesson()">
            ✓ Complete Lesson
        </button>
    `;
}


// ==========================================
// PROFILE
// ==========================================

profileBtn.addEventListener("click", function() {

    profileModal.classList.add("show");
});


closeProfile.addEventListener("click", function() {

    profileModal.classList.remove("show");
});


profileModal.addEventListener("click", function(event) {

    if (event.target === profileModal) {

        profileModal.classList.remove("show");
    }
});


// ==========================================
// SIDEBAR
// ==========================================

document.querySelectorAll(".menu").forEach(button => {

    button.addEventListener("click", function() {

        document.querySelectorAll(".menu")
            .forEach(btn => {
                btn.classList.remove("active");
            });

        this.classList.add("active");


        const section = this.dataset.section;


        // HOME
        if (section === "home") {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

            showToast("Welcome back to LearnSpace 🏠");
        }


        // MY COURSES
        else if (section === "courses") {

            document
                .getElementById("courseSection")
                .scrollIntoView({
                    behavior: "smooth"
                });

            showToast("Showing your courses 📚");
        }


        // PROGRESS
        else if (section === "progress") {

            modalContent.innerHTML = `

                <div style="font-size:60px;">
                    📊
                </div>

                <h2>Your Learning Progress</h2>

                <p>
                    JavaScript Mastery
                </p>

                <div style="
                    height:12px;
                    background:#ddd;
                    border-radius:20px;
                    margin:20px 0;
                ">

                    <div style="
                        width:82%;
                        height:100%;
                        background:#6c5ce7;
                        border-radius:20px;
                    "></div>

                </div>

                <h2>82%</h2>

                <p>
                    14 of 17 lessons completed
                </p>

                <button
                    class="modal-start"
                    onclick="closeAllModals()">
                    Continue Learning
                </button>
            `;

            courseModal.classList.add("show");
        }


        // ACHIEVEMENTS
        else if (section === "achievements") {

            modalContent.innerHTML = `

                <div style="font-size:60px;">
                    🏆
                </div>

                <h2>Your Achievements</h2>

                <div style="
                    display:grid;
                    gap:12px;
                    margin-top:20px;
                ">

                    <div style="
                        padding:15px;
                        background:#fff4c2;
                        border-radius:12px;
                    ">
                        🥇 First Course Completed
                    </div>

                    <div style="
                        padding:15px;
                        background:#e6ddff;
                        border-radius:12px;
                    ">
                        🔥 7 Day Learning Streak
                    </div>

                    <div style="
                        padding:15px;
                        background:#dff7e8;
                        border-radius:12px;
                    ">
                        🎓 8 Certificates Earned
                    </div>

                    <div style="
                        padding:15px;
                        background:#dff0ff;
                        border-radius:12px;
                    ">
                        ⚡ JavaScript Explorer
                    </div>

                </div>

                <br>

                <button
                    class="modal-start"
                    onclick="closeAllModals()">
                    Done
                </button>
            `;

            courseModal.classList.add("show");
        }

    });
});


// ==========================================
// CLOSE ALL MODALS
// ==========================================

function closeAllModals() {

    courseModal.classList.remove("show");

    profileModal.classList.remove("show");
}


// ==========================================
// DARK MODE
// ==========================================

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem(
            "learnTheme",
            "dark"
        );

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem(
            "learnTheme",
            "light"
        );
    }
});


if (
    localStorage.getItem("learnTheme") === "dark"
) {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";
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

        closeAllModals();
    }
});


// ==========================================
// START
// ==========================================

displayCourses();