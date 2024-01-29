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
                query: "SELECT user_account.* ,user_auth.user_email, user_auth.user_role_id, user_auth.created_at FROM user_account JOIN user_auth ON user_account.user_id = user_auth.user_id ",
            })
        var categoryData = await executeQuery({
                query: "SELECT * FROM user_categories",
            })
        var categories = await executeQuery({
                query: "SELECT * FROM categories",
            })
        var roles = await executeQuery({
                query: "SELECT * FROM user_roles",
            })
            return res.status(200).json({ users: data, roles, categoryData, categories });

        default:
            res.status(405).json({ message: 'Method not allowed' });
            break;
    }
}
