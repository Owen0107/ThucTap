const { useState } = React;

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div className="counter-container card">
            <h2>Counter</h2>
            <div className="counter-display">{count}</div>
            <div className="counter-buttons">
                <button onClick={() => setCount(count - 1)} className="btn btn-danger">
                    <span>-</span>
                </button>
                <button onClick={() => setCount(0)} className="btn btn-secondary">
                    <span>Reset</span>
                </button>
                <button onClick={() => setCount(count + 1)} className="btn btn-success">
                    <span>+</span>
                </button>
            </div>
        </div>
    );
}

function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                    className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
            </div>
            <button onClick={() => onDelete(todo.id)} className="btn-delete">
                <span>×</span>
            </button>
        </div>
    );
}

function TodoList({ todos, onToggle, onDelete }) {
    return (
        <div className="todo-list">
            {todos.length === 0 ? (
                <div className="empty-state">
                    <p>Chưa có việc nào cần làm!</p>
                </div>
            ) : (
                todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))
            )}
        </div>
    );
}

function TodoForm({ onAdd }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onAdd(inputValue);
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="todo-form">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhập công việc mới..."
                className="todo-input"
            />
            <button type="submit" className="btn btn-primary">
                <span>Thêm</span>
            </button>
        </form>
    );
}

function TodoApp() {
    const [todos, setTodos] = useState([]);

    const addTodo = (text) => {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        setTodos([...todos, newTodo]);
    };

    const toggleTodo = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const stats = {
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        pending: todos.filter(t => !t.completed).length
    };

    return (
        <div className="todo-container card">
            <h2>Todo List</h2>
            <TodoForm onAdd={addTodo} />
            <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
            {todos.length > 0 && (
                <div className="todo-stats">
                    <div className="stat">
                        <span className="stat-label">Tổng:</span>
                        <span className="stat-value">{stats.total}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Hoàn thành:</span>
                        <span className="stat-value stat-completed">{stats.completed}</span>
                    </div>
                    <div className="stat">
                        <span className="stat-label">Còn lại:</span>
                        <span className="stat-value stat-pending">{stats.pending}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

function App() {
    return (
        <div className="app">
            <header className="app-header">
                <h1>React - Counter & Todo App</h1>
                <p>Ứng dụng quản lý công việc với React Hooks</p>
            </header>
            <div className="app-content">
                <Counter />
                <TodoApp />
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
