# Seesaw Logic Simulation

This project is a real-time, physics-based seesaw simulation developed using pure JavaScript, HTML, and CSS. It demonstrates the implementation of torque logic and interactive DOM manipulation without the use of any external frameworks or libraries.

## 🚀 Thought Process & Design Decisions

* **Modular Architecture:** I structured the JavaScript logic to separate state management (objects array) from the physics engine (torque calculation) and the rendering logic.
* **Physics Implementation:** The core logic is based on the torque formula ($Torque = Weight \times Distance$). I used the distance relative to the center pivot to determine the tilt direction and magnitude.
* **CSS-Oriented Animation:** For visual fluidity, I utilized CSS `transition` with a `cubic-bezier` timing function instead of JavaScript intervals. This ensures high performance and a natural "swinging" effect.
* **Data Persistence:** I integrated `localStorage` to store the state of the objects, ensuring that users do not lose their progress when the page is refreshed.

## ⚖️ Trade-offs & Limitations

* **DOM vs. Canvas:** In compliance with the challenge requirements to avoid Canvas, I chose DOM manipulation. While Canvas is efficient for complex physics, using DOM elements allowed for easier styling and direct interaction.
* **Torque Sensitivity:** A "sensitivity" constant was introduced to convert raw torque differences into degrees. Finding the right balance required iterative testing.

## 🤖 AI Usage Disclosure

In accordance with the challenge guidelines, AI tools (ChatGPT) were utilized for the following:
* **Code Support:** Assisted in creating the initial HTML/CSS boilerplate, verifying custom gradients for the grid, and troubleshooting coordinate calculations for the rotated plank.
* **Documentation:** This README file was structured and refined with the help of AI to ensure all technical decisions and project requirements were clearly explained in English.
* **Core Logic:** While AI assisted with syntax and debugging, the overall architecture and the torque-based physics engine were manually implemented and verified.

## ✨ Bonus Features Implemented

* **Visual Measurement Grid:** Added a scale on the plank to help users estimate distances from the pivot.
* **Audio Feedback:** Integrated the Web Audio API to synthesize a "thud" sound effect when an object is dropped.
* **Reset Button:** Added functionality to clear all objects and reset the seesaw to its initial state.
* **Dynamic Weight Indicators:** Each object displays its weight and is color-coded based on its mass.

## 🛠️ How to Run

1. Download the project folder.
2. Open the `index.html` file in any modern web browser or run it via "Live Server" in VS Code.