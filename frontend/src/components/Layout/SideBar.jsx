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
} from "lucide-react";
import { Link } from "react-router-dom";

const SideBar = ({ sideBar = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({
    products: false,
    categories: false,
    transactions: false,
    suppliers: false,
    customers: false,
  });

  if (!sideBar) return null;

  // Expandables Toggle menu
  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => {
      return {
        products: false,
        categories: false,
        transactions: false,
        suppliers: false,
        customers: false,
        [menu]: !prev[menu],
      };
    });
  };

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
            {/* Products Expandable */}
            <NavItem
              Icon={Package}
              label="Products"
              onClick={() => toggleMenu("products")}
              isExpandable={true}
              isOpen={expandedMenus.products}
              hasSubmenu
            />
            {expandedMenus.products && (
              <ul className="pl-6 space-y-2">
                <Link to="/products">
                  <SubMenuItem label="View Products" />
                </Link>
                <Link to="/add-product">
                  <SubMenuItem label="Add Product" />
                </Link>
              </ul>
            )}
            {/* Categories Expandable */}
            <NavItem
              Icon={Package}
              label="Categories"
              onClick={() => toggleMenu("categories")}
              isExpandable
              isOpen={expandedMenus.categories}
              hasSubmenu
            />
            {expandedMenus.categories && (
              <ul className="pl-6 space-y-2">
                <Link to="/categories">
                  <SubMenuItem label="View Categories" />
                </Link>
                <Link to="/add-category">
                  <SubMenuItem label="Add Category" />
                </Link>
              </ul>
            )}
            {/* Transactions Expandable */}
            <NavItem
              Icon={CreditCard}
              label="Transactions"
              onClick={() => toggleMenu("transactions")}
              isExpandable
              isOpen={expandedMenus.transactions}
              hasSubmenu
            />
            {expandedMenus.transactions && (
              <ul className="pl-6 space-y-2">
                <Link to="/transactions">
                  <SubMenuItem label="View Transactions" />
                </Link>
                <Link to="/add-transaction">
                  <SubMenuItem label="Add Transaction" />
                </Link>
              </ul>
            )}
            {/* Suppliers Expandable */}
            <NavItem
              Icon={Cable}
              label="Suppliers"
              onClick={() => toggleMenu("suppliers")}
              isExpandable
              isOpen={expandedMenus.suppliers}
              hasSubmenu
            />
            {expandedMenus.suppliers && (
              <ul className="pl-6 space-y-2">
                <Link to="/suppliers">
                  <SubMenuItem label="View Suppliers" />
                </Link>
                <Link to="/add-supplier">
                  <SubMenuItem label="Add Supplier" />
                </Link>
              </ul>
            )}
            {/* Customers Expandable */}
            <NavItem
              Icon={Cable}
              label="Customers"
              onClick={() => toggleMenu("customers")}
              isExpandable={true}
              isOpen={expandedMenus.customers}
              hasSubmenu
            />
            {expandedMenus.customers && (
              <ul className="pl-6 space-y-2">
                <Link to="/customers">
                  <SubMenuItem label="View Customers" />
                </Link>
                <Link to="/add-customer">
                  <SubMenuItem label="Add Customer" />
                </Link>
              </ul>
            )}
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

// Subnemu Item
const SubMenuItem = ({ label }) => (
  <li className="p-2 text-sm rounded-md text-gray-300 hover:bg-gray-500 hover:text-white cursor-pointer">
    {label}
  </li>
);

export default SideBar;
