import { useState } from 'react';
import Task from './components/Task';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [tasks, setTasks] = useState([]);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  function handleAddTask() {
    if (titleValue.trim() === "" || descriptionValue.trim() === "") {
      toast.warning("Box can't be left empty.");
      return;
    }

    const currentDateAndTime = new Date().toLocaleDateString('en-US', {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const newTask = {
      id: Date.now(),
      title: titleValue,
      description: descriptionValue,
      completed: false,
      createdAt: currentDateAndTime
    };

    setTasks(prev => [...prev, newTask]);
    setTitleValue("");
    setDescriptionValue("");
  }

  function handleEditTask(id) {
    if(update) {
      toast.error("Can't update multiple tasks at once.");
      return;
    }
    const targetTask = tasks.find(task => task.id === id);

    setTitleValue(targetTask.title);
    setDescriptionValue(targetTask.description);
    setUpdate(true);
    setUpdateId(id);
  }

  function handleUpdateTask() {
    if (titleValue.trim() === "" || descriptionValue.trim() === "") {
      toast.warning("Box can't be left empty.");
      return;
    }

    const updatedTasks = tasks.map(task => {
      if(task.id === updateId) {
        return {
          ...task,
          title: titleValue,
          description: descriptionValue
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setTitleValue("");
    setDescriptionValue("");
    setUpdate(false);
    setUpdateId(null);
  }

  function handleDeleteTask(id) {
    if(update) {
      toast.error("Task can't be deleted during update.");
      return;
    }

    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  }

  function handleToggleCompleteTask(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  return (
    <div className="app-container">
      <div className="form">
        <input type="text" placeholder='Title' value={titleValue} onChange={(e) => setTitleValue(e.target.value)} />
        <textarea placeholder='Description' value={descriptionValue} onChange={(e) => setDescriptionValue(e.target.value)} />
        {
          update
            ? <button className="btn update-btn" onClick={handleUpdateTask}>Update</button>
            : <button className="btn add-btn" onClick={handleAddTask}>Add Task</button>
        }
      </div>

      <hr className="divider" />

      <ul className="task-list">
        {
          tasks.map(task => (
            <Task
              key={task.id}
              task={task}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              handleToggleCompleteTask={handleToggleCompleteTask}
            />
          ))
        }
      </ul>
      <ToastContainer />
    </div>
  );
}

export default App;