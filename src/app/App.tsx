import moon from "../assets/images/icon-moon.svg";
import sun from "../assets/images/icon-sun.svg";
import { useSetTheme } from "../hooks/useSetTheme";
import Create from "../components/Create/Create";
import List from "../components/List/List";
import styles from "./app.module.scss";
import { useDataActions } from "../hooks/useDataActions";

function App() {
  const { theme, handleThemeChange } = useSetTheme();
  const {
    data,
    clearCompleted,
    filterData,
    deleteTask,
    createTask,
    markCompleted,
    filterBy,
  } = useDataActions();

  return (
    <div
      className={`${styles.app} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
      id="todo-app"
    >
      <div className={styles.container}>
        <header>
          <h1>TODO</h1>
          <button
            type="button"
            onClick={() =>
              handleThemeChange(theme === "dark" ? "light" : "dark")
            }
          >
            <img src={theme === "dark" ? sun : moon} alt="theme-control" />
          </button>
        </header>
        <Create createTask={createTask} />
        <List
          data={data}
          clearCompleted={clearCompleted}
          filterData={filterData}
          deleteTask={deleteTask}
          markCompleted={markCompleted}
          filterBy={filterBy}
        />
        <p className={styles["can-drag"]}>Drag and drop to reorder list</p>
      </div>
    </div>
  );
}

export default App;
