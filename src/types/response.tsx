export interface Customer {
  CustomerID: string;
  SiteID: string;
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Phone?: string;
  Address1?: string;
  Address2?: string;
  City?: string;
  State?: string;
  CountryISO?: string;
  ZipCode?: string;
  IpAddress?: string;
}

export interface SignUpTransaction {
  CustomerID: string;
  IpAddress: string;
  BillingAddress: BillingAddress;
  Payment: Payment;
}

export interface BillingAddress {
  FirstName: string;
  LastName: string;
  Address1: string;
  Address2?: string;
  City: string;
  CountryISO: string;
  State: string;
  ZipCode: string;
}

export interface PaymentCustomProduct {
  ProductID: number;
  Amount?: number;
  Quantity?: number;
  IsPricePerPackage?: boolean;
}

export interface PaymentProductGroup {
  ProductGroupKey: string;
  CustomProducts?: PaymentCustomProduct[];
}

export interface Payment {
  ExpMonth: string; //11
  ExpYear: string; //2020
  CCNumber: string;
  NameOnCard: string; //first last
  CVV: string; //123
  ProductGroups: PaymentProductGroup[];
}
