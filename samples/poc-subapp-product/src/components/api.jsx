export async function fetchProduct(itemId) {
    return (await fetch(`/api/product?itemId=${itemId}`)).json();
}

export async function fetchReviews(itemId) {
    return (await fetch(`/api/review?itemId=${itemId}`)).json();
}
