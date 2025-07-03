import { useWorkflow } from "../../../context/useWorkflow";
import { IoMdClose } from "react-icons/io";

/**
 * Header Component
 * Displays the workflow's name and a close/exit icon.
 * This component typically serves as the top bar of the workflow interface.
 */
export default function Header() {
	const {
		workflowData, // Contains the overall workflow configuration, including its name.
	} = useWorkflow();

	return (
		<div className="flex justify-between p-4">
			<p className="font-medium text-[14px]">{workflowData.name}</p>
			{/*
        Close icon, typically used to exit or cancel the workflow.
        - An `onClick` handler would typically be added here to define its behavior (e.g., close modal, navigate away).
      */}
			<button type="button" aria-label="Close workflow">
				<IoMdClose size={20} aria-hidden="true" />
			</button>
		</div>
	);
}
