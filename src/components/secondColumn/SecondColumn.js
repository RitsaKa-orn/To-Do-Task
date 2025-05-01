import { useState } from "react";
import TaskName from "./TaskName";
import TaskList from "./TaskList";

export default function SecondColumn({ taskTopic, taskList, setTaskList }) {
  const [task, setTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [successAdded, setIsAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function handleOnAdding(text) {
    if (text !== "") {
      setIsAdding(true);
    } else {
      setIsAdding(false);
    }
    setTask(text);
  }

  function handleClickAdding() {
    setTaskList([{ taskName: task }, ...taskList]);
    setTask("");
    setIsAdding(false);

    //susccess added
    setIsAdded(true);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    setTimeout(() => {
      setIsAdded(false);
    }, 3000);
  }

  return (
    <div className="second-column task-column">
      <div className="headline second-headline">
        {/* useState */}
        <h2>{taskTopic}</h2>
        <span>
          {
            taskList.filter((task) => task.type === taskTopic.toLowerCase())
              .length
          }
        </span>
      </div>
      <div className="add-task-box">
        <input
          type="text"
          value={task}
          placeholder="➕ Add Task"
          id="task-name"
          onChange={(e) => handleOnAdding(e.target.value)}
        />
        {successAdded && (
          <div className={`added ${isVisible ? "show" : "hidden"}`}>
            <p>Successfully Added</p>
          </div>
        )}
        {isAdding && (
          <>
            <p>Due</p>
            <select className="due-select">
              <option>Today</option>
              <option>Upcoming</option>
            </select>
            <button className="btn btn-add" onClick={handleClickAdding}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="button-add"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </>
        )}
      </div>
      <TaskName>
        {taskList.map((task, i) => (
          <TaskList key={i + 1}>{task.taskName}</TaskList>
        ))}
      </TaskName>
    </div>
  );
}
