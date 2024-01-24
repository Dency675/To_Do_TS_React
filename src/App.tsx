import React from "react";
import logo from "./logo.svg";
import "./App.css";
import TaskList from "./pages/TaskList/TaskList";
import Form from "./pages/Form";
import FormDisplay from "./pages/FormDisplay";
import InputForm from "./pages/InputForm";
import TaskListHandler from "./pages/TaskList/TaskListHandler";

function App() {
  return (
    <div className="App">
      {/* <TaskList/> */}
      {/* <Form></Form>
      <FormDisplay></FormDisplay> */}
      {/* <InputForm></InputForm> */}
      <TaskListHandler />
    </div>
  );
}

export default App;
