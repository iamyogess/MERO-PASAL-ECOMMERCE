import React, { useEffect, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({ path = "login" }) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((previousValue) => --previousValue);
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        });
        return () => clearInterval(interval);
    }, [count, navigate, location, path]);
    return (
        <>
            <div className="d-flex justify-content-center align-items-center">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default Spinner;
