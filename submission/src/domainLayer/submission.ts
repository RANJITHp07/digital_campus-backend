interface Submit{
    status:"Late Submission"| "Submitted" | "Not Submitted",
    grade:number
}

export interface ISubmission{
    assignment_id:string,
    dueDate:{
        day:string,
        time:string,
        timer:string[]
    },
    points:number
    submission: Submit[]
}