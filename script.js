const app = document.getElementById("app");

const questions = [
    {
        question: "What's the favorite meal of a hungry Java thread?",
        options: [
            "synchronized spaghetti",
            "Deadlocks with a side of race conditions",
            "wait()ing waffles",
            "Garbage-collected garbage"],
        correct: "Garbage-collected garbage"
    },
    {
        question: "<p>How many threads does Resurs run (including human ones)?</p>" +
            "<p>Resurs is like a giant Java application. So, if every employee were a thread, how many threads are running concurrently?</p>",
        options: [
            "8 — if we’re only counting the coffee machines",
            "404 — we lost track after HR updated the org chart",
            "809 — because we scale horizontally with people",
            "Depends on the GC pause duration"],
        correct: "809 — because we scale horizontally with people"
    },
    {
        question: "<p>How many objects are created here?</p>" +
            "<p>String a = new String(\"Java\");</p>",
        options: [
            "0",
            "1",
            "2",
            "Depends on the JVM"],
        correct: "2"
    },
    {
        question: "<p>What prints here?</p>" +
            "<p>System.out.println(true ? new Integer(1) : new Double(2.0));</p>",
        options: [
            "1",
            "1.0",
            "Compilation error",
            "Runtime exception"],
        correct: "1.0"
    },
    {
        question: "<p>Can this throw NPE?</p>" +
            "<p>\"hello\".equals(null);</p>",
        options: [
            "Yes",
            "No",
            "Only if Java version < 8",
            "Only if JVM is angry"],
        correct: "No"
    },
    {
        question: "<p>What’s printed?</p>" +
            "<p>System.out.println(1.0 - 0.9 == 0.1);</p>",
        options: [
            "true",
            "false",
            "Compilation error",
            "JVM crash"],
        correct: "false"
    },
    {
        question: "<p>How many iterations it will go?</p>" +
            "<p>for (float f = 0.1f; f != 1.0f; f += 0.1f)</p>" +
            "<p>System.out.println(f);</p>",
        options: [
            "It loops 10 times",
            "It loops 9 times",
            "It never terminates",
            "It won’t compile"],
        correct: "It never terminates"
    },
];

let page = "intro";
let answers = Array(questions.length).fill(null);

function render() {
    if (page === "intro") {
        app.innerHTML = `
      <div class="container">
        <h1>Welcome to the Quiz</h1>
        <p>This is a quick quiz for you to have fun. Click the button below to start.</p>
        <p>After you are done with all questions (that could be funny and sometimes challenged) you could get a prize!</p>
        <p> </p>
        <img src="https://www.resursbank.se/image/1200xAUTO/uploads/2018/02/Resurs_logo_vertical_RGB_BLACK.png" alt="Resurs Image">
        <button onclick="startQuiz()">Start Quiz</button>
      </div>
    `;
    }

    if (page === "quiz") {
        const q = questions[currentQuestion];
        const selected = answers[currentQuestion];
        app.innerHTML = `
      <div class="container">
        <h2>Question ${currentQuestion + 1} of ${questions.length}</h2>
        <p><strong>${q.question}</strong></p>
        <div class="options">
          ${q.options
            .map(
                (opt) => `
                <label>
                  <input type="radio" name="q${currentQuestion}" value="${opt}" onchange="selectAnswer(${currentQuestion}, '${opt}')"
                    ${selected === opt ? "checked" : ""} />
                  ${opt}
                </label>
              `
            )
            .join("")}
        </div>
        <button onclick="nextQuestion()" ${selected ? "" : "disabled"}>Next</button>
      </div>
    `;
    }

    if (page === "result") {
        let correctCount = 0;
        const results = questions
            .map((q, i) => {
                const isCorrect = answers[i] === q.correct;
                if (isCorrect) correctCount++;
                return `<li><strong>${q.question}</strong>: ${answers[i]} ${
                    isCorrect ? "✅" : `❌ (Correct: ${q.correct})`
                }</li>`;
            })
            .join("");

        const allCorrect = correctCount === questions.length;

        app.innerHTML = `
      <div class="container">
        ${allCorrect ? `<p style='font-size: 1.2rem; color: green; font-weight: bold;'>Congratulations! You won!</p>` :
            `<p style='font-size: 1.2rem; color: #ed3e3e; font-weight: bold;'>Not today 🤷‍♂</p>`}
            
        <p>You got <strong>${correctCount}</strong> out of <strong>${questions.length}</strong> correct.</p>
<!--        <ul>${results}</ul>-->
      </div>
    `;
    }
}

function startQuiz() {
    currentQuestion = 0;
    page = "quiz";
    render();
}

function selectAnswer(index, value) {
    answers[index] = value;
    render();
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        render();
    } else {
        page = "result";
        render();
    }
}

render();
