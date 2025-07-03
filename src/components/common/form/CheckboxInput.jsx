/**
 * CheckboxInput Component
 * A custom wrapper for a native HTML checkbox input.
 * It's designed to be visually hidden (`sr-only`) while remaining
 * accessible, allowing a custom UI (like a `Category` component)
 * to serve as its clickable visual representation via a parent `<label>` element.
 */
export default function CheckboxInput({
	value, // The value associated with this checkbox when it's selected.
	onChange, // The event handler function to call when the checkbox's state changes.
	checked, // Boolean indicating whether this checkbox is currently checked (controlled component).
}) {
	return (
		<input
			// `sr-only` class visually hides the input but keeps it accessible to screen readers.
			className="sr-only"
			type="checkbox"
			value={value}
			onChange={onChange}
			checked={checked}
		/>
	);
}
