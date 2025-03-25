let cart = []; // Array to store cart items

function addToCart(productName, productPrice, productImage) {
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      quantity: 1,
      image: productImage
    });
  }

  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContainer = document.getElementById('cart-container');

  if (!cartContainer) {
    createCartUI();
  }

  const cartItems = document.querySelector('.cart-items');
  const totalContainer = document.querySelector('.cart-total');

  cartItems.innerHTML = '';

  cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.style.display = 'flex';
    itemElement.style.alignItems = 'center';
    itemElement.style.marginBottom = '20px';

    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" style="width: 120px; height: 120px; margin-right: 20px; border-radius: 8px;" />
      <div style="flex-grow: 1;">
        <span style="display: block; font-size: 20px; font-weight: bold; margin-bottom: 5px;">${item.name}</span>
        <span style="display: block; color: #555; font-size: 16px;">Price: ₹${item.price.toFixed(2)}</span>
        <div class="quantity-controls" style="margin-top: 10px;">
          <button onclick="decrementItem('${item.name}')" style="padding: 8px 12px; font-size: 14px; cursor: pointer; border: 1px solid #ccc; background-color: #fff;">-</button>
          <span style="margin: 0 10px; font-size: 16px;">${item.quantity}</span>
          <button onclick="incrementItem('${item.name}')" style="padding: 8px 12px; font-size: 14px; cursor: pointer; border: 1px solid #ccc; background-color: #fff;">+</button>
        </div>
      </div>
      <span style="font-size: 18px; font-weight: bold; white-space: nowrap;">Total: ₹${(item.price * item.quantity).toFixed(2)}</span>
    `;

    cartItems.appendChild(itemElement);
  });

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  totalContainer.textContent = `Total Price: ₹${totalPrice.toFixed(2)}`;
}

function createCartUI() {
  const cartContainer = document.createElement('div');
  cartContainer.id = 'cart-container';
  cartContainer.style.position = 'fixed';
  cartContainer.style.top = '0';
  cartContainer.style.right = '-50%'; // Hidden off-screen initially
  cartContainer.style.height = '100%';
  cartContainer.style.backgroundColor = '#f8f8f8';
  cartContainer.style.borderLeft = '1px solid #ccc';
  cartContainer.style.padding = '20px';
  cartContainer.style.width = '50%'; // Take 50% of the screen width
  cartContainer.style.transition = 'right 0.3s ease'; // Smooth slide effect
  cartContainer.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
  cartContainer.style.overflowY = 'auto'; // Scroll for large cart

  cartContainer.innerHTML = `
    <button style="background: none; border: none; font-size: 16px; float: right; cursor: pointer;" onclick="toggleCart()">✖</button>
    <h2 style="font-size: 28px; margin-bottom: 20px;">Cart</h2>
    <div class="cart-items"></div>
    <p class="cart-total" style="font-size: 20px; font-weight: bold; margin-top: 20px;">Total Price: ₹0.00</p>
  `;

  document.body.appendChild(cartContainer);
}

function incrementItem(productName) {
  const product = cart.find(item => item.name === productName);
  if (product) {
    product.quantity++;
    updateCartDisplay();
  }
}

function decrementItem(productName) {
  const product = cart.find(item => item.name === productName);
  if (product) {
    product.quantity--;
    if (product.quantity <= 0) {
      cart = cart.filter(item => item.name !== productName);
    }
    updateCartDisplay();
  }
}

function toggleCart() {
  const cartContainer = document.getElementById('cart-container');
  if (cartContainer) {
    const isHidden = cartContainer.style.right === '-50%';
    cartContainer.style.right = isHidden ? '0' : '-50%'; // Toggle the cart visibility
  }
}

function viewCart() {
  if (!document.getElementById('cart-container')) {
    createCartUI();
  }
  toggleCart();
}
