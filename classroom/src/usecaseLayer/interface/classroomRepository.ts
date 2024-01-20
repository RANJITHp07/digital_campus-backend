import { IClassroom } from "../../domainLayer/classroom";

export interface IClassroomRepository {
  create(classroom: IClassroom): Promise<IClassroom>;
  update(id: string, update: Partial<IClassroom>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  findClassroom(code: string): Promise<IClassroom | null>;
  findAllClassrooms(studentId: string): Promise<IClassroom[]>;
  findCreatorClassrooms(id: string): Promise<IClassroom[]>;
  findAllparticipants(id: string): Promise<IClassroom | null>;
  getAllClassroom(id: string): Promise<IClassroom[]>;
  classroomFilter(id: string, category: string[]): Promise<IClassroom[]>;
  findAllUsersClassroom(page: number, pageSize: number): Promise<IClassroom[]>;
  findSearchedClassroom(page: number, pageSize: number, searchQuery: string): Promise<IClassroom[]>;
  updateProfile(id: string, update: { profile: string }): Promise<string>;
  getReportedClassrooms(page: number, pageSize: number): Promise<IClassroom[]>;
}
