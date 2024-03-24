
export class TransferRefPinDto{
    transferRef?:string;
    codepin?:string;

    constructor( 
        transferRef?:string,
        codepin?:string
        ) {
            this.codepin = codepin;
            this.transferRef = transferRef;
        
        
    }



}