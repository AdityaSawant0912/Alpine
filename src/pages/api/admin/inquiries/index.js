import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid';
import executeQuery from "@/lib/db";
import { hash, compare } from 'bcryptjs';
import { isAdmin } from "@/lib/utils";

export default async function handler(req, res) {
    const method = req.method;

    const session = await getServerSession(req, res, authOptions);

    if (!session) return res.status(401).json({ message: 'Unauthorized' })
    if (!await isAdmin(session.user.user_id)) return res.status(401).json({ message: 'Unauthorized' })

    switch (method) {
        case 'GET': // Get user data for session user
            var data = await executeQuery({
                query: "SELECT inquiries.*, GROUP_CONCAT(inquiry_categories.category_id) AS category_ids, GROUP_CONCAT(categories.name) AS category_names FROM inquiries LEFT JOIN inquiry_categories ON inquiries.inquiry_id = inquiry_categories.inquiry_id LEFT JOIN categories ON inquiry_categories.category_id = categories.category_id WHERE inquiries.disabled = 0 GROUP BY inquiries.inquiry_id",
            })
            var categories = await executeQuery({
                query: "SELECT * FROM categories",
            })
            return res.status(200).json({ inquiries: data, categories });

        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
