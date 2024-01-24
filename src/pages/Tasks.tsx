import React, { useEffect, useState } from "react";
import { TaskComponentPropType } from "./types";
import { Card, Form } from "react-bootstrap";

const Tasks = ({ tasks, onclick }: TaskComponentPropType) => {
  const [currentAction, setCurrentAction] = useState(
    tasks.status === "complete" ? true : false
  ); //status of the current task. currentAction will become true if any kind of action done (that is click or unclick the button)

  useEffect(() => {
    console.log("component mounted");
    return () => {
      //Cleanup Fn
      console.log("Unmounted");
    };
  }, []); //Dependency array - if one of the value changes useEffect will run again

  // useEffect(() => {
  //   console.log("action performed");
  // }, [currentAction]);

  return (
    <Card className="my-2 customTask px-3">
      <Form>
        <Form.Check
          label={tasks.title}
          checked={tasks.status === "complete" ? true : false}
          onChange={(e) => {
            onclick(e);
            // setCurrentAction(tasks.status === "complete" ? true : false);
          }}
          value={tasks.id}
        />
      </Form>
    </Card>
  );
};

export default Tasks;
