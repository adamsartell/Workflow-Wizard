import { IoMdArrowBack } from "react-icons/io";

/**
 * BackButton Component
 * A reusable button for navigating to the previous step in a workflow.
 * It features an arrow icon and text, styled as an underlined link.
 */
export default function BackButton({ onClick }) {
	return (
		<button
			type="button"
			aria-label="Go back to previous step"
			className="
        underline text-[#2f6de9] flex items-center gap-1 text-[12px] cursor-pointer
      "
			onClick={onClick}
		>
			<IoMdArrowBack aria-hidden="true" />
			Back
		</button>
	);
}
