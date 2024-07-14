import { IProject } from "../project.model";
import { ITask } from "../task.model";

export interface ProjectWithTasksDto extends IProject {
    tasks: ITask[]
}