# Workflow Wizard Application

This is a multi-step workflow application built with React and Vite, designed to guide users through a series of selections to configure a custom workflow. It features dynamic step rendering, progress tracking, and local storage persistence.

![Workflow wizard app screenshot](https://github.com/adamsartell/Workflow-Wizard/blob/main/public/workflow-screenshot.gif)

## Table of Contents

-   [Features](#features)

-   [Tech Stack](#tech-stack)

-   [Project Structure](#project-structure)

-   [Getting Started](#getting-started)

    -   [Prerequisites](#prerequisites)

    -   [Installation](#installation)

    -   [Running the Application](#running-the-application)

-   [Usage](#usage)

-   [Configuration](#configuration)

-   [Future Enhancements](#future-enhancements)

-   [License](#license)

## Features

-   **Multi-Step Workflow:** Guides users through a defined sequence of steps.

-   **Dynamic Step Rendering:** Displays different input types (radio buttons, checkboxes) based on step configuration.

-   **Conditional Logic:**

    -   `criteriaStep` completion depends on its sub-step (`criteriaStep2`).

    -   `Review` step becomes clickable only after all preceding steps are completed.

-   **Local Storage Persistence:** Automatically saves and loads workflow selections, allowing users to resume where they left off.

-   **Progress Bar:** Visual indicator of current, completed, and upcoming steps.

-   **Dynamic Button Actions:** "Next" button text and action adapt based on the current step (e.g., "Save Draft" on the final step).

-   **Review Summary:** Provides a consolidated view of all user selections on the final step.

-   **Customizable Workflow Data:** Workflow steps and options are defined in a JSON file (`api/data.json`), making it easy to modify the workflow structure.

## Tech Stack

-   **React:** A JavaScript library for building user interfaces.

-   **Vite:** A fast build tool that provides a lightning-fast development experience for modern web projects.

-   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

-   **`react-icons` (Lucide Icons):** A library for easily including popular icon sets in React projects.

-   **Local Storage API:** Used for client-side data persistence.

## Project Structure

The project follows a standard React application structure. Key directories and files include:
```
├── public/
├── src/
│   ├── api/
│   │   └── data.json                   # Workflow configuration data
│   ├── assets/
│   ├── components/
│   │   ├── common/
│   │   │   └── button/                 # Reusable button components (BackButton, NextButton, SaveButton)
│   │   │   └── form/                   # Reusable form inputs (RadioInput, CheckboxInput)
│   │   ├── features/
│   │   │   └── WorkflowContainer.jsx   # Main workflow UI orchestration
│   │   │   └── Content/                # Step-specific content (Prompt, Selection, Review)
│   │   │   └── Layout/                 # Overall layout components (Header, Footer)
│   │   │   └── Progress/               # Progress bar components (ProgressContainer, Step, CurrentStep, CompletedStep)
│   │   └── styles/                     # Common CSS modules or Tailwind utility classes
│   ├── context/
│   │   ├── WorkflowContext.js          # React Context definition
│   │   └── WorkflowProvider.jsx        # Context provider managing workflow state
│   │   └── useWorkflow.js              # Custom hook for consuming workflow context
│   ├── utils/
│   │   ├── Icons.jsx                   # Mapping of icon names to React icon components
│   │   ├── formatters.js               # Utility for reformatting names (e.g., for icon keys)
│   │   └── localStorage.js             # Helper functions for localStorage operations
│   │   └── selectionHelpers.js         # Helper functions for complex selection logic
│   ├── App.css                         # Global CSS styles
│   ├── App.jsx                         # Root React component
│   └── main.jsx                        # Entry point for the React application
├── .eslintrc.cjs
├── index.html
├── package.json
├── vite.config.js
└── README.md                           # This file
```
## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

-   Node.js (v14 or higher recommended)

-   npm or yarn

### Installation

1. **Clone the repository:**

```
git clone
cd <your-project-folder>
```

2. **Install dependencies:**
```
npm install
# or
yarn install
```

### Running the Application

1. **Start the development server:**
```
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to `http://localhost:5173` (or the port indicated in your terminal).

## Usage

-   **Navigate:** Use the "Next" and "Back" buttons in the footer to move through the workflow steps.

-   **Make Selections:** Choose options using radio buttons or checkboxes.

-   **"Select All" (where available):** Use the "Select all" checkbox to quickly select/deselect all options for a step.

-   **Progress Bar:** Click on completed steps or the "Review" step (once enabled) to navigate directly to them.

-   **Save Progress:** Click "Save and Finish Later" to store your current selections in local storage. Your progress will be loaded automatically when you revisit the application.

-   **Review:** On the final step, a summary of your selections will be displayed. The "Save Draft" button on this step will clear your local storage, simulating a final submission/reset.

## Configuration

The workflow structure, steps, prompts, and categories are defined in `src/api/data.json`. You can modify this file to customize the workflow:

-   Add, remove, or reorder steps.

-   Change prompts and sub-prompts.

-   Adjust category names and add `text` properties for specific display needs.

-   Set `selectAll: true` for steps that should use checkboxes with a "Select all" option.

-   Set `subStep: true` for steps that should not appear directly in the main progress bar.

## Future Enhancements

-   **Validation:** Add client-side validation to steps (e.g., "select at least one option").

-   **Dynamic Step Generation:** Allow adding/removing steps dynamically based on earlier selections.

-   **Backend Integration:** Save/load workflow progress from a backend API instead of local storage.

-   **Accessibility Improvements:** Further enhance ARIA attributes and keyboard navigation.

-   **Theming:** Implement a theming system for easier style customization.

-   **Unit/Integration Tests:** Add tests for components and helper functions.
