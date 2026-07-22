import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-5xl font-bold">404</h1>

      <p className="mt-4">Page not found.</p>

      <Link
        to="/"
        className="mt-6 inline-block bg-blue-600 text-white px-3 py-1 rounded-lg"
      >
        Back to Reservations
      </Link>
    </div>
  );
}
