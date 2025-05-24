import React from 'react';
import PropTypes from 'prop-types';
import { FaDownload, FaFileArrowUp } from 'react-icons/fa6';
import { TbFileSmile } from 'react-icons/tb';
import FileUploadField from '../molecules/FileUploadField';
import DownloadLink from '../molecules/DownloadLink';

const UploadFileRegister = ({
    age = 0,
    parentalAuthorization,
    informedConsent,
    handleFileChange,
    errorMessage
}) => {
    if (age === 0) return null;

    if (age < 18) {
        return (
            <FileUploadField
                id="parental-authorization"
                name="parentalAuthorization"
                label="Autorización de padre o madre (para menores de 18 años)"
                IconComponent={TbFileSmile}
                selectedFile={parentalAuthorization}
                onChange={handleFileChange}
                errorMessage={errorMessage}
                maxSize="1 MB"
            />
        );
    }

    return (
        <>
            <div className='w-full flex justify-start' style={{ gridColumn: "span 2" }}>
                <DownloadLink
                    href="https://drive.google.com/file/d/1vY3vnB_I79746xxRKkvVGl2rzcKigdoo/view"
                    text="Descarga el Consentimiento"
                    IconComponent={FaDownload}
                    external={true}
                />
            </div>

            <FileUploadField
                id="informed-consent"
                name="informedConsent"
                label=""
                IconComponent={FaFileArrowUp}
                selectedFile={informedConsent}
                onChange={handleFileChange}
                errorMessage={errorMessage}
                maxSize="1 MB"
            />
        </>
    );
};

UploadFileRegister.propTypes = {
    age: PropTypes.number,
    parentalAuthorization: PropTypes.object,
    informedConsent: PropTypes.object,
    handleFileChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
};

export default UploadFileRegister;