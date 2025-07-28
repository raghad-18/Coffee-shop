document.addEventListener('DOMContentLoaded', () => {
  const cart = {};
  const cartCountEl = document.getElementById('cart-count');
  const cartItemsEl = document.getElementById('cart-items');
  const cartTotalEl = document.getElementById('cart-total');
  const cartToggleBtn = document.getElementById("cart-toggle");
  const cartSidebar = document.getElementById("cart");
  const cartOverlay = document.getElementById('cart-overlay');
  const orderBtn = document.getElementById('order-btn');

  // Update cart UI
  function updateCartUI() {
    cartItemsEl.innerHTML = '';
    let total = 0;
    let count = 0;

    for (let name in cart) {
      const item = cart[name];
      total += item.price * item.quantity;
      count += item.quantity;

      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.name}</span>
        <div class="quantity-control">
          <button class="decrease-btn" data-name="${item.name}">−</button>
          <span>${item.quantity}</span>
          <button class="increase-btn" data-name="${item.name}">+</button>
          <span> = $${(item.price * item.quantity).toFixed(2)}</span>
        </div>
      `;
      cartItemsEl.appendChild(li);
    }

    cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
    cartCountEl.textContent = count;

      // ✅ Enable/Disable the Order button
      const orderBtn = document.getElementById('order-btn');
      orderBtn.disabled = count === 0;
  }

  // Add to cart button click
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);

      if (!cart[name]) {
        cart[name] = { name, price, quantity: 0 };
      }

      cart[name].quantity++;
      updateCartUI();
    });
  });

  // Handle quantity control clicks
  cartItemsEl.addEventListener('click', (e) => {
    const name = e.target.dataset.name;
    if (!name) return;

    if (e.target.classList.contains('increase-btn')) {
      cart[name].quantity++;
    } else if (e.target.classList.contains('decrease-btn')) {
      cart[name].quantity--;
      if (cart[name].quantity <= 0) {
        delete cart[name];
      }
    }
    updateCartUI();

  });

  function toggleCart() {
  cartSidebar.classList.toggle('visible');
  cartOverlay.classList.toggle('active');

  orderBtn.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) return;

  

  // Clear the cart
  for (let name in cart) {
    delete cart[name];
  }

  updateCartUI();

  // Optionally close the cart
  cartSidebar.classList.remove('visible');
  cartOverlay.classList.remove('active');
});

}

// Toggle on button click
document.getElementById('cart-toggle').addEventListener('click', toggleCart);

// Close on overlay click
cartOverlay.addEventListener('click', toggleCart);

//   // Toggle cart display
//   cartToggleBtn.addEventListener('click', () => {
//     cartSidebar.classList.toggle('hidden');
//   });

//   // Optional: hide cart when mouse leaves
//   cartSidebar.addEventListener('mouseleave', () => {
//     cartSidebar.classList.add('hidden');
//   });

  // Order button
  orderBtn.addEventListener('click', () => {
    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    updateCartUI();
  });
  window.open('checkout.html', '_blank');
});
