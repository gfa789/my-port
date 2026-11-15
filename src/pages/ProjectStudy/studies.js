export const studies = {
  "underwater-image-enhancement": {
    title: "Underwater Image Enhancement",
    context: "BSc dissertation · 2024",
    headline: "Making underwater video clearer, frame by frame.",
    intro:
      "I trained and evaluated generative models to restore colour and contrast underwater, then tested whether their corrections stayed consistent over time.",
    demo: "A single pixel column tells a longer story",
    guide:
      "I stacked the centre column of each frame into a single image so I could compare colour shifts and edge jitter across time.",
    sources: [
      [
        "Read the dissertation",
        "https://drive.google.com/file/d/1n85HyTZDCYAQlW12iAW1lgoUPREGd93h/view",
      ],
      ["View research code", "https://github.com/gfa789/finalproject"],
    ],
    description:
      "An interactive case study of George Atkinson’s underwater image enhancement dissertation and its experiments on temporal consistency.",
  },
  "weather-forecasting": {
    title: "Weather Forecasting",
    context: "Met Office group project · 2024",
    headline: "Forecasting temperature six hours ahead.",
    intro:
      "My team used hourly ERA5 records from 12 locations to forecast temperature six hours ahead and estimate missing readings.",
    sources: [
      [
        "Read the group report",
        "https://drive.google.com/file/d/111cPGMAF14W8wbxG88lhSIKxDMPB1ul9/view",
      ],
    ],
    sections: [
      [
        "Preparing the data",
        "We prepared hourly temperature, rainfall and wind records from ERA5 and encoded dates as cycles so the models could pick up daily and seasonal patterns.",
      ],
      [
        "Training the forecasting models",
        "We trained a TensorFlow LSTM on windows of past readings and compared it with a multilayer perceptron and a random forest. We split the data in time order and kept future observations out of the inputs.",
      ],
      [
        "Setting the baselines",
        "We compared the models with an average for the same time in other years, the previous day’s weather, and a rolling forecast that held conditions steady for six hours.",
      ],
    ],
    description:
      "An interactive Met Office coursework case study comparing six temperature forecasting approaches and a separate model for missing readings.",
  },
  "model-analysis": {
    title: "ML Model Analysis",
    context: "Machine learning coursework · 2023",
    headline: "From principal components to posterior predictions.",
    intro:
      "I used machine learning to classify tumours, recognise activities from sensor sequences and estimate demand for bike rentals.",
    demo: "Project the features, then draw the boundary",
    guide:
      "Watch the same data unfold on both sides, then compare the straight linear boundary with the curved RBF boundary.",
    sources: [
      [
        "Read the coursework report",
        "https://github.com/gfa789/ml-cw/blob/main/machine_learning.pdf",
      ],
      [
        "View the notebook",
        "https://github.com/gfa789/ml-cw/blob/main/coursework.ipynb",
      ],
    ],
    sections: [
      [
        "From features to components",
        "After standardisation, PCA finds directions of decreasing variance. The two plotted axes are weighted combinations of the original features. PCA can reveal structure without using the class labels.",
      ],
      [
        "What the kernel changes",
        "An SVM learns a separating boundary. A linear kernel gives a straight boundary in this view. An RBF kernel allows the decision function to bend around local structure. The outlined points are the support vectors for each fit.",
      ],
      [
        "What the coursework reported",
        "The two-component SVM reached 96.6% accuracy, compared with 97.3% using all 30 features. The notebook also explores sequence classification, decision-tree ensembles, and Bayesian regression on Seoul bike rentals.",
      ],
    ],
    description:
      "Explore PCA, hidden Markov models for activity recognition and Bayesian regression in George Atkinson’s machine learning coursework.",
  },
  "dartboard-detector": {
    title: "Dartboard Detector",
    context: "Computer vision coursework · 2023",
    headline: "Finding the board in a cluttered image.",
    intro:
      "I combined a Viola–Jones cascade with Hough line geometry to find dartboard centres and reject false positives.",
    demo: "Watch edges vote for a line",
    guide:
      "Trace the detection from Sobel edges to the centre. Match the coloured lines in the image to their peaks on the vote map.",
    sources: [
      [
        "Read the coursework report",
        "https://github.com/gfa789/darts-cw/blob/main/Part1/rp21039_Part1.pdf",
      ],
      [
        "View the detection code",
        "https://github.com/gfa789/darts-cw/tree/main/Part1",
      ],
    ],
    sections: [
      [
        "Find candidate regions",
        "I trained a Viola–Jones cascade to propose dartboard boxes. I drew reference boxes by hand and counted a detection as correct when its intersection over union with a reference exceeded 0.5.",
      ],
      [
        "Use the board’s geometry",
        "I used Sobel gradients and Hough line detection to find pairs of lines that met at about 18° inside a candidate box. I used those intersections to centre the boxes and enlarged them to account for the board’s outer rim.",
      ],
      [
        "Where the score falls short",
        "Adding the line geometry raised mean F1 from 0.08 for the cascade alone to 0.57 on the test images. Small or angled boards remained difficult, and the line detector could only refine boards the cascade had flagged.",
      ],
    ],
    description:
      "Explore Sobel edges, Hough line votes and the Viola–Jones cascade in George Atkinson’s dartboard detection coursework.",
  },
  "stereo-vision": {
    title: "Stereo Vision",
    context: "Computer vision coursework · 2023",
    headline: "Turning two flat views into a 3D scene.",
    intro:
      "I used known camera geometry and pairs of detected circles to reconstruct sphere centres and estimate their radii.",
    demo: "Follow a point back into space",
    guide:
      "Follow the highlighted sphere in both cameras as its two rays meet in the 3D reconstruction.",
    sources: [
      [
        "Read the coursework report",
        "https://github.com/gfa789/darts-cw/blob/main/Part2/rp21039_Part2.pdf",
      ],
      [
        "View the reconstruction code",
        "https://github.com/gfa789/darts-cw/tree/main/Part2",
      ],
    ],
    sections: [
      [
        "From circles to matches",
        "I detected circles in both images with the Hough transform, then computed the fundamental matrix from the camera parameters. I used the resulting epipolar constraint to score potential matches between circle centres.",
      ],
      [
        "From matches to depth",
        "I solved for each matched centre in world coordinates, then converted the two image radii to world scale and averaged them. I displayed the reconstructed and reference spheres as overlapping point clouds so I could compare shape and position.",
      ],
      [
        "When reconstruction breaks",
        "I compared reconstructed centres and radii with the simulated ground truth. Mean centre error ranged from 0.165 to 0.545 world units across five runs. Spheres outside the circle detector’s configured size range could be missed entirely.",
      ],
    ],
    description:
      "Trace epipolar lines and triangulate a 3D sphere in this interactive stereo vision case study by George Atkinson.",
  },
};
