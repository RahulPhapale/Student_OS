// context/TaskContext.jsx
import React, { createContext, useContext, useState } from 'react';

const TaskContext = createContext();

const initialColumns = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'inProgress', title: 'In Progress', tasks: [] },
  { id: 'inReview', title: 'In Review', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

export const TaskProvider = ({ children }) => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      ...task,
      createdAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
    
    setColumns(prev => prev.map(col => 
      col.id === 'todo' 
        ? { ...col, tasks: [...col.tasks, newTask.id] }
        : col
    ));
  };

  const updateTask = (taskId, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    setColumns(prev => prev.map(col => ({
      ...col,
      tasks: col.tasks.filter(id => id !== taskId)
    })));
  };

  const moveTask = (taskId, fromColumnId, toColumnId) => {
    setColumns(prev => prev.map(col => {
      if (col.id === fromColumnId) {
        return { ...col, tasks: col.tasks.filter(id => id !== taskId) };
      }
      if (col.id === toColumnId) {
        return { ...col, tasks: [...col.tasks, taskId] };
      }
      return col;
    }));
  };

  const getTaskById = (taskId) => {
    return tasks.find(task => task.id === taskId);
  };

  const value = {
    columns,
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTaskById,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};