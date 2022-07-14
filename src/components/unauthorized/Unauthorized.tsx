import React from "react";
import { clientUrl } from "../../constants/client"

export default function Unauthorized(): JSX.Element {

    const forewarder = (url: string): void => {
        window.location.href = clientUrl + url;
    }

    return (
        <div>
            <h1>Unauthorized</h1>
            <p>Watch if you have the correct role!</p>
            <button onClick={() => forewarder("/login")}>Login</button>
            <button onClick={() => forewarder("/")}>Main Page</button>
        </div>
    );
}