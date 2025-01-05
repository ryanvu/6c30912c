const StickyActionBar = ({ children }) => {

  return (
    <div className="sticky top-0 bg-white -mx-4 p-4 z-50">
      {children}
    </div>
  );
};

export default StickyActionBar;