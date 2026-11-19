import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";
import { getMeAsync } from "../store/slices/authSlice";
import { fetchMyEnrollments } from "../store/slices/enrollmentSlice";

export default function MainLayout() {
    const dispatch = useDispatch();
    const { token, user, loading, isAuthenticated } = useSelector((state) => state.auth);

    // Load the signed-in user once (isAuthenticated starts as true when a token
    // exists, so the old "!isAuthenticated" check meant the user was never loaded).
    useEffect(() => {
        if (token && !user && !loading) {
            dispatch(getMeAsync());
        }
    }, [token, user, loading, dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchMyEnrollments());
        }
    }, [isAuthenticated, dispatch]);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 max-w-6xl mx-auto w-full px-2 sm:px-4 py-2 sm:py-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
