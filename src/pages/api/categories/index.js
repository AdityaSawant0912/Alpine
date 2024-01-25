
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import executeQuery from "@/lib/db";

export default async function handler(req, res) {
    const method = req.method;
    const query = req.query;
    const session = await getServerSession(req, res, authOptions);

    switch (method) {
        case 'GET':
            let queries = await executeQuery({
                query: "SELECT * FROM categories",
            });
            res.status(200).json(queries);
        break
        case 'POST':
            var {name, description} = req.body;
            var result = await executeQuery({
                query: "INSERT INTO categories (name, description) VALUES (?,?)",
                values: [name, description]
            });
            res.status(200).json(result);
        break
        case 'PUT':
            var {name, description} = req.body;
            var result = await executeQuery({
                query: "UPDATE categories SET name =?, description =? WHERE category_id =?",
                values: [name, description, query.id]
            });
        case 'DELETE':
            var result = await executeQuery({
                query: "DELETE FROM categories WHERE category_id =?",
                values: [query.id]
            });
        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
    
}