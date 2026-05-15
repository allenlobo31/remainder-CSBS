import React, { useState } from 'react';

export default function Reminder() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ name: "", dueDate: "", description: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!form.name || !form.dueDate) return;

    setTasks([...tasks, { ...form, id: Date.now(), completed: false }]);
    setForm({ name: "", dueDate: "", description: "" }); // Resets form fields
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "notCompleted") return !t.completed;
    return true;
  });

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded">
      <h2 className="text-2xl font-bold text-center mb-4">Reminder App</h2>

      <form onSubmit={addTask} className="space-y-2 mb-5">

        <input
          type="text"
          name="name"
          placeholder="Task name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">
          Add Task
        </button>
      </form>

      <div className="flex gap-2 mb-4">
        {["all", "completed", "notCompleted"].map((status) => (
          
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`flex-1 py-1 text-xs font-semibold rounded capitalize transition ${
              filter === status ? "bg-green-400" : "bg-gray-100"
            }`}
          >
            {status === "notCompleted" ? "Pending" : status}
          </button>

        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.map((task) => (
          <li key={task.id} className="p-3 bg-gray-50 border rounded  flex items-start justify-between gap-2">
            
            <div className="flex-1 min-w-0">
              <strong className="block">{task.name}</strong>
              <span className=" text-gray-500">Due: {task.dueDate}</span>
            </div>

            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="mt-1 h-4 w-4 rounded border cursor-pointer"
            />

          </li>
        ))}
      </ul>
    </div>
  );
}