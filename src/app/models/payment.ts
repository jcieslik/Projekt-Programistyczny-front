export class Payment {
    tokenId: string;
    amount: number;

    public Payment(tokenId: string, amount: number) {
        this.tokenId = tokenId;
        this.amount = amount;
    }
  }