import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Send from "@material-ui/icons/Send";
import Receipt from "@material-ui/icons/Receipt";
import Shop from "@material-ui/icons/Shop";
import Tableau from "@material-ui/icons/Dashboard";
import Money from "@material-ui/icons/AddShoppingCart";


const dashboardRoutes = [
  
  {
    path: "/tableau",
    name: "Tableau de Bord",
    icon: Tableau,

    layout: "/admin",
  },
  {
    path: "/acheter",
    name: "Acheter",
    icon: Shop,

    layout: "/admin",
  },
  {
    path: "/envoyer",
    name: "Envoyer",
    // rtlName: "الرموز",
    icon: Send,

    layout: "/admin",
  },
  {
    path: "/reception",
    name: "Recevoir",
    // rtlName: "قائمة الجدول",
    icon: Receipt,

    layout: "/admin",
  },
  {
    path: "/tableEnvoyer",
    name: "Exchange",
    // rtlName: "قائمة الجدول",
    icon: Money,

    layout: "/admin",
  },
  {
    path: "/table-list",
    name: "Voir mes transactions",
    // rtlName: "طباعة",
    icon: LibraryBooks,

    layout: "/admin",
  }
];

export default dashboardRoutes;
