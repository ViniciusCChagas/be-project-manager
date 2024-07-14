export interface IChangeTaskStatusParamsDto {
    taskId: string;
    status: 'completed' | 'todo';
    userId: string;
}