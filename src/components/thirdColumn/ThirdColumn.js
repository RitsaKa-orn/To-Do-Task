import { useEffect, useMemo, useState } from "react";
import DescribeBox from "./DescribeBox";

export default function ThirdColumn({ selectTask, taskList, setTaskList }) {
  const [describeTask, setDescribeTask] = useState("");
  const [isSave, setIsSave] = useState(false);
  const [isDisplaySaveBtn, setIsDisplaySaveBtn] = useState(false);

  const averageFadeOutTime = 3 * 1000;

  useEffect(() => {
    if (selectTask?.describe) {
      setDescribeTask(selectTask.describe);
    } else {
      setDescribeTask("");
    }
  }, [selectTask]);

  function handleSave(description) {
    setIsDisplaySaveBtn(false);
    setIsSave(true);

    const updateTasks = taskList.map((task) =>
      task.id === selectTask.id ? { ...task, describe: description } : task
    );

    setTaskList(updateTasks);

    setTimeout(() => {
      setIsSave(false);
    }, averageFadeOutTime);
  }

  function onChangeDescribeTask(e) {
    setDescribeTask(e.target.value);

    setIsDisplaySaveBtn(e.target.value === "" ? false : true);
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
