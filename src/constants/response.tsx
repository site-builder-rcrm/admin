import Fields from "../types/field";

export const DEFAULT_CUSTOMER_FIELDS: Fields = {
  FirstName: {
    type: "text",
    label: "First Name",
    required: true
  },
  LastName: {
    type: "text",
    label: "Last Name",
    required: true,
    placeholder: "Doe"
  },
  Email: {
    type: "email",
    label: "Email",
    required: true
  },
  Phone: {
    type: "phone",
    label: "Phone",
    required: true
  },
  Address1: {
    type: "text",
    label: "Address 1",
    required: true
  },
  Address2: {
    type: "text",
    label: "Address 2",
    required: false
  },
  City: {
    type: "text",
    label: "City",
    required: true
  },
  State: {
    type: "text",
    label: "State",
    required: true
  },
  CountryISO: {
    type: "text",
    label: "Country",
    required: true
  },
  ZipCode: {
    type: "text",
    label: "Zip",
    required: true
  }
};
export const DEFAULT_BILLING_FIELDS: Fields = {
  FirstName: {
    type: "text",
    label: "First Name",
    required: true
  },
  LastName: {
    type: "text",
    label: "Last Name",
    required: true,
    placeholder: "Doe"
  },
  Address1: {
    type: "text",
    label: "Address 1",
    required: true
  },
  Address2: {
    type: "text",
    label: "Address 2",
    required: false
  },
  City: {
    type: "text",
    label: "City",
    required: true
  },
  State: {
    type: "text",
    label: "State",
    required: true
  },
  CountryISO: {
    type: "text",
    label: "Country",
    required: true
  },
  ZipCode: {
    type: "text",
    label: "Zip",
    required: true
  }
};
