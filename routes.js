/*!

=========================================================
* * NextJS Material Dashboard v1.1.0 based on Material Dashboard React v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nextjs-material-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/nextjs-material-dashboard/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Send from "@material-ui/icons/Send";
import Receipt from "@material-ui/icons/Receipt";
import Shop from "@material-ui/icons/Shop";
import Tableau from "@material-ui/icons/Dashboard";


const dashboardRoutes = [
  
  {
    path: "/tableau",
    name: "Tableau de Bord",
    // rtlName: "ملف تعريفي للمستخدم",
    icon: Tableau,

    layout: "/admin",
  },
  {
    path: "/acheter",
    name: "Acheter",
    // rtlName: "ملف تعريفي للمستخدم",
    icon: Shop,

    layout: "/admin",
  },
  
  {
    path: "/icons",
    name: "Envoyer",
    rtlName: "الرموز",
    icon: Send,

    layout: "/admin",
  },
  {
    path: "/typography",
    name: "Recevoir",
    rtlName: "قائمة الجدول",
    icon: Receipt,

    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Voir mes transactions",
    rtlName: "طباعة",
    icon: LibraryBooks,

    layout: "/admin",
  }
];

export default dashboardRoutes;
