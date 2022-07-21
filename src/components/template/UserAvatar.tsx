import Link from 'next/link';

import useAuth from '../../data/hook/useAuth';

export default function UserAvatar(props) {
    const {user} = useAuth();

    return (
        <Link href="/profile">
            <img
                src={user?.imageUrl ?? '/images/user.png'}
                alt="Avatar do usuário"
                className="h-10 w-10 rounded-full cursor-pointer ml-3"
            />
        </Link>
    );
};
