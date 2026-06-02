import { redirect } from "next/navigation";

/**
 * Root page redirects to the courses listing page
 * as the main entry point of the application.
 */
export default function RootPage() {
  redirect("/courses");
}
