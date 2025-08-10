
/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GlobalTable, TableColumn } from '../GlobalTable';

interface TestData {
  name: string;
  age: number;
  [key: string]: unknown;
}

const columns: TableColumn<TestData>[] = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' }
];

const data: TestData[] = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 }
];

describe('GlobalTable search', () => {
  it('filters rows based on search term', async () => {
    render(<GlobalTable<TestData> data={data} columns={columns} pagination={false} />);
    // 2 data rows + 1 header row
    expect(screen.getAllByRole('row')).toHaveLength(3);

    await userEvent.type(screen.getByPlaceholderText('Search...'), 'Alice');

    // after filtering only header + matching row remain
    expect(screen.getAllByRole('row')).toHaveLength(2);
  });
});
