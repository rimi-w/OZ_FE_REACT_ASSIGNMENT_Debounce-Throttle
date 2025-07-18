import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [debounceInputValue, setDebounceInputValue] = useState("");
  const [throttleInputValue, setThrottleInputValue] = useState("")
  const [searchString, setSearchString] = useState("");
  const time = useRef(new Date());

  const handleDebounceInput = useCallback((event) => {
    setDebounceInputValue(event.target.value);
    console.log("검색 쿼리:", event.target.value);
  }, []);

  const handleThrottleInput = useCallback((event) => {
    setThrottleInputValue(event.target.value);
    console.log("검색 쿼리:", event.target.value);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchString(debounceInputValue);
    }, 1000);

    return () => clearTimeout(debounce);
  }, [debounceInputValue])

  useEffect(() => {
    const newTime = new Date();

    const throttle = setTimeout(() => {
      setSearchString(throttleInputValue)
      time.current = new Date();
    }, 1000 - (newTime - time.current));

    return () => clearTimeout(throttle)
  }, [throttleInputValue])


  return (
    <div className="container">
      <h1>
        debounce와 throttle을
        <br />
        이용한 검색
      </h1>
      <div>
        <h2>Debounce</h2>
        <input
          type="text"
          placeholder="Debounce를 이용한 검색..."
          onChange={handleDebounceInput}
        />
      </div>
      <div>
        <h2>Throttle</h2>
        <input
          type="text"
          placeholder="Throttle을 이용한 검색..."
          onChange={handleThrottleInput}
        />
      </div>
      <p>search word : {searchString}</p>
    </div>
  );
}

export default App;
