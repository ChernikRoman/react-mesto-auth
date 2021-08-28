import React from "react";
import { Route, Redirect } from "react-router-dom";
import Main from "./Main";

const ProtectedRoute = ({ ...props }) => {
    React.useEffect(()=>{
        console.log({...props})
        console.log(props.cards)
    })

    return (
        <Route>
            { () => 
                props.loggedIn && <Main {...props} />
            }
        </Route>
    )
}

export default ProtectedRoute

// // ProtectedRoute.js

// import React from "react";
// import { Route, Redirect } from "react-router-dom";

// // этот компонент принимает другой компонент в качестве пропса
// // он также может взять неограниченное число пропсов и передать их новому компоненту
// const ProtectedRoute = ({ component: Component, ...props }) => {
//   return (
//     <Route>
//       {() =>
//         props.loggedIn ? <Component {...props} /> : <Redirect to="./login" />
//       }
//     </Route>
//   );
// };

// export default ProtectedRoute; 