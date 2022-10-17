export interface IMetadataBase<T = string | RegExp> {
  target: string;
  propertyKey: string;
  pattern: T;
}
