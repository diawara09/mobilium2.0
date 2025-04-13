import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('./routes/layout.tsx', [
    //The main Page with the layout
    index('routes/home.tsx'),
    // Auth routes
    route('login', './routes/login.tsx'),
    route('logout', './routes/logout.tsx'),

    // Product
    route("products", "./routes/products.tsx"),
    
    //cart
    route("cart", "./routes/cart.tsx"),
    route("addToCart", "./routes/addToCart.tsx"),

    /* Loader Routes
        // category Loader*/
    route('loaders/primeCategories', './loaders/category/getPrimaries.tsx'),
    route('loaders/allCategories', './loaders/category/getAll.tsx'),
    /* // Sales Loaders  */
    route('loaders/allSales', './loaders/sales/allSales.tsx'),

    /* // product loaders    */
    route("/loaders/allProducts", "./loaders/product/allProducts.tsx"),

    /* // user cart loader */
    route("loaders/userCart", "./loaders/cart/userCart.tsx"),

    route('admin', './routes/admin/AdminRoot.tsx', [
      // Category CRUD routes
      route('createCategory', './routes/admin/categories/CreateCategory.tsx'),
      route('allCategories', './routes/admin/categories/AllCategories.tsx'),
      route('editCategory/:id', './routes/admin/categories/EditCategory.tsx'),
      route(
        'deleteCategory/:id',
        './routes/admin/categories/DeleteCategory.tsx'
      ),
      // Product CRUD routes
      route('createProduct', './routes/admin/products/CreateProduct.tsx'),
      route('allProducts', './routes/admin/products/AllProducts.tsx'),
      route('editProduct/:id', './routes/admin/products/EditProduct.tsx'),
      route('deleteProduct/:id', './routes/admin/products/DeleteProduct.tsx'),
      // Sales CRUD Routes
      route("createSale", "./routes/admin/sales/CreateSale.tsx"),
      route("allSales", "./routes/admin/sales/AllSales.tsx"),
      route('editSale/:id', "./routes/admin/sales/EditSale.tsx"),
      route('deleteSale/:id', "./routes/admin/sales/deleteSale.tsx"),
    ]),
  ]),
] satisfies RouteConfig
