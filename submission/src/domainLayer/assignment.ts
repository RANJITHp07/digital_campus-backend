
interface IQuiz {
    question: string;
    answers: string[];
    realAnswers:string[],
    type:string
  }
  
export interface IAssignment{
    assignment_id: string;
    students:string[],
    dueDate: {
      day: string;
      time: string;
      timer: string[];
    };
    polling: {
      answers: string[];
      polling:string[]
    };
    quiz: IQuiz[];
    points: number;
  }
  