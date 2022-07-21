import useAuth from "../../data/hook/useAuth";
import { IconHome, IconSettings, IconNotification, IconLogout } from "../icons/index";
import SideBarItem from "../SideBarItem";
import Logo from "./Logo";

export default function SideBar() {
    const {logout} = useAuth()

    return (
        <aside className="flex flex-col">
            <div className={`
                flex justify-center items-center
                h-20 w-20 bg-indigo-500
            `}>
                <Logo />
            </div>
            <ul className="flex-grow">
                <SideBarItem url="/" text="Home" icon={IconHome} />
                <SideBarItem url="/settings" text="Ajustes" icon={IconSettings} />
                <SideBarItem url="/notifications" text="Notificações" icon={IconNotification} />
            </ul>
            <ul className="">
                <SideBarItem
                    text="Sair"
                    icon={IconLogout}
                    className="text-red-600 hover:bg-red-400 hover:text-white"
                    onClick={logout}
                />
            </ul>
        </aside>
    )
}