import { TypeOftransfer } from '../../../../models/TypeOftransfer.enum';

export class TransferRefDTO {
  id?: number;
  idAgent?: number;
  amount_transfer?: number;
  transferRef?: string; 
  typeOftransfer?: TypeOftransfer;
  idClient?: number; 

  constructor(
    transferRef?: string,
    id?: number,
    idAgent?: number,
    amount_transfer?: number,
    typeOftransfer?: TypeOftransfer,
    idClient?: number
  ) {
    this.transferRef = transferRef;
    this.id = id;
    this.idAgent = idAgent;
    this.amount_transfer = amount_transfer;
    this.typeOftransfer = typeOftransfer;
    this.idClient = idClient;
    
  }


}
