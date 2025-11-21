import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Clock, User, CheckCircle2, AlertCircle, Edit, Trash2 } from 'lucide-react';

export function TaskCard({ task, isDragging, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : {};

  // Check if task is overdue
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'done';
  
  // Check if task is completed
  const isCompleted = task.status === 'done';

  const handleEditClick = (e) => {
    e.stopPropagation();
    console.log('Edit button clicked for task:', task.id);
    console.log('onEdit function:', onEdit);
    
    if (onEdit) {
      onEdit(task);
    } else {
      console.error('onEdit prop is not defined!');
    }
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    console.log('Delete button clicked for task:', task.id);
    console.log('onDelete function:', onDelete);
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      if (onDelete) {
        onDelete(task.id);
      } else {
        console.error('onDelete prop is not defined!');
      }
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`
        bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-grab
        hover:shadow-md transition-all duration-200
        ${isDragging ? 'opacity-50 rotate-5' : ''}
        ${isCompleted ? 'opacity-75 border-green-200' : ''}
        ${isOverdue ? 'border-red-300 bg-red-50' : ''}
      `}
    >
      {/* Task Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight flex-1 mr-2">
          {task.title}
        </h3>
        <div className="flex space-x-1">
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleEditClick}
            className="text-gray-400 hover:text-blue-600 transition-colors p-1"
            title="Edit task"
          >
            <Edit className="w-3 h-3" />
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleDeleteClick}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
            title="Delete task"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Due Date */}
      <div className="flex items-center text-xs text-gray-500 mb-2">
        <Clock className="w-3 h-3 mr-1" />
        <span className={isOverdue && !isCompleted ? 'text-red-600 font-medium' : ''}>
          {new Date(task.dueDate).toLocaleDateString()}
          {isOverdue && !isCompleted && ' (Overdue)'}
        </span>
        {isCompleted && (
          <CheckCircle2 className="w-3 h-3 ml-2 text-green-600" />
        )}
        {isOverdue && !isCompleted && (
          <AlertCircle className="w-3 h-3 ml-2 text-red-600" />
        )}
      </div>

      {/* Assignee */}
      <div className="flex items-center text-xs text-gray-500 mb-3">
        <User className="w-3 h-3 mr-1" />
        <span>{task.assignee}</span>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {task.tags.map(tag => (
            <span
              key={tag}
              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}