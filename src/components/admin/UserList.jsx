import UserRow from "./UserRow";

export default function UserList({ users, currentId, onUse }) {
  return (
    <ul className="panel">
      {users.map((user) => (
        <UserRow key={user.id} user={user} isCurrent={user.id === currentId} onUse={onUse} />
      ))}
    </ul>
  );
}
