// components/ui/PhoneInput.tsx
'use client';

import { forwardRef, useState, useEffect } from 'react';
import {
    defaultCountries,
    parseCountry,
    FlagImage,
} from 'react-international-phone';
import type { CountryIso2 } from 'react-international-phone';
import 'react-international-phone/style.css';

// components/ui/PhoneInput.tsx
// La interfaz PhoneData se mantiene igual
export interface PhoneData {
    countryCode: CountryIso2;    // ✅ 'EC', 'ES', 'MX'
    countryPhone: string;        // ✅ '+593', '+34', '+52'
    number: string;              // Número sin código
    fullNumber: string;          // Número completo: '+593998765432'
}

interface PhoneInputProps {
    value?: PhoneData;
    onChange?: (phone: PhoneData) => void;
    defaultCountry?: CountryIso2;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    label?: string;
    required?: boolean;
    className?: string;
}

export const PhoneInput = forwardRef<HTMLDivElement, PhoneInputProps>(
    (
        {
            value,
            onChange,
            defaultCountry = 'ec',
            placeholder = '99 876 5432',
            disabled = false,
            error,
            label,
            required = false,
            className = '',
        },
        ref
    ) => {
        const [isOpen, setIsOpen] = useState(false);
        const [search, setSearch] = useState('');
        const [selectedCountry, setSelectedCountry] = useState(() => {
            // Buscar por código ISO o por código telefónico
            if (value?.countryCode) {
                const country = defaultCountries.find((c) => {
                    const parsed = parseCountry(c);
                    return parsed.iso2 === value.countryCode.toLowerCase();
                });
                if (country) return parseCountry(country);
            }
            if (value?.countryPhone) {
                const country = defaultCountries.find((c) => {
                    const parsed = parseCountry(c);
                    return `+${parsed.dialCode}` === value.countryPhone;
                });
                if (country) return parseCountry(country);
            }
            // Por defecto
            const defaultC = defaultCountries.find(c => parseCountry(c).iso2 === defaultCountry);
            return defaultC ? parseCountry(defaultC) : parseCountry(defaultCountries[0]);
        });

        const [phoneNumber, setPhoneNumber] = useState(value?.number || '');

        // Sincronizar con value externo
        useEffect(() => {
            if (value) {
                setPhoneNumber(value.number || '');
                if (value.countryCode) {
                    const country = defaultCountries.find((c) => {
                        const parsed = parseCountry(c);
                        return parsed.iso2 === value.countryCode.toLowerCase();
                    });
                    if (country) {
                        setSelectedCountry(parseCountry(country));
                    }
                } else if (value.countryPhone) {
                    const country = defaultCountries.find((c) => {
                        const parsed = parseCountry(c);
                        return `+${parsed.dialCode}` === value.countryPhone;
                    });
                    if (country) {
                        setSelectedCountry(parseCountry(country));
                    }
                }
            }
        }, [value?.countryCode, value?.countryPhone, value?.number]);

        const filteredCountries = defaultCountries.filter((country) => {
            const parsed = parseCountry(country);
            return (
                parsed.name.toLowerCase().includes(search.toLowerCase()) ||
                parsed.iso2.toLowerCase().includes(search.toLowerCase()) ||
                `+${parsed.dialCode}`.includes(search)
            );
        });

        const handleCountrySelect = (country: typeof defaultCountries[0]) => {
            const parsed = parseCountry(country);
            setSelectedCountry(parsed);
            setIsOpen(false);
            setSearch('');

            onChange?.({
                countryCode: parsed.iso2 as CountryIso2,     // ✅ 'ec', 'es', 'mx'
                countryPhone: `+${parsed.dialCode}`,          // ✅ '+593', '+34', '+52'
                number: phoneNumber,
                fullNumber: `+${parsed.dialCode}${phoneNumber.replace(/\s/g, '')}`,
            });
        };

        const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newNumber = e.target.value.replace(/[^\d\s-]/g, '');
            setPhoneNumber(newNumber);

            onChange?.({
                countryCode: selectedCountry.iso2 as CountryIso2,
                countryPhone: `+${selectedCountry.dialCode}`,
                number: newNumber,
                fullNumber: `+${selectedCountry.dialCode}${newNumber.replace(/\s/g, '')}`,
            });
        };

        const getErrorMessage = () => {
            if (!error) return null;
            return (
                <div className="invalid-feedback d-block">{error}</div>
            );
        };

        return (
            <div ref={ref} className={`phone-input-wrapper ${className}`}>
                {label && (
                    <label className={`form-label ${required ? 'required' : ''}`}>
                        {label}
                    </label>
                )}

                <div className="input-group">
                    {/* Selector de país */}
                    <div className="position-relative">
                        <button
                            type="button"
                            className={`btn btn-light d-flex align-items-center gap-2 px-3 ${
                                error ? 'border-danger' : ''
                            }`}
                            onClick={() => !disabled && setIsOpen(!isOpen)}
                            disabled={disabled}
                            style={{
                                height: '42px',
                                borderTopRightRadius: 0,
                                borderBottomRightRadius: 0,
                                borderRight: 'none',
                                whiteSpace: 'nowrap',
                                flexShrink: 0,
                            }}
                        >
                            <FlagImage
                                iso2={selectedCountry.iso2}
                                size="20px"
                                style={{ flexShrink: 0 }}
                            />
                            <span className="fw-semibold d-none d-sm-inline">
                +{selectedCountry.dialCode}
              </span>
                            <span className="fw-semibold d-sm-none">
                +{selectedCountry.dialCode}
              </span>
                            <i
                                className={`ki-duotone ki-${isOpen ? 'up' : 'down'} fs-7 flex-shrink-0`}
                            >
                                <span className="path1"></span>
                                <span className="path2"></span>
                            </i>
                        </button>

                        {/* Dropdown menu */}
                        {isOpen && (
                            <>
                                <div
                                    className="position-fixed top-0 start-0 w-100 h-100"
                                    style={{ zIndex: 1055 }}
                                    onClick={() => {
                                        setIsOpen(false);
                                        setSearch('');
                                    }}
                                />

                                <div
                                    className="position-absolute mt-2 bg-white rounded shadow-lg border"
                                    style={{
                                        zIndex: 1056,
                                        width: '300px',
                                        maxWidth: 'calc(100vw - 32px)',
                                        maxHeight: '300px',
                                        overflow: 'hidden',
                                        left: 0,
                                    }}
                                >
                                    <div className="p-2 border-bottom">
                                        <div className="input-group input-group-sm">
                      <span className="input-group-text border-0 bg-light">
                        <i className="ki-duotone ki-magnifier fs-6">
                          <span className="path1"></span>
                          <span className="path2"></span>
                        </i>
                      </span>
                                            <input
                                                type="text"
                                                className="form-control form-control-sm border-0 bg-light"
                                                placeholder="Buscar país..."
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                autoFocus
                                                onClick={(e) => e.stopPropagation()}
                                            />
                                        </div>
                                    </div>

                                    <div className="overflow-auto" style={{ maxHeight: '250px' }}>
                                        {filteredCountries.map((country) => {
                                            const parsed = parseCountry(country);
                                            const isSelected = parsed.iso2 === selectedCountry.iso2;

                                            return (
                                                <button
                                                    key={parsed.iso2}
                                                    type="button"
                                                    className={`d-flex align-items-center w-100 px-4 py-2 border-0 bg-transparent hover-bg-light ${
                                                        isSelected ? 'bg-light-primary' : ''
                                                    }`}
                                                    onClick={() => handleCountrySelect(country)}
                                                >
                                                    <FlagImage
                                                        iso2={parsed.iso2}
                                                        size="20px"
                                                        style={{ flexShrink: 0 }}
                                                    />
                                                    <span className="ms-3 flex-grow-1 text-start text-truncate">
                            {parsed.name}
                          </span>
                                                    <span className="text-muted ms-2 flex-shrink-0">
                            +{parsed.dialCode}
                          </span>
                                                    {isSelected && (
                                                        <i className="ki-duotone ki-check-circle fs-5 text-primary ms-2 flex-shrink-0">
                                                            <span className="path1"></span>
                                                            <span className="path2"></span>
                                                        </i>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Input de número */}
                    <input
                        type="tel"
                        className={`form-control ${error ? 'is-invalid' : ''}`}
                        placeholder={placeholder}
                        value={phoneNumber}
                        onChange={handlePhoneChange}
                        disabled={disabled}
                        style={{ height: '42px' }}
                    />
                </div>

                {getErrorMessage()}
            </div>
        );
    }
);

PhoneInput.displayName = 'PhoneInput';