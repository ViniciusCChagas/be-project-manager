import { IProjectRepository } from "./interfaces/IProjectRepository";
import { IProject, Project, } from "../models/project.model";
import { ProjectWithTasksDto } from "../models/dtos/GetProjectsDtos";
import { Types } from "mongoose";

export class ProjectRepository implements IProjectRepository {
    async createProject(project: IProject): Promise<IProject> {
        const newProject = await Project.create(project)
        return newProject.toObject();
    }

    async getProjectById(projectId: string): Promise<IProject | null> {
        return await Project.findById(projectId).lean();
    }

    async updateProjectName(projectId: string, newName: string): Promise<void> {
        await Project.updateOne({ _id: new Types.ObjectId(projectId) }, { name: newName });
    }

    async deleteProject(projectId: string): Promise<void> {
        await Project.deleteOne({ _id: new Types.ObjectId(projectId) });
    }

    async getProjects(userId: string): Promise<ProjectWithTasksDto[]> {
        const projects = await Project.aggregate<ProjectWithTasksDto>([
            {
                $match: {
                    userId: new Types.ObjectId(userId)
                }
            },
            {
                $lookup: {
                    from: 'tasks',
                    localField: '_id',
                    foreignField: 'projectId',
                    as: 'tasks'
                }
            }
        ])
        return projects;
    }
}