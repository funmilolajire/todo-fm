import styles from "./create.module.scss";
import { useState } from "react";

const Create = ({ createTask }: { createTask: (task: string) => void }) => {
  const [task, setTask] = useState("");
  return (
    <div className={styles.create}>
      <input
        type="text"
        name="create-item"
        id="create"
        aria-label="create-new-item"
        placeholder="Create a new todo…"
        value={task}
        onChange={({ target }) => setTask(target.value)}
        onKeyDown={({ key }) => {
          if (key === "Enter") {
            createTask(task);
            setTask("");
          }
        }}
      />
    </div>
  );
};

export default Create;
