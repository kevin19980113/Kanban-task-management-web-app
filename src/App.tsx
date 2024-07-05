import { Eye } from "lucide-react";
import Header from "./components/Header";
import MainBoard from "./components/MainBoard";
import MaxWidthWrapper from "./components/MaxWidthWrapper";
import Sidebar from "./components/Sidebar";
import { Button } from "./components/ui/button";
import { ThemeProvider } from "./context/ThemeProvider";
import { useState } from "react";

function App() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

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
          <div className="w-full h-screen flex flex-col items-center">
            <Header isSidebarVisible={isSidebarVisible} />
            <MainBoard />
            <Button
              className="absolute -left-1 bottom-10 md:block hidden rounded-r-full"
              onClick={() => toggleSidebar()}
            >
              <Eye className="size-5" />
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
    </ThemeProvider>
  );
}

export default App;
