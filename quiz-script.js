var quiz = {
    // (A) Properties
    // (A1) Question & ANSWERS
    // Q = QUESTION, O OPTIONS, A = CORRECT ANSWER
    data: [
        {
            q: "What is the standard distance between the target and archer in the Olympics?",
            o:["50 meters", "70 meters", "100 meters", "12o meters"],
            a: 1, //arrays start with 0, so answer is 70 meters
        },
        {
            q: "Which is the highest number on a standard roulette wheel?",
            o: ["22", "24", "32", "36"],
            a: 3,
        },
        
        {
            q: "Which is the seventh planet from the sun?",
            o:["Uranus", "Earth", "Pluto", "Mars"],
            a: 0,
        },

        {
            q: "Which is the largest ocean on Earth?",
            o: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            a: 3,
        },
    ],

    // (A2) HTML ELEMENTS
    hWrap: null, //HTML quiz container
    hQn: null, //HTML questio wrapper
    hAns: null, //HTML answer wrapper

    // (A3) GAME FLAGS
    now: 0, //current question
    score: 0, //current score

    //(B) INIT QUIZ HTML
    init: () => {
        // (B1) Wrapper
        quiz.hWrap = document.getElementById("quizWrap");

        // (B2) QUESTION SECTION
        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        // (B3) ANSWERS SECTION
        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        // (B4) GO!
        quiz.draw();
    },
    // (C) DRAW QUESTION
    draw: () => {
        // (C1) QUESTIONS
        quiz.hQn.innerHtml = quiz.data[quiz.now].q;

        // (C2) OPTIONS
        quiz.hAns.innerHtml = "";
        for (let  i in quiz.data[quiz.now].o) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz"
            radio.id ="quizo" + i;
            quiz.hAns.appendChild("radio");
            let label = document.createElement("label");
            label.innerHTML = quiz.data[quiz.now].o[i];
            label.setAttribute("for", "quizo" + i);
            label.dataset.idx = i;
            label.addEventListener("click", () => {
                quiz.select(label);
            });
            quiz.hAns.appendChild(label);
        }
    },
    select: (option) => {
        //(D1) Detach all onclick
        let all = quiz.hAns.getElementByTagName("label");
        for (let albel of all) {
            label.removeEventListener("click", quiz.select);
        }
        // (D2) CHECK IF CORRECT
        let correct = option.dataset.idx == quiz.data[quiz.now].a;
            if (correct) {
            quiz.score++;
            option.classList.add("correct");
            } else {
            option.classList.add("wrong");
        }

            // (D3) NEXT QUESTION OR END GAME
            quiz.now++;
            setTimeout(() => {
                if (quiz.now < quiz.data.length) {
                    quiz.draw();
                } else {
                    quiz.hQn.innerHTML = `You have answered
                    ${quiz.score} of ${quiz.data.length} correctly.`;
                    quiz.hAns.innerHTML = "";
                }
            }, 1000);
        },
        // (E) RESTART QUIZ
        reset: () => {
            quiz.now = 0;
            quiz.score = 0;
            quiz.draw();
    },
};
window.addEventListener("load", quiz.init);