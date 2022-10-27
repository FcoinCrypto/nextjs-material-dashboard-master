import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Send from "@material-ui/icons/Send";
import Receipt from "@material-ui/icons/Receipt";
import Shop from "@material-ui/icons/Shop";
import Tableau from "@material-ui/icons/Dashboard";
import Settings from "@material-ui/icons/Settings";
import AccountCircle from "@material-ui/icons/AccountCircle";


const dashboardRoutes = [
    {
        path: "/tableau",
        name: "Tableau de Bord",
        icon: Tableau,

        layout: "/marchand",
    },
    {
        path: "/users",
        name: "Utilisateurs",
        // rtlName: "طباعة",
        icon: AccountCircle,

        layout: "/marchand",
    },
    {
        path: "/achat",
        name: "Recharger comptes",
        // rtlName: "طباعة",
        icon: Shop,

        layout: "/marchand",
    },
   
    
];

export default dashboardRoutes;
