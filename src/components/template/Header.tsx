import useAppData from "../../data/hook/useAppData";
import ButtonToggleDarkMode from "./ButtonToggleDarkMode";
import Title from "./Title";
import UserAvatar from "./UserAvatar";

interface HeaderProps {
    title: string;
    subtitle: string;
}

export default function Header(props: HeaderProps) {
    const {darkMode, toggleDarkMode} = useAppData()

    return (
        <div className="flex">
            <Title title={props.title} subtitle={props.subtitle}/>
            <div className="flex flex-grow justify-end items-center">
                <ButtonToggleDarkMode darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
                <UserAvatar />
            </div>
        </div>
    )
}