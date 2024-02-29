import {TransfertDto} from "./TransfertDto.model";
import {BeneficiaryDto} from "./BeneficiaryDto.model";

export class TransferRequest{
  transfertDto: TransfertDto;
  id_beneficiary: number;
  id_user: number;
  bene: BeneficiaryDto;

  constructor( transferDto: TransfertDto,
  id_beneficiary: number,
  id_user: number,
  bene: BeneficiaryDto) {
    this.transfertDto=transferDto;
    this.id_beneficiary=id_beneficiary;
    this.id_user=id_user;
    this.bene=bene;
  }

}
