import {
    Route,
    Redirect,
} from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
    return (
        <Route
            {...rest}
            render={() =>
                localStorage.getItem("authToken") ? (
                    children
                ) : (
                        <Redirect to="/login" />
                    )
            }
        />
    );
};

export default PrivateRoute;