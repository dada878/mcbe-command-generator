import { use, useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

export default function useConditionalStorage<T>(
  key: string,
  defaultValue: T,
  options: any,
  condition: boolean
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [localStorageValue, setLocalStorageValue] = useLocalStorage<T>(
    key,
    defaultValue,
    options
  );

  const [value, setValue] = useState<T>(localStorageValue);

  useEffect(() => {
    if (condition) {
      setLocalStorageValue(value);
    }
  }, [localStorageValue, condition, value, setLocalStorageValue]);

  return [value, setValue];
}
