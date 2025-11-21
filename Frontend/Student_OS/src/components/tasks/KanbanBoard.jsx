import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';

export function KanbanBoard({ columns, tasks, onEditTask, onDeleteTask }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {columns.map(column => (
        <KanbanColumn
          key={column.id}
          column={column}
          tasks={tasks.filter(task => task.status === column.id)}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}

function KanbanColumn({ column, tasks, onEditTask, onDeleteTask }) {
  const { isOver, setNodeRef } = useDroppable({
    id: column.id,
  });

  const columnStyle = isOver ? 'bg-gray-50 border-2 border-dashed border-gray-400' : 'bg-gray-100';

  return (
    <div className="flex flex-col h-full">
      {/* Column Header */}
      <div className={`flex items-center justify-between p-4 rounded-t-lg ${column.color} text-white`}>
        <h2 className="font-semibold text-lg">{column.title}</h2>
        <span className="bg-white text-black bg-opacity-20 px-2 py-1 rounded-full text-sm">
          {tasks.length}
        </span>
      </div>
      
      {/* Column Content */}
      <div
        ref={setNodeRef}
        className={`flex-1 p-4 rounded-b-lg transition-colors ${columnStyle} 
              overflow-y-auto max-h-[70vh]`}
      >
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              isDragging={false}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              <p>No tasks</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}