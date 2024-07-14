import { IProject } from "../../models/project.model";
import { Document } from "mongoose";
import { ProjectWithTasksDto } from "../../models/dtos/GetProjectsDtos";

export interface IProjectRepository {
    createProject(project: IProject): Promise<IProject>;

    getProjectById(projectId: string): Promise<IProject | null>;

    updateProjectName(projectId: string, newName: string): Promise<void>;

    deleteProject(projectId: string): Promise<void>;

    getProjects(userId: string): Promise<ProjectWithTasksDto[]>;
}