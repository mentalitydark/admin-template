export default function Logo() {
    return (
        <div className="bg-white rounded-full w-14 h-14 flex flex-col justify-center items-center">
            <div className="flex flex-row">
                <div className="bg-red-500 h-3 w-4 border-2 border-white border-solid" />
                <div className="bg-green-500 h-3 w-5 border-2 border-white border-solid" />
            </div>
            <div className="bg-purple-500 h-3 w-9 border-2 border-white border-solid" />
        </div>
    )
}