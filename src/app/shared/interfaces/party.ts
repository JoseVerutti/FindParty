import { UUID } from "crypto";
import { LocationCoordinates } from "./location";

export interface Party {
  id: UUID;
  name: string;
  description?: string;
  address: string;
  city: string;
  location: LocationCoordinates;
  createdAt: Date;
  updatedAt: Date;
  createdBy: UUID;
  updatedBy: UUID;
}