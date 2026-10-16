---
title: "Lane Keeping Assist System"
date: 2025-11-05
featured: true
bg-img: /assets/projects/lka_assist/cover.png
caption: "
    Lightweight C++/OpenCV lane detection pipeline for driving videos, with temporal smoothing, confidence metrics, and real-time overlays
    "
external-links:
    GitHub: https://github.com/loloman333/lka_elte
tags: [Computer Vision, C++]
---

### What is this?

This is a small lane detection system written in C++ with OpenCV. It detects the left and right lane boundaries in driving videos, draws them over the road, and reports how confident it is in each side.

The goal was not to build a complete automotive product, but to make a lightweight and understandable perception pipeline that runs in real time. The output is an annotated video with a heads-up display, together with per-frame detection metrics in a CSV file.

### The pipeline

The input frame first gets converted to HLS, where CLAHE improves the contrast of the lightness channel. Gaussian blur and Canny edge detection then make the road markings easier to isolate. A region-of-interest mask removes most of the image that cannot contain useful lane information.

The remaining edges are processed with a Hough transform. Raycasting provides initial left and right lane candidates, while RANSAC removes outliers before the line segments are grouped. A kernel sweep builds separate masks for both lanes. Their pixels are fitted with quadratic polynomials, which are then smoothed over time using a short history buffer and exponential moving averages.

```mermaid
---
config:
    themeVariables:
        fontSize: "18px"
---
flowchart TD
    INPUT[/Input frame/]
    PREPROCESS[1. Preprocess]
    EDGES[2. Edge detection]
    ROI[3. ROI mask]
    HOUGH[4. Hough lines]
    CLASSIFY[5. Classify lines]
    MASKS[6. Lane masks]
    FIT[7. Fit polynomials]
    SMOOTH[8. Temporal smoothing]
    HISTORY[(Polynomial history)]
    OUTPUT[\Output frame\]

    INPUT --> PREPROCESS --> EDGES --> ROI --> HOUGH --> CLASSIFY --> MASKS --> FIT --> SMOOTH --> OUTPUT
    FIT --> HISTORY --> SMOOTH
```

![Debug view of every stage in the lane detection pipeline](/assets/projects/lka_assist/debug_screen.png)

The final overlay shows solid curves when lanes are detected and fallback guides when a lane temporarily disappears. Confidence decreases gradually instead of resetting immediately, so brief occlusions do not make the output jump around.

### Results

The pipeline usually runs at around 25 FPS on ordinary CPU hardware. It behaves best on clear roads, but I also tested it under several less friendly conditions.

#### Basic

Clear weather, straight road, and dashed markings. Small jumps caused by occasional line misclassification are mostly removed by temporal smoothing.

![Lane detection on a clear road](/assets/projects/lka_assist/1-basic.gif)

#### Night

Higher speed, motion blur, and strong contrast from the lights. The detector remains stable, although the lane curves become more shaky.

![Lane detection at night](/assets/projects/lka_assist/2-night.gif)

#### City

Cars, fences, and extra road markings create many structured edges. The middle road marking can sometimes be classified as part of a lane.

![Lane detection in an urban scene](/assets/projects/lka_assist/3-city.gif)

#### Rain

Curves, raindrops, and reflections make the road much harder to interpret. This is where the current lightweight approach shows its limits most clearly.

![Lane detection in rain](/assets/projects/lka_assist/4-rain.gif)

### Limitations

The custom raycasting-based classification keeps the implementation fast and interpretable, but it is not equally reliable in every scene. Rain, glare, dense urban edges, and markings near the middle of the road can produce incorrect lane assignments. More robust outlier rejection and scenario-specific parameter tuning would improve those cases.

For the source code and more details, visit the [LKA repository](https://github.com/loloman333/lka_elte).
