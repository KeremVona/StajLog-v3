interface MenuItem {
  title: string;
  icon: string;
  path: string;
}

const MenuSection: React.FC<{ items: MenuItem[] }> = ({ items }) => (
  <div className="bg-white rounded-xl shadow-lg mb-6 px-6 py-4">
    {items.map((item) => (
      <a
        key={item.title}
        href={item.path}
        className="inline-block text-gray-600 hover:text-black my-4 w-full transition-colors"
      >
        <span className="material-icons-outlined float-left pr-2">
          {item.icon}
        </span>
        {item.title}
        <span className="material-icons-outlined float-right text-gray-300">
          keyboard_arrow_right
        </span>
      </a>
    ))}
  </div>
);

export default MenuSection;
