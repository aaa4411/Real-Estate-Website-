import { Suspense, lazy } from "react";
import { Routes, Route, useRoutes } from "react-router-dom";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./components/layout/MainLayout";
import ErrorBoundary from "./components/common/ErrorBoundary";
import routes from "tempo-routes";

// Lazy load components for better performance
const Home = lazy(() => import("./components/home"));
const PropertySearch = lazy(() => import("./pages/PropertySearch"));
const PropertyDetailsPage = lazy(() => import("./pages/PropertyDetailsPage"));
const BookingsPage = lazy(() => import("./pages/BookingsPage"));
const SubscriptionPage = lazy(() => import("./pages/SubscriptionPage"));
const UserDashboardPage = lazy(() => import("./pages/UserDashboardPage"));
const PropertyComparisonPage = lazy(() => import("./pages/PropertyComparisonPage"));

function App() {
  // Conditionally render tempo routes
  const tempoRoutes =
    import.meta.env.VITE_TEMPO === "true" ? useRoutes(routes) : null;

  return (
    <ThemeProvider>
      <SubscriptionProvider>
        <ErrorBoundary>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-lg font-medium">Loading...</p>
              </div>
            </div>
          }>
            <>
              <Routes>
                <Route
                  path="/"
                  element={
                    <MainLayout 
                      showPremiumBanner={true}
                      pageTitle="RealEstateAI - Find Your Perfect Home"
                      pageDescription="Discover your dream property with our AI-powered real estate platform featuring virtual tours and personalized recommendations."
                    >
                      <ErrorBoundary>
                        <Home />
                      </ErrorBoundary>
                    </MainLayout>
                  }
                />
                <Route
                  path="/properties"
                  element={
                    <MainLayout 
                      showPremiumBanner={true}
                      pageTitle="Property Search - RealEstateAI"
                      pageDescription="Search for your ideal property with advanced filters, virtual tours, and AI recommendations."
                    >
                      <ErrorBoundary>
                        <PropertySearch />
                      </ErrorBoundary>
                    </MainLayout>
                  }
                />
                <Route
                  path="/properties/:id"
                  element={
                    <MainLayout 
                      showPremiumBanner={false}
                      pageTitle="Property Details - RealEstateAI"
                      pageDescription="View detailed information, virtual tours, and inspection reports for this property."
                    >
                      <ErrorBoundary>
                        <PropertyDetailsPage />
                      </ErrorBoundary>
                    </MainLayout>
                  }
                />
                <Route
                  path="/bookings"
                  element={
                    <MainLayout 
                      showPremiumBanner={true}
                      pageTitle="My Bookings - RealEstateAI"
                      pageDescription="Manage your property viewings and appointments."
                    >
                      <ErrorBoundary>
                        <BookingsPage />
                      </ErrorBoundary>
                    </MainLayout>
                  }
                />
                <Route
                  path="/subscription"
                  element={
                    <MainLayout 
                      showPremiumBanner={false}
                      pageTitle="Subscription Plans - RealEstateAI"
                      pageDescription="Upgrade to premium for virtual tours, inspection reports, and AI recommendations."
                    >
                      <ErrorBoundary>
                        <SubscriptionPage />
                      </ErrorBoundary>
                    </MainLayout>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <MainLayout 
                      showPremiumBanner={true}
                      pageTitle="User Dashboard - RealEstateAI"
                      pageDescription="Manage your account, saved properties, and preferences."
                    >
                      <ErrorBoundary>
                        <UserDashboardPage />
                      </ErrorBoundary>
                    </MainLayout>
                  }
                />
                <Route
                  path="/property-comparison"
                  element={
                    <MainLayout 
                      showPremiumBanner={true}
                      pageTitle="Compare Properties - RealEstateAI"
                      pageDescription="Compare multiple properties side by side to make the best decision."
                    >
                      <ErrorBoundary>
                        <PropertyComparisonPage />
                      </ErrorBoundary>
                    </MainLayout>
                  }
                />
                {import.meta.env.VITE_TEMPO === "true" && (
                  <Route path="/tempobook/*" />
                )}
              </Routes>
              {tempoRoutes}
            </>
          </Suspense>
        </ErrorBoundary>
        </Suspense>
      </SubscriptionProvider>
    </ThemeProvider>
  );
}

export default App;
