import React from "react";

export function useArray<T>(initial: T[] = []) {
  const [array, setArray] = React.useState<T[]>(initial);

  return {
    value: array,
    set: setArray,
    push: (item: T) => setArray((a) => [...a, item]),
    remove: (index: number) => setArray((a) => a.filter((_, i) => i !== index)),
    update: (index: number, item: T) =>
      setArray((a) => a.map((v, i) => (i === index ? item : v))),
    clear: () => setArray([]),
    filter: (callback: (value: T, index: number, array: T[]) => boolean) =>
      setArray((a) => a.filter(callback)),
    map: <U>(callback: (value: T, index: number, array: T[]) => U): U[] =>
      array.map(callback),
    find: (
      callback: (value: T, index: number, array: T[]) => boolean,
    ): T | undefined => array.find(callback),
    isEmpty: array.length === 0,
    length: array.length,
  };
}
