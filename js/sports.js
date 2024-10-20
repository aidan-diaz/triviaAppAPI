//SPORTS TRIVIA


document.querySelector('#button').addEventListener('click', generateTriviaQuestion)
const questionChoices = document.querySelector('#questionChoices')


function generateTriviaQuestion() {

    fetch("https://opentdb.com/api.php?amount=1&category=21")
    .then(res => res.json())


    .then(data => {
        console.log(data)

        displayQuestion(data)

        //get rid of choices from old question before adding new ones
        clearPreviousOptions()
        clearAnswer()

        displayOptions( makeOptionsList(data) )

        //THIS EVENT LISTENER CANNOT BE ADDED UNTIL THE FUNCTION EXISTS - WHEN I TRIED TO ADD IT ON PAGE LOAD, I GOT AN ERROR THAT SAID CHECKFORCORRECT WAS NOT DEFINED
        questionChoices.addEventListener('click', checkForCorrect)


        //THIS FUNCTION HAS TO EXIST HERE SO IT CAN ACCESS THE FETCHED OBJECT (data)
        function checkForCorrect(event) {
            const correctAnswer = data.results[0].correct_answer.trim()
            //correct answer has character codes in it, try converting those to actual text by storing correct answer inside innerHTML of an element and hiding that element
            const convertedCorrectAnswer = document.querySelector('#convertedCorrectAnswer')
            convertedCorrectAnswer.innerHTML = correctAnswer
            //check to see if innerText of clicked element is same as converted correct answer
            //if it is - display 'Correct'!
            //if it is NOT, display 'Incorrect! Correct answer: (answer)'
            if(event.target.innerText === convertedCorrectAnswer.innerText) {
                document.querySelector('#isCorrect').innerHTML = `<span id='correct'>Correct!</span>`
            }else {
                document.querySelector('#isCorrect').innerHTML = `<span id='incorrect'>Incorrect!</span> Correct answer: ${correctAnswer}`
            }    
        }
    })

    .catch(err => {
        console.log(`error ${err}`)
    })

}

//TRIVIA API GENERATES TWO TYPES OF QUESTIONS - BOOLEAN OR MULTIPLE CHOICE
//GOING TO NEED CONDITIONAL TO TO SEE WHAT TYPE OF QUESTION WAS GENERATED
//IF QUESTION TYPE IS MULTIPLE, DISPLAY THE QUESTION AND GENERATE THE LIST OF THE CHOICES
//REQUIRE THE USER TO SELECT A CHOICE
//HAVE A BUTTON FOR USER TO SUBMIT CHOICE AFTER SELECTING IT
//IF SELECTED CHOICE EQUALS CORRECT ANSWER, DISPLAY CORRECT ON THE DOM
//IF SELECTED CHOICE IS INCORRECT ANSWER, DISPLAY INCORRECT, FOLLOWED BY CORRECT ANSWER

function displayQuestion(data) {
    //using innerHTML rather than innerText because some question strings from the array use character codes, want to ensure that the character is displayed rather than the character code itself
    document.querySelector('#question').innerHTML = `Question: <span>${data.results[0].question}</span>`
}

function makeOptionsList(data) {
    //make array of options from the available choices
    const options = []
    //add correct answer to list
    options.push(data.results[0].correct_answer.trim())
    //add each incorrect answer to list
    data.results[0].incorrect_answers.forEach( element => options.push(element.trim()) )
    //console log to make sure all elements are in array
    // sort them to put in new order (so correct answer is in different spot each time)
    console.log(options.sort())
    return options.sort()
}

//THIS ONE WORKS - TESTING A DIFFERENT ONE FARTHER DOWN

function displayOptions(options) {
    //for each option, append it to the ul of options
    options.forEach(element => {
        //create a list item
        const li = document.createElement('li')
        //add the choice to the innerText
        li.innerHTML = element
        li.classList.add('choices')
        //add the li to the ul
        questionChoices.appendChild(li)
        //add an event listener to the choice

    })

}

//function to clear previous options from ul before generating new ones

function clearPreviousOptions() {
    questionChoices.innerHTML = ''
}


//clear previous answer from DOM so it does not still say correct/incorrect when a new question is generated
function clearAnswer() {
    document.querySelector('#isCorrect').innerHTML = ''
}