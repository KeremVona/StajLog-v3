import API from "../../api/api";
import type {
  RegisterPayload,
  AuthResponse,
  LoginPayload,
} from "../../interfaces/AuthInterfaces";

const register = async (userData: RegisterPayload): Promise<AuthResponse> => {
  const response = await API.post("/auth/register", userData);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: LoginPayload): Promise<AuthResponse> => {
  const response = await API.post("/auth/login", userData);
  if (response.data) {
    localStorage.setItem("token", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
