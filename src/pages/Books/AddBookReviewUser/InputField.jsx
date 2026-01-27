import React from 'react';

const InputField = ({
    label,
    name,
    type = 'text',
    register,
    placeholder,
    errors,
    validation = {},
}) => {
    return (
        <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
                {label}
            </label>

            {type === "textarea" ? (
                <textarea
                    {...register(name, validation)}
                    placeholder={placeholder}
                    rows={4}
                    className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            ) : (
                <input
                    type={type}
                    {...register(name, validation)}
                    placeholder={placeholder}
                    className="p-2 border w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            )}

            {errors?.[name] && (
                <p className="text-red-500 text-sm mt-1">
                    {errors[name].message}
                </p>
            )}
        </div>
    );
};

export default InputField;
