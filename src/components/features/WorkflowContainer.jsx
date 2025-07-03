import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import ProgressContainer from "./Progress/Progress"; // Assuming path is correct
import Prompt from "./Content/Prompt";
import Selection from "./Content/Selection";

/**
 * WorkflowContainer Component
 * The main container component for the entire workflow interface.
 * It orchestrates the layout and rendering of different sections
 * of the workflow, including the header, progress bar, current step's prompt,
 * selection options, and navigation footer.
 */
export default function WorkflowContainer() {
	return (
		<div className="w-[420px] bg-white rounded-sm text-black">
			{/* Header section of the workflow, displaying its name and a close button */}
			<Header />

			{/* Progress bar visually indicating the user's position and completed steps */}
			<ProgressContainer />

			{/* Displays the instructional text for the current workflow step */}
			<Prompt />

			{/* Renders the interactive selection options (radio buttons or checkboxes) for the current step */}
			<Selection />

			{/* Footer section containing navigation and action buttons (Back, Save, Next) */}
			<Footer />
		</div>
	);
}
