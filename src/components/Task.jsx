import { MdDelete, MdEdit } from "react-icons/md";

const Task = ({ task, handleEditTask, handleDeleteTask, handleToggleCompleteTask }) => {
    const { id, title, description, completed, createdAt } = task;


    return (
        <li className={`task ${completed ? "completed" : ""}`}>
            <div className="task-left">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleToggleCompleteTask(id)}
                />
                <div className="task-content">
                    <h3 className={`task-title ${completed ? "completed" : ""}`}>{title}</h3>
                    <p className="task-desc">{description}</p>
                    <p className="task-time">{createdAt}</p>
                </div>
            </div>

            <div className="task-actions">
                <button className="icon-btn" onClick={() => handleEditTask(id)} aria-label="Edit Task">
                    <MdEdit />
                </button>
                <button className="icon-btn" onClick={() => handleDeleteTask(id)} aria-label="Delete Task">
                    <MdDelete />
                </button>
            </div>
        </li>

    );
};

export default Task;