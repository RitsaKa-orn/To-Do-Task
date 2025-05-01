import TasksBox from "./TasksBox";

export default function Tasks({ taskList }) {
  return (
    <div className="tasks-type">
      <h3>Tasks</h3>
      <TasksBox>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="task-box-icon today-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.242 5.992h12m-12 6.003H20.24m-12 5.999h12M4.117 7.495v-3.75H2.99m1.125 3.75H2.99m1.125 0H5.24m-1.92 2.577a1.125 1.125 0 1 1 1.591 1.59l-1.83 1.83h2.16M2.99 15.745h1.125a1.125 1.125 0 0 1 0 2.25H3.74m0-.002h.375a1.125 1.125 0 0 1 0 2.25H2.99"
          />
        </svg>
        <p>Today</p>
        <span>{taskList.filter((task) => task.type === "today").length}</span>
      </TasksBox>
      <TasksBox>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="task-box-icon upcoming-icon"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
          />
        </svg>
        Upcoming
        <span>
          {taskList.filter((task) => task.type === "upcoming").length}
        </span>
      </TasksBox>
    </div>
  );
}
