import React from "react";

const Done = (message) => {
    const time = 3000;
    setTimeout(() => {
        message = message + " Done!";
    }
    , time);
    return (
        <div className="z-10 border-2 w-[300px] flex flex-col gap-2 items-center justify-center">
            <h1>{message}</h1>
        </div>
    );
}

export default Done;