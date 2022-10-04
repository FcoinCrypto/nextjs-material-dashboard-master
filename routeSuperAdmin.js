import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Send from "@material-ui/icons/Send";
import Receipt from "@material-ui/icons/Receipt";
import Shop from "@material-ui/icons/Shop";
import Tableau from "@material-ui/icons/Dashboard";
import Money from "@material-ui/icons/AddShoppingCart";


const dashboardRoutes = [
  
    {
    path: "/dashboard",
    name: "Voir toutes les transactions",
    // rtlName: "طباعة",
    icon: LibraryBooks,

    layout: "/superAdmin",
  }
];

export default dashboardRoutes;
