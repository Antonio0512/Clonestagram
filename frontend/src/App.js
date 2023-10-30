import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Profile } from "./pages/Profile";

import { LOGIN, REGISTER, DASHBOARD, PROFILE } from "./helpers/routes";

import { UserProvider } from "./contexts/userContext";
import { AuthRouteGuard } from "./routeGuards/authRouteGuard";
import { NoAuthRouteGuard } from "./routeGuards/noAuthRouteGuard";

function App() {
    return (
        <BrowserRouter>
            <UserProvider>
                <Suspense fallback={<p>Loading ...</p>}>
                    <Routes>
                        <Route element={<AuthRouteGuard />}>
                            <Route path={DASHBOARD} element={<Dashboard />} />
                            <Route path={PROFILE} element={<Profile />} />
                        </Route>

                        <Route element={<NoAuthRouteGuard />}>
                            <Route path={LOGIN} element={<Login />} />
                            <Route path={REGISTER} element={<Register />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </UserProvider>
        </BrowserRouter>
    );
}

export default App;
