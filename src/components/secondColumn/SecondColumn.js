import { useState } from "react";
import TaskName from "./TaskName";
import TaskList from "./TaskList";

export default function SecondColumn({
  taskTopic,
  taskList,
  setTaskList,
  setSelectTask,
  selectTask,
}) {
  const [task, setTask] = useState("");
  const [type, setType] = useState("Today");
  const [isAdding, setIsAdding] = useState(false);
  const [successAdded, setIsAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  function handleDeleteTask(id) {
    setTaskList((task) => task.filter((task) => task.id !== id));
    if (selectTask?.id === id) {
      setSelectTask(null);
    }
  }

  function handleOnAdding(text) {
    if (text !== "") {
      setIsAdding(true);
    } else {
      setIsAdding(false);
    }
    setTask(text);
  }

  function handleClickAdding() {
    setTaskList([
      { taskName: task, type, id: crypto.randomUUID(), describe: "" },
      ...taskList,
    ]);
    setTask("");
    setIsAdding(false);
    setType("Today");

    //susccess added
    setIsAdded(true);
    setIsVisible(true);
    setSelectTask(null);

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
        <div className="task-topic-textbox">
          <h2>{taskTopic}</h2>
          <span>
            {
              taskList.filter(
                (task) => task.type.toLowerCase() === taskTopic.toLowerCase()
              ).length
            }
          </span>
        </div>
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
            <select
              value={type}
              className="due-select"
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Today">Today</option>
              <option value="Upcoming">Upcoming</option>
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
      {taskList.length === 0 ? (
        <div className="start-task">
          <p>⬆️Start Adding your task...</p>
        </div>
      ) : (
        <TaskName>
          {taskList
            .filter(
              (task) => task.type.toLowerCase() === taskTopic.toLowerCase()
            )
            .map((task, i) => (
              <TaskList
                selectTask={selectTask}
                setSelectTask={setSelectTask}
                key={task.id}
                task={task}
                onDeleteTask={handleDeleteTask}
              >
                {task.taskName}
              </TaskList>
            ))}
        </TaskName>
      )}
    </div>
  );
}
