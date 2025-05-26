import React from 'react';
import PropTypes from 'prop-types';
import { TbFileSmile, TbFileAlert } from 'react-icons/tb';
import Text from '@atoms/Text';

const FileUploadField = ({
    id,
    name,
    label,
    accept = ".pdf",
    selectedFile,
    onChange,
    errorMessage,
    description,
    required,
    onClick,
    inputRef,
}) => {
    const FileIcon = errorMessage ? TbFileAlert : TbFileSmile;
    const iconColorClass = errorMessage ? 'text-[var(--color-accent-red)]' : 'text-[var(--color-primary)]';

    return (
        <div className="mb-6">
            {label && (
                <label className="block text-gray-700 font-medium mb-2">
                    {label}
                    {required && <span className="text-[var(--color-accent-red)] ml-1">*</span>}
                </label>
            )}
            <div
                onClick={onClick}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                    ${errorMessage ? 'border-[var(--color-accent-red-light)] bg-red-50' : 'border-gray-300 hover:border-[var(--color-primary)] bg-gray-50 hover:bg-gray-100'}`}
            >
                <input
                    id={id}
                    name={name}
                    type="file"
                    ref={inputRef}
                    onChange={onChange}
                    className="hidden"
                    accept={accept}
                />

                <div className="flex flex-col items-center">
                    <FileIcon className={`text-4xl mb-3 ${iconColorClass}`} />

                    {selectedFile ? (
                        <p className="mb-1 text-gray-800 font-medium">{selectedFile.name}</p>
                    ) : (
                        <>
                            <p className="mb-1 text-gray-800 font-medium">
                                Presiona para subir el archivo {required && '*'}
                            </p>
                            <p className="text-sm text-gray-500">{description}</p>
                        </>
                    )}
                </div>
            </div>
            {errorMessage && (
                <Text className="mt-1" variant="caption" color="error" size="small">
                    {errorMessage}
                </Text>
            )}
        </div>
    );
};

FileUploadField.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    accept: PropTypes.string,
    selectedFile: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    description: PropTypes.string,
    required: PropTypes.bool,
    onClick: PropTypes.func,
    inputRef: PropTypes.object,
};

export default FileUploadField;