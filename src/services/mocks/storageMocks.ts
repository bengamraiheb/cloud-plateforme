
/**
 * Mock data and handlers for storage endpoints
 */
import { StorageBucket, StorageFile } from "@/types/storage";

// Mock storage buckets
const mockBuckets: StorageBucket[] = [
  {
    id: "bucket-01",
    name: "app-assets",
    type: "Standard",
    region: "us-west-1",
    created: "2023-09-15",
    size: {
      used: 120,
      total: 500,
    },
    access: "public",
  },
  {
    id: "bucket-02",
    name: "user-uploads",
    type: "Standard",
    region: "us-west-1",
    created: "2023-08-22",
    size: {
      used: 350,
      total: 1000,
    },
    access: "private",
  },
  {
    id: "bucket-03",
    name: "database-backups",
    type: "Archive",
    region: "eu-central-1",
    created: "2023-07-10",
    size: {
      used: 75,
      total: 200,
    },
    access: "private",
  },
  {
    id: "bucket-04",
    name: "logs-archive",
    type: "Cold Storage",
    region: "ap-southeast-1",
    created: "2023-05-18",
    size: {
      used: 180,
      total: 500,
    },
    access: "restricted",
  },
];

// Mock files for each bucket
const mockFiles: Record<string, StorageFile[]> = {
  "bucket-01": [
    { id: "file-001", name: "logo.png", type: "image/png", size: 15, lastModified: "2023-10-15" },
    { id: "file-002", name: "styles.css", type: "text/css", size: 5, lastModified: "2023-10-14" },
    { id: "file-003", name: "app.js", type: "application/javascript", size: 25, lastModified: "2023-10-12" },
  ],
  "bucket-02": [
    { id: "file-004", name: "profile1.jpg", type: "image/jpeg", size: 120, lastModified: "2023-10-10" },
    { id: "file-005", name: "document.pdf", type: "application/pdf", size: 250, lastModified: "2023-09-28" },
  ],
  "bucket-03": [
    { id: "file-006", name: "backup-2023-10-01.sql", type: "application/sql", size: 75, lastModified: "2023-10-01" },
  ],
  "bucket-04": [
    { id: "file-007", name: "access-logs-2023-09.log", type: "text/plain", size: 180, lastModified: "2023-09-30" },
  ],
};

// Storage bucket types available for creation
export const bucketTypes = [
  { id: "standard", name: "Standard", price: 0.02, description: "General purpose storage for frequently accessed data" },
  { id: "archive", name: "Archive", price: 0.01, description: "Low-cost storage for infrequently accessed data" },
  { id: "cold-storage", name: "Cold Storage", price: 0.005, description: "Lowest-cost storage for rarely accessed data" },
];

export async function handleStorageMock<T>(
  endpoint: string,
  method: string,
  body: any
): Promise<T> {
  // GET /storage/buckets - List all buckets
  if (endpoint === "/storage/buckets" && method === "GET") {
    return mockBuckets as unknown as T;
  }
  
  // GET /storage/buckets/:id - Get bucket details
  if (endpoint.match(/\/storage\/buckets\/[\w-]+$/) && method === "GET") {
    const id = endpoint.split("/").pop();
    const bucket = mockBuckets.find(b => b.id === id);
    
    if (!bucket) {
      throw new Error("Bucket not found");
    }
    
    return bucket as unknown as T;
  }
  
  // POST /storage/buckets - Create a new bucket
  if (endpoint === "/storage/buckets" && method === "POST") {
    const newBucket: StorageBucket = {
      id: `bucket-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      type: body.type,
      region: body.region,
      created: new Date().toISOString().split("T")[0],
      size: {
        used: 0,
        total: body.size || 500,
      },
      access: body.access || "private",
    };
    
    // In a mock, we just return the new bucket without actually persisting it
    return newBucket as unknown as T;
  }
  
  // PUT /storage/buckets/:id - Update a bucket
  if (endpoint.match(/\/storage\/buckets\/[\w-]+$/) && method === "PUT") {
    const id = endpoint.split("/").pop();
    const bucketIndex = mockBuckets.findIndex(b => b.id === id);
    
    if (bucketIndex === -1) {
      throw new Error("Bucket not found");
    }
    
    // In a real backend, we would update the actual data
    const updatedBucket = {
      ...mockBuckets[bucketIndex],
      ...body,
    };
    
    return updatedBucket as unknown as T;
  }
  
  // DELETE /storage/buckets/:id - Delete a bucket
  if (endpoint.match(/\/storage\/buckets\/[\w-]+$/) && method === "DELETE") {
    const id = endpoint.split("/").pop();
    const bucketIndex = mockBuckets.findIndex(b => b.id === id);
    
    if (bucketIndex === -1) {
      throw new Error("Bucket not found");
    }
    
    // In a real backend, we would delete the bucket
    return { success: true } as unknown as T;
  }
  
  // GET /storage/buckets/:id/files - List files in a bucket
  if (endpoint.match(/\/storage\/buckets\/[\w-]+\/files$/) && method === "GET") {
    const id = endpoint.split("/")[3];
    
    if (!mockFiles[id]) {
      return [] as unknown as T;
    }
    
    return mockFiles[id] as unknown as T;
  }
  
  // POST /storage/buckets/:id/files - Upload a file to a bucket
  if (endpoint.match(/\/storage\/buckets\/[\w-]+\/files$/) && method === "POST") {
    const id = endpoint.split("/")[3];
    
    // In a real backend, we would handle file uploads
    const newFile: StorageFile = {
      id: `file-${Math.floor(Math.random() * 1000)}`,
      name: body.name,
      type: body.type,
      size: body.size,
      lastModified: new Date().toISOString().split("T")[0],
    };
    
    return newFile as unknown as T;
  }
  
  // DELETE /storage/buckets/:bucketId/files/:fileId - Delete a file
  if (endpoint.match(/\/storage\/buckets\/[\w-]+\/files\/[\w-]+$/) && method === "DELETE") {
    const parts = endpoint.split("/");
    const bucketId = parts[3];
    const fileId = parts[5];
    
    if (!mockFiles[bucketId]) {
      throw new Error("Bucket not found");
    }
    
    const fileIndex = mockFiles[bucketId].findIndex(f => f.id === fileId);
    
    if (fileIndex === -1) {
      throw new Error("File not found");
    }
    
    // In a real backend, we would delete the file
    return { success: true } as unknown as T;
  }
  
  // GET /storage/bucket-types - List available bucket types
  if (endpoint === "/storage/bucket-types" && method === "GET") {
    return bucketTypes as unknown as T;
  }
  
  throw new Error(`Unhandled storage mock endpoint: ${endpoint} with method ${method}`);
}
