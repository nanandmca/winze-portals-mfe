import React, {useState} from "react";


const Login = () => {
    const [count, setCount] = useState(0);
    const onIncrement = () => setCount(count + 1);
    const onDecrement = () => setCount(count - 1);
    console.log('REACT_APP_LOGIN_FLAG -> ', process.env.REACT_APP_LOGIN_FLAG);
    console.log('REACT_APP_LOGIN_SESSION_INTERVAL -> ', process.env.REACT_APP_LOGIN_SESSION_INTERVAL)
    return (
        <div>
            <h1>Login App SIT</h1>
            <p>Current count: <strong>{count}</strong></p>
            <button onClick={onIncrement}>+</button>
            <button onClick={onDecrement}>-</button>
        </div>
    );
};
export default Login;
