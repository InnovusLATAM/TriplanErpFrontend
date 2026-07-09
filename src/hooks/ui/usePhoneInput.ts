// hooks/ui/usePhoneInput.ts
import { useState, useCallback } from 'react';
import { parseCountry, defaultCountries } from 'react-international-phone';
import type { CountryIso2 } from 'react-international-phone';
import type { PhoneData } from '@/components/ui/phone-input';

interface UsePhoneInputOptions {
    initialValue?: PhoneData;
    defaultCountry?: CountryIso2;
}

function getPhoneCode(isoCode: CountryIso2): string {
    const country = defaultCountries.find(c => parseCountry(c).iso2 === isoCode);
    if (!country) return '+593';
    return `+${parseCountry(country).dialCode}`;
}

export function usePhoneInput(options: UsePhoneInputOptions = {}) {
    const {
        initialValue,
        defaultCountry = 'ec' // ✅ Ecuador ISO code
    } = options;

    const defaultCode = getPhoneCode(defaultCountry);

    const [phone, setPhone] = useState<PhoneData>(
        initialValue || {
            countryCode: defaultCountry,    // ✅ 'ec'
            countryPhone: defaultCode,      // ✅ '+593'
            number: '',
            fullNumber: '',
        }
    );

    const resetPhone = useCallback(() => {
        setPhone({
            countryCode: defaultCountry,    // ✅ 'ec'
            countryPhone: defaultCode,      // ✅ '+593'
            number: '',
            fullNumber: '',
        });
    }, [defaultCountry, defaultCode]);

    return {
        phone,
        setPhone,
        resetPhone,
    };
}