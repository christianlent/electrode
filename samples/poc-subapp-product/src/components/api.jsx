export async function fetchProduct(itemId) {
    return (await fetch(`/api/product?itemId=${itemId}`)).json();
}

export async function fetchReviews(itemId) {
    return (await fetch(`/api/review?itemId=${itemId}`)).json();
}

export function getItemId() {
    const match = document.location.pathname.match(/product\/([0-9]+)/);
    if (match && match.length > 1) {
        return match[1];
    }
    // Instant Pot
    return '55505580';
}