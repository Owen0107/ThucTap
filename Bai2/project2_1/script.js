class TodoApp {
    constructor() {
        this.tasks = this.loadFromStorage();
        this.currentFilter = 'all';
        this.editingTaskId = null;
        this.init();
    }

    init() {
        this.taskInput = document.getElementById('taskInput');
        this.addBtn = document.getElementById('addBtn');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        
        this.addBtn.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTask();
        });

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.dataset.filter));
        });

        this.render();
    }

    addTask() {
        const text = this.taskInput.value.trim();
        if (!text) {
            this.shakeInput();
            return;
        }

        const task = {
            id: Date.now(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.taskInput.value = '';
        this.saveToStorage();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveToStorage();
        this.render();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveToStorage();
            this.render();
        }
    }

    startEdit(id) {
        this.editingTaskId = id;
        this.render();
        
        const input = document.querySelector(`[data-edit-id="${id}"]`);
        if (input) {
            input.focus();
            input.select();
        }
    }

    saveEdit(id) {
        const input = document.querySelector(`[data-edit-id="${id}"]`);
        const newText = input.value.trim();
        
        if (!newText) {
            this.shakeElement(input);
            return;
        }

        const task = this.tasks.find(t => t.id === id);
        if (task) {
            task.text = newText;
            this.editingTaskId = null;
            this.saveToStorage();
            this.render();
        }
    }

    cancelEdit() {
        this.editingTaskId = null;
        this.render();
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        this.render();
    }

    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'active':
                return this.tasks.filter(task => !task.completed);
            case 'completed':
                return this.tasks.filter(task => task.completed);
            default:
                return this.tasks;
        }
    }

    render() {
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            this.taskList.innerHTML = '';
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            this.taskList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
            this.attachEventListeners();
        }

        this.updateStats();
    }

    createTaskHTML(task) {
        const isEditing = this.editingTaskId === task.id;
        
        return `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    data-toggle-id="${task.id}"
                >
                <span class="task-text ${isEditing ? 'editing' : ''}">${this.escapeHtml(task.text)}</span>
                <input 
                    type="text" 
                    class="task-edit-input ${isEditing ? 'active' : ''}" 
                    value="${this.escapeHtml(task.text)}"
                    data-edit-id="${task.id}"
                >
                <div class="task-actions">
                    ${isEditing ? `
                        <button class="task-btn btn-save" data-save-id="${task.id}">Lưu</button>
                        <button class="task-btn btn-cancel" data-cancel-id="${task.id}">Hủy</button>
                    ` : `
                        <button class="task-btn btn-edit" data-edit-btn-id="${task.id}">Sửa</button>
                        <button class="task-btn btn-delete" data-delete-id="${task.id}">Xóa</button>
                    `}
                </div>
            </li>
        `;
    }

    attachEventListeners() {
        document.querySelectorAll('[data-toggle-id]').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const id = parseInt(e.target.dataset.toggleId);
                this.toggleTask(id);
            });
        });

        document.querySelectorAll('[data-delete-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.deleteId);
                this.deleteTask(id);
            });
        });

        document.querySelectorAll('[data-edit-btn-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.editBtnId);
                this.startEdit(id);
            });
        });

        document.querySelectorAll('[data-save-id]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.dataset.saveId);
                this.saveEdit(id);
            });
        });

        document.querySelectorAll('[data-cancel-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.cancelEdit();
            });
        });

        document.querySelectorAll('[data-edit-id]').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const id = parseInt(e.target.dataset.editId);
                    this.saveEdit(id);
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.cancelEdit();
                }
            });
        });
    }

    updateStats() {
        const total = this.tasks.length;
        const active = this.tasks.filter(t => !t.completed).length;
        const completed = this.tasks.filter(t => t.completed).length;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('activeTasks').textContent = active;
        document.getElementById('completedTasks').textContent = completed;
    }

    saveToStorage() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }

    loadFromStorage() {
        const data = localStorage.getItem('todoTasks');
        return data ? JSON.parse(data) : [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    shakeInput() {
        this.taskInput.style.animation = 'none';
        setTimeout(() => {
            this.taskInput.style.animation = 'shake 0.5s ease';
        }, 10);
    }

    shakeElement(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'shake 0.5s ease';
        }, 10);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
