const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">TechStore</h4>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Магазин</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Наушники
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Колонки
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Аксессуары
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Доставка
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Возврат
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Контакты</h4>
            <p className="text-gray-400">+7 (999) 999-99-99</p>
            <p className="text-gray-400">info@audiostore.ru</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
