import React, { useState, ChangeEvent } from "react";
import Display from "./Display";

const FormDisplay: React.FC = () => {
  const [message, setMessage] = useState<string>("");

  return (
    <div>
      <label>Enter message</label>
      <input
        type="text"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setMessage(e.target.value);
        }}
      />
      <Display value={message} />
    </div>
  );
};

export default FormDisplay;
