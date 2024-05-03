import { Role } from "./Role.enum";
import { TypePieceIdentite } from "./TypePieceIdentite.enum";

export class UserDto{
    id?:number;
    username?:string;
    password?:string;
    name?:string;
    createTime?:Date;
    role?:Role;
    title?:string;
    pieceIdentite?:TypePieceIdentite;
    paysEmission?:string;
    numeroPieceIdentite?:string;
    expirationPieceIdentite?:Date;
    validitePieceIdentite?:Date;
    datenaissance?:Date;
    profession?:string;
    payeNationale?:string;
    ville?:string;
    GSM?:string;
    account_amount?:number;


    constructor(
        id?:number,
        username?:string,
        password?:string,
        name?:string,
        createTime?:Date,
        role?:Role,
        title?:string,
        pieceIdentite?:TypePieceIdentite,
        paysEmission?:string,
        numeroPieceIdentite?:string,
        expirationPieceIdentite?:Date,
        validitePieceIdentite?:Date,
        datenaissance?:Date,
        profession?:string,
        payeNationale?:string,
        ville?:string,
        GSM?:string,
        account_amount?:number
    ) {
        this.id=id;
        this.username=username;
        this.password=password;
        this.name=name;
        this.createTime=createTime;
        this.role=role;
        this.title=title;
        this.pieceIdentite=pieceIdentite;
        this.paysEmission=paysEmission;
        this.numeroPieceIdentite=numeroPieceIdentite;
        this.expirationPieceIdentite=expirationPieceIdentite;
        this.validitePieceIdentite=validitePieceIdentite;
        this.datenaissance=datenaissance;
        this.profession=profession;
        this.payeNationale=paysEmission;
        this.ville=ville;
        this.GSM=GSM;
        this.account_amount=account_amount;
    }
}