import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';

const TaskDetails: React.FC = observer(() => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const { selectedTask } = taskStore;

  if (!selectedTask) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100%', 
        textAlign: 'center', 
        color: '#64748b' 
      }}>
        <h3 style={{ marginBottom: '8px', color: '#475569' }}>Выберите задачу</h3>
        <p>Выберите задачу из списка слева, чтобы просмотреть или редактировать её</p>
      </div>
    );
  }

  const handleEditStart = () => {
    setEditTitle(selectedTask.title);
    setEditDescription(selectedTask.description);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      selectedTask.title = editTitle.trim();
    }
    selectedTask.description = editDescription;
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(selectedTask.title);
    setEditDescription(selectedTask.description);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Удалить задачу "${selectedTask.title}"?`)) {
      taskStore.deleteTask(selectedTask.id);
    }
  };

  return (
    <div style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      padding: '24px',
      paddingTop: '65px'
    }}>
      {isEditing ? (
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          style={{ 
            width: '100%',
            padding: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            fontSize: '1.5rem',
            fontWeight: 600,
            marginBottom: '20px'
          }}
          autoFocus
        />
      ) : (
        <h1 
          onClick={handleEditStart}
          style={{ 
            margin: '0 0 20px 0', 
            color: '#1e293b', 
            fontSize: '1.5rem', 
            fontWeight: 600,
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '6px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          {selectedTask.title}
        </h1>
      )}

      <div style={{ marginBottom: '20px', flex: 1 }}>
        <div style={{ 
          fontSize: '0.875rem', 
          fontWeight: 500, 
          color: '#475569',
          marginBottom: '8px'
        }}>
        </div>
        {isEditing ? (
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={10}
            style={{ 
              width: '100%', 
              padding: '12px', 
              borderRadius: '6px',
              fontFamily: 'inherit', 
              fontSize: '0.875rem', 
              lineHeight: 1.5, 
              resize: 'vertical'
            }}
          />
        ) : (
          <div 
            onClick={handleEditStart}
            style={{ 
              padding: '12px', 
              borderRadius: '6px', 
              fontSize: '20px', 
              lineHeight: 1.5, 
              minHeight: '200px', 
              whiteSpace: 'pre-wrap',
              backgroundColor: '#CCCCCC',
              color: '#000000',
              fontStyle: selectedTask.description ? 'normal' : 'italic',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#CCCCCC'}
          >
            {selectedTask.description}
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              style={{ 
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: '#10b981',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            >
              Сохранить
            </button>
            <button
              onClick={handleCancel}
              style={{ 
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                backgroundColor: '#6b7280',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            >
              Отменить
            </button>
          </>
        ) : (
          <></>
        )}
        <button
          onClick={handleDelete}
          style={{
            padding: '10px 20px',
            backgroundColor: '#666666',
            color: '#000000',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: 500
          }}
        >
          Удалить
        </button>
      </div>
    </div>
  );
});

export default TaskDetails;