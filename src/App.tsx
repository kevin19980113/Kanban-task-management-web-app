import { Eye } from "lucide-react";
import Header from "./components/Header";
import MainBoard from "./components/MainBoard";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import Sidebar from "./components/Sidebar";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./context/ThemeProvider";
import { useState } from "react";
import { Toaster } from "sonner";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <ThemeProvider>
      <MaxWidthWrapper>
        <div className="w-full flex-grow flex items-center">
          <Sidebar
            toggleSidebar={toggleSidebar}
            isSidebarVisible={isSidebarVisible}
          />
          <div className="flex-auto overflow-hidden h-screen flex flex-col items-center">
            <Header isSidebarVisible={isSidebarVisible} />
            <MainBoard />
            <Button
              className="absolute -left-5 bottom-10 md:block hidden rounded-r-full"
              onClick={() => toggleSidebar()}
            >
              <Eye className="size-5 ml-3" />
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}

export default App;
