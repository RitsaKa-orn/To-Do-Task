import { useState } from "react";

export default function TaskList({
  children,
  selectTask,
  setSelectTask,
  task,
  onDeleteTask,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  function handleOnClick() {
    if (!isDeleting) setSelectTask(task);
  }

  function handleCheckBox(e) {
    if (isDeleting) return; //Guard

    setIsDeleting(true);
    setSelectTask(null);

    setTimeout(() => {
      setFadeOut(true);
    }, 300);

    setTimeout(() => {
      onDeleteTask(task.id);
    }, 1000);
  }

  return (
    <li
      className={`task-list ${selectTask?.id === task.id ? "active" : ""} 
      ${isDeleting ? "deleting" : ""}
      ${fadeOut ? "fade-out" : ""}`}
      onClick={(e) => handleOnClick(e)}
    >
      <div className="task-list-text">
        <input
          type="checkbox"
          onChange={handleCheckBox}
          disabled={isDeleting}
        />
        {children}
      </div>
      <div className="task-list-icon-box">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="task-list-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </li>
  );
}
