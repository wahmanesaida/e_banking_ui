import {Motif} from "./Motif.enum";


export class ReturnTransferDTO{

  transferRef: string;
  motif: Motif;
  id_agent: number;
  notification : boolean;

  constructor( transferRef: string,
  motif: Motif,
  id_agent: number,
  notification : boolean,) {
    this.transferRef=transferRef;
    this.motif=motif;
    this.id_agent=id_agent;
    this.notification=notification;
  }
}


