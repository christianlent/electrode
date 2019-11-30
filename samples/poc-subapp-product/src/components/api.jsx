export function getItemId() {
    const match = document.location.pathname.match(/product\/([0-9]+)/);
    if (match && match.length > 1) {
        return match[1];
    }
    // Instant Pot
    return '55505580';
}