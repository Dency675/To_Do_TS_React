import React, { useEffect } from "react";
import { TaskComponentPropType } from "./types";
import { Card, Form } from "react-bootstrap";

const Tasks = ({ tasks, onclick }: TaskComponentPropType) => {
  useEffect(() => {
    console.log("component mounted");
    return () => { //Cleanup Fn
      console.log("Unmounted");
    };
  }, []);//Dependency array - if one of the value changes useEffect will run again
  return (
    <Card className="my-2 customTask px-3">
      <Form>
        <Form.Check
          label={tasks.title}
          checked={tasks.status === "complete" ? true : false}
          onChange={onclick}
          value={tasks.id}
        />
      </Form>
    </Card>
  );
};

export default Tasks;
