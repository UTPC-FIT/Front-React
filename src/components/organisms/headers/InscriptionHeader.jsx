import LogoDisplay from "../../molecules/LogoDisplay";

const InscriptionHeader = () => {
    return (
        <header>
            <div>
                <LogoDisplay
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-24 mx-auto mb-8"
                />
            </div>
            <div></div>
        </header>
    )
}

export default InscriptionHeader;