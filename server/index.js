const express = require("express");
const cors = require("cors");

const app = express();
const nodemailer = require("nodemailer");
const { text } = require("stream/consumers");

// app.use(cors({
//     origin: "https://cinnamon-make-up-client.vercel.app"
//   }));
app.use(cors())
  app.use(express.json());


app.get("/", (req, res)=>{
    res.send("Server is running")
})

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    tls: {
        rejectUnauthorized: false // Ignora la verificación del certificado
    },
    auth: {
      user: "cinnamonmakeupaccesorios@gmail.com",
      pass: "wpvv lvgl dwor sfwh",
    },
});



app.post("/send-email", (req, res) => {
    let { carrito, totalPrice,userData } = req.body;
    
    console.log("UserData",userData)

        const mailOptionsCliente = {
            from: "cinnamonmakeupaccesorios@gmail.com",
            to: userData.map((item)=> item.email),
            subject: "Gracias por tu compra",
            text: `Gracias por tu compra! Aquí está tu resumen de compra:
            Total: ${totalPrice},
            Productos: ${carrito.map(item => `x${item.cantidad || "1"} ${item.name} $${item.price}c/u`).join('\n')}
            Envío a: ${userData.map((item)=> item.nombre)} ${userData.map((item)=> item.apellido)} 
            Direccion:${userData.map((item)=> item.direccion)}, ${userData.map((item)=> item.ciudad)}, ${userData.map((item)=> item.provincia)}
            Nos pondremos en contacto contigo para que puedas abonar el total de la compra :)
            Saludos,
            Cinnamon Makeup Accesorios
            `,
        };
    
        const mailOptionsVendedor = {
            from: 'cinnamonmakeupaccesorios@gmail.com',
            to: 'recalderocio14@gmail.com',
            // to: 'carlospelinski03@gmail.com',
            subject: 'Nueva venta realizada',
            text: `Hola Rocio. Se ha realizado una nueva venta! Aquí están los detalles:
                Total: ${totalPrice},
                Compra de: ${userData.map((item)=> item.nombre)} ${userData.map((item)=> item.apellido)}
                Productos: ${carrito.map(item => `x${item.cantidad || "1"} ${item.name}`).join('\n')}
                Email: ${userData.map((item)=> item.email)},
                Teléfono: ${userData.map((item)=> item.telefono)},
                Dirección de envío: ${userData.map((item)=> item.direccion)}, ${userData.map((item)=> item.ciudad)}, ${userData.map((item)=> item.provincia)}`
        };
        transporter.sendMail(mailOptionsCliente, (error, infoCliente) => {
            if (error) {
                console.error('Error al enviar correo al cliente:', error);
                res.status(500).send('Error al enviar correo al cliente');
            } else {
                console.log('Correo electrónico enviado al cliente:', infoCliente.response);
                res.status(200)
            }
        });
    
        transporter.sendMail(mailOptionsVendedor, (error, infoVendedor) => {
            if (error) {
                console.error('Error al enviar correo al vendedor:', error);
                res.status(500).send('Error al enviar correo al vendedor');
            } else {
                console.log('Correo electrónico enviado al vendedor:', infoVendedor.response);
                res.send('Correos electrónicos enviados con éxito');
                res.status(200)
            }
        });
    }
);

    

    

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Escuchando en el puerto: ${port}`));
