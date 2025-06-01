import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ButtonHelp from '@molecules/buttons/ButtonHelp';
import ButtonBurger from '@molecules/buttons/ButtonBurger';
import FooterMobile from '@molecules/footers/Footer';
import logoUptc from '@assets/images/logoUPTC24.svg';

const HeaderTemplate = ({ menu }) => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <header
            className="flex h-[72px] justify-between items-center p-4 relative"
            style={{
                backgroundColor: 'var(--color-neutral-gray-dark)',
                opacity: 0.8,
            }}
        >
            {/* Contenedor del Logo con posicionamiento para que sobresalga */}
            <div className="flex mt-12 mr-8 items-center h-full md:w-1/4">
                <Link to="/" className="flex justify-center items-center w-full">
                    {/* Aumentamos la altura del logo de h-24 a h-28 para que sea más prominente */}
                    <img src={logoUptc} alt="Logo UPTC" className="h-28 w-auto" />
                </Link>
            </div>

            <div className="md:hidden">
                <ButtonBurger value={showMenu} onChange={setShowMenu} />
            </div>

            {/* Menú Móvil Desplegable (sin cambios relevantes en esta sección para este ajuste) */}
            {showMenu && (
                <div
                    className="fixed inset-0 z-50 md:hidden"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    onClick={() => setShowMenu(false)}
                >
                    <div
                        className="h-full w-4/5 absolute top-0 right-0 flex flex-col justify-between"
                        style={{ backgroundColor: 'var(--color-neutral-gray-dark)' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div>
                            <Link to="/" className="flex justify-center mt-8">
                                <img src={logoUptc} alt="Logo UPTC" className="h-24 w-auto" />
                            </Link>
                            <ul className="list-none p-6 space-y-5 mt-5">
                                {Array.isArray(menu) &&
                                    menu.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={item.href}
                                                className="flex items-center justify-between rounded-full px-6 py-3 transition link-mobile"
                                                style={{
                                                    color: 'var(--color-neutral-white)',
                                                    backgroundColor: 'var(--color-neutral-gray-light)',
                                                    border: '1px solid var(--color-primary)',
                                                }}
                                                onClick={() => setShowMenu(false)}
                                            >
                                                {item.name}
                                                {item.IconComponent && <item.IconComponent />}
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                        <FooterMobile />
                    </div>
                </div>
            )}

            {/* Menú de Escritorio */}
            {/* Ajustamos el margen izquierdo (ml) de 32 a 48 para crear más espacio horizontal */}
            <ul className="hidden md:flex justify-start items-center space-x-9 w-3/4"> {/* Ajustado ml-48 */}
                {Array.isArray(menu) &&
                    menu.map((item, index) => (
                        <li
                            key={index}
                            className="transition transform hover:scale-105"
                            style={{ color: 'var(--color-neutral-white)' }}
                        >
                            <Link
                                to={item.href}
                                className="hover:text-color-primary-medium"
                                style={{
                                    color: 'var(--color-neutral-white)',
                                    transition: 'color 0.3s',
                                }}
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
            </ul>

            {/* Botones de Ayuda y Usuario */}
            <div className="flex items-center space-x-4">
                <ButtonHelp />
                {/* <UserButton /> */}
            </div>
        </header>
    );
};

HeaderTemplate.propTypes = {
    menu: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            href: PropTypes.string,
            IconComponent: PropTypes.elementType,
        })
    ).isRequired,
};

export default HeaderTemplate;