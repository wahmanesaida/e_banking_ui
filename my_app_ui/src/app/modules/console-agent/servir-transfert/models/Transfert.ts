import { TypeOfFees } from "../../../../models/TypeOfFees.enum";
import { TypeOftransfer } from "../../../../models/TypeOftransfer.enum";
import { User } from "../../../../models/User.model";
import { Beneficiary } from "./Beneficiary";



export class Transfert{
   
    id?:number;
    amount_transfer?:number;
    typeOftransfer?:TypeOftransfer;
    typeOfFees?:TypeOfFees;
    amountOfFees?:number;
    status?:string;
    createTime?:Date;
    transferRef?:string;
    client?:User;
    agent?:User;
    motif?:string;
    beneficiary?:Beneficiary;

    constructor(
        id?:number,
        amount_transfer?:number,
        typeOftransfer?:TypeOftransfer,
        typeOfFees?:TypeOfFees,
        amountOfFees?:number,
        status?:string,
        createTime?:Date,
        transferRef?:string,
        client?:User,
        agent?:User,
        motif?:string,
        beneficiary?:Beneficiary

    ) {
        this.id = id;
        this.amount_transfer = amount_transfer;
        this.typeOftransfer = typeOftransfer;
        this.typeOfFees = typeOfFees;
        this.amountOfFees = amountOfFees;
        this.status = status;
        this.createTime = createTime;
        this.transferRef = transferRef;
        this.client = client;
        this.agent = agent;
        this.motif = motif;
        this.beneficiary = beneficiary;
    }

}