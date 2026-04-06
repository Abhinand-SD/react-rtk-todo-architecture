import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleStatus, deleteTodo, editTodo } from '../features/todos/todoSlice';
import { Trash2, Edit2, Check, X } from 'lucide-react';

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  
  // Local state to manage the UI state strictly separately from the global Redux store.
  // We only commit changes to Redux when the user hits Save.
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  // Automatically focus the input when the user enters edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleToggle = () => {
    dispatch(toggleStatus(todo.id));
  };

  const handleDelete = () => {
    // Utilize window.confirm to intercept accidental deletions before dispatching
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTodo(todo.id));
    }
  };

  const handleSaveEdit = () => {
    const trimmedText = editText.trim();
    if (trimmedText && trimmedText !== todo.text) {
      // Dispatches an object payload, mapping to our { id, newText } structure in the reducer
      dispatch(editTodo({ id: todo.id, newText: trimmedText }));
    } else {
      // Revert if empty or unchanged
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSaveEdit();
    if (e.key === 'Escape') handleCancelEdit();
  };

  return (
    <li className={`flex items-center justify-between p-4 mb-3 bg-white rounded-xl border border-gray-100 shadow-sm transition-all
      ${todo.completed ? 'opacity-60 bg-gray-50' : 'hover:shadow-md'}
    `}>
      <div className="flex items-center gap-4 flex-1">
        {/* Customized checkbox for checking off tasks */}
        <button 
          onClick={handleToggle}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors
            ${todo.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-blue-400'}`}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <Check size={14} strokeWidth={3} />}
        </button>

        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 px-3 py-1.5 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-gray-700"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <span className={`text-lg font-medium transition-all ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
              {todo.text}
            </span>
            <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full w-max ${todo.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              Status: {todo.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 ml-4">
        {isEditing ? (
          <>
            <button 
              onClick={handleSaveEdit}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Save"
            >
              <Check size={18} />
            </button>
            <button 
              onClick={handleCancelEdit}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
              title="Cancel"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => setIsEditing(true)}
              disabled={todo.completed} // Disallow editing if already done
              className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-400"
              title="Edit"
            >
              <Edit2 size={18} />
            </button>
            <button 
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
