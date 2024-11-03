'use client'

import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    Button,
    Avatar
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import { auth } from '@/auth';
import * as actions from '@/actions';


export default function HeaderAuth() {
    const session = useSession();


    let authContent: React.ReactNode;
    if (session.status === 'loading') {
        authContent = null;
    } else if (session.data?.user) {
    }
    if (session.data?.user) {
        authContent = <Popover placement="left">
        <PopoverTrigger>
        <Avatar src={session.data.user.image || ''}/>
        </PopoverTrigger>
        <PopoverContent>
            <div className="p-4">
                <form action={actions.signOut}>
                    <Button type="submit">sign out</Button>
                </form>
            </div>
        </PopoverContent>
        </Popover>
    }else{
        authContent = (
        <>
        <NavbarItem>
            <form action ={actions.signIn}>
        <Button type="submit" color="secondary" variant="bordered">
        Sign in
        </Button>
        </form>
        </NavbarItem>

        <NavbarItem>

        <form action={actions.signIn}>
            <Button type="submit" color="primary" variant="flat">
                sign up
            </Button>
        </form>   
        </NavbarItem>
        </>
        );
    }   
    return authContent;
}