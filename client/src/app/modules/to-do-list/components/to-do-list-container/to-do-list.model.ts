export class Task {
  id: number;
  title: string;
  description: string;
  priority: number;
  status: boolean;
  project: any;

  constructor(
    id: number = 0,
    title: string,
    description: string,
    priority: number,
    status: boolean,
    project: any
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.status = status;
    this.project = project;
  }
}
