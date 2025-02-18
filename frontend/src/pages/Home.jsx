import { Button } from '@heroui/button'
import { Input } from '@heroui/input'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home({ setIsAuthorized }) {

    
    const [inputValue, setInputValue] = useState("")
    const [isValid, setIsValid] = useState(true)
    
    const navigate = useNavigate()
    
    const onSubmit = () => {
        if (inputValue === import.meta.env.VITE_ADMIN_PASSWORD) {
            setIsAuthorized(true);
            navigate("/faculty")
        } else {
            setIsValid(false)
        }
    }
    return (
        <div
            className="w-screen h-screen flex justify-center items-center"
        >
            <div
                className="w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-5"
            >
                <Input
                    className='min-w-[200px] w-1/4'
                    type='Password'
                    size='sm'
                    variant='flat'
                    color='primary'
                    label="Password"
                    errorMessage="Please enter a valid password"
                    description="Please enter admin password"
                    isClearable
                    isInvalid={!isValid}
                    value={inputValue}
                    onValueChange={(value) => {
                        setInputValue(value)
                    }}
                    onSubmit={onSubmit}
                />
                <Button
                    size='lg'
                    variant='flat'
                    color='success'
                    onPress={onSubmit}
                >
                    Submit
                </Button>
            </div>
        </div >
    )
}
