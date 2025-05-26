export interface Property {
  id: number;
  title: string;
  address: string;
  price: number;
  isAvailable: boolean;
  photoUrls: string[];
  type: string;
  numberOfRooms: number;
  peopleCapacity: number;
  size: number;
  additionalInfo?: string;
}
