import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { useEffect, useState } from "react";
import { RadioGroup, Radio } from "@heroui/radio";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ProjectModal({
    isOpen,
    onOpenChange,
    defaultFacultyName,
    defaultDepartment,
    defaultProjectType,
    defaultTitle,
    defaultDuration,
    defaultFunding,
    defaultOrganisation,
    defaultIsEditing,
    id

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

    const projectTypeOptions = [
        {
            value: "ongoing",
            label: "Ongoing",
        },
        {
            value: "completed",
            label: "Completed"
        },
        {
            value: "consultancy",
            label: "Consultancy"
        }
    ]

    // const [submitted, setSubmitted] = useState(null);
    const [facultyName, setFacultyName] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const [projectType, setProjectType] = useState("");
    const [duration, setDuration] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [funding, setFunding] = useState("")
    const [isEditing, setIsEditing] = useState(false);

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        setFacultyName(defaultFacultyName)
        setDepartment(defaultDepartment)
        setTitle(defaultTitle)
        setProjectType(defaultProjectType)
        setDuration(defaultDuration)
        setOrganisation(defaultOrganisation)
        setFunding(defaultFunding)
        setIsEditing(defaultIsEditing)
    }, [
        defaultFacultyName,
        defaultDepartment,
        defaultProjectType,
        defaultTitle,
        defaultDuration,
        defaultFunding,
        defaultOrganisation,
        defaultIsEditing
    ])

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
        addProject()
    };

    const addProject = async () => {
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

            if (isEditing) {
                const response = await axios.put(`${import.meta.env.VITE_SERVER_URL}/project`, {
                    // data: {
                    facultyName: facultyName,
                    title: title,
                    funding: funding,
                    duration: duration,
                    organisation: organisation,
                    department: department,
                    type: projectType,
                    id: id

                    // headers: {
                    //     "Content-Type": "multipart/form-data",
                    // },
                });
            } else {
                const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/project`, {
                    // data: {
                    facultyName: facultyName,
                    title: title,
                    funding: funding,
                    duration: duration,
                    organisation: organisation,
                    department: department,
                    type: projectType

                    // headers: {
                    //     "Content-Type": "multipart/form-data",
                    // },
                });
            }

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

    // console.log("name",name)
    // console.log("department",department)
    // console.log("departmentCode",departmentCode)

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
                            Add New Project
                        </ModalHeader>
                        <ModalBody>
                            <Form className="flex flex-col gap-2" onSubmit={onSubmit}>
                                <Textarea

                                    isRequired
                                    errorMessage="Field cannot be empty"
                                    label="Faculty Name(s)"
                                    labelPlacement="outside"
                                    name="facultyName"
                                    placeholder="Enter faculty name(s)"
                                    type="text"
                                    minRows={2}
                                    maxRows={4}
                                    value={facultyName}
                                    // defaultValue="name"
                                    onValueChange={setFacultyName}
                                />
                                <Textarea
                                    isRequired
                                    errorMessage="Field cannot be empty"
                                    label="Project Title"
                                    labelPlacement="outside"
                                    name="title"
                                    placeholder="Enter project title"
                                    type="text"
                                    minRows={2}
                                    maxRows={4}
                                    value={title}
                                    // defaultValue="name"
                                    onValueChange={setTitle}
                                />
                                <RadioGroup
                                    isRequired
                                    errorMessage="Field cannot be empty"
                                    label="Department"
                                    labelPlacement="outside"
                                    name="department"
                                    value={department}
                                    // defaultValue={[departmentCode]}
                                    onValueChange={(value) => {
                                        setDepartment(value)
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
                                    label="Project Type"
                                    labelPlacement="outside"
                                    name="projectType"
                                    value={projectType}
                                    // defaultValue={isHod}
                                    onValueChange={setProjectType}
                                >
                                    {
                                        projectTypeOptions.map((option) => (
                                            <Radio value={option.value} key={option.value}>
                                                {option.label}
                                            </Radio>
                                        ))
                                    }
                                </RadioGroup>
                                <Input
                                    isRequired
                                    errorMessage="Field cannot be empty"
                                    label="Project Funding"
                                    labelPlacement="outside"
                                    name="funding"
                                    placeholder="Enter project funding amount"
                                    type="text"
                                    value={funding}
                                    onValueChange={setFunding}
                                />
                                <Input
                                    isRequired
                                    errorMessage="Field cannot be empty"
                                    label="Project Duration"
                                    labelPlacement="outside"
                                    name="duration"
                                    placeholder="Enter project duration"
                                    type="text"
                                    value={duration}
                                    onValueChange={setDuration}
                                />
                                <Input
                                    // errorMessage="Field cannot be empty"
                                    label="Organisation"
                                    labelPlacement="outside"
                                    name="organisation"
                                    placeholder="Enter organisation name"
                                    type="text"
                                    value={organisation}
                                    onValueChange={setOrganisation}
                                />
                                <Button
                                    className="my-2"
                                    type="submit"
                                    variant="solid"
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
