import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Send from "@material-ui/icons/Send";
import Receipt from "@material-ui/icons/Receipt";
import Shop from "@material-ui/icons/Shop";
import Tableau from "@material-ui/icons/Dashboard";
import Money from "@material-ui/icons/AddShoppingCart";
import AccountCircle from "@material-ui/icons/AccountCircle";


const dashboardRoutes = [
    {
        path: "/users",
        name: "Toutes les utilisateurs",
        // rtlName: "طباعة",
        icon: AccountCircle,

        layout: "/superAdmin",
    },
    {
        path: "/achats",
        name: "Toutes les achats",
        // rtlName: "طباعة",
        icon: Shop,

        layout: "/superAdmin",
    },
    {
        path: "/envoyers",
        name: "Toutes les envoies",
        // rtlName: "طباعة",
        icon: Send,

        layout: "/superAdmin",
    },
    {
        path: "/recevoirs",
        name: "Toutes les reçues",
        // rtlName: "طباعة",
        icon: Receipt,

        layout: "/superAdmin",
    },
   
    {
        path: "/dashboard",
        name: "Voir toutes les transactions",
        // rtlName: "طباعة",
        icon: LibraryBooks,

        layout: "/superAdmin",
    },
    
];

export default dashboardRoutes;