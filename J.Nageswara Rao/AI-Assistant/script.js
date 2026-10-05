document.addEventListener("DOMContentLoaded", function() {

    const input = document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const messages = document.getElementById("messages");
    const welcome = document.getElementById("welcome");

    // -----------------------------
    // ADD MESSAGE
    // -----------------------------

    function addMessage(text, type) {

        const message = document.createElement("div");
        message.className = "message " + type;

        if (type === "ai") {

            message.innerHTML = `
                <div class="ai-avatar">✦</div>
                <div class="message-bubble">${text}</div>
            `;

        } else {

            message.innerHTML = `
                <div class="message-bubble">${text}</div>
            `;
        }

        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }


    // -----------------------------
    // AI RESPONSES
    // -----------------------------

    function getAIResponse(question) {

        const q = question.toLowerCase();

        if (q.includes("brainstorm") || q.includes("ideas")) {

            return `
                <strong>💡 Here are some ideas:</strong><br><br>
                1. 🤖 AI Study Assistant<br>
                2. 🌱 Smart Agriculture App<br>
                3. 💰 Student Expense Tracker<br>
                4. 🎓 Career Guidance Platform<br>
                5. 🏥 Smart Health Reminder<br>
                6. 🛒 AI Shopping Assistant
            `;
        }

        if (q.includes("study plan") || q.includes("study")) {

            return `
                <strong>📚 Simple Study Plan</strong><br><br>
                <strong>Morning:</strong> Learn a new topic<br>
                <strong>Afternoon:</strong> Practice problems<br>
                <strong>Evening:</strong> Review notes<br>
                <strong>Night:</strong> Take a short quiz<br><br>
                Try studying for 45 minutes followed by a 10-minute break.
            `;
        }

        if (
            q.includes("explain") ||
            q.includes("what is")
        ) {

            if (q.includes("ai") || q.includes("artificial intelligence")) {
                return `
                    <strong>🤖 Artificial Intelligence</strong><br><br>
                    AI is technology that allows computers to perform
                    tasks that normally require human intelligence,
                    such as learning, reasoning and understanding language.
                `;
            }

            if (q.includes("machine learning")) {
                return `
                    <strong>🧠 Machine Learning</strong><br><br>
                    Machine Learning is a branch of AI where computers
                    learn patterns from data and use those patterns
                    to make predictions or decisions.
                `;
            }

            if (q.includes("html")) {
                return `
                    <strong>🌐 HTML</strong><br><br>
                    HTML stands for HyperText Markup Language.
                    It is used to create the structure of web pages.
                `;
            }

            if (q.includes("css")) {
                return `
                    <strong>🎨 CSS</strong><br><br>
                    CSS stands for Cascading Style Sheets.
                    It is used to style web pages.
                `;
            }

            if (q.includes("javascript")) {
                return `
                    <strong>⚡ JavaScript</strong><br><br>
                    JavaScript makes websites interactive and dynamic.
                    It can respond to clicks, keyboard input and other events.
                `;
            }

            if (q.includes("dbms")) {
                return `
                    <strong>🗄️ DBMS</strong><br><br>
                    DBMS stands for Database Management System.
                    It is used to store, manage and retrieve data.
                `;
            }
        }


        if (
            q.includes("build") ||
            q.includes("create")
        ) {

            return `
                <strong>🛠️ Let's build something!</strong><br><br>
                Here are some projects you can create:<br><br>
                • AI Chat Assistant<br>
                • Student Management System<br>
                • Expense Tracker<br>
                • Online Quiz Application<br>
                • Portfolio Website<br>
                • E-Commerce Store
            `;
        }


        if (q.includes("fruit")) {

            return `
                <strong>🍎 5 Fruits</strong><br><br>
                1. Apple<br>
                2. Banana<br>
                3. Mango<br>
                4. Orange<br>
                5. Grapes
            `;
        }


        if (q.includes("python")) {

            return `
                <strong>🐍 Python</strong><br><br>
                Python is a high-level programming language
                commonly used for AI, data science, automation
                and web development.
            `;
        }


        if (q.includes("hello") || q.includes("hi")) {

            return `
                Hello! 👋<br><br>
                I'm Nova AI. What would you like to work on today?
            `;
        }


        if (q.includes("thank")) {

            return `
                You're welcome! 😊
            `;
        }


        return `
            Interesting question! 🤔<br><br>
            I can help you with brainstorming, study plans,
            explanations, project ideas, AI, Machine Learning,
            HTML, CSS, JavaScript, Python and DBMS.
        `;
    }


    // -----------------------------
    // SEND MESSAGE
    // -----------------------------

    function sendMessage() {

        const question = input.value.trim();

        if (question === "") {
            return;
        }

        if (welcome) {
            welcome.style.display = "none";
        }

        addMessage(question, "user");

        input.value = "";

        setTimeout(function() {

            const answer = getAIResponse(question);

            addMessage(answer, "ai");

        }, 500);
    }


    // -----------------------------
    // SEND BUTTON
    // -----------------------------

    if (sendBtn) {
        sendBtn.addEventListener("click", sendMessage);
    }


    // -----------------------------
    // ENTER KEY
    // -----------------------------

    if (input) {

        input.addEventListener("keydown", function(event) {

            if (event.key === "Enter") {

                event.preventDefault();
                sendMessage();

            }

        });
    }


    // -----------------------------
    // PROMPT CARDS
    // -----------------------------

    document.querySelectorAll(".prompt-card").forEach(function(card) {

        card.addEventListener("click", function() {

            const prompt =
                card.dataset.prompt ||
                card.innerText.trim();

            input.value = prompt;

            input.focus();

        });

    });


    // -----------------------------
    // ALL BUTTONS / MENU ITEMS
    // -----------------------------

    document.querySelectorAll("button, .recent-item, .sidebar-item").forEach(function(element) {

        element.addEventListener("click", function() {

            const text = element.innerText.trim().toLowerCase();


            // NEW CONVERSATION
            if (text.includes("new conversation")) {

                clearConversation();

                if (welcome) {
                    welcome.style.display = "block";
                }

                input.value = "";

                return;
            }


            // CLEAR CONVERSATION
            if (text.includes("clear conversation")) {

                clearConversation();

                return;
            }


            // DARK MODE
            if (text.includes("dark mode")) {

                toggleDarkMode();

                return;
            }


            // RECENT - PROJECT IDEAS
            if (text.includes("project ideas")) {

                input.value = "Give me 5 creative project ideas for college students.";

                sendMessage();

                return;
            }


            // RECENT - STUDY PLANNER
            if (text.includes("study planner")) {

                input.value = "Create a study plan for me.";

                sendMessage();

                return;
            }


            // RECENT - DATA ANALYSIS
            if (text.includes("data analysis")) {

                input.value = "Explain data analysis.";

                sendMessage();

                return;
            }


            // RECENT - STARTUP IDEAS
            if (text.includes("startup ideas")) {

                input.value = "Give me 5 startup ideas.";

                sendMessage();

                return;
            }

        });

    });


    // -----------------------------
    // CLEAR CONVERSATION
    // -----------------------------

    function clearConversation() {

        const messageElements =
            messages.querySelectorAll(".message");

        messageElements.forEach(function(message) {
            message.remove();
        });

        if (welcome) {
            welcome.style.display = "block";
        }

        input.value = "";

    }


    // -----------------------------
    // DARK MODE
    // -----------------------------

    function toggleDarkMode() {

        document.body.classList.toggle("nova-dark");

        let darkStyle = document.getElementById("nova-dark-style");

        if (!darkStyle) {

            darkStyle = document.createElement("style");

            darkStyle.id = "nova-dark-style";

            darkStyle.innerHTML = `

                body.nova-dark {
                    background: #11131a !important;
                    color: #f5f5f5 !important;
                }

                body.nova-dark .app-shell {
                    background: #11131a !important;
                }

                body.nova-dark .sidebar {
                    background: #171922 !important;
                    color: #ffffff !important;
                }

                body.nova-dark .main {
                    background: #11131a !important;
                }

                body.nova-dark .topbar {
                    background: #171922 !important;
                    color: #ffffff !important;
                }

                body.nova-dark .chat-area {
                    background: #11131a !important;
                }

                body.nova-dark .message-bubble {
                    background: #20232d !important;
                    color: #ffffff !important;
                }

                body.nova-dark .composer-wrapper {
                    background: #171922 !important;
                }

                body.nova-dark textarea {
                    background: #20232d !important;
                    color: #ffffff !important;
                }

                body.nova-dark .recent-item,
                body.nova-dark .sidebar-item {
                    color: #dddddd !important;
                }

            `;

            document.head.appendChild(darkStyle);
        }

    }


    console.log("Nova AI is fully loaded!");

});