export interface IAssigment {
    assigmentType: "Assignment" | "Quiz" | "Announcment" | "Question" | "Material" | "Others";
    mainTopic: string;
    dueDate:{
        day:string,
        time:string
    }; 
    class_id: String;
    students: string[];
  }