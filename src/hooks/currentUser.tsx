import { useEffect, useState } from "react";
import { User } from "../interfaces/interfaces";
import { api } from "../utils/API";

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState<User>({
    createdAt: undefined,
    email: '',
    id: 0,
    pseudo: null,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      api
        .get("users/me")
        .then((res) => setCurrentUser(res.data))
        .catch((err) => console.log("Error fetching current user: ", err));
    };

    fetchUserId();
  }, [setCurrentUser]);

  return currentUser;
};

export default useCurrentUser;
