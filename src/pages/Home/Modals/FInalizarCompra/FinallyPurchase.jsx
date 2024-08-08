import React, { useState } from 'react';
import { Button, Modal, Form, Result, message, Spin, Flex } from 'antd';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useAppContext } from '../../../../context';

function FinallyPurchase({ closeModal, carrito }) {
    const { deleteCart, cart } = useAppContext();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        provincia: '',
        localidad: '',
        direccion: '',
    });

    const [errors, setErrors] = useState({
        nombre: false,
        email: false,
        telefono: false,
        provincia: false,
        localidad: false,
        direccion: false,
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateFields = () => {
        const newErrors = {};
        let hasError = false;

        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = true;
                hasError = true;
            } else {
                newErrors[key] = false;
            }
        });

        setErrors(newErrors);
        return !hasError;
    };
    const [purchasing, setPurchasing] = useState(false)
    const handleSubmit = async () => {
        if (validateFields()) {
            setPurchasing(true)
            try {
                const response = await axios.post("https://cinnamon-server.vercel.app/finallyPurchaseNotAccout", {

                // const response = await axios.post("http://localhost:3001/finallyPurchaseNotAccout", {
                    cart,
                    formData
                });

                if (response.status === 500) {
                    message.error("No pudimos realizar la compra, intenta nuevamente!");
                    setPurchasing(false)

                } else {
                    message.success("Compra realizada exitosamente!");
                    deleteCart();
                    setShowSuccess(true);
                    setPurchasing(false)
                }
            } catch (error) {
                console.log(error);
                message.error("No pudimos realizar la compra, intenta nuevamente!");
                setPurchasing(false)

            }
        } else {
            message.error("Por favor, completa todos los campos.");
        }
    };

    return (
        <>
            <Modal
                title="Completar datos de envío"
                visible={true}
                closeIcon={false}
                footer={[
                    <Button type='primary' style={{ backgroundColor: purchasing ? "" : "green" }} disabled={purchasing} onClick={handleSubmit}>
                        {purchasing ? <Flex gap={"middle"} align='center' justify='center'>
                            <p className='has-text-black has-text-weight-bold'>Procesando</p>
                            <Spin/>
                        </Flex> : "Finalizar compra"}
                    </Button>,
                    <Button type='primary' danger onClick={closeModal} disabled={purchasing}>
                        Cancelar compra
                    </Button>
                ]}
            >
                <Form layout="vertical">
                    {Object.keys(formData).map((field) => (
                        <TextField
                            key={field}
                            name={field}
                            label={field.charAt(0).toUpperCase() + field.slice(1)}
                            variant="standard"
                            value={formData[field]}
                            onChange={handleChange}
                            error={errors[field]}
                            helperText={errors[field] ? 'Este campo es obligatorio' : ''}
                            fullWidth
                            margin="normal"
                        />
                    ))}
                </Form>
            </Modal>

            <Modal
                visible={showSuccess}
                footer={[
                    <Button type='primary' onClick={closeModal}>
                        Cerrar
                    </Button>
                ]}
            >
                <Result
                    status="success"
                    title="¡Muchas gracias por tu compra!"
                    subTitle="Recibirás el comprobante de pago en el correo proporcionado. Pronto nos contactaremos contigo para que puedas abonar el total de la compra :)"
                />
            </Modal>
        </>
    );
}

export default FinallyPurchase;
