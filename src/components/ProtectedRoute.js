import React from "react";
import { Route } from "react-router-dom";
import Main from "./Main";

const ProtectedRoute = ({ ...props }) => {

    return (
        <Route>
            { () => 
                props.loggedIn && <Main {...props} />
            }
        </Route>
    )
}

export default ProtectedRoute
