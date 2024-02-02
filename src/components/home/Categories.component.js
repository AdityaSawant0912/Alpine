import React, { useState } from 'react'
import InquiryForm from "@/components/forms/inquiryForm.component";
import { Link as ScrollLink } from 'react-scroll';
import { Grid, Paper, Typography, Button } from '@mui/material';


const Categories = ({ categories }) => {
    console.log(categories);
    const [cat, setCat] = useState(0);

  return (
    <div className='mt-10 flex flex-col justify-center items-center'>
        <div className='text-gray-900 text-3xl'>
            <h2>All Categories</h2>
        </div>
        
        <div className='mb-10 mt-7'>
              <Grid container spacing={2}>
                  {categories.map(item => (
                      <Grid item key={item.id} xs={12} sm={6} md={4}>
                          <ScrollLink
                              to="inquiry"
                              smooth={true}
                              duration={500}
                              offset={-50} // Adjust this offset as needed
                          >
                          <Paper elevation={3} style={{ padding: '10px', textAlign: 'center', borderRadius: '20px' }} onClick={() => { setCat(item.category_id); }}>
                              <Typography variant="h6">{item.name}</Typography>
                          </Paper>
                          </ScrollLink>
                      </Grid>
                  ))}
              </Grid>
        </div> 
        
        
          <InquiryForm cat={ cat } />
    </div>
    
  )
}



export default Categories