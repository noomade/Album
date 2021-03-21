import { capitalize } from '../../helpers/utils';

describe('Utils Test', () => {
  it('capitalize should format string correctly', () => {
    const string = capitalize('this is a test');

    expect(string).toBe('This is a test');
  });
});
