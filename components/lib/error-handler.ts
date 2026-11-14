export function getErrorMessage(error: unknown): string {
    const message =
        error instanceof Error
            ? error.message
            : String(error ?? "");

    // Authentication errors
    if (message.includes("You must be logged in")) {
        return "Your session has expired. Please log in again.";
    }

    if (message.includes("Only super-admins")) {
        return "You don't have permission to perform this action.";
    }

    if (message.includes("Invalid user session")) {
        return "Your session is invalid. Please log in again.";
    }

    // Team member errors
    if (message.includes("already exists")) {
        return "This email address is already registered.";
    }

    if (message.includes("Team member not found")) {
        return "This team member could not be found. Refresh and try again.";
    }

    if (message.includes("Name and email")) {
        return "Please provide the team member's name and email address.";
    }

    if (message.includes("Email address is required")) {
        return "Please enter a valid email address.";
    }

    // Network and server errors
    if (
        message.toLowerCase().includes("network") ||
        message.toLowerCase().includes("fetch failed")
    ) {
        return "Unable to connect to the server. Check your internet connection and try again.";
    }

    if (message.includes("ArgumentValidationError")) {
        return "Some information provided is invalid. Check the form and try again.";
    }

    return "We couldn't complete your request. Please try again.";
}