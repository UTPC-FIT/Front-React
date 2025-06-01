import React from 'react';
import FullScreenCardTemplate from '@templates/FullScreenCardTemplate';
import HeaderTemplate from '@templates/HeaderTemplate';
import Footer from '@molecules/footers/Footer';
import { FaHome, FaInfoCircle, FaUser } from 'react-icons/fa';

const OfficialTemplate = ({ children }) => {
    const menu = [
        { name: 'Estudiantes', href: '/officials', IconComponent: FaHome },
        { name: 'Asistencias', href: '/assistance', IconComponent: FaInfoCircle },
    ];

    return (
        <div>
            <HeaderTemplate menu={menu} />
            <FullScreenCardTemplate
                backgroundScreenColor="bg-[var(--color-background-dark)]"
                backgroundColor="bg-[var(--color-background-light)]"
                className="flex flex-col gap-8"
                largeWidth="90%"
            >
                {children}
            </FullScreenCardTemplate>
            <Footer />
        </div>
    );
};

export default OfficialTemplate;