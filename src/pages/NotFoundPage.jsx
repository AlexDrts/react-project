import { Link } from "react-router-dom";
import EmptyState from "../components/ui/EmptyState";

export default function NotFoundPage() {
  return (
    <EmptyState icon="🌒" title="This page doesn't exist" text="The link may be old, or the address has a typo.">
      <Link to="/" className="btn btn-primary">
        Back to the shop
      </Link>
    </EmptyState>
  );
}
