import { ChevronDown } from "lucide-react";
import Logo from "../assets/logo.png"
import { Menus } from "../utils.ts"
import { useState } from "react";
import { motion } from "framer-motion";

export function Navbar() {
    return (
        <div>
            <header className="h-16 text-[15px] fixed inset-0 flex items-center bg-[#18181A]">
                <nav className="px-3.5 flex items-center justify-between w-full max-w-7xl mx-auto">
                    <a href="/"><div className="flex items-center gap-x-3 z-999 relative">
                        <img src={Logo} alt="Logo" className="size-12" />
                        <h3 className="text-lg font-semibold">EMDb</h3>
                    </div></a>
                    <ul className="lg:flex lg:items-center hidden gap-x-1">
                        {Menus.map((menu) => (
                            <DesktopMenu menu={menu} key={menu.name} />
                        ))}
                    </ul>
                    <div className="flex items-center gap-x-5">
                        <button className="bg-white/5 z-999 relative px-3 py-1.5 shadow rounded-xl flex items-center cursor-pointer">Sign In</button>
                    </div>
                </nav>
            </header>
        </div>
    )
}

function DesktopMenu({ menu }) {
    const [isHovered, setIsHovered] = useState(false);
    const toggleHover = () => setIsHovered(!isHovered);
    const subMenuAnimation = {
        enter: {opacity: 1, rotateX: 0, transition: {duration: 0.5}, display: "block"},
        exit: {opacity: 0, rotateX: -15, transition: {duration: 0.5}, display: "none"}
    }

    const hasSubMenu = menu?.subMenu?.length > 0;
    return (
        <motion.li className="group/link" whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }} onHoverStart={toggleHover} onHoverEnd={toggleHover}>
            <span className="flex items-center gap-1 cursor-pointer px-3 py-1 rounded-xl hover:bg-white/5 ">
                {menu.name}
                {hasSubMenu && (<ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />)}
            </span>
            {hasSubMenu && (
                <motion.div className="absolute top-[4.2rem] p-3.75 rounded-md origin-[50%_-170px] backdrop-blur bg-white/4" initial="exit" animate={isHovered ? "enter" : "exit"} variants={subMenuAnimation}>
                    <div className={`
                            grid gap-7
                            ${
                                menu.gridCols === 3 ? "grid-cols-3" : menu.gridCols === 2 ? "grid-cols-2" : "grid-cols-1"
                            }
                        `}>
                        {menu?.subMenu?.map((subMenu, i) => (
                            <div key={i} className="relative cursor-pointer">
                                <div className="flex items-center gap-x-4 group/menubox">
                                    <div className="bg-white/5 w-fit p-2 rounded-md group-hover/menubox:bg-white group-hover/menubox:text-gray-900 duration-300">
                                        {subMenu?.icon && <subMenu.icon />}
                                    </div>
                                    <div>
                                        <h6 className="font-semibold">{subMenu?.name}</h6>
                                        <p className="text-sm text-gray-400">
                                            {subMenu?.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </motion.div>
            )
            }
        </motion.li>
    )
}