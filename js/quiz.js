var currentElemnt = document.getElementById("current")
console.log(currentElemnt)
var totalAmountElemnt = document.getElementById("totalAmount");
var questionElemnt = document.getElementById("question");
var rowAnswerElemnt = document.getElementById("rowAnswer")
var nextBtn =  document.getElementById("next")
var scoreElemnt = document.getElementById("score");
var tryBtn = document.getElementById("tryBtn")
export class Quiz
{
    constructor(result,amount)
    {
        this.result = result
        this.amount = amount
        this.current = currentElemnt
        this.index = 0;
        this.totalAmount = totalAmountElemnt
        this.question = questionElemnt
        this.rowAnswer = rowAnswerElemnt
        this.show()
        this.score=0;
        this.nextBtn = nextBtn
        this.nextBtn.addEventListener("click",()=>{this.next()})
        
    }

    show()
    {
        console.log(this.result)
        this.current.innerHTML = this.index + 1;
        this.totalAmount.innerHTML = this.result.length
        this.question.innerHTML = this.result[this.index].question;
        let answers=[this.result[this.index].correct_answer,...this.result[this.index].incorrect_answers]
        let resRan=this.getRanAns(answers)
        this.display(resRan)
    }
    getRanAns(ans)
    { 
           let ranNums = [],
            i = ans.length,
            j = 0;

        while (i) {
            j = Math.floor(Math.random() * (i));
            ranNums.push(ans[j]);
            ans.splice(j,1);
            i--;
        }
        return ranNums;
    }

     display(array)
     {
       let box = ``;
       for(let i=0 ; i<array.length ;i++)
       {
           box+=`<input type="radio" id="r${i}" name="choice" value="${array[i]}"> <label for="r${i}">${array[i]}</label> <br/>`
       }
       this.rowAnswer.innerHTML=box
     } 

     next()
     {
         var answerChoice = Array.from(document.getElementsByName("choice"))
         answerChoice = answerChoice.filter((e)=>{return e.checked})
         if(answerChoice.length == 0)
         $(".alert").fadeIn(500)
         else
         {
            $(".alert").fadeOut(500)
            this.chechAnswer(answerChoice[0].value)
            this.plusQuestion()
         } 
        
     }

     chechAnswer(value)
     {
       if(this.result[this.index].correct_answer == value)
       {
           $("#Correct").fadeIn(500,()=>{this.showNotification()})
           this.score++;

       }
       else
       {
        $("#inCorrect").fadeIn(500,()=>{this.showNotification()})
       }
     }

     plusQuestion()
     {
          this.index++;
         (this.index >= this.amount ? this.finish() : this.show())
     }

     showNotification()
     {
        $("#Correct").fadeOut(0)
        $("#inCorrect").fadeOut(0)
     }

     finish()
     {
         $("#quiz").fadeOut(700,()=>{
             $("#finish").fadeIn(500)
             scoreElemnt.innerHTML = this.score

            tryBtn.addEventListener("click",()=>{
                $("#finish").fadeOut(500,()=>{
                    $("#setting").fadeIn(500)
                })
            })
         })
     }

}

