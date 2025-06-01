import CopyRightLine from "@atoms/CopyRightLine";
import FooterSocial from "@molecules/footers/FooterSocial";
import zonaLogos from '@assets/images/zonaLogosUptc.png';

const Footer = () => {
    return (
        <div className="w-full bg-[var(--color-neutral-gray-dark)] text-white p-4 flex flex-col items-center">
            <div className="flex flex-col md:flex-row justify-around items-center">
                <div className="hidden md:flex flex-col justify-center items-center mt-4">
                    <figure className="p-1 rounded-md mb-2 max-h-36 max-w-80 object-cover">
                        <img src={zonaLogos} alt="Logo UPTC" className="w-full h-full object-contain" />
                    </figure>
                    <FooterSocial />
                </div>
            </div>

            <CopyRightLine />
        </div>
    );
};

export default Footer;
