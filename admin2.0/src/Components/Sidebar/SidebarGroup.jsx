import { useState } from "react";

const SidebarGroup = ({ children, activeCondition }) => {
  const [open, setOpen] = useState(activeCondition);
  const handleclick = () => {
    setOpen(!open);
  };
  return <li>{children(handleclick, open)}</li>;
};

export default SidebarGroup;
