import { MoonStar, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import { useTheme } from "@/context/ThemeProvider";

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="bg-light-grey dark:bg-very-dark-grey rounded-lg flex items-center justify-center gap-x-3 py-3 self-stretch">
      <Sun className="size-5 text-medium-grey" />
      <Switch
        onClick={() => {
          if (theme === "light") {
            setTheme("dark");
          }
          if (theme === "dark") {
            setTheme("light");
          }
        }}
      />
      <MoonStar className="size-5 text-medium-grey" />
    </div>
  );
}
