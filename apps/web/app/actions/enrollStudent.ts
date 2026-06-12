'use server';

import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';
import { enrollStudentByEmailApi } from '@/lib/api/courseApi';

export async function enrollStudentAction(courseId: string, formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;

  if (!email) {
    throw new Error('Email is required');
  }

  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (token) {
    await enrollStudentByEmailApi(courseId, email, token);
  }

  revalidateTag('courses');
  revalidateTag('enrollments');
  revalidatePath(`/dosen/courses/${courseId}`);
  revalidatePath(`/dosen/courses/${courseId}/enrollment`);
}
