export const removeCartFromStorage = () => {
    localStorage.removeItem('cart');
}

export const removeUserFromStorage = () => {
    localStorage.removeItem('token');
}