import { useState, useEffect } from "react";
import { WorkflowContext } from "./WorkflowContext";
import {
	saveWorkflowSelectionsToLocalStorage,
	loadWorkflowSelectionsFromLocalStorage,
	clearWorkflowSelectionsFromLocalStorage,
} from "../utils/localStorage";

/**
 * WorkflowProvider Component
 * This component acts as the central state management for the entire workflow.
 * It provides workflow-related data (steps, selections, current progress)
 * and functions (navigation, selection updates, local storage operations)
 * to all its children components via the WorkflowContext.
 */
export const WorkflowProvider = ({
	children,
	workflowData, // The initial workflow configuration data (e.g., from a JSON file)
}) => {
	// State to track the current active step's index in the workflow.
	const [currentStepIndex, setCurrentStepIndex] = useState(0);

	// State to store all user selections across different workflow steps.
	// It attempts to load previously saved selections from local storage on initial render.
	const [workflowSelections, setWorkflowSelections] = useState(() => {
		const savedWorkflowSelections =
			loadWorkflowSelectionsFromLocalStorage();
		// Initialize with saved selections if found, otherwise an empty object.
		return savedWorkflowSelections || {};
	});

	// Total number of steps in the workflow, derived from workflowData.
	const totalSteps = workflowData.steps.length;

	// --- Local Storage Management ---

	/**
	 * Effect hook to automatically save workflow selections to local storage
	 * whenever `workflowSelections` state changes. This ensures data persistence.
	 */
	useEffect(() => {
		saveWorkflowSelectionsToLocalStorage(workflowSelections);
	}, [workflowSelections]);

	/**
	 * Saves the current `workflowSelections` to local storage.
	 * This is typically triggered by a "Save Draft" or "Save and Finish Later" action.
	 */
	function saveAndFinishLater() {
		saveWorkflowSelectionsToLocalStorage(workflowSelections);
	}

	/**
	 * Clears all workflow selections from local storage.
	 * This is typically triggered upon final submission or starting a new workflow.
	 */
	function clearLocalStorage() {
		clearWorkflowSelectionsFromLocalStorage();
	}

	// --- Navigation Functions ---

	/**
	 * Navigates to a specific step index in the workflow.
	 * Ensures the index stays within valid bounds (0 to totalSteps - 1).
	 * @param {number} stepIndex - The target step index to navigate to.
	 */
	function goToStep(stepIndex) {
		setCurrentStepIndex(Math.min(Math.max(0, stepIndex), totalSteps - 1));
	}

	/**
	 * Navigates to the next step in the workflow sequence.
	 * Prevents going beyond the last step.
	 */
	function goToNextStep() {
		setCurrentStepIndex((prevIndex) =>
			Math.min(prevIndex + 1, totalSteps - 1)
		);
	}

	/**
	 * Navigates to the previous step in the workflow sequence.
	 * Prevents going before the first step.
	 */
	function goToPreviousStep() {
		setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
	}

	/**
	 * Updates the selection for a specific workflow step.
	 * This function is crucial for managing user input for each step.
	 * @param {string} stepId - The unique ID of the step whose selection is being updated.
	 * @param {string | object | Array<string | object>} selection - The new selection value for the step.
	 * This can be a string (radio), an object (actionStep radio),
	 * or an array of strings/objects (checkboxes).
	 */
	function updateStepSelection(stepId, selection) {
		setWorkflowSelections((prevSelections) => ({
			...prevSelections, // Copy existing selections
			[stepId]: selection, // Update/add the selection for the specific stepId
		}));
	}

	// Derived state: Get the data for the current active step based on `currentStepIndex`.
	const currentStepData = workflowData.steps[currentStepIndex];

	return (
		<WorkflowContext.Provider
			value={{
				totalSteps,
				workflowData,
				currentStepIndex,
				currentStepData,
				workflowSelections,
				goToStep,
				goToNextStep,
				goToPreviousStep,
				clearLocalStorage,
				saveAndFinishLater,
				updateStepSelection,
			}}
		>
			{children}
		</WorkflowContext.Provider>
	);
};
