import React from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore';

const TaskList: React.FC = observer(() => {
  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={(e) => {
        e.preventDefault();
        const input = e.currentTarget.elements.namedItem('title') as HTMLInputElement;
        if (input.value.trim()) {
          taskStore.addTask({ title: input.value.trim(), description: '' });
          input.value = '';
        }
      }} style={{ padding: '0 12px', marginBottom: '20px', display: 'flex', gap: '12px' }}>
        <input
          name="title"
          type="text"
          placeholder="Введите название новой задачи"
          style={{ 
            flex: 1, 
            padding: '8px 12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '6px',
            fontSize: '0.875rem'
          }}
        />
        <button 
          type="submit"
          style={{ 
            padding: '8px 16px', 
            border: 'none', 
            borderRadius: '6px', 
            backgroundColor: '#CCCCCC', 
            color: '#000000',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Добавить
        </button>
      </form>
      
      <div style={{ padding: '0 12px 20px' }}>
        {taskStore.tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#64748b' }}>
            <p>Нет задач. Добавьте первую задачу!</p>
          </div>
        ) : (
          taskStore.tasks.map((task) => (
            <div key={task.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: '8px 12px', 
              marginBottom: '4px',
              borderRadius: '6px'
            }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => taskStore.toggleTask(task.id)}
                style={{  marginRight: '12px',
                  width: '18px', 
                  height: '18px'}}
              />
              <div 
                onClick={() => taskStore.selectTask(task)}
                style={{ 
                   flex: 1, 
                  cursor: 'pointer',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#94a3b8' : '#1e293b',
                  fontSize: '20px', 
                  fontWeight: '500'
                }}
              >
                {task.title}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
});

export default TaskList;