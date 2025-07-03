import { IoCheckmarkSharp } from "react-icons/io5";
import { baseIndicatorStyle } from "./styles/styles";

/**
 * CompletedStep Component
 * Represents a step in the workflow progress bar that has been successfully completed.
 * It displays the step's name, a distinct indicator circle with a checkmark icon,
 * and is clickable to allow navigation back to this completed step.
 */
export default function CompletedStep({
	name, // The display name of the completed step (e.g., "Criteria", "Trigger")
	goToStep, // A function to call when the step is clicked, typically to navigate back to this step.
	index, // The original index of this step in the workflow data, passed to `goToStep`.
}) {
	return (
		<>
			{/*
        The visual indicator for the completed step.
        - `onClick={() => goToStep(index)}`: Makes the indicator clickable,
          triggering navigation back to this step's original index.
        - `baseIndicatorStyle`: Provides common styling (width, height, shape, text size).
        - `bg-[#0E700E] border-[#0E700E]`: Specific styling for a completed step,
          using a distinct green background and border.
      */}
			<div
				onClick={() => goToStep(index)}
				className={`${baseIndicatorStyle} bg-[#0E700E] border-[#0E700E] flex justify-center items-center text-white cursor-pointer`}
				role="button" // Indicate this div acts as a button
				aria-label={`Go to ${name} step (completed)`} // Descriptive label for screen readers
				tabIndex={0} // Make it focusable by keyboard
			>
				<IoCheckmarkSharp aria-hidden="true" />
			</div>
			{name}
		</>
	);
}
