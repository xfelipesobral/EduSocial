function verificaSeTodosDigitosIguais(documento: string): boolean {
    return documento.split('').every(digito => digito === documento[0])
}

export function validaCpf(cpf: string): boolean {
    function calculaDigitoVerificador(cpf: string, inicio: number, fim: number): number {
        let soma = 0
        let posicao = inicio

        for (let i = 0; i < fim; i++) {
            soma += parseInt(cpf[i]) * posicao
            posicao--
        }

        const resto = soma % 11
        return resto < 2 ? 0 : 11 - resto
    }

    cpf = cpf.replace(/[^\d]+/g, '')

    if (cpf.length !== 11) {
        return false
    }

    if (verificaSeTodosDigitosIguais(cpf)) {
        return false
    }

    const primeiroDigito = calculaDigitoVerificador(cpf, 10, 9)
    const segundoDigito = calculaDigitoVerificador(cpf, 11, 10)

    return primeiroDigito === parseInt(cpf[9]) && segundoDigito === parseInt(cpf[10])
}

export function validaRg(rg: string) {
    function calculaDigitoVerificador(rg: string): number {
        const pesos = [2, 3, 4, 5, 6, 7, 8, 9]
        let soma = 0

        for (let i = 0; i < rg.length; i++) {
            soma += parseInt(rg[i]) * pesos[i]
        }

        const resto = soma % 11
        return resto === 0 ? 1 : resto === 1 ? 0 : 11 - resto
    }

    rg = rg.replace(/[^\d]+/g, '')

    if (rg.length !== 9) {
        return false
    }

    if (verificaSeTodosDigitosIguais(rg)) {
        return false
    }

    const digitoVerificador = calculaDigitoVerificador(rg.slice(0, 8))
    return digitoVerificador === parseInt(rg[8])
}

export default function validaDocumento(documento: string): boolean {
    documento = documento.replace(/[^\d]+/g, '')   

    if (documento.length === 11) return validaCpf(documento)
    if (documento.length === 8) return validaRg(documento)
    
    return false
}