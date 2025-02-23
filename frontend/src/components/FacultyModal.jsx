import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useEffect, useState } from "react";
import { RadioGroup, Radio } from "@heroui/radio";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function FacultyModal({
  isOpen,
  onOpenChange,
  defaultName,
  defaultDepartment,
  defaultDepartmentCode,
  defaultIsHod,
  defaultLinkedIn,
  defaultPost,
  defaultIsEditing,
  id,
}) {
  const departments = [
    {
      value: "cse",
      label: "Computer Science & Engineering",
    },
    {
      value: "ece",
      label: "Electronics & Communication Engineering",
    },
    {
      value: "bs",
      label: "Basic Sciences",
    },
  ];

  const departmentName = {
    cse: "Computer Science & Engineering",
    ece: "Electronics & Communication Engineering",
    bs: "Basic Sciences",
  };

  const isHodOptions = [
    {
      value: true,
      label: "Yes",
    },
    {
      value: false,
      label: "No",
    },
  ];

  // const [submitted, setSubmitted] = useState(null);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [isHod, setIsHod] = useState();
  const [linkedin, setLinkedin] = useState("");
  const [post, setPost] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setName(defaultName);
    setDepartment(defaultDepartment);
    setDepartmentCode(defaultDepartmentCode);
    setPost(defaultPost);
    setIsHod(defaultIsHod);
    setLinkedin(defaultLinkedIn);
    setIsEditing(defaultIsEditing);
  }, [
    defaultName,
    defaultDepartment,
    defaultDepartmentCode,
    defaultIsHod,
    defaultLinkedIn,
    defaultPost,
    defaultIsEditing,
  ]);

  // useEffect(() => {
  //     console.log("name", name)
  //     console.log("department", department)
  //     console.log("departmentCode", departmentCode)
  //     console.log("post", post)
  //     console.log("isHod", isHod)
  //     console.log("isEditing", isEditing)
  // }, [name, department])

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    setIsLoading(true);
    const loadingToastId = toast.loading("Uploading image...");

    try {
      const imageData = new FormData();
      imageData.append("file", image);
      imageData.append("upload_preset", "admin_iiitn");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dvpvcqyq9/image/upload",
        imageData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      toast.dismiss(loadingToastId);
      toast.success("Image uploaded successfully");

      await addFaculty(imageUrl);
    } catch (err) {
      toast.dismiss(loadingToastId);
      toast.error("Image upload failed");
      setIsLoading(false);
    }
  };

  const addFaculty = async (imageUrl) => {
    setIsLoading(true);
    const loadingToastId = toast.loading("Processing...");

    try {
      if (!imageUrl) {
        throw new Error("Image upload failed, imageUrl is missing.");
      }

      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_SERVER_URL}/faculty`, {
          name: name,
          department: department,
          departmentCode: departmentCode,
          post: post,
          linkedin: linkedin,
          isHod: isHod,
          imageUrl: imageUrl, 
          id: id,
        });
      } else {
        await axios.post(`${import.meta.env.VITE_SERVER_URL}/faculty`, {
          name: name,
          department: department,
          departmentCode: departmentCode,
          post: post,
          linkedin: linkedin,
          isHod: isHod,
          imageUrl: imageUrl,
        });
      }

      toast.dismiss(loadingToastId);
      toast.success("Faculty added successfully");
    } catch (err) {
      toast.dismiss(loadingToastId);
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setIsLoading(false);
      navigate(0);
    }
  };

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
            <ModalHeader>Add New Faculty</ModalHeader>
            <ModalBody>
              <Form className="flex flex-col gap-2" onSubmit={onSubmit}>
                <Input
                  isRequired
                  errorMessage="Field cannot be empty"
                  label="Name"
                  labelPlacement="outside"
                  name="name"
                  placeholder="Enter name"
                  type="text"
                  value={name}
                  // defaultValue="name"
                  onValueChange={setName}
                />
                <RadioGroup
                  isRequired
                  errorMessage="Field cannot be empty"
                  label="Department"
                  labelPlacement="outside"
                  name="department"
                  value={departmentCode}
                  // defaultValue={[departmentCode]}
                  onValueChange={(value) => {
                    setDepartment(departmentName[value]);
                    setDepartmentCode(value);
                  }}
                >
                  {departments.map((department) => (
                    <Radio value={department.value} key={department.value}>
                      {department.label}
                    </Radio>
                  ))}
                </RadioGroup>
                <RadioGroup
                  isRequired
                  errorMessage="Field cannot be empty"
                  label="Is Head of Department"
                  labelPlacement="outside"
                  name="isHod"
                  value={isHod}
                  // defaultValue={isHod}
                  onValueChange={setIsHod}
                >
                  {isHodOptions.map((option) => (
                    <Radio value={option.value} key={option.value}>
                      {option.label}
                    </Radio>
                  ))}
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
                  accept="image/*"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files.length > 0) {
                      setImage(e.target.files[0]);
                      toast.success("Image selected successfully");
                    }
                  }}
                />

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()} 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Upload Image
                </button>

                {image && (
                  <p className="text-sm text-green-600">
                    Selected: {image.name}
                  </p>
                )}
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
  );
}
