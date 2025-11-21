// hooks/useHelpers.js
export const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// You can also add more helper hooks here
export const useTaskHelpers = () => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTagColor = (tag) => {
    const colors = {
      bug: 'bg-red-100 text-red-800',
      feature: 'bg-blue-100 text-blue-800',
      improvement: 'bg-green-100 text-green-800',
      design: 'bg-purple-100 text-purple-800',
    };
    return colors[tag] || 'bg-gray-100 text-gray-800';
  };

  const getColumnColor = (columnId) => {
    switch (columnId) {
      case 'todo': return 'border-blue-200 bg-blue-50';
      case 'inProgress': return 'border-yellow-200 bg-yellow-50';
      case 'inReview': return 'border-purple-200 bg-purple-50';
      case 'done': return 'border-green-200 bg-green-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getHeaderColor = (columnId) => {
    switch (columnId) {
      case 'todo': return 'bg-blue-500';
      case 'inProgress': return 'bg-yellow-500';
      case 'inReview': return 'bg-purple-500';
      case 'done': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const isOverdue = (dueDate) => {
    return dueDate && new Date(dueDate) < new Date();
  };

  return {
    getPriorityColor,
    getTagColor,
    getColumnColor,
    getHeaderColor,
    isOverdue,
  };
};