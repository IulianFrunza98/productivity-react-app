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
  let unsubscribe = null;

  const subscribeToTasks = (user) => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }

    if (user && user.uid) {
      const tasksCollection = collection(db, "tasks");
      const q = query(
        tasksCollection,
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );

      unsubscribe = onSnapshot(
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
  };

  // Subscribe to user changes
  const user = useAuthStore.getState().user;
  subscribeToTasks(user);

  useAuthStore.subscribe(
    (user) => {
      subscribeToTasks(user);
    },
    (state) => state.user
  );

  return {
    tasks: [],
    filteredTasks: [],
    openAddForm: false,

    setOpenAddForm: (open) => set({ openAddForm: open }),

    setFilteredTasks: (filteredTasks) => set({ filteredTasks }),

    handleAddTask: async (task) => {
      try {
        await addDoc(collection(db, "tasks"), {
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
