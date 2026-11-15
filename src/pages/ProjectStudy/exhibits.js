export const exhibits = {
  "distributed-game-of-life": {
    name: "One board, three row ranges",
    intro:
      "Scrub through the generations. The rules use neighbours from the whole board, including cells across the highlighted row boundaries.",
    end: 24,
    duration: 5200,
  },
  "dartboard-detector": {
    name: "Edges and Hough votes",
    intro:
      "I added Hough line detection to a Viola–Jones dartboard detector to reduce false positives. The coloured lines connect one coursework photo to its vote map.",
    end: 3,
    duration: 4100,
  },
  "stereo-vision": {
    name: "Stereo reconstruction",
    intro:
      "I built a pipeline that detected circles in two camera views, matched them and reconstructed sphere centres and radii in 3D. This simulated example shows the geometry of one match.",
    end: 3.7,
    duration: 4700,
  },
};
