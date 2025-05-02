import { useEffect, useMemo, useState } from "react";
import DescribeBox from "./DescribeBox";

const THREE_SECONDS = 3 * 1000;

export default function ThirdColumn({ selectTask, taskList, setTaskList }) {
  const [describeTask, setDescribeTask] = useState("");
  const [isSave, setIsSave] = useState(false);

  const isDisplaySaveBtn = useMemo(() => {
    return (
      !!selectTask &&
      !!describeTask &&
      describeTask !== selectTask.describe &&
      !isSave
    );
  }, [selectTask, describeTask, isSave]);

  useEffect(() => {
    if (!selectTask) {
      setDescribeTask("");
      return;
    }

    setDescribeTask(selectTask.describe || "");
  }, [selectTask]);

  function handleSave(description) {
    if (!selectTask) return;

    const updateTasks = taskList.map((task) =>
      task.id === selectTask.id ? { ...task, describe: description } : task
    );

    setTaskList(updateTasks);
    setDescribeTask(description);
    setIsSave(true);
  }

  function onChangeDescribeTask(e) {
    setDescribeTask(e.target.value);
    setIsSave(false);
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
              onChange={onChangeDescribeTask}
              className="describe"
              placeholder={
                !selectTask
                  ? `Select the TASK!!!`
                  : `Enter your describe task here`
              }
              rows="10"
              cols="30"
              disabled={!selectTask}
            />
          </div>
        </DescribeBox>

        {isDisplaySaveBtn && (
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
