'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { LecturerCourse } from '@/lib/types/course';
import { createCourseApi } from '@/lib/api/courseApi';

export async function createCourseAction(course: LecturerCourse) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (token) {
      // Decode JWT to get user ID
      const payloadBase64 = token.split('.')[1];
      if (payloadBase64) {
        const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
        const instructorId = payload.sub || payload.id || 'unknown';

        await createCourseApi(
          {
            title: course.title,
            description: course.department,
            instructorId,
          },
          token
        );
      }
    }
  } catch (error) {
    console.error('Failed to create course via API', error);
  }

  revalidatePath('/dosen/courses');
  revalidatePath('/dashboard_dosen');
  revalidatePath('/dosen');
}
