interface Quiz{
        question:string,
        answers:string[]

}

export interface IAssigment {
    assignmentType: "Assignment" | "Quiz" | "Announcement" | "Question" | "Material" | "Polling";
    mainTopic: string;
    title: string;
    dueDate: {
        day: string;
        time: string;
    };
    class_id: string[];
    students: string[];
    points:number,
    instruction?:string,
    attachment?:{
        type:string,
        content:string
    };
    creator:string,
    polling:{
        answers:string[],
        polling:number[]
        },
    quiz:Quiz[]      
}
