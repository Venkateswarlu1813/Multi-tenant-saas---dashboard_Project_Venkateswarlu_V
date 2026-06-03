import UserLayout from "../../layouts/UserLayout";
import ProtectedRoute from "../../utils/protectedRoute";

export default function Layout({ children }) {
  return (
    <ProtectedRoute roleRequired="USER">
      <UserLayout>
        {children}
      </UserLayout>
    </ProtectedRoute>
  );
}