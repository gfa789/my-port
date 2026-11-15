import { useEffect, useState } from "react";

const hideDistance = 12;
const revealDistance = 72;

export default function useScrollHidden() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let direction = 0;
    let distance = 0;
    function onScroll() {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY;
      lastY = y;
      if (y <= 24) {
        distance = 0;
        setHidden(false);
        return;
      }
      if (!delta) return;
      if (Math.sign(delta) !== direction) {
        direction = Math.sign(delta);
        distance = 0;
      }
      distance += Math.abs(delta);
      if (direction > 0 && distance >= hideDistance && y > 96) {
        setHidden(true);
      } else if (direction < 0 && distance >= revealDistance) {
        setHidden(false);
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return hidden;
}
