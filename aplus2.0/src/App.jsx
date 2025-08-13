import Lenis from "@studio-freight/lenis";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Fireflies from "./components/Fireflies";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";

const App = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    // window.location.reload();
  };

  useEffect(() => {
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Footer />
      {theme === "dark" && <Fireflies />}
      {/* {theme === "dark" && <LampLights />} */}

      <div className="universal">
        <Routes>
          <Route
            path="/"
            element={<Home theme={theme} toggleTheme={toggleTheme} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
