import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();

  // Fetch Tasks
  const fetchTasks = async () => {

    try {

      const { data } = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add or Edit Task
  const addTask = async () => {

    if (!title) {
      alert("Please enter task");
      return;
    }

    try {

      // Edit Task
      if (editId) {

        await axios.put(
          `http://localhost:5000/api/tasks/${editId}`,
          {
            title,
          }
        );

        setEditId(null);

      } else {

        // Add Task
        await axios.post(
          "http://localhost:5000/api/tasks",
          {
            title,
            status: "Todo",
          }
        );
      }

      setTitle("");

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // Update Task Status
  const updateTask = async (id, status) => {

    try {

      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status }
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // Logout
  const logoutHandler = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Task Manager
        </h1>

        <button
          onClick={logoutHandler}
          className="bg-red-500 text-white px-5 py-2 rounded"
        >
          Logout
        </button>

      </div>

      {/* Add Task */}
      <div className="flex gap-4 mb-5">

        <input
          type="text"
          placeholder="Enter task"
          className="border p-3 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-black text-white px-6 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>

      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search tasks..."
        className="border p-3 rounded w-full mb-8"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Columns */}
      <div className="grid grid-cols-3 gap-6">

        {["Todo", "In Progress", "Done"].map((status) => (

          <div
            key={status}
            className="bg-white p-5 rounded-xl shadow min-h-[400px]"
          >

            <h2 className="text-2xl font-bold mb-4">
              {status}
            </h2>

            {tasks
              .filter(
                (task) =>
                  task.status === status &&
                  task.title
                    .toLowerCase()
                    .includes(search.toLowerCase())
              )
              .map((task) => (

                <div
                  key={task._id}
                  className="bg-gray-100 p-3 rounded mb-3"
                >

                  <p className="font-semibold mb-3">
                    {task.title}
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {/* Progress Button */}
                    {task.status === "Todo" && (

                      <button
                        onClick={() =>
                          updateTask(task._id, "In Progress")
                        }
                        className="bg-yellow-500 text-white px-3 py-1 rounded"
                      >
                        Progress
                      </button>

                    )}

                    {/* Done Button */}
                    {task.status !== "Done" && (

                      <button
                        onClick={() =>
                          updateTask(task._id, "Done")
                        }
                        className="bg-green-500 text-white px-3 py-1 rounded"
                      >
                        Done
                      </button>

                    )}

                    {/* Edit Button */}
                    <button
                      onClick={() => {
                        setTitle(task.title);
                        setEditId(task._id);
                      }}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() =>
                        deleteTask(task._id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

          </div>

        ))}

      </div>

    </div>
  );
}

export default Dashboard;