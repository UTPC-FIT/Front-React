import { Link } from 'react-router-dom';

const ButtonSocial = ({ SocialIcon, to }) => {
    return (
        <Link
            className="w-10 h-10 p-2 rounded-lg flex justify-center items-center transition ease-in-out duration-300 border-2 border-transparent hover:border-primary focus:border-primary"
            to={to}
            target="_blank"
            rel="noopener noreferrer"
        >
            {
                SocialIcon && <SocialIcon className="text-white text-2xl" />
            }
        </Link>
    );
}

export default ButtonSocial;