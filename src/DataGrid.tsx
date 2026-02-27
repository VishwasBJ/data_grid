import React, { useRef, useState, useMemo } from "react";
import { Column, SortType } from "./types";

interface Props<T> {
  data: T[];
  columns: Column<T>[];
}

export function DataGrid<T extends { id: number }>({
  data,
  columns
}: Props<T>) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const rowHeight = 40;
  const gridHeight = 500;

  const [scrollTop, setScrollTop] = useState(0);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortType, setSortType] = useState<SortType>(null);

  function handleScroll() {
    if (!containerRef.current) return;
    setScrollTop(containerRef.current.scrollTop);
  }

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortType) return data;

    const copy = [...data];

    copy.sort((a, b) => {
      const aVal = a[sortColumn];
      const bVal = b[sortColumn];

      if (aVal < bVal) return sortType === "asc" ? -1 : 1;
      if (aVal > bVal) return sortType === "asc" ? 1 : -1;
      return 0;
    });

    return copy;
  }, [data, sortColumn, sortType]);

  const totalHeight = sortedData.length * rowHeight;
  const startIndex = Math.floor(scrollTop / rowHeight);
  const visibleCount = Math.ceil(gridHeight / rowHeight);
  const endIndex = startIndex + visibleCount + 5;

  const visibleRows = sortedData.slice(startIndex, endIndex);

  return (
    <div className="border rounded-md">
      <div className="flex bg-gray-100 border-b sticky top-0 z-10">
        {columns.map((col) => (
          <div
            key={String(col.key)}
            onClick={() => {
              if (sortColumn !== col.key) {
                setSortColumn(col.key);
                setSortType("asc");
              } else if (sortType === "asc") {
                setSortType("desc");
              } else {
                setSortColumn(null);
                setSortType(null);
              }
            }}
            className="px-3 py-2 text-sm font-medium border-r cursor-pointer"
            style={{ width: col.width }}
          >
            {col.title}
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="overflow-auto"
        style={{ height: gridHeight }}
      >
        <div style={{ height: totalHeight, position: "relative" }}>
          {visibleRows.map((row, index) => {
            const realIndex = startIndex + index;

            return (
              <div
                key={row.id}
                className="flex absolute left-0 right-0"
                style={{
                  top: realIndex * rowHeight,
                  height: rowHeight
                }}
              >
                {columns.map((col) => (
                  <div
                    key={String(col.key)}
                    className="px-3 py-2 border-r border-b text-sm truncate"
                    style={{ width: col.width }}
                  >
                    {String(row[col.key])}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
