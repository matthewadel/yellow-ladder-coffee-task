import Image from "next/image";

const SystemStatus = () => (
    <div className="flex items-center gap-4">
        <div className="text-right flex-col items-end">
            <p className="text-sm text-[#FEF2C7]">Last Updated</p>
            <span className="text-right text-sm font-medium text-white mt-2">
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
        </div>
        <div className={`w-3 h-3 bg-green-500 rounded-full`}></div>
    </div>
);

export function Header() {
    return (
        <header className={`bg-amber-900 border-b border-gray-200 px-6 py-4`}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Image src={'/cup.png'} alt="cup" width={30} height={30} />

                    <div>
                        <h1 className="text-xl font-semibold text-white">yellow ladder coffee Dashboard</h1>
                        <p className="text-sm text-[#FEF2C7] mt-2">Order Management System</p>
                    </div>

                </div>
                <SystemStatus />
            </div>
        </header>
    );
}
