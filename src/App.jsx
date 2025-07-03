import WorkflowContainer from "./components/features/WorkflowContainer";
import { WorkflowProvider } from "./context/WorkflowProvider";
import data from "./api/data.json";

import "./App.css"; // Global CSS for the application

/**
 * App Component
 * The root component of the application.
 * It sets up the main layout and provides the workflow context
 * to the entire workflow interface.
 */
function App() {
	return (
		// Main application container, centering its content vertically and horizontally.
		// `h-svh` ensures it takes the full height of the viewport.
		<div className="flex h-svh justify-center items-center">
			{/*
        WorkflowProvider: Wraps the WorkflowContainer to provide workflow-related
        state, functions, and data via React Context.
        - `workflowData={data}`: Passes the initial workflow configuration
          loaded from `data.json` to the provider.
      */}
			<WorkflowProvider workflowData={data}>
				{/*
          WorkflowContainer: The main component that renders the entire
          workflow UI (header, progress, prompt, selections, footer).
          It consumes the context provided by WorkflowProvider.
        */}
				<WorkflowContainer />
			</WorkflowProvider>
		</div>
	);
}

export default App;
