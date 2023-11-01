import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../helpers/routes";
import { UserContext } from "../contexts/userContext";

export const Register = () => {
    const navigate = useNavigate();
    const { userRegister } = useContext(UserContext);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [error, setError] = useState("");
    const isInvalid = password === "" || email === "";

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            if (password === password2) {
                await userRegister({ username, email, password, password2 });
                navigate("/login");
            } else {
                setError("Passwords do not match");
            }
        } catch (error) {
            setPassword("");
            setPassword2("");

            if (error.response.data.error) {
                setError(error.response.data.error[0]);
            } else {
                const errorMessages = [];

                if (error.response.data.email) {
                    errorMessages.push(error.response.data.email[0]);
                }
                if (error.response.data.username) {
                    errorMessages.push(error.response.data.username[0]);
                }

                const capitalizedErrorMessages = errorMessages.map(
                    (message, index) => {
                        return (
                            <p key={index}>
                                {message.charAt(0).toUpperCase() +
                                    message.slice(1)}
                            </p>
                        );
                    }
                );

                setError(capitalizedErrorMessages);
            }
        }
    };

    useEffect(() => {
        document.title = "Register - Clonestagram";
    }, []);

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img
                    src="/images/iphone-with-profile.jpg"
                    alt="iPhone with Instagram app"
                    className="w-10/12"
                />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img
                            src="/images/logo.png"
                            alt="Instagram"
                            className="mt-2 w-6/12 mb-4"
                        />
                    </h1>

                    {error && (
                        <p className="mb-2 text-xs text-red-primary text-center">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleRegister} method="POST">
                        <input
                            aria-label="Enter your username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setUsername(target.value)}
                            value={username}
                            autoComplete="username"
                        />
                        <input
                            aria-label="Enter your email address"
                            type="text"
                            name="email"
                            placeholder="Email address"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setEmail(target.value)}
                            value={email}
                            autoComplete="email"
                        />
                        <input
                            aria-label="Enter your password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) => setPassword(target.value)}
                            value={password}
                        />
                        <input
                            aria-label="Confirm your password"
                            type="password"
                            name="password2"
                            placeholder="Confirm password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={({ target }) =>
                                setPassword2(target.value)
                            }
                            value={password2}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                ${isInvalid && "opacity-50"}`}
                        >
                            Register
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Already have an account?
                        <Link
                            to={LOGIN}
                            className="font-bold text-blue-medium ml-1"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
