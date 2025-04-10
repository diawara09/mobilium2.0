import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout('./routes/layout.tsx', [index('routes/home.tsx'),
        route("login", "./routes/login.tsx"),
      route("logout", "./routes/logout.tsx"),
        
      /* Loader Routes
        // category Loader*/
      route("loaders/primeCategories", "./loaders/category/getPrimaries.tsx"),
      route("loaders/allCategories", "./loaders/category/getAll.tsx"),
      
      route("admin", "./routes/admin/AdminRoot.tsx", [
        route("createCategory", "./routes/admin/categories/CreateCategory.tsx"),
        route("allCategories", "./routes/admin/categories/AllCategories.tsx"),
        route("editCategory/:id", "./routes/admin/categories/EditCategory.tsx"),
        route("deleteCategory/:id", "./routes/admin/categories/DeleteCategory.tsx")
      ])
  ]),
] satisfies RouteConfig
