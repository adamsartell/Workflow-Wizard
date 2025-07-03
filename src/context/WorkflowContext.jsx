import { createContext } from "react";

/**
 * WorkflowContext
 * A React Context object that will hold the state and functions
 * related to the workflow's progress, user selections, and navigation.
 *
 * It is consumed by the `useWorkflow` hook and provided by the `WorkflowProvider` component.
 *
 * @type {React.Context<object>}
 */
export const WorkflowContext = createContext();
