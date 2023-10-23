import {Routes, Route} from "react-router-dom";
// import {Register} from "./register/Register";
import {Login} from "./login/Login";

function App() {
    return (
        <Routes>
            <Route path={"/login"} element={<Login/>}/>
        </Routes>
    );
}

export default App;
