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
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Stack from '@mui/material/Stack';
import AdminNav from '@/components/Navbars/AdminNav.component'
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import VerifiedIcon from '@mui/icons-material/Verified';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

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
        id: 'role_name',
        numeric: false,
        disablePadding: false,
        label: 'Role',
    },
    {
        id: 'core_category',
        numeric: false,
        disablePadding: false,
        label: 'Core Category',
    },
    {
        id: 'paid_categories',
        numeric: false,
        disablePadding: false,
        label: 'Paid Categories',
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
                User List
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
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('created_at');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [categories, setCategories] = useState([])

    const [formData, setformData] = useState({});
    const [open, setOpen] = useState(false);

    const handleOpen = (user_id) => {
        setformData(rows.find(user => user.id === user_id))
        setOpen(true)
        };
    const handleClose = () => setOpen(false);
    
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

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/admin/users/');
            const data = await response.json();
            if (response.ok) {

                let users = data.users.map((user) => {
                    return {
                        id: user.user_id,
                        firstName: user.user_first_name ,
                        lastName: user.user_last_name,
                        email: user.user_email,
                        user_contact_no: user.user_contact_no,
                        user_company_name: user.user_company_name,
                        user_address: user.user_address,
                        role_id: user.user_role_id,
                        role_name: data.roles.filter(r => r.role_id == user.user_role_id)[0].role_description,
                        core_category: data.categoryData?.filter(c => c.user_id == user.user_id && c.core == 1)[0]?.category_id,
                        paid_categories: data.categoryData?.filter(c => c.user_id == user.user_id && c.core == 0)?.map(c => c.category_id),
                        created_at: new Date(user.created_at).toISOString()
                    }
                })
                setCategories(data.categories)
                setRows(users);
                // setRowsPerPage(25)
            } else {
                console.error('Error fetching users:', data.message);
            }
        } catch (error) {
            console.error('Error fetching users:', error.message);
        }
    };

    useEffect(() => {
        fetchUsers();
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
                                            <TableCell align="left">{row.firstName + " " + row.lastName}</TableCell>
                                            <TableCell align="left">{row.email}</TableCell>
                                            <TableCell align="left">{row.role_name}</TableCell>
                                            <TableCell align="left">
                                                {row.core_category ?
                                                    <Tooltip title={categories.filter(cat => cat.category_id == row.core_category)[0]?.description}>
                                                        <Chip label={categories.filter(cat => cat.category_id == row.core_category)[0]?.name} flexgrow={1} />
                                                    </Tooltip>
                                                    : <></>}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Box sx={{ maxWidth: 300 }}>
                                                    <Stack direction={"row"} spacing={1} useFlexGap flexWrap={"wrap"}>
                                                        {row.paid_categories.length > 0 ?
                                                            row.paid_categories.map((paid_cat, index) => {
                                                                return (
                                                                    <Tooltip key={index} title={categories.filter(cat => cat.category_id == paid_cat)[0]?.description}>
                                                                        <Chip label={categories.filter(cat => cat.category_id == paid_cat)[0]?.name} flexgrow={1} />
                                                                    </Tooltip>
                                                                )
                                                            })


                                                            : <></>}
                                                    </Stack>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="left">{row.created_at}</TableCell>
                                            <TableCell align="left">

                                                {row.id != sessionUser.user_id && sessionUser.user_role_id == 0 && row.role_id != 0 ?
                                                    <Tooltip title={"Promote to Super User"}>
                                                        <IconButton onClick={() => updateRole(row.id, 0)}>
                                                            <KeyboardDoubleArrowUpIcon />
                                                        </IconButton>
                                                    </Tooltip> : <></>
                                                }
                                                {row.id != sessionUser.user_id && sessionUser.user_role_id == 0 && row.role_id > 1 ?
                                                    <Tooltip title={"Promote to Admin"}>
                                                        <IconButton onClick={() => updateRole(row.id, 1)} >
                                                            <KeyboardArrowUpIcon />
                                                        </IconButton>
                                                    </Tooltip> : <></>
                                                }

                                                {row.id != sessionUser.user_id && sessionUser.user_role_id == 0 && row.role_id == 0 ?
                                                    <Tooltip title={"Demote to Admin"}>
                                                        <IconButton onClick={() => updateRole(row.id, 1)} >
                                                            <KeyboardDoubleArrowDownIcon />
                                                        </IconButton>
                                                    </Tooltip> : <></>
                                                }
                                                {row.id != sessionUser.user_id && sessionUser.user_role_id == 0 && row.role_id == 1 ?
                                                    <Tooltip title={"Demote to Vendor"}>
                                                        <IconButton onClick={() => updateRole(row.id, 2)} >
                                                            <KeyboardArrowDownIcon />
                                                        </IconButton>
                                                    </Tooltip> : <></>
                                                }
                                                {row.id != sessionUser.user_id && (sessionUser.user_role_id == 0 || sessionUser.user_role_id == 1) && row.role_id == 3 ?
                                                    <Tooltip title={"Approve as Vendor"}>
                                                        <IconButton onClick={() => updateRole(row.id, 2)} >
                                                            <VerifiedIcon />
                                                        </IconButton>
                                                    </Tooltip> : <></>
                                                }
                                                {row.id != sessionUser.user_id && (sessionUser.user_role_id == 0 || sessionUser.user_role_id == 1) ?
                                                    <Tooltip title={"Edit User"}>
                                                        <IconButton onClick={() => handleOpen(row.id)} >
                                                            <EditOutlinedIcon />
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