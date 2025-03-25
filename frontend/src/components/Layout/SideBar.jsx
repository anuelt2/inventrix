import { useState } from "react";
import {
  Menu,
  X,
  LayoutDashboard,
  ScrollText,
  Package,
  CreditCard,
  Cable,
  Users,
  Settings,
  ChevronDown,
  ChevronRight,
  ChartColumnStacked,
  HandPlatter,
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = ({ sideBar = false }) => {
  const [isOpen, setIsOpen] = useState(false);


  if (!sideBar) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="fixed top-4 left-0 bg-gray-600 text-white p-2 rounded-md z-150"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bg-gray-600 text-white w-56 h-screen p-5 space-y-6 transition-transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:block overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 z-150`}
      >
        <nav>
          <ul className="space-y-4">
            <Link to="/dashboard">
              <NavItem Icon={LayoutDashboard} label="Dashboard" />
            </Link>
            {/* Link to inventory. Temporarily set to Dashboard */}
            <Link to="/dashboard">
              <NavItem Icon={ScrollText} label="Inventory" />
            </Link>
            <Link to="/products">
              <NavItem Icon={Package} label="Products" />
            </Link>  
            <Link to="/categories">
              <NavItem Icon={ChartColumnStacked} label="Categories" />
            </Link>
            <Link to="/transactions">
              <NavItem Icon={CreditCard} label="Transactions" />
            </Link>
            <Link to="/suppliers">
             <NavItem Icon={Cable} label="Suppliers" />
            </Link>
            <Link to="/customers">
              <NavItem Icon={HandPlatter} label="Customers" />
            </Link>      
            <Link to="/users">
              <NavItem Icon={Users} label="Users" />
            </Link>
            {/* Link to settings. Temporarily set to Dashboard */}
            <Link to="/dashboard">
              <NavItem Icon={Settings} label="Settings" />
            </Link>
          </ul>
        </nav>
      </aside>
    </>
  );
};

// Reusable Navigation Item Component
const NavItem = ({ Icon, label, onClick, isExpandable, isOpen }) => (
  <li
    className="flex items-center justify-between p-3 rounded-md hover:bg-gray-500 cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center space-x-1">
      <Icon size={20} />
      <span>{label}</span>
    </div>
    {isExpandable &&
      (isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
  </li>
);


export default SideBar;
