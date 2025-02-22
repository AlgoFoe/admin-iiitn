import useSignup from '@/hooks/useSignup'
import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import React, { useState } from 'react'

export default function Signup() {


    const [role, setRole] = useState("super-admin")
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")

    const { loading, signup } = useSignup()

    const onSubmit = async () => {
        await signup({ role, username, password })
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
                    label="Role"
                    labelPlacement="outside"
                    name="role"
                    placeholder="Enter role"
                    type="text"
                    isReadOnly
                    value={role}
                    // defaultValue="name"
                    onValueChange={setRole}
                />
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
                    Signup
                </Button>
            </div>
        </div>
    )
}
