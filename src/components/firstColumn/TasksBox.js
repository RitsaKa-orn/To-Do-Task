export default function TasksBox({ children, emoji, isActive, onClick }) {
  return (
    <div className={`task-box ${isActive ? "active" : ""}`} onClick={onClick}>
      {emoji}
      {children}
    </div>
  );
}
