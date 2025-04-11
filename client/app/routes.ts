import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout('./routes/layout.tsx', [
    index('routes/home.tsx'),
    route('login', './routes/login.tsx'),
    route('logout', './routes/logout.tsx'),

    /* Loader Routes
        // category Loader*/
    route('loaders/primeCategories', './loaders/category/getPrimaries.tsx'),
    route('loaders/allCategories', './loaders/category/getAll.tsx'),
    /* // Sales Loaders  */
    route('loaders/allSales', './loaders/sales/allSales.tsx'),

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
      route('deleteProduct/:id', './routes/admin/products/DeleteProduct.tsx')
    ]),
  ]),
] satisfies RouteConfig
