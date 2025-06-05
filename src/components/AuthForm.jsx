// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthForm() {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex w-full items-center justify-center px-4">
      <div className="w-full p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={isRegister ? "register" : "login"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isRegister ? (
              <RegisterForm onToggle={() => setIsRegister(false)} />
            ) : (
              <LoginForm onToggle={() => setIsRegister(true)} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AuthForm;
