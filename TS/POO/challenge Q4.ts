import assert from "assert";

class BankCustomer {
  private name: string;
  private secretCode: number;

  constructor(name: string, secretCode: number) {
    this.name = name;
    this.secretCode = secretCode;
  }

  public getName(): string {
    return this.name;
  }
  public verifyPinInput(pin: number): boolean {
    if (pin === this.secretCode) {
      return true;
    }
    {
      return false;
    }
  }
}

// Tests

const customer = new BankCustomer("John Doe", 3579);

assert.equal(typeof customer.getName, "function");

assert.equal(typeof customer.verifyPinInput, "function");

assert.equal(customer.getName(), "John Doe");

assert.ok(customer.verifyPinInput(3579));
