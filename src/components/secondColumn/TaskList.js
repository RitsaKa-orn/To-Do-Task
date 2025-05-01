export default function TaskList({ children }) {
  return (
    <li className="task-list">
      <div className="task-list-text">
        <input type="checkbox" />
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
