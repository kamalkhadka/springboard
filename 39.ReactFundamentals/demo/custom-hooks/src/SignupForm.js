import React from "react";
import useFields from "./hooks/useFields";

const SignupForm = () => {
  const [formData, handleChange] = useFields({
    username: "",
    email: "",
    password: "",
  });

  return (
    <form>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
    </form>
  );
};

export default SignupForm;
