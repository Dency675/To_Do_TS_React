import React, { useEffect, useState } from "react";
// import { tasksData } from "../constants/tasks";
import Tasks from "./Tasks";
import { TaskPropType } from "./types";
import { Button, Card, Container, Pagination } from "react-bootstrap";
import "./styles/taskList.css";
import axios from "axios";
import { off } from "process";

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

  const [filter, setFilter] = useState<string>("All");

  const [offset, setOffset] = useState(10);

  const changeStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    let taskId: number = parseInt(e.target.value);
    let filteredTask = tasks.filter((task) => task.id === taskId);
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

  const prevPage = () => {
    setOffset((prev) => prev - 10);
  };
  const nextPage = () => {
    setOffset((prev) => prev + 10);
  };

  const apiCall = async () => {
    let axiosRes = await axios
      .get(
        `https://66d67463-dfdc-4301-9f39-b3ae3ea7b90a.mock.pstmn.io/task/offset=${offset}`
      )
      .then((data) => {
        const dataTodo = data.data;
        setTask(dataTodo);
        setFilteredStatusTasks(dataTodo);
        console.log(dataTodo);
      })
      .catch((err) => err);
    console.log(axiosRes);
  };
  // apiCall();
  useEffect(() => {
    apiCall();
  }, [offset]);

  useEffect(() => {
    // console.log("changed");
    // console.log(tasks);
    if (filter !== "All")
      setFilteredStatusTasks((prev) => {
        return prev.filter((data) => data.status === filter);
      });
    // console.log(filteredStatusTasks);
  }, [tasks]);

  return (
    <>
      {console.log("Mounting")}
      <Container>
        <Card className="m-3 customCard">
          <Card.Header>
            Tasks For The Day
            <select
              className="ms-5"
              onChange={(e) => {
                filterFunction(e);
                setFilter(e.target.value);
              }}
            >
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
            <Pagination>
              <Pagination.Prev
                onClick={prevPage}
                disabled={offset === 10 ? true : false}
              ></Pagination.Prev>

              <Pagination.Next
                onClick={nextPage}
                disabled={offset === 40 ? true : false}
              ></Pagination.Next>
            </Pagination>
          </Card.Footer>
        </Card>
      </Container>
    </>
  );
};

export default TaskList;
