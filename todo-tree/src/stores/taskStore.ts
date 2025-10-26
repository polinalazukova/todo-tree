import { makeAutoObservable } from 'mobx';
import type { Task, CreateTask } from '../types/Task';

class TaskStore {
  tasks: Task[] = [];
  selectedTask: Task | null = null;
  selectedTaskWithSubtasks: Task[] = []; 

  constructor() {
    makeAutoObservable(this);
    this.loadFromLocalStorage(); 
  }

  private loadFromLocalStorage = () => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  };

  private saveToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  };


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

  this.saveToLocalStorage(); 
};

  selectTask = (task: Task) => {
    this.selectedTask = task;
    this.selectedTaskWithSubtasks = this.getAllSubtasks(task);
  };

  private getAllSubtasks = (task: Task): Task[] => {
    const allTasks: Task[] = [task]; 
    
    const collectSubtasks = (currentTask: Task) => {
      currentTask.subtasks.forEach(subtask => {
        allTasks.push(subtask);
        collectSubtasks(subtask); 
      });
    };
    
    collectSubtasks(task);
    return allTasks;
  };

  isTaskSelected = (taskId: string): boolean => {
    return this.selectedTaskWithSubtasks.some(task => task.id === taskId);
  };

  deleteTask = (taskId: string) => {
    this.deleteTaskRecursive(this.tasks, taskId);
    if (this.selectedTask?.id === taskId) {
      this.selectedTask = null;
      this.selectedTaskWithSubtasks = [];
    }
    this.saveToLocalStorage(); 
  };

  toggleTask = (taskId: string) => {
    const task = this.findTask(taskId);
    if (task) {
      const newCompletedState = !task.completed;
      task.completed = newCompletedState;
      this.toggleAllSubtasks(task, newCompletedState);
      this.saveToLocalStorage(); 
    }
  };

  toggleExpand = (taskId: string) => {
    const task = this.findTask(taskId);
    if (task) {
      task.expanded = !task.expanded;
      this.saveToLocalStorage(); 
    }
  };

  updateTaskTitle = (taskId: string, title: string) => {
  const task = this.findTask(taskId);
  if (task) {
    task.title = title;
    this.saveToLocalStorage();
  }
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

  if (updateRecursive(this.tasks)) {
    this.saveToLocalStorage();
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

  private toggleAllSubtasks = (task: Task, completed: boolean) => {
    task.subtasks.forEach(subtask => {
      subtask.completed = completed;
      this.toggleAllSubtasks(subtask, completed);
    });
  };
}

export default new TaskStore();