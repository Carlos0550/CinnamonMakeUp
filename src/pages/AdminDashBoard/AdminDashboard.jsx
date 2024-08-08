import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context';
import { useNavigate } from 'react-router-dom';
import { Collapse } from 'antd';
import AddProduct from './Modals/AddProduct';
import ViewProducts from './Modals/ViewProducts';
function AdminDashboard() {
    const { sessionId } = useAppContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (sessionId !== process.env.REACT_APP_ADMIN_KEY) {
            navigate("/user-dashboard");
        }
    }, [sessionId]);

    const ReturnAdminCollapse = () => {
        const items = [
            {
                key: '1',
                label: 'Subir Productos',
                children: <AddProduct />,
            },
            {
                key: '2',
                label: 'Ver productos publicados',
                children: <ViewProducts />,
            },
        ]
        return <Collapse accordion items={items} defaultActiveKey={['1']}></Collapse>

    }
    return <ReturnAdminCollapse />;

}

export default AdminDashboard;
