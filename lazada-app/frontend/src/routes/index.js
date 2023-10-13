import HomePage from "./../pages/HomePage/index";
import MyOrder from "./../pages/MyOrder/MyOrder";
import SignUpPage from "./../pages/SignUpPage/index";
import SellerSignUpPage from "./../pages/SignUpPage/SellerSignUpPage";
import SignInPage from "./../pages/SingInPage/index";
import SellerSignInPage from "./../pages/SingInPage/SellerSignInPage";
import NotFoundPage from "./../pages/NotFoundPage/NotFoundPage";
import ProductDetailPage from "./../pages/ProductDetail/index";
import TypeProductPage from "./../pages/TypeProduct/TypeProductPage";
import OrderManagement from "./../pages/OrderManagement/index";
import Dashboard from "./../pages/DashboardPage/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Admin from "../pages/Admin";
import TopCategory from "../components/AdminCategory/TopCategory";
import CreateTopCategory from "../components/AdminCategory/CreateTopCategory";
import UpdateTopCategory from "../components/AdminCategory/UpdateTopCategory";
import TopCategoryDetail from "../components/AdminCategory/TopCategoryDetail";
import SubCategoryDetail from "./../components/AdminCategory/SubCategoryDetail";
import SubCategory from "../components/AdminCategory/SubCategory";
import CreateSubCategory from "../components/AdminCategory/CreateSubCategory";
import UpdateSubCategory from "../components/AdminCategory/UpdateSubCategory";
import SellerApproval from "../components/AdminSellerApproval/SellerApproval";
import SellerPage from "./../SellerPage";
import UnverifiedAccount from "../pages/SingInPage/UnverifiedAccount";
import UnauthorizedAccount from "../pages/SingInPage/UnauthorizedAccount";
import SearchingProduct from "../components/CardTypeProduct/SearchingProducts.jsx"

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/my-order",
    page: MyOrder,
    isShowHeader: true,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/product-detail/:id",
    page: ProductDetailPage,
    isShowHeader: true,
  },
  {
    path: "/type",
    page: TypeProductPage,
    isShowHeader: true,
  },
  {
    path: '/searching-products/:query',
    page: SearchingProduct,
    isShowHeader: true
  },
  {
    path: '/track-order',
    page: OrderManagement,
    isShowHeader: true,
  },
  {
    path: "/dashboard/user",
    page: PrivateRoute, // Use PrivateRoute as middleware
    nestedRoutes: [
      {
        path: "",
        page: Dashboard,
      },
    ],
    isShowHeader: true,
  },
  {
    path: "/dashboard/user/orders",
    page: OrderManagement,
    isShowHeader: true,
  },
  {
    path: "/seller",
    page: SellerPage,
  },
  {
    path: "/seller/sign-up",
    page: SellerSignUpPage,
    isShowHeader: false,
  },
  {
    path: "/seller/sign-in",
    page: SellerSignInPage,
    isShowHeader: false,
  },
  {
    path: "/seller/unverified",
    page: UnverifiedAccount,
    isShowHeader: false,
  },
  {
    path: "/seller/404",
    page: UnauthorizedAccount,
    isShowHeader: false,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];

export default routes;
