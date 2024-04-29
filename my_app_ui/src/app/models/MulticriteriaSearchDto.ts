import { TypeOftransfer } from './TypeOftransfer.enum';

export class MulticriteriaSearchDto {
  transferRef?: string;
  codeClient?: number;
  codeAgent?: number;
  typeOftransfer?: TypeOftransfer;
  status?: string;
  createTime?: Date;

  constructor(
    transferRef?: string,
    codeClient?: number,
    codeAgent?: number,
    typeOftransfer?: TypeOftransfer,
    status?: string,
    createTime?: Date
  ) {
    this.transferRef = transferRef;
    this.codeClient = codeClient;
    this.codeAgent = codeAgent;
    this.typeOftransfer = typeOftransfer;
    this.status = status;
    this.createTime = createTime;

  }
}
