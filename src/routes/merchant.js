import MerchantsTable from "../views/MerchantsTable/MerchantsTable";
import CreateMerchant from "../views/CreateMerchant/CreateMerchant";
import EditMerchant from "../views/EditMerchant/EditMerchant";
import MerchantDetails from "../views/MerchantDetails/MerchantDetails";

const merchantRoutes = [
  { path: "/merchants",component: MerchantsTable },
  { path: "/create-merchant",component: CreateMerchant },
  { path: "/edit-merchant/:id",component: EditMerchant },
  { path: "/merchant/:id",component: MerchantDetails },
  { redirect: true, path: "/", to: "/merchants", navbarName: "Redirect" }
];

export default merchantRoutes;
