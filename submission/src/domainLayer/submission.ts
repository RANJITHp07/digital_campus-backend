interface ISubmit{
    status:"Late Submission"| "Submitted" | "Not Submitted",
    grade:number
}

export interface ISubmission{
  _id?:string,
  quizAnswers?:string[][];
  pollingAnswers?: string;
  assignment_id: string;
  attachment?: {
    type: string;
    content: string;
  };
  submission?: ISubmit;
  username: string;
  user_id:string
}