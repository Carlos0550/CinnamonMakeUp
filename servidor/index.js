const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { PORT } = require('./config.js');

const app = express();

app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "cinnamonmakeupaccesorios@gmail.com",
        pass: "wpvv lvgl dwor sfwh",
    },
});

<<<<<<< HEAD
const parseTones = (entrada) => {
    try {
        const parsed = JSON.parse(entrada);
        if (Array.isArray(parsed)) {
            return parsed.join(", "); 
        }
        return entrada; 
    } catch (error) {
        return entrada === '[]' ? "" : entrada;
    }
}

app.post("/send-email", (req, res) => {
    const { cart, clientData } = req.body;
=======
app.post("/send-email", (req, res) => {
    const { cart, clientData } = req.body;

>>>>>>> 16e2f67deecff64e130dc7460a075f86f4573c3c
    if (!cart || !clientData || clientData.length === 0) {
        return res.status(400).send('Cart or client data is missing');
    }

    const client = clientData[0];

    if (!client.email) {
        return res.status(400).send('Client email is missing');
    }

    const totalPrice = cart.reduce((total, item) => total + (item.precioProducto * (item.quantity || 1)), 0);

    const mailOptionsCliente = {
        from: "cinnamonmakeupaccesorios@gmail.com",
        to: client.email,
        subject: "Gracias por tu compra",
        html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    h1 {
                        color: #f06090;
                    }
                    p {
                        margin-bottom: 10px;
                    }
                    ul {
                        list-style: none;
                        padding: 0;
                    }
                    ul li {
                        margin-bottom: 5px;
                    }
                    .container {
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Gracias por tu compra!</h1>
                    <p>Aquí está tu resumen de compra:</p>
                    <h2>Productos:</h2>
                    <ul>
<<<<<<< HEAD
                        ${cart.map(item => `<li>x${item.quantity || "1"} ${item.nombreProducto} $${item.precioProducto} c/u ${parseTones(item.tonos)}</li>`).join('')}
=======
                        ${cart.map(item => `<li>x${item.quantity || "1"} ${item.nombreProducto} $${item.precioProducto} c/u</li>`).join('')}
>>>>>>> 16e2f67deecff64e130dc7460a075f86f4573c3c
                    </ul>
                    <p><strong>Total:</strong> $${totalPrice}</p>
                    <p><strong>Envío a:</strong> ${client.nombre} ${client.apellido}</p>
                    <p><strong>Dirección:</strong> ${client.direccion}, ${client.ciudad}, ${client.provincia}</p>
                    <p>Nos pondremos en contacto contigo para que puedas abonar el total de la compra :)</p>
                    <p>Saludos,</p>
                    <p>Cinnamon Makeup Accesorios</p>
                </div>
            </body>
            </html>
        `,
    };

    const mailOptionsVendedor = {
        from: 'cinnamonmakeupaccesorios@gmail.com',
        to: 'recalderocio14@gmail.com',
<<<<<<< HEAD
        // to: 'carlospelinski05@gmail.com',
=======
>>>>>>> 16e2f67deecff64e130dc7460a075f86f4573c3c
        subject: 'Nueva venta realizada',
        html: `
            <html>
            <head>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        color: #333;
                    }
                    h1 {
                        color: #f06090;
                    }
                    p {
                        margin-bottom: 10px;
                        font-weight:500;
                    }
                    ul {
                        list-style: none;
                        padding: 0;
                    }
                    ul li {
                        margin-bottom: 5px;
                    }
                    .container {
                        padding: 20px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        background-color: #f9f9f9;
                        max-width: 600px;
                        margin: 0 auto;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Nueva venta realizada</h1>
                    <p>Aquí están los detalles:</p>
                    
                    <p><strong>Compra de:</strong> ${client.nombre} ${client.apellido}</p>
                    <p><strong>Total:</strong> $${totalPrice}</p>
                    <h2>Productos:</h2>
                    <ul>
<<<<<<< HEAD
                        ${cart.map(item => `<li>x${item.quantity || "1"} ${item.nombreProducto} $${item.precioProducto} ${parseTones(item.tonos)}</li>`).join('')}
=======
                        ${cart.map(item => `<li>x${item.quantity || "1"} ${item.nombreProducto} $${item.precioProducto}</li>`).join('')}
>>>>>>> 16e2f67deecff64e130dc7460a075f86f4573c3c
                    </ul>
                    <h2>Datos del cliente</h2>
                    <p><strong>Email:</strong> ${client.email}</p>
                    <p><strong>Teléfono:</strong> ${client.telefono}</p>
                    <p><strong>Dirección de envío:</strong> ${client.direccion}, ${client.ciudad}, ${client.provincia}</p>
                </div>
            </body>
            </html>
        `
    };

    transporter.sendMail(mailOptionsCliente, (error, infoCliente) => {
        if (error) {
            console.error('Error al enviar correo al cliente:', error);
            res.status(500).send('Error al enviar correo al cliente');
        } else {
            console.log('Correo electrónico enviado al cliente:', infoCliente.response);
        }
    });

    transporter.sendMail(mailOptionsVendedor, (error, infoVendedor) => {
        if (error) {
            console.error('Error al enviar correo al vendedor:', error);
            res.status(500).send('Error al enviar correo al vendedor');
        } else {
            console.log('Correo electrónico enviado al vendedor:', infoVendedor.response);
            res.status(200).send('Correos electrónicos enviados con éxito');
        }
    });
});

<<<<<<< HEAD
const generateCartHtml = (cart) => {
    if (!cart || cart.length === 0) {
        return '<p>El carrito está vacío.</p>';
    }

    return `
        <h2>Productos:</h2>
        <ul>
            ${cart.map(item => `
                <li>x${item.quantity || "1"} ${item.productInfo.nombreProducto} $${item.productInfo.precioProducto} c/u ${parseTones(item.tones)}
                </li>`).join('')}
        </ul>
    `;
};

app.post("/finallyPurchaseNotAccout", (req,res)=>{
    const { cart, formData } = req.body;

    if (!cart || !formData || formData.length === 0) {
        return res.status(400).send('Cart or client data is missing');
    }

    const client = formData;

    if (!client.email) {
        return res.status(400).send('Client email is missing');
    }

    const totalPrice = cart.reduce((total, item) => total + (item.productInfo.precioProducto * (item.quantity || 1)), 0);

    const mailOptionsCliente = {
        from: "cinnamonmakeupaccesorios@gmail.com",
        to: client.email,
        subject: "Gracias por tu compra",
        html: `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    h1 { color: #f06090; }
                    p { margin-bottom: 10px; }
                    ul { list-style: none; padding: 0; }
                    ul li { margin-bottom: 5px; }
                    .container { padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; max-width: 600px; margin: 0 auto; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Gracias por tu compra!</h1>
                    <p>Aquí está tu resumen de compra:</p>
                    ${generateCartHtml(cart)}
                    <p><strong>Total:</strong> $${totalPrice}</p>
                    <p><strong>Envío a:</strong> ${client.nombre} </p>
                    <p><strong>Dirección:</strong> ${client.direccion}, ${client.localidad}, ${client.provincia}</p>
                    <p>Nos pondremos en contacto contigo para que puedas abonar el total de la compra :)</p>
                    <p>Saludos,</p>
                    <p>Cinnamon Makeup Accesorios</p>
                </div>
            </body>
            </html>
        `,
    };

    const mailOptionsVendedor = {
        from: 'cinnamonmakeupaccesorios@gmail.com',
        to: 'recalderocio14@gmail.com',
        // to: 'carlospelinski05@gmail.com',
        subject: 'Nueva venta realizada',
        html: `
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    h1 { color: #f06090; }
                    p { margin-bottom: 10px; font-weight: 500; }
                    ul { list-style: none; padding: 0; }
                    ul li { margin-bottom: 5px; }
                    .container { padding: 20px; border: 1px solid #ddd; border-radius: 5px; background-color: #f9f9f9; max-width: 600px; margin: 0 auto; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Nueva venta realizada</h1>
                    <p>Aquí están los detalles:</p>
                    <p><strong>Compra de:</strong> ${client.nombre} </p>
                    <p><strong>Total:</strong> $${totalPrice}</p>
                    ${generateCartHtml(cart)}
                    <h2>Datos del cliente</h2>
                    <p><strong>Email:</strong> ${client.email}</p>
                    <p><strong>Teléfono:</strong> ${client.telefono}</p>
                    <p><strong>Dirección de envío:</strong> ${client.direccion}, ${client.localidad}, ${client.provincia}</p>
                </div>
            </body>
            </html>
        `
    };

    transporter.sendMail(mailOptionsCliente, (error, infoCliente) => {
        if (error) {
            console.error('Error al enviar correo al cliente:', error);
            res.status(500).send('Error al enviar correo al cliente');
        } else {
            console.log('Correo electrónico enviado al cliente:', infoCliente.response);
        }
    });

    transporter.sendMail(mailOptionsVendedor, (error, infoVendedor) => {
        if (error) {
            console.error('Error al enviar correo al vendedor:', error);
            res.status(500).send('Error al enviar correo al vendedor');
        } else {
            console.log('Correo electrónico enviado al vendedor:', infoVendedor.response);
            res.status(200).send('Correos electrónicos enviados con éxito');
        }
    });
})

=======
>>>>>>> 16e2f67deecff64e130dc7460a075f86f4573c3c
app.listen(PORT, () => {
    console.log(`SERVER ON PORT ${PORT}`);
});
