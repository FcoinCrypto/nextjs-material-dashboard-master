import React, { useEffect } from "react";
import { Router, useRouter } from "next/router";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
// import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";

import SuperAdminroutes from "../routeSuperAdmin"

import styles from "assets/jss/nextjs-material-dashboard/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import { authAtom } from "../recoil/atom/authAtom";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Footer from "../components/Footer/myFooter";

let ps;

export default function SuperAdmin({ children, ...rest }) {
  // used for checking current route
  const router = useRouter();
  // styles
  const useStyles = makeStyles(styles);
  const setAuth = useSetRecoilState(authAtom);
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  const { user, token } = useRecoilValue(authAtom)
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("white");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return router.pathname !== "/superAdmin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  // React.useEffect(() => {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps = new PerfectScrollbar(mainPanel.current, {
  //       suppressScrollX: true,
  //       suppressScrollY: false,
  //     });
  //     document.body.style.overflow = "hidden";
  //   }
  //   window.addEventListener("resize", resizeFunction);
  //   // Specify how to clean up after this effect:
  //   return function cleanup() {
  //     if (navigator.platform.indexOf("Win") > -1) {
  //       ps.destroy();
  //     }
  //     window.removeEventListener("resize", resizeFunction);
  //   };
  // }, [mainPanel]);

  // console.log(token)

  useEffect(() => {
    if (!token || user.access != "SuperAdmin") {
      setAuth({ token: null, user: null });
      router.push('/login/login')
    }
  }, [])

  return (
    <>
    { token &&
      <div className={classes.wrapper}>
        <Sidebar
          routes={SuperAdminroutes}
          image={image}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color={color}
          {...rest}
        />
        <div className={classes.mainPanel} ref={mainPanel}>
          <Navbar
            routes={SuperAdminroutes}
            handleDrawerToggle={handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {getRoute() ? (
            <>
              <div className={classes.content}>
                <div className={classes.container}>{children}</div>
              </div>
              <Footer/>
            </>
          ) : (
            <>
              <div className={classes.map}>{children}</div>
            </> 
          )}  
        </div>
      </div>
    }
    </>
  );
}
