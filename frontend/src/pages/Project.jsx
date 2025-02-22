import { useCallback, useEffect, useMemo, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell
} from "@heroui/table"

import { Input } from "@heroui/input"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { User } from "@heroui/user"
import { Pagination } from "@heroui/pagination"
import {
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown"
import { PlusIcon } from "@/components/PlusIcon";
import { SearchIcon } from "@/components/SearchIcon";
import { ChevronDownIcon } from "@/components/ChevronDownIcon";
import { Link } from "@heroui/link";
import { Trash2, UserRoundPen } from "lucide-react";
import axios from "axios";
import { useDisclosure } from "@heroui/modal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ProjectModal from "@/components/ProjectModal";

const columns = [
    { name: "S.No.", uid: "sno", sortable: true },
    { name: "FACULTY NAME", uid: "facultyName" },
    { name: "TITLE", uid: "title", sortable: true },
    { name: "DEPARTMENT", uid: "department", sortable: true },
    { name: "FUNDING", uid: "funding" },
    { name: "DURATION", uid: "duration", sortable: true },
    { name: "TYPE", uid: "type", sortable: true },
    { name: "ORGANISATION", uid: "organisation" },
    { name: "ACTIONS", uid: "actions" },
];

const departmentOptions = [
    { name: "Basic Sciences", uid: "bs" },
    { name: "Computer Science & Engineering", uid: "cse" },
    { name: "Electronics & Communication Engineering", uid: "ece" },
];

const departmentName = {
    "bs": "Basic Sciences",
    "cse": "Computer Science & Engineering",
    "ece": "Electronics & Communication Engineering",
}

const chipColors = {
    "completed": "success",
    "ongoing": "warning",
    "consultancy": "secondary"
}


function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const INITIAL_VISIBLE_COLUMNS = ["facultyName", "title", "department", "funding", "actions", "sno", "duration", "type", "organisation"];

const Project = () => {
    const [facultyName, setFacultyName] = useState("");
    const [department, setDepartment] = useState("");
    const [title, setTitle] = useState("");
    const [projectType, setProjectType] = useState("");
    const [duration, setDuration] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [funding, setFunding] = useState("")
    const [isEditing, setIsEditing] = useState(false)
    const [id, setId] = useState()

    const [isFetching, setIsFetching] = useState(false)

    const [filterValue, setFilterValue] = useState("");
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
    const [departmentFilter, setDepartmentFilter] = useState("all");
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [faculties, setFaculties] = useState([])
    const [sortDescriptor, setSortDescriptor] = useState(
        {
            column: "sno",
            direction: "ascending",
        },
    );
    const [page, setPage] = useState(1);
    // const [isLoading, setIsLoading] = useState(false)
    // const [loadingIds, setLoadingIds] = useState(new Set());

    const { isOpen, onOpen, onOpenChange } = useDisclosure()

    const navigate = useNavigate()

    const hasSearchFilter = Boolean(filterValue);

    useEffect(() => {
        const fetchFacultyData = async () => {
            setIsFetching(true)
            try {
                // console.log("Server url : ",import.meta.env.VITE_SERVER_URL)
                // console.log("Dept : ",dept)
                const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/project`);
                // const response = await axios.get(`http://localhost:4000/project`);

                // console.log("Response : ",response)
                // console.log("Response : ",response)
                // Separate HOD and faculties based on isHod
                const data = response.data.data

                data.forEach((element, index) => {
                    element.sno = index + 1
                });

                // const hodData = data.find((faculty) => faculty.isHod);
                // const facultyList = data.filter((faculty) => !faculty.isHod);

                // setHod(hodData);
                setFaculties(data);

            } catch (err) {
                console.log("Error Fetching : ", err)
                // setError('Department not found');
            } finally {
                setIsFetching(false)
                // console.log("Done")
                // setLoading(false);
            }
        };

        fetchFacultyData();
    }, []);

    const headerColumns = useMemo(() => {
        if (visibleColumns === "all") return columns;

        return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
    }, [visibleColumns]);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...faculties];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.facultyName.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (departmentFilter !== "all" && Array.from(departmentFilter).length !== departmentOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(departmentFilter).includes(user.department),
            );
        }

        return filteredUsers;
    }, [faculties, filterValue, departmentFilter]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const sortedItems = useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const deleteEntry = async (id, setIsLoading) => {
        // isLoading = true
        // setLoadingIds((prev) => new Set([...prev,id]));
        setIsLoading(true)

        const loadingToastId = toast.loading("Processing...")

        try {
            // setIsDeleting(true)
            // console.log("Server url : ",import.meta.env.VITE_SERVER_URL)
            // console.log("Dept : ",dept)

            const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/project`, {
                data: { id }
            });
            // const response = await axios.delete(`http://localhost:4000/project`, {
            //     data: { id }
            // });

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
            // console.log("Error Deleting Entry : ", err)

            toast.dismiss(loadingToastId)
            toast.error(err.response.data.error)
            // setError('Department not found');
        } finally {
            // setLoadingIds((prev) => {
            //     const newSet = new Set(prev);
            //     newSet.delete(id);
            //     return newSet;
            // });    
            // console.log("Done")
            // isLoading = false
            // setIsDeleting(false)
            setIsLoading(false);
            navigate(0)

        }
    }

    const renderCell = useCallback((project, columnKey, id) => {
        const cellValue = project[columnKey];

        switch (columnKey) {
            case "facultyName":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "funding":
                return (
                    <>
                        <span className="mr-0.5">₹</span>{cellValue}
                    </>
                );
            case "department":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{departmentName[cellValue]}</p>
                    </div>
                );
            case "organisation":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "title":
                return (
                    <div className="flex flex-col">
                        <p className="text-bold text-small capitalize">{cellValue}</p>
                    </div>
                );
            case "type":
                return (
                    <Chip
                        className="light uppercase text-white"
                        size="sm"
                        variant="solid"
                        color={chipColors[cellValue]}
                        classNames={{
                            content: "font-bold",
                        }}
                    >
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    // <div className="relative flex justify-center items-center gap-2">
                    //     <Button
                    //         size="sm"
                    //         color="warning"
                    //         variant="flat"
                    //         onPress={() => {
                    //             onOpen()
                    //             // setName(user.name)
                    //             // setDepartment(user.department)
                    //             // setDepartmentCode(user.departmentCode)
                    //             // setLinkedin(user.linkedin)
                    //             // setIsHod(user.isHod)
                    //             // setPost(user.post)
                    //             // setIsEditing(true)
                    //             console.log(user)
                    //         }}
                    //     >
                    //         <UserRoundPen />
                    //     </Button>
                    //     <Button
                    //         size="sm"
                    //         color="danger"
                    //         variant="flat"
                    //         onPress={() => deleteEntry(id)}
                    //     // isDisabled={loadingIds.has(id)}

                    //     >
                    //         <Trash2 />
                    //     </Button>
                    // </div>
                    <Options id={id} project={project} />
                );
            default:
                return cellValue;
        }
    }, []);

    const Options = ({ id, project }) => {
        const [isLoading, setIsLoading] = useState(false)
        return (
            <div className="relative flex justify-center items-center gap-2">
                <Button
                    size="sm"
                    color="warning"
                    variant="flat"
                    onPress={() => {
                        onOpen()
                        setFacultyName(project.facultyName)
                        setDepartment(project.department)
                        setTitle(project.title)
                        setProjectType(project.type)
                        setDuration(project.duration)
                        setOrganisation(project.organisation)
                        setFunding(project.funding)
                        setIsEditing(true)
                        setId(id)
                        console.log("isEditing in Project", isEditing)
                        // console.log(user)
                    }}
                >
                    <UserRoundPen />
                </Button>
                <Button
                    size="sm"
                    color="danger"
                    variant="flat"
                    onPress={() => deleteEntry(id, setIsLoading)}
                    // isDisabled={loadingIds.has(id)}
                    isLoading={isLoading}
                >
                    {!isLoading && <Trash2 />}
                </Button>
            </div>
        )
    }

    const onNextPage = useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("");
        setPage(1);
    }, []);

    const topContent = useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Search by faculty name..."
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Department
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={departmentFilter}
                                selectionMode="multiple"
                                onSelectionChange={setDepartmentFilter}
                            >
                                {departmentOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <Button
                            color="primary"
                            endContent={<PlusIcon />}
                            onPress={() => {
                                onOpen()
                                setIsEditing(false)
                                setFacultyName("")
                                setDepartment("")
                                setTitle("")
                                setProjectType("")
                                setDuration("")
                                setOrganisation("")
                                setFunding("")
                            }}
                        >
                            Add New
                        </Button>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {faculties.length} faculties</span>
                    <label className="flex items-center text-default-400 text-small">
                        Rows per page:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                        >
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </select>
                    </label>
                </div>
            </div>
        );
    }, [
        filterValue,
        departmentFilter,
        visibleColumns,
        onRowsPerPageChange,
        faculties.length,
        onSearchChange,
        hasSearchFilter,
    ]);

    const bottomContent = useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400">
                    {selectedKeys === "all"
                        ? "All items selected"
                        : `${selectedKeys.size} of ${filteredItems.length} selected`}
                </span>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

    return (
        <div
            className="w-screen h-screen p-5"
        >
            <Table
                className="min-h-screen"
                isHeaderSticky
                aria-label="Project table with pagination and sorting"
                bottomContent={bottomContent}
                bottomContentPlacement="inside"
                classNames={{
                    // wrapper: "max-h-full",
                }}
                selectedKeys={selectedKeys}
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="inside"
                onSelectionChange={setSelectedKeys}
                onSortChange={setSortDescriptor}
                isStriped
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody
                    emptyContent={"No projects found"}
                    items={sortedItems}
                    isLoading={isFetching}
                    loadingContent={"Loading..."}
                >
                    {(item) => (
                        <TableRow key={item._id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey, item._id)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <ProjectModal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                defaultFacultyName={facultyName}
                defaultDepartment={department}
                defaultProjectType={projectType}
                defaultTitle={title}
                defaultDuration={duration}
                defaultFunding={funding}
                defaultOrganisation={organisation}
                defaultIsEditing={isEditing}
                id={id}
            />
        </div>
    );
}

export default Project