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

        layout: "/superAdmin",
    },
    {
        path: "/users",
        name: "Utilisateurs",
        // rtlName: "طباعة",
        icon: AccountCircle,

        layout: "/superAdmin",
    },
    {
        path: "/achats",
        name: "Recharger comptes",
        // rtlName: "طباعة",
        icon: Shop,

        layout: "/superAdmin",
    },
    {
        path: "/envoyers",
        name: "Transferer de l'argent",
        // rtlName: "طباعة",
        icon: Send,

        layout: "/superAdmin",
    },
    {
        path: "/recevoirs",
        name: "Payer commande",
        // rtlName: "طباعة",
        icon: Receipt,

        layout: "/superAdmin",
    },
   
    {
        path: "/dashboard",
        name: "Toutes les transactions",
        // rtlName: "طباعة",
        icon: LibraryBooks,

        layout: "/superAdmin",
    },
    {
        path: "/parametre",
        name: "Paramètre",
        icon: Settings,

        layout: "/paramètre",
    },
    
];

export default dashboardRoutes;
