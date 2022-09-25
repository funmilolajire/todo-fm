import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import close from "../../assets/images/icon-cross.svg";
import styles from "./list-item.module.scss";

const ListItem = ({
  status,
  task,
  id,
  deleteTask,
  markCompleted,
}: {
  status: string;
  task: string;
  id: string;
  deleteTask: (id: string) => void;
  markCompleted: (id: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className={`${styles["list-item"]} ${
        status === "completed" ? styles.completed : ""
      }`}
      style={style}
      ref={setNodeRef}
    >
      <span
        tabIndex={0}
        className={styles["check-box"]}
        onClick={() => markCompleted(id)}
      >
        {" "}
      </span>
      <p className={styles.task} {...attributes} {...listeners}>
        {task}
      </p>
      <button
        type="button"
        className={styles.clear}
        onClick={() => deleteTask(id)}
      >
        <img src={close} alt="clear-item" />
      </button>
    </div>
  );
};

export default ListItem;
