import { IQuiz } from "../../../domainLayer/assignment";

export const calculateQuizGrade=(quizAnswers: string[][], quiz: IQuiz[]): number=>{
    let mark = 0;
  
    for (let i = 0; i < quizAnswers.length; i++) {
      if (quiz[i].type === "radio" && quizAnswers[i][0] === quiz[i].realAnswers[0]) {
        mark++;
      } else {
        let pass = true;
  
        for (let j = 0; j < quizAnswers[i].length; j++) {
          if (!quiz[i].realAnswers.includes(quizAnswers[i][j])) {
            pass = false;
            break;
          }
        }
  
        if (pass && quiz[i].realAnswers.length === quizAnswers[i].length) {
          mark++;
        }
      }
    }
  
    return mark;
  }