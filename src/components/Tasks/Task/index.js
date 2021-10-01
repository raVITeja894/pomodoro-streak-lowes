import React, { useRef, useContext } from "react";
import "./styles.css";

import TaskContext from "../TaskList/context";

export default function Task({ task, index }) {
  const ref = useRef();
  const { handleStatus } = useContext(TaskContext);

  return (
    <div ref={ref} className={false ? "Task Dragging" : "Task"}>
      <div>{task.title}</div>
      <span onClick={() => handleStatus(task)}>
        {task.closed ? "Open" : "Close"}
      </span>
    </div>
  );
}
