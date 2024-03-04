import { BeneficiaryDto } from "./BeneficiaryDto";
import { TransferRefDTO } from "./TransferRefDTO";



export class TransferPaymentDto{
    transferRefDTO?:TransferRefDTO;
    beneficiaryDto?:BeneficiaryDto;

    
    constructor(
        transferRefDTO?:TransferRefDTO,
        beneficiaryDto?:BeneficiaryDto

    ) {

        this.beneficiaryDto = beneficiaryDto;
        this.transferRefDTO = transferRefDTO;
        
        
    }
}