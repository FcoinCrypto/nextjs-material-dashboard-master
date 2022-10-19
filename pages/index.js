import React from "react";
import Router from "next/router";
import Login from "./login/login";

export default function Index() {
  // React.useEffect(() => {
  //   Router.push("/login/login");
  // });

  return <Login />;
}
