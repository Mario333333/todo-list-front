export interface Comment {
  _id: string;

  comment: string;
  description: string;
  author: string;
}
export interface SubTasks {
  _id: string;

  subtask: string;
  description: string;
  isClosed: boolean;

  author: string;
}


export interface Task {
  _id: string;
  task: string;
  description: string;
  isClosed: boolean;
  author: string;
  subTasks: SubTasks[];
  comments: Comment[];
}
