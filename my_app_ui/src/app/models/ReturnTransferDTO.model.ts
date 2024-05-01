import {Motif} from "./Motif.enum";


export class ReturnTransferDTO{

  transferRef: string;
  motif: Motif;
  id_agent: number;
  notification : boolean;
  client_id: number

  constructor( transferRef: string,
  motif: Motif,
  id_agent: number,
  notification : boolean,
   client_id: number) {
    this.transferRef=transferRef;
    this.motif=motif;
    this.id_agent=id_agent;
    this.notification=notification;
    this.client_id=client_id;
  }

}


