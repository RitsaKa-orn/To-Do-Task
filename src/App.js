import { useEffect, useState } from "react";
import FirstColumn from "./components/firstColumn/FirstColumn";
import SecondColumn from "./components/secondColumn/SecondColumn";
import ThirdColumn from "./components/thirdColumn/ThirdColumn";
import Tasks from "./components/firstColumn/Tasks";
import { useLocalStorageState } from "./useLocalStorageState.js";

export default function App() {
  // const tempTask = [
  //   {
  //     taskName: "Homework",
  //     type: "today",
  //     describe: "Well,I have Math, Science, English homework to do",
  //     id: crypto.randomUUID(),
  //   },
  //   {
  //     taskName: "Learning and keeping thing clean",
  //     type: "upcoming",
  //     describe: "",
  //     id: crypto.randomUUID(),
  //   },
  //   {
  //     taskName: "Watch movie",
  //     type: "upcoming",
  //     id: crypto.randomUUID(),
  //     describe: "",
  //   },
  // ];

  const [taskList, setTaskList] = useLocalStorageState([], "tasks");
  const [taskTopic, setTaskTopic] = useState("Today");
  const [selectTask, setSelectTask] = useState(null);

  useEffect(
    function () {
      setSelectTask(null);
    },
    [taskTopic]
  );

  return (
    <div className="main-container grid--col--3">
      <FirstColumn>
        <div className="headline first-headline">
          <h2>Menu</h2>
        </div>
        <div className="main first-main-container">
          <Tasks taskList={taskList} setTaskTopic={setTaskTopic} />
        </div>
      </FirstColumn>
      <SecondColumn
        taskTopic={taskTopic}
        taskList={taskList}
        setTaskList={setTaskList}
        selectTask={selectTask}
        setSelectTask={setSelectTask}
      />
      <ThirdColumn
        selectTask={selectTask}
        taskList={taskList}
        setTaskList={setTaskList}
      />
    </div>
  );
}
