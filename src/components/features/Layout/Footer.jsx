import BackButton from "../../common/button/BackButton";
import NextButton from "../../common/button/NextButton";
import SaveButton from "../../common/button/SaveButton";
import { useWorkflow } from "../../../context/useWorkflow";

/**
 * Footer Component
 * Manages the navigation and action buttons (Back, Save, Next) for the workflow.
 * It dynamically controls button visibility, text, and disabled states
 * based on the current step and user selections.
 */
export default function Footer() {
	const {
		totalSteps, // Total number of steps in the workflow (including sub-steps)
		goToNextStep, // Function to navigate to the next step
		currentStepData, // Data for the currently active step (e.g., its ID)
		currentStepIndex, // Index of the current step in the workflow sequence
		goToPreviousStep, // Function to navigate to the previous step
		clearLocalStorage, // Function to clear workflow selections from local storage (used on final "Save Draft")
		workflowSelections, // Object containing all user selections for each step
		saveAndFinishLater, // Function to save progress without finishing (for the Save button)
	} = useWorkflow();

	// Defensive check: Ensure currentStepData and its ID are available before proceeding.
	// This prevents errors if the component renders before workflowData is fully loaded.
	if (!currentStepData || !currentStepData.id) {
		return null; // Or render a placeholder/loading state for the footer
	}

	// Get the selection data specifically for the current step.
	const currentStepSelection = workflowSelections[currentStepData.id];

	// Logic to determine if the 'Next' button should be disabled.
	// Default to true (disabled) for safety.
	let isNextButtonDisabled = true;

	// If there's a selection for the current step:
	if (currentStepSelection !== undefined && currentStepSelection !== null) {
		if (Array.isArray(currentStepSelection)) {
			// If the selection is an array (checkboxes), disable if the array is empty.
			isNextButtonDisabled = currentStepSelection.length === 0;
		} else {
			// If the selection is a single value (radio buttons or object), disable if it's an empty string.
			// This assumes an empty string or absence implies no selection.
			isNextButtonDisabled = currentStepSelection === "";
		}
	}
	// Special case: If on the very last step (Review), the 'Next' button should always be enabled
	// to allow saving the draft, regardless of selections on the review step itself.
	else if (currentStepIndex === totalSteps - 1) {
		isNextButtonDisabled = false;
	}

	// Determine justification for buttons (back button presence affects layout)
	const justifyContent =
		currentStepIndex > 0 ? "justify-between" : "justify-end";

	// Determine the text for the 'Next' button based on the current step
	const nextButtonText =
		currentStepIndex === totalSteps - 1 ? "Save Draft" : "Next";

	// Determine the onClick action for the 'Next' button.
	// On the last step, it clears local storage (implies final submission/reset).
	// Otherwise, it proceeds to the next step.
	const nextOnClick =
		currentStepIndex === totalSteps - 1 ? clearLocalStorage : goToNextStep;

	return (
		<div
			className={`flex w-full border-t border-[#d1d1d1] py-2 px-4 ${justifyContent}`}
		>
			{/* Back Button: Visible only if not on the first step */}
			{currentStepIndex > 0 && <BackButton onClick={goToPreviousStep} />}

			<div className="flex gap-8">
				{/* Save Button: Visible from the second step onwards */}
				{currentStepIndex >= 1 && (
					<SaveButton onClick={saveAndFinishLater} />
				)}
				{/* Next Button: Text and action change based on current step, disabled state is dynamic */}
				<NextButton
					onClick={nextOnClick}
					text={nextButtonText}
					disabled={isNextButtonDisabled}
				/>
			</div>
		</div>
	);
}
