import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import useStores from "hooks/useStores";
import applyPromoCode from "./applyPromoCode.gql";

/**
 * Applies Promo Code
 *
 * @returns {Cart} for update result
 */
export default function useApplyPromoCode() {
  const [applyPromoCodeFunction, { data, loading }] = useMutation(applyPromoCode, {
    onCompleted() {
      console.log("data is", data);
    },
  });

  return [applyPromoCodeFunction, data, loading];
}
