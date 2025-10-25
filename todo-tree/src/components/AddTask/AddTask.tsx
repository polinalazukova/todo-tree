import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import taskStore from '../../stores/taskStore'; 

const AddTask: React.FC = observer(() => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      taskStore.addTask({ 
        title: title.trim(), 
        description: '' 
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
      />
      <button type="submit">
        Добавить
      </button>
    </form>
  );
});

export default AddTask;