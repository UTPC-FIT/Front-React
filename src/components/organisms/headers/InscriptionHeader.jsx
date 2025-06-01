import LogoDisplay from "@molecules/LogoDisplay";
import Text from "@atoms/Text";
import NavigationButton from "@molecules/NavigationButton";

import logoUptc from "@assets/images/logo_uptc.png"

import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

import { useAuth } from "@context/AuthContext";

const InscriptionHeader = ({ direction = "left" }) => {
    const isReversed = direction === "right";
    const { logout } = useAuth();

    return (
        <header className={`flex items-start ${isReversed ? 'flex-row-reverse' : ''} justify-between w-full`}>
            <div className="flex flex-col items-center gap-2">
                <Text
                    variant="caption"
                    color="medium"
                    className="text-center text-[var(--color-neutral-gray-blue)]"
                >
                    ¿Volver al inicio de sesión?
                </Text>
                <NavigationButton
                    to="/login"
                    text="Volver"
                    size="medium"
                    className="py-2 px-8"
                    onClick={logout}
                    IconComponent={isReversed ? FiArrowRight : FiArrowLeft}
                    iconPosition={isReversed ? "right" : "left"}
                />
            </div>
            <div className={`flex items-center gap-8 ${isReversed ? 'flex-row-reverse' : ''}`}>
                <Text
                    variant="heading3"
                    color="medium"
                    className="text-center text-[var(--color-neutral-gray-blue)]"
                >
                    ¡Bienvenido a UPTC FIT!
                </Text>
                <LogoDisplay
                    src={logoUptc}
                    alt="Logo Uptc"
                />
            </div>
        </header>
    )
}

export default InscriptionHeader;