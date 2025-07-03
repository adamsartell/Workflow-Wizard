import { useState, useEffect } from "react";
import { useWorkflow } from "../../../context/useWorkflow";
import RadioInput from "../../common/form/RadioInput";
import CheckboxInput from "../../common/form/CheckboxInput";
import Category from "./Category";
import Review from "./Review";
import {
	isItemSelected,
	getValueToStore,
	handleRadioSelection,
	handleCheckboxSelection,
	getIsSelectAllChecked,
} from "../../../utils/selectionLogic"; // Assuming this path is correct

/**
 * Selection Component
 * Renders the interactive selection interface for the current workflow step.
 * It dynamically displays radio buttons or checkboxes based on the step's configuration,
 * manages user selections, and updates the workflow state accordingly.
 */
export default function Selection() {
	const {
		totalSteps, // Total number of steps in the workflow
		workflowData, // Full workflow configuration (steps, prompts, categories)
		currentStepIndex, // The actual index of the current step in workflowData.steps
		workflowSelections, // User's selections for all steps (from context)
		updateStepSelection, // Function to update user selections in the workflow context
	} = useWorkflow();

	// Get the data for the currently active step.
	const currentStep = workflowData.steps[currentStepIndex];
	// Get the unique ID for the current step, used for storing selections.
	const categoryId = currentStep?.id;

	/**
	 * Local state to control the `checked` status of the "Select all" checkbox.
	 * Its value is derived from `workflowSelections` using `getIsSelectAllChecked` helper.
	 */
	const [isSelectAllChecked, setIsSelectAllChecked] = useState(() =>
		getIsSelectAllChecked(workflowSelections, currentStep, categoryId)
	);

	/**
	 * Effect to update `isSelectAllChecked` whenever relevant dependencies change.
	 * This keeps the "Select all" checkbox's visual state in sync with the actual
	 * selections stored in `workflowSelections`.
	 */
	useEffect(() => {
		setIsSelectAllChecked(
			getIsSelectAllChecked(workflowSelections, currentStep, categoryId)
		);
	}, [
		currentStepIndex,
		workflowSelections,
		categoryId,
		currentStep.categories,
		currentStep.selectAll,
		currentStep, // Included currentStep for robustness in case its properties change
	]);

	/**
	 * Handles changes for radio button selections.
	 * It determines the value to store (string or object) and updates the workflow state.
	 * @param {Event} e - The DOM event object from the input.
	 * @param {object} category - The category object associated with the clicked radio button.
	 */
	const onRadioChange = (e, category) => {
		// `getValueToStore` returns the appropriate format:
		// - { name, text, completed: true } object for 'actionStep'
		// - category.name string for other radio button steps
		const valueToStore = getValueToStore(
			currentStep.id,
			category,
			currentStep.selectAll // Pass selectAll to differentiate radio/checkbox logic in helper
		);
		handleRadioSelection(updateStepSelection, categoryId, valueToStore);
	};

	/**
	 * Handles changes for checkbox selections.
	 * It manages adding/removing items from the selection array and updates the workflow state.
	 * @param {Event} e - The DOM event object from the input.
	 * @param {object} category - The category object associated with the clicked checkbox.
	 */
	const onCheckboxChange = (e, category) => {
		// `getValueToStore` returns the category.name string for checkbox steps.
		const valueToStore = getValueToStore(
			currentStep.id,
			category,
			currentStep.selectAll // Pass selectAll to differentiate radio/checkbox logic in helper
		);
		// Pass the current selection object for the step to the helper,
		// which will then extract/update the 'types' array within it.
		const currentSelections = workflowSelections[categoryId];
		handleCheckboxSelection(
			updateStepSelection,
			currentSelections,
			categoryId,
			valueToStore,
			e.target.checked
		);
	};

	/**
	 * Handles the "Select all" checkbox change.
	 * It updates the workflow state to either select all categories for the current step
	 * or clear all selections for that step.
	 * @param {Event} e - The DOM event object from the "Select all" checkbox.
	 */
	const onSelectAllChange = (e) => {
		const shouldSelectAll = e.target.checked;
		let newTypesArray = []; // This array will hold the names of selected categories

		if (shouldSelectAll) {
			// For steps with `selectAll: true` (e.g., criteriaStep2), collect all category names.
			// Note: This logic correctly assumes these categories don't need 'text' stored in workflowSelections.
			newTypesArray = currentStep.categories.map(
				(category) => category.name
			);
		}
		// Update the selection for the step to the desired object format:
		// { types: [...], completed: true }
		updateStepSelection(categoryId, {
			types: newTypesArray,
			completed: true, // Mark step as completed when select all is toggled
		});
	};

	return (
		<div className="px-4 my-4">
			{/* Render selection form only if not on the final review step */}
			{currentStepIndex < totalSteps && (
				<form className="flex flex-col gap-2">
					{currentStep.categories.map((category, index) => (
						<label
							key={index} // Using index as key is acceptable here since the list order is stable and items aren't reordered/deleted
							className="flex items-center gap-2 cursor-pointer"
						>
							{/* Conditionally render RadioInput or CheckboxInput based on `currentStep.selectAll` */}
							{!currentStep.selectAll ? ( // If `selectAll` is false, use RadioInput (e.g., criteriaStep, actionStep, triggerStep)
								<RadioInput
									value={category.name} // Input value is the category's name string
									name={categoryId} // Groups radio buttons by step ID
									onChange={(e) => onRadioChange(e, category)} // Pass event and category object
									checked={isItemSelected(
										// Determine checked status using helper
										workflowSelections,
										categoryId,
										category,
										currentStep.selectAll
									)}
								/>
							) : (
								// If `selectAll` is true, use CheckboxInput (e.g., criteriaStep2)
								<CheckboxInput
									value={category.name} // Input value is the category's name string
									onChange={(e) =>
										onCheckboxChange(e, category)
									} // Pass event and category object
									checked={isItemSelected(
										// Determine checked status using helper
										workflowSelections,
										categoryId,
										category,
										currentStep.selectAll
									)}
								/>
							)}
							{/* Category component displays the visual label for the input */}
							<Category
								name={category.name}
								selected={isItemSelected(
									// Determine visual selected status using helper
									workflowSelections,
									categoryId,
									category,
									currentStep.selectAll
								)}
							/>
						</label>
					))}
				</form>
			)}
			{/* Render "Select all" option only if `currentStep.selectAll` is true */}
			{currentStep.selectAll && (
				<div className="mt-2">
					<label
						className="flex items-center gap-1 text-[14px] cursor-pointer"
						htmlFor="selectAllCheckbox"
					>
						{/* The actual "Select all" checkbox */}
						<input
							type="checkbox"
							id="selectAllCheckbox"
							onChange={onSelectAllChange} // Handles the "select all" logic
							checked={isSelectAllChecked} // Controls the checkbox's checked state
						/>
						Select all
					</label>
				</div>
			)}
			{/* Render the Review component when on the final step */}
			{currentStepIndex === totalSteps - 1 && (
				<Review workflowSelections={workflowSelections} />
			)}
		</div>
	);
}
