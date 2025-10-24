/*import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import  Task from '../../types/Task';
import { ChevronDown, ChevronRight, Plus, Trash2, Edit3 } from 'lucide-react';
import styles from './TaskItem.module.scss';
import taskStore from '../../stores/taskStore';

interface TaskItemProps {
  task: Task;
  level?: number;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task, level = 0 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggle = () => {
    taskStore.toggleTask(task.id);
  };

  const handleToggleCollapse = () => {
    taskStore.toggleCollapse(task.id);
  };

  const handleSelect = () => {
    taskStore.selectTask(task);
  };

  const handleAddSubtask = () => {
    taskStore.addTask('Новая подзадача', task.id);
    if (task.collapsed) {
      taskStore.toggleCollapse(task.id);
    }
  };

  const handleDelete = () => {
    taskStore.deleteTask(task.id);
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleEditSave = () => {
    if (editTitle.trim()) {
      taskStore.updateTaskTitle(task.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const hasSubtasks = task.subtasks.length > 0;
  const completedSubtasks = taskStore.getCompletedSubtasksCount(task);
  const totalSubtasks = taskStore.getTotalSubtasksCount(task);

  return (
    <div className={styles.taskItem} style={{ marginLeft: `${level * 20}px` }}>
      <div className={styles.taskContent}>
        <div className={styles.taskMain}>
          {hasSubtasks && (
            <button
              className={styles.collapseButton}
              onClick={handleToggleCollapse}
            >
              {task.collapsed ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
            </button>
          )}
          {!hasSubtasks && <div className={styles.collapsePlaceholder} />}
          
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={task.completed}
            onChange={handleToggle}
          />
          
          <div 
            className={`${styles.title} ${task.completed ? styles.completed : ''}`}
            onClick={handleSelect}
          >
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleEditSave}
                onKeyDown={handleKeyPress}
                className={styles.editInput}
                autoFocus
              />
            ) : (
              <>
                {task.title}
                {totalSubtasks > 0 && (
                  <span className={styles.subtaskCount}>
                    ({completedSubtasks}/{totalSubtasks})
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={handleAddSubtask}
            title="Добавить подзадачу"
          >
            <Plus size={16} />
          </button>
          <button
            className={styles.actionButton}
            onClick={handleEditStart}
            title="Редактировать"
          >
            <Edit3 size={16} />
          </button>
          <button
            className={`${styles.actionButton} ${styles.danger}`}
            onClick={handleDelete}
            title="Удалить"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {hasSubtasks && !task.collapsed && (
        <div className={styles.subtasks}>
          {task.subtasks.map((subtask) => (
            <TaskItem
              key={subtask.id}
              task={subtask}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default TaskItem;*/


import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import type { Task } from '../../types/Task';
import taskStore from '../../stores/taskStore';

interface TaskItemProps {
  task: Task;
  level?: number;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task, level = 0 }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggle = () => {
    taskStore.toggleTask(task.id);
  };

  const handleToggleExpand = () => {
    /*taskStore.toggleExpand(task.id);*/
  };

  const handleSelect = () => {
    taskStore.selectTask(task);
  };

  const handleAddSubtask = () => {
    taskStore.addTask({ 
      title: 'Новая подзадача',
      parentId: task.id 
    });
  };

  const handleDelete = () => {
    taskStore.deleteTask(task.id);
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleEditSave = () => {
    /*if (editTitle.trim()) {
      taskStore.updateTaskTitle(task.id, editTitle.trim());
    }
    setIsEditing(false);*/
  };

  const handleEditCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  const hasSubtasks = task.subtasks.length > 0;

  return (
    <div style={{ marginLeft: `${level * 20}px`, marginBottom: '4px' }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '8px 12px', 
        borderRadius: '6px',
        backgroundColor: taskStore.selectedTask?.id === task.id ? '#f1f5f9' : 'transparent'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
          {hasSubtasks && (
            <button
              onClick={handleToggleExpand}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {task.expanded ? '▼' : '▶'} {/* Простые символы вместо иконок */}
            </button>
          )}
          {!hasSubtasks && <div style={{ width: '24px', height: '24px' }} />}
          
          <input
            type="checkbox"
            checked={task.completed}
            onChange={handleToggle}
            style={{ margin: '0 12px 0 8px' }}
          />
          
          <div 
            onClick={handleSelect}
            style={{ 
              flex: 1,
              cursor: 'pointer',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#94a3b8' : '#1e293b',
              padding: '4px 8px',
              borderRadius: '4px'
            }}
            onDoubleClick={handleEditStart}
          >
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleEditSave}
                onKeyDown={handleKeyPress}
                style={{ 
                  width: '100%', 
                  padding: '4px 8px', 
                  border: '1px solid #3b82f6', 
                  borderRadius: '4px' 
                }}
                autoFocus
              />
            ) : (
              <>
                {task.title}
              </>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '4px' }}>
          <button
            onClick={handleAddSubtask}
            title="Добавить подзадачу"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem'
            }}
          >
            + Подзадача
          </button>
          <button
            onClick={handleEditStart}
            title="Редактировать"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem'
            }}
          >
            ✎
          </button>
          <button
            onClick={handleDelete}
            title="Удалить"
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.75rem',
              color: '#ef4444'
            }}
          >
            ×
          </button>
        </div>
      </div>

      {hasSubtasks && task.expanded && (
        <div>
          {task.subtasks.map((subtask) => (
            <TaskItem
              key={subtask.id}
              task={subtask}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default TaskItem;