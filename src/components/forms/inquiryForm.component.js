import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Typography, Container, Box, Input, Grid, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { MultiSelect } from "react-multi-select-component";
const MyForm = () => {
    const formik = useFormik({
        initialValues: {
            body: '',
            categories: [],
            inquirer_email: '',
            inquirer_mobile: '',
            inquirer_name: '',
            files: [],
        },
        validate: values => {
            let errors = {};
            if (!values.body) {
                errors.body = 'Required';
            }
            if (!values.categories) {
                errors.categories = 'Required';
            }
            if (!values.inquirer_email) {
                errors.inquirer_email = 'Required';
            }
            if (!values.inquirer_mobile) {
                errors.inquirer_mobile = 'Required';
            }
            if (!values.inquirer_name) {
                errors.inquirer_name = 'Required';
            }
            if (!values.files) {
                errors.files = 'Required';
            }
            return errors;
        },
        onSubmit: async values => {
            console.log(values);
            let attachments = { images: [], files: [] };
            // Upload Each file
            for (let i = 0; i < values.files.length; i++) {
                let file = values.files[i];
                let formData = new FormData();
                formData.append('file', file);
                let res = await fetch('/api/upload', { method: 'POST', body: formData })
                let data = await res.json();
                if (file.type.includes('image')) {
                    attachments.images.push({ url: data.url, originalName: file.name, type: file.type});
                } else {
                    attachments.files.push({ url: data.url, originalName: file.name, type: file.type });
                }
            }
            console.log(attachments);
            // Post Inquiry
            let cats = values.categories.map(category => parseInt(category.value));
            if (cats?.length <= 0 || cats?.length == categories.length) {
                cats = [0];
            }
            fetch('/api/inquiry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    body: values.body,
                    category_ids: cats,
                    inquirer_email: values.inquirer_email,
                    inquirer_mobile: values.inquirer_mobile,
                    inquirer_name: values.inquirer_name,
                    attachments: attachments,
                }),
            }).then(res => res.json()).then(data => {
                alert(data.message);
                console.log(data);
            });

        },
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('/api/categories', { method: 'GET' }).then(res => res.json()).then(data => {
            let newCats = data.map(category => {
                return {
                    label: category.name,
                    value: category.category_id
                }
            });
            newCats = newCats.filter(cat => cat.value !== 0);
            setCategories(newCats);
            console.log(newCats);
        });
    }, []);

    const handleFileChange = event => {
        const selectedFiles = Array.from(event.currentTarget.files);
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const filteredFiles = selectedFiles.filter(file => allowedTypes.includes(file.type));

        formik.setFieldValue('files', filteredFiles);


    };

    const handleCategoryChange = event => {
        console.log(event);
        formik.setFieldValue('categories', event);

    }

    const removeFile = fileName => {
        const updatedFiles = formik.values.files.filter(file => file.name !== fileName);
        formik.setFieldValue('files', updatedFiles);
    };

    return (
        <Container>
            <Box mt={3}>
                <Typography variant="h4" gutterBottom>
                    Inquiry Form
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <MultiSelect
                                id="categories"
                                name="categories"
                                label="Categories"
                                options={categories}
                                value={formik.values.categories}
                                onChange={handleCategoryChange}
                                labelledBy="Select Categories"
                                className={`bg-slate-200`}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="body"
                                name="body"
                                label="Body"
                                variant="outlined"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.body}
                                error={formik.touched.body && Boolean(formik.errors.body)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="inquirer_name"
                                name="inquirer_name"
                                label="Inquirer Name"
                                variant="outlined"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.inquirer_name}
                                error={formik.touched.inquirer_name && Boolean(formik.errors.inquirer_name)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="inquirer_email"
                                name="inquirer_email"
                                label="Inquirer Email"
                                variant="outlined"
                                required
                                onChange={formik.handleChange}
                                value={formik.values.inquirer_email}
                                error={formik.touched.inquirer_email && Boolean(formik.errors.inquirer_email)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="inquirer_mobile"
                                name="inquirer_mobile"
                                label="Inquirer Mobile"
                                variant="outlined"
                                required
                                onChange={formik.handleChange}
                                error={formik.touched.inquirer_mobile && Boolean(formik.errors.inquirer_mobile)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                fullWidth
                                id="files"
                                name="files"
                                type="file"
                                onChange={handleFileChange}
                                inputProps={{ multiple: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {formik.values.files.length > 0 && (
                                <Typography variant="subtitle1" gutterBottom>
                                    Selected Files:
                                </Typography>
                            )}
                            {formik.values.files.map(file => (
                                <Paper key={file.name} elevation={3} style={{ padding: '10px', margin: '5px', display: 'inline-block' }}>
                                    {file.type.startsWith('image/') ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                            style={{ maxWidth: '200px', maxHeight: '100px' }}
                                        />
                                    ) : (
                                        <React.Fragment>
                                            {file.type.startsWith('application/pdf') ? (
                                                <>
                                                    <PictureAsPdfIcon style={{ fontSize: '50px' }} />
                                                    <Typography variant="body1" gutterBottom>
                                                        {file.name}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <>
                                                    <TextSnippetIcon style={{ fontSize: '50px' }} />
                                                    <Typography variant="body1" gutterBottom>
                                                        {file.name}
                                                    </Typography>
                                                </>
                                            )}
                                        </React.Fragment>
                                    )}
                                    <IconButton size="small" onClick={() => removeFile(file.name)}>
                                        <CloseIcon color="error" />
                                    </IconButton>
                                </Paper>
                            ))}
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" style={{ backgroundColor: '#1976D2', color: '#fff' }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Container>

    );
};


export default MyForm;
