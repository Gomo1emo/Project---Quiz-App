// class variable
var quiz = {
    // (A) Properties / data we will need
    // (A1) Questions options
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [ //array of data
        // array of objects i.e object notation
        {
            q: "Which of these liquids are you supposed to drink less?",
            o: ["Sparkling water", "Coffee", "Water", "Sugary Drinks"], //array of options
            a: 3, // array starts at 0 so the answer is sugary drinks
        },

        {
            q: "Best way to have a good day ahead?",
            o: ["Get Enough Sleep", "Healthy breakfast", "Exercise", "All of the above"],
            a: 3,
        },

        {
            q: "Which fruit is also a color?",
            o: ["Lemon", "Orange", "Apple", "Avocado"],
            a: 1,

        },

        {
            q: "Which of the following contains more protein?",
            o: ["Spinach", "Nuts", "Eggs", "Milk"],
            a: 1,
        },

        {
            q: "Which of the following activities gives more exercise to the body?",
            o: ["Playing dice", "Yoga", "Squatting", "Playing Chess"],
            a: 2,
        },

        {
            q: "Which of the following promotes better mental health?",
            o: ["Social media 24/7", "Isolation", "Exercise and good diet", "Crying"],
            a: 2,
        },

        {
            q: "Which foods are important for the development of healthy, strong bones?",
            o: ["Tomatoes, biscuits, butter", "Fish, Chicken, Eggs", "Cheese, Milk, Yogurt", "Potatoes, fish, Cucumbers"],
            a: 2,
        },

        {
            q: "The best way to keep a healthy you is:",
            o: ["Going on a very low calorie diet", "Mixing eating with other activites", "Using the Food Pyramid", "Avoiding eating fat"],
            a: 2,
        },
        
        {
            q: "How can't you help the environment?",
            o: ["Driving your own vehicle", "Turning off the tap while you are brushing your teeth", "Bringing your own cloth bag to the shops", "Turning off the lights when you leave a room"],
            a: 0,
        },

        {
            q: "What is having good personal hygiene a good prevention of?",
            o: ["Losing hair", "Tooth decay", "Looking ugly", "Diseases"],
            a: 3,
        },

        {
            q: "When are good times to brush your teeth during the day?",
            o: ["After eating sweets", "In the morning, after each meal and before going to bed", "Whenever you want to", "Before you eat, after you eat, and before going to bed"],
            a: 1,
        }

    ],

    // (A2) HTML elements. maps to the css
    //empty because they just they are a map for where our css will be appended on
    hWrap: null, // html quiz container
    hQn: null, // html questions wraper
    hAns: null, // html answers wrapper

    // (A3) GAME FLAGS
    now: 0, // current question
    score: 0, // current score

    // (B) init quiz html
    // initialize quiz in html. getting css and creating elements in div
    init: () => {
        // (B1) WRAPPER
        // map css quiz container onto empty element
        quiz.hWrap = document.getElementById("quizWrap");

        // (B2) questions container
        quiz.hQn = document.createElement("div");
        quiz.hQn.id = "quizQn";
        quiz.hWrap.appendChild(quiz.hQn);

        // (B3) answers container
        quiz.hAns = document.createElement("div");
        quiz.hAns.id = "quizAns";
        quiz.hWrap.appendChild(quiz.hAns);

        //Restart button
        document.getElementById("restart").addEventListener("click", quiz.reset);
 
        // (B4) GO!
        quiz.draw();
    },

    // (C) draw questions
    draw: () => {
        // (C1) Question
        //retrieve current questions from array and return them to the questions container
        quiz.hQn.innerHTML = quiz.data[quiz.now].q;

        // (C2) Options
        quiz.hAns.innerHTML = "";
        //  using the for loop we will create the radio button for the option in our question using the append method we will append the answer.
        for(let i in quiz.data[quiz.now].o){
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "quiz";
            radio.id = "quizo" + i;
            //add the answer container onto radio button
            quiz.hAns.appendChild(radio);

            // label will have the event listener for viewing the correct/incorrect answers
            let label = document.createElement("label");
            //retrieve options for current questions from array and return them to the answers container
            label.innerHTML = quiz.data[quiz.now].o[i];
            label.setAttribute("for", "quizo" + i);
            label.dataset.idx = i;
            label.addEventListener("click", () => {
                quiz.select(label)
            });
            //add the answer options onto radio button
            quiz.hAns.appendChild(label);
        }
    },

   
   // functions once user selects an option in quiz
    select: (option) => {
        // (D1) detach all onclick
        let all = quiz.hAns.getElementsByTagName("label");
        /* 
        functionality to selected options. a for in which if the option is selected the using the
        remove.eventListener it will detach of the selected option
        */
        for( let label of all){
            label.removeEventListener("click", quiz.select);
        }

        // (D2) check on selected answers
        let correct = option.dataset.idx == quiz.data[quiz.now].a;
        if(correct){
            quiz.score++;
            option.classList.add("correct");
        }
        else{
            option.classList.add("wrong");
        }

        // (D3) NEXT QUESTION OR END GAME
         /*
        setTimeout function after completion of
        the quiz we will add option to restart the game.
        */
       quiz.now++;
       setTimeout( () => {
        if( quiz.now < quiz.data.length) {
            quiz.draw();
        }
        else{
            quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
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
    

    

