import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import { fetchUsers, registerUser } from "../../api/shopApi";
import { logout, setUser } from "../../store/userSlice";
import ErrorMessage from "../ui/ErrorMessage";
import Loader from "../ui/Loader";
import UserList from "./UserList";
import UserRegisterForm from "./UserRegisterForm";

export default function AdminUsers() {
  const { dispatch: adminDispatch } = useOutletContext();
  const queryClient = useQueryClient();
  const reduxDispatch = useDispatch();
  const current = useSelector((state) => state.user.current);
  const users = useQuery({ queryKey: ["users"], queryFn: ({ signal }) => fetchUsers(signal) });
  const registerMutation = useMutation({ mutationFn: registerUser });

  const handleRegister = async (data) => {
    try {
      const created = await registerMutation.mutateAsync(data);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      reduxDispatch(setUser(created)); // the new user becomes the signed-in user (Redux)
      adminDispatch({ type: "notify", text: `Registered ${created.name} and signed in.` });
      return true;
    } catch (error) {
      adminDispatch({ type: "notify", noticeType: "error", text: error.message });
      return false;
    }
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[22rem_minmax(0,1fr)]">
      <UserRegisterForm onRegister={handleRegister} />

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">Users</h3>
          {current && (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => reduxDispatch(logout())}>
              Sign out {current.name}
            </button>
          )}
        </div>

        {users.isPending && <Loader label="Loading users..." />}
        {users.isError && <ErrorMessage title="Can't load users" error={users.error} onRetry={users.refetch} />}
        {users.data && <UserList users={users.data} currentId={current?.id} onUse={(user) => reduxDispatch(setUser(user))} />}
      </div>
    </div>
  );
}
