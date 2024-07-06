export function checarResultado(resultado: any[], id?: number) {
    if (id) {
        return (resultado.length && resultado[0].id != id) ? false : true
    } else {
        return resultado.length ? false : true
    }
}
