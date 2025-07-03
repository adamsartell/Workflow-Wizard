/**
 * RadioInput Component
 * A custom wrapper for a native HTML radio button input.
 * It's designed to be visually hidden (`sr-only`) while remaining
 * accessible, allowing a custom UI (like a `Category` component)
 * to act as its visual control via a parent `<label>` element.
 */
export default function RadioInput({
	value, // The value associated with this radio button when it's selected.
	name, // The name attribute, crucial for grouping radio buttons so only one can be selected within the group.
	onChange, // The event handler function to call when the radio button's state changes.
	checked, // Boolean indicating whether this radio button is currently checked (controlled component).
}) {
	return (
		<input
			// `sr-only` class visually hides the input but keeps it accessible to screen readers.
			className="sr-only"
			type="radio"
			value={value}
			name={name}
			onChange={onChange}
			checked={checked}
		/>
	);
}
