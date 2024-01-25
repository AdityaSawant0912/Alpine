import React from 'react';
import AdminLayout from '@/layouts/admin.layout'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { adminGSSP } from '@/lib/utils'
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { visuallyHidden } from '@mui/utils';
import AdminNav from '@/components/Navbars/AdminNav.component'

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Modal from '@mui/material/Modal';
import CollectionsIcon from '@mui/icons-material/Collections';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}


const headCells = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'ID',
    },
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Email',
    },
    {
        id: 'mobile',
        numeric: false,
        disablePadding: false,
        label: 'Mobile',
    },
    {
        id: 'body',
        numeric: false,
        disablePadding: false,
        label: 'Body',
    },
    {
        id: 'categories',
        numeric: false,
        disablePadding: false,
        label: 'Categories',
    },
    {
        id: 'attchments',
        numeric: false,
        disablePadding: false,
        label: 'Attachments',
    },
    {
        id: 'created_at',
        numeric: false,
        disablePadding: false,
        label: 'Created At',
    },
    {
        id: 'actions',
        numeric: false,
        disablePadding: false,
        label: 'Actions',
    },
];


function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                All Inquiries
            </Typography>


        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};



export default function EnhancedTable() {

    const { data: session, status } = useSession()
    const sessionUser = session.user
    const [rows, setRows] = useState([]);
    const [categories, setCategories] = useState([]);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('created_at');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [currentAttchments, setCurrentAttchments] = useState({});
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rows.map((n) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const fetchInquiries = async () => {
        try {
            const response = await fetch('/api/admin/inquiries');
            const data = await response.json();
            if (response.ok) {
                setCategories(data.categories);
                let inquiries = data.inquiries.map((inquiry) => {
                    return {
                        id: inquiry.inquiry_id,
                        email: inquiry.inquirer_email,
                        mobile: inquiry.inquirer_mobile,
                        name: inquiry.inquirer_name,
                        body: inquiry.body,
                        categories: inquiry.category_ids.split(',').map((id) => parseInt(id)),
                        attachments: JSON.parse(inquiry.attachments),
                        created_at: new Date(inquiry.created_at).toISOString(),
                        disabled: inquiry.disabled
                    }
                })
                console.log(inquiries);
                setRows(inquiries);
                // setRowsPerPage(25)
            } else {
                console.error('Error fetching users:', data.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };


    useEffect(() => {
        fetchInquiries();
    }, []);


    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = React.useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [order, orderBy, page, rowsPerPage, rows],
    );

    const disableInquiry = (id) => {
        fetch(`/api/inquiry/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                inq_id: id
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                let u = []
                rows.map((row) => {
                    if (row.id != id) {
                        u.push(row)
                    }
                })
                setRows(u)
            })
            .catch(err => console.error(err))
    }

    const updateRole = (userId, role) => {
        fetch(`/api/user/${userId}/role`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
                roleId: role,
                uId: userId
            })
        })
            .then(res => res.json())
            .then(data => {
                let u = []
                rows.map((row) => {
                    if (row.id == userId) {
                        row.role_id = role
                        row.role_name = data.role_description
                    }
                    u.push(row)
                })
                setRows(u)

            })
            .catch(err => console.error(err))
    }
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: 1000,
        maxHeight: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };



    return (
        <AdminNav>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Toolbar>
                        <Typography variant="h4" noWrap component="div">
                            Attachments
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <List>
                        {/* Images */}
                        <Typography variant="h6" noWrap component="div">
                            Images
                        </Typography>
                        {currentAttchments.images?.length <= 0 ? "No Images" :
                            <>
                                <ImageList sx={{  width: 500, maxHeight: 350 }} cols={2} rowHeight={164}>
                                    {currentAttchments.images?.map((file) => (

                                        <ImageListItem key={file.url}>
                                            <Tooltip title={"Click to open"}>
                                                <Link href={file.url} target="_blank" rel="noopener noreferrer">
                                                <Image
                                                    fill
                                                    srcSet={`${file.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                                    src={`${file.url}?w=164&h=164&fit=crop&auto=format`}
                                                    alt={file.originalName}
                                                    loading="lazy"
                                                    
                                                />
                                                </Link>
                                            </Tooltip>
                                        </ImageListItem>
                                    ))}
                                </ImageList>

                            </>}
                        <Divider />
                        {/* Files */}
                        <Typography variant="h6" noWrap component="div">
                            Files
                        </Typography>
                        {currentAttchments.files?.length <= 0 ? "No Files" :
                            currentAttchments.files?.map((file, idx) => {
                                return (
                                    <>
                                        <Button component={Link} href={file.url} target="_blank" endIcon={ <OpenInNewIcon />}>
                                            {file.originalName}
                                        </Button>
                                    </>
                                )
                            })
                        }

                    </List>
                </Box>
            </Modal>
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <EnhancedTableToolbar numSelected={selected.length} />
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={dense ? 'small' : 'medium'}
                        >
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={handleSelectAllClick}
                                onRequestSort={handleRequestSort}
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {visibleRows.map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                            sx={{ cursor: 'pointer' }}
                                        >

                                            <TableCell align="left">{row.id}</TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.mobile}</TableCell>
                                            <TableCell align="left">{row.body}</TableCell>
                                            <TableCell align="left">
                                                <Box sx={{ maxWidth: 300 }}>
                                                    <Stack direction={"row"} spacing={1} useFlexGap flexWrap={"wrap"}>
                                                        {row.categories.map((id) => {
                                                            let cat = categories.find((cat) => cat.category_id == id)
                                                            return (
                                                                <Tooltip key={id} title={cat.description}>
                                                                    <Chip label={cat.name} flexgrow={1} />
                                                                </Tooltip>)
                                                        })}

                                                    </Stack>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">{
                                                row.attachments.images.length < 1 && row.attachments.files.length < 1 ? <>No Attachments</> :
                                                    <>
                                                        <Button onClick={() => { setCurrentAttchments(row.attachments); handleOpen() }} >View Attachments</Button>
                                                    </>
                                            }</TableCell>
                                            <TableCell align="left">{row.created_at}</TableCell>
                                            <TableCell align="left">


                                                {sessionUser.user_role_id == 0 || sessionUser.user_role_id == 1 ?
                                                    <Tooltip title={"Disable Inquiry"}>
                                                        <IconButton onClick={() => disableInquiry(row.id)} >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip> : <></>
                                                }

                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (dense ? 33 : 53) * emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        </AdminNav>
    );
}


export async function getServerSideProps(context) {


    return await adminGSSP(context);
}