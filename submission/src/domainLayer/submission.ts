interface ISubmit{
    status:"Late Submission"| "Submitted" | "Not Submitted",
    grade:number
}

export interface ISubmission{
  quizAnswers?: string[];
  pollingAnswers?: string;
  assignment_id: string;
  attachment?: {
    type: string;
    content: string;
  };
  submission?: ISubmit;
  username: string;
}