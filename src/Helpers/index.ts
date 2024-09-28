export function filterbyName(array: Array<any>, value: string) {
    const valorLowerCase = value.toLowerCase();

    return array.filter(object => object.nombre.toLowerCase().includes(valorLowerCase));
}

export function filterbyCategoryId(array: Array<any>, value: number) {;
    return array.filter(object => object.id_categoria == value);
}