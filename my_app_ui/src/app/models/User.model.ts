export class User {
  title: string;
  pieceIdentite: string;
  paysEmission: string;
  numeroPieceIdentite: string;
  expirationPieceIdentite: Date;
  validitePieceIdentite: Date;
  datenaissance: Date;
  profession: string;
  payeNationale: string;
  ville: string;
  gsm: string;
  account_amount: number;
  id: number;
  username: string;
  token: string="";


  constructor(
    title: string,
    pieceIdentite: string,
    paysEmission: string,
    numeroPieceIdentite: string,
    expirationPieceIdentite: Date,
    validitePieceIdentite: Date,
    datenaissance: Date,
    profession: string,
    payeNationale: string,
    ville: string,
    GSM: string,
    account_amount: number,
    id: number,
    username: string,
    token: string
  ) {
    this.title = title;
    this.pieceIdentite = pieceIdentite;
    this.paysEmission = paysEmission;
    this.numeroPieceIdentite = numeroPieceIdentite;
    this.expirationPieceIdentite = expirationPieceIdentite;
    this.validitePieceIdentite = validitePieceIdentite;
    this.datenaissance = datenaissance;
    this.profession = profession;
    this.payeNationale = payeNationale;
    this.ville = ville;
    this.gsm = GSM;
    this.account_amount = account_amount;
    this.id=id;
    this.username=username;
    this.token=token;

  }

}
