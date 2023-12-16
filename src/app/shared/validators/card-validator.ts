export function validateCardNumber(cardNumber: string): boolean {

    const cleanedCardNumber = cardNumber.replace(/\D/g, '');

    if (cleanedCardNumber.length !== 16) {
        return false;
    }

    let sum = 0;
    let shouldDouble = false;
    for (let i = cleanedCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanedCardNumber.charAt(i));

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

export function validateExpiryDate(expiryDate: string): boolean {
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;


    if (!expiryDatePattern.test(expiryDate)) return false;

    const [month, year] = expiryDate.split('/').map(Number);
    if (year < 0 || year > 99) return false;

    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    return year > currentYear || (year === currentYear && month >= currentMonth);
}