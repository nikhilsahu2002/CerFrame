import "./App.css";
import { get, getDatabase, ref, set } from "firebase/database";
import { app } from "./Firebase";

const db = getDatabase(app);
function App() {
  const putData = () => {
    set(ref(db, "user/Nikhil"), {
      id: 1,
      name: "Nikhil Sahu",
      age: 21,
    });
    console.log("dataSend");
  };
  const getData = () => {
    get(ref());
  };
  return (
    <>
      <div>
        <h1 onClick={putData}>Hello World !!!!</h1>
      </div>
    </>
  );
}

export default App;
