import { useEffect } from "react";
import { FaUserCircle, FaUpload } from "react-icons/fa";
import Button from "../ui/Button";
import BtnOutline from "../ui/BtnOutline";
import useAuthStore from "../store/useAuthStore";
import useProfileStore from "../store/useProfileStore";

function Profile() {
  const user = useAuthStore((state) => state.user);
  const {
    displayName,
    email,
    photoURL,
    isSaving,
    setDisplayName,
    setEmail,
    initializeProfile,
    handlePhotoChange,
    handleSaveChanges,
    handleCancel,
  } = useProfileStore();

  useEffect(() => {
    if (user) {
      initializeProfile(user);
    }
  }, [user, initializeProfile]);

  return (
    <div className="w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xs p-8 space-y-[2.2rem]">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
        Profile
      </h1>
      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Profile Photo */}
      <section className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          Profile Photo
        </h2>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden shadow-inner">
            {photoURL ? (
              <img
                src={photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="text-gray-400 dark:text-gray-500 text-7xl" />
            )}
          </div>
          <label className="cursor-pointer text-yellow-600 hover:text-yellow-800 font-semibold flex items-center gap-2">
            <FaUpload className="inline" /> Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePhotoChange(e.target.files[0])}
            />
          </label>
        </div>
      </section>
      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Contact: Full Name */}
      <section className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <label
          htmlFor="fullName"
          className="text-gray-700 dark:text-gray-300 font-semibold w-full sm:w-1/3"
        >
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Type your name here..."
          className="
            w-full
            max-w-[20rem]
            bg-gray-50 dark:bg-gray-700
            border
            border-gray-300 dark:border-gray-600
            rounded-md
            px-4
            py-2
            text-sm
            font-medium
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
            focus:ring-1
            focus:ring-yellow-400
            focus:border-yellow-400
            transition
            duration-200
            min-w-0
          "
        />
      </section>
      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Contact: Email Address */}
      <section className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <label
          htmlFor="email"
          className="text-gray-700 dark:text-gray-300 font-semibold w-full sm:w-1/3"
        >
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@example.com"
          className="
            w-full
            max-w-[20rem]
            bg-gray-50 dark:bg-gray-700
            border
            border-gray-300 dark:border-gray-600
            rounded-md
            px-4
            py-2
            text-sm
            font-medium
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none
            focus:ring-1
            focus:ring-yellow-400
            focus:border-yellow-400
            transition
            duration-200
            min-w-0
          "
        />
      </section>
      <hr className="border-gray-300 dark:border-gray-700" />

      {/* Buttons */}
      <section className="flex justify-end gap-4 pt-4">
        <BtnOutline onClick={handleCancel}>Cancel</BtnOutline>
        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </section>
    </div>
  );
}

export default Profile;
