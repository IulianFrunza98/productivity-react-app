import { create } from "zustand";
import toast from "react-hot-toast";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import useAuthStore from "./useAuthStore";

const useTaskStore = create((set, get) => {
  const user = useAuthStore.getState().user;
  const tasksCollection = collection(db, "tasks");

  if (user) {
    const q = query(
      tasksCollection,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    onSnapshot(
      q,
      (querySnapshot) => {
        const tasks = [];
        querySnapshot.forEach((doc) => {
          tasks.push({ id: doc.id, ...doc.data() });
        });
        set({ tasks, filteredTasks: tasks });
      },
      (error) => {
        toast.error("Failed to load tasks: " + error.message);
      }
    );
  } else {
    set({ tasks: [], filteredTasks: [] });
  }

  return {
    tasks: [],
    filteredTasks: [],
    openAddForm: false,

    setOpenAddForm: (open) => set({ openAddForm: open }),

    setFilteredTasks: (filteredTasks) => set({ filteredTasks }),

    handleAddTask: async (task) => {
      try {
        await addDoc(tasksCollection, {
          ...task,
          createdAt: new Date(),
        });
        toast.success("Task added!");
      } catch (error) {
        toast.error("Failed to add task: " + error.message);
      }
    },

    handleDeleteTask: async (id) => {
      try {
        if (typeof id !== "string") {
          throw new Error("Invalid task id: expected string");
        }
        await deleteDoc(doc(db, "tasks", id));
        toast.success("Task deleted!");
      } catch (error) {
        toast.error("Failed to delete task: " + error.message);
      }
    },

    handleToggleTask: async (id) => {
      try {
        const task = get().tasks.find((t) => t.id === id);
        if (task) {
          await updateDoc(doc(db, "tasks", id), {
            completed: !task.completed,
          });
        }
      } catch (error) {
        toast.error("Failed to update task: " + error.message);
      }
    },
  };
});

export default useTaskStore;
