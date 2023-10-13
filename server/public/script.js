document.getElementById("checkout-form").addEventListener("submit", function (event) {
    event.preventDefault();

/*
const button = document.querySelector("button")
*/
button.addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const selectedProduct = document.getElementById("product").value;

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

    const products = {
        product1: {name: "Product 1", price: 100000},
        product2: {name: "Product 2", price: 120000}
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
            /* if (res.ok) res.json()*/
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(json => Promise.reject(json))
            }
        })
        .then(({ url }) => {
            /*console.log(url);*/
            window.location = url
        })
        .catch(e => {
            console.error(e.error)
        })


})