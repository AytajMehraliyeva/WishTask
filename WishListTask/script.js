
    const openNav = document.getElementById("openNavBtn");
    const addBtnProduct = document.getElementById("addBtn");
    const productNameInput = document.getElementById("productName");
    const productCategoryInput = document.getElementById("productCategory");
    const productBrandInput = document.getElementById("productBrand");
    const productPriceInput = document.getElementById("productPrice");
    const productContainer = document.getElementById("productContainer");
    const wishlistContainer = new bootstrap.Offcanvas(document.getElementById("wishList"));
    const productModal = new bootstrap.Modal(document.getElementById("productModal"));

    
    class Product {
        constructor(name, category, brand, price) {
            this.name = name;
            this.category = category;
            this.brand = brand;
            this.price = price;
        }
    }

    openNav.addEventListener("click", () => {
        wishlistContainer.show();
    });

    
    addBtnProduct.addEventListener("click", () => {
        productModal.show();
    });

   
    const addProductBtn = document.getElementById("addProductBtn");
    addProductBtn.addEventListener("click", () => {
        const name = productNameInput.value;
        const category = productCategoryInput.value;
        const brand = productBrandInput.value;
        const price = productPriceInput.value;

        if (!name || !category || !brand || !price) {
            alert("Modalin icin doldurun!");
        } else {
            const newProduct = new Product(name, category, brand, price);
            displayProduct(newProduct);

            const products = JSON.parse(localStorage.getItem("products")) || [];
            products.push(newProduct);
            localStorage.setItem("products", JSON.stringify(products));

            productModal.hide(); 
        }
    });

    function displayProduct(product) {
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("product_card");
        cardDiv.innerHTML= `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Brand: ${product.brand}</p>
            <p>Price: ${product.price} azn</p>
            <button class="wishlist-btn">Add to Wishlist</button>
        `;

        const wishlistBtn = cardDiv.querySelector(".wishlist-btn");
        wishlistBtn.addEventListener("click", function() {
            addToWishlist(product);
            saveLocalStorage(product)
        });

        productContainer.appendChild(cardDiv);
    }

    
    function addToWishlist(product) {
     
        const wishlistModal = document.getElementById("wishList");
        const wishlistContainer = wishlistModal.querySelector(".offcanvas-body");

        const cardDiv = document.createElement("div");
        cardDiv.classList.add("product_card");
        cardDiv.innerHTML += `
            <h3>${product.name}</h3>
            <p>Category: ${product.category}</p>
            <p>Brand: ${product.brand}</p>
            <p>Price: ${product.price} azn</p>
        `;
       
        wishlistContainer.appendChild(cardDiv);
      
    }
    
   function saveLocalStorage(product){
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    console.log(wishlist)
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
   }


    const products = JSON.parse(localStorage.getItem("products")) || [];
    products.forEach(product => {
        displayProduct(product);
    });
  function fromLocalStorage(){
    const wishlist = JSON.parse(localStorage.getItem("wishlist"));
    console.log(wishlist)
    wishlist.forEach(product => {
        addToWishlist(product);
    });
  }

  fromLocalStorage()

