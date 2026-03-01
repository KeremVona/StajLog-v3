const Navbar = () => {
  return (
    <nav className="fixed bg-white text-blue-800 px-10 py-1 z-10 w-full shadow-sm">
      <div className="flex items-center justify-between py-2">
        <div className="font-bold text-blue-900 text-xl">
          Admin<span className="text-orange-600">Panel</span>
        </div>
        <div className="flex items-center text-gray-500">
          <span
            className="material-icons-outlined p-2 cursor-pointer"
            style={{ fontSize: "30px" }}
          >
            search
          </span>
          <span
            className="material-icons-outlined p-2 cursor-pointer"
            style={{ fontSize: "30px" }}
          >
            notifications
          </span>
          <div
            className="bg-center bg-cover bg-no-repeat rounded-full inline-block h-12 w-12 ml-2 border border-gray-200"
            style={{
              backgroundImage: `url('https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg')`,
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
