import React from 'react';

const ButtonBurger = ({ onChange, value }) => {
    return (
        <div className="hidden z-[120] md:block">
            <label
                htmlFor="check"
                className="flex flex-col justify-center items-center gap-[13%] w-9 h-9 bg-[rgba(49,49,49,0.72)] border border-[var(--color-accent-yellow)] rounded-lg transition-all duration-300 cursor-pointer"
            >
                <input
                    id="check"
                    type="checkbox"
                    value={value}
                    onChange={() => onChange(!value)}
                    className="hidden"
                />
                <span className="w-6 h-0.5 bg-[var(--color-accent-yellow)] rounded-full transition-transform duration-300 ease-in-out top"></span>
                <span className="w-6 h-0.5 bg-[var(--color-accent-yellow)] rounded-full transition-transform duration-300 ease-in-out mid"></span>
                <span className="w-6 h-0.5 bg-[var(--color-accent-yellow)] rounded-full transition-transform duration-300 ease-in-out bot"></span>
            </label>
        </div>
    );
};

export default ButtonBurger;