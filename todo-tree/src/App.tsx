import { observer } from 'mobx-react-lite';
import taskStore from './stores/taskStore';
import './App.scss';
import { useState } from 'react';

const App = observer(() => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  const startEditing = (task: any) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
  };

  const saveTitle = (taskId: string) => {
    if (editTitle.trim()) {
      const task = taskStore.tasks.find(t => t.id === taskId);
      if (task) {
        task.title = editTitle;
      }
      setEditingTaskId(null);
      setEditTitle('');
    }
  };

  return (
    <div className="app">
      <h1>🌳 Todo Tree</h1>
      <div className="layout">
        <div className="sidebar">
          <button 
            onClick={() => taskStore.addTask({ 
              title: 'Новая задача',
              description: 'Описание задачи'
            })}
          >
            + Добавить корневую задачу
          </button>
          
          <div className="task-list">
            {taskStore.tasks.length === 0 ? (
              <p className="empty">Пока нет задач. Добавьте первую!</p>
            ) : (
              <div>
                <h3>Задачи: {taskStore.tasks.length}</h3>
                {taskStore.tasks.map(task => (
                  <div key={task.id} className="task-item">
                    {editingTaskId === task.id ? (
                      <div className="editing-container">
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="edit-input"
                          autoFocus
                        />
                        <button 
                          onClick={() => saveTitle(task.id)}
                          className="save-btn"
                        >
                          ✓
                        </button>
                        <button 
                          onClick={() => setEditingTaskId(null)}
                          className="cancel-btn"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <>
                        <span 
                          onClick={() => taskStore.selectTask(task)}
                          className="task-title"
                          onDoubleClick={() => startEditing(task)}
                        >
                          {task.title}
                        </span>
                        <div className="task-actions">
                          <button 
                            onClick={() => startEditing(task)}
                            className="edit-btn"
                            title="Редактировать"
                          >
                            ✎
                          </button>
                          <button 
                            onClick={() => taskStore.deleteTask(task.id)}
                            className="delete-btn"
                          >
                            ×
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="details">
          {taskStore.selectedTask ? (
            <div>
              <h3>Детали задачи</h3>
              <p><strong>Название:</strong> {taskStore.selectedTask.title}</p>
              <p><strong>Описание:</strong> {taskStore.selectedTask.description}</p>
              <p><strong>Статус:</strong> {taskStore.selectedTask.completed ? '✅ Выполнена' : '⏳ В процессе'}</p>
              <p><strong>Подзадачи:</strong> {taskStore.selectedTask.subtasks.length}</p>
              
              <div className="description-edit">
                <h4>Редактировать описание:</h4>
                <textarea 
                  value={taskStore.selectedTask.description}
                  onChange={(e) => {
                    if (taskStore.selectedTask) {
                      taskStore.selectedTask.description = e.target.value;
                    }
                  }}
                  className="description-textarea"
                  placeholder="Введите описание задачи..."
                  rows={4}
                />
              </div>
            </div>
          ) : (
            <p className="empty">Выберите задачу для просмотра деталей</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default App;