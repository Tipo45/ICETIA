import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isSignInPage = createRouteMatcher(["/admin/login"]);
const isProtectedRoute = createRouteMatcher(["/admin/editor/:id", "/admin/reviewer/:id"]);
 
export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  // if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
  //   return nextjsMiddlewareRedirect(request, "/admin");
  // }
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/admin/login");
  }
},
{
  cookieConfig: {
    maxAge: 60 * 60 * 1, // 1 hour
  }
});
 
 
export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: [
    "/admin/editor/:path*",
    "/admin/reviewer/:path*",
  ],
};