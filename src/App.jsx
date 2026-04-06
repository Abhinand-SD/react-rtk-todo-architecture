import TodoList from './components/TodoList';

function App() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* 
        This is our top-level Layout Wrapper.
        Business logic and state is kept inside the child components to maintain strict separation of concerns.
      */}
      <TodoList />
    </div>
  );
}

export default App;
