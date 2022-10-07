import { Fail, Success } from '../Result';

describe('Fail', () => {
  it('returns fail object', () => {
    const fail = Fail('error message');

    expect(fail.type).toEqual('fail');
    expect(fail.isSuccess()).toEqual(false);
    expect(fail.isFail()).toEqual(true);

    expect(fail.get()).toBeUndefined();
    expect(fail.success().get()).toBeUndefined();

    expect(fail.getOr(34)).toEqual(34);
    expect(fail.success().getOr(34)).toEqual(34);

    expect(fail.getFail()).toEqual('error message');
    expect(fail.fail().get()).toEqual('error message');
  });

  it('map returns Fail', () => {
    const fail = Fail('error message').map((val) => `value: ${val}`);

    expect(fail.type).toEqual('fail');
    expect(fail.isSuccess()).toEqual(false);
    expect(fail.isFail()).toEqual(true);

    expect(fail.get()).toBeUndefined();
    expect(fail.getOr('placeholder')).toEqual('placeholder');
    expect(fail.getFail()).toEqual('error message');
  });

  it('mapFail returns Fail', () => {
    const fail = Fail('message').mapFail((err) => `Error: ${err}`);

    expect(fail.type).toEqual('fail');
    expect(fail.isSuccess()).toEqual(false);
    expect(fail.isFail()).toEqual(true);

    expect(fail.get()).toBeUndefined();
    expect(fail.getOr('placeholder')).toEqual('placeholder');
    expect(fail.getFail()).toEqual('Error: message');
  });

  it('then returns Fail', () => {
    const testFn = (val: string) => Success(val);
    const fail = Fail('message').then(testFn);

    expect(fail.type).toEqual('fail');
    expect(fail.isSuccess()).toEqual(false);
    expect(fail.isFail()).toEqual(true);

    expect(fail.get()).toBeUndefined();
    expect(fail.getOr('placeholder')).toEqual('placeholder');
    expect(fail.getFail()).toEqual('message');
  });

  it('catch returns Fail', () => {
    const testFn = (val: string) => Fail(`Error: ${val}`);
    const fail = Fail('message').catch(testFn);

    expect(fail.type).toEqual('fail');
    expect(fail.isSuccess()).toEqual(false);
    expect(fail.isFail()).toEqual(true);

    expect(fail.get()).toBeUndefined();
    expect(fail.getOr('placeholder')).toEqual('placeholder');
    expect(fail.getFail()).toEqual('Error: message');
  });
});

describe('Success', () => {
  it('returns success object', () => {
    const result = Success('test result');

    expect(result.type).toEqual('success');
    expect(result.isSuccess()).toEqual(true);
    expect(result.isFail()).toEqual(false);

    expect(result.get()).toEqual('test result');
    expect(result.success().get()).toEqual('test result');

    expect(result.getOr('placeholder')).toEqual('test result');
    expect(result.success().getOr('placeholder')).toEqual('test result');

    expect(result.getFail()).toBeUndefined();
    expect(result.fail().get()).toBeUndefined();
  });

  it('returns success object for null', () => {
    const result = Success<string | null, string>(null);

    expect(result.type).toEqual('success');
    expect(result.isSuccess()).toEqual(true);
    expect(result.isFail()).toEqual(false);

    expect(result.get()).toBeUndefined();
    expect(result.success().get()).toBeUndefined();

    expect(result.getOr('placeholder')).toEqual('placeholder');
    expect(result.success().getOr('placeholder')).toEqual('placeholder');

    expect(result.getFail()).toBeUndefined();
    expect(result.fail().get()).toBeUndefined();
  });

  it('map returns success', () => {
    const result = Success('test').map((val) => `value: ${val}`);

    expect(result.type).toEqual('success');
    expect(result.isSuccess()).toEqual(true);
    expect(result.isFail()).toEqual(false);

    expect(result.get()).toEqual('value: test');
    expect(result.getOr('placeholder')).toEqual('value: test');
    expect(result.getFail()).toBeUndefined();
  });

  it('mapFail returns success', () => {
    const result = Success('test').mapFail((err) => `Error: ${err}`);

    expect(result.type).toEqual('success');
    expect(result.isSuccess()).toEqual(true);
    expect(result.isFail()).toEqual(false);

    expect(result.get()).toEqual('test');
    expect(result.getOr('placeholder')).toEqual('test');
    expect(result.getFail()).toBeUndefined();
  });

  describe('then', () => {
    it('returns success', () => {
      const testFn = (val: string) => Success(val);
      const result = Success('test').then(testFn);

      expect(result.type).toEqual('success');
      expect(result.isSuccess()).toEqual(true);
      expect(result.isFail()).toEqual(false);

      expect(result.get()).toEqual('test');
      expect(result.getOr('placeholder')).toEqual('test');
      expect(result.getFail()).toBeUndefined();
    });

    it('returns fail', () => {
      const testFn = (val: string) => Fail(val);
      const result = Success('test').then(testFn);

      expect(result.type).toEqual('fail');
      expect(result.isSuccess()).toEqual(false);
      expect(result.isFail()).toEqual(true);

      expect(result.get()).toBeUndefined();
      expect(result.getOr('placeholder')).toEqual('placeholder');
      expect(result.getFail()).toEqual('test');
    });
  });

  it('catch returns success', () => {
    const testFn = (val: string) => Fail(val);
    const result = Success('test').catch(testFn);

    expect(result.type).toEqual('success');
    expect(result.isSuccess()).toEqual(true);
    expect(result.isFail()).toEqual(false);

    expect(result.get()).toEqual('test');
    expect(result.getOr('placeholder')).toEqual('test');
    expect(result.getFail()).toBeUndefined();
  });
});
