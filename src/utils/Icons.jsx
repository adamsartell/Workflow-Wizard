import {
	LuBuilding2,
	LuBookText,
	LuGlobe,
	LuCalendar,
	LuUser,
	LuUsers,
	LuPlug,
	LuKeyRound,
	LuCheck,
	LuRows3,
	LuNetwork,
	LuCircle,
	LuPlus,
	LuFilePen,
	LuFlag,
	LuMail,
	LuWebhook,
} from "react-icons/lu";

/**
 * Icons Configuration
 * This file exports a mapping of string keys to React icon components
 * from the 'lucide-react' library (imported as 'react-icons/lu').
 * This allows for dynamic rendering of icons based on category names
 * or other identifiers in the workflow data.
 */
export const icons = {
	// --- Criteria Step Icons ---
	company: <LuBuilding2 />,
	record: <LuBookText />,
	website: <LuGlobe />,
	expiration: <LuCalendar />,
	user: <LuUser />,
	group: <LuUsers />,
	integration: <LuPlug />,

	// --- Criteria Step 2 Icons (Record Types) ---
	password: <LuKeyRound />,
	companyKbArticle: <LuBookText />,
	centralKbArticle: <LuBookText />,
	process: <LuCheck />,
	rack: <LuRows3 />,
	network: <LuNetwork />,
	asset: <LuCircle />,

	// --- Trigger Step Icons ---
	recordCreated: <LuPlus />,
	recordUpdated: <LuFilePen />,

	// --- Action Step Icons ---
	addFlag: <LuFlag />,
	sendEmail: <LuMail />,
	sendWebhook: <LuWebhook />,
};
