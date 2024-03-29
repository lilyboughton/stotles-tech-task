export type SearchRecordsRequest = {
  textSearch?: string;
  limit: number;
  offset: number;
};

export type ProcurementRecord = {
  id: string;
  title: string;
  description: string;
  publishDate: string;
  buyer: {
    id: string;
    name: string;
  };
  value: number;
  currency: string;
  stage: "TENDER" | "CONTRACT";
  closeDate: string | null;
  awardDate: string | null;
};

export type SearchRecordsResponse = {
  records: ProcurementRecord[];
  endOfResults: boolean;
};

class Api {
  async searchRecords(
    request: SearchRecordsRequest
  ): Promise<SearchRecordsResponse> {
    const response = await fetch("/api/records", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return await response.json();
  }
}

export default Api;
