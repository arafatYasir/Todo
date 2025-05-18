import { MdDelete, MdEdit } from "react-icons/md";

const Task = ({ task, handleEditTask, handleDeleteTask, handleToggleCompleteTask }) => {
    const { id, title, description, completed } = task;


    return (
        <li className="task">
            <div className="task-left">
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={() => handleToggleCompleteTask(id)}
                />
                <div className="task-content">
                    <h3 className={`task-title ${completed ? "completed" : ""}`}>{title}</h3>
                    <p className="task-desc">{description}</p>
                </div>
            </div>

            <div className="task-actions">
                <button className="icon-btn" onClick={() => handleEditTask(id)}>
                    <MdEdit />
                </button>
                <button className="icon-btn" onClick={() => handleDeleteTask(id)}>
                    <MdDelete />
                </button>
            </div>
        </li>

    );
};

export default Task;