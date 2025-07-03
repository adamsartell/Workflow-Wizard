import { useContext } from "react";
import { WorkflowContext } from "./WorkflowContext";

/**
 * useWorkflow Hook
 * A custom React hook that provides convenient access to the WorkflowContext.
 * This hook allows any functional component within the WorkflowProvider's
 * tree to easily consume workflow-related state and functions
 * (e.g., current step, selections, navigation actions) without prop drilling.
 *
 * @returns {object} An object containing all values provided by the WorkflowContext.
 */
export const useWorkflow = () => useContext(WorkflowContext);
