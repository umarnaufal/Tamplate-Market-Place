// ============================================================================
// AREA SISWA (SILAKAN DIUBAH)
// Di bawah ini adalah tempat kamu mengatur data jualan kamu.
// ============================================================================

// 1. DATA PRODUK
// Kamu bisa menambah, menghapus, atau mengubah nama, harga, dan gambar produk di bawah ini.
// Catatan: 'id' harus unik (berbeda satu sama lain).
const products = [
    {
        id: 1,
        name: "Sepatu Keren", // Silakan ganti nama produknya
        price: 150000,        // Silakan ganti harganya (tanpa titik, contoh: 150000)
        // Silakan ganti link gambar di dalam tanda kutip dengan link gambar lain dari internet
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop&q=60" 
    },
    {
        id: 2,
        name: "Kaos Polos Putih",
        price: 50000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 3,
        name: "Topi Gaul",
        price: 35000,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60"
    },
    {
        id: 4,
        name: "Jam Tangan",
        price: 250000,
        image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&auto=format&fit=crop&q=60"
    }
];

// 2. PESAN SAAT CHECKOUT (BAYAR)
// Fungsi ini akan berjalan ketika tombol "Bayar Sekarang" ditekan
function pesanCheckout(totalBelanja) {
    // Silakan ganti teks pesan peringatannya di bawah ini
    alert("Hore! Terima kasih sudah berbelanja. Total belanjaan kamu adalah: Rp " + totalBelanja);
}


// ============================================================================
// AREA SISTEM (TIDAK PERLU DIUBAH KECUALI KAMU INGIN TANTANGAN LEBIH)
// Kode di bawah ini bertugas membuat aplikasinya berjalan dengan baik.
// ============================================================================

// Data Keranjang Belanja
let cart = [];

// Mengambil elemen HTML
const productListElement = document.getElementById("product-list");
const cartItemsElement = document.getElementById("cart-items");
const cartCountElement = document.getElementById("cart-count");
const totalPriceElement = document.getElementById("total-price");

// Fungsi: Memformat angka ke Rupiah
function formatRupiah(angka) {
    return angka.toLocaleString("id-ID");
}

// Fungsi: Menampilkan daftar produk ke layar
function renderProducts() {
    productListElement.innerHTML = "";
    products.forEach(function(product) {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Rp ${formatRupiah(product.price)}</p>
            <button onclick="addToCart(${product.id})">Tambah</button>
        `;
        productListElement.appendChild(productCard);
    });
}

// Fungsi: Memasukkan barang ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    renderCart();
}

// Fungsi: Menghapus barang dari keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Fungsi: Memperbarui tampilan keranjang di sebelah kanan
function renderCart() {
    cartItemsElement.innerHTML = "";
    let totalPrice = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItemsElement.innerHTML = "<p>Keranjang masih kosong.</p>";
    } else {
        cart.forEach(function(item) {
            totalPrice += item.price * item.qty;
            totalItems += item.qty;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <h4>${item.name} (x${item.qty})</h4>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Hapus</button>
                </div>
                <div class="cart-item-price">
                    Rp ${formatRupiah(item.price * item.qty)}
                </div>
            `;
            cartItemsElement.appendChild(cartItem);
        });
    }

    cartCountElement.innerText = totalItems;
    totalPriceElement.innerText = formatRupiah(totalPrice);
}

// Menjalankan aksi tombol checkout
document.getElementById("checkout-btn").addEventListener("click", function() {
    if (cart.length === 0) {
        alert("Keranjang kamu kosong! Pilih barang dulu ya.");
    } else {
        pesanCheckout(totalPriceElement.innerText);
        cart = []; // Kosongkan keranjang setelah bayar
        renderCart(); // Perbarui tampilan
    }
});

// Menjalankan fungsi pertama kali
renderProducts();
