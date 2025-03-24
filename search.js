// Array to store product details
const products = [
    { name: "Clothes", price: 100.0, image: "box1_image.jpg" },
    { name: "Health & personal care", price: 50.0, image: "box2_image.jpg" },
    { name: "Furniture", price: 250.0, image: "box3_image.jpg" },
    { name: "Electronics", price: 350.0, image: "box4_image.jpg" },
    { name: "Beauty products", price: 240.0, image: "box5_image.jpg" },
    { name: "Pet Care", price: 33.0, image: "box6_image.jpg" },
    { name: "Toys", price: 10.0, image: "box7_image.jpg" },
    { name: "Shoes", price: 230.0, image: "shoes.jpg" },
  ];
  
  // Function to handle the search
  function searchProduct(searchInput) {
    const shopSection = document.querySelector(".shop-section");
    shopSection.innerHTML = ""; // Clear the current product display
  
    if (!searchInput.trim()) {
      // If search input is empty, show a message
      shopSection.innerHTML = `
        <div class="unavailable-message animated-message">
          <p>Please enter a product name to search.</p>
        </div>
      `;
      return;
    }
  
    const lowercasedInput = searchInput.trim().toLowerCase();
  
    // Filter products based on search input
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(lowercasedInput)
    );
  
    if (filteredProducts.length > 0) {
      // Display matching products
      filteredProducts.forEach((product) => {
        const highlightedName = product.name.replace(
          new RegExp(`(${lowercasedInput})`, "gi"),
          (match) => `<span class="highlight">${match}</span>`
        );
  
        const productBox = document.createElement("div");
        productBox.classList.add("box");
        productBox.innerHTML = `
          <div class="box-content">
            <h2>${highlightedName}</h2>
            <div class="box-img" style="background-image: url('${product.image}')"></div>
            <p>Price: $${product.price.toFixed(2)}</p>
          </div>
          <div class="button-container">
            <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">Add to Cart</button>
            <button class="buy-now" onclick="buyNow('${product.name}', ${product.price})">Buy Now</button>
          </div>
        `;
        shopSection.appendChild(productBox);
      });
    } else {
      // Display "not available" message with a suggestion
      shopSection.innerHTML = `
        <div class="unavailable-message animated-message">
          <p>The product you are searching for is currently unavailable in the store.</p>
          <p> please search any other product</P>
        </div>
      `;
    }
  }
  
  // Debounce function to improve search performance
  let debounceTimeout;
  function debounceSearch(callback, delay = 300) {
    return function (...args) {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => callback(...args), delay);
    };
  }
  
  // Add an event listener to the search button
  document.querySelector(".search-icon").addEventListener("click", () => {
    const searchInput = document.querySelector(".search-input").value;
    searchProduct(searchInput);
  });
  
  // Allow search on pressing "Enter" key with debounce
  document.querySelector(".search-input").addEventListener(
    "input",
    debounceSearch(() => {
      const searchInput = document.querySelector(".search-input").value;
      searchProduct(searchInput);
    })
  );
  