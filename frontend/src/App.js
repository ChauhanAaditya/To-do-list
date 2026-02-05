import { useEffect, useState } from "react";

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
  const completed = tasks.filter(t => t.completed).length;
  const progress = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    document.body.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };



  useEffect(() => {
  const savedTheme = localStorage.getItem("theme") || "light";
  setTheme(savedTheme);

    if (savedTheme === "dark") {
      document.body.classList.add("dark");
    }

    loadTasks();
  }, []);



  const loadTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask({ title });
    setTitle("");
    loadTasks();
  };

  const toggle = async (task) => {
    await updateTask(task.id, { completed: !task.completed });
    loadTasks();
  };

  const remove = async (id) => {
    await deleteTask(id);
    loadTasks();
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
            placeholder="Add a new task..."
          />
          <button onClick={handleAdd}>+</button>
        </div>

        <div className="progress">
          <div className="bar">
            <div className="fill" style={{ width: `${progress}%` }} />
          </div>
          <span>{progress}% done</span>
        </div>

        <ul className="list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? "done" : ""}>
              <span onClick={() => toggle(task)}>{task.title}</span>
              <button onClick={() => remove(task.id)}>✕</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  );
}

export default App;
