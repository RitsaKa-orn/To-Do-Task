import { useEffect, useState } from "react";
import FirstColumn from "./components/firstColumn/FirstColumn";
import SecondColumn from "./components/secondColumn/SecondColumn";
import ThirdColumn from "./components/thirdColumn/ThirdColumn";
import Tasks from "./components/firstColumn/Tasks";
import { useLocalStorageState } from "./useLocalStorageState.js";
import Loader from "./components/Loader.js";

const KEY = "3d62bd5dd3ad4ea28cb115905250305";

export default function App() {
  const [taskList, setTaskList] = useLocalStorageState([], "tasks");
  const [taskTopic, setTaskTopic] = useState("Today");
  const [selectTask, setSelectTask] = useState(null);
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const weatherForecast = (
    <div
      className={`forecast ${getWeatherCategory(
        weather?.current?.condition?.text || ""
      )} ${weather?.current?.is_day === 0 ? "night" : ""}`}
    >
      <div className="forecast-text">
        <p>{weather?.location?.region}</p>
      </div>
      <div>
        <img src={weather?.current?.condition.icon} alt="weather icon" />
        <p>{weather?.current?.temp_c}°C</p>
        <p>{weather?.current?.condition.text}</p>
        <p>{weather?.current?.is_day === 0 ? "Night" : "Day"}</p>
      </div>
    </div>
  );

  useEffect(() => {
    async function getWeather() {
      try {
        setIsLoading(true);
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude: lat, longitude: lng } = position.coords;

        const res = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${KEY}&q=${lat},${lng}&aqi=no`
        );

        if (!res.ok) {
          throw new Error("Unable To fetch data");
        }

        const data = await res.json();

        console.log(data);
        // console.log(data.location.region);
        setWeather(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getWeather();
  }, []);

  useEffect(
    function () {
      setSelectTask(null);
    },
    [taskTopic]
  );

  function getWeatherCategory(text) {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("thunder")) return "stormy";
    if (
      lowerText.includes("snow") ||
      lowerText.includes("sleet") ||
      lowerText.includes("ice")
    )
      return "snowy";
    if (
      lowerText.includes("rain") ||
      lowerText.includes("drizzle") ||
      lowerText.includes("shower")
    )
      return "rainy";
    if (lowerText.includes("cloud") || lowerText.includes("overcast"))
      return "cloudy";
    if (lowerText.includes("fog") || lowerText.includes("mist")) return "misty";
    if (lowerText.includes("sun") || lowerText.includes("clear"))
      return "sunny";

    return "default";
  }

  return (
    <div className="main-container grid--col--3">
      <FirstColumn>
        <div className="headline first-headline">
          <h2>Menu</h2>
        </div>
        <div className="main first-main-container">
          <Tasks taskList={taskList} setTaskTopic={setTaskTopic} />
        </div>
        <div className="weather-container">
          {isLoading ? <Loader /> : weather?.current && weatherForecast}
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
