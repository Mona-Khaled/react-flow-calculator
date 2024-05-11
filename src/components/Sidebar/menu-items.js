import { FcMultipleInputs } from "react-icons/fc";
import { PiUploadFill } from "react-icons/pi";
import { MdAddCircle } from "react-icons/md";
import { FaCircleMinus } from "react-icons/fa6";
import { FaTimesCircle } from "react-icons/fa";
import { FiDivideCircle } from "react-icons/fi";

const menuItems = [
  {
    label: "Input",
    icon: FcMultipleInputs,
  },
  {
    label: "Output",
    icon: PiUploadFill,
  },
  {
    label: "Add",
    icon: MdAddCircle,
  },
  {
    label: "Subtract",
    icon: FaCircleMinus,
  },
  {
    label: "Multiply",
    icon: FaTimesCircle,
  },
  {
    label: "Divide",
    icon: FiDivideCircle,
  },
];

export default menuItems;
