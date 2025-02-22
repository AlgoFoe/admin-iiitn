import useLogin from '@/hooks/useLogin'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import React, { useState } from 'react'

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")

    const { loading, login } = useLogin()

    const onSubmit = async () => {
        await login({ username, password })
    }
    return (
        <div
            className="w-screen h-screen flex justify-center items-center"
        >
            <div
                className="min-w-[300px] w-1/4 flex flex-col justify-center items-center gap-5"
            >
                <Input
                    isRequired
                    size="lg"
                    errorMessage="Field cannot be empty"
                    label="Username"
                    labelPlacement="outside"
                    name="username"
                    placeholder="Enter name"
                    type="text"
                    value={username}
                    // defaultValue="name"
                    onValueChange={setUsername}
                />
                <Input
                    isRequired
                    size="lg"
                    errorMessage="Field cannot be empty"
                    label="Password"
                    labelPlacement="outside"
                    name="password"
                    placeholder="Enter name"
                    type="password"
                    value={password}
                    onValueChange={setpassword}
                />
                <Button
                    size='lg'
                    fullWidth
                    variant='flat'
                    color='success'
                    onPress={onSubmit}
                    isLoading={loading}
                >
                    Login
                </Button>
            </div>
        </div>
    )
}
