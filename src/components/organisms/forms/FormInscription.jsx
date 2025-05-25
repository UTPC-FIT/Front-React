import React, { useState, useRef } from 'react';

import { FiUser, FiPhone, FiUsers, FiSend } from "react-icons/fi";

import UploadFileRegister from '@organisms/UploadFileRegister';
import InputWithLabel from '@molecules/InputWithLabel';
import InputSelection from '@molecules/InputSelection';
import ButtonWithIcon from '@molecules/ButtonWithIcon';

import { useRegistration } from '@hooks/useRegistration';


const FormInscription = ({ age = 20 }) => {
    const { register, loading, error, data } = useRegistration();
    const [formData, setFormData] = useState({
        consent_document: null,
        parental_authorization: null,
        emergency_contact_name: '',
        emergency_contact_phone: '',
        emergency_contact_relationship: ''
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        const maxSize = 1024 * 1024; // 1MB in bytes

        if (file) {
            if (file.size > maxSize) {
                setErrors(prev => ({
                    ...prev,
                    [fileType === 'informedConsent' ? 'consent_document' : 'parental_authorization']:
                        'El tamaño del archivo debe ser menor a 1MB'
                }));
                return;
            }

            if (fileType === 'informedConsent') {
                setFormData(prev => ({ ...prev, consent_document: file }));
                setErrors(prev => ({ ...prev, consent_document: null }));
            } else if (fileType === 'parentalAuthorization') {
                setFormData(prev => ({ ...prev, parental_authorization: file }));
                setErrors(prev => ({ ...prev, parental_authorization: null }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validation
        if (age >= 18 && !formData.consent_document) {
            newErrors.consent_document = 'Por favor suba el documento de consentimiento';
        }

        if (age < 18 && !formData.parental_authorization) {
            newErrors.parental_authorization = 'Por favor suba la autorización parental';
        }

        if (!formData.emergency_contact_name) {
            newErrors.emergency_contact_name = 'Por favor ingrese el nombre del contacto de emergencia';
        }

        if (!formData.emergency_contact_phone) {
            newErrors.emergency_contact_phone = 'Por favor ingrese el número de contacto';
        } else if (!/^[0-9]+$/.test(formData.emergency_contact_phone)) {
            newErrors.emergency_contact_phone = 'Por favor ingrese solo números';
        }

        if (!formData.emergency_contact_relationship) {
            newErrors.emergency_contact_relationship = 'Por favor seleccione el parentesco';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log('Form submitted:', formData);

            e.preventDefault();
            try {
                const resp = await register(formData);
                console.log('Registro OK:', resp);
            } catch (err) {
                console.error('Error al registrar:', err);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Emergency Contact Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-6 text-[var(--color-neutral-gray-blue)] border-b pb-3">
                    Contacto de Emergencia
                </h3>

                <div className="mb-4">
                    <InputWithLabel
                        label="Nombre Completo (*)"
                        name="emergency_contact_name"
                        value={formData.emergency_contact_name}
                        onChange={handleInputChange}
                        placeholder="Nombre del contacto de emergencia"
                        icon={<FiUser />}
                        variant="primary"
                        error={errors.emergency_contact_name}
                        required
                    />
                </div>

                <div className="mb-4">
                    <InputWithLabel
                        label="Número de Contacto (*)"
                        name="emergency_contact_phone"
                        value={formData.emergency_contact_phone}
                        onChange={handleInputChange}
                        placeholder="Número de contacto"
                        icon={<FiPhone />}
                        variant="primary"
                        error={errors.emergency_contact_phone}
                        required
                    />
                </div>

                <InputSelection
                    label="Parentesco (*)"
                    name="emergency_contact_relationship"
                    value={formData.emergency_contact_relationship}
                    onChange={handleInputChange}
                    placeholder="Seleccione el parentesco"
                    icon={<FiUsers />}
                    variant="primary"
                    error={errors.emergency_contact_relationship}
                    options={[
                        { value: "padre", label: "Padre" },
                        { value: "madre", label: "Madre" },
                        { value: "hermano", label: "Hermano/a" },
                        { value: "conyuge", label: "Cónyuge" },
                        { value: "otro", label: "Otro" }
                    ]}
                />
            </div>

            {/* Document Upload Section */}
            <UploadFileRegister
                age={age}
                parentalAuthorization={formData.parental_authorization}
                informedConsent={formData.consent_document}
                handleFileChange={handleFileChange}
                errorMessage={age >= 18 ? errors.consent_document : errors.parental_authorization}
            />

            <div className='w-full flex justify-center'>
                <ButtonWithIcon
                    type="submit"
                    variant="primary"
                    IconComponent={FiSend}
                    iconPosition="right"
                >
                    Enviar Inscripción
                </ButtonWithIcon>
            </div>
        </form>
    );
};

export default FormInscription;