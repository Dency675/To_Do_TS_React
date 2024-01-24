import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Display from "./Display";

const InputForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [number, setNumber] = useState();

  const changeName = (e: any) => {
    setName(e.target.value);
  };

  const changeAge = (e: any) => {
    setAge(e.target.value);
  };

  const changeNumber = (e: any) => {
    setNumber(e.target.value);
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control type="text" id="name" onChange={(e) => changeName(e)} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="age">Age:</Form.Label>
          <Form.Control type="number" id="age" onChange={(e) => changeAge(e)} />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="phoneNumber">Phone number:</Form.Label>
          <Form.Control
            type="number"
            id="phoneNumber"
            onChange={(e) => changeNumber(e)}
          />
        </Form.Group>
      </Form>
      <Display name={name} age={age} number={number}></Display>
    </>
  );
};

export default InputForm;
