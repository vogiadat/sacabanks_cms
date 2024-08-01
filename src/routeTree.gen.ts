/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as masterLayoutImport } from './routes/(master)/_layout'
import { Route as masterLayoutSupplierUpdateIdImport } from './routes/(master)/_layout/supplier/update.$id'
import { Route as masterLayoutProductUpdateIdImport } from './routes/(master)/_layout/product/update.$id'
import { Route as masterLayoutProductDetailIdImport } from './routes/(master)/_layout/product/detail.$id'
import { Route as masterLayoutActiveUserUpdateIdImport } from './routes/(master)/_layout/active-user/update.$id'

// Create Virtual Routes

const masterImport = createFileRoute('/(master)')()
const authLoginLazyImport = createFileRoute('/(auth)/login')()
const masterLayoutIndexLazyImport = createFileRoute('/(master)/_layout/')()
const masterLayoutUserIndexLazyImport = createFileRoute(
  '/(master)/_layout/user/',
)()
const masterLayoutSupplierIndexLazyImport = createFileRoute(
  '/(master)/_layout/supplier/',
)()
const masterLayoutProductIndexLazyImport = createFileRoute(
  '/(master)/_layout/product/',
)()
const masterLayoutOrderIndexLazyImport = createFileRoute(
  '/(master)/_layout/order/',
)()
const masterLayoutNotFoundIndexLazyImport = createFileRoute(
  '/(master)/_layout/not-found/',
)()
const masterLayoutCategoryIndexLazyImport = createFileRoute(
  '/(master)/_layout/category/',
)()
const masterLayoutBannerIndexLazyImport = createFileRoute(
  '/(master)/_layout/banner/',
)()
const masterLayoutActiveUserIndexLazyImport = createFileRoute(
  '/(master)/_layout/active-user/',
)()
const masterLayoutSupplierCreateLazyImport = createFileRoute(
  '/(master)/_layout/supplier/create',
)()
const masterLayoutProductCreateLazyImport = createFileRoute(
  '/(master)/_layout/product/create',
)()

// Create/Update Routes

const masterRoute = masterImport.update({
  id: '/(master)',
  getParentRoute: () => rootRoute,
} as any)

const authLoginLazyRoute = authLoginLazyImport
  .update({
    path: '/login',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(auth)/login.lazy').then((d) => d.Route))

const masterLayoutRoute = masterLayoutImport.update({
  id: '/_layout',
  getParentRoute: () => masterRoute,
} as any)

const masterLayoutIndexLazyRoute = masterLayoutIndexLazyImport
  .update({
    path: '/',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/index.lazy').then((d) => d.Route),
  )

const masterLayoutUserIndexLazyRoute = masterLayoutUserIndexLazyImport
  .update({
    path: '/user/',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/user/index.lazy').then((d) => d.Route),
  )

const masterLayoutSupplierIndexLazyRoute = masterLayoutSupplierIndexLazyImport
  .update({
    path: '/supplier/',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/supplier/index.lazy').then(
      (d) => d.Route,
    ),
  )

const masterLayoutProductIndexLazyRoute = masterLayoutProductIndexLazyImport
  .update({
    path: '/product/',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/product/index.lazy').then((d) => d.Route),
  )

const masterLayoutOrderIndexLazyRoute = masterLayoutOrderIndexLazyImport
  .update({
    path: '/order/',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/order/index.lazy').then((d) => d.Route),
  )

const masterLayoutNotFoundIndexLazyRoute = masterLayoutNotFoundIndexLazyImport
  .update({
    path: '/not-found/',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/not-found/index.lazy').then(
      (d) => d.Route,
    ),
  )

const masterLayoutCategoryIndexLazyRoute = masterLayoutCategoryIndexLazyImport
  .update({
    path: '/category/',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/category/index.lazy').then(
      (d) => d.Route,
    ),
  )

const masterLayoutBannerIndexLazyRoute = masterLayoutBannerIndexLazyImport
  .update({
    path: '/banner/',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/banner/index.lazy').then((d) => d.Route),
  )

const masterLayoutActiveUserIndexLazyRoute =
  masterLayoutActiveUserIndexLazyImport
    .update({
      path: '/active-user/',
      getParentRoute: () => masterLayoutRoute,
    } as any)
    .lazy(() =>
      import('./routes/(master)/_layout/active-user/index.lazy').then(
        (d) => d.Route,
      ),
    )

const masterLayoutSupplierCreateLazyRoute = masterLayoutSupplierCreateLazyImport
  .update({
    path: '/supplier/create',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/supplier/create.lazy').then(
      (d) => d.Route,
    ),
  )

const masterLayoutProductCreateLazyRoute = masterLayoutProductCreateLazyImport
  .update({
    path: '/product/create',
    getParentRoute: () => masterLayoutRoute,
  } as any)
  .lazy(() =>
    import('./routes/(master)/_layout/product/create.lazy').then(
      (d) => d.Route,
    ),
  )

const masterLayoutSupplierUpdateIdRoute =
  masterLayoutSupplierUpdateIdImport.update({
    path: '/supplier/update/$id',
    getParentRoute: () => masterLayoutRoute,
  } as any)

const masterLayoutProductUpdateIdRoute =
  masterLayoutProductUpdateIdImport.update({
    path: '/product/update/$id',
    getParentRoute: () => masterLayoutRoute,
  } as any)

const masterLayoutProductDetailIdRoute =
  masterLayoutProductDetailIdImport.update({
    path: '/product/detail/$id',
    getParentRoute: () => masterLayoutRoute,
  } as any)

const masterLayoutActiveUserUpdateIdRoute =
  masterLayoutActiveUserUpdateIdImport.update({
    path: '/active-user/update/$id',
    getParentRoute: () => masterLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/(master)': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof masterImport
      parentRoute: typeof rootRoute
    }
    '/(master)/_layout': {
      id: '/_layout'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof masterLayoutImport
      parentRoute: typeof masterRoute
    }
    '/(auth)/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginLazyImport
      parentRoute: typeof rootRoute
    }
    '/(master)/_layout/': {
      id: '/_layout/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof masterLayoutIndexLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/product/create': {
      id: '/_layout/product/create'
      path: '/product/create'
      fullPath: '/product/create'
      preLoaderRoute: typeof masterLayoutProductCreateLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/supplier/create': {
      id: '/_layout/supplier/create'
      path: '/supplier/create'
      fullPath: '/supplier/create'
      preLoaderRoute: typeof masterLayoutSupplierCreateLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/active-user/': {
      id: '/_layout/active-user/'
      path: '/active-user'
      fullPath: '/active-user'
      preLoaderRoute: typeof masterLayoutActiveUserIndexLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/banner/': {
      id: '/_layout/banner/'
      path: '/banner'
      fullPath: '/banner'
      preLoaderRoute: typeof masterLayoutBannerIndexLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/category/': {
      id: '/_layout/category/'
      path: '/category'
      fullPath: '/category'
      preLoaderRoute: typeof masterLayoutCategoryIndexLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/not-found/': {
      id: '/_layout/not-found/'
      path: '/not-found'
      fullPath: '/not-found'
      preLoaderRoute: typeof masterLayoutNotFoundIndexLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/order/': {
      id: '/_layout/order/'
      path: '/order'
      fullPath: '/order'
      preLoaderRoute: typeof masterLayoutOrderIndexLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/product/': {
      id: '/_layout/product/'
      path: '/product'
      fullPath: '/product'
      preLoaderRoute: typeof masterLayoutProductIndexLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/supplier/': {
      id: '/_layout/supplier/'
      path: '/supplier'
      fullPath: '/supplier'
      preLoaderRoute: typeof masterLayoutSupplierIndexLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/user/': {
      id: '/_layout/user/'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof masterLayoutUserIndexLazyImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/active-user/update/$id': {
      id: '/_layout/active-user/update/$id'
      path: '/active-user/update/$id'
      fullPath: '/active-user/update/$id'
      preLoaderRoute: typeof masterLayoutActiveUserUpdateIdImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/product/detail/$id': {
      id: '/_layout/product/detail/$id'
      path: '/product/detail/$id'
      fullPath: '/product/detail/$id'
      preLoaderRoute: typeof masterLayoutProductDetailIdImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/product/update/$id': {
      id: '/_layout/product/update/$id'
      path: '/product/update/$id'
      fullPath: '/product/update/$id'
      preLoaderRoute: typeof masterLayoutProductUpdateIdImport
      parentRoute: typeof masterLayoutImport
    }
    '/(master)/_layout/supplier/update/$id': {
      id: '/_layout/supplier/update/$id'
      path: '/supplier/update/$id'
      fullPath: '/supplier/update/$id'
      preLoaderRoute: typeof masterLayoutSupplierUpdateIdImport
      parentRoute: typeof masterLayoutImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  masterRoute: masterRoute.addChildren({
    masterLayoutRoute: masterLayoutRoute.addChildren({
      masterLayoutIndexLazyRoute,
      masterLayoutProductCreateLazyRoute,
      masterLayoutSupplierCreateLazyRoute,
      masterLayoutActiveUserIndexLazyRoute,
      masterLayoutBannerIndexLazyRoute,
      masterLayoutCategoryIndexLazyRoute,
      masterLayoutNotFoundIndexLazyRoute,
      masterLayoutOrderIndexLazyRoute,
      masterLayoutProductIndexLazyRoute,
      masterLayoutSupplierIndexLazyRoute,
      masterLayoutUserIndexLazyRoute,
      masterLayoutActiveUserUpdateIdRoute,
      masterLayoutProductDetailIdRoute,
      masterLayoutProductUpdateIdRoute,
      masterLayoutSupplierUpdateIdRoute,
    }),
  }),
  authLoginLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login"
      ]
    },
    "/": {
      "filePath": "(master)",
      "children": [
        "/_layout"
      ]
    },
    "/_layout": {
      "filePath": "(master)/_layout.tsx",
      "parent": "/",
      "children": [
        "/_layout/",
        "/_layout/product/create",
        "/_layout/supplier/create",
        "/_layout/active-user/",
        "/_layout/banner/",
        "/_layout/category/",
        "/_layout/not-found/",
        "/_layout/order/",
        "/_layout/product/",
        "/_layout/supplier/",
        "/_layout/user/",
        "/_layout/active-user/update/$id",
        "/_layout/product/detail/$id",
        "/_layout/product/update/$id",
        "/_layout/supplier/update/$id"
      ]
    },
    "/login": {
      "filePath": "(auth)/login.lazy.tsx"
    },
    "/_layout/": {
      "filePath": "(master)/_layout/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/product/create": {
      "filePath": "(master)/_layout/product/create.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/supplier/create": {
      "filePath": "(master)/_layout/supplier/create.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/active-user/": {
      "filePath": "(master)/_layout/active-user/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/banner/": {
      "filePath": "(master)/_layout/banner/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/category/": {
      "filePath": "(master)/_layout/category/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/not-found/": {
      "filePath": "(master)/_layout/not-found/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/order/": {
      "filePath": "(master)/_layout/order/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/product/": {
      "filePath": "(master)/_layout/product/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/supplier/": {
      "filePath": "(master)/_layout/supplier/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/user/": {
      "filePath": "(master)/_layout/user/index.lazy.tsx",
      "parent": "/_layout"
    },
    "/_layout/active-user/update/$id": {
      "filePath": "(master)/_layout/active-user/update.$id.tsx",
      "parent": "/_layout"
    },
    "/_layout/product/detail/$id": {
      "filePath": "(master)/_layout/product/detail.$id.tsx",
      "parent": "/_layout"
    },
    "/_layout/product/update/$id": {
      "filePath": "(master)/_layout/product/update.$id.tsx",
      "parent": "/_layout"
    },
    "/_layout/supplier/update/$id": {
      "filePath": "(master)/_layout/supplier/update.$id.tsx",
      "parent": "/_layout"
    }
  }
}
ROUTE_MANIFEST_END */
