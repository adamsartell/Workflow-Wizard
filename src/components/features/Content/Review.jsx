import React from "react"; // Ensure React is imported if using JSX

/**
 * Review Component
 * Displays a summary of the user's selections from previous workflow steps.
 * It pulls specific data points from `workflowSelections` to construct a
 * human-readable summary of the configured workflow.
 */
export default function Review({
	workflowSelections, // The object containing all user selections for each workflow step.
}) {
	// Accessing selections for 'criteriaStep'.
	// Expects workflowSelections["criteriaStep"] to be an object like { name: "...", completed: true }.
	// Using optional chaining (`?.`) for safety in case the selection is not yet present.
	const criteria = workflowSelections?.criteriaStep?.name?.toLowerCase();

	// Accessing selections for 'actionStep'.
	// Expects workflowSelections["actionStep"] to be an object like { name: "...", text: "...", completed: true }.
	const action = workflowSelections?.actionStep?.text?.toLowerCase();

	// Accessing selections for 'criteriaStep2'.
	// Expects workflowSelections["criteriaStep2"] to be an object like { types: [...], completed: true }.
	// Defaults to an empty array if 'types' is not found, to prevent errors during map.
	const criteria2 = workflowSelections?.criteriaStep2?.types || [];

	// Conditional rendering: Display a message if essential data is missing.
	// This prevents runtime errors if the user navigates to Review before
	// all necessary selections (criteriaStep, actionStep) are made.
	if (!criteria || !action) {
		return (
			<div className="p-2 bg-[#fafafa] border border-[#e0e0e0] rounded-sm text-[14px]">
				<p>
					Please complete all required steps to view the full workflow
					review.
				</p>
			</div>
		);
	}

	return (
		<div className="p-2 bg-[#fafafa] border border-[#e0e0e0] rounded-sm text-[14px]">
			{/* Summary sentence combining selections from criteriaStep and actionStep */}
			<p>{`When any of the following ${criteria} types is created, ${action}.`}</p>
			<ul className="pt-2">
				{/* List of selected items from criteriaStep2 */}
				{criteria2.map((categoryName, index) => (
					<li key={index} className="list-disc ml-5">
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
}
