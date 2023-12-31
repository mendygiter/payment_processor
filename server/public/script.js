document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("checkout-form").addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const selectedProduct = document.getElementById("product").value;

        const products = {
            product1: { name: "Product 1", price: 100000 },
            product2: { name: "Product 2", price: 200000 }
        };

        fetch("/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                product: products[selectedProduct],
            }),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(json => Promise.reject(json))
                }
            })
            .then(({ url }) => {
                window.location = url
            })
            .catch(e => {
                console.error(e.error)
            })
    });
});
