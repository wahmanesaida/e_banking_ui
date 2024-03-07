import { TransfertDto } from "./TransfertDto.model";
import { User } from "./User.model";


export class CheckAmountRequest{
    transfertDto: TransfertDto;
    id: number;


    constructor(transfertDto: TransfertDto, id: number) {
        this.transfertDto = transfertDto;
        this.id= id;

    }


}
