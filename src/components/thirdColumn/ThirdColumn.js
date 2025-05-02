import { useEffect, useState } from "react";
import DescribeBox from "./DescribeBox";

export default function ThirdColumn({ selectTask, taskList, setTaskList }) {
  const [describeTask, setDescribeTask] = useState("");
  const [isSave, setIsSave] = useState(false);

  useEffect(
    function () {
      if (!selectTask) {
        setDescribeTask("");
      } else {
        setDescribeTask(selectTask.describe || "");
      }
    },
    [selectTask]
  );

  useEffect(
    function () {
      setIsSave(false);
    },
    [describeTask]
  );

  function handleSave(description) {
    if (!selectTask) return;

    const updateTasks = taskList.map((task) =>
      task.id === selectTask.id ? { ...task, describe: description } : task
    );

    setTaskList(updateTasks);
    setDescribeTask(description);
    setIsSave(true);
  }

  return (
    <div className="third-column task-column">
      <div className="headline third-headline">
        <h2>Task :</h2>
      </div>
      <div className="main third-main-container">
        <DescribeBox>
          <h3>Description</h3>
          <div className="describe-main">
            <textarea
              value={describeTask}
              onChange={(e) => setDescribeTask(e.target.value)}
              className="describe"
              placeholder={
                !selectTask
                  ? `Select the TASK!!!`
                  : `Enter your describe task here`
              }
              rows="10"
              cols="30"
              disabled={!selectTask}
            ></textarea>
          </div>
        </DescribeBox>
        {selectTask && describeTask !== selectTask.describe && !isSave && (
          <div className="change-button">
            <button
              className="save-button"
              onClick={() => handleSave(describeTask)}
            >
              Save
            </button>
          </div>
        )}
        {isSave && <p className="save-notice">Changes Saved!</p>}
      </div>
    </div>
  );
}
