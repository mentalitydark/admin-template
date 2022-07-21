import { IconDarkMode, IconLightMode } from "../icons/index";

interface ButtonToggleDarkModeProps {
    darkMode: boolean;
    toggleDarkMode: () => void;
}

export default function ButtonToggleDarkMode(props: ButtonToggleDarkModeProps) {
    return (
        <div onClick={ () => props.toggleDarkMode()}
            className= {props.darkMode ? `
                    hidden sm:flex items-center cursor-pointer justify-between
                    bg-gradient-to-r from-yellow-300 to-yellow-600
                    w-14 lg:w-24 h-8 p-1 rounded-full pr-4
                `
                :
                `
                    hidden sm:flex items-center cursor-pointer justify-end lg:justify-between
                    bg-gradient-to-r from-gray-600 to-gray-800
                    w-14 lg:w-24 h-8 p-1 rounded-full pl-2
                `}
        >
            {props.darkMode ? (
                <>
                    <div className={`
                        flex items-center justify-center
                        bg-white text-yellow-600 w-6 h-6 rounded-full
                    `}>
                        {IconLightMode(5)}
                    </div>
                    <div className={`
                        hidden lg:flex items-center
                        text-white font-bold
                    `}>
                        <span>
                            Claro
                        </span>
                    </div>
                </>
            ) : (
                <>
                    <div className={`
                        hidden lg:flex items-center
                        text-white font-bold
                    `}>
                        <span>
                            Escuro
                        </span>
                    </div>
                    <div className={`
                        flex items-center justify-center
                        bg-white text-gray-600 w-6 h-6 rounded-full
                    `}>
                        {IconDarkMode(5)}
                    </div>
                </>
            )}
        </div>
    )
}