import { useState } from "react";
import { Menu, X, LayoutDashboard, ScrollText, Package, CreditCard, Cable, Users, Settings } from "lucide-react";
import { Link } from "react-router-dom";


const SideBar = ({sideBar=false}) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!sideBar) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        className="fixed top-4 left-0 bg-gray-600 text-white p-2 rounded-md z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 bg-gray-600 text-white w-44 h-screen p-5 space-y-6 transition-transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:block z-40 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500`}>
        <nav>
          <ul className="space-y-4">
            <Link to="/dashboard">
              <NavItem Icon={LayoutDashboard} label="Dashboard" />
            </Link>
            <Link to="/inventory">
              <NavItem Icon={ScrollText} label="Inventory" />
            </Link>
            <Link to="/products">
              <NavItem Icon={Package} label="Products" />
            </Link>
            <Link to="/transactions">
              <NavItem Icon={CreditCard} label="Transactions" />
            </Link>
            <Link to="/suppliers">
              <NavItem Icon={Cable} label="Suppliers" />
            </Link>
            <Link to="/users">
              <NavItem Icon={Users} label="Users" />
            </Link>
            <Link to="/settings">
              <NavItem Icon={Settings} label="Settings" />
            </Link>
          </ul>
        </nav>
      </aside>
    </>
  );
}

// Reusable Navigation Item Component
const NavItem = ({ Icon, label }) => (
  <li className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-500 cursor-pointer">
    <Icon size={20} />
    <span>{label}</span>
  </li>
);

export default SideBar;
