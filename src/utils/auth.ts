export const login = async (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (
    users[email] === password ||
    (email === "test@demo.com" && password === "123456")
  ) {
    const token = "mock-jwt-token";
    localStorage.setItem("token", token);
    return { token };
  }

  throw new Error("Invalid credentials");
};

export const register = async (email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem("users") || "{}");

  if (users[email]) {
    throw new Error("User already exists");
  }

  users[email] = password;
  localStorage.setItem("users", JSON.stringify(users));

  return login(email, password);
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};
