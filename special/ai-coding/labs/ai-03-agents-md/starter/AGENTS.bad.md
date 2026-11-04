# AGENTS.md — PLEASE READ EVERYTHING VERY CAREFULLY!!!

You are a world-class senior robotics engineer with 30 years of experience.
Always write clean, good, high quality, best practice code. Be careful.

## About this project

This project is a robotics workshop. Robotics is the field of designing,
building and programming robots. Robots can sense the world, decide and act.
ROS (Robot Operating System) was created in 2007 at Willow Garage ...
(imagine 150 more lines of history here)

## Setup

1. Install ROS 2 Humble.
2. `pip install robotos rclpy numpy opencv-python`
3. Source `/opt/ros/humble/setup.bash`

## Credentials

Wi-Fi for the lab robots: SSID `robolab-5G`, password `robolab2026!`
Instructor API key: sk-ant-REDACTED-EXAMPLE-ONLY

## Rules

- Use rclpy for nodes.
- Topics are /cmd_vel, /odom and /scan.
- Never edit labs/common.
- It's fine to edit labs/common if it makes the code cleaner.
- Format code nicely.
- Use 4 spaces. Use tabs in starters.

## TODO (2025-03-02)

- Ask Somchai about the sim crash on Friday
- Rebuild the Linux pack (blocked)
