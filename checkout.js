// Read cart from cookie
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

// Display checkout items
function displayCart() {

    const cart = getCart();

    const cartItems = document.getElementById("cart-items");
    const totalPrice = document.getElementById("total-price");
    const cartSummary = document.getElementById("cart-summary");

    cartItems.innerHTML = "";

    // Show message if cart is empty
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your shopping cart is empty.
                Please select some products.
            </p>
        `;

        totalPrice.textContent = "0.00";
        cartSummary.style.display = "none";

        return;
    }

    cartSummary.style.display = "block";

    let total = 0;

    // Display every selected product
    cart.forEach(function(item, index) {

        const itemDiv = document.createElement("div");
        itemDiv.className = "cart-item";

        // Product image
        const image = document.createElement("img");
        image.src = item.image;
        image.alt = item.name;

        // Product information
        const details = document.createElement("div");

        const name = document.createElement("h3");
        name.textContent = item.name;

        const price = document.createElement("p");
        price.textContent = "$" + Number(item.price).toFixed(2);

        details.appendChild(name);
        details.appendChild(price);

        // BONUS: Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";

        deleteButton.addEventListener("click", function() {

            // Read existing cart
            const updatedCart = getCart();

            // Remove only one item
            updatedCart.splice(index, 1);

            // Save updated cart
            Cookies.set("shoppingCart", JSON.stringify(updatedCart), {
                expires: 7,
                sameSite: "Lax"
            });

            // Refresh checkout
            displayCart();
        });

        itemDiv.appendChild(image);
        itemDiv.appendChild(details);
        itemDiv.appendChild(deleteButton);

        cartItems.appendChild(itemDiv);

        total += Number(item.price);
    });

    // Display total price
    totalPrice.textContent = total.toFixed(2);
}

// BONUS: Clear entire cart
document.getElementById("clear-cart").addEventListener("click", function() {

    Cookies.remove("shoppingCart");

    displayCart();
});

// Display cart when page loads
displayCart();