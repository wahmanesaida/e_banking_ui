import { TransferRefDTO } from "../modules/console-agent/servir-transfert/models/TransferRefDTO";


export class RenvoiDto {

    transferRef?:string;

    constructor(
    transferRef?:string
    ) {
        this.transferRef = transferRef;
    }

}