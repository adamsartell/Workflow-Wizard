/**
 * SaveButton Component
 * A reusable button specifically for saving workflow progress to be finished later.
 */
export default function SaveButton({ onClick }) {
	return (
		<button
			onClick={onClick}
			className="text-[#1849a9] text-[14px] font-medium cursor-pointer"
		>
			Save and Finish Later
		</button>
	);
}
