
/**
 * Service for storage-related functionality
 */
import { fetchApi } from "./api";
import { StorageBucket, StorageFile, BucketType } from "@/types/storage";

export async function getStorageBuckets(): Promise<StorageBucket[]> {
  return fetchApi<StorageBucket[]>("/storage/buckets");
}

export async function getStorageBucket(id: string): Promise<StorageBucket> {
  return fetchApi<StorageBucket>(`/storage/buckets/${id}`);
}

export async function createStorageBucket(bucket: Omit<StorageBucket, "id" | "created" | "size">): Promise<StorageBucket> {
  return fetchApi<StorageBucket>("/storage/buckets", {
    method: "POST",
    body: JSON.stringify(bucket),
  });
}

export async function updateStorageBucket(id: string, bucket: Partial<StorageBucket>): Promise<StorageBucket> {
  return fetchApi<StorageBucket>(`/storage/buckets/${id}`, {
    method: "PUT",
    body: JSON.stringify(bucket),
  });
}

export async function deleteStorageBucket(id: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/storage/buckets/${id}`, {
    method: "DELETE",
  });
}

export async function getBucketFiles(bucketId: string): Promise<StorageFile[]> {
  return fetchApi<StorageFile[]>(`/storage/buckets/${bucketId}/files`);
}

export async function uploadFileToBucket(bucketId: string, file: File): Promise<StorageFile> {
  // In a real implementation, we would handle file uploads with FormData
  // For the mock, we'll just send file metadata
  const fileData = {
    name: file.name,
    type: file.type,
    size: file.size,
  };
  
  return fetchApi<StorageFile>(`/storage/buckets/${bucketId}/files`, {
    method: "POST",
    body: JSON.stringify(fileData),
  });
}

export async function deleteFile(bucketId: string, fileId: string): Promise<{ success: boolean }> {
  return fetchApi<{ success: boolean }>(`/storage/buckets/${bucketId}/files/${fileId}`, {
    method: "DELETE",
  });
}

export async function getBucketTypes(): Promise<BucketType[]> {
  return fetchApi<BucketType[]>("/storage/bucket-types");
}
