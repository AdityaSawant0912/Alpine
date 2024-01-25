import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';
import executeQuery from "@/lib/db";
import { hash, compare } from 'bcryptjs';
import { nanoid } from "nanoid";

function pasrseQuery(query) {
    let categories = [];
    let error = ''
    query = query.split('[')[1]
    query = query.split(']')[0]
    query = query.split(',');
    query.forEach(element => {
        try {
            if(isNaN(parseInt(element))) throw 'Invalid category id'; 
            categories.push(parseInt(element));
        } catch (er) {
            error = er;
        }
    });
    
    return { categories, error };
}

export default async function handler(req, res) {
    const method = req.method;
    const query = req.query;
    const session = await getServerSession(req, res, authOptions);

    switch (method) {
        case 'GET': // Get inquiries data filter it if query is passed\
            let categories = [];
            let error = '';
            if (query.categories) {
                ({ categories, error } = pasrseQuery(query.categories));
            }
            
            console.log(categories, error);
            let inquires = [];

            if (categories.length <= 0 || categories.includes(0)) {
                inquires = await executeQuery({
                    query: "SELECT i.*, GROUP_CONCAT(ic.category_id) AS category_ids FROM inquiries i JOIN inquiry_categories ic ON i.inquiry_id = ic.inquiry_id WHERE 1=1 GROUP BY i.inquiry_id, i.body, i.attachments, i.inquirer_email, i.inquirer_mobile, i.inquirer_name, i.created_at ORDER BY i.created_at DESC",
                });
            } else {
                inquires = await executeQuery({
                    query: "SELECT i.*, GROUP_CONCAT(ic.category_id) AS category_ids FROM inquiries i JOIN inquiry_categories ic ON i.inquiry_id = ic.inquiry_id WHERE i.inquiry_id IN (SELECT ic2.inquiry_id FROM inquiry_categories ic2 WHERE ic2.category_id IN (?)) GROUP BY i.inquiry_id, i.body, i.attachments, i.inquirer_email, i.inquirer_mobile, i.inquirer_name, i.created_at ORDER BY i.created_at DESC",
                values: [categories]
                });
            }

            
            res.status(200).json({ inquires });
            break;

        case 'POST': // Create new inquiry
            
            let { body, attachments, inquirer_email, inquirer_mobile, inquirer_name, category_ids } = req.body;
            const created_at = new Date().toISOString();
            
            if (!body ||!attachments ||!inquirer_email ||!inquirer_mobile ||!inquirer_name ||!category_ids)
                return res.status(400).json({ message: 'Please provide all the required fields' });
                
            const inquiry_id = nanoid(10);
            
            if (typeof (attachments) !== 'string') {
                attachments = JSON.stringify(attachments);
            }
            
            const inquiry = await executeQuery({
                query: "INSERT INTO inquiries (inquiry_id, body, attachments, inquirer_email, inquirer_mobile, inquirer_name, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
                values: [inquiry_id, body, attachments, inquirer_email, inquirer_mobile, inquirer_name, created_at]
            });
            
            if(inquiry.error) return res.status(400).json({ message: 'Error while creating inquiry' });
            
            category_ids.forEach(async (id) => {
                await executeQuery({
                    query: "INSERT INTO inquiry_categories (inquiry_id, category_id) VALUES (?, ?)",
                    values: [inquiry_id, id]
                });
            });
            
            return res.status(201).json({ message: 'Inquiry created successfully' });


        case 'PUT': // Delete inquiry (ONLY BY Admin)
            
            if(session.user.role >= 1) return res.status(401).json({ message: 'Unauthorized' });
            
            const { inq_id } = req.body;
            console.log(inq_id, req.body);
            
            let data = await executeQuery({
                query: "UPDATE inquiries SET disabled=1 WHERE inquiry_id =?",
                values: [inq_id]
            });
            
            
            return res.status(200).json({ message: 'Inquiry disabled successfully', data });
            
                

        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
