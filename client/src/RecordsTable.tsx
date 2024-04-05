import { Table } from "antd";
import { ColumnType } from "antd/lib/table";
import React from "react";
import { ProcurementRecord } from "./Api";
import ProcurementRecordPreviewModal from "./ProcurementRecordPreview";

type Props = {
  records: ProcurementRecord[];
};

function getStage(stage: string, close?: string, award?: string) {
  const closeDate: Date = new Date(close);
  const awardDate: Date = new Date(award);
  console.log(stage)
  if (stage === "TENDER") {
    if (closeDate > new Date() || closeDate === null) {
      return `Open until ${closeDate.toLocaleDateString()}`;
    } else {
      return 'Closed';
    }
  } else if (stage === 'CONTRACT') {
    return `Awarded on ${awardDate.toLocaleDateString()}`
  } else {
    //this is very basic error handling and could be improved to provide better UX
    return 'UNKNOWN';
  }
}

function RecordsTable(props: Props) {
  const { records } = props;
  const [previewedRecord, setPreviewedRecord] = React.useState<
    ProcurementRecord | undefined
  >();

  const columns = React.useMemo<ColumnType<ProcurementRecord>[]>(() => {
    return [
      {
        title: "Published",
        render: (record: ProcurementRecord) =>
          new Date(record.publishDate).toLocaleDateString(),
      },
      {
        title: "Title",
        render: (record: ProcurementRecord) => {
          const handleClick = (e: React.MouseEvent) => {
            e.preventDefault();
            setPreviewedRecord(record);
          };
          return (
            <a href="#" onClick={handleClick}>
              {record.title}
            </a>
          );
        },
      },
      {
        title: "Buyer name",
        render: (record: ProcurementRecord) => record.buyer.name,
      },
      {
        title: "Value",
        render: (record: ProcurementRecord) =>
          //this is a crude way to display the currency which I would look to refactor
          record!.currency ? record.value.toLocaleString("en-US", {
            style: "currency",
            currency: record.currency,
            minimumFractionDigits: 0,
          }) : record.value
      },
      {
        title: "Stage",
        render: (record: ProcurementRecord) =>
          getStage(record.stage, record.closeDate, record.awardDate)
      },
    ];
  }, []);
  return (
    <>
      <Table columns={columns} dataSource={records} pagination={false} />
      <ProcurementRecordPreviewModal
        record={previewedRecord}
        onClose={() => setPreviewedRecord(undefined)}
      />
    </>
  );
}

export default RecordsTable;
