/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as LoginImport } from './routes/login'
import { Route as AuthImport } from './routes/_auth'
import { Route as SignupIndexImport } from './routes/signup/index'
import { Route as SignupJammerImport } from './routes/signup/jammer'
import { Route as SignupClientImport } from './routes/signup/client'
import { Route as MarkupSiteImport } from './routes/markup/site'
import { Route as MarkupPdfImport } from './routes/markup/pdf'
import { Route as MarkupImageImport } from './routes/markup/image'
import { Route as MarkupDocIdImport } from './routes/markup/$docId'
import { Route as AuthResetPasswordImport } from './routes/_auth/reset-password'
import { Route as AuthOauthCallbackImport } from './routes/_auth/oauth-callback'
import { Route as AuthSimpleLayoutImport } from './routes/_auth/_simple-layout'
import { Route as AuthOnboardingImport } from './routes/_auth/_onboarding'
import { Route as AuthAppLayoutImport } from './routes/_auth/_app-layout'
import { Route as AuthAppLayoutMarkupImport } from './routes/_auth/_app-layout/markup'
import { Route as AuthAppLayoutJammerWalletImport } from './routes/_auth/_app-layout/jammer-wallet'
import { Route as AuthAppLayoutSuperAdminImport } from './routes/_auth/_app-layout/_super-admin'
import { Route as AuthOnboardingOnboardingIndexImport } from './routes/_auth/_onboarding/onboarding/index'
import { Route as AuthAppLayoutDashboardIndexImport } from './routes/_auth/_app-layout/dashboard/index'
import { Route as AuthAppLayoutdashboardIndexImport } from './routes/_auth/_app-layout/(dashboard)/index'
import { Route as AuthSimpleLayoutProjectCreateImport } from './routes/_auth/_simple-layout/project/create'
import { Route as AuthOnboardingOnboardingJammerImport } from './routes/_auth/_onboarding/onboarding/jammer'
import { Route as AuthAppLayoutSuperAdminWithdrawalRequestsImport } from './routes/_auth/_app-layout/_super-admin/withdrawal-requests'
import { Route as AuthAppLayoutSuperAdminPaymentTransactionsImport } from './routes/_auth/_app-layout/_super-admin/payment-transactions'
import { Route as AuthSimpleLayoutProjectidUpsellPaymentCompleteImport } from './routes/_auth/_simple-layout/project/[id]/upsell-payment-complete'
import { Route as AuthSimpleLayoutProjectidUpsellConfirmImport } from './routes/_auth/_simple-layout/project/[id]/upsell-confirm'
import { Route as AuthSimpleLayoutProjectidJammerSelectionImport } from './routes/_auth/_simple-layout/project/[id]/jammer-selection'
import { Route as AuthSimpleLayoutProjectidEditImport } from './routes/_auth/_simple-layout/project/[id]/edit'
import { Route as AuthSimpleLayoutProjectDraftIdEditImport } from './routes/_auth/_simple-layout/project/draft/$id/edit'
import { Route as AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdImport } from './routes/_auth/_simple-layout/project/[id]/upsell-checkout/$checkoutId'
import { Route as AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdImport } from './routes/_auth/_simple-layout/project/[id]/brief-checkout/$checkoutId'

// Create/Update Routes

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const SignupIndexRoute = SignupIndexImport.update({
  id: '/signup/',
  path: '/signup/',
  getParentRoute: () => rootRoute,
} as any)

const SignupJammerRoute = SignupJammerImport.update({
  id: '/signup/jammer',
  path: '/signup/jammer',
  getParentRoute: () => rootRoute,
} as any)

const SignupClientRoute = SignupClientImport.update({
  id: '/signup/client',
  path: '/signup/client',
  getParentRoute: () => rootRoute,
} as any)

const MarkupSiteRoute = MarkupSiteImport.update({
  id: '/markup/site',
  path: '/markup/site',
  getParentRoute: () => rootRoute,
} as any)

const MarkupPdfRoute = MarkupPdfImport.update({
  id: '/markup/pdf',
  path: '/markup/pdf',
  getParentRoute: () => rootRoute,
} as any)

const MarkupImageRoute = MarkupImageImport.update({
  id: '/markup/image',
  path: '/markup/image',
  getParentRoute: () => rootRoute,
} as any)

const MarkupDocIdRoute = MarkupDocIdImport.update({
  id: '/markup/$docId',
  path: '/markup/$docId',
  getParentRoute: () => rootRoute,
} as any)

const AuthResetPasswordRoute = AuthResetPasswordImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => AuthRoute,
} as any)

const AuthOauthCallbackRoute = AuthOauthCallbackImport.update({
  id: '/oauth-callback',
  path: '/oauth-callback',
  getParentRoute: () => AuthRoute,
} as any)

const AuthSimpleLayoutRoute = AuthSimpleLayoutImport.update({
  id: '/_simple-layout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthOnboardingRoute = AuthOnboardingImport.update({
  id: '/_onboarding',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAppLayoutRoute = AuthAppLayoutImport.update({
  id: '/_app-layout',
  getParentRoute: () => AuthRoute,
} as any)

const AuthAppLayoutMarkupRoute = AuthAppLayoutMarkupImport.update({
  id: '/markup',
  path: '/markup',
  getParentRoute: () => AuthAppLayoutRoute,
} as any)

const AuthAppLayoutJammerWalletRoute = AuthAppLayoutJammerWalletImport.update({
  id: '/jammer-wallet',
  path: '/jammer-wallet',
  getParentRoute: () => AuthAppLayoutRoute,
} as any)

const AuthAppLayoutSuperAdminRoute = AuthAppLayoutSuperAdminImport.update({
  id: '/_super-admin',
  getParentRoute: () => AuthAppLayoutRoute,
} as any)

const AuthOnboardingOnboardingIndexRoute =
  AuthOnboardingOnboardingIndexImport.update({
    id: '/onboarding/',
    path: '/onboarding/',
    getParentRoute: () => AuthOnboardingRoute,
  } as any)

const AuthAppLayoutDashboardIndexRoute =
  AuthAppLayoutDashboardIndexImport.update({
    id: '/dashboard/',
    path: '/dashboard/',
    getParentRoute: () => AuthAppLayoutRoute,
  } as any)

const AuthAppLayoutdashboardIndexRoute =
  AuthAppLayoutdashboardIndexImport.update({
    id: '/(dashboard)/',
    path: '/',
    getParentRoute: () => AuthAppLayoutRoute,
  } as any)

const AuthSimpleLayoutProjectCreateRoute =
  AuthSimpleLayoutProjectCreateImport.update({
    id: '/project/create',
    path: '/project/create',
    getParentRoute: () => AuthSimpleLayoutRoute,
  } as any)

const AuthOnboardingOnboardingJammerRoute =
  AuthOnboardingOnboardingJammerImport.update({
    id: '/onboarding/jammer',
    path: '/onboarding/jammer',
    getParentRoute: () => AuthOnboardingRoute,
  } as any)

const AuthAppLayoutSuperAdminWithdrawalRequestsRoute =
  AuthAppLayoutSuperAdminWithdrawalRequestsImport.update({
    id: '/withdrawal-requests',
    path: '/withdrawal-requests',
    getParentRoute: () => AuthAppLayoutSuperAdminRoute,
  } as any)

const AuthAppLayoutSuperAdminPaymentTransactionsRoute =
  AuthAppLayoutSuperAdminPaymentTransactionsImport.update({
    id: '/payment-transactions',
    path: '/payment-transactions',
    getParentRoute: () => AuthAppLayoutSuperAdminRoute,
  } as any)

const AuthSimpleLayoutProjectidUpsellPaymentCompleteRoute =
  AuthSimpleLayoutProjectidUpsellPaymentCompleteImport.update({
    id: '/project/[id]/upsell-payment-complete',
    path: '/project/[id]/upsell-payment-complete',
    getParentRoute: () => AuthSimpleLayoutRoute,
  } as any)

const AuthSimpleLayoutProjectidUpsellConfirmRoute =
  AuthSimpleLayoutProjectidUpsellConfirmImport.update({
    id: '/project/[id]/upsell-confirm',
    path: '/project/[id]/upsell-confirm',
    getParentRoute: () => AuthSimpleLayoutRoute,
  } as any)

const AuthSimpleLayoutProjectidJammerSelectionRoute =
  AuthSimpleLayoutProjectidJammerSelectionImport.update({
    id: '/project/[id]/jammer-selection',
    path: '/project/[id]/jammer-selection',
    getParentRoute: () => AuthSimpleLayoutRoute,
  } as any)

const AuthSimpleLayoutProjectidEditRoute =
  AuthSimpleLayoutProjectidEditImport.update({
    id: '/project/[id]/edit',
    path: '/project/[id]/edit',
    getParentRoute: () => AuthSimpleLayoutRoute,
  } as any)

const AuthSimpleLayoutProjectDraftIdEditRoute =
  AuthSimpleLayoutProjectDraftIdEditImport.update({
    id: '/project/draft/$id/edit',
    path: '/project/draft/$id/edit',
    getParentRoute: () => AuthSimpleLayoutRoute,
  } as any)

const AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdRoute =
  AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdImport.update({
    id: '/project/[id]/upsell-checkout/$checkoutId',
    path: '/project/[id]/upsell-checkout/$checkoutId',
    getParentRoute: () => AuthSimpleLayoutRoute,
  } as any)

const AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdRoute =
  AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdImport.update({
    id: '/project/[id]/brief-checkout/$checkoutId',
    path: '/project/[id]/brief-checkout/$checkoutId',
    getParentRoute: () => AuthSimpleLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_app-layout': {
      id: '/_auth/_app-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthAppLayoutImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_onboarding': {
      id: '/_auth/_onboarding'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthOnboardingImport
      parentRoute: typeof AuthImport
    }
    '/_auth/_simple-layout': {
      id: '/_auth/_simple-layout'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthSimpleLayoutImport
      parentRoute: typeof AuthImport
    }
    '/_auth/oauth-callback': {
      id: '/_auth/oauth-callback'
      path: '/oauth-callback'
      fullPath: '/oauth-callback'
      preLoaderRoute: typeof AuthOauthCallbackImport
      parentRoute: typeof AuthImport
    }
    '/_auth/reset-password': {
      id: '/_auth/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof AuthResetPasswordImport
      parentRoute: typeof AuthImport
    }
    '/markup/$docId': {
      id: '/markup/$docId'
      path: '/markup/$docId'
      fullPath: '/markup/$docId'
      preLoaderRoute: typeof MarkupDocIdImport
      parentRoute: typeof rootRoute
    }
    '/markup/image': {
      id: '/markup/image'
      path: '/markup/image'
      fullPath: '/markup/image'
      preLoaderRoute: typeof MarkupImageImport
      parentRoute: typeof rootRoute
    }
    '/markup/pdf': {
      id: '/markup/pdf'
      path: '/markup/pdf'
      fullPath: '/markup/pdf'
      preLoaderRoute: typeof MarkupPdfImport
      parentRoute: typeof rootRoute
    }
    '/markup/site': {
      id: '/markup/site'
      path: '/markup/site'
      fullPath: '/markup/site'
      preLoaderRoute: typeof MarkupSiteImport
      parentRoute: typeof rootRoute
    }
    '/signup/client': {
      id: '/signup/client'
      path: '/signup/client'
      fullPath: '/signup/client'
      preLoaderRoute: typeof SignupClientImport
      parentRoute: typeof rootRoute
    }
    '/signup/jammer': {
      id: '/signup/jammer'
      path: '/signup/jammer'
      fullPath: '/signup/jammer'
      preLoaderRoute: typeof SignupJammerImport
      parentRoute: typeof rootRoute
    }
    '/signup/': {
      id: '/signup/'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof SignupIndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth/_app-layout/_super-admin': {
      id: '/_auth/_app-layout/_super-admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthAppLayoutSuperAdminImport
      parentRoute: typeof AuthAppLayoutImport
    }
    '/_auth/_app-layout/jammer-wallet': {
      id: '/_auth/_app-layout/jammer-wallet'
      path: '/jammer-wallet'
      fullPath: '/jammer-wallet'
      preLoaderRoute: typeof AuthAppLayoutJammerWalletImport
      parentRoute: typeof AuthAppLayoutImport
    }
    '/_auth/_app-layout/markup': {
      id: '/_auth/_app-layout/markup'
      path: '/markup'
      fullPath: '/markup'
      preLoaderRoute: typeof AuthAppLayoutMarkupImport
      parentRoute: typeof AuthAppLayoutImport
    }
    '/_auth/_app-layout/_super-admin/payment-transactions': {
      id: '/_auth/_app-layout/_super-admin/payment-transactions'
      path: '/payment-transactions'
      fullPath: '/payment-transactions'
      preLoaderRoute: typeof AuthAppLayoutSuperAdminPaymentTransactionsImport
      parentRoute: typeof AuthAppLayoutSuperAdminImport
    }
    '/_auth/_app-layout/_super-admin/withdrawal-requests': {
      id: '/_auth/_app-layout/_super-admin/withdrawal-requests'
      path: '/withdrawal-requests'
      fullPath: '/withdrawal-requests'
      preLoaderRoute: typeof AuthAppLayoutSuperAdminWithdrawalRequestsImport
      parentRoute: typeof AuthAppLayoutSuperAdminImport
    }
    '/_auth/_onboarding/onboarding/jammer': {
      id: '/_auth/_onboarding/onboarding/jammer'
      path: '/onboarding/jammer'
      fullPath: '/onboarding/jammer'
      preLoaderRoute: typeof AuthOnboardingOnboardingJammerImport
      parentRoute: typeof AuthOnboardingImport
    }
    '/_auth/_simple-layout/project/create': {
      id: '/_auth/_simple-layout/project/create'
      path: '/project/create'
      fullPath: '/project/create'
      preLoaderRoute: typeof AuthSimpleLayoutProjectCreateImport
      parentRoute: typeof AuthSimpleLayoutImport
    }
    '/_auth/_app-layout/(dashboard)/': {
      id: '/_auth/_app-layout/(dashboard)/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthAppLayoutdashboardIndexImport
      parentRoute: typeof AuthAppLayoutImport
    }
    '/_auth/_app-layout/dashboard/': {
      id: '/_auth/_app-layout/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof AuthAppLayoutDashboardIndexImport
      parentRoute: typeof AuthAppLayoutImport
    }
    '/_auth/_onboarding/onboarding/': {
      id: '/_auth/_onboarding/onboarding/'
      path: '/onboarding'
      fullPath: '/onboarding'
      preLoaderRoute: typeof AuthOnboardingOnboardingIndexImport
      parentRoute: typeof AuthOnboardingImport
    }
    '/_auth/_simple-layout/project/[id]/edit': {
      id: '/_auth/_simple-layout/project/[id]/edit'
      path: '/project/[id]/edit'
      fullPath: '/project/[id]/edit'
      preLoaderRoute: typeof AuthSimpleLayoutProjectidEditImport
      parentRoute: typeof AuthSimpleLayoutImport
    }
    '/_auth/_simple-layout/project/[id]/jammer-selection': {
      id: '/_auth/_simple-layout/project/[id]/jammer-selection'
      path: '/project/[id]/jammer-selection'
      fullPath: '/project/[id]/jammer-selection'
      preLoaderRoute: typeof AuthSimpleLayoutProjectidJammerSelectionImport
      parentRoute: typeof AuthSimpleLayoutImport
    }
    '/_auth/_simple-layout/project/[id]/upsell-confirm': {
      id: '/_auth/_simple-layout/project/[id]/upsell-confirm'
      path: '/project/[id]/upsell-confirm'
      fullPath: '/project/[id]/upsell-confirm'
      preLoaderRoute: typeof AuthSimpleLayoutProjectidUpsellConfirmImport
      parentRoute: typeof AuthSimpleLayoutImport
    }
    '/_auth/_simple-layout/project/[id]/upsell-payment-complete': {
      id: '/_auth/_simple-layout/project/[id]/upsell-payment-complete'
      path: '/project/[id]/upsell-payment-complete'
      fullPath: '/project/[id]/upsell-payment-complete'
      preLoaderRoute: typeof AuthSimpleLayoutProjectidUpsellPaymentCompleteImport
      parentRoute: typeof AuthSimpleLayoutImport
    }
    '/_auth/_simple-layout/project/[id]/brief-checkout/$checkoutId': {
      id: '/_auth/_simple-layout/project/[id]/brief-checkout/$checkoutId'
      path: '/project/[id]/brief-checkout/$checkoutId'
      fullPath: '/project/[id]/brief-checkout/$checkoutId'
      preLoaderRoute: typeof AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdImport
      parentRoute: typeof AuthSimpleLayoutImport
    }
    '/_auth/_simple-layout/project/[id]/upsell-checkout/$checkoutId': {
      id: '/_auth/_simple-layout/project/[id]/upsell-checkout/$checkoutId'
      path: '/project/[id]/upsell-checkout/$checkoutId'
      fullPath: '/project/[id]/upsell-checkout/$checkoutId'
      preLoaderRoute: typeof AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdImport
      parentRoute: typeof AuthSimpleLayoutImport
    }
    '/_auth/_simple-layout/project/draft/$id/edit': {
      id: '/_auth/_simple-layout/project/draft/$id/edit'
      path: '/project/draft/$id/edit'
      fullPath: '/project/draft/$id/edit'
      preLoaderRoute: typeof AuthSimpleLayoutProjectDraftIdEditImport
      parentRoute: typeof AuthSimpleLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthAppLayoutSuperAdminRouteChildren {
  AuthAppLayoutSuperAdminPaymentTransactionsRoute: typeof AuthAppLayoutSuperAdminPaymentTransactionsRoute
  AuthAppLayoutSuperAdminWithdrawalRequestsRoute: typeof AuthAppLayoutSuperAdminWithdrawalRequestsRoute
}

const AuthAppLayoutSuperAdminRouteChildren: AuthAppLayoutSuperAdminRouteChildren =
  {
    AuthAppLayoutSuperAdminPaymentTransactionsRoute:
      AuthAppLayoutSuperAdminPaymentTransactionsRoute,
    AuthAppLayoutSuperAdminWithdrawalRequestsRoute:
      AuthAppLayoutSuperAdminWithdrawalRequestsRoute,
  }

const AuthAppLayoutSuperAdminRouteWithChildren =
  AuthAppLayoutSuperAdminRoute._addFileChildren(
    AuthAppLayoutSuperAdminRouteChildren,
  )

interface AuthAppLayoutRouteChildren {
  AuthAppLayoutSuperAdminRoute: typeof AuthAppLayoutSuperAdminRouteWithChildren
  AuthAppLayoutJammerWalletRoute: typeof AuthAppLayoutJammerWalletRoute
  AuthAppLayoutMarkupRoute: typeof AuthAppLayoutMarkupRoute
  AuthAppLayoutdashboardIndexRoute: typeof AuthAppLayoutdashboardIndexRoute
  AuthAppLayoutDashboardIndexRoute: typeof AuthAppLayoutDashboardIndexRoute
}

const AuthAppLayoutRouteChildren: AuthAppLayoutRouteChildren = {
  AuthAppLayoutSuperAdminRoute: AuthAppLayoutSuperAdminRouteWithChildren,
  AuthAppLayoutJammerWalletRoute: AuthAppLayoutJammerWalletRoute,
  AuthAppLayoutMarkupRoute: AuthAppLayoutMarkupRoute,
  AuthAppLayoutdashboardIndexRoute: AuthAppLayoutdashboardIndexRoute,
  AuthAppLayoutDashboardIndexRoute: AuthAppLayoutDashboardIndexRoute,
}

const AuthAppLayoutRouteWithChildren = AuthAppLayoutRoute._addFileChildren(
  AuthAppLayoutRouteChildren,
)

interface AuthOnboardingRouteChildren {
  AuthOnboardingOnboardingJammerRoute: typeof AuthOnboardingOnboardingJammerRoute
  AuthOnboardingOnboardingIndexRoute: typeof AuthOnboardingOnboardingIndexRoute
}

const AuthOnboardingRouteChildren: AuthOnboardingRouteChildren = {
  AuthOnboardingOnboardingJammerRoute: AuthOnboardingOnboardingJammerRoute,
  AuthOnboardingOnboardingIndexRoute: AuthOnboardingOnboardingIndexRoute,
}

const AuthOnboardingRouteWithChildren = AuthOnboardingRoute._addFileChildren(
  AuthOnboardingRouteChildren,
)

interface AuthSimpleLayoutRouteChildren {
  AuthSimpleLayoutProjectCreateRoute: typeof AuthSimpleLayoutProjectCreateRoute
  AuthSimpleLayoutProjectidEditRoute: typeof AuthSimpleLayoutProjectidEditRoute
  AuthSimpleLayoutProjectidJammerSelectionRoute: typeof AuthSimpleLayoutProjectidJammerSelectionRoute
  AuthSimpleLayoutProjectidUpsellConfirmRoute: typeof AuthSimpleLayoutProjectidUpsellConfirmRoute
  AuthSimpleLayoutProjectidUpsellPaymentCompleteRoute: typeof AuthSimpleLayoutProjectidUpsellPaymentCompleteRoute
  AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdRoute: typeof AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdRoute
  AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdRoute: typeof AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdRoute
  AuthSimpleLayoutProjectDraftIdEditRoute: typeof AuthSimpleLayoutProjectDraftIdEditRoute
}

const AuthSimpleLayoutRouteChildren: AuthSimpleLayoutRouteChildren = {
  AuthSimpleLayoutProjectCreateRoute: AuthSimpleLayoutProjectCreateRoute,
  AuthSimpleLayoutProjectidEditRoute: AuthSimpleLayoutProjectidEditRoute,
  AuthSimpleLayoutProjectidJammerSelectionRoute:
    AuthSimpleLayoutProjectidJammerSelectionRoute,
  AuthSimpleLayoutProjectidUpsellConfirmRoute:
    AuthSimpleLayoutProjectidUpsellConfirmRoute,
  AuthSimpleLayoutProjectidUpsellPaymentCompleteRoute:
    AuthSimpleLayoutProjectidUpsellPaymentCompleteRoute,
  AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdRoute:
    AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdRoute,
  AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdRoute:
    AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdRoute,
  AuthSimpleLayoutProjectDraftIdEditRoute:
    AuthSimpleLayoutProjectDraftIdEditRoute,
}

const AuthSimpleLayoutRouteWithChildren =
  AuthSimpleLayoutRoute._addFileChildren(AuthSimpleLayoutRouteChildren)

interface AuthRouteChildren {
  AuthAppLayoutRoute: typeof AuthAppLayoutRouteWithChildren
  AuthOnboardingRoute: typeof AuthOnboardingRouteWithChildren
  AuthSimpleLayoutRoute: typeof AuthSimpleLayoutRouteWithChildren
  AuthOauthCallbackRoute: typeof AuthOauthCallbackRoute
  AuthResetPasswordRoute: typeof AuthResetPasswordRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAppLayoutRoute: AuthAppLayoutRouteWithChildren,
  AuthOnboardingRoute: AuthOnboardingRouteWithChildren,
  AuthSimpleLayoutRoute: AuthSimpleLayoutRouteWithChildren,
  AuthOauthCallbackRoute: AuthOauthCallbackRoute,
  AuthResetPasswordRoute: AuthResetPasswordRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthAppLayoutSuperAdminRouteWithChildren
  '/login': typeof LoginRoute
  '/oauth-callback': typeof AuthOauthCallbackRoute
  '/reset-password': typeof AuthResetPasswordRoute
  '/markup/$docId': typeof MarkupDocIdRoute
  '/markup/image': typeof MarkupImageRoute
  '/markup/pdf': typeof MarkupPdfRoute
  '/markup/site': typeof MarkupSiteRoute
  '/signup/client': typeof SignupClientRoute
  '/signup/jammer': typeof SignupJammerRoute
  '/signup': typeof SignupIndexRoute
  '/jammer-wallet': typeof AuthAppLayoutJammerWalletRoute
  '/markup': typeof AuthAppLayoutMarkupRoute
  '/payment-transactions': typeof AuthAppLayoutSuperAdminPaymentTransactionsRoute
  '/withdrawal-requests': typeof AuthAppLayoutSuperAdminWithdrawalRequestsRoute
  '/onboarding/jammer': typeof AuthOnboardingOnboardingJammerRoute
  '/project/create': typeof AuthSimpleLayoutProjectCreateRoute
  '/': typeof AuthAppLayoutdashboardIndexRoute
  '/dashboard': typeof AuthAppLayoutDashboardIndexRoute
  '/onboarding': typeof AuthOnboardingOnboardingIndexRoute
  '/project/[id]/edit': typeof AuthSimpleLayoutProjectidEditRoute
  '/project/[id]/jammer-selection': typeof AuthSimpleLayoutProjectidJammerSelectionRoute
  '/project/[id]/upsell-confirm': typeof AuthSimpleLayoutProjectidUpsellConfirmRoute
  '/project/[id]/upsell-payment-complete': typeof AuthSimpleLayoutProjectidUpsellPaymentCompleteRoute
  '/project/[id]/brief-checkout/$checkoutId': typeof AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdRoute
  '/project/[id]/upsell-checkout/$checkoutId': typeof AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdRoute
  '/project/draft/$id/edit': typeof AuthSimpleLayoutProjectDraftIdEditRoute
}

export interface FileRoutesByTo {
  '': typeof AuthAppLayoutSuperAdminRouteWithChildren
  '/login': typeof LoginRoute
  '/oauth-callback': typeof AuthOauthCallbackRoute
  '/reset-password': typeof AuthResetPasswordRoute
  '/markup/$docId': typeof MarkupDocIdRoute
  '/markup/image': typeof MarkupImageRoute
  '/markup/pdf': typeof MarkupPdfRoute
  '/markup/site': typeof MarkupSiteRoute
  '/signup/client': typeof SignupClientRoute
  '/signup/jammer': typeof SignupJammerRoute
  '/signup': typeof SignupIndexRoute
  '/jammer-wallet': typeof AuthAppLayoutJammerWalletRoute
  '/markup': typeof AuthAppLayoutMarkupRoute
  '/payment-transactions': typeof AuthAppLayoutSuperAdminPaymentTransactionsRoute
  '/withdrawal-requests': typeof AuthAppLayoutSuperAdminWithdrawalRequestsRoute
  '/onboarding/jammer': typeof AuthOnboardingOnboardingJammerRoute
  '/project/create': typeof AuthSimpleLayoutProjectCreateRoute
  '/': typeof AuthAppLayoutdashboardIndexRoute
  '/dashboard': typeof AuthAppLayoutDashboardIndexRoute
  '/onboarding': typeof AuthOnboardingOnboardingIndexRoute
  '/project/[id]/edit': typeof AuthSimpleLayoutProjectidEditRoute
  '/project/[id]/jammer-selection': typeof AuthSimpleLayoutProjectidJammerSelectionRoute
  '/project/[id]/upsell-confirm': typeof AuthSimpleLayoutProjectidUpsellConfirmRoute
  '/project/[id]/upsell-payment-complete': typeof AuthSimpleLayoutProjectidUpsellPaymentCompleteRoute
  '/project/[id]/brief-checkout/$checkoutId': typeof AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdRoute
  '/project/[id]/upsell-checkout/$checkoutId': typeof AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdRoute
  '/project/draft/$id/edit': typeof AuthSimpleLayoutProjectDraftIdEditRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/login': typeof LoginRoute
  '/_auth/_app-layout': typeof AuthAppLayoutRouteWithChildren
  '/_auth/_onboarding': typeof AuthOnboardingRouteWithChildren
  '/_auth/_simple-layout': typeof AuthSimpleLayoutRouteWithChildren
  '/_auth/oauth-callback': typeof AuthOauthCallbackRoute
  '/_auth/reset-password': typeof AuthResetPasswordRoute
  '/markup/$docId': typeof MarkupDocIdRoute
  '/markup/image': typeof MarkupImageRoute
  '/markup/pdf': typeof MarkupPdfRoute
  '/markup/site': typeof MarkupSiteRoute
  '/signup/client': typeof SignupClientRoute
  '/signup/jammer': typeof SignupJammerRoute
  '/signup/': typeof SignupIndexRoute
  '/_auth/_app-layout/_super-admin': typeof AuthAppLayoutSuperAdminRouteWithChildren
  '/_auth/_app-layout/jammer-wallet': typeof AuthAppLayoutJammerWalletRoute
  '/_auth/_app-layout/markup': typeof AuthAppLayoutMarkupRoute
  '/_auth/_app-layout/_super-admin/payment-transactions': typeof AuthAppLayoutSuperAdminPaymentTransactionsRoute
  '/_auth/_app-layout/_super-admin/withdrawal-requests': typeof AuthAppLayoutSuperAdminWithdrawalRequestsRoute
  '/_auth/_onboarding/onboarding/jammer': typeof AuthOnboardingOnboardingJammerRoute
  '/_auth/_simple-layout/project/create': typeof AuthSimpleLayoutProjectCreateRoute
  '/_auth/_app-layout/(dashboard)/': typeof AuthAppLayoutdashboardIndexRoute
  '/_auth/_app-layout/dashboard/': typeof AuthAppLayoutDashboardIndexRoute
  '/_auth/_onboarding/onboarding/': typeof AuthOnboardingOnboardingIndexRoute
  '/_auth/_simple-layout/project/[id]/edit': typeof AuthSimpleLayoutProjectidEditRoute
  '/_auth/_simple-layout/project/[id]/jammer-selection': typeof AuthSimpleLayoutProjectidJammerSelectionRoute
  '/_auth/_simple-layout/project/[id]/upsell-confirm': typeof AuthSimpleLayoutProjectidUpsellConfirmRoute
  '/_auth/_simple-layout/project/[id]/upsell-payment-complete': typeof AuthSimpleLayoutProjectidUpsellPaymentCompleteRoute
  '/_auth/_simple-layout/project/[id]/brief-checkout/$checkoutId': typeof AuthSimpleLayoutProjectidBriefCheckoutCheckoutIdRoute
  '/_auth/_simple-layout/project/[id]/upsell-checkout/$checkoutId': typeof AuthSimpleLayoutProjectidUpsellCheckoutCheckoutIdRoute
  '/_auth/_simple-layout/project/draft/$id/edit': typeof AuthSimpleLayoutProjectDraftIdEditRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/login'
    | '/oauth-callback'
    | '/reset-password'
    | '/markup/$docId'
    | '/markup/image'
    | '/markup/pdf'
    | '/markup/site'
    | '/signup/client'
    | '/signup/jammer'
    | '/signup'
    | '/jammer-wallet'
    | '/markup'
    | '/payment-transactions'
    | '/withdrawal-requests'
    | '/onboarding/jammer'
    | '/project/create'
    | '/'
    | '/dashboard'
    | '/onboarding'
    | '/project/[id]/edit'
    | '/project/[id]/jammer-selection'
    | '/project/[id]/upsell-confirm'
    | '/project/[id]/upsell-payment-complete'
    | '/project/[id]/brief-checkout/$checkoutId'
    | '/project/[id]/upsell-checkout/$checkoutId'
    | '/project/draft/$id/edit'
  fileRoutesByTo: FileRoutesByTo
  to:
    | ''
    | '/login'
    | '/oauth-callback'
    | '/reset-password'
    | '/markup/$docId'
    | '/markup/image'
    | '/markup/pdf'
    | '/markup/site'
    | '/signup/client'
    | '/signup/jammer'
    | '/signup'
    | '/jammer-wallet'
    | '/markup'
    | '/payment-transactions'
    | '/withdrawal-requests'
    | '/onboarding/jammer'
    | '/project/create'
    | '/'
    | '/dashboard'
    | '/onboarding'
    | '/project/[id]/edit'
    | '/project/[id]/jammer-selection'
    | '/project/[id]/upsell-confirm'
    | '/project/[id]/upsell-payment-complete'
    | '/project/[id]/brief-checkout/$checkoutId'
    | '/project/[id]/upsell-checkout/$checkoutId'
    | '/project/draft/$id/edit'
  id:
    | '__root__'
    | '/_auth'
    | '/login'
    | '/_auth/_app-layout'
    | '/_auth/_onboarding'
    | '/_auth/_simple-layout'
    | '/_auth/oauth-callback'
    | '/_auth/reset-password'
    | '/markup/$docId'
    | '/markup/image'
    | '/markup/pdf'
    | '/markup/site'
    | '/signup/client'
    | '/signup/jammer'
    | '/signup/'
    | '/_auth/_app-layout/_super-admin'
    | '/_auth/_app-layout/jammer-wallet'
    | '/_auth/_app-layout/markup'
    | '/_auth/_app-layout/_super-admin/payment-transactions'
    | '/_auth/_app-layout/_super-admin/withdrawal-requests'
    | '/_auth/_onboarding/onboarding/jammer'
    | '/_auth/_simple-layout/project/create'
    | '/_auth/_app-layout/(dashboard)/'
    | '/_auth/_app-layout/dashboard/'
    | '/_auth/_onboarding/onboarding/'
    | '/_auth/_simple-layout/project/[id]/edit'
    | '/_auth/_simple-layout/project/[id]/jammer-selection'
    | '/_auth/_simple-layout/project/[id]/upsell-confirm'
    | '/_auth/_simple-layout/project/[id]/upsell-payment-complete'
    | '/_auth/_simple-layout/project/[id]/brief-checkout/$checkoutId'
    | '/_auth/_simple-layout/project/[id]/upsell-checkout/$checkoutId'
    | '/_auth/_simple-layout/project/draft/$id/edit'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  LoginRoute: typeof LoginRoute
  MarkupDocIdRoute: typeof MarkupDocIdRoute
  MarkupImageRoute: typeof MarkupImageRoute
  MarkupPdfRoute: typeof MarkupPdfRoute
  MarkupSiteRoute: typeof MarkupSiteRoute
  SignupClientRoute: typeof SignupClientRoute
  SignupJammerRoute: typeof SignupJammerRoute
  SignupIndexRoute: typeof SignupIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  LoginRoute: LoginRoute,
  MarkupDocIdRoute: MarkupDocIdRoute,
  MarkupImageRoute: MarkupImageRoute,
  MarkupPdfRoute: MarkupPdfRoute,
  MarkupSiteRoute: MarkupSiteRoute,
  SignupClientRoute: SignupClientRoute,
  SignupJammerRoute: SignupJammerRoute,
  SignupIndexRoute: SignupIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/login",
        "/markup/$docId",
        "/markup/image",
        "/markup/pdf",
        "/markup/site",
        "/signup/client",
        "/signup/jammer",
        "/signup/"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/_app-layout",
        "/_auth/_onboarding",
        "/_auth/_simple-layout",
        "/_auth/oauth-callback",
        "/_auth/reset-password"
      ]
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/_auth/_app-layout": {
      "filePath": "_auth/_app-layout.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_app-layout/_super-admin",
        "/_auth/_app-layout/jammer-wallet",
        "/_auth/_app-layout/markup",
        "/_auth/_app-layout/(dashboard)/",
        "/_auth/_app-layout/dashboard/"
      ]
    },
    "/_auth/_onboarding": {
      "filePath": "_auth/_onboarding.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_onboarding/onboarding/jammer",
        "/_auth/_onboarding/onboarding/"
      ]
    },
    "/_auth/_simple-layout": {
      "filePath": "_auth/_simple-layout.tsx",
      "parent": "/_auth",
      "children": [
        "/_auth/_simple-layout/project/create",
        "/_auth/_simple-layout/project/[id]/edit",
        "/_auth/_simple-layout/project/[id]/jammer-selection",
        "/_auth/_simple-layout/project/[id]/upsell-confirm",
        "/_auth/_simple-layout/project/[id]/upsell-payment-complete",
        "/_auth/_simple-layout/project/[id]/brief-checkout/$checkoutId",
        "/_auth/_simple-layout/project/[id]/upsell-checkout/$checkoutId",
        "/_auth/_simple-layout/project/draft/$id/edit"
      ]
    },
    "/_auth/oauth-callback": {
      "filePath": "_auth/oauth-callback.tsx",
      "parent": "/_auth"
    },
    "/_auth/reset-password": {
      "filePath": "_auth/reset-password.tsx",
      "parent": "/_auth"
    },
    "/markup/$docId": {
      "filePath": "markup/$docId.tsx"
    },
    "/markup/image": {
      "filePath": "markup/image.tsx"
    },
    "/markup/pdf": {
      "filePath": "markup/pdf.tsx"
    },
    "/markup/site": {
      "filePath": "markup/site.tsx"
    },
    "/signup/client": {
      "filePath": "signup/client.tsx"
    },
    "/signup/jammer": {
      "filePath": "signup/jammer.tsx"
    },
    "/signup/": {
      "filePath": "signup/index.tsx"
    },
    "/_auth/_app-layout/_super-admin": {
      "filePath": "_auth/_app-layout/_super-admin.tsx",
      "parent": "/_auth/_app-layout",
      "children": [
        "/_auth/_app-layout/_super-admin/payment-transactions",
        "/_auth/_app-layout/_super-admin/withdrawal-requests"
      ]
    },
    "/_auth/_app-layout/jammer-wallet": {
      "filePath": "_auth/_app-layout/jammer-wallet.tsx",
      "parent": "/_auth/_app-layout"
    },
    "/_auth/_app-layout/markup": {
      "filePath": "_auth/_app-layout/markup.tsx",
      "parent": "/_auth/_app-layout"
    },
    "/_auth/_app-layout/_super-admin/payment-transactions": {
      "filePath": "_auth/_app-layout/_super-admin/payment-transactions.tsx",
      "parent": "/_auth/_app-layout/_super-admin"
    },
    "/_auth/_app-layout/_super-admin/withdrawal-requests": {
      "filePath": "_auth/_app-layout/_super-admin/withdrawal-requests.tsx",
      "parent": "/_auth/_app-layout/_super-admin"
    },
    "/_auth/_onboarding/onboarding/jammer": {
      "filePath": "_auth/_onboarding/onboarding/jammer.tsx",
      "parent": "/_auth/_onboarding"
    },
    "/_auth/_simple-layout/project/create": {
      "filePath": "_auth/_simple-layout/project/create.tsx",
      "parent": "/_auth/_simple-layout"
    },
    "/_auth/_app-layout/(dashboard)/": {
      "filePath": "_auth/_app-layout/(dashboard)/index.tsx",
      "parent": "/_auth/_app-layout"
    },
    "/_auth/_app-layout/dashboard/": {
      "filePath": "_auth/_app-layout/dashboard/index.tsx",
      "parent": "/_auth/_app-layout"
    },
    "/_auth/_onboarding/onboarding/": {
      "filePath": "_auth/_onboarding/onboarding/index.tsx",
      "parent": "/_auth/_onboarding"
    },
    "/_auth/_simple-layout/project/[id]/edit": {
      "filePath": "_auth/_simple-layout/project/[id]/edit.tsx",
      "parent": "/_auth/_simple-layout"
    },
    "/_auth/_simple-layout/project/[id]/jammer-selection": {
      "filePath": "_auth/_simple-layout/project/[id]/jammer-selection.tsx",
      "parent": "/_auth/_simple-layout"
    },
    "/_auth/_simple-layout/project/[id]/upsell-confirm": {
      "filePath": "_auth/_simple-layout/project/[id]/upsell-confirm.tsx",
      "parent": "/_auth/_simple-layout"
    },
    "/_auth/_simple-layout/project/[id]/upsell-payment-complete": {
      "filePath": "_auth/_simple-layout/project/[id]/upsell-payment-complete.tsx",
      "parent": "/_auth/_simple-layout"
    },
    "/_auth/_simple-layout/project/[id]/brief-checkout/$checkoutId": {
      "filePath": "_auth/_simple-layout/project/[id]/brief-checkout/$checkoutId.tsx",
      "parent": "/_auth/_simple-layout"
    },
    "/_auth/_simple-layout/project/[id]/upsell-checkout/$checkoutId": {
      "filePath": "_auth/_simple-layout/project/[id]/upsell-checkout/$checkoutId.tsx",
      "parent": "/_auth/_simple-layout"
    },
    "/_auth/_simple-layout/project/draft/$id/edit": {
      "filePath": "_auth/_simple-layout/project/draft/$id/edit.tsx",
      "parent": "/_auth/_simple-layout"
    }
  }
}
ROUTE_MANIFEST_END */
