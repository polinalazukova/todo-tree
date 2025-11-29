export interface Task{
    id: string;
    title: string;
    description: string;
    completed: boolean;
    subtasks: Task[];
    expanded: boolean;
}

export type CreateTask ={
    title: string;
    description?: string;
    parentId?: string;
};

