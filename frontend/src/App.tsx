import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ProductForm } from "./pages/product-form/ProductForm";
import { ProductList } from "./pages/product-list/ProductList";
import { SplashScreen } from "./shared/components/splash-screen/SplashScreen";
import { DEBOUNCE_TIME } from "./shared/constants/dev-config";

const queryClient = new QueryClient();

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, DEBOUNCE_TIME);
    return () => clearTimeout(timer);
  }, []);

  if (isAppLoading) {
    return <SplashScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Navigate replace to="/products" />} path="/" />
          <Route element={<ProductList />} path="/products" />
          <Route element={<ProductForm />} path="/products/new" />
          <Route element={<ProductForm />} path="/products/:id/edit" />
        </Routes>
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
