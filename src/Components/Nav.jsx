import { BsListTask, BsSearch } from "react-icons/bs";

const Nav = () => {
  return (
    <nav className="w-full h-[60px] shadow-lg flex items-center justify-between lg:px-[50px]  px-[20px] font-Roboto z-50">
      <BsListTask className="lg:text-2xl text-xl text-mainColor" />
      <div className="flex items-center gap-2 rounded-md lg:w-[20%] w-[80%]  h-[30px] px-[10px] bg-white">
        <BsSearch className="text-lg text-gray-500" />
        <input
          type="text"
          placeholder="Search task"
          className="flex-1 focus:outline-none h-[30px] rounded-md"
        />
      </div>
    </nav>
  );
};

export default Nav;
