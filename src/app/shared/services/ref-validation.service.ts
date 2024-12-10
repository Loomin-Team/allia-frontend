import {RefObject} from "react";

export const areValidHtmlInputRefs = (refObjects: RefObject<HTMLInputElement | HTMLTextAreaElement>[] ): boolean => {
  for (const refObject of refObjects) {
    if (refObject.current === null || refObject.current.value.length === 0) {
      return false;
    }
  }
  return true;
}