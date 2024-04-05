import { Input, Select } from "antd";
import React from "react";
import { Buyer } from "./RecordSearchPage"

export type SearchFilters = {
  query: string;
  buyer?: string;
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

  return (
    <div>
      <Input
        placeholder="Search text..."
        value={filters.query}
        onChange={handleQueryChange}
      />
      <Select
        showSearch
        placeholder="Filter by buyer"
        style={{ width: "100%" }}
        options={buyers}
        allowClear
        onChange={handleBuyerChange}
        filterOption={(input, option) =>
          option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      />
    </div>
  );
}

export default RecordSearchFilters;
