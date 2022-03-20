import Board from "./Components/Board";
import BirthdayInput from "./Components/BirthdayInput";
import BirthdayState from "./context/BirthdayState";

function App() {
  return (
    <div className="App">
      <h1>birthday reminder</h1>
      <BirthdayState>
        <BirthdayInput />
        <Board />
      </BirthdayState>
    </div>
  );
}

export default App;
