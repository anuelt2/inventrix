const Footer = () => {
  return (
     <footer className="fixed bottom-0 left-0 w-full bg-gray-600 text-white shadow-md py-4 px-6 justify z-50">
      <p className="text-sm">&copy; {new Date().getFullYear()} Inventrix. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
