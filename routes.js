import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Send from "@material-ui/icons/Send";
import Receipt from "@material-ui/icons/Receipt";
import Shop from "@material-ui/icons/Shop";
import Tableau from "@material-ui/icons/Dashboard";
import Money from "@material-ui/icons/AddShoppingCart";


const dashboardRoutes = [
  
  {
    path: "/tableau",
    name: "Acceuil",
    icon: Tableau,

    layout: "/admin",
  },
  {
    path: "/acheter",
    name: "Recharger Compte",
    icon: Shop,

    layout: "/admin",
  },
  {
    path: "/envoyer",
    name: "Transferer de l'Argent",
    icon: Send,

    layout: "/admin",
  },
  {
    path: "/reception",
    name: "Payer une commande",
    icon: Receipt,

    layout: "/admin",
  },
  {
    path: "/exchange",
    name: "Exchange",
    icon: Money,

    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Toutes les Transactions",
    // rtlName: "طباعة",
    icon: LibraryBooks,

    layout: "/admin",
  }
  
];

export default dashboardRoutes;
