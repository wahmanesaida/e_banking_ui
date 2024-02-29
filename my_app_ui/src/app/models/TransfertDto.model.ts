import {TypeOfFees} from "./TypeOfFees.enum";
import {TypeOftransfer} from "./TypeOftransfer.enum";

export class TransfertDto {
  amount_entred: number;
  //amount_transfer: number;
  notification: boolean;
  //generateRef: string;
  fees: TypeOfFees;
 // amount_total: number;
  typeOftransfer: TypeOftransfer;
  constructor(
    amount_entred: number,
   // amount_transfer: number,
    notification: boolean,
    //generateRef: string,
    fees: TypeOfFees,
    //amount_total: number,
    typeOftransfer: TypeOftransfer
  ) {
    this.amount_entred = amount_entred;
   // this.amount_transfer = amount_transfer;
    this.notification = notification;
    //this.generateRef = generateRef;
   this.fees=fees;
    //this.amount_total = amount_total;
    this.typeOftransfer = typeOftransfer;
  }
}
