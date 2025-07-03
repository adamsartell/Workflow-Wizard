import { baseIndicatorStyle } from "./styles/styles";

/**
 * Step Component
 * Represents a single, non-completed step in the workflow progress bar.
 * It displays the step's name and an indicator circle.
 * It can optionally be clickable if a `goToStep` function is provided.
 */
export default function Step({
	name, // The display name of the step (e.g., "Criteria", "Trigger")
	goToStep, // Optional: A function to call when the step is clicked.
}) {
	return (
		<>
			{/*
        The visual indicator for the step.
        - `baseIndicatorStyle`: Provides common styling (width, height, shape, text size).
        - `border-[#d1d1d1] bg-[#F0F0F0]`: Specific styling for a non-completed, non-current step.
      */}
			<div
				{...(goToStep && { onClick: goToStep })}
				className={`${baseIndicatorStyle} ${
					goToStep ? "cursor-pointer" : ""
				} border-[#d1d1d1] bg-[#F0F0F0]`}
				role={goToStep ? "button" : undefined} // Add role="button" if clickable
				aria-label={goToStep ? `Go to ${name} step` : undefined} // Add aria-label if clickable
				tabIndex={goToStep ? 0 : undefined} // Make focusable if clickable
			></div>
			{name}
		</>
	);
}
