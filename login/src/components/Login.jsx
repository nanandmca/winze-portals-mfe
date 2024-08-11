import React, {useState} from "react";


const Login = () => {
    const [count, setCount] = useState(0);
    const onIncrement = () => setCount(count + 1);
    const onDecrement = () => setCount(count - 1);
    return (
        <div>
            <h1>Login App</h1>
            <p>Current count: <strong>{count}</strong></p>
            <button onClick={onIncrement}>+</button>
            <button onClick={onDecrement}>-</button>
        </div>
    );
};
export default Login;
