const money = [
  { level: '1', amount: '100' },
  { level: '2', amount: '200' },
  { level: '3', amount: '300' },
  { level: '4', amount: '500' },
  { level: '5', amount: '1,000' },
  { level: '6', amount: '2,000' },
  { level: '7', amount: '4,000' },
  { level: '8', amount: '8,000' },
  { level: '9', amount: '16,000' },
  { level: '10', amount: '25,000' },
  { level: '11', amount: '50,000' },
  { level: '12', amount: '100,000' },
  { level: '13', amount: '250,000' },
  { level: '14', amount: '500,000' },
  { level: '15', amount: '1,000,000' }
];



const musicTheme = new Audio('sounds/Theme.mp3');

//const musicRound1 = new Audio('sounds/Round1.ogg');
//musicRound1.loop = true;
//musicRound1.volume = 0.5;

// const musicRound2 = new Audio('sounds/Round2.ogg');
// const musicRound3 = new Audio('sounds/Round3.ogg');
// const soundAskAudience = new Audio('sounds/AskAudience.ogg');
// const soundFifty50 = new Audio('sounds/Fifty50.ogg');
// const soundPhoneFriend = new Audio('sounds/PhoneFriend.ogg');
// const soundFinalAnswer = new Audio('sounds/FinalAnswer.ogg');
//const soundNextQuestion = new Audio('sounds/NextQuestion.ogg');
//const soundRightShort = new Audio('sounds/RightAnswerShort.ogg');
// const soundWinner = new Audio('sounds/Winner.ogg');
// const soundRightAnswer = new Audio('sounds/RightAnswer.ogg');
//const soundWrongAnswer = new Audio('sounds/WrongAnswer.ogg');





const app = new Vue({
  el: '#index',
  mounted() {
    this.getTriviaQs();
  },
  data: {
    questions: [],
    index: 0,
    shuffledArray: [],
    items: money.reverse(),
      music: musicTheme
  },
    
    watch:{
        index(){
    
    console.log(this.currentQ().correct_answer);
    this.shuffle();
}
        
        
    },
  methods: {
      
      
	  isAnswerCorrect(event){
		  
		 const index = event.target.dataset.index;
          
          const selectedAnswer = this.shuffledArray[index];
           
          
          if(selectedAnswer === this.currentQ().correct_answer){
              
              this.index += 1;
              
              
              
              
          }
          else{
              
              window.alert("You lost try next time");
              console.log("you lost");
          }
		  
	  }
	  ,
	  
	  
    currentQ() {
      return this.questions[this.index];
    },
    possibleAnswers(idx) {
      return this.shuffledArray[idx];
    },
    shuffle() {
      // we want to create an array that contains both correct and incorrect answers
      const tempArr = [
        this.currentQ().correct_answer,
        ...this.currentQ().incorrect_answers
      ];

      // we want to shuffle it.
      this.shuffledArray = _.shuffle(tempArr);
    },
    async getTriviaQs() {
      const response = await fetch('https://opentdb.com/api.php?amount=20&category=18&type=multiple');
      const data = await response.json();
      this.questions = data.results;
      this.shuffle();
console.log(this.currentQ().correct_answer);
        this.music.play();
    }
  }
});
