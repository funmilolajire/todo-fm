import { v4 as uuid } from "uuid";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ListItem from "../ListItem/ListItem";
import styles from "./list.module.scss";
import { useState, useEffect } from "react";

const List = ({
  data,
  clearCompleted,
  filterData,
  deleteTask,
  markCompleted,
  filterBy,
}: {
  data: { id: string; status: string; task: string }[];
  clearCompleted: () => void;
  filterBy: "all" | "active" | "completed";
  filterData: (by: "all" | "active" | "completed") => void;
  deleteTask: (id: string) => void;
  markCompleted: (id: string) => void;
}) => {
  const [currentData, setCurrentData] = useState(data);
  useEffect(() => {
    if (filterBy !== "all") {
      const filtered = data.filter((task) => task.status === filterBy);
      setCurrentData(filtered);
    } else {
      setCurrentData(data);
    }
  }, [filterBy, data]);
  const [items, setItems] = useState<UniqueIdentifier[]>([]);

  useEffect(() => {
    setItems(currentData.map((task) => task.id) || []);
  }, [currentData]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        setCurrentData((prev) => {
          return arrayMove(prev, oldIndex, newIndex);
        });
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  const activeTasks = data.filter((task) => task.status === "active");
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <>
      <div className={styles.tasks}>
        <div className={styles.list}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {currentData.map((task) => (
                <ListItem
                  key={uuid()}
                  {...task}
                  deleteTask={deleteTask}
                  markCompleted={markCompleted}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
        <div className={styles.actions}>
          <span className={styles["items-left"]}>
            {activeTasks.length} item
            {activeTasks.length !== 1 ? "s" : ""} left
          </span>
          <div className={styles.buttons}>
            <button
              type="button"
              className={`${styles.all} ${
                filterBy === "all" ? styles.selected : ""
              }`}
              onClick={() => filterData("all")}
            >
              All
            </button>
            <button
              type="button"
              className={`${styles.active} ${
                filterBy === "active" ? styles.selected : ""
              }`}
              onClick={() => filterData("active")}
            >
              Active
            </button>
            <button
              type="button"
              className={`${styles.completed} ${
                filterBy === "completed" ? styles.selected : ""
              }`}
              onClick={() => filterData("completed")}
            >
              Completed
            </button>
          </div>
          <button
            type="button"
            className={styles.clear}
            onClick={clearCompleted}
          >
            Clear Completed
          </button>
        </div>
      </div>
      <div className={styles["mobile-buttons"]}>
        <button
          type="button"
          className={`${styles.all} ${
            filterBy === "all" ? styles.selected : ""
          }`}
          onClick={() => filterData("all")}
        >
          All
        </button>
        <button
          type="button"
          className={`${styles.active} ${
            filterBy === "active" ? styles.selected : ""
          }`}
          onClick={() => filterData("active")}
        >
          Active
        </button>
        <button
          type="button"
          className={`${styles.completed} ${
            filterBy === "completed" ? styles.selected : ""
          }`}
          onClick={() => filterData("completed")}
        >
          Completed
        </button>
      </div>
    </>
  );
};

export default List;
