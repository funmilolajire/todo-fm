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
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <button
        type="button"
        className={styles["check-box"]}
        onClick={() => markCompleted(id)}
      >
        {" "}
      </button>
      <p className={styles.task}>{task}</p>
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
