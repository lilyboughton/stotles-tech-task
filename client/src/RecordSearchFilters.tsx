import { Input, Select } from "antd";
import React from "react";

export type SearchFilters = {
  query: string;
  buyer?: string;
};

export type Buyer = {
  label: string;
  value: string;
};

type Props = {
  filters: SearchFilters;
  buyers: Buyer[]
  onChange: (newFilters: SearchFilters) => void;
};

function RecordSearchFilters(props: Props) {
  const { filters, buyers, onChange } = props;

  const handleQueryChange = React.useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      onChange({
        ...filters,
        query: e.currentTarget.value,
      });
    },
    [onChange, filters]
  );

  const handleBuyerChange = React.useCallback(
    (value: string) => {
      onChange({
        ...filters,
        buyer: value,
      });
    },
    [onChange, filters]
  );

  const filterBuyerOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <div>
      <Input
        placeholder="Search text..."
        value={filters.query}
        onChange={handleQueryChange}
      />
      <Select
        showSearch
        allowClear
        placeholder="Filter by buyer"
        onChange={handleBuyerChange}
        filterOption={filterBuyerOption}
        style={{ width: "100%" }}
        options={buyers}
      />
    </div>
  );
}

export default RecordSearchFilters;
