document.addEventListener("DOMContentLoaded", () => {
    const mainImage = document.getElementById("mainImage");
    const currentPrice = document.getElementById("currentPrice");
    const count = document.getElementById("count");
    const cartItemsTable = document.querySelector("#cartItems tbody");
    const cartTotal = document.getElementById("cartTotal");
    const floatingCart = document.getElementById("floatingCart");
    const cartCount = document.getElementById("cartCount");
    const modal = document.getElementById("modal");

    let cart = [];
    let quantity = 1;

    // Update main image and price color based on color selection
    document.getElementById("colorOptions").addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        const color = button.dataset.color;
        const image = button.dataset.image;

        mainImage.src = image;
        currentPrice.style.color = color;
    });

    // Update size and price
    document.getElementById("sizeOptions").addEventListener("click", (event) => {
        const button = event.target.closest("button");
        if (!button) return;
        const size = button.dataset.size;
        const price = button.dataset.price;

        document.querySelectorAll("#sizeOptions button").forEach((btn) => btn.classList.remove("border-blue-500"));
        button.classList.add("border-blue-500");
        currentPrice.textContent = `$${price}.00`;
    });

    // Update quantity
    document.getElementById("increment").addEventListener("click", () => {
        quantity++;
        count.textContent = quantity;
    });

    document.getElementById("decrement").addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            count.textContent = quantity;
        }
    });

    // Add to cart
    document.getElementById("addToCart").addEventListener("click", () => {
        const color = currentPrice.style.color;
        const size = document.querySelector("#sizeOptions .border-blue-500")?.dataset.size || "M";
        const price = parseFloat(currentPrice.textContent.replace("$", ""));
        const image = mainImage.src;

        const cartItem = {
            name: "Classy Modern Smart Watch",
            color,
            size,
            quantity,
            price,
            image,
        };

        cart.push(cartItem);

        // Update floating cart
        floatingCart.classList.remove("hidden");
        cartCount.textContent = cart.length;

        // Reset quantity
        quantity = 1;
        count.textContent = quantity;
    });

    // Show modal
    floatingCart.addEventListener("click", () => {
        modal.classList.remove("hidden");

        // Render cart items
        cartItemsTable.innerHTML = "";
        let total = 0;
        cart.forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="py-2 flex items-center gap-3">
                    <img src="${item.image}" class="w-10 h-10 rounded" alt=""> ${item.name}
                </td>
                <td class="py-2">${item.color}</td>
                <td class="py-2">${item.size}</td>
                <td class="py-2">${item.quantity}</td>
                <td class="py-2">$${item.price * item.quantity}.00</td>
            `;
            cartItemsTable.appendChild(row);

            total += item.price * item.quantity;
        });

        cartTotal.textContent = `$${total}.00`;
    });

    // Clear cart
    document.getElementById("clearCart").addEventListener("click", () => {
        cart = [];
        cartCount.textContent = 0;
        floatingCart.classList.add("hidden");
        modal.classList.add("hidden");
    });

    // Close modal
    document.getElementById("closeModal").addEventListener("click", () => {
        modal.classList.add("hidden");
    });
});
