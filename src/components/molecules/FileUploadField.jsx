import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';

const FileUploadField = ({
    id,
    name,
    label,
    accept = "application/pdf",
    selectedFile,
    IconComponent,
    onChange,
    errorMessage,
    maxSize = "1 MB",
    className = '',
}) => {
    // Helper function to convert bytes to KB
    const convertToKB = (bytes) => {
        return bytes / 1024;
    };

    return (
        <div className={`col-span-full ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="flex items-center space-x-2 mb-2"
                >
                    <span>{label}</span>
                    {IconComponent && <Icon IconComponent={IconComponent} className="h-8 w-8 text-neutral-gray-dark" />}
                </label>
            )}

            <label
                htmlFor={id}
                className="group cursor-pointer hover:text-primary-medium mt-2 flex justify-center rounded-lg border border-dashed border-neutral-gray-medium px-6 py-10 bg-neutral-white"
            >
                <div className="text-center">
                    <div className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-medium focus-within:ring-offset-2 hover:text-primary-medium">
                        <Icon
                            IconComponent={IconComponent || null}
                            className="mx-auto h-12 w-12 text-neutral-gray-medium group-hover:text-primary-medium transition-all ease-in-out duration-255"
                            size="large"
                        />

                        <span className='group-hover:text-primary-medium transition-all ease-in-out duration-255'>
                            {selectedFile ? selectedFile.name : 'Haz clic para subir archivo'}
                        </span>

                        <input
                            id={id}
                            type="file"
                            name={name || id}
                            onChange={onChange}
                            className="sr-only"
                            accept={accept}
                        />
                    </div>

                    <Text variant="caption" color="medium">
                        {selectedFile
                            ? `Tamaño: ${parseInt(convertToKB(selectedFile.size))} KB`
                            : `PDF hasta ${maxSize}`
                        }
                    </Text>

                    {errorMessage && <Text variant="error" className="mt-2">{errorMessage}</Text>}
                </div>
            </label>
        </div>
    );
};

FileUploadField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    accept: PropTypes.string,
    selectedFile: PropTypes.object,
    IconComponent: PropTypes.elementType,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    maxSize: PropTypes.string,
    className: PropTypes.string,
};

export default FileUploadField;