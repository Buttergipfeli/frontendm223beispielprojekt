import React from "react";
import { clientUrl } from "../../constants/client"

export default function Unauthorized(): JSX.Element {

    const forewarder = (): void => {
        window.location.href = clientUrl + "/login";
    }
    return (
        <div>
            <h1>Unauthorized</h1>
            <p>Watch if you have the correct role!</p>
            <button onClick={() => forewarder()}>Login</button>
        </div>
    );
}