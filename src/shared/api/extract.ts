import { httpClient } from "./httpClient";

// Tipado intencionalmente laxo para permitir cambios en el backend
// sin romper el frontend. Solo marcamos la forma general más importante.
export type ExtractFilterResponse = {
  success: boolean;
  data: Record<string, any>;
  meta?: Record<string, any>;
};

export type ExtractFilterRequestFilters = {
  columns?: string[];
  rows?: number[];
  rowRange?: { start: number; end: number };
  searchColumn?: string;
  searchValue?: string;
  cellFilters?: Record<string, string>;
};

export type ExtractFilterParams = {
  uploadedFile: File ;
  filters?: ExtractFilterRequestFilters;
};

export async function extractFilter({
  uploadedFile,
  filters,
}: ExtractFilterParams): Promise<ExtractFilterResponse> {
  try{

    const formData = new FormData();
    formData.append("file", uploadedFile);
    console.log(filters)
    if (filters && Object.keys(filters).length > 0) {
      formData.append("filters", JSON.stringify(filters));
    }
  
    const response = await httpClient.post<ExtractFilterResponse>(
      "/extract/filter",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  
    return response.data;
  }catch (err) {
    console.log("Error during extraction:", err);
    throw err;
  }
}

