import React, { useState } from 'react';

const Search = ({ onSearch = () => { }, value = '' }) => {
    const [inputValue, setInputValue] = useState(value);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(inputValue); // Notifica al padre el término de búsqueda
    };

    const handleReset = () => {
        setInputValue(''); // Limpia el input visualmente
        onSearch(''); // Notifica al padre que se ha limpiado la búsqueda
    };

    return (
        <div className="relative w-full max-w-md">
            <form
                className="flex items-center bg-white border-2 border-[var(--color-neutral-gray-light)] rounded-full px-4 py-2 focus-within:ring-2 focus-within:ring-[var(--color-primary)]"
                onSubmit={handleSubmit}
            >
                <button
                    type="submit"
                    aria-label="Buscar"
                    className="text-[var(--color-neutral-gray-medium)] hover:text-[var(--color-primary)]"
                >
                    <svg
                        width={17}
                        height={16}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-labelledby="search"
                    >
                        <path
                            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                            stroke="currentColor"
                            strokeWidth="1.333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
                <input
                    value={inputValue}
                    onChange={handleInputChange}
                    className="flex-grow bg-transparent text-[var(--color-neutral-gray-medium)] placeholder-[var(--color-neutral-gray-medium)] focus:outline-none px-2"
                    placeholder="Realiza tu búsqueda"
                    type="text"
                />
                <button
                    type="button"
                    aria-label="Restablecer"
                    className={`text-[var(--color-neutral-gray-medium)] hover:text-color-accent-red ${inputValue ? 'opacity-100 visible' : 'opacity-0 invisible'
                        } transition-opacity`}
                    onClick={handleReset}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default Search;