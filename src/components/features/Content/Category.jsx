import { icons } from "../../../utils/Icons";
import reformatName from "../../../utils/formatters";

/**
 * Category Component
 * Renders a visual representation of a single category option within a workflow step.
 * It displays an icon (if available), the category name, and provides visual feedback
 * when the category is selected. It's designed to be clickable via its parent <label>.
 */
export default function Category({
	name, // The display name of the category (e.g., "Company", "Password", "Add flag")
	selected, // Boolean indicating whether this category is currently selected by the user.
}) {
	return (
		<div
			className={`
        p-2 w-full border rounded-sm flex items-center gap-2 cursor-pointer
        hover:bg-[#DEEAF8]
        ${selected ? "border-[#1849a9] border-2 bg-[#DEEAF8]" : ""}
      `}
		>
			{/*
        Displays an icon associated with the category.
        - `reformatName(name)`: Transforms the category name (e.g., "Company KB article" to "companyKbArticle")
          to match the keys in the `icons` object.
        - `icons[reformatName(name)]`: Accesses the corresponding JSX icon component from the `icons` map.
        - The icon will only render if a matching key exists in the `icons` object.
      */}
			<span aria-hidden="true">{icons[reformatName(name)]}</span>
			{name}
		</div>
	);
}
