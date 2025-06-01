import PropTypes from "prop-types";

import TitleWithIcon from "@molecules/TitleWithIcon";

import { CgProfile } from "react-icons/cg";
import { FaIdCard } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { GrStatusInfo } from "react-icons/gr";

const columnsHeader = [
    {
        title: "nombre",
        IconComponent: CgProfile
    },
    {
        title: "código",
        IconComponent: FaIdCard
    },
    {
        title: "correo",
        IconComponent: HiOutlineMail
    },
    {
        title: "estado",
        IconComponent: GrStatusInfo
    },
];

const HeaderUserRow = ({
    itemsColumnsHeader = columnsHeader,
    className = "bg-[var(--color-primary)] px-8 py-16 rounded-sm ",
}) => {
    return (
        <thead className={`${className}`}>
            <tr>
                {itemsColumnsHeader.map((item, index) => (
                    <th key={`${item.title}${index}`}>
                        <TitleWithIcon
                            IconComponent={item.IconComponent}
                            size="small"
                        >
                            {item?.title.charAt(0).toUpperCase()}
                            {item?.title.slice(1)}
                        </TitleWithIcon>
                    </th>
                ))}
            </tr>
        </thead>
    );
};

HeaderUserRow.propTypes = {
    itemsColumnsHeader: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            IconComponent: PropTypes.elementType.isRequired,
        })
    ),
    className: PropTypes.string,
};

export default HeaderUserRow;