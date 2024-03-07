export class BeneficiaryDto {
  id?: number;
  title?: string;
  pieceIdentite?: string;
  paysEmission?: string;
  numeroPieceIdentite?: string;
  expirationPieceIdentite?: Date;
  validitePieceIdentite?: Date;
  datenaissance?: Date;
  profession?: string;
  payeNationale?: string;
  ville?: string;

  constructor(
  id?: number,
  title?: string,
  pieceIdentite?: string,
  paysEmission?: string,
  numeroPieceIdentite?: string,
  expirationPieceIdentite?: Date,
  validitePieceIdentite?: Date,
  datenaissance?: Date,
  profession?: string,
  payeNationale?: string,
  ville?: string

  ) {
    this.id= id;
    this.title=title;
    this.pieceIdentite=pieceIdentite;
    this.paysEmission=paysEmission;
    this.numeroPieceIdentite=numeroPieceIdentite;
    this.expirationPieceIdentite=expirationPieceIdentite;
    this.validitePieceIdentite =validitePieceIdentite;
    this.datenaissance = datenaissance;
    this.profession = profession;
    this.payeNationale = payeNationale;
    this.ville = ville; 
  }
}
