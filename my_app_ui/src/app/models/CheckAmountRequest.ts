import { TransfertDto } from "./TransfertDto.model";
import { User } from "./User.model";


export class CheckAmountRequest{
    transfertDto: TransfertDto;
    user: User;
    checkAmount: number;

    constructor(transfertDto: TransfertDto,user: User, checkAmount: number) {
        this.transfertDto = transfertDto;
        this.user= user;
        this.checkAmount = checkAmount;
    }


}