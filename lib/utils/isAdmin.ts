import { getServerSession } from "next-auth";
import { User } from "@/models/User";
import { authOptions } from "../authOptions";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await User.findOne({ email: userEmail });
  return userInfo?.admin ?? false;
}