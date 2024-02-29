export class BeneficiaryDto{

  firstName: string;
  lastname: string;
  //GSM: string;
  username: string;

  constructor(firstName: string, lastname: string, username: string) {
    this.firstName = firstName;
    this.lastname = lastname;
    //this.GSM = GSM;
    this.username = username;
  }

}
