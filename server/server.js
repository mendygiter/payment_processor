require("dotenv").config()

const express = require("express");
const app = express();
//const port = 8000;
app.use(express.json())
app.use(express.static("public"))

const stripe = require("stripe") (process.env.STRIPE_PRIVATE_KEY)
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { name, email, product } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: product.name,
                        },
                        unit_amount: product.price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.server_URL}/success.html`,
            cancel_url: `${process.env.server_URL}/cancel.html`,
            customer_email: email,
            client_reference_id: name,
        });
        res.json({ url: session.url });
    } catch (e) {
        res.status(500).json({error: e.message})
    }
})

app.listen(8000)
