export function filterbyName(array: Array<any>, value: string) {
    const valorLowerCase = value.toLowerCase();

    return array.filter(object => object.nombre.toLowerCase().includes(valorLowerCase));
}