import React from 'react';

import { render } from '@testing-library/react';
import Tooltip from '../../components/Tooltip';

describe('Tooltip', () => {
  it('should be able to show a tooltip', () => {
    const { getByText } = render(
      <Tooltip title="title-test">children-test</Tooltip>,
    );

    const titleElement = getByText('title-test');
    const childrenElement = getByText('children-test');

    expect(titleElement).toBeTruthy();
    expect(childrenElement).toBeTruthy();
  });
});
