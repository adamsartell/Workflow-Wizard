import { useWorkflow } from "../../../context/useWorkflow";
import CompletedStep from "./Steps/CompletedStep";
import CurrentStep from "./Steps/CurrentStep";
import Step from "./Steps/Step";

/**
 * ProgressContainer Component
 * Displays the visual progress bar for the workflow, showing completed, current,
 * and upcoming steps. It handles the logic for determining a step's status
 * based on workflow data and user selections, including special handling
 * for sub-steps and the final review stage.
 */
export default function ProgressContainer() {
	const {
		currentStepIndex, // The actual index of the current step in workflowData.steps
		goToStep, // Function to navigate to a specific step index
		workflowData, // Full workflow configuration (steps, prompts, categories)
		workflowSelections, // User's selections for each step (from context)
		// totalSteps is not directly used here, as visibleSteps.length serves for visible count
	} = useWorkflow();

	/**
	 * Filters out sub-steps from the main workflow data.
	 * This array represents the steps that are visually displayed in the progress bar.
	 */
	const visibleSteps = workflowData.steps.filter((step) => !step.subStep);

	/**
	 * Determines the ID of the step that should be highlighted as 'Current' in the progress bar.
	 * This is crucial because `currentStepIndex` might point to a sub-step that isn't
	 * directly displayed in `visibleSteps`.
	 */
	const actualCurrentStepData = workflowData.steps[currentStepIndex];
	let stepIdToHighlight = actualCurrentStepData?.id;

	// If the user is on a sub-step, we need to map it to its corresponding
	// main step for display in the progress bar.
	if (actualCurrentStepData?.subStep) {
		if (actualCurrentStepData.id === "criteriaStep2") {
			stepIdToHighlight = "criteriaStep"; // Map criteriaStep2 to criteriaStep in the UI
		}
	}

	/**
	 * Finds the index of the step that should be 'Current' within the `visibleSteps` array.
	 * This ensures the correct visual highlighting in the progress bar.
	 */
	const visibleCurrentStepIndex = visibleSteps.findIndex(
		(step) => step.id === stepIdToHighlight
	);

	/**
	 * Determines if all visible steps *before* the 'Review' step are completed.
	 * This is used to enable/disable navigation to the 'Review' step.
	 */
	const areAllPreviousVisibleStepsCompleted = visibleSteps.every((step) => {
		// The 'Review' step itself doesn't need to be completed for previous steps to be done.
		if (step.id === "reviewStep") {
			return true;
		}

		const stepSelection = workflowSelections[step.id];
		let isCurrentStepCompleted = stepSelection?.completed === true;

		// Special logic for 'criteriaStep': It's only considered complete if
		// both 'criteriaStep' itself AND its sub-step 'criteriaStep2' are completed.
		if (step.id === "criteriaStep") {
			const criteriaStep2Selection = workflowSelections["criteriaStep2"];
			const isCriteriaStepSelfCompleted =
				stepSelection?.completed === true;
			const isCriteriaStep2Completed =
				criteriaStep2Selection?.completed === true;
			isCurrentStepCompleted =
				isCriteriaStepSelfCompleted && isCriteriaStep2Completed;
		}

		return isCurrentStepCompleted;
	});

	return (
		<div
			className="flex items-center justify-between px-4 mt-2 mb-3"
			role="navigation"
			aria-label="Workflow progress steps"
		>
			{visibleSteps.map((step, index) => {
				// Retrieve selection data for the current step in the loop
				const stepSelection = workflowSelections[step.id];
				// Retrieve selection data for criteriaStep2 (needed for criteriaStep completion logic)
				const criteriaStep2Selection =
					workflowSelections["criteriaStep2"];

				// Determine if the current step (in the loop) is completed based on its own selection.
				let isStepCompletedInSelections =
					stepSelection?.completed === true;

				// Apply the special completion logic for 'criteriaStep' here as well,
				// for displaying its status in the progress bar.
				if (step.id === "criteriaStep") {
					const isCriteriaStepSelfCompleted =
						stepSelection?.completed === true;
					const isCriteriaStep2Completed =
						criteriaStep2Selection?.completed === true;
					isStepCompletedInSelections =
						isCriteriaStepSelfCompleted && isCriteriaStep2Completed;
				}

				// Check if this is the last step in the visible progress bar.
				const isLastVisibleStep = index === visibleSteps.length - 1;

				// Find the original index of this visible step in the full workflowData.steps array.
				// This is necessary because `goToStep` expects the original index.
				const originalStepIndex = workflowData.steps.findIndex(
					(s) => s.id === step.id
				);

				let StepComponent; // Variable to hold the React component to render for this step

				// Logic to select the appropriate Step component (Current, Completed, or generic Step)
				if (index === visibleCurrentStepIndex) {
					// If this is the step the user is currently on (or its mapped parent)
					StepComponent = <CurrentStep name={step.name} />;
				} else if (isStepCompletedInSelections) {
					// If the step is marked as completed in workflowSelections
					StepComponent = (
						<CompletedStep
							name={step.name}
							goToStep={() => goToStep(originalStepIndex)} // Allow clicking to go back to this completed step
							index={index} // Visual index within visibleSteps
						/>
					);
				} else {
					// If it's a future step or an uncompleted past step
					// Determine if this step is navigable (clickable)
					const isNavigable =
						originalStepIndex < currentStepIndex || // Can navigate back to any previous actual step
						isStepCompletedInSelections || // Can navigate to any step explicitly marked as completed
						(step.id === "reviewStep" &&
							areAllPreviousVisibleStepsCompleted); // Review is navigable ONLY if all preceding steps are completed

					StepComponent = (
						<Step
							name={step.name}
							// Conditionally provide the goToStep function based on `isNavigable`
							goToStep={
								isNavigable
									? () => goToStep(originalStepIndex)
									: undefined
							}
							index={index} // Visual index within visibleSteps
						/>
					);
				}

				return (
					<div
						className="relative flex flex-col items-center text-[12px]"
						key={step.id}
					>
						{StepComponent}
						{!isLastVisibleStep && (
							<div
								aria-hidden="true"
								className="absolute left-[30px] z-10 top-[13px] -translate-y-1/2 w-[100px] h-[1px] bg-[#d1d1d1]"
							></div>
						)}
					</div>
				);
			})}
		</div>
	);
}
