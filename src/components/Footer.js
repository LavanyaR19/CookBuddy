const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-10 mt-10">

      <div className="max-w-7xl mx-auto text-center">

        <h2 className="text-5xl font-extrabold">
          <span className="text-white">Cook</span>
          <span className="text-yellow-300">Buddy</span>
        </h2>

        <p className="text-xl mt-3">
          Your Smart Recipe Finder ❤️
        </p>

        <p className="mt-2 text-orange-100">
          Discover • Cook • Enjoy
        </p>

        <hr className="w-40 mx-auto my-6 border-orange-300" />

        <p className="text-sm text-orange-100">
          © {new Date().getFullYear()} CookBuddy. All Rights Reserved.
        </p>

      </div>

    </footer>
  );
};

export default Footer;