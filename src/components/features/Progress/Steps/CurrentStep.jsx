import { baseIndicatorStyle } from "./styles/styles";

/**
 * CurrentStep Component
 * Represents the actively selected or current step in the workflow progress bar.
 * It displays the step's name and a distinct indicator circle to highlight its status.
 * This component is not typically clickable as it represents the user's current position.
 */
export default function CurrentStep({ name }) {
	return (
		<>
			{/*
        The visual indicator for the current step.
        - `baseIndicatorStyle`: Provides common styling (width, height, shape, text size).
        - `border-[#d1d1d1] bg-white`: Specific styling for the current step,
          making it visually distinct (e.g., white background with a border).
          This step is usually not clickable as it's the active one.
      */}
			<div
				className={`${baseIndicatorStyle} border-[#d1d1d1] bg-white`}
				aria-current="step" // Indicates this is the current item in a set of steps
				aria-label={`Current step: ${name}`} // More explicit label for screen readers
			></div>
			{name}
		</>
	);
}
