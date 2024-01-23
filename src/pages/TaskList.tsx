import React, { useEffect, useState } from "react";
import { tasksData } from "../constants/tasks";
import Tasks from "./Tasks";
import { TaskPropType } from "./types";
import { Button, Card, Container } from "react-bootstrap";
import "./styles/taskList.css";

const TaskList = () => {
  const [tasks, setTask] = useState<TaskPropType["tasks"][]>([
    {
      id: 0,
      title: "",
      status: "complete",
    },
  ]);
  const [filteredStatusTasks, setFilteredStatusTasks] = useState<
    TaskPropType["tasks"][]
  >([
    {
      id: 0,
      title: "",
      status: "complete",
    },
  ]);
  const [status, setStatus] = useState(false);

  const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let taskId: number = parseInt(e.target.value);
    let filteredTask = tasksData.filter((task) => task.id === taskId);
    filteredTask[0].status = e.target.checked ? "complete" : "incomplete";
    setTask((prev) => {
      let toReplaceData = prev?.filter(
        (data) => data.id === filteredTask[0].id
      );
      let toReplaceIndex = prev?.indexOf(toReplaceData[0]);
      prev?.splice(toReplaceIndex, 1, filteredTask[0]);
      return [...prev];
    });
  };
  const filterFunction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    if (e.target.value === "All") {
      setFilteredStatusTasks(tasks);
      setStatus(false);
    } else {
      let filtered = tasks.filter((task) => task.status === e.target.value);
      setFilteredStatusTasks(filtered);
      setStatus(true);
    }
  };

  return (
    <>
      {console.log("Mounting")}
      <Container>
        <Card className="m-3 customCard">
          <Card.Header>
            Tasks For The Day
            <select className="ms-5" onChange={filterFunction}>
              <option selected value="All">
                All
              </option>
              <option value="complete">Complete</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </Card.Header>
          <Card.Body>
            {!status
              ? tasks.map((task) => (
                  <Card.Body className="">
                    {" "}
                    <Tasks tasks={task} onclick={changeStatus} />
                  </Card.Body>
                ))
              : filteredStatusTasks.map((task) => (
                  <Card.Body className="">
                    {" "}
                    <Tasks tasks={task} onclick={changeStatus} />
                  </Card.Body>
                ))}
          </Card.Body>
          <Card.Footer>
            Thats all{" "}
            <Button
              variant="primary"
              type="button"
              onClick={() => (window.location.href = "/random")}
            />{" "}
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default TaskList;
