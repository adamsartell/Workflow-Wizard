/**
 * NextButton Component
 * A reusable button for navigating forward in the workflow.
 * It features dynamic text and a disabled state based on workflow progress or validation.
 */
export default function NextButton({
	onClick, // Function to be called when the button is clicked (e.g., goToNextStep, clearLocalStorage).
	text, // The text displayed on the button (e.g., "Next", "Save Draft").
	disabled, // Boolean indicating whether the button should be disabled (unclickable).
}) {
	return (
		<button
			className="
        rounded-md bg-[#1849A9] py-[8px] px-[16px] text-white text-[14px] font-medium cursor-pointer
        disabled:bg-[#ccc] disabled:cursor-not-allowed
      "
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
	);
}
