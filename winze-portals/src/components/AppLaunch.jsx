import {Link, useNavigate} from "react-router-dom";

import "./../index.css";

const AppLaunch = () => {
    const navigate = useNavigate()
    return (<>
        <nav>
            <ul>
                <li><Link to="/login">Login SIT</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
        </nav>
        <br/>
        <hr color={"green"} size={5}/>
        <br/>
        <button type="button" color="inherit" onClick={() => navigate('/login')}>Login</button>
        <button type="button" color="inherit" onClick={() => navigate('/dashboard')}>Dashboard</button>
    </>)
};
export default AppLaunch;
