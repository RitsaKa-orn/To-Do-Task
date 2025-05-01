import { useState } from "react";
import FirstColumn from "./components/firstColumn/FirstColumn";
import SecondColumn from "./components/secondColumn/SecondColumn";
import ThirdColumn from "./components/thirdColumn/ThirdColumn";
import Tasks from "./components/firstColumn/Tasks";

export default function App() {
  /*

  Center column
()We do have the headline from the left side

(opt the weather of the selected date)
  
    3) we have Add new task at the top after the headline

    3.1we do have  a task list from the map I mean loop


    Right column
() we do have the task : (this was a name of task)

4) we do have the details of the tas k indluding the subtrack of task

(we be able to change the details of task)
  */

  const tempTask = [
    { taskName: "Homework", type: "today" },
    { taskName: "Learning and keeping thing clean as fuck", type: "upcoming" },
    { taskName: "Watch movie", type: "upcoming" },
  ];

  const [taskList, setTaskList] = useState(tempTask);
  const [taskTopic, setTaskTopic] = useState("Today");

  return (
    <div className="main-container grid--col--3">
      <FirstColumn>
        <div className="headline first-headline">
          <h2>Menu</h2>
        </div>
        <div className="main first-main-container">
          <Tasks taskList={taskList} />
        </div>
      </FirstColumn>
      <SecondColumn
        taskTopic={taskTopic}
        taskList={taskList}
        setTaskList={setTaskList}
      />
      <ThirdColumn />
    </div>
  );
}
