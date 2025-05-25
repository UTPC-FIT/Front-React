import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { FaDownload } from 'react-icons/fa6';
import FileUploadField from '@molecules/FileUploadField';
import DownloadLink from '@molecules/DownloadLink';

const UploadFileRegister = ({
    age = 0,
    parentalAuthorization,
    informedConsent,
    handleFileChange,
    errorMessage
}) => {
    const fileInputRef = useRef(null);

    if (age === 0) return null;

    const handleClick = () => {
        fileInputRef.current.click();
    };

    if (age < 18) {
        return (
            <FileUploadField
                id="parental-authorization"
                name="parentalAuthorization"
                label="Autorización de padre o madre (para menores de 18 años)"
                selectedFile={parentalAuthorization}
                onChange={(e) => handleFileChange(e, 'parentalAuthorization')}
                errorMessage={errorMessage}
                description="Soporte para archivos PDF (máx. 1 MB)"
                required
                onClick={handleClick}
                inputRef={fileInputRef}
            />
        );
    }

    return (
        <>
            <div className='w-full flex justify-start mb-4' style={{ gridColumn: "span 2" }}>
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
                selectedFile={informedConsent}
                onChange={(e) => handleFileChange(e, 'informedConsent')}
                errorMessage={errorMessage}
                description="Sube el consentimiento firmado (máx. 1 MB)"
                required
                onClick={handleClick}
                inputRef={fileInputRef}
                style={{ gridColumn: "span 2" }}
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