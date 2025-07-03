// utils/selectionHelpers.js

/**
 * Determines if a specific category item is currently selected within the workflow selections for a given step.
 * It intelligently handles different storage formats (single object for radios, array of strings for checkboxes).
 *
 * @param {object} workflowSelections - The entire workflowSelections object from context.
 * @param {string} categoryId - The ID of the current step (e.g., 'criteriaStep', 'criteriaStep2').
 * @param {object} category - The category object being checked (e.g., { name: "Company" }).
 * @param {boolean} isSelectAllStep - Indicates if the current step uses a "Select All" (checkbox) mechanism.
 * @returns {boolean} True if the item is selected, false otherwise.
 */
export const isItemSelected = (
	workflowSelections,
	categoryId,
	category,
	isSelectAllStep
) => {
	const currentSelection = workflowSelections[categoryId];

	if (isSelectAllStep) {
		// For checkbox steps (e.g., 'criteriaStep2'), selection is stored as { types: [...], completed: true }.
		// We check if the category's name is present in the 'types' array.
		return (
			typeof currentSelection === "object" &&
			currentSelection !== null &&
			Array.isArray(currentSelection.types) &&
			currentSelection.types.includes(category.name)
		);
	} else {
		// For radio button steps (e.g., 'criteriaStep', 'actionStep', 'triggerStep'),
		// selection is stored as a single object { name: "...", text: "...", completed: true }.
		// We check if the stored object's 'name' matches the category's name.
		return (
			typeof currentSelection === "object" &&
			currentSelection !== null &&
			currentSelection.name === category.name
		);
	}
};

/**
 * Determines the appropriate value format to store in `workflowSelections` for a given category.
 * This function differentiates between radio button steps (which store objects)
 * and checkbox steps (which store simple strings).
 *
 * @param {string} currentStepId - The ID of the current workflow step.
 * @param {object} category - The category object being processed.
 * @param {boolean} isSelectAllStep - Indicates if the current step uses a "Select All" (checkbox) mechanism.
 * @returns {string | object} The value to be stored: a string (category name) for checkboxes,
 * or an object { name, text, completed: true } for radio buttons.
 */
export const getValueToStore = (currentStepId, category, isSelectAllStep) => {
	if (!isSelectAllStep) {
		// If it's a radio button step (e.g., criteriaStep, actionStep, triggerStep),
		// store the full object including name, text, and completed status.
		return {
			name: category.name,
			text: category.text || category.name, // Use text if available, fallback to name
			completed: true,
		};
	} else {
		// If it's a checkbox step (e.g., criteriaStep2),
		// only the category name (as a string) is needed for the 'types' array.
		return category.name;
	}
};

/**
 * Handles the selection logic for a single-choice input (radio button).
 * It updates the workflow state with the new single selection.
 *
 * @param {function} updateStepSelection - The function from `useWorkflow` to update a step's selection.
 * @param {string} categoryId - The ID of the step whose selection is being updated.
 * @param {string | object} valueToStore - The value to store for the selection (string for basic radios, object for actionStep radio).
 */
export const handleRadioSelection = (
	updateStepSelection,
	categoryId,
	valueToStore
) => {
	// `valueToStore` is already in the correct format (string or object)
	// as determined by `getValueToStore`.
	updateStepSelection(categoryId, valueToStore);
};

/**
 * Handles the selection logic for multiple-choice inputs (checkboxes).
 * It manages adding or removing items from the selection array and updates the workflow state.
 *
 * @param {function} updateStepSelection - The function from `useWorkflow` to update a step's selection.
 * @param {object | undefined} currentWorkflowSelectionForStep - The current selection object for the step (e.g., { types: [], completed: true } or undefined).
 * @param {string} categoryId - The ID of the step whose selection is being updated.
 * @param {string} valueToStore - The value to add/remove (expected to be `category.name` string for checkboxes).
 * @param {boolean} isChecked - True if the checkbox was checked, false if unchecked.
 */
export const handleCheckboxSelection = (
	updateStepSelection,
	currentWorkflowSelectionForStep,
	categoryId,
	valueToStore,
	isChecked
) => {
	// Extract the current 'types' array, defaulting to an empty array if not present.
	let currentTypes = currentWorkflowSelectionForStep?.types || [];
	let newTypes;

	if (isChecked) {
		// If checked, add the value to the array if it's not already present.
		if (!currentTypes.includes(valueToStore)) {
			newTypes = [...currentTypes, valueToStore];
		} else {
			newTypes = currentTypes; // Value already exists, no change needed.
		}
	} else {
		// If unchecked, filter the value out of the array.
		newTypes = currentTypes.filter((item) => item !== valueToStore);
	}

	// Update the selection for the step, ensuring it's always in the
	// { types: [...], completed: true } format for checkbox steps.
	updateStepSelection(categoryId, {
		types: newTypes,
		completed: true, // Mark step as completed once any selection is made/cleared.
	});
};

/**
 * Determines whether the "Select all" checkbox for a given step should be visually checked.
 * This is based on whether all categories for that step are currently selected.
 *
 * @param {object} workflowSelections - The entire workflowSelections object from context.
 * @param {object} currentStep - The current step object from `workflowData`.
 * @param {string} categoryId - The ID of the current step.
 * @returns {boolean} True if all categories are selected, false otherwise.
 */
export const getIsSelectAllChecked = (
	workflowSelections,
	currentStep,
	categoryId
) => {
	// If the step does not have `selectAll` functionality, the checkbox should not be checked.
	if (!currentStep.selectAll) {
		return false;
	}

	const currentSelectionForStep = workflowSelections[categoryId];
	// Extract the 'types' array from the current selection for the step, defaulting to empty.
	const currentTypes = currentSelectionForStep?.types || [];
	const allCategoriesCount = currentStep.categories?.length || 0;
	const allCategoryNames = currentStep.categories.map((cat) => cat.name);

	// A step's "Select all" is checked if:
	// 1. There are categories to select (`allCategoriesCount > 0`).
	// 2. The number of currently selected items matches the total number of categories.
	// 3. Every category name is present in the `currentTypes` array.
	const allSelected =
		allCategoriesCount > 0 &&
		currentTypes.length === allCategoriesCount &&
		allCategoryNames.every((name) => currentTypes.includes(name));

	return allSelected;
};
