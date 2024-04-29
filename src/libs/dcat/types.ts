import { ObjectId } from "mongoose";
import { IDataResource } from "src/types/dataresource";
import { IServiceOffering } from "src/types/serviceoffering";
import { ISoftwareResource } from "src/types/softwareresource";

export interface DataResource extends IDataResource {
  country_or_region?: string;
  subCategories?: [];
  representation?: ObjectId;
}
export interface ServiceOffering extends IServiceOffering {}
export interface SoftwareResource extends ISoftwareResource {
  representation?: ObjectId;
}

export enum ResourceTypes {
  DataResource,
  SoftwareResource,
  ServiceOffering,
}
