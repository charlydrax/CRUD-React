import React, {useContext} from "react";
import { UserContext } from "../context/userContext";

export default
function Home() {

    const {currentUser} = useContext(UserContext)
    return (
        <div className="container p-5">
            <h1 className="display-3 text-light">{currentUser ? "Welcome buddy":"Hi sign Up or Sign in"}</h1>
        </div>
    )
}