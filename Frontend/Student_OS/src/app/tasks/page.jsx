import React, { useState, useEffect, useCallback  } from 'react';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Button } from "@/components/ui/button";


// Initial board columns
const initialColumns = [
  { id: 'todo', title: 'To Do', color: 'bg-gradient-to-r from-slate-500 to-slate-300' },
  { id: 'inprogress', title: 'In Progress', color: 'bg-gradient-to-r from-slate-500 to-slate-300' },
  { id: 'inreview', title: 'In Review', color: 'bg-gradient-to-r from-slate-500 to-slate-300' },
  { id: 'done', title: 'Done', color: 'bg-gradient-to-r from-slate-500 to-slate-300' }
];

// localStorage key
const STORAGE_KEY = 'kanban-tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [columns] = useState(initialColumns);
  const [activeTask, setActiveTask] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      setTasks(initialTasks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = tasks.find(t => t.id === active.id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id;
    const newStatus = over.id;

    // Check if dropping on a valid column
    const validColumns = columns.map(col => col.id);
    if (!validColumns.includes(newStatus)) return;

    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    setIsFormOpen(false);
  };

  const updateTask = (taskData) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskData.id ? { ...task, ...taskData } : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

const openEditForm = (task) => {
  console.log("🎯 OPENING EDIT FORM FOR TASK:", task);
  setEditingTask(task);
};

const deleteTask = (taskId) => {
  console.log("🔥 DELETING TASK:", taskId);
  setTasks(currentTasks => currentTasks.filter(task => task.id !== taskId));
};

  return (
    <div className="min-h-full bg-gray-50">
      {/* Header */}
      <header className=" sticky top-0 z-10  bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100  text-center shadow-2xl border border-gray-700 transform transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="ml-auto text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Board</h1>
              <span className="ml-4 mt-2 text-sm text-gray-500">Manage your tasks</span>
            </div>
            <Button
              onClick={() => setIsFormOpen(true)}
            >
              Add Task
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <KanbanBoard
            columns={columns}
            tasks={tasks}
            onEditTask={openEditForm}
            onDeleteTask={deleteTask}
          />
          
          <DragOverlay>
            {activeTask ? (
              <TaskCard 
                task={activeTask} 
                isDragging={false}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Task Form Modal */}
      {(isFormOpen || editingTask) && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? updateTask : addTask}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;