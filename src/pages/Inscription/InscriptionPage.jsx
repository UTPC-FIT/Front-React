import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { FaDownload, FaFileArrowUp } from 'react-icons/fa6';
import { TbFileSmile } from 'react-icons/tb';

import logoUPTC from '../../assets/images/logo_uptc.png';
import FullScreenCardTemplate from '../../components/templates/FullScreenCardTemplate';
import LogoDisplay from '../../components/molecules/LogoDisplay';
import Text from '../../components/atoms/Text';
import ButtonWithIcon from '../../components/molecules/ButtonWithIcon';
import FileUploadField from '../../components/molecules/FileUploadField';
import DownloadLink from '../../components/molecules/DownloadLink';

const InscriptionPage = () => {

    return (
        <FullScreenCardTemplate>
            <div className="flex flex-col items-center justify-center w-full h-full p-4">
                <LogoDisplay src={logoUPTC} alt="UPTC Logo" />

                <Text variant="heading1" color="primary" className="mb-4">
                    Inscripción
                </Text>

                <Text variant="body" color="medium" className="mb-8 text-center">
                    Por favor, sube los documentos requeridos para completar tu inscripción.
                </Text>

                <DownloadLink
                    href="https://drive.google.com/file/d/1vY3vnB_I79746xxRKkvVGl2rzcKigdoo/view"
                    text="Descarga el Consentimiento"
                    IconComponent={FaDownload}
                    external={true}
                />

                <FileUploadField
                    id="informed-consent"
                    name="informedConsent"
                    label=""
                    IconComponent={FaFileArrowUp}
                    selectedFile={null}
                    onChange={() => { }}
                    errorMessage=""
                    maxSize="1 MB"
                />

                <ButtonWithIcon
                    IconComponent={FiSave}
                    iconPosition="left"
                    onClick={() => { }}
                >
                    Guardar Inscripción
                </ButtonWithIcon>
            </div>
        </FullScreenCardTemplate>
    )

}

export default InscriptionPage;