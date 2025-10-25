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
    taskStore.toggleExpand(task.id);
  };

  const handleSelect = () => {
    taskStore.selectTask(task);
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditTitle(task.title);
  };

  const handleEditSave = () => {
    if (editTitle.trim() && taskStore.updateTaskTitle) {
      taskStore.updateTaskTitle(task.id, editTitle.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSave();
    }
  };

  const hasSubtasks = task.subtasks && task.subtasks.length > 0;
  const isSelected = taskStore.isTaskSelected(task.id);

  return (
    <div style={{ 
      marginBottom: '4px',
      marginLeft: `${level * 20}px`
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        padding: '8px 12px', 
        borderRadius: '6px',
        backgroundColor: isSelected ? '#CCCCCC' : 'transparent', 
        transition: 'all 0.2s ease'
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
                justifyContent: 'center',
                marginRight: '8px',
                color: isSelected ? '#333333' : '#333333'
              }}
            >
              {task.expanded ? '▼' : '▶'}
            </button>
          )}
          {!hasSubtasks && <div style={{ width: '24px', height: '24px', marginRight: '8px' }} />}
          
          <div 
            onClick={handleSelect}
            style={{ 
              flex: 1,
              cursor: 'pointer',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: '#000000',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '25px',
              fontWeight: isSelected ? '600' : '400'
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
                  borderRadius: '4px' 
                }}
                autoFocus
              />
            ) : (
              task.title
            )}
          </div>
        </div>
        
        <input
          type="checkbox"
          checked={task.completed || false}
          onChange={handleToggle}
          style={{ 
            width: '18px',
            height: '18px',
            cursor: 'pointer',
            marginLeft: '20px', 
            marginRight: '10px'
          }}
        />
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