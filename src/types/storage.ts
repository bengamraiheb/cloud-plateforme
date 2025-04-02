
/**
 * Types for storage resources
 */

export type StorageBucket = {
  id: string;
  name: string;
  type: string;
  region: string;
  created: string;
  size: {
    used: number;
    total: number;
  };
  access: "public" | "private" | "restricted";
};

export type StorageFile = {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: string;
};

export type BucketType = {
  id: string;
  name: string;
  price: number;
  description: string;
};
