import React from "react";

const Display = ({ name, age, number }: any) => {
  return (
    <div>
      <p>{name}</p>
      <p>{age}</p>
      <p>{number}</p>
    </div>
  );
};

export default Display;
