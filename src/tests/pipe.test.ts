import { pipe } from '../pipe';

describe('pipe', () => {
  const random = () => Math.floor(Math.random() * 10);
  const nonce1 = random();
  const nonce2 = random();
  const nonce3 = random();

  const testFunction1 = (arg: number) => arg + nonce1;
  const testFunction2 = (arg: number) => arg * nonce2;
  const testFunction3 = (arg: number) => `${arg} - ${nonce3}`;

  it('returns itself', () => {
    const input = random();
    const result = pipe(input).get();

    expect(result).toEqual(input);
  });

  it('is equivalent to applying functions sequentially', () => {
    const input = random();
    const result1 = pipe(input)
      .to(testFunction1)
      .to(testFunction2)
      .to(testFunction3)
      .get();
    const result2 = testFunction3(testFunction2(testFunction1(input)));

    expect(result1).toEqual(result2);

    const arr = new Promise(() => {});
    arr;
  });
});
