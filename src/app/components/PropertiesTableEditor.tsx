'use client';

import React from 'react';
import { Plus, Trash2, Merge, Split } from 'lucide-react';

export interface PropertyRow {
  property: string;
  value: string;
  values?: string[];
}

interface PropertiesTableEditorProps {
  label?: string;
  properties: PropertyRow[];
  /** Value-column headers (excluding the "Property" column). Empty = simple Property / Value table. */
  headers: string[];
  onChange: (rows: PropertyRow[]) => void;
  onHeadersChange: (headers: string[]) => void;
}

const inputClass =
  'w-full px-3 py-2 bg-gray-50/60 border border-gray-200 rounded-xl text-xs text-gray-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C86218]';

export function PropertiesTableEditor({
  label = 'Physico-Chemical Properties Table',
  properties,
  headers,
  onChange,
  onHeadersChange,
}: PropertiesTableEditorProps) {
  const rows = properties || [];
  const isMulti = headers.length > 0;

  const handleAddRow = () => {
    onChange([
      ...rows,
      isMulti
        ? { property: '', value: '', values: headers.map(() => '') }
        : { property: '', value: '' },
    ]);
  };

  const handleRemoveRow = (index: number) => {
    onChange(rows.filter((_, idx) => idx !== index));
  };

  const replaceRow = (index: number, row: PropertyRow) => {
    const updated = [...rows];
    updated[index] = row;
    onChange(updated);
  };

  const handleUpdateValueAt = (rowIdx: number, colIdx: number, val: string) => {
    const values = headers.map((_, i) => rows[rowIdx].values?.[i] || '');
    values[colIdx] = val;
    replaceRow(rowIdx, { ...rows[rowIdx], values });
  };

  const handleAddColumn = () => {
    if (!isMulti) {
      // Convert the simple table into a 2-column table, keeping existing values in column 1.
      onHeadersChange(['', '']);
      onChange(rows.map((r) => ({ property: r.property, value: '', values: [r.value || '', ''] })));
      return;
    }
    onHeadersChange([...headers, '']);
    onChange(rows.map((r) => (r.values ? { ...r, values: [...r.values, ''] } : r)));
  };

  const handleRemoveColumn = (colIdx: number) => {
    const nextHeaders = headers.filter((_, i) => i !== colIdx);
    if (nextHeaders.length <= 1) {
      // Back to the simple Property / Value table.
      onHeadersChange([]);
      onChange(
        rows.map((r) => ({
          property: r.property,
          value: r.values ? r.values.filter((_, i) => i !== colIdx)[0] || '' : r.value || '',
        }))
      );
      return;
    }
    onHeadersChange(nextHeaders);
    onChange(
      rows.map((r) => (r.values ? { ...r, values: r.values.filter((_, i) => i !== colIdx) } : r))
    );
  };

  const handleUpdateHeader = (colIdx: number, val: string) => {
    const next = [...headers];
    next[colIdx] = val;
    onHeadersChange(next);
  };

  const handleToggleMerge = (rowIdx: number) => {
    const row = rows[rowIdx];
    if (row.values) {
      replaceRow(rowIdx, {
        property: row.property,
        value: row.values.find((v) => v.trim()) || '',
      });
    } else {
      replaceRow(rowIdx, {
        property: row.property,
        value: '',
        values: headers.map((_, i) => (i === 0 ? row.value || '' : '')),
      });
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest ml-4">
          {label}
        </label>
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleAddColumn}
            className="text-xs font-bold text-[#C86218] hover:text-[#0C356A] flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Column
          </button>
          <button
            type="button"
            onClick={handleAddRow}
            className="text-xs font-bold text-[#C86218] hover:text-[#0C356A] flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Spec Row
          </button>
        </div>
      </div>

      {isMulti && (
        <p className="text-[11px] text-gray-400 ml-4 -mt-1">
          Name each column (e.g. grade 46, 68, 100). Use the merge button on a row to show a single
          value across all columns.
        </p>
      )}

      {rows.length === 0 && !isMulti ? (
        <div className="p-4 bg-gray-50 border border-gray-200/80 rounded-2xl text-center text-xs text-gray-400">
          No laboratory test specifications added yet.
        </div>
      ) : (
        <div className="border border-gray-200/80 rounded-2xl overflow-x-auto bg-white shadow-xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200/80 text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                <th className="py-2.5 px-4 min-w-[220px]">Test Property Name</th>
                {isMulti ? (
                  headers.map((hdr, cIdx) => (
                    <th key={cIdx} className="py-2 px-2 min-w-[130px]">
                      <div className="flex items-center gap-1">
                        <input
                          type="text"
                          value={hdr}
                          onChange={(e) => handleUpdateHeader(cIdx, e.target.value)}
                          placeholder={`Column ${cIdx + 1}`}
                          className={`${inputClass} font-bold normal-case`}
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveColumn(cIdx)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                          title="Delete Column"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </th>
                  ))
                ) : (
                  <th className="py-2.5 px-4 min-w-[160px]">Typical Value / Unit</th>
                )}
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={headers.length + 2}
                    className="p-4 text-center text-xs text-gray-400"
                  >
                    No laboratory test specifications added yet.
                  </td>
                </tr>
              )}
              {rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/40">
                  <td className="p-2.5 px-3">
                    <input
                      type="text"
                      value={row.property}
                      onChange={(e) => replaceRow(idx, { ...row, property: e.target.value })}
                      placeholder="e.g. Kinematic Viscosity @ 100°C, cSt"
                      className={inputClass}
                    />
                  </td>
                  {isMulti && row.values ? (
                    headers.map((_, cIdx) => (
                      <td key={cIdx} className="p-2.5 px-2">
                        <input
                          type="text"
                          value={row.values?.[cIdx] || ''}
                          onChange={(e) => handleUpdateValueAt(idx, cIdx, e.target.value)}
                          className={inputClass}
                        />
                      </td>
                    ))
                  ) : (
                    <td className="p-2.5 px-3" colSpan={isMulti ? headers.length : 1}>
                      <input
                        type="text"
                        value={row.value || ''}
                        onChange={(e) => replaceRow(idx, { ...row, value: e.target.value })}
                        placeholder={isMulti ? 'Same value for all columns' : 'e.g. 14.5 - 15.5'}
                        className={inputClass}
                      />
                    </td>
                  )}
                  <td className="p-2.5 px-3 text-right whitespace-nowrap">
                    {isMulti && (
                      <button
                        type="button"
                        onClick={() => handleToggleMerge(idx)}
                        className="p-1.5 text-gray-400 hover:text-[#0C356A] rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        title={
                          row.values
                            ? 'Merge into one value across all columns'
                            : 'Split into separate column values'
                        }
                      >
                        {row.values ? (
                          <Merge className="w-3.5 h-3.5" />
                        ) : (
                          <Split className="w-3.5 h-3.5" />
                        )}
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleRemoveRow(idx)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Row"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
