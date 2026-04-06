import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo } from '../features/todos/todoSlice';
import TodoItem from './TodoItem';
import { PlusCircle, ListTodo } from 'lucide-react';

export default function TodoList() {
  // useSelector subscribes the component to the Redux store.
  // It only re-renders when the specific piece of state we select (todos.items) changes.
  const todos = useSelector((state) => state.todos.items);
  const dispatch = useDispatch();
  
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent standard HTTP form submission
    
    const trimmedText = inputText.trim();
    if (!trimmedText) {
      setError('Please enter a task name.');
      return;
    }

    // dispatch sends the action to the Redux store.
    // The reducer matches the action type and applies the update.
    dispatch(addTodo(trimmedText));
    setInputText('');
    setError(''); 
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (error) setError(''); // Clear error context early when the user starts typing
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-white/50">
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">Task Master</h1>
        <p className="text-gray-500">Organize your workflow effectively</p>
      </div>

      <form onSubmit={handleSubmit} className="mb-8 relative">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="What needs to be done?"
            className={`w-full pl-5 pr-14 py-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-0
              ${error ? 'border-red-300 focus:border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-500 bg-white shadow-sm'}
            `}
          />
          <button 
            type="submit"
            className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
            aria-label="Add Todo"
          >
            <PlusCircle size={24} />
          </button>
        </div>
        {error && (
          <p className="absolute -bottom-6left-2 text-sm text-red-500 font-medium">
            {error}
          </p>
        )}
      </form>

      <div className="mt-8">
        {todos.length === 0 ? (
          // Empty State UI
          <div className="py-12 flex flex-col items-center justify-center text-gray-400 bg-white/50 rounded-xl border border-dashed border-gray-300">
            <ListTodo size={48} className="mb-4 opacity-50" />
            <p className="text-lg font-medium text-gray-500">No tasks yet</p>
            <p className="text-sm">Add a task above to get started</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>

      {todos.length > 0 && (
        <div className="mt-6 text-sm text-gray-500 text-center font-medium">
          {todos.filter(t => t.completed).length} of {todos.length} tasks completed
        </div>
      )}
    </div>
  );
}
