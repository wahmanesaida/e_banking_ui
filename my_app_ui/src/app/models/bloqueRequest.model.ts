import {TransferStatus} from "./TransferStatus.enum";

export class bloqueRequest{
  reference: string;
  status: TransferStatus;

  constructor(reference: string,
  status: TransferStatus) {
    this.reference=reference;
    this.status=status;

  }


}
