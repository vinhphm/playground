import { useState, useCallback, useMemo, Key } from "react";
import { Table } from "antd";

export interface IItem {
  id: number;
  groupId: number;
  prop1: string;
  prop2: string;
  prop3: string;
  prop4: string;
  prop5: string;
  prop6: string;
  prop7: string;
  prop8: string;
}

// Function to generate random text
const generateRandomText = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: 10 }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length)),
  ).join("");
};

// Simulating a very large dataset with additional properties
const MOCK: IItem[] = Array.from({ length: 50000 }, (_, index) => ({
  id: index + 1,
  groupId: Math.floor(index / 3) + 1,
  prop1: generateRandomText(),
  prop2: generateRandomText(),
  prop3: generateRandomText(),
  prop4: generateRandomText(),
  prop5: generateRandomText(),
  prop6: generateRandomText(),
  prop7: generateRandomText(),
  prop8: generateRandomText(),
}));

function App() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<Set<number>>(
    new Set(),
  );

  const columns = useMemo(
    () => [
      { title: "ID", dataIndex: "id", key: "id" },
      { title: "Group ID", dataIndex: "groupId", key: "groupId" },
      { title: "Property 1", dataIndex: "prop1", key: "prop1" },
      { title: "Property 2", dataIndex: "prop2", key: "prop2" },
      { title: "Property 3", dataIndex: "prop3", key: "prop3" },
      { title: "Property 4", dataIndex: "prop4", key: "prop4" },
      { title: "Property 5", dataIndex: "prop5", key: "prop5" },
      { title: "Property 6", dataIndex: "prop6", key: "prop6" },
      { title: "Property 7", dataIndex: "prop7", key: "prop7" },
      { title: "Property 8", dataIndex: "prop8", key: "prop8" },
    ],
    [],
  );

  // Combined memoization for both mappings
  const { groupMap, idToGroupMap } = useMemo(() => {
    const groupMap = new Map<number, Set<number>>();
    const idToGroupMap = new Map<number, number>();

    MOCK.forEach((item) => {
      // Populate groupMap
      if (!groupMap.has(item.groupId)) {
        groupMap.set(item.groupId, new Set());
      }
      groupMap.get(item.groupId)!.add(item.id);

      // Populate idToGroupMap
      idToGroupMap.set(item.id, item.groupId);
    });

    return { groupMap, idToGroupMap };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MOCK]);

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
      scroll={{ y: 700 }}
    />
  );
}

export default App;
