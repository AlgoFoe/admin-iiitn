import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useState } from "react";
import { RadioGroup, Radio } from "@heroui/radio";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function FacultyModal({
    isOpen,
    onOpenChange,
    defaultName,
    defaultDepartment,
    defaultDepartmentCode,
    defaultIsHod,
    defaultLinkedIn,
    defaultPost,
    isEditing

}) {

    const departments = [
        {
            value: "cse",
            label: "Computer Science & Engineering",
        },
        {
            value: "ece",
            label: "Electronics & Communication Engineering"
        },
        {
            value: "bs",
            label: "Basic Sciences"
        },
    ]

    const departmentName = {
        "cse": "Computer Science & Engineering",
        "ece": "Electronics & Communication Engineering",
        "bs": "Basic Sciences"
    }

    const isHodOptions = [
        {
            value: true,
            label: "Yes",
        },
        {
            value: false,
            label: "No"
        }
    ]

    // const [submitted, setSubmitted] = useState(null);
    const [name, setName] = useState(defaultName);
    const [department, setDepartment] = useState(defaultDepartment);
    const [departmentCode, setDepartmentCode] = useState(defaultDepartmentCode);
    const [isHod, setIsHod] = useState(defaultIsHod);
    const [linkedin, setLinkedin] = useState(defaultLinkedIn);
    const [post, setPost] = useState(defaultPost);
    const [image, setImage] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        // const data = Object.fromEntries(new FormData(e.currentTarget));

        // setSubmitted(data);

        // console.log("name",name)
        // console.log("department",department)
        // console.log("code",departmentCode)
        // console.log("hod",isHod)
        // console.log("linkedin",linkedin)
        // console.log("post",post)
        // console.log("image",image)
        addFaculty()
    };

    const addFaculty = async () => {
        setIsLoading(true)
        const loadingToastId = toast.loading("Proccessing...")
        try {

            // setIsDeleting(true)
            // console.log("Server url : ",import.meta.env.VITE_SERVER_URL)
            // console.log("Dept : ",dept)

            // const formData = new FormData();
            // formData.append("name", name);
            // formData.append("department", department);
            // formData.append("departmentCode", departmentCode);
            // formData.append("post", post);
            // formData.append("linkedin", linkedin);
            // formData.append("isHod", isHod);
            // formData.append("imageUrl", image.name); // Add the image file

            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/faculty`, {
                // data: {
                name: name,
                department: department,
                departmentCode: departmentCode,
                post: post,
                linkedin: linkedin,
                isHod: isHod,
                imageUrl: "asdfv",
                // image: image,

                // headers: {
                //     "Content-Type": "multipart/form-data",
                // },
            });

            // console.log(response)

            toast.dismiss(loadingToastId)
            toast.success("Success")

            // console.log("Response : ",response)
            // console.log("Response : ",response)
            // Separate HOD and faculties based on isHod
            // console.log(response)

            // const hodData = data.find((faculty) => faculty.isHod);
            // const facultyList = data.filter((faculty) => !faculty.isHod);

            // setHod(hodData);
            // setFaculties(data);

        } catch (err) {
            // console.log("Error adding faculty : ", err)

            toast.dismiss(loadingToastId)
            toast.error(err.response.data.error)
            // setError('Department not found');
        } finally {
            setIsLoading(false)

            navigate(0)
            // console.log("Done")
            // setIsDeleting(false)
            // setLoading(false);
        }
    }

    return (
        <Modal
            className=""
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            backdrop="blur"
            size="lg"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader>
                            Add New Faculty
                        </ModalHeader>
                        <ModalBody>
                            <Form className="flex flex-col gap-2" onSubmit={onSubmit}>
                                <Input
                                    isRequired
                                    errorMessage="Field cannot be em
                                    value={isHod}pty"
                                    label="Name"
                                    labelPlacement="outside"
                                    name="name"
                                    placeholder="Enter name"
                                    type="text"
                                    value={name}
                                    onValueChange={setName}
                                />
                                <RadioGroup
                                    isRequired
                                    errorMessage="Field cannot be empty"
                                    label="Department"
                                    labelPlacement="outside"
                                    name="department"
                                    // value={department}
                                    defaultValue={departmentCode}
                                    onValueChange={(value) => {
                                        setDepartment(departmentName[value])
                                        setDepartmentCode(value)
                                    }}
                                >
                                    {
                                        departments.map((department) => (
                                            <Radio value={department.value} key={department.value}>
                                                {department.label}
                                            </Radio>
                                        ))
                                    }
                                </RadioGroup>
                                <RadioGroup
                                    isRequired
                                    errorMessage="Field cannot be empty"
                                    label="Is Head of Department"
                                    labelPlacement="outside"
                                    name="isHod"
                                    defaultValue={isHod}
                                    onValueChange={setIsHod}
                                >
                                    {
                                        isHodOptions.map((option) => (
                                            <Radio value={option.value} key={option.value}>
                                                {option.label}
                                            </Radio>
                                        ))
                                    }
                                </RadioGroup>
                                <Input
                                    isRequired
                                    errorMessage="Field cannot be empty"
                                    label="Post"
                                    labelPlacement="outside"
                                    name="post"
                                    placeholder="Enter post"
                                    type="text"
                                    value={post}
                                    onValueChange={setPost}
                                />
                                <Input
                                    // errorMessage="Field cannot be empty"
                                    label="LinkedIn"
                                    labelPlacement="outside"
                                    name="linkedin"
                                    placeholder="Enter LinkedIn Profile Link"
                                    type="text"
                                    value={linkedin}
                                    onValueChange={setLinkedin}
                                />
                                <Input
                                    isRequired={!isEditing}
                                    errorMessage="Faculty image required"
                                    label="Profile Image"
                                    labelPlacement="outside"
                                    name="image"
                                    placeholder="Upload profile image"
                                    type="file"
                                    onChange={(e) => {
                                        setImage(e.target.files[0])
                                        // console.log(e.target.files)
                                    }}
                                />
                                <Button
                                    className="my-2"
                                    type="submit"
                                    variant="flat"
                                    color="success"
                                    isLoading={isLoading}
                                >
                                    {isLoading ? "Processing..." : "Submit"}
                                </Button>
                                {/* {submitted && (
                                    <div className="text-small text-default-500">
                                        You submitted: <code>{JSON.stringify(submitted)}</code>
                                    </div>
                                )} */}
                            </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>

    )
}
