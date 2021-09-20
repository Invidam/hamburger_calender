import { useState } from "react";

const users = [
  { email: "kim@test.com", password: "123", name: "TEST" },
  { email: "lee@test.com", password: "456", name: "Lee" },
  { email: "park@test.com", password: "789", name: "Park" },
];
export const signIn = ({ email, password }) => {
  const user = users.find((user) => {
    // console.log("CHECK", user.email,em)
    return user.email === email && user.password === password;
  });
  if (!user) throw new Error("User not found");
  return user;
};
export const useLogin = () => {
  const [user, setUser] = useState(null);
  const authenticated = user != null;

  const login = ({ email, password }) => setUser(signIn({ email, password }));
  const logout = () => setUser(null);

  return [user, setUser, authenticated, login, logout];
};