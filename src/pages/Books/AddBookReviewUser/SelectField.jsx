import React from 'react';

const SelectField = ({
    label,
    name,
    options,
    register,
    errors,
    validation = {},
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
            </label>

            <select
                {...register(name, validation)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {errors?.[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};

export default SelectField;
