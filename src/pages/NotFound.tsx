
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DashboardLayout } from "@/components/layout/Dashboard";
import { Cloud } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <DashboardLayout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="mb-4 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full blur opacity-30 bg-gradient-to-r from-cloud-primary to-cloud-secondary"></div>
              <div className="gradient-bg relative rounded-full p-4">
                <Cloud className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cloud-primary to-cloud-secondary bg-clip-text text-transparent">404</h1>
          <p className="text-xl text-gray-600 mb-6">Resource not found</p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">The cloud resource or page you are looking for does not exist or has been moved.</p>
          <Button asChild size="lg">
            <a href="/">Return to Dashboard</a>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotFound;
