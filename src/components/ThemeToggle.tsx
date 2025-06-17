import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === "dark";
  const Icon = isDark ? LightModeIcon : DarkModeIcon;

  return (
    <button
      onClick={toggleTheme}
      title="Toggle theme"
      aria-label="Toggle theme"
      className="w-10 h-10 flex items-center justify-center
             rounded-full transition-all duration-300
             bg-gray-600 text-white dark:bg-gray-300 dark:text-black
             hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Icon fontSize="small" className="transition-transform duration-200" />
    </button>
  );
};

export default ThemeToggle;
