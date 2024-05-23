import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { User } from "../../../../models/User.model";



export class Beneficiary{
    id?:number;
    firstName?:string;
    lastname?:string;
    account_amount?:number;
    gsm?: string;
    username?:string;
    title?:string;
    pieceIdentite?:string;
    paysEmission?:string;
    numeroPieceIdentite?:string;
    expirationPieceIdentite?:Date;
    validitePieceIdentite?:Date;
    datenaissance?:Date;
    profession?:string;
    payeNationale?:string;
    ville?:string;
    client?:User;

    constructor(
    id?:number,
    firstName?:string,
    lastname?:string,
    account_amount?:number,
    gsm?:string,
    username?:string,
    title?:string,
    pieceIdentite?:string,
    paysEmission?:string,
    numeroPieceIdentite?:string,
    expirationPieceIdentite?:Date,
    validitePieceIdentite?:Date,
    datenaissance?:Date,
    profession?:string,
    payeNationale?:string,
    ville?:string,
    client?:User
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastname = lastname;
        this.account_amount = account_amount;
        this.gsm = gsm;
        this.username = username;
        this.title = title;
        this.pieceIdentite = pieceIdentite;
        this.paysEmission = paysEmission;
        this.numeroPieceIdentite = numeroPieceIdentite;
        this.expirationPieceIdentite = expirationPieceIdentite;
        this.validitePieceIdentite = validitePieceIdentite;
        this.datenaissance = datenaissance;
        this.profession = profession;
        this.payeNationale = payeNationale;
        this.ville= ville;
        this.client = client;
    }

}