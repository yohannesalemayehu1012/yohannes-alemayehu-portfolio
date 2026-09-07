import { FaCode } from "react-icons/fa";

const BrandMark = ({ className = "" }) => (
  <span className={`brand-mark ${className}`.trim()} aria-hidden="true">
    <FaCode />
  </span>
);

export default BrandMark;
