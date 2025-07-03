// Save and finish later functionality
/**
 * Defines the key used to store and retrieve workflow selections in localStorage.
 */
const LOCAL_STORAGE_KEY = "workflowSelections";

/**
 * Saves the current workflow selections object to the browser's local storage.
 * The object is first serialized into a JSON string.
 * @param {object} workflowSelections - The object containing all workflow selections to be saved.
 */
export const saveWorkflowSelectionsToLocalStorage = (workflowSelections) => {
	try {
		// Convert the JavaScript object into a JSON string as localStorage only stores strings.
		const serializeWorkflowSelections = JSON.stringify(workflowSelections);
		localStorage.setItem(LOCAL_STORAGE_KEY, serializeWorkflowSelections);
		console.log("Workflow selections saved to localStorage.");
	} catch (error) {
		// Log any errors that occur during the saving process (e.g., storage limit exceeded).
		console.error(
			"Error saving workflow selections to localStorage:",
			error
		);
	}
};

/**
 * Loads workflow selections from the browser's local storage.
 * The retrieved JSON string is parsed back into a JavaScript object.
 * @returns {object | null} The loaded workflow selections object, or `null` if no data is found
 * or if an error occurs during parsing/retrieval.
 */
export const loadWorkflowSelectionsFromLocalStorage = () => {
	try {
		// Retrieve the serialized workflow selections string from localStorage.
		const serializeWorkflowSelections =
			localStorage.getItem(LOCAL_STORAGE_KEY);

		// If no data is found under the specified key, return null.
		if (serializeWorkflowSelections === null) {
			return null;
		}

		// Parse the JSON string back into a JavaScript object.
		const workflowSelections = JSON.parse(serializeWorkflowSelections);
		return workflowSelections;
	} catch (error) {
		// Log any errors that occur during the loading or parsing process.
		console.error(
			"Error loading workflow selections from localStorage:",
			error
		);
		return null; // Return null on error to indicate failure to load.
	}
};

/**
 * Clears the saved workflow selections from the browser's local storage.
 * This effectively removes the persistent data for the workflow.
 */
export const clearWorkflowSelectionsFromLocalStorage = () => {
	try {
		localStorage.removeItem(LOCAL_STORAGE_KEY);
		console.log("Workflow selections cleared from localStorage.");
	} catch (error) {
		// Log any errors that occur during the removal process.
		console.error(
			"Error clearing workflow selections from localStorage:",
			error
		);
	}
};
