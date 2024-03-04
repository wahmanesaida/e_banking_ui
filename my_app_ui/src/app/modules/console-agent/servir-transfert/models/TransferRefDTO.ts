import { TypeOftransfer } from '../../../../models/TypeOftransfer.enum';

export class TransferRefDTO {
  id?: number;
  idAgent?: number;
  amount_transfer?: number;
  transferRef?: string; 
  ypeOftransfer?: TypeOftransfer;
  idClient?: number; 

  constructor(
    transferRef?: string
  ) {
    
    this.transferRef = transferRef;
    
  }


}
