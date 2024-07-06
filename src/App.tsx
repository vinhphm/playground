import { useState, useCallback, useMemo, Key } from "react";
import { Table } from "antd";

export interface IItem {
  id: number;
  groupId: number;
}

// Simulating a large dataset
const MOCK: IItem[] = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  groupId: Math.floor(index / 3) + 1,
}));

function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Set<number>>(
    new Set(),
  );

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

  // Memoize the group mapping
  const groupMap = useMemo(() => {
    const map = new Map<number, Set<number>>();
    MOCK.forEach((item) => {
      if (!map.has(item.groupId)) {
        map.set(item.groupId, new Set());
      }
      map.get(item.groupId)!.add(item.id);
    });
    return map;
  }, []);

  // Memoize the reverse mapping (id to groupId)
  const idToGroupMap = useMemo(() => {
    const map = new Map<number, number>();
    MOCK.forEach((item) => {
      map.set(item.id, item.groupId);
    });
    return map;
  }, []);

  const onSelectChange = useCallback(
    (newSelectedRowKeys: number[]) => {
      const newSelectedSet = new Set(selectedRowKeys);
      const addedKeys = newSelectedRowKeys.filter(
        (key) => !selectedRowKeys.has(key),
      );
      const removedKeys = Array.from(selectedRowKeys).filter(
        (key) => !newSelectedRowKeys.includes(key),
      );

      if (addedKeys.length > 0) {
        // Selection
        const groupId = idToGroupMap.get(addedKeys[0])!;
        groupMap.get(groupId)!.forEach((id) => newSelectedSet.add(id));
      } else if (removedKeys.length > 0) {
        // Deselection
        const groupId = idToGroupMap.get(removedKeys[0])!;
        groupMap.get(groupId)!.forEach((id) => newSelectedSet.delete(id));
      }

      setSelectedRowKeys(newSelectedSet);
    },
    [selectedRowKeys, groupMap, idToGroupMap],
  );

  const rowSelection = {
    selectedRowKeys: Array.from(selectedRowKeys),
    onChange: (selectedRowKeys: Key[]) =>
      onSelectChange(selectedRowKeys as number[]),
  };

  return (
    <Table
      rowKey="id"
      dataSource={MOCK}
      columns={columns}
      pagination={{ pageSize: 10 }}
      rowSelection={rowSelection}
      virtual
      scroll={{ y: 400 }}
    />
  );
}

export default App;
