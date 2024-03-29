import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import executeQuery from "@/lib/db";

export default async function handler(req, res) {
  const method = req.method;
  const slug = req.query.slug;
  const session = await getServerSession(req, res, authOptions);
  console.log(session);

  switch (method) {
    case 'GET': // Get user data for slug user

      // Optional: Check if session user can access this user data
      var data = await executeQuery({
        query: "SELECT user_id, user_role_id FROM user_account WHERE user_id = ?",
        values: [slug]
      })
      if (data.length < 0) return res.status(404).json({ message: 'User not found' })
      return res.status(200).json({ message: 'User found', user: data[0] });

    case 'PUT': // Update user data for slug user
      
      // if (slug !== session?.user?.userId) return res.status(401).json({ message: 'Unauthorized' })
      // Optional : Check if session user can update this user role
      const { roleId, uId } = req.body;
      console.log(req.body);
      var data = await executeQuery({
        query: "UPDATE user_auth SET user_role_id = ? WHERE user_id =?",
        values: [roleId, uId]
      })
      var roles = await executeQuery({
        query: "SELECT role_description FROM user_roles WHERE role_id =?",
        values: [roleId]
      })
      
      if (data.affectedRows < 0) return res.status(500).json({ message: 'Something went wrong' });
      return res.status(201).json({ message: 'User updated successfully', role_description: roles[0].role_description });

    default:
      res.status(405).json({ message: 'Method not allowed' });
      break;
  }
}
