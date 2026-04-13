import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen my-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="card bg-base-100 shadow-2xl border border-base-200">
          <div className="card-body items-center text-center space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1 text-xs font-semibold text-secondary">
              <span className="text-sm">404</span>
              <span className="hidden sm:inline">Page not found</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-base-content">
              Lost in your financial story
            </h1>

            <p className="text-base-content/70 text-sm md:text-base max-w-md">
              The page you&apos;re looking for doesn&apos;t exist or may have been
              moved. Let&apos;s get you back to your overview.
            </p>

            <div className="flex flex-col sm:flex-row w-full justify-center gap-3 pt-2">
              <Link
                to="/dashboard"
                className="btn btn-secondary text-white w-full sm:w-auto"
              >
                Go to Dashboard
              </Link>
              <Link
                to="/"
                className="btn btn-ghost border border-base-300 text-base-content w-full sm:w-auto"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-base-content/60">
          If you believe this is an error, please check the URL or try again
          later.
        </p>
      </div>
    </div>
  );
}