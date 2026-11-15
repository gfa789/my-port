import ProjectStudy from "../ProjectStudy/ProjectStudy";
import WaterDemo from "../ProjectStudy/WaterDemo";
import { studies } from "../ProjectStudy/studies";
import DiveLog from "./DiveLog";

const id = "underwater-image-enhancement";

export default function Underwater() {
  return (
    <ProjectStudy
      id={id}
      demo={<WaterDemo />}
      approachLink="Follow the dive log"
      approach={<DiveLog sources={studies[id].sources} />}
    />
  );
}
