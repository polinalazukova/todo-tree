import { makeAutoObservable } from 'mobx';
import type { Task, CreateTask } from '../types/Task';

class TaskStore {
  tasks: Task[] = [];
  selectedTask: Task | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  addTask = (data: CreateTask) => {
    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: data.title,
      description: data.description || '',
      completed: false,
      subtasks: [],
      expanded: true
    };

    if (data.parentId) {
      this.findAndAddSubtask(this.tasks, data.parentId, newTask);
    } else {
      this.tasks.push(newTask);
    }
  };

  selectTask = (task: Task) => {
    this.selectedTask = task;
  };

  deleteTask = (taskId: string) => {
    this.deleteTaskRecursive(this.tasks, taskId);
    if (this.selectedTask?.id === taskId) {
      this.selectedTask = null;
    }
  };

  toggleTask = (taskId: string) => {
    const task = this.findTask(taskId);
    if (task) {
      task.completed = !task.completed;
    }
  };

  private findAndAddSubtask = (tasks: Task[], parentId: string, newTask: Task): boolean => {
    for (const task of tasks) {
      if (task.id === parentId) {
        task.subtasks.push(newTask);
        return true;
      }
      if (this.findAndAddSubtask(task.subtasks, parentId, newTask)) {
        return true;
      }
    }
    return false;
  };

  private deleteTaskRecursive = (tasks: Task[], taskId: string): boolean => {
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasks.splice(index, 1);
      return true;
    }

    for (const task of tasks) {
      if (this.deleteTaskRecursive(task.subtasks, taskId)) {
        return true;
      }
    }
    return false;
  };

  private findTask = (id: string, tasks: Task[] = this.tasks): Task | null => {
    for (const task of tasks) {
      if (task.id === id) return task;
      const found = this.findTask(id, task.subtasks);
      if (found) return found;
    }
    return null;
  };
  updateTaskDescription = (taskId: string, description: string) => {
  if (this.selectedTask?.id === taskId) {
    this.selectedTask.description = description;
  }
  
  const updateRecursive = (tasks: Task[]): boolean => {
    for (const task of tasks) {
      if (task.id === taskId) {
        task.description = description;
        return true;
      }
      if (updateRecursive(task.subtasks)) {
        return true;
      }
    }
    return false;
  };

  updateRecursive(this.tasks);
};
}

export default new TaskStore();