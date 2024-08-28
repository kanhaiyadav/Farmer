import DashboardCard from "../../componenets/DashboardCard";
import Header from "../../componenets/DashboardHeader";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FiUserPlus } from "react-icons/fi";
import { TbShoppingBagCheck } from "react-icons/tb";


const Dashboard = () => {
    return (
        <div className="flex-1 h-full flex flex-col">
            <Header title={'Dashboard'} />
            <main className="bg-gray-100 shadow-inner flex-1 p-4">
                <DashboardCard heading={"Today's Summary"}>
                    <main className="flex  gap-4">
                        <div className="w-[150px] flex flex-col items-center bg-red-100 rounded-lg p-2">
                            <div className="w-[30px] h-[30px] bg-red-500 rounded-full grid place-items-center text-white"><FaIndianRupeeSign style={{fontSize: '1.2rem'}}/></div>
                            <p className="text-gray-600">Total Revenue</p>
                            <span className="text-3xl font-semibold text-gray-700">5,600</span>
                        </div>
                        <div className="w-[150px] flex flex-col items-center bg-green-100 rounded-lg p-2">
                            <div className="w-[30px] h-[30px] bg-green-500 rounded-full grid place-items-center text-white"><TbShoppingBagCheck style={{fontSize: '1.2rem'}}/></div>
                            <p className="text-gray-600">Items Sold</p>
                            <span className="text-3xl font-semibold text-gray-700">122</span>
                        </div>
                        <div className="w-[150px] flex flex-col items-center bg-blue-100 rounded-lg p-2">
                            <div className="w-[30px] h-[30px] bg-blue-500 rounded-full grid place-items-center text-white"><FiUserPlus style={{fontSize: '1.2rem'}}/></div>
                            <p className="text-gray-600">New Customer</p>
                            <span className="text-3xl font-semibold text-gray-700">10</span>
                        </div>
                    </main>
                </DashboardCard>
            </main>
        </div>
    );
}

export default Dashboard;