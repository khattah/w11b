// Product information
const products = [
    {
        id: 1,
        name: "Sudanese Coffee",
        price: 12.99,
        image: "https://placehold.co/300x200?text=Sudanese+Coffee"
    },
    {
        id: 2,
        name: "Sudanese Toub",
        price: 45.00,
        image: "https://placehold.co/300x200?text=Sudanese+Toub"
    },
    {
        id: 3,
        name: "Sudanese Spices",
        price: 8.50,
        image: "https://placehold.co/300x200?text=Sudanese+Spices"
    },
    {
        id: 4,
        name: "Handmade Basket",
        price: 25.00,
        image: "https://placehold.co/300x200?text=Handmade+Basket"
    }
];

// Read the existing cart cookie
function getCart() {
    const savedCart = Cookies.get("shoppingCart");

    if (savedCart) {
        try {
            const cart = JSON.parse(savedCart);
            return Array.isArray(cart) ? cart : [];
        } catch (error) {
            console.error("Invalid shopping cart cookie:", error);
        }
    }

    return [];
}

// Add selected product to cart
function addToCart(productId) {

    const selectedProduct = products.find(
        product => product.id === productId
    );

    if (!selectedProduct) {
        return;
    }

    // Get existing items first
    const cart = getCart();

    // Add another object to the array
    cart.push({ ...selectedProduct });

    // Save updated array in the cookie
    Cookies.set("shoppingCart", JSON.stringify(cart), {
        expires: 7,
        sameSite: "Lax"
    });

    updateCartCount();

    alert(selectedProduct.name + " added to cart!");
}

// Update number of items
function updateCartCount() {
    const cart = getCart();

    document.getElementById("cart-count").textContent = cart.length;
}

// Display saved cart count when page loads
updateCartCount();