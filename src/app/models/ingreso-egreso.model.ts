export class IngresoEgreso {
  constructor(
    public desctipcion: string,
    public monto : number,
    public tipo : string,
    public uid? : string
  ) {
  }
}
