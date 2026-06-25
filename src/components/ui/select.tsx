import Select from "react-select";

type Option = {
    value: string;
    label: string;
};

type Props = {
    options: Option[];
    value?: Option | null;
    onChange: (option: Option | null) => void;
    placeholder?: string;
};

export default function SystemSelect({
                                           options,
                                           value,
                                           onChange,
                                           placeholder, ...props}: Props) {

    const select2Styles = {
        control: (provided, state) => ({
            ...provided,
            backgroundColor: '#ffffff',
            borderColor: state.isFocused ? '#a1a5b7' : '#e4e6ef', // Gris claro de Metronic / Gris más oscuro en focus
            boxShadow: state.isFocused ? '0 0 0 0.2rem rgba(80, 165, 241, 0.25)' : 'none', // Efecto focus sutil
            borderRadius: '0.475rem', // Radio de borde típico de Metronic v8+
            minHeight: 'calc(1.5em + 1.65rem + 2px)', // Altura estándar de inputs en Metronic
            padding: '0 0.5rem',
            transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
            '&:hover': {
                borderColor: state.isFocused ? '#a1a5b7' : '#d1d3e0',
            },
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: '0 6px',
        }),
        input: (provided) => ({
            ...provided,
            color: '#181c32', // Color de texto principal de Metronic
            fontFamily: 'Poppins, Helvetica, sans-serif',
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#181c32',
            fontFamily: 'Poppins, Helvetica, sans-serif',
            fontSize: '1.1rem',
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#a1a5b7', // Color mutado de Metronic
            fontFamily: 'Poppins, Helvetica, sans-serif',
            fontSize: '1.1rem',
        }),
        menu: (provided) => ({
            ...provided,
            borderRadius: '0.475rem',
            boxShadow: '0 0 50px 0 rgba(82, 63, 105, 0.15)', // Sombra de dropdown de Metronic
            backgroundColor: '#ffffff',
            border: '1px solid #e4e6ef',
            zIndex: 9999,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected
                ? '#f1f1f4' // Fondo seleccionado (gris Metronic)
                : state.isFocused
                    ? '#f9f9f9' // Hover
                    : 'transparent',
            color: state.isSelected ? '#181c32' : '#5e6278', // Color de texto activo vs normal
            fontFamily: 'Poppins, Helvetica, sans-serif',
            padding: '0.75rem 1.25rem',
            cursor: 'pointer',
            '&:active': {
                backgroundColor: '#f1f1f4',
            },
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            div: {
                color: '#a1a5b7', // Flecha del select
                '&:hover': {
                    color: '#7e8299',
                },
            },
        }),
        indicatorSeparator: () => ({
            display: 'none', // Metronic/Select2 usualmente no tiene la línea separadora
        }),
    };

    return (
        <Select
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            classNamePrefix="form-select"
            styles={select2Styles}
            required={true}
            {...props}
        />
    );
}