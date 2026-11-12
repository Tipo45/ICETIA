import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "admin/super-admin/:path*",
  "/admin/editor/:path*",
  "/admin/reviewer/:path*"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  
  if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
    return nextjsMiddlewareRedirect(request, "/admin");
  }
},
  {
    cookieConfig: {
      maxAge: 60 * 60 ,
    }
  });


export const config = {
  // The following matcher runs middleware on all routes
  // except static assets.
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: [
    "/admin/editor/:path*",
    "/admin/reviewer/:path*",
    "/admin/super-admin/:path*",
    "/api/auth",
    "/api/auth/:path*",
  ],
};