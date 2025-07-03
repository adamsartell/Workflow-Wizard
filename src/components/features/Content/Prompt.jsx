import { useWorkflow } from "../../../context/useWorkflow";

/**
 * Prompt Component
 * Displays the main prompt and an optional sub-prompt for the current workflow step.
 * This component guides the user on what information or selection is required for the step.
 */
export default function Prompt() {
	const {
		currentStepData, // Data for the currently active workflow step, including its prompts.
	} = useWorkflow();

	return (
		<div className="px-4 text-[16px]">
			{/* Displays the main instructional prompt for the current step */}
			<p>{currentStepData.prompt}</p>
			{/* Conditionally displays a sub-prompt if it exists in the current step's data */}
			{currentStepData.subPrompt && (
				<p className="text-[12px] my-1">{currentStepData.subPrompt}</p>
			)}
		</div>
	);
}
