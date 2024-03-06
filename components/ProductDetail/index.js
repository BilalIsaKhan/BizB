// export { default } from "./ProductDetail";
import dynamic from "next/dynamic";
const ProductDetail = dynamic(() => import("./ProductDetail"), {
  ssr: false,
});
export default ProductDetail;