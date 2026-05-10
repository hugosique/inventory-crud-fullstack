export const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export const currencyMask = (value: string | number) => {
    if (typeof value === "number") {
        return currencyFormatter.format(value);
    }
    const cleanValue = value.replace(/\D/g, "");

    return currencyFormatter.format(Number(cleanValue) / 100);
};

export function parseCurrencyInput(value: string) {
    return Number(value.replace(/\D/g, "")) / 100;
}