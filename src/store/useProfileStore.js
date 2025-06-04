import { create } from "zustand";
import { auth } from "../firebase/firebase";
import { updateProfile, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";

const storage = getStorage();

const useProfileStore = create((set, get) => ({
  displayName: "",
  email: "",
  photoURL: "",
  newPhotoFile: null,
  isSaving: false,

  setDisplayName: (displayName) => set({ displayName }),
  setEmail: (email) => set({ email }),
  setPhotoURL: (photoURL) => set({ photoURL }),
  setNewPhotoFile: (file) => set({ newPhotoFile: file }),
  setIsSaving: (isSaving) => set({ isSaving }),

  initializeProfile: (user) => {
    set({
      displayName: user.displayName || "",
      email: user.email || "",
      photoURL: user.photoURL || "",
      newPhotoFile: null,
      isSaving: false,
    });
  },

  handlePhotoChange: (file) => {
    if (file) {
      get().setNewPhotoFile(file);
      get().setPhotoURL(URL.createObjectURL(file));
    }
  },

  handleSaveChanges: async () => {
    const user = auth.currentUser;
    if (!user) return;
    set({ isSaving: true });

    try {
      let updatedPhotoURL = get().photoURL;
      const newPhotoFile = get().newPhotoFile;

      if (newPhotoFile) {
        const photoRef = ref(
          storage,
          `profilePhotos/${user.uid}/${newPhotoFile.name}`
        );
        await uploadBytes(photoRef, newPhotoFile);
        updatedPhotoURL = await getDownloadURL(photoRef);
      }

      await updateProfile(user, {
        displayName: get().displayName,
        photoURL: updatedPhotoURL,
      });

      if (get().email !== user.email) {
        await updateEmail(user, get().email);
      }

      toast.success("Profile updated successfully!");
      set({ newPhotoFile: null });
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile: " + error.message);
    } finally {
      set({ isSaving: false });
    }
  },

  handleCancel: () => {
    const user = auth.currentUser;
    if (user) {
      get().initializeProfile(user);
    }
  },
}));

export default useProfileStore;
