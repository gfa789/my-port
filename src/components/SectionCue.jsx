import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export default function SectionCue({ target, label }) {
  return (
    <Link className="journey-cue" to={`/#${target}`} aria-label={label}>
      <ChevronDown size={21} aria-hidden="true" />
    </Link>
  );
}
