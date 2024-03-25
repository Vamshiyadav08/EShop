export interface brandObj {
    brandId:string;
    brandName:string;
}
export interface propertyValue {
    propertyValueId: string;
  propertyNameId: string;
  propertyValue: string;
}
export interface Property {
    propertyId: string;
    categoryId: string;
    propertyName: string;
    propertyValues: propertyValue[];
  }