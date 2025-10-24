/*import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import  taskStore  from '../../stores/taskStore';
import styles from './AddTask.module.scss';

const AddTask: React.FC = observer(() => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      taskStore.addTask(title.trim());
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.addTaskForm}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите название новой задачи..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        <Plus size={20} />
        Добавить
      </button>
    </form>
  );
});

export default AddTask;*/



import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore'; // обратите внимание на default import

const AddTask: React.FC = observer(() => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      taskStore.addTask({ 
        title: title.trim(), 
        description: '' 
        // parentId не передаем - это корневая задача
      });
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: '0 12px', marginBottom: '20px', display: 'flex', gap: '12px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Введите название новой задачи..."
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
          backgroundColor: '#3b82f6', 
          color: 'white',
          fontSize: '0.875rem',
          fontWeight: '500',
          cursor: 'pointer'
        }}
      >
        Добавить
      </button>
    </form>
  );
});

export default AddTask;