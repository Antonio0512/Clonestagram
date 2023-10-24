import {Routes, Route} from "react-router-dom";
import {Register} from "./register/Register";
import {Login} from "./login/Login";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    );
}

export default App;
