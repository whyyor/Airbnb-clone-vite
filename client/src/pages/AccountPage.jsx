import { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import axios from "axios";
import AccountNav from "../AccountNav";

export default function AccountPage() {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  //this helps us log the subpage on which we are on
  //this is provided to us by react
  if (subpage === undefined) {
    subpage = "profile";
    //if we are not on subpage then subpage will be undefined
  }

  async function logout() {
    await axios.post("/logout");
    setRedirect("/");
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    ///we use ready because getting user takes some milliseconds
    //because of that we even if user exist person is redirected to
    //login page so we use ready until user is found in context
    return <Navigate to={"/login"} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name}({user.email})
          <button onClick={logout} className="primary max-w-sm mt-6">
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
