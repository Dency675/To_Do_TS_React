import React, { useEffect, useState } from "react";
import Tasks from "../Tasks";
import { TaskPropType } from "../types";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import TaskList from "./TaskList";
const TaskListHandler = () => {
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

  const apiCall = async () => {
    let axiosRes = await axios
      .get(
        `https://7baedfcf-49f1-4541-8c17-97e25084a377.mock.pstmn.io/task/offset=${offset}`
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

  const prevPage = () => {
    setOffset((prev) => prev - 10);
  };
  const nextPage = () => {
    setOffset((prev) => prev + 10);
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
    <div>
      <TaskList
        filterFunction={filterFunction}
        setFilter={setFilter}
        tasks={tasks}
        filteredStatusTasks={filteredStatusTasks}
        changeStatus={changeStatus}
        prevPage={prevPage}
        nextPage={nextPage}
        offset={offset}
        status={status}
      />
    </div>
  );
};

export default TaskListHandler;
