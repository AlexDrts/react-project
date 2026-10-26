import { useDispatch } from "react-redux";
import { useOutletContext } from "react-router-dom";
import DetailList from "../components/products/DetailList";
import { logout } from "../store/userSlice";

export default function ProfileInfoPage() {
  const { user } = useOutletContext();
  const dispatch = useDispatch();

  const details = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
  ];

  return (
    <div className="panel max-w-md p-6">
      <DetailList details={details} />
      <button type="button" className="btn btn-ghost mt-5" onClick={() => dispatch(logout())}>
        Sign out
      </button>
    </div>
  );
}
