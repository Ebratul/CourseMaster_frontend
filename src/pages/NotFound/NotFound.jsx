import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-4 px-4">
            <p className="text-6xl sm:text-7xl font-black gradient-text">404</p>
            <h1 className="text-xl sm:text-2xl font-bold">Page not found</h1>
            <p className="text-base-content/70 max-w-md">
                The page you are looking for doesn&apos;t exist or has been moved.
            </p>
            <div className="flex gap-3">
                <Link to="/" className="btn btn-primary">Go Home</Link>
                <Link to="/courses" className="btn btn-outline">Browse Courses</Link>
            </div>
        </div>
    );
}
