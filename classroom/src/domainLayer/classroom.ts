interface Report{
    title: string;
      description: string;
      reporter: string;
}

export interface IClassroom {
    _id?: string;
    className: string;
    classSection: string;
    classSubject: string;
    creator: string;
    students_enrolled: string[];
    admins: string[];
    classCode: string;
    backgroundPicture: string;
    createdAt?: Date;
    category: string;
    block: boolean;
    reported?: boolean;
    reason?:Report[];
    blockClassroom: boolean;
  }
  