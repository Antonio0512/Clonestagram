import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";

import { LOGIN, REGISTER, DASHBOARD } from "./helpers/routes";

import { UserProvider } from "./contexts/userContext";

function App() {
    return (
        <UserProvider>
            <BrowserRouter>
                <Suspense fallback={<p>Loading ...</p>}>
                    <Routes>
                        <Route path={DASHBOARD} element={<Dashboard />} />
                        <Route path={LOGIN} element={<Login />} />
                        <Route path={REGISTER} element={<Register />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </UserProvider>
    );
}

export default App;
