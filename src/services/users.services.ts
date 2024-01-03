import { UserOverview } from "../interfaces/interfaces";
import { api } from "../utils/API";

const UsersService = {
  getUserList: async () => api.get<UserOverview[]>("users/allUsersDetails"),
} as const;
export default UsersService;
