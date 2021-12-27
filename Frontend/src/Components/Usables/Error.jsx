import React from 'react'
import PulseLoader from "react-spinners/PulseLoader"


export const AuthError = () => {
    return (
        <>

        </>
    )
}

export const AuthPending = () => {
    return (<>
        <h5>
            Validating...
        </h5>
        <PulseLoader />
    </>
    )
}
