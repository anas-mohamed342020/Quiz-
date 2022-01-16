import { Quiz } from "./quiz.js";

var categoryElemnt = document.getElementById("category");
var amountElemnt = document.getElementById("Number");
var difficultyElemnt = Array.from(document.getElementsByName("difficulty"));
var startBtnElemnt = document.getElementById("startBtn");

//console.log(difficultyElemnt)

export class Setting {
  constructor() {
    this.category = categoryElemnt;
    this.amount = amountElemnt;
    this.difficulty = difficultyElemnt;
    this.startBtn = startBtnElemnt;
    this.startBtn.addEventListener("click", () => {
      this.sartQuiz();
    });
  }

  async sartQuiz() {
    let category = this.category.value;
    let amount = this.amount.value;
    let difficulty = this.difficulty.filter((e) => {
      return e.checked;
    });
    if (amount) {
      document
        .getElementById("noNumber")
        .classList.replace("d-block", "d-none");
      if (parseInt(amount) > 50||parseInt(amount) < 1&&category!="18") {        
          document
        .getElementById("notValid")
        .classList.replace("d-none", "d-block");
        document
        .getElementById("notValid18")
        .classList.replace("d-block", "d-none");

      }else if (parseInt(amount) >= 48||parseInt(amount) > 50||parseInt(amount) < 1&&category=="18") {        
        document
      .getElementById("notValid18")
      .classList.replace("d-none", "d-block");
      document
      .getElementById("notValid")
      .classList.replace("d-block", "d-none");

    }
      
      
      
      else {
        document
        .getElementById("notValid")
        .classList.replace("d-block", "d-none");
        document
        .getElementById("notValid18")
        .classList.replace("d-block", "d-none");

        let result = await this.fetchUrl(
          `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`
        );
        if (result.length > 0) {
          $("#setting").fadeOut(500, () => {
            $("#quiz").fadeIn(500);
            new Quiz(result, amount);
          });
        }


      }
    } else {
      document
        .getElementById("noNumber")
        .classList.replace("d-none", "d-block");
    }
  }

  async fetchUrl(api) {
    let url = await fetch(api);
    let res = await url.json();
    return res.results;
  }
}
