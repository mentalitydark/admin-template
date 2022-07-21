interface AuthInputProps {
    label: string;
    value: any;
    type:  'text' | 'email' | 'password';
    onChange: (e: any) => void;
    required?: boolean;
}

export default function AuthInput(props: AuthInputProps) {
    return (
        <div className="flex flex-col mt-4">
            <label>{props.label}</label>
            <input
                type={props.type}
                value={props.value}
                onChange={e => props.onChange(e)}
                required={props.required}
                className={`
                    px-4 py-3 rounded-lg bg-gray-200 border
                    focus:border-blue-500 focus:outline-none focus:bg-white
                `}
            />
        </div>
    )
};
