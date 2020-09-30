const QuizItemComponent = {
  name: 'quiz-item',
  props: ['quiz'],
  template: `
  <div class="column is-3 is-desktop">
    <button @click="onClick" class="button is-large is-fullwidth is-info is-rounded is-outlined title">
      {{ quiz.name }}
    </button>
  </div>`,
  methods: {
    onClick() {
      this.$emit("open", this.quiz);
    }
  }
}
const ModalComponent = {
  name: 'modal',
  props: {
    correctAnswers: Number,
    incorrectAnswers: Number,
    length: Number,
  },
  computed:{
    correct() {
      return {
        'width': `${this.correctAnswers / this.length * 100}%`,
      };
    },
    incorrect() {
      return {
        'width': `${this.incorrectAnswers / this.length * 100}%`,
      };
    },
    skip() {
      return {
        'width': `${(this.length - this.incorrectAnswers - this.correctAnswers) / this.length * 100}%`,
      };
    }
  },
  template: `
  <div id = "modal" class = "modal is-active">
    <div class = "modal-background"></div>
      <div class = "modal-card">
        <header class = "modal-card-head">
          <p class = "modal-card-title">Viktoriin</p>  
        </header>
        <section class = "modal-card-body">
            <div class = "content">
              <div class="progress is-success is-larger">
                <div class="progress-bar correct" :style="correct">{{correctAnswers}}</div>
                <div class="progress-bar incorrect" :style="incorrect">{{incorrectAnswers}}</div>
                <div class="progress-bar skipped" :style="skip">{{length-incorrectAnswers-correctAnswers}}</div>
              </div>
              <button class="box button is-large is-info is-rounded is-outlined">
                  <p @click="toMainPage">Tagasi viktoriinide valikusse</p>
              </button>
              <button class="box button is-large is-primary is-rounded is-outlined">
                  <p @click="restartQuiz">Tee uuesti</p>
              </button>
            </div>
        </section>
      </div>
    </div>
  </div>`,
methods: {
  restartQuiz() {
    this.$parent.restartGame();
  },
  toMainPage(){
    this.$router.push(`/`);
  }
} 
}
const QuizAnswerComponent = {
  name: 'answer-item',
  props: {
    answer: Object,
    disabled: Boolean
  },
  data() {
    return { 
      clicked: false
     };
  },
  computed: {
    cssClass() {
      if (!this.clicked) return {
        'bouncy': !this.disabled
      };
      return {
        'answer--correct': this.answer.correct,
        'answer--incorrect': !this.answer.correct,
        'bouncy': !this.disabled,
      };
    }
  },
  template: ` <button v-if="clicked || !this.$parent.disableChoices" @click="onClick" class="answer-option button is-large is-rounded box" :class="cssClass" :disabled="disabled">
                <p class="title">{{ answer.name }}</p>
              </button>`,
  methods: {
    onClick() {
      
      this.$emit("answer", this.answer);
      this.clicked = true;
      
    }
  } 
}

const QuizComponent = {
  name: 'quiz',
  components: {
    'answer-item': QuizAnswerComponent,
    'modal': ModalComponent
  },
  /* 
    <p v-if="activeQuestions.length" class="title quiz-progress"> 
          {{quizQuestions.length - activeQuestions.length + 1}} / {{quizQuestions.length}}
        </p>
        <p v-else class="title quiz-progress">
          {{quizQuestions.length}} / {{quizQuestions.length}}
        </p>
  */
  template: `
  <div class="container">
    <div v-if="activeQuestions" v-focus tabindex="0" @keyup="keymonitor" class="columns is-centered is-nomargin" ref="focusquiz">
      <div class="column is-4 is-relative">
        <progress class="progress is-nomargin is-info is-large" :value="(quizQuestions.length - activeQuestions.length + 1)" :max="quizQuestions.length"></progress>
        <div id="image-wrap" class="column is-full-mobile is-10-desktop is-offset-1-desktop center-align">
          <img :src="correctAnswer.image" @load="onImageLoad"/>
        </div>
        <div id="align-bottom">
          <div id="answer-options">
            <answer-item :key="answer.id+activeQuestions.length" v-for="answer in currentAnswers" :answer="answer" :disabled="disableChoices" @answer="checkAnswer" ref="answers" />
          </div>
          <button v-if="disableChoices" @click="nextQuestion(); " :disabled="disableNext" :class="disableNext && 'is-loading'" id="next-question" class="button is-primary is-large box is-rounded is-fullwidth">
            <p class="is-large" v-if="this.activeQuestions.length == 1">Lõpeta</p>
            <p class="is-large" v-else>Järgmine</p>
          </button>
        </div>
      </div>
      <modal v-if="quizEnd" :correct-answers="correctAnswers" :incorrect-answers="inCorrectAnswers" :length="quizQuestions.length"></modal>
    </div>
  </div>
  `,
  data() {
    return {
      currentAnswers: [],
      quizQuestions: [],
      activeQuestions: [],
      correctAnswer: "",
      correctAnswers: 0,
      inCorrectAnswers: 0,
      quizEnd: false,
      disableChoices: true,
      disableNext: false,
    };
  },
  mounted() {
    const quizId = parseInt(this.$route.params.id);

    fetch(apiUrl+'getQuiz.php?quiz='+quizId).then(response => response.json()).then(data => {
      this.quizQuestions = data;
      this.activeQuestions = data.slice();
      this.nextQuestion(null, true);
    });
  },
  methods: {
    keymonitor(event) {
      if(!this.quizEnd){
        //console.log(event.code);
        if (event.keyCode === 32) {
          return this.nextQuestion();
        }
        const pressed = String.fromCharCode(event.keyCode);
        if (pressed > 0 && pressed < 5 && !this.disableChoices) {
          this.$refs.answers[pressed - 1].onClick();
        }
      }
    },
    getKey(){
      return Math.random();
    },
    restartGame() {
      this.quizEnd = false;
      this.activeQuestions = this.quizQuestions.slice();
      this.correctAnswers = 0;
      this.inCorrectAnswers = 0;
      this.disableChoices = false;
      this.nextQuestion(null, true);

      // After nextQuestion, because when restarting and starts with previous(last) question, then onImageLoad doesn't run and this.disableNext stays true forever
      this.disableNext = false;
    },
    onImageLoad () {
      // Enable choices on next question
      this.disableChoices = false;
      this.disableNext = false;
    },
    nextQuestion(event, first = false) {
      // Add is-loading to nextBtn after clicking until the next image loads
      this.disableNext = true;
      // For keymonitor
      this.$refs.focusquiz.focus();
      // Don't remove any questions on first run
      if (!first) {
        let i = this.activeQuestions.map(item => item.id).indexOf(this.correctAnswer.id);
        this.activeQuestions.splice(i, 1);
      }
      

      if (this.activeQuestions.length) {
        this.correctAnswer = this.activeQuestions[Math.floor(Math.random() * this.activeQuestions.length)];
        let options = this.quizQuestions
          .filter(x => x.id !== this.correctAnswer.id)
          .map(item => ({ item, rng: Math.random() }))
          .sort((a, b) => a.rng - b.rng)
          .map(x => x.item)
          .slice(0, numberOfChoices - 1);

        this.currentAnswers = [...options, this.correctAnswer]
          .map(item => ({ item, rng: Math.random() }))
          .sort((a, b) => a.rng - b.rng)
          .map(x => x.item);
      }else{
        this.quizEnd = true;
      }
    },
    checkAnswer(answerOption) {
      this.$refs.focusquiz.focus();
      if (answerOption.id === this.correctAnswer.id) {
        answerOption.correct = true;
        this.correctAnswers++;
      } else {
        this.inCorrectAnswers++;
        answerOption.correct = false;
        // Highlight correct answer also
        this.$refs.answers[this.currentAnswers.indexOf(this.correctAnswer)].answer.correct = true;
        this.$refs.answers[this.currentAnswers.indexOf(this.correctAnswer)].clicked = true;
        
        //this.$refs.answers[this.currentAnswers.indexOf(this.correctAnswer)].onClick();
      }
      this.disableChoices = true;
    }
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      }
    }
  }
};
const RandomBtnComponent = {
  name: 'random-item',
  //props: ['quiz'],
  template: `
           <div class="column is-3 is-desktop">
              <button @click="onClick" class="button is-large is-fullwidth is-danger is-rounded is-outlined title">
                Juhuslik kategooria    
              </button>
            </div>`,
  methods: {
    onClick() {
      this.$emit("openRandom");
    }
  }
}
const QuizesComponent = {
  name: 'quizes',
  components: {
    'quiz-item': QuizItemComponent,
    'random-item': RandomBtnComponent
  },
  template: `
  <div>
    <section class="hero is-info is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Viktoriin
          </h1>
          <h2 class="subtitle">
            Siin lehel saad mängida pildiviktoriini erinevate küsimustega erinevatest valdkondadest, et viimistleda enda teadmisi enne järgmist mälumängu.
          </h2>
        </div>
      </div>
    </section>
    <div class="container">
        <div class="columns is-multiline">
            <quiz-item :key="quiz.id" v-for="quiz in quizes" :quiz="quiz" @open="openQuiz"/>
            <random-item :key="999" @openRandom="openRand"/>
            
        </div>
    </div>
  </div>`,
  data() {
    return {
      quizes: []
    };
  },
  mounted() {
    fetch(apiUrl+'getQuizes.php').then(response => response.json()).then(data => this.quizes = data);
  },
  methods: {
    openQuiz(quiz) {
      //alert(`open quiz ${quiz.name}`);
      this.$router.push(`/quiz/${quiz.id}`);
    },
    openRand(){
      const quiz = this.quizes.map(item => ({ item, rng: Math.random() }))
          .sort((a, b) => a.rng - b.rng)
          .map(x => x.item)
          .slice(0,1)
          [0];
      this.$router.push(`/quiz/${quiz.id}`);
    }
  }
};

const routes = [
  {
    path: "/",
    component: QuizesComponent
  },
  {
    path: "/quiz/:id",
    component: QuizComponent
  }
];

const router = new VueRouter({
  routes
});

const app = new Vue({
  el: '#app',
  router,
  data() {
    return {};
  }
});