import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask
} from "./services/api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const completed = tasks.filter(t => t.completed).length;
  const progress = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;

  // -------- THEME --------
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  // -------- LOAD TASKS --------
  const loadTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
      setError("");
    } catch {
      setError("Could not load tasks. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // -------- INIT --------
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }
    loadTasks();
  }, []);

  // -------- ADD TASK --------
  const handleAdd = async () => {
    if (!title.trim()) return;

    try {
      await addTask({ title });
      setTitle("");
      setError("");
      loadTasks();
    } catch {
      setError("Could not save task. Try again.");
    }
  };

  // -------- TOGGLE TASK --------
  const toggleTask = async (task) => {
    try {
      await updateTask(task.id, { completed: !task.completed });
      loadTasks();
    } catch {
      setError("Could not update task.");
    }
  };

  // -------- DELETE TASK --------
  const removeTask = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch {
      setError("Could not delete task.");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <div className="header">
          <h1>📝 My Tasks</h1>
          <button className="theme-btn" onClick={toggleTheme}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
        </div>

        <p className="subtitle">Stay organized, stay calm ✨</p>

        <div className="input-row">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
            placeholder="Add a new task..."
          />
          <button
            className="add-btn"
            onClick={handleAdd}
            disabled={!title.trim()}
            aria-label="Add task"
          />
        </div>

        {error && <p className="error">{error}</p>}
        {loading && <p className="loading">Loading tasks...</p>}

        <div className="progress">
          <div className="bar">
            <div className="fill" style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}% done</span>
        </div>

        <AnimatePresence>
          <ul className="list">
            {tasks.length === 0 && !loading && (
              <div className="empty">
                <div className="emoji">🗒️</div>
                <p>No tasks yet</p>
                <span>Add your first task to get started</span>
              </div>
            )}

            {tasks.map(task => (
              <motion.li
                key={task.id}
                className={task.completed ? "done" : ""}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                layout
              >
                <span onClick={() => toggleTask(task)}>
                  {task.title}
                </span>
                <button onClick={() => removeTask(task.id)}>✕</button>
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
