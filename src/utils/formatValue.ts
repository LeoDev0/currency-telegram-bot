const formatValue = (value: number) => (
    Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
        .format(value)
        .replace('.', ',')
); 

export default formatValue;