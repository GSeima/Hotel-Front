export interface ObterReservaModel {
    reservaId: number
    cpf: string
    nomeCompleto: string
    hospedes: Array<string>
    quartoId: number
    dataCriacaoReserva: Date
    dataEntrada: Date
    dataSaida: Date
    checkIn: Date
    checkOut: Date
    valorTotal: number
}