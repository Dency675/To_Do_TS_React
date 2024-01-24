import React, { useEffect, useState } from "react";
// import { tasksData } from "../constants/tasks";
import Tasks from "../Tasks";
import { TaskPropType } from "../types";
import { Button, Card, Container, Pagination } from "react-bootstrap";
import "../styles/taskList.css";
import axios from "axios";
import { off } from "process";

const TaskList = ({
  filterFunction,
  setFilter,
  tasks,
  filteredStatusTasks,
  changeStatus,
  prevPage,
  nextPage,
  offset,
  status,
}: any) => {
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
              ? tasks.map((task: any) => (
                  <Card.Body className="">
                    {" "}
                    <Tasks tasks={task} onclick={changeStatus} />
                  </Card.Body>
                ))
              : filteredStatusTasks.map((task: any) => (
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
              {/* <Pagination.Item>1</Pagination.Item>
              <Pagination.Item active>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item> */}
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
