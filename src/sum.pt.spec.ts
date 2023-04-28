// happy coding 👻
import {sum} from "./sum";
import * as fc from "fast-check";

const minMax = fc.tuple(fc.integer(), fc.integer()) // .map((t) => (t[0] < t[1] ? [t[0], t[1]] : [t[1], t[0]]));

describe('sum module a', () => {
  test('sum of generator is equals to a + b', () => {
    fc.assert(
      fc.property(minMax, ([a,b]) =>
        sum(a, b) == a + b
      )
    )
  });
});
