export class Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: boolean;
  project: any;
  createdAt: any;
  updatedAt: any;

  constructor(
    id: number = 0,
    title: string,
    description: string,
    priority: number,
    status: boolean,
    project: any,
    createdAt: any,
    updatedAt: any
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.project = project;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
