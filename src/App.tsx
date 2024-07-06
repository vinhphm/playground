import React, { useState, useCallback } from "react";
import { Table } from "antd";

export interface IItem {
  id: number;
  groupId: number;
}

const MOCK: IItem[] = [
  { id: 1, groupId: 1 },
  { id: 2, groupId: 1 },
  { id: 3, groupId: 2 },
  { id: 4, groupId: 2 },
  { id: 5, groupId: 3 },
  { id: 6, groupId: 3 },
  { id: 7, groupId: 4 },
  { id: 8, groupId: 4 },
  { id: 9, groupId: 5 },
  { id: 10, groupId: 5 },
  { id: 11, groupId: 6 },
  { id: 12, groupId: 6 },
  { id: 13, groupId: 7 },
  { id: 14, groupId: 7 },
  { id: 15, groupId: 8 },
  { id: 16, groupId: 8 },
  { id: 17, groupId: 9 },
  { id: 18, groupId: 9 },
  { id: 19, groupId: 10 },
  { id: 20, groupId: 10 },
];

function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Group ID",
      dataIndex: "groupId",
      key: "groupId",
    },
  ];

  const onSelectChange = useCallback(
    (newSelectedRowKeys: React.Key[]) => {
      const addedKeys = newSelectedRowKeys.filter(
        (key) => !selectedRowKeys.includes(key),
      );
      const removedKeys = selectedRowKeys.filter(
        (key) => !newSelectedRowKeys.includes(key),
      );

      let updatedKeys: React.Key[];

      if (addedKeys.length > 0) {
        // Selection
        const selectedItem = MOCK.find((item) => item.id === addedKeys[0]);
        if (selectedItem) {
          const groupItems = MOCK.filter(
            (item) => item.groupId === selectedItem.groupId,
          );
          updatedKeys = [
            ...new Set([
              ...newSelectedRowKeys,
              ...groupItems.map((item) => item.id),
            ]),
          ];
        } else {
          updatedKeys = newSelectedRowKeys;
        }
      } else if (removedKeys.length > 0) {
        // Deselection
        const deselectedItem = MOCK.find((item) => item.id === removedKeys[0]);
        if (deselectedItem) {
          updatedKeys = newSelectedRowKeys.filter((key) => {
            const item = MOCK.find((i) => i.id === key);
            return item && item.groupId !== deselectedItem.groupId;
          });
        } else {
          updatedKeys = newSelectedRowKeys;
        }
      } else {
        updatedKeys = newSelectedRowKeys;
      }

      setSelectedRowKeys(updatedKeys);
    },
    [selectedRowKeys],
  );

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Table
      rowKey="id"
      dataSource={MOCK}
      columns={columns}
      pagination={false}
      rowSelection={rowSelection}
    />
  );
}

export default App;
