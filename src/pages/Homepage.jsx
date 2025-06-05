import ProductivityYellow from "../assets/productivity-yellow.svg";
import AuthForm from "../components/AuthForm";

function Homepage() {
  return (
    <section className="flex sm:flex-row flex-col gap-20 justify-center items-center min-h-screen px-4 sm:px-6 py-6 bg-yellow-50 dark:bg-gray-900">
      <div className="hidden sm:flex bg-white dark:bg-gray-800 min-h-[30rem] w-full max-w-[30rem] rounded-4xl shadow-md p-6 flex-col justify-center text-center">
        <img
          src={ProductivityYellow}
          alt="Stay productive illustration"
          className="mx-auto mb-6 w-48 h-auto"
        />
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Stay focused. Get more done.
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Welcome to your personal productivity dashboard — organize your day,
          set clear goals, and track your progress with ease.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 pt-15 sm:pt-10 min-h-[30rem] flex flex-col items-center w-full max-w-[30rem] rounded-2xl sm:rounded-4xl shadow-sm sm:shadow-md px-6 sm:px-8 pb-8">
        <h2 className="text-xl font-semibold mb-1 text-gray-900 dark:text-gray-100">
          Log in to your workspace
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Stay on track and manage your day
        </p>
        <AuthForm />
      </div>
    </section>
  );
}

export default Homepage;
